const { database } = require("../config/config");

class ProjectModel {
  static collection() {
    return database.collection("projects");
  }

  static async create(project) {
    return this.collection().insertOne(project);
  }

  static async findAll() {
    const agg = [
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerDetail",
        },
      },
      {
        $project: {
          customerId: false,
        },
      },
      {
        $unwind: {
          path: "$customerDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    return this.collection().aggregate(agg).toArray();
  }
}

export default ProjectModel;

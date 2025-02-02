const { database } = require("../config/config");

class ProjectModel {
  static collection() {
    return database.collection("projects");
  }

  static async create(project) {
    return this.collection().insertOne(project);
  }
}

export default ProjectModel;

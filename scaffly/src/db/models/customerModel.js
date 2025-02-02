import { ObjectId } from "mongodb";

const { database } = require("../config/config");

class CustomerModel {
  static collection() {
    return database.collection("customers");
  }

  static async create(customer) {
    return await this.collection().insertOne(customer);
  }

  static async findAll() {
    return await this.collection().find().toArray();
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }
}

export default CustomerModel;

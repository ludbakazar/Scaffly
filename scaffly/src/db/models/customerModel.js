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
}

export default CustomerModel;

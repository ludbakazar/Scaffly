const { database } = require("../config/config");

class CustomerModel {
  static collection() {
    return database.collection("customers");
  }

  static async create(customer) {
    return await this.collection().insertOne(customer);
  }
}

export default CustomerModel;

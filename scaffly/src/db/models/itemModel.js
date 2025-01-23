const { database } = require("../config/config");

class ItemModel {
  static collection() {
    return database.collection("items");
  }

  static async create(item) {
    return this.collection().insertOne(item);
  }

  static async getAll() {
    return this.collection().find().toArray();
  }
}

export default ItemModel;

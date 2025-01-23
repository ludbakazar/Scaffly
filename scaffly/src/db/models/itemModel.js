const { database } = require("../config/config");

class ItemModel {
  static collection() {
    return database.collection("items");
  }

  static async create(item) {
    return this.collection().insertOne(item);
  }
}

export default ItemModel;

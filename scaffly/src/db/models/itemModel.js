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

  static async update(kode, updatedItem) {
    return this.collection().updateOne({ kode }, { $set: updatedItem });
  }
}

export default ItemModel;

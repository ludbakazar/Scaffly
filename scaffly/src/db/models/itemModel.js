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

  static async get(kode) {
    return this.collection().findOne({ kode });
  }

  static async delete(kode) {
    return this.collection().deleteOne({ kode });
  }

  static async findById(id) {
    return this.collection().findOne(id);
  }

  static async minStock(id, qty) {
    return this.collection().updateOne({ _id: id }, { $inc: { stock: -qty } });
  }

  static async plusStock(id, qty) {
    return this.collection().updateOne({ _id: id }, { $inc: { stock: qty } });
  }
}

export default ItemModel;

import { ObjectId } from "mongodb";
import ItemModel from "./itemModel";

const { database, client } = require("../config/config");

class OrderModel {
  static collection() {
    return database.collection("orders");
  }

  static orderDetail() {
    return database.collection("orderDetail");
  }

  static async create(body) {
    const { items, orderDate, projectId } = body;
    await client.connect();
    const session = client.startSession();
    try {
      session.startTransaction();
      const newOrder = await this.collection().insertOne(
        { orderDate, projectId },
        { session }
      );

      for (const item of items) {
        const itemData = await ItemModel.findById(new ObjectId(item.itemId));
        if (!itemData) {
          throw new Error("Item not found");
        }

        if (itemData.stock < item.quantity) {
          throw new Error("Stock not enough");
        }

        await this.orderDetail().insertOne(
          {
            orderId: newOrder.insertedId,
            itemId: item.itemId,
            quantity: item.quantity,
            price: itemData.price,
          },
          { session }
        );
        console.log(itemData._id);

        await ItemModel.updateStock(itemData._id, item.quantity);
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
      await client.close();
    }
  }
}

export default OrderModel;

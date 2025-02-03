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
      const idPorject = new ObjectId(projectId);
      const o = {
        orderDate: orderDate,
        projectId: idPorject,
      };
      const newOrder = await this.collection().insertOne(o, { session });

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
            itemId: new ObjectId(item.itemId),
            quantity: item.quantity,
            price: itemData.price,
          },
          { session }
        );

        await ItemModel.minStock(itemData._id, item.quantity);
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

  static async return(orderId, body) {
    const { returnItems, returnDate } = body;
    const id = new ObjectId(orderId);

    await client.connect();
    const session = client.startSession();

    try {
      session.startTransaction();

      let totalAmount = 0;

      const order = await this.collection().findOne({ _id: id }, { session });
      if (!order) {
        throw new Error("Order not found");
      }

      for (const item of returnItems) {
        const id = new ObjectId(item.itemId);
        const qty = item.quantity;

        const orderDetail = await this.orderDetail().findOne(
          {
            itemId: id,
            orderId: order._id,
          },
          { session }
        );

        await ItemModel.plusStock(id, qty, { session });

        if (orderDetail.quantity - qty >= 0) {
          const newQty = orderDetail.quantity - qty;
          await this.orderDetail().updateOne(
            { _id: orderDetail._id },
            { $set: { quantity: newQty } },
            { session }
          );

          if (newQty > 0) {
            const id = new ObjectId(orderDetail.projectId);
            const o = {
              orderDate: order.orderDate,
              projectId: id,
            };
            const newOrder = await this.collection().insertOne(o, {
              session,
            });

            await this.orderDetail().updateOne(
              {
                _id: orderDetail._id,
              },
              {
                $set: { orderId: newOrder.insertedId },
              }
            );
          }
        } else {
          throw new Error(
            `Cannot reduce quantity below zero for itemId: ${item.itemId}`
          );
        }

        const rentDuration = Math.ceil(
          (new Date(returnDate) - new Date(order.orderDate)) /
            (1000 * 60 * 60 * 24 * 30)
        );
        totalAmount += orderDetail.price * rentDuration * item.quantity;
      }

      await this.collection().updateOne(
        { _id: order._id },
        { $set: { returnDate, totalAmount, status: "completed" } },
        { session }
      );

      // await session.commitTransaction();
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

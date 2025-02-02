import OrderModel from "@/db/models/orderModel";

export async function POST(req) {
  const body = await req.json();

  await OrderModel.create(body);
  return Response.json({ message: "Order created" });
}

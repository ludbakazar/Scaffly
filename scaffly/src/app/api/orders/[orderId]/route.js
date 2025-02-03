import OrderModel from "@/db/models/orderModel";

export async function PUT(req, { params }) {
  const { orderId } = await params;
  const body = await req.json();
  await OrderModel.return(orderId, body);

  return Response.json({ message: "s" });
}

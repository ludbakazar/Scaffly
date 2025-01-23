import ItemModel from "@/db/models/itemModel";

export async function POST(req) {
  const { name, stock, price } = await req.json();
  const newItem = {
    name: name,
    stock: stock,
    price: price,
  };
  await ItemModel.create(newItem);

  return Response.json({ message: "Item created" });
}

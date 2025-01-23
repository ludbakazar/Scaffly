import ItemModel from "@/db/models/itemModel";

export async function POST(req) {
  const { kode, name, stock, price } = await req.json();

  const newItem = {
    kode: kode,
    name: name,
    stock: stock,
    price: price,
  };
  await ItemModel.create(newItem);

  return Response.json({ message: "Item created" });
}

export async function GET(req) {
  const items = await ItemModel.getAll();
  return Response.json(items);
}

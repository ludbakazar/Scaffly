import ItemModel from "@/db/models/itemModel";

export async function PUT(req, { params }) {
  const { kode } = await params;

  const { name, stock, price } = await req.json();
  const updatedItem = {
    name: name,
    stock: stock,
    price: price,
  };

  await ItemModel.update(kode, updatedItem);

  return Response.json({ message: "Item updated" });
}

import CustomerModel from "@/db/models/customerModel";

export async function GET(req, { params }) {
  const { id } = await params;
  const customer = await CustomerModel.findById(id);

  return Response.json(customer);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const { name, identityNumber, phoneNumber, address } = await req.json();
  const newCustomer = {
    name: name,
    identityNumber: identityNumber,
    phoneNumber: phoneNumber,
    address: address,
  };
  await CustomerModel.update(id, newCustomer);

  return Response.json({ message: "PUT" });
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  await CustomerModel.delete(id);

  return Response.json({ message: "DELETE" });
}

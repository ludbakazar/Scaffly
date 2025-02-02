import CustomerModel from "@/db/models/customerModel";

export async function POST(req) {
  const { name, identityNumber, phoneNumber, address } = await req.json();

  const newCustomer = {
    name: name,
    identityNumber: identityNumber,
    phoneNumber: phoneNumber,
    address: address,
  };

  await CustomerModel.create(newCustomer);

  return Response.json({ message: "Customer created" });
}

export async function GET(req) {
  const customers = await CustomerModel.findAll();

  return Response.json(customers);
}

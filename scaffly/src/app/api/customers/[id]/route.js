import CustomerModel from "@/db/models/customerModel";

export async function GET(req, { params }) {
  const { id } = await params;
  const customer = await CustomerModel.findById(id);

  return Response.json(customer);
}

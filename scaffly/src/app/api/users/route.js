export async function POST(req) {
  const user = await req.json();
  console.log(user);

  return Response.json({ message: "User created" });
}

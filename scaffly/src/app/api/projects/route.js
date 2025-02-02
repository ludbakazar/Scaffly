import ProjectModel from "@/db/models/projectModel";

export async function POST(req) {
  const { customerId, projectName, projectAddress } = await req.json();
  const newProject = {
    customerId: customerId,
    projectName: projectName,
    projectAddress: projectAddress,
  };
  await ProjectModel.create(newProject);
  return Response.json({ message: "Project created successfully" });
}

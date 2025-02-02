import ProjectModel from "@/db/models/projectModel";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { customerId, projectName, projectAddress } = await req.json();
  const newProject = {
    customerId: new ObjectId(customerId),
    projectName: projectName,
    projectAddress: projectAddress,
  };
  await ProjectModel.create(newProject);
  return Response.json({ message: "Project created successfully" });
}

export async function GET(req) {
  const projects = await ProjectModel.findAll();
  return Response.json(projects);
}

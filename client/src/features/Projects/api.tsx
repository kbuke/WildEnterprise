import { fetchAllInstances, postInstance } from "../../api/client";
import type { AllProjects, PostProject } from "./types";

export const fetchAdminProjects = () => fetchAllInstances<AllProjects[]>("/api/admin/projects")

export const fetchAllProjects = () => fetchAllInstances<AllProjects[]>("/api/projects")

export const postProject = (newProject: PostProject) => 
    postInstance<PostProject, AllProjects>("/api/admin/projects", newProject)
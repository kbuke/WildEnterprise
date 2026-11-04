import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { AdminSectionHeader } from "../../components/layout/adminSectionHeader"
import { fetchAdminProjects } from "../../features/Projects/api"
import { AddProject } from "./AddProject"

export function AdminProjects() {
    const [addProject, setAddProject] = useState(false)

    const { data: projects, isPending, isError } = useQuery({
        queryKey: ["projects", "admin"],
        queryFn: fetchAdminProjects,
    })

    return (
        <section>
            <AdminSectionHeader
                header="Projects"
                setAddInstance={() => setAddProject(!addProject)}
            />

            {isPending && <p className="text-center">Loading projects...</p>}
            {isError && <p className="text-center text-red-600">Could not load projects</p>}
            {projects?.length === 0 && (
                <p className="text-center font-bold my-4 text-red-600">
                    No projects yet, add one above.
                </p>
            )}

            <div className="grid grid-cols-3 gap-4">
                {projects?.map((p) => (
                    <div key={p.id}>
                        <div className="card-img-bg">
                            {p.img
                                ? <img src={p.img} alt={p.name} className="card-img" />
                                : <p className="text-center">No image yet</p>}
                        </div>
                        <h1>{p.name}</h1>
                        <p>
                            <span className="font-bold">Status:</span>{" "}
                            <span className={p.status === "Draft" ? "text-orange-600" : "text-green-700"}>
                                {p.status}
                            </span>
                        </p>
                    </div>
                ))}
            </div>

            {addProject && <AddProject onClose={() => setAddProject(false)} />}
        </section>
    )
}
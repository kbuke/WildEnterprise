import { AdminIconContainer } from "../../../CustomComponents/AppAdminComponents/AdminIconContainers"

export function AppAdminDashboard(){

    const renderedIcons = (
        title: string
    ) => {
        return(
            {
                icon: `/${title}Icon.png`,
                title: title,
                link: `/admin/${title.toLowerCase()}`
            }
        )
    }

    const adminIcons = [
        renderedIcons("Hotels"),
        renderedIcons("Activities"),
        renderedIcons("Events"),
        renderedIcons("Parks")
    ]

    return(
        <section>
            <h1>
                Admin Logged In
            </h1>

            <div
                className="grid grid-cols-3 justify-items-center gap-10"
            >
                <AdminIconContainer 
                    props={adminIcons}
                />
            </div>
        </section>
    )
}
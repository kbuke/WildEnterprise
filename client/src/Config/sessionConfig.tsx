export type LoginType = "Hotel" | "Admin" | "Partner Hotel"

export const sessionConfig: Record<LoginType, {
    title: string
    login: string
    logout: string
    check: string
    loginPath: string
}> = {
    "Admin": {
        title: "WildEnterprise Admin",
        login: "admin/login",
        logout: "admin/logout",
        check: "admin/checksession",
        loginPath: "/adminlogin",
    },
    "Hotel": {
        title: "WildEnterprise Hotel",
        login: "hotels/login",
        logout: "hotels/logout",
        check: "hotels/checksession",
        loginPath: "/hoteladminlogin",
    },
    "Partner Hotel": {
        title: "Partner Hotel",
        login: "hotels/partner/login",
        logout: "hotels/partner/logout",
        check: "hotels/partner/checksession",
        loginPath: "/partnerhoteladminlogin",
    },
}
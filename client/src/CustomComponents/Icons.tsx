export function RenderIcon<T extends string>(logoText: T) {
    return {
        logo: `/${logoText}Icon.png`,
        title: logoText
    }
}
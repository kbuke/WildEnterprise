import type { ReactNode } from "react"

type AdminPopUpInfoNavType<TCat extends string> = {
    logo: string
    title: TCat
}

type AdminPopUpInfoType<TCat extends string> = {
    navs: AdminPopUpInfoNavType<TCat>[]
    title: string
    children: ReactNode
    onClose: () => void
    onNavSelect: (title: TCat) => void      // was setParkCat
    navSelect: string
}

export function AdminPopUpInfo<TCat extends string>({
    navs,
    title,
    children,
    onClose,
    onNavSelect,                              // was setParkCat
    navSelect
}: AdminPopUpInfoType<TCat>){
    console.log(navSelect)
    return(
        <div
            className="bg-white rounded h-[80%] w-[90%] self-center justify-center grid grid-cols-[1fr_4fr]"
        >
            {/* NavBar */}
            <div
                className="h-full border-r border-gray-600/40 flex flex-col items-center"
            >
                {navs.map((nav) => {
                    const { logo, title: navTitle } = nav
                    return(
                        <div
                            key={navTitle}
                            className={`${navSelect === navTitle && "bg-gray-400/40 text-white rounded hover:bg-gray-400/40"} flex items-center py-4 gap-8 border-b w-[80%] px-4 cursor-pointer hover:bg-gray-400 mt-2 hover:rounded`}
                            onClick={() => onNavSelect(navTitle)}
                        >
                            <img
                                src={logo}
                                alt={navTitle}
                                className="h-12"
                            />
                            <p className="font-bold text-xl">
                                {navTitle}
                            </p>
                        </div>
                    )
                })}
            </div>

            {/* Title and Info */}
            <div>
                <div
                    className="py-4 mt-4 px-20 flex justify-between items-center border-b w-[98%] justify-self-center sticky"
                >
                    <h2 className="font-bold text-3xl tracking-[2px]">
                        {title}
                    </h2>

                    <button
                        className="bg-red-600 rounded text-white px-6 h-10 cursor-pointer"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
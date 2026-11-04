type TwoHeroSectionsProps = {
    pI1: string,
    pI2: string,
    logo?: string,
    text?: string
    header?:string
}

export function TwoImgHeroSection({
    pI1,
    pI2,
    logo,
    text,
    header
}: TwoHeroSectionsProps){
    return(
        <section
            className="lg:grid h-auto lg:h-180 w-full grid-cols-2 gap-3 overflow-hidden bg-white"
        >
            <div
                style={{backgroundImage: `url(${pI1})`}}
                className="bg-cover bg-center h-120 lg:h-180"
            >
                {header &&
                    <div
                        className="flex h-full w-full flex-col justify-end items-start bg-black/40 px-20 text-white items-center"
                    >
                        <h1
                            className="uppercase font-bold text-8xl mb-4"
                        >
                            {header}
                        </h1>
                    </div>
                }
            </div>
        </section>
    )
}
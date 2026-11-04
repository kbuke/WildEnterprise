import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type ImgNameInfoProps = {
    img: string
    name: string
    subheading?: string
    info?: string
    id: number
    link?: string
    additionalInfo?: ReactNode
    bookButton?: boolean
    onBook?: () => void
}

export function ImgNameInfo({
    img,
    name,
    subheading,
    info,
    id,
    link,
    additionalInfo,
    bookButton,
    onBook,
}: ImgNameInfoProps){

    const trimInfo = info?.trim()
    const infoChars = trimInfo?.length

    console.log(infoChars)

    return(
        <>
            <div
                className={`border-b border-sunset py-4 lg:border-b-0 lg:${id % 2 == 1 && "border-r"} lg:grid lg:grid-cols-2`}
            >
                <div
                    className="card-img-bg"
                >
                    <img 
                        alt={`${name}-img`}
                        src={img}
                        className="card-img"
                    />
                </div>

                <div
                    className="self-end"
                >
                    <h1
                        className="uppercase primary-card-header mb-0"
                    >
                        {name}
                    </h1>

                    {
                        subheading &&
                            <h2
                                className="mb-2 text-card-sub-header"
                            >
                                {subheading}
                            </h2>
                    }

                    {
                        additionalInfo &&
                            additionalInfo
                    }

                    <p>
                        {info && infoChars&& infoChars > 199 ?
                            info.slice(0, 199)
                            : info
                        }
                        {/* {info} */}
                    </p>

                    {
                        link &&
                            <button
                                className="more-info-btn"
                            >
                                <Link
                                    to={link}
                                >
                                    More Info
                                </Link>
                            </button> 
                    }

                    {
                        bookButton &&
                            <button
                                className="green-button"
                                onClick={onBook}
                            >
                                Book {name}
                            </button>
                    }
                </div>
            </div>
        </>
    )
}
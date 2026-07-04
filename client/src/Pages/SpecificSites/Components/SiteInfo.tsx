import { useState } from "react";
import type { SiteInfoType } from "../../../Types";
import { SiteVideo } from "./SiteVideo";
import { PopUp } from "../../../Components.tsx/PopUp";
import { EnlargedImg } from "./EnlargedImg";


export function SiteInfo({
    name,
    info,
    img1,
    img2,
    img3
}: SiteInfoType){

    const [highlightedImg, setHighlightedImg] = useState(img1) 
    const [selectedImg, setSelectedImg] = useState<string>()

    const siteVideo: string | null = null

    return(
        <section
            className="mb-4 py-10"
        >
            {selectedImg &&
                <PopUp>
                    <EnlargedImg 
                        img={selectedImg}
                        onCancel={() => setSelectedImg(undefined)}
                    />
                </PopUp>
            }

            <div
                className="grid grid-cols-2 "
            >
                <div
                    className="p-4"
                >
                    <h1
                        className="siteHeadings"
                    >
                        About {name}
                    </h1>

                    <h2
                        className="text-xl tracking-[2px]"
                    >
                        {info}
                    </h2>
                </div>

                <div
                    className="p-4 relative mb-100"
                >
                    <img 
                        // className="siteMainImg z-10 right-40 top-10"
                        className={`siteMainImg z-20 right-40 top-10 ${highlightedImg === img1 && "z-30 scale-110"}`}
                        src={img1}
                        onMouseEnter={() => setHighlightedImg(img1)}
                        onClick={() => setSelectedImg(img1)}
                    />

                    <img 
                        // className="siteMainImg z-8 right-10"
                        className={`siteMainImg z-10 top-20 ${highlightedImg === img2 && "z-30 scale-110"}`}
                        src={img2}
                        onMouseEnter={() => setHighlightedImg(img2)}
                        onMouseLeave={() => setHighlightedImg(img1)}
                        onClick={() => setSelectedImg(img2)}
                    />

                    <img 
                        // className="siteMainImg z-8 top-20"
                        className={`siteMainImg z-10 right-10 ${highlightedImg === img3 && "z-30 scale-110"}`}
                        src={img3}
                        onMouseEnter={() => setHighlightedImg(img3)}
                        onMouseLeave={() => setHighlightedImg(img1)}
                        onClick={() => setSelectedImg(img3)}
                    />
                </div>
            </div>

            <SiteVideo 
                name={name}
                siteVideo={siteVideo}
            />
        </section>
    )
}
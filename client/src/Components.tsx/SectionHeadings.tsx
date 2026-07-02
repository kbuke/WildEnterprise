import type { SectionHeadingType } from "../Types";

export function SectionHeading({
    heading,
    textWhite
}: SectionHeadingType) {
    return (
        <div>
            <h1
                className={`text-4xl tracking-[4px] inline-block pb-2 border-b-2 ${
                    textWhite ? "text-white border-white" : "text-black border-black"
                }`}
            >
                {heading}
            </h1>
        </div>
    )
}
import { useQuery } from "@tanstack/react-query"
import { fetchAllParks } from "../../features/Parks/api"
import { ImgNameInfo } from "../../components/ui/ImgNameInfo"

export function ParkSection(){

    const {data: allParks} = useQuery({
        queryKey: ["parks"],
        queryFn: fetchAllParks
    })


    return(
        <div
            className="pt-10"
        >
            <div
                className="px-6 lg:px-40 mb-10"
            >
                <h1
                    className="font-meta primary-header uppercase"
                >
                    Sites
                </h1>

                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, provident dicta porro ipsam qui necessitatibus, minus fugit ea maxime, tenetur quasi unde ut quibusdam ab cupiditate assumenda distinctio voluptas velit.
                </p>
            </div>

            <div
                className="bg-coal px-2 py-4 mt-4 h-auto flex flex-col gap-10 items-center text-white lg:grid lg:grid-cols-2"
            >
                {allParks &&
                    allParks.map((park, index) => {
                        const{
                            name,
                            slug,
                            img,
                            info,
                            location,
                            id,
                            card_info,
                        } = park

                        return(
                            <ImgNameInfo 
                                key={index}
                                img={img}
                                name={name}
                                subheading={location}
                                info={info}
                                id={id}
                                link={`/parks/${slug}/${id}`}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
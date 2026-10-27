import { HeroSection } from "./HeroSection";
import { ParkSection } from "./ParkSection";

export function Home(){
    return(
        <section
            className="overflow-hidden"
        >
            <HeroSection />
            <ParkSection />
        </section>
    )
}
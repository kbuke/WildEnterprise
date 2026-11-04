import { ArticleSection } from "./ArticleSection";
import { HeroSection } from "./HeroSection";
import { ParkSection } from "./ParkSection";
import { UpcomingEvents } from "./UpcomingEvents";

export function Home(){
    return(
        <section
            className="overflow-hidden"
        >
            <HeroSection />
            <ParkSection />
            <UpcomingEvents />
            <ArticleSection />
        </section>
    )
}
import { useRef, useState } from "react"

type SiteVideoType = {
    name: string,
    siteVideo: string | null
}

const videoModules = import.meta.glob("../../../../Resources/*Vid.mp4", {
    eager: true,
    query: "?url",
    import: "default"
}) as Record<string, string>

const videoMap: Record<string, string> = {}
for (const path in videoModules){
    const filename = path.split("/").pop()!
    const siteName = filename.replace("Vid.mp4", "")
    videoMap[siteName] = videoModules[path]
}

export function SiteVideo({ name, siteVideo }: SiteVideoType){
    siteVideo = videoMap[name] ?? null
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
        if (!videoRef.current) return
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
    }

    if (!siteVideo) return null

    return (
        <div className="relative mt-14 px-10 py-6 bg-black/80">
            <video
                ref={videoRef}
                className="w-full rounded"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
            >
                <source src={siteVideo} type="video/mp4" />
            </video>

            {!isPlaying && (
                <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                    aria-label="Play video"
                >
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80">
                        {/* play triangle icon */}
                        <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1" fill="black">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                </button>
            )}
        </div>
    )
}
type FiveHeroSectionProps = {
    pI1: string,
    pI2: string,
    pI3?: string,
    pI4?: string,
    logo?: string,
    text?: string
    header?:string
}

export function FourImgHeroSection({
    pI1,
    pI2,
    pI3,
    pI4,
    logo,
    text,
    header
}: FiveHeroSectionProps){
    return (
    <section className="lg:grid h-auto lg:h-180 w-full grid-cols-2 gap-3 overflow-hidden bg-white">
      {/* LEFT: hero with overlay */}
      <div
        className="bg-cover bg-center h-120 lg:h-180"
        style={{backgroundImage: `url(${pI1})`}}
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
        
        {logo && text &&
            <div className="flex h-full w-full flex-col justify-center bg-black/40 px-20 text-white items-center">
            <img 
                src={logo}
                alt="we-logo"
            />
            <p className="max-w-md text-lg leading-relaxed">
                {text}
            </p>
            </div>
        }
      </div>

      {/* RIGHT */}
      <div className="min-h-0 pt-3">
        <div className="relative h-full w-full">
          {/* two stacked photos, FULL width of the column */}
          <div className="grid h-full grid-rows-2 gap-3">
            <img src={pI2} alt="" className="h-full w-[89%] object-cover" />
            <img src={pI3} alt="" className="h-full w-[89%] object-cover" />
          </div>

          {/* ring: as tall as the column, shifted right so ~60% is visible */}
          <div className="absolute right-0 top-0 aspect-square h-full translate-x-[47%] lg:translate-x-[45%] rounded-full border-10 border-white bg-sunset">
            {/* portrait circle */}
            <div className="absolute inset-[16%] overflow-hidden rounded-full border-10 border-white">
              <img
                src={pI4}
                alt=""
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
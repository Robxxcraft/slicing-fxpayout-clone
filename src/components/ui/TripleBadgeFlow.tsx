const TripleBadgeFlow = ({
  first, 
  second, 
  third
}: {
  first: string; 
  second: string; 
  third: string
}) => {
  const isMobile = window.innerWidth < 768;

  const clipPathLeft = "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)";
  const clipPathRight = "polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)";
  const clipPathMobile = "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-5xl h-full">
      <div className="filter h-full drop-shadow-[0_0_1px_#000000]">
        <div 
          className="px-6 py-3 h-full md:py-4 flex items-center gap-2 md:gap-4 bg-white text-primary clip-path-[]"
          style={{ clipPath: isMobile ? clipPathMobile : clipPathLeft }}
        >
          <div className="flex shrink-0 items-center justify-center size-8 lg:size-10 rounded-full border border-primary">
            <span className="font-medium text-sm">01</span>
          </div>
          <p className="w-fit text-sm font-medium break-">{first}</p>
        </div>
      </div>

      <div className="filter h-full drop-shadow-[0_0_1px_#000000]">
        <div 
          className="px-6 py-3 h-full md:py-4 flex items-center gap-2 md:gap-4 bg-white text-[#ABB7C2]"
          style={{ clipPath: isMobile ? clipPathMobile : "" }}
        >
          <div className="flex shrink-0 items-center justify-center size-8 lg:size-10 rounded-full border border-[#ABB7C2]">
            <span className="font-medium">02</span>
          </div>
          <p className="w-fit text-sm font-medium">{second}</p>
        </div>
      </div>

      <div className="filter h-full drop-shadow-[0_0_1px_#000000]">
        <div 
          className="px-6 py-3 h-full md:py-4 flex items-center gap-2 md:gap-4 bg-white text-[#ABB7C2]"
          style={{ clipPath: isMobile ? clipPathMobile : clipPathRight }}
        >
          <div className="flex shrink-0 items-center justify-center size-8 lg:size-10 rounded-full border border-[#ABB7C2]">
            <span className="font-medium">03</span>
          </div>
          <p className="w-fit text-sm font-medium">{third}</p>
        </div>
      </div>
    </div>
  )
}

export default TripleBadgeFlow;

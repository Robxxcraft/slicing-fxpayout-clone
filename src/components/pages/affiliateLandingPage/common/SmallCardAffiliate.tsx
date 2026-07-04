import MaskSvg from "@/components/ui/MaskSvg";
import { MdTrendingUp } from "react-icons/md";

interface SmallCardAffiliateProps {
  title: string;
  paragraph: string;
  smallParagraph?: string;
  urlImage: string;
  label: string;
  colorSVGCL: string;
  colorbgImageCL: string;
  skor: string;
  info: string;
}

const SmallCardAffiliate = ({
  title,
  paragraph,
  smallParagraph,
  urlImage,
  label,
  skor,
  info,
  colorSVGCL,
  colorbgImageCL
}: SmallCardAffiliateProps) => {
  return (
    <div className="p-2.5 md:p-4 3xl:p-5 bg-white rounded-md md:rounded-2xl w-fit md:w-full lg:w-60 3xl:w-[320px] shadow-[6px_22px_55.5px_0_rgba(0,0,0,0.18)]">
      <div className="flex justify-between gap-4 md:gap-8">
        <div className="space-y-3 3xl:space-y-6">
          <p className="text-[10px] md:text-lg lg:text-sm 3xl:text-xl font-medium text-[#202224]/70">
            {title}
          </p>
          <p className="text-base md:text-2xl 3xl:text-[32px] font-semibold">
            {paragraph}
            {smallParagraph && 
              <span className="text-sm">
                {smallParagraph}
              </span>
            }
          </p>
        </div>
        <div className={`${colorbgImageCL} shrink-0 p-2 md:p-4 size-10 md:size-15 lg:size-12 3xl:size-15 flex justify-center items-center rounded-lg md:rounded-2xl`}>
          <MaskSvg 
            icon={urlImage} 
            label={label} 
            color={colorSVGCL}   
            className="size-full object-contain"         
          />
        </div>
      </div>
      <div className="mt-3 3xl:mt-6 flex gap-1.5 3xl:gap-2.5 items-center font-semibold text-[#606060]">
        <MdTrendingUp className="shrink-0 text-sm md:text-lg 3xl:text-2xl text-[#00B69B]" />
        <p className="text-[10px] md:text-lg lg:text-sm 3xl:text-xl">
          <span className="font-medium text-[#00B69B]">
            {skor}
          </span>
          {" "} {info}
        </p>
      </div>
    </div>
  )
}

export default SmallCardAffiliate;

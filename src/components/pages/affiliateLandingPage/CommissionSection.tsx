import BadgeSection from "@/components/ui/BadgeSection";
import MaskSvg from "@/components/ui/MaskSvg";
import { formattingEmptyCurrency } from "@/helper/formattingCurrency";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";
import { getTrackBackground, Range } from "react-range";

const traderMarks = [5, 50, 100, 200, 300, 400, 500];

const CommissionSection = () => {
  const { i18n, t } = useTranslation(["common", "affiliatelandingpage"]);
  const [traders, setTraders] = useState<number[]>([100]);
  
  const key = "affiliatelandingpage:commissionsection";
  const isRtl = i18n.dir() === "rtl";

  const commissionPerTrader = 100;
  const estimatedCommission = traders[0] * commissionPerTrader;

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 py-10 md:py-15 xl:py-[120px] bg-[#F9F9F9]">
      <div className="flex flex-col items-center justify-center gap-4">
        <BadgeSection
          icon={
            <img src="/hand-money-white.svg" alt="Money" 
              className="scale-90 md:scale-100" />
        }>
          {t(`${key}.badge`)}
        </BadgeSection>
        <h2 className="text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%] text-center">
          {t(`${key}.title`)}
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-5xl text-center">
          {t(`${key}.paragraph`)}
        </p>
      </div>

      <div className="mt-6 md:mt-10 p-4 md:p-6 bg-white border border-primary rounded-[20px] shadow-[0_5px_30px_0] shadow-[#19213D]/6">
        
        <div className="pb-4 flex flex-col gap-2 items-center border-b border-black/20">
          <div className="flex gap-3 items-center">
            <MaskSvg 
              icon={"/hand-money.svg"} 
              label={"Money"} 
              color={"bg-primary"}
              className="shrink-0 size-6 md:size-10 object-contain"           
            />
            <h3 className="text-xl md:text-[32px] font-semibold text-my-dark-purple text-center">
              {t(`${key}.subtitle`)}
            </h3>
          </div>
          <p className="text-base md:text-xl font-medium text-black/50 leading-[178%] text-center">
            {t(`${key}.subparagraph`)}
          </p>
        </div>

        <div className="mt-6 pb-10 border-b border-black/20">
          <div className="flex justify-between items-center">
            <p className="font-medium text-base md:text-2xl lg:text-xl 3xl:text-2xl text-[#344054] max-w-1/2">
              {t(`${key}.total_refferal`)}
            </p>
            <p className="font-bold text-base md:text-2xl lg:text-xl 3xl:text-2xl text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              {traders} {t("text.title_traders")}
            </p>
          </div>
          
          <div className="mt-2">
            <Range 
                values={traders} 
                min={5}
                max={500}
                allowOverlap={false}
                rtl={isRtl}
                onChange={(values) => setTraders(values)} 
                renderTrack={({ props, children }) => {
                  const trackColors = isRtl ? [
                    "rgba(48,127,226,0.3)", // passive kanan
                    "#4160FF",             // active
                  ] : [
                    "#4160FF",             // active
                    "rgba(48,127,226,0.3)", // passive kanan
                  ];
                  
                  return (
                    <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "8px",
                        width: "100%",
                        background: getTrackBackground({
                            values:  isRtl
                              ? [500 - (traders[0] - 5)]
                              : traders,
                            colors: trackColors,
                            min: 5,
                            max: 500,
                        }),
                    }}
                    className="rounded-full"
                    >
                        {children}
                    </div>
                )}} 
                renderThumb={({ props }) => (
                    <div
                    {...props}
                    key={props.key}
                    style={{
                        ...props.style,
                        height: "18px",
                        width: "18px",
                    }}
                    className="p-1 bg-primary rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    />
                )}          
            />
          </div>

          <div className="mt-3 relative">
            {traderMarks.map((mark, index) => {
              let style: React.CSSProperties = {};
              let className = "absolute top-0 text-sm md:text-xl lg:text-base 3xl:text-xl text-[#344054] font-medium ";

              const min = traderMarks[0];
              const max = traderMarks[traderMarks.length - 1];
              if (index === 0) {
                style = isRtl ? { right: 0 } : { left: 0 };
              } else if (index === traderMarks.length - 1) {
                style = isRtl ? { left: 0 } : { right: 0 };
              } else {
                const position = ((mark - min) / (max - min)) * 100;
                className += isRtl ? "translate-x-1/2" : "-translate-x-1/2";
                style = isRtl ? { right: `${position}%` } : { left: `${position}%` };
              }

              return (
                <span key={mark}
                  className={className}
                  style={style}
                >{mark}</span>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap lg:flex-nowrap justify-center items-center">
          {[t(`${key}.benefits.0`), t(`${key}.benefits.1`), t(`${key}.benefits.2`)]
          .map((item, index) => (
            <div key={index}
              className={`flex items-center justify-center gap-3
                ${index === 0 ? "order-1 pe-0 lg:pe-8 w-1/2 lg:w-fit border-e border-black/20 lg:border-0":""}  
                ${index === 1 ? "order-3 lg:order-2 px-0 lg:px-8 border-0 lg:border-x border-black/20":""}  
                ${index === 2 ? "order-2 lg:order-3 ps-0 lg:ps-8 w-1/2 lg:w-fit":""}  
            `}>
              <FaCircleCheck className="shrink-0 text-primary text-base lg:text-xl 3xl:text-2xl" />
              <p className="text-base md:text-xl 3xl:text-2xl font-medium text-primary leading-[200%] text-center">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 md:p-6 w-full bg-primary rounded-xl text-white text-center">
          <p className="text-base md:text-xl font-medium">
            {t(`${key}.potential_commission`)}
          </p>
          <p dir="ltr" className="my-3 text-[32px] md:text-[48px] 3xl:text-[64px] font-bold">
            ${formattingEmptyCurrency(estimatedCommission, 0)}
            <span className="text-base md:text-2xl 3xl:text-[32px] font-semibold">
              / {t("text.month")}
            </span>
          </p>
          <p className="text-[10px] md:text-sm">
            {t(`${key}.info`)}
          </p>
        </div>
      </div>
    </section>
  )
}

export default CommissionSection;

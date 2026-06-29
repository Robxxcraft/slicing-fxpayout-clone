import Button from "@/components/ui/Button";
import { getLocalizedPath } from "@/helper/pathHelper";
import type { RebateProgramType } from "@/utils/dataBroker/typeDetailBroker";
import { useTranslation } from "react-i18next";
import { IoArrowForwardOutline } from "react-icons/io5";
import { TiInfoLarge } from "react-icons/ti";

const RebateProgram = ({ detailData }: { detailData: RebateProgramType }) => {
  const { t, i18n } = useTranslation(["brokerdetailpage"]);
  let estimateEur;
  let estimateXau;
  const isRebateProgramText = typeof detailData === "string";
  if (!isRebateProgramText) {
    estimateEur = typeof detailData[0].estimate === "number" ? 
      `${detailData[0].estimate}` : `${detailData[0].estimate.max}`;
    estimateXau = typeof detailData[1].estimate === "number" ? 
      `${detailData[1].estimate}` : `${detailData[1].estimate.max}`;
  }

  return (
    <section className="scroll-mt-18 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <div className="px-6 2xl:px-10 py-10 2xl:py-14 grid grid-cols-1 lg:grid-cols-2 gap-6 2xl:gap-8 bg-primary rounded-2xl 2xl:rounded-3xl">
        <div>
          <h2 className="text-[36px] 2xl:text-[40px] font-bold leading-[132%] text-white">
            {t("brokerdetailpage:rebateProgram.title")}
          </h2>
          <p className="mt-4 text-base 2xl:text-xl leading-[160%] text-white">
            {t("brokerdetailpage:rebateProgram.subtitle")}
          </p>
          <Button 
            buttonType="link" 
            urlTo={getLocalizedPath("calculator", i18n.language)} 
            className="mt-6 w-full! lg:w-fit!" 
            variant="primary-light" 
            icon={<IoArrowForwardOutline className="rtl:scale-x-[-1]" />} 
            iconPosition="right" size="xl"
          >
            {t("brokerdetailpage:rebateProgram.button")}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 lg:gap-x-4 2xl:gap-x-6">
          {!isRebateProgramText &&
            <>          
              <div className="px-6 md:px-8 2xl:px-10 py-4 flex flex-col items-center w-full h-fit bg-[#F5F7FF]/20 border border-white rounded-2xl md:rounded-[20px]">
                <p className="text-base 2xl:text-xl font-semibold text-white">EUR/USD</p>
                <div className="mt-3 lg:mt-2 flex items-end text-white">
                  <p className="text-[30px] md:text-[36px] 2xl:text-[48px] lg:leading-14 font-semibold">
                    ${estimateEur}
                  </p>
                  <p className="text-base lg:text-lg 2xl:text-2xl leading-10 md:leading-9 2xl:leading-8 tracking-[10%] font-semibold">
                    / lot
                  </p>
                </div>
              </div>
              <div className="px-6 md:px-8 2xl:px-10 py-4 flex flex-col items-center w-full h-fit bg-[#F5F7FF]/20 border border-white rounded-2xl md:rounded-[20px]">
                <p className="text-base 2xl:text-xl font-semibold text-white">XAU/USD</p>
                <div className="mt-3 lg:mt-2 flex items-end text-white">
                  <p className="text-[30px] md:text-[36px] 2xl:text-[48px] lg:leading-14 font-semibold">
                    ${estimateXau}
                  </p>
                  <p className="text-base lg:text-lg 2xl:text-2xl leading-10 md:leading-9 2xl:leading-8 tracking-[10%] font-semibold">
                    / lot
                  </p>
                </div>
              </div>
            </>
          }
          <div className="col-span-2 p-4 flex gap-2 md:gap-3 bg-[#F0F9FF] rounded-[10px] h-fit">
            <span className="flex items-center justify-center size-6 border border-primary rounded-full">
              <TiInfoLarge className="text-sm text-primary" />
            </span>
            {isRebateProgramText ?
              <p className="w-fit text-base font-medium text-black/60">
                {detailData}
              </p>
            :
              <p className="w-fit text-sm font-medium text-black/60">
                {t("brokerdetailpage:rebateProgram.info")}
              </p>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default RebateProgram;

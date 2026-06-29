import type { SummaryBroker } from "@/utils/dataBroker/typeDetailBroker";
import BoundedIcon from "./ui/BoundedIcon";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";
import { useTranslation } from "react-i18next";

type SumaryStructure = {
  title: string;
  detail: string | string[];
  icon: string;
}
 
const Summary = ({ 
  brokerId,
  summaryBroker
}: { 
  brokerId: string;
  summaryBroker: SummaryBroker 
}) => {
  const { t } = useTranslation([brokerId, "brokerdetailpage"]);
  const finalSpread = Array.isArray(summaryBroker.spread) ? summaryBroker.spread.map((s) => t(s)) : t(summaryBroker.spread);
  const summaryItems: SumaryStructure[] = [
    { 
      title: "brokerdetailpage:summary.cardHeaders.minDeposit", 
      detail: `$${summaryBroker.minDeposit}`, 
      icon: "min-depo.svg" 
    },    { 
      title: "brokerdetailpage:summary.cardHeaders.accountType", 
      detail: summaryBroker.types.join(", "), 
      icon: "category-acc.svg" 
    },    { 
      title: "brokerdetailpage:summary.cardHeaders.spread", 
      detail: finalSpread, 
      icon: "spread.svg" 
    },    { 
      title: "brokerdetailpage:summary.cardHeaders.commission", 
      detail: t(summaryBroker.commission), 
      icon: "commision.svg" 
    },    { 
      title: "brokerdetailpage:summary.cardHeaders.leverage", 
      detail: t(summaryBroker.leverage), 
      icon: "leverage.svg" 
    },    { 
      title: "brokerdetailpage:summary.cardHeaders.execution", 
      detail: t(summaryBroker.execution), 
      icon: "order.svg" 
    },    { 
      title: "brokerdetailpage:summary.cardHeaders.instrument", 
      detail: summaryBroker.instruments.map((instrument) => t(instrument)).join(", "), 
      icon: "instrument.svg" 
    },    { 
      title: "brokerdetailpage:summary.cardHeaders.depositWithdrawal", 
      detail: t(summaryBroker.depositWithdrawal), 
      icon: "depo-withdraw.svg" 
    }
  ];

  return (
    <section id="summary" className="scroll-mt-18 lg:scroll-mt-0 pt-6 md:pt-10 px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <HeadingSection>{t("brokerdetailpage:summary.title")}</HeadingSection>
      <SubHeadingSection>{t("brokerdetailpage:summary.subtitle")}</SubHeadingSection>
      <div className="mt-6 2xl:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 2xl:gap-6">
        {summaryItems.map((item, idx) => (
          <div key={idx} className="px-5 2xl:px-8 py-4 2xl:py-6 flex gap-6 bg-[#F4F6FA] rounded-lg shadow-[0_3px_13.1px_0_rgba(0,0,0,0.1)] border-s-10 border-primary">
            <div className="w-fit">
              <BoundedIcon icon={`/brokerDetail/${item.icon}`} alt="Icon" />
            </div>
            <div className="flex w-fit flex-col gap-2 2xl:gap-4">
              <p className="text-base 2xl:text-xl leading-6 uppercase">{t(item.title)}</p>
              <p className="text-xl 2xl:text-2xl font-semibold leading-6">
                {Array.isArray(item.detail) ? 
                  item.detail.map((text: string) => (
                    <span key={text}>{text} <br/></span>
                  )):
                  item.detail
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Summary;

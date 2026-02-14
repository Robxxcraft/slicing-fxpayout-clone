import { useMemo } from "react";
import type { AccountTypeStruc } from "@/utils/dataBroker/typeDetailBroker";
import CardTypeAccount from "./ui/CardTypeAccount";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";
import { useTranslation } from "react-i18next";

const TypeAccount = ({ accountDetail }: { accountDetail: AccountTypeStruc[] }) => {
  const { t } = useTranslation(["brokerdetailpage"]);
  const gridCard = useMemo(() => {
    const MAX_COL = 3;
    const totalItems = accountDetail.length;
    const totalRows = Math.ceil(totalItems / MAX_COL);

    return Array.from({ length: totalRows}, (_, index) => {
      const isLastRow = index === totalRows - 1;
      const column = isLastRow ? totalItems - index * MAX_COL : MAX_COL;

      return {
        row: index + 1,
        column
      }
    })
  }, [accountDetail.length]);

  return (
    <section id="jenis-akun" className="scroll-mt-18 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>{t("brokerdetailpage:accountType.title")}</HeadingSection>
      <SubHeadingSection>{t("brokerdetailpage:accountType.subtitle")}</SubHeadingSection>
      <div className="mt-6 2xl:mt-8 flex flex-col gap-3 lg:gap-4 2xl:gap-6">
        {gridCard.map((value, index) => {
          let gridClass;
          if (value.column === 3) {
            gridClass = "grid-cols-1 xl:grid-cols-3";
          } else if (value.column === 2) {
            gridClass = "grid-cols-1 xl:grid-cols-2";
          } else {
            gridClass = "grid-cols-1";
          }
          const containerClass = `grid ${gridClass} gap-3 lg:gap-4 2xl:gap-6`; 
          const startIndex = index * 3;
          const lastIndex = startIndex + value.column;
          
          return (
            <div key={index} className={containerClass}>
              {accountDetail.slice(startIndex, lastIndex).map((detail, idx) => {
                return <CardTypeAccount key={idx} account={detail} />
              })}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TypeAccount;

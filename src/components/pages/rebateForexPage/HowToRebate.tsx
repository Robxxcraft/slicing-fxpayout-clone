import React from "react";
import WorkflowCards from "@/components/WorkflowCards";
import { useTranslation } from "react-i18next";

const HowToRebate = ({
  sectionsRef
}: {
  sectionsRef: React.RefObject<Record<string, HTMLElement | null>>
}) => {
  const { t } = useTranslation(["claimrebatepage"]);
  return (
    <section
      id="how-to-rebate"
      ref={el => {sectionsRef.current["how-to-rebate"] = el}}
      className="pt-8 md:pt-10 xl:pt-20 scroll-mt-[66px] lg:scroll-mt-9 border-t xl:border-0 border-[#E5E5E5]"
    >
      <div className="px-6 md:px-11 xl:px-0 xl:pr-24 2xl:pr-56">
        <h2 className="font-medium text-2xl md:text-[2rem] 2xl:text-[2.5rem]">
          {t("claimrebatepage:howRebate.title")}
        </h2>
        <p className="mt-6 text-xl 2xl:text-2xl leading-[169.2%]">
          {t("claimrebatepage:howRebate.paragraph")}
        </p>
        <WorkflowCards />
      </div>
    </section>
  )
}

export default HowToRebate;

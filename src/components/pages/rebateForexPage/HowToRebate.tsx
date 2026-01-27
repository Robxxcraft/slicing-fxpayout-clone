import React from "react";
import WorkflowCards from "@/components/WorkflowCards";

const HowToRebate = ({sectionsRef}: {sectionsRef: React.RefObject<Record<string, HTMLElement | null>>}) => {
  return (
    <section
      id="how-to-rebate"
      ref={el => {sectionsRef.current["how-to-rebate"] = el}}
      className="mt-10 lg:mt-18 xl:mt-20 scroll-mt-[136px] lg:scroll-mt-[120px]"
    >
      <h2 className="font-medium text-2xl md:text-[32px] 2xl:text-[40px]">
        Cara mendapat rebate
      </h2>
      <p className="mt-4 md:mt-6 text-base md:text-xl 2xl:text-2xl leading-[169.2%]">
        Saat Anda membuka akun trading Forex (atau menghubungkan akun yang sudah ada) melalui kami, broker Anda akan membayar rebate kepada kami 
      </p>
      <WorkflowCards />
    </section>
  )
}

export default HowToRebate;

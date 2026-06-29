import React from "react";
import WorkflowCards from "@/components/WorkflowCards";
import { useTranslation } from "react-i18next";
import type { TypeWorkflowComponent } from "@/types/workflow.type";

const workflows: TypeWorkflowComponent[] = [
  {
    title: "mulai",
    subtitle: "Daftar lewat link resmi FXPayout",
    description:
      "Buat akun FXPayout dan hubungkan akun trading Anda melalui link resmi yang kami sediakan dari broker pilihan.",
    image: "flow-start.webp",
    translateKey: "homepage:howItWorks.workflows.0" 
  },
  {
    title: "trading",
    subtitle: "Trading seperti biasa di broker Anda",
    description:
      "Lanjutkan aktivitas trading tanpa perubahan spread, leverage, atau kondisi lain. Semua tetap mengikuti aturan broker.",
    image: "flow-trade.webp",
    translateKey: "homepage:howItWorks.workflows.1" 
  },
  {
    title: "komisi",
    subtitle: "Broker mengirim komisi IB ke FXPayout",
    description:
      "Berdasarkan volume lot yang Anda trading-kan, broker mengirimkan komisi IB ke FXPayout secara otomatis.",
    image: "flow-commision.webp",
    translateKey: "homepage:howItWorks.workflows.2" 
  },
  {
    title: "rebate",
    subtitle: "Rebate hingga 90% ke akun Anda",
    description:
      "Kami mengembalikan hingga 90% komisi tersebut sebagai cashback bisa dicairkan cepat via bank lokal atau e-wallet.",
    image: "flow-rebate.webp",
    translateKey: "homepage:howItWorks.workflows.3" 
  },
];

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
      <div className="px-6 md:px-11 xl:px-0 xl:pe-24 2xl:pe-56">
        <h2 className="font-medium text-2xl md:text-[2rem] 2xl:text-[2.5rem]">
          {t("claimrebatepage:howRebate.title")}
        </h2>
        <p className="mt-6 text-xl 2xl:text-2xl leading-[169.2%]">
          {t("claimrebatepage:howRebate.paragraph")}
        </p>
        <WorkflowCards 
          workflows={workflows}
        />
      </div>
    </section>
  )
}

export default HowToRebate;

import BadgeSection from "@/components/ui/BadgeSection";
import WorkflowCards from "@/components/WorkflowCards";
import type { TypeWorkflowComponent } from "@/types/workflow.type";
import { useTranslation } from "react-i18next";

const workflows: TypeWorkflowComponent[] = [
  {
    title: "DAFTAR",
    subtitle: "Daftar lewat link resmi FXPAYOUT",
    description:
      "Buat akun dan hubungkan ke broker partner melalui link yang kami sediakan.",
    image: "flow-start.webp",
    translateKey: "homepage:howItWorks.workflows.0" 
  },
  {
    title: "BUKA AKUN",
    subtitle: "Buka Akun di Broker Partner Kami",
    description:
      "Gunakan akun baru atau hubungkan akun existing sesuai instruksi.",
    image: "flow-open-account.webp",
    translateKey: "homepage:howItWorks.workflows.1" 
  },
  {
    title: "TRADING",
    subtitle: "Lakukan Trading Seperti Biasa",
    description:
      "Lanjutkan trading tanpa perubahan pada spread, leverage, atau kondisi lainnya.",
    image: "flow-trade.webp",
    translateKey: "homepage:howItWorks.workflows.2" 
  },
  {
    title: "REBATE",
    subtitle: "Terima Rebate Sesuai Level Anda Secara Otomatis",
    description:
      "Dapatkan cashback dari komisi trading Anda secara berkala atau sesuai permintaan.",
    image: "flow-commision.webp",
    translateKey: "homepage:howItWorks.workflows.3" 
  },
]

const HowTraderWorks = () => {
  const { t } = useTranslation(["homepage"]);

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col items-center text-center">
        <BadgeSection
          icon={
            <img src="/workflow.svg" alt="workflow" 
              className="scale-90 md:scale-100"/>
        }>
          {t("homepage:howItWorks.tag")}
        </BadgeSection>
        <h2 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
          {t("homepage:howItWorks.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%]">
          {t("homepage:howItWorks.paragraph")}
        </p>
      </div>
      <WorkflowCards 
        workflows={workflows}
      />
    </section>
  );
};

export default HowTraderWorks;

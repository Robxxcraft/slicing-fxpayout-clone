import FlowTrader from "@/components/FlowTrader";
import BadgeSection from "@/components/ui/BadgeSection";
import { useTranslation } from "react-i18next";

// const workflows: TypeWorkflowComponent[] = [
//   {
//     title: "mulai",
//     subtitle: "Daftar lewat link resmi FXPayout",
//     description:
//       "Buat akun FXPayout dan hubungkan akun trading Anda melalui link resmi yang kami sediakan dari broker pilihan.",
//     image: "flow-start.webp",
//     translateKey: "homepage:howItWorks.workflows.0" 
//   },
//   {
//     title: "trading",
//     subtitle: "Trading seperti biasa di broker Anda",
//     description:
//       "Lanjutkan aktivitas trading tanpa perubahan spread, leverage, atau kondisi lain. Semua tetap mengikuti aturan broker.",
//     image: "flow-trade.webp",
//     translateKey: "homepage:howItWorks.workflows.1" 
//   },
//   {
//     title: "komisi",
//     subtitle: "Broker mengirim komisi IB ke FXPayout",
//     description:
//       "Berdasarkan volume lot yang Anda trading-kan, broker mengirimkan komisi IB ke FXPayout secara otomatis.",
//     image: "flow-commision.webp",
//     translateKey: "homepage:howItWorks.workflows.2" 
//   },
//   {
//     title: "rebate",
//     subtitle: "Rebate hingga 90% ke akun Anda",
//     description:
//       "Kami mengembalikan hingga 90% komisi tersebut sebagai cashback bisa dicairkan cepat via bank lokal atau e-wallet.",
//     image: "flow-rebate.webp",
//     translateKey: "homepage:howItWorks.workflows.3" 
//   },
// ];

const HowItWorks = () => {
  const { t } = useTranslation(["homepage"]);

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col items-center text-center">
        <BadgeSection
          icon={
            <img src="/workflow.svg" alt="workflow" 
              className="scale-90 md:scale-100"/>
        }>
          {t("homepage:howItWorks.tag")}
        </BadgeSection>
        <h2 className="my-4 text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%]">
          {t("homepage:howItWorks.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%]">
          {t("homepage:howItWorks.paragraph")}
        </p>
      </div>
      {/* <WorkflowCards 
        workflows={workflows}
      /> */}
      <FlowTrader sizeWindow="normal" />
    </section>
  );
};

export default HowItWorks;

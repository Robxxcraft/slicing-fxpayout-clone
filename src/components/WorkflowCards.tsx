import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";

type Workflow = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  translateKey: string;
};

const workflows: Workflow[] = [
  {
    title: "mulai",
    subtitle: "Daftar lewat link resmi FXPayout",
    description:
      "Buat akun FXPayout dan hubungkan akun trading Anda melalui link resmi yang kami sediakan dari broker pilihan.",
    image: "flow-start.png",
    translateKey: "homepage:howItWorks.workflows.0" 
  },
  {
    title: "trading",
    subtitle: "Trading seperti biasa di broker Anda",
    description:
      "Lanjutkan aktivitas trading tanpa perubahan spread, leverage, atau kondisi lain. Semua tetap mengikuti aturan broker.",
    image: "flow-trade.png",
    translateKey: "homepage:howItWorks.workflows.1" 
  },
  {
    title: "komisi",
    subtitle: "Broker mengirim komisi IB ke FXPayout",
    description:
      "Berdasarkan volume lot yang Anda trading-kan, broker mengirimkan komisi IB ke FXPayout secara otomatis.",
    image: "flow-commision.png",
    translateKey: "homepage:howItWorks.workflows.2" 
  },
  {
    title: "rebate",
    subtitle: "Rebate hingga 90% ke akun Anda",
    description:
      "Kami mengembalikan hingga 90% komisi tersebut sebagai cashback bisa dicairkan cepat via bank lokal atau e-wallet.",
    image: "flow-rebate.png",
    translateKey: "homepage:howItWorks.workflows.3" 
  },
];

const WorkflowCards = () => {
  const { t } = useTranslation(["homepage"]);
  return (
    <div className="mt-6 2xl:mt-10 flex justify-center gap-2 flex-wrap lg:flex-nowrap">
      {workflows.map((workflow, idx) => (
        <div key={idx} className="relative">
          <div className="p-6 w-full max-w-full lg:max-w-[360px] bg-[#F9F9F9] rounded-[40px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-[42px] bg-white rounded-full">
                <span className="text-base font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  {idx + 1}
                </span>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                {t(`${workflow.translateKey}.title`)}
              </p>
            </div>
            <h2 className="mb-4 text-xl md:text-2xl font-medium leading-[160%]">
              {t(`${workflow.translateKey}.subtitle`)}
            </h2>
            <img
              src={`/${workflow.image}`}
              alt="Workflow image"
              className="w-full h-[200px] rounded-2xl object-contain"
            />
            <p className="mt-4 text-base md:text-xl text-[rgba(0,0,0,0.5)] leading-[160%]">
              {t(`${workflow.translateKey}.paragraph`)}
            </p>
          </div>
          {idx !== workflows.length - 1 && (
            <div className="absolute top-full lg:top-1/2 right-1/2 lg:-right-8 translate-x-1/2 lg:translate-x-0 -translate-y-6 lg:-translate-y-1/2 flex items-center justify-center size-14 bg-[#EBECE7] rounded-full z-50 rotate-90 lg:rotate-0">
              <div className="flex items-center justify-center size-10 bg-linear-to-t from-dark-primary to-primary rounded-full">
                <FaArrowRight color="#fff" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default WorkflowCards;

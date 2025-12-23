import { FaArrowRight } from "react-icons/fa6";

type Workflow = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const workflows: Workflow[] = [
  {
    title: "mulai",
    subtitle: "Daftar lewat link resmi FXPayout",
    description:
      "Buat akun FXPayout dan hubungkan akun trading Anda melalui link resmi yang kami sediakan dari broker pilihan.",
    image: "flow-start.png",
  },
  {
    title: "trading",
    subtitle: "Trading seperti biasa di broker Anda",
    description:
      "Lanjutkan aktivitas trading tanpa perubahan spread, leverage, atau kondisi lain. Semua tetap mengikuti aturan broker.",
    image: "flow-trade.png",
  },
  {
    title: "komisi",
    subtitle: "Broker mengirim komisi IB ke FXPayout",
    description:
      "Berdasarkan volume lot yang Anda trading-kan, broker mengirimkan komisi IB ke FXPayout secara otomatis.",
    image: "flow-commision.png",
  },
  {
    title: "rebate",
    subtitle: "Rebate hingga 90% ke akun Anda",
    description:
      "Kami mengembalikan hingga 90% komisi tersebut sebagai cashback bisa dicairkan cepat via bank lokal atau e-wallet.",
    image: "flow-rebate.png",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-4 md:pt-[310px] lg:pt-[270px] xl:pt-56">
      <div className="flex flex-col items-center text-center">
        <div className="px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
          <img src="/workflow.svg" alt="workflow" 
            className="scale-90 md:scale-100"/>
          <h3 className="text-base md:text-xl font-semibold text-white">
            CARA KERJA
          </h3>
        </div>
        <h2 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
          Cara Kerja FXPayout dalam 4 Langkah Sederhana
        </h2>
        <p className="text-base md:text-xl leading-[160%]">
          Tanpa mengubah strategi, Anda cukup trading seperti biasa. FXPayout
          yang mengurus aliran komisi menjadi cashback untuk Anda.
        </p>
      </div>
      <div className="mt-6 2xl:mt-10 flex justify-between gap-2 flex-wrap lg:flex-nowrap">
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
                  {workflow.title.toLocaleUpperCase()}
                </p>
              </div>
              <h4 className="mb-4 text-xl md:text-2xl font-medium leading-[160%]">
                {workflow.subtitle}
              </h4>
              <img
                src={`/${workflow.image}`}
                alt="Workflow image"
                className="w-full h-[200px] rounded-2xl object-contain"
              />
              <p className="mt-4 text-base md:text-xl text-[rgba(0,0,0,0.5)] leading-[160%]">
                {workflow.description}
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
    </section>
  );
};

export default HowItWorks;

import { useTranslation } from "react-i18next";

type Benefit = {
  icon: string;
  title: string;
  description: string;
  translateKey: string;
};

const benefits: Benefit[] = [
  {
    icon: "trader.png",
    title: "Rebate 90% untuk trader",
    description: "Dapatkan Cashback terbesar setiap lot",
    translateKey: "homePage.benefit.items.0"
  },
  {
    icon: "wallet.png",
    title: "Pembayaran mingguan atau on-demand",
    description: "Nikmati Cair cepat via bank lokal/e-wallet.",
    translateKey: "homePage.benefit.items.1"
  },
  {
    icon: "dashboard.png",
    title: "Dashboard monitoring real-time",
    description: "Pantau Riwayat rebate secara lengkap.",
    translateKey: "homePage.benefit.items.2"
  },
  {
    icon: "support.png",
    title: "Support lokal WhatsApp & Telegram",
    description: "Dilengkapi Support dengan respon cepat",
    translateKey: "homePage.benefit.items.3"
  },
];

const Benefits = () => {
  const { t } = useTranslation();
  return (
    <section className="relative z-9999">
      <div className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 md:absolute xl:top-1/2 w-full -translate-y-[10%] md:-translate-y-[20%] xl:-translate-y-1/2 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-3 2xl:gap-4 w-fit">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="group p-6 xl:p-5 w-full max-w-[460px] rounded-2xl bg-white border border-[rgba(34,34,34,0.1)] shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)] hover:bg-linear-to-t from-dark-primary to-primary">
              <div className="mb-3 flex gap-3 md:gap-4 xl:gap-3 items-start">
                <img src={`/${item.icon}`} alt={`icon ${item.title}`} 
                  className="mt-1 md:mt-2 size-[21px] xl:size-7 2xl:size-[35px]"
                />
                <p className="text-base md:text-xl xl:text-lg font-semibold md:leading-7 group-hover:text-white">
                  {t(`${item.translateKey}.title`)}
                </p>
              </div>
              <p className="text-sm md:text-base group-hover:text-white">{t(`${item.translateKey}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

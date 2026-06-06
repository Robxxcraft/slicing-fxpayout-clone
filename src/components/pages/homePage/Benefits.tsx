import { useTranslation } from "react-i18next";
import BoundedIcon from "../brokerDetail/ui/BoundedIcon";
import BadgeSection from "@/components/ui/BadgeSection";

type Benefit = {
  icon: string;
  title: string;
  paragraph: string;
  translateKey: string;
};

const benefits: Benefit[] = [
  {
    icon: "hand-money.svg",
    title: "💰 Mengurangi Biaya Trading",
    paragraph: "Sebagian biaya trading kembali ke Anda sebagai cashback.",
    translateKey: "homepage:benefit.items.0"
  },
  {
    icon: "recycle.svg",
    title: "🔄 Rebate Langsung dari Broker",
    paragraph: "Sebagian biaya trading kembali ke Anda sebagai cashback.",
    translateKey: "homepage:benefit.items.1"
  },
  {
    icon: "no-fees.svg",
    title: "🚫 Tanpa Biaya Tambahan",
    paragraph: "Tanpa biaya tersembunyi atau potongan apa pun. Semuanya Transparan",
    translateKey: "homepage:benefit.items.2"
  },
  {
    icon: "secure.svg",
    title: "🔒 Sistem Aman & Transparan",
    paragraph: "Semua transaksi tetap dilakukan langsung di broker. Kami tidak mengakses akun trading atau menyimpan data login Anda.",
    translateKey: "homepage:benefit.items.3"
  },
  {
    icon: "customer-service.svg",
    title: "⚡ 5. Dukungan Responsif",
    paragraph: "Tim support lokal siap membantu Anda melalui WhatsApp dan Telegram dengan respon cepat dan solusi yang jelas.",
    translateKey: "homepage:benefit.items.4"
  },
];

const Benefits = () => {
  const { t } = useTranslation(["homepage"]);
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <BadgeSection
          icon={
            <img src="/fxpayout-white.svg" alt="Logo Fxpayout" 
              className="h-8"/>
        }>
          {t("homepage:benefit.badge")}
        </BadgeSection>
        <h2 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%] text-center">
          {t("homepage:benefit.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%] text-center">
          {t("homepage:benefit.paragraph")}
        </p>
      </div>
      
      <div className="mt-6 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {benefits.map((item, index) => (
          <div key={index} 
            className={`p-5 flex flex-col items-center justify-center text-center w-full bg-[#F6F9FF] rounded-[20px]
              ${index < benefits.length - 2 ? "col-span-1 lg:col-span-4" : ""}
              ${index === benefits.length - 2 ? "col-span-1 lg:col-span-6" : ""}
              ${index === benefits.length - 1 ? "col-span-1 md:col-span-2 lg:col-span-6" : ""}
            `}>
            <BoundedIcon 
              icon={`/${item.icon}`} 
              alt="Icon" 
              variant="fourth"
              paddingVariant="small"
            />
            <p className="mt-5 text-xl font-semibold text-black">
              {t(`${item.translateKey}.title`)}
            </p>
            <p className="mt-2.5 text-base text-black/50 leading-6">
              {t(`${item.translateKey}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;

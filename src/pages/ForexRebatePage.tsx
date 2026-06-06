import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BenefitSection from "@/components/pages/ForexRebatePage/BenefitSection";
import FaqSection from "@/components/pages/ForexRebatePage/FaqSection";
import HeroSection from "@/components/pages/ForexRebatePage/HeroSection";
import WhatRebateForex from "@/components/pages/ForexRebatePage/WhatRebateForex";
import WhyChooseSection from "@/components/pages/ForexRebatePage/WhyChooseSection";
import SecuritySection from "@/components/pages/homePage/SecuritySection";
import BadgeSection from "@/components/ui/BadgeSection";
import RunningText from "@/components/ui/RunningText";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const features = [
  {
    title: "Persentase Cashback",
    desc: "Cashback dari komisi broker yang Anda diterima",
    fxPayout: "Up to 95%",
    other: "50% - 70%",
    // icon: CurrencyDollarIcon,
  },
  {
    title: "Rebate Bervariasi",
    desc: "Nilai rebate tinggi di berbagai instrumen trading",
    fxPayout: true,
    other: true,
    // icon: BanknotesIcon,
  },
  {
    title: "Tanpa Deposit",
    desc: "Tidak perlu transfer dana untuk mulai menggunakan layanan",
    fxPayout: true,
    other: "Umumnya memerlukan deposit",
    // icon: CheckCircleIcon,
  },
  {
    title: "Tidak akses akun",
    desc: "Keamanan akun tetap terjaga sepenuhnya di broker",
    fxPayout: "shield",
    other: "Beberapa layanan memiliki akses",
    // icon: ShieldCheckIcon,
  },
  {
    title: "Transparan",
    desc: "Semua proses rebate jelas dan dapat dipantau",
    fxPayout: true,
    other: "Transparansi terbatas",
    // icon: MagnifyingGlassIcon,
  },
];

const ForexRebatePage = () => {
  const { t, i18n } = useTranslation(["common"]);
  return (
    <div className="font-inter">
      <title>Best Forex Rebate Platforms – Cashback Forex Terbaik untuk Trader</title>
      <Navbar active="layanan" />
      <main>
        <HeroSection />
        <WhatRebateForex />
        <BenefitSection />
        <WhyChooseSection />
        <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-15 2xl:pt-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <BadgeSection
              icon={
                <img src="/law-icon.svg" alt="Law" 
                  className="scale-90 md:scale-100" />
            }>
              Perbandingan
            </BadgeSection>
            <h2 className="text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%] text-center">
              Kenapa FXPayout Lebih Menguntungkan?
            </h2>
            <p className="text-base md:text-xl leading-[160%] max-w-5xl text-center">
              Bandingkan langsung keuntungan dan transparansi antara FXPayout dan platform lainnya.
            </p>
          </div>
          <div className="mt-16">
            <div className="grid grid-cols-[280px_1fr_1f]">
              {/* HEADER */}
              <div></div>
              <div></div>
            </div>
          </div>
        </section>
        <div className="space-y-15 xl:space-y-[120px]">
          <SecuritySection />
          <RunningText variant="primary" />
        </div>
        <FaqSection />
        <CtaSection 
          title={t("cta_trader.title")}
          paragraph={t("cta_trader.paragraph")}
          button={t("button.registerNow")}
          urlButton={getLocalizedPath("/register", i18n.language)}
        />
      </main>
      <Footer />
    </div>
  )
}

export default ForexRebatePage;

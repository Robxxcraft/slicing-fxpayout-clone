import BadgeHero from "@/components/ui/BadgeHero";
import Button from "@/components/ui/Button";
import RunningText from "@/components/ui/RunningText";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { i18n } = useTranslation();
  return (
    <header className="relative bg-primary px-5 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-10 lg:py-32 2xl:py-40 flex flex-col lg:flex-row gap-y-10 gap-4 xl:gap-8 items-center justify-between overflow-hidden min-h-screen lg:min-h-fit">
      {/* BACKGROUND ORNAMENT */}
      <div className="absolute -top-[90px] -left-[90px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <div className="hidden md:block absolute -top-[50px] -right-[90px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <div className="hidden md:block absolute -top-10 right-[20%] bg-[#ABF3DB] size-50 rounded-full blur-[120px] opacity-80"></div>
      <div className="hidden md:block absolute -bottom-[50px] -right-[90px] bg-[#ABF3DB] size-60 rounded-full blur-[120px] opacity-80"></div>
      <img 
        onContextMenu={() => false}
        src="/rectangle-hero.png" 
        alt="hero rectange" 
        className="z-1 object-cover w-full h-full absolute -top-[7%] left-1/2 -translate-x-1/2 select-none pointer-events-none"
      />

      {/* MAIN HERO */}
      <div className="z-999 py-16 flex flex-col items-center justify-center gap-6 w-full max-w-full lg:max-w-[1480px] text-white text-center">
        <BadgeHero 
          icon={
            <img src="/badgeCirclePercent.svg" alt="badge percent" />
          }
        >
          FXPayout Rebate Platform
        </BadgeHero>
        <h1 className="max-w-5xl font-wix-madefor-display font-bold text-[36px] md:text-[40px] lg:text-[48px] 2xl:text-[52px] leading-[148%]">
          Best Forex Rebate Platforms - Cashback Forex Terbaik untuk Trader
        </h1>
        <p className="max-w-5xl text-base md:text-xl 2xl:text-2xl font-medium text-light-gray leading-[200%]">
          Maksimalkan setiap perdagangan Anda. Dapatkan pengembalian tunai otomatis dari setiap lot yang ditransaksikan, tanpa mengubah spread atau komisi broker Anda.
        </p>
        <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
          <Button 
            buttonType="link" 
            urlTo={`${getLocalizedPath("/register", i18n.language)}`}
            variant="light" 
            size="xl" 
            className="py-4! 2xl:py-6! flex md:block flex-1 md:flex-0 text-base! 2xl:text-xl! font-medium! text-nowrap"
          >
            Daftar Sekarang
          </Button>
          <Button 
            buttonType="link"
            urlTo={`${getLocalizedPath("/broker", i18n.language)}`}
            variant="outline-light" 
            size="xl" 
            className="py-4! 2xl:py-6! flex md:block flex-1 md:flex-0 text-base! 2xl:text-xl! font-medium! text-nowrap"
          >
            Lihat Daftar Broker
          </Button>
        </div>
      </div>

      {/* RUNNING TEXT */}
      <div className="absolute bottom-0 left-0 overflow-hidden w-full whitespace-nowrap border-t lg:border-t-0 border-white">
        <RunningText />
      </div>
    </header>
  )
}

export default HeroSection;

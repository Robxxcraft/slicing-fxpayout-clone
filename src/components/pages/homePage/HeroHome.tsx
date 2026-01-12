import Button from "@/components/ui/Button";
import CardEstimationRebate from "@/components/CardEstimationRebate";

const HeroHome = () => {
  return (
    <header className="relative bg-primary px-5 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-[120px] lg:py-32 2xl:py-40 flex flex-col lg:flex-row gap-y-10 gap-4 xl:gap-8 items-center justify-between rounded-b-[80px]">
      {/* BACKGROUND ORNAMENT */}
      <div className="absolute -top-[90px] -left-[90px] bg-[#ABF3DB] size-80 rounded-full blur-[120px] opacity-80"></div>
      <img
        src="/heroCircle.png"
        alt="hero circle"
        className="z-1 absolute bottom-0 right-0 w-[450px]"
      />

      {/* MAIN HERO */}
      <div className="z-999 flex flex-col gap-6 2xl:gap-8 max-w-full lg:max-w-[60%] text-white">
        <div className="py-1 lg:py-2 px-4 lg:px-5 2xl:px-6 flex items-center gap-2.5 w-fit border border-white bg-[rgba(255,255,255,0.2)] rounded-full">
          <img src="/badgeCirclePercent.svg" alt="badge percent" />
          <span className="text-sm 2xl:text-xl font-medium text-light-gray">
            Dapatkan Rebate 90% Untuk Trader
          </span>
        </div>
        <h1 className="font-wix-madefor-display font-bold text-[40px] md:text-[48px] 2xl:text-[64px] leading-[120%]">
          Trading Lebih Untung Rebate Hingga 90% untuk Trader.
        </h1>
        <p className="lg:mb-3 2xl:mb-6 text-base md:text-xl 2xl:text-2xl font-medium text-light-gray leading-[200%]">
          FXPayout adalah platform rebate forex terpercaya yang memberikan
          cashback hingga 90% dari komisi broker langsung kepada trader.
        </p>
        <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
          <Button buttonType="link" urlTo="/broker" variant="light" size="xl" className="py-4! 2xl:py-6! flex md:block flex-1 md:flex-0 text-base! font-medium! text-nowrap">
            Daftar Sekarang
          </Button>
          <Button variant="outline-light" size="xl" className="py-4! 2xl:py-6! flex md:block flex-1 md:flex-0 text-base! font-medium! text-nowrap">
            Hitung Rebate
          </Button>
        </div>
      </div>

      {/* CARD */}
      <CardEstimationRebate />
    </header>
  );
};

export default HeroHome;

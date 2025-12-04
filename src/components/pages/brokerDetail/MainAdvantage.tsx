import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

const advantages = [
  "Ultra-fast execution (0.01–0.04 detik)",
  "Spread paling stabil di industri",
  "Platform sangat ringan dan stabil",
  "Withdraw tercepat di antara broker global populer",
  "Akun CENT (jarang di broker Tier 1)",
  "Likuiditas dalam & slippage rendah",
  "Unlimited leverage (region tertentu)",
  "Sangat cocok untuk scalping, EA, dan gold trader"
];

const MainAdvantage = () => {
  return (
    <section id="keunggulan" className="scroll-mt-18 lg:scroll-mt-0 mt-10 md:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>Keunggulan Utama</HeadingSection>
      <SubHeadingSection>Fitur unggulan yang menjadi nilai lebih dari broker.</SubHeadingSection>
      <div className="mt-5 md:mt-6 2xl:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 2xl:gap-6">
        {advantages.map((item, idx) => (
          <div key={idx} className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-6 flex items-center gap-3 md:gap-2 2xl:gap-3 bg-my-light-blue rounded-2xl 2xl:rounded-[20px]">
            <img src="/brokerDetail/check-gradient.png" alt="Check Icon" 
              className="size-8 2xl:size-10"
            />
            <p className="text-base 2xl:text-xl font-semibold bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MainAdvantage;

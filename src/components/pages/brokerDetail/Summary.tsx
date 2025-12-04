import BoundedIcon from "./ui/BoundedIcon";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

type SumaryStructure = {
  title: string;
  detail: string;
  icon: string;
}

const summaryItems: SumaryStructure[] = [
  {
    title: "Min Deposit",
    detail: "$10",
    icon: "min-depo.svg"
  },
  {
    title: "Jenis Akun",
    detail: "Standard Cent, Standard, Raw Spread, Zero, Pro",
    icon: "category-acc.svg"
  },
  {
    title: "Spread",
    detail: "Mulai 0.0 pips (Raw) — rata-rata sangat rendah",
    icon: "spread.svg"
  },
  {
    title: "Komisi",
    detail: "Raw/Zero: $3.5–$8 per lot (tergantung pair)",
    icon: "commision.svg"
  },
  {
    title: "Leverage",
    detail: "Hingga 1:2000+ (smart leverage system)",
    icon: "leverage.svg"
  },
  {
    title: "Eksekusi Order",
    detail: "0.01–0.04 detik (super cepat)",
    icon: "order.svg"
  },
  {
    title: "Instrumen",
    detail: "Forex, Gold, Crypto CFD, Indeks, Energi, Saham",
    icon: "instrument.svg"
  },
  {
    title: "Deposit & Withdraw",
    detail: "Super cepat (<1 menit untuk e-wallet/crypto)",
    icon: "depo-withdraw.svg"
  },
]

const Summary = () => {
  return (
    <section id="ringkasan" className="scroll-mt-18 lg:scroll-mt-0 pt-6 md:pt-8 2xl:pt-10 px-5 xl:px-24 2xl:px-56">
      <HeadingSection>Ringkasan Cepat (Quick Facts)</HeadingSection>
      <SubHeadingSection>Informasi inti broker untuk wawasan cepat kamu</SubHeadingSection>
      <div className="mt-4 md:mt-6 2xl:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-6">
        {summaryItems.map((item, idx) => (
          <div key={idx} className="px-3 md:px-4 2xl:px-8 py-3 md:py-4 2xl:py-6 flex gap-4 2xl:gap-6 bg-[#F4F6FA] rounded-lg shadow-[0_3px_13.1px_0_rgba(0,0,0,0.1)] border-l-5 2xl:border-l-10 border-primary">
            <BoundedIcon icon={`/brokerDetail/${item.icon}`} alt="Icon" />
            <div className="flex w-fit flex-col gap-2 2xl:gap-4">
              <p className="text-base 2xl:text-xl leading-6 uppercase">{item.title}</p>
              <p className="text-lg 2xl:text-2xl font-semibold leading-6">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Summary;

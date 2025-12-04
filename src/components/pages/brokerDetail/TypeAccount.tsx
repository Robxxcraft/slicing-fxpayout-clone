import CardTypeAccount from "./ui/CardTypeAccount";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

export type AccountDetail = {
  title: string;
  badge: string;
  benefits: string[];
}

const accountDetail: AccountDetail[] = [
  {
    "title": "Standard Cent (Akun Cent)",
    "badge": "Pemula",
    "benefits": [
      "Cocok untuk pemula & testing strategi",
      "Lot Micro / Nano",
      "Leverage tinggi",
      "Spread mulai 0.3 pips",
      "Tanpa komisi",
      "Deposit minimum: $10",
      "Catatan: Tidak semua instrumen tersedia di akun Cent"
    ]
  },
  {
    "title": "Standard",
    "badge": "Umum",
    "benefits": [
      "Spread rendah",
      "Tanpa komisi",
      "Cocok untuk trading manual",
      "Min deposit: $10"
    ]
  },
  {
    "title": "Raw Spread (ECN)",
    "badge": "Pro & Scalper",
    "benefits": [
      "Spread 0.0 - 0.3 pips",
      "Komisi rendah ($3.5–$4 per lot per side)",
      "Eksekusi sangat cepat",
      "Ideal untuk scalping & EA"
    ]
  },
  {
    "title": "Zero Account",
    "badge": "News Trader",
    "benefits": [
      "Spread 0.0 pada 30+ pasangan",
      "Komisi lebih besar",
      "Ideal untuk news trading & high-impact event"
    ]
  },
  {
    "title": "Pro Account",
    "badge": "Advanced",
    "benefits": [
      "Tanpa komisi",
      "Spread sangat rendah",
      "Eksekusi instan",
      "Ideal untuk trader harian & swing"
    ]
  }
];

const TypeAccount = () => {
  return (
    <section id="jenis-akun" className="scroll-mt-18 lg:scroll-mt-0 mt-10 md:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>Jenis Akun</HeadingSection>
      <SubHeadingSection>Pilihan akun untuk berbagai kebutuhan dan gaya trading.</SubHeadingSection>
      <div className="mt-5 md:mt-6 2xl:mt-8 flex flex-col gap-4 2xl:gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 2xl:gap-6">
          {accountDetail.map((detail, idx) => {
            if (idx <= 2) {
              return <CardTypeAccount key={idx} account={detail} />
            }
          })}
        </div>
        <div className="grid grid-cols-1 gap-4 2xl:gap-6">
          {accountDetail.map((detail, idx) => {
            if (idx > 2) {
              return <CardTypeAccount key={idx} account={detail} />
            }
          })}
        </div>
      </div>
    </section>
  )
}

export default TypeAccount;

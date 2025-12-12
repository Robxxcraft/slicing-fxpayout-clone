import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import BoundedIcon from "./ui/BoundedIcon";
import { FaStar, FaStarHalf  } from "react-icons/fa6";
import { links } from "../../../utils/listLink";

type Spesification = {
  title: string;
  detail: string;
  icon: string;
}

const spesification: Spesification[] = [
  {title: "Tahun Berdiri", detail: "2008", icon: "year-founded.svg"},
  {title: "Min Deposit", detail: "$10", icon: "min-depo.svg"},
  {title: "Leverage", detail: "Hingga 1:2000+", icon: "leverage.svg"},
  {title: "Spread", detail: "Mulai 0.0 pips (Raw)", icon: "spread.svg"},
]

const HeaderBroker = () => {
  return (
    <header className="mt-[92px] md:mt-[180px] lg:mt-[50px] 2xl:mt-[60px] px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <Link
        to="/broker"
        className="flex gap-2 2xl:gap-3 items-center w-fit text-sm lg:text-base 2xl:text-xl text-my-red hover:gap-4 2xl:hover:gap-5 transition-all duration-300 ease-out">
        <IoArrowBackOutline />
        <span>Kembali ke Daftar Broker</span>
      </Link>
      <div className="mt-6 lg:mt-8 2xl:mt-10 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-4 lg:gap-6 2xl:gap-8 items-start w-fit">
          <img src="/broker/exness.png" alt="logo broker" 
            className="size-16 lg:size-28 xl:size-45 2xl:size-60 rounded-[10px] lg:rounded-[20px] object-center object-cover" 
          />
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-[36px] 2xl:text-[48px] font-semibold">
              Exness
            </h1>
            <p className="mt-2 md:mt-0 text-xl xl:text-2xl 2xl:text-[32px] leading-5 md:leading-9 font-medium text-black/80">
              Tier 1 Premium ECN Broker
            </p>
            <BioBroker />
          </div>
        </div>
        {/* <div className="block md:hidden"><BioBroker /></div> */}
        
        <div className="px-6 lg:px-8 2xl:px-10 py-4 lg:py-6 2xl:py-8 flex flex-col items-center bg-my-light-blue rounded-[20px] min-w-[270px] lg:w-fit">
          <p className="text-base lg:text-2xl 2xl:text-[32px] leading-9 font-semibold">
            Overall Score
          </p>
          <div className="mt-1 lg:mt-5 2xl:mt-10 flex items-end">
            <p className="text-[36px] lg:text-[48px] 2xl:text-[64px] lg:leading-16 font-semibold">
              4.8
            </p>
            <p className="text-xl lg:text-[26px] 2xl:text-[36px] leading-11 tracking-[10%] font-semibold">
              /5
            </p>
          </div>
          <div className="lg:mt-5 2xl:mt-4 flex gap-2">
            <FaStar className="text-2xl text-my-yellow" />
            <FaStar className="text-2xl text-my-yellow" />
            <FaStar className="text-2xl text-my-yellow" />
            <FaStar className="text-2xl text-my-yellow" />
            <FaStarHalf className="text-2xl text-my-yellow" />
          </div>
          <Link to="#" 
            className="mt-4 block text-base font-semibold bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text underline! decoration-dark-primary">
            Lihat Ulasan Komunitas
          </Link>
        </div>
      </div>

      <div className="block lg:hidden"><ButtonCta /></div>

      {/* DESCRIPTION */}
      <div className="mt-6 2xl:mt-10">
        <p className="text-base 2xl:text-2xl leading-[180%] text-black/80">
          Broker global dengan eksekusi super cepat, spread rendah, serta pilihan akun yang sangat fleksibel termasuk akun CENT. Menyediakan akses ke Forex, Gold, Indeks, Energi, hingga CFD dengan kondisi stabil dan transparan. Didukung proses deposit-withdraw cepat serta platform trading modern untuk pemula hingga trader profesional.

          <Link to="#" className="ml-2 font-semibold text-primary">
            Selengkapnya…
          </Link>
        </p>
      </div>

      {/* SPESIFICATION */}
      <div className="mt-4 lg:mt-8 2xl:mt-10 md:py-4 lg:py-6 2xl:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#828282]/50">
        {spesification.map((item, idx) => (
          <div key={idx} className={`
            ${idx === 0 && "pt-4 md:pt-0 pb-4 lg:pb-0 border-b lg:border-b-0"}
            ${idx === 1 && "pt-4 md:pt-0 pb-4 lg:pb-0 border-b lg:border-b-0"}
            ${idx === 2 && "pb-4 md:pb-0 pt-4 lg:pt-0 border-b md:border-b-0"}
            ${idx === 3 && "pb-4 md:pb-0 pt-4 lg:pt-0"}
            border-[#828282]/20 md:border-[#828282]/50
          `}>
            <div className={`
              ${idx !== 0 && "lg:border-l"}
              ${idx !== 0 && "lg:pl-5 2xl:pl-10"} 
              ${idx % 2 !== 0 && "md:pl-10 md:border-l"}
              flex gap-4 2xl:gap-6 border-[#828282]/50`
            }>
              <BoundedIcon icon={`/brokerDetail/${item.icon}`} alt="Icon" />
              <div className="flex flex-col gap-1 lg:gap-2">
                <p className="text-base 2xl:text-2xl text-black/80">{item.title}</p>
                <p className="text-xl 2xl:text-[28px] 2xl:leading-8 font-semibold">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

const BioBroker = () => {
  return (
    <>
      <div className="mt-3 lg:mt-4 2xl:mt-6 flex flex-wrap xl:flex-nowrap gap-2 w-fit">
        {["Tier 1", "ENC Broker", "Akun Cent", "Ultra-Fast Execution"].map((item) => (
          <div key={item}
            className="bg-linear-to-t from-dark-primary to-primary border border-transparent bg-clip-border rounded-lg overflow-hidden"
          >
            <div className="px-3 lg:px-5 2xl:px-6 py-2 2xl:py-3 w-full bg-my-light-blue">
              <p className="text-[12px] md:text-sm 2xl:text-base bg-linear-to-t from-dark-primary to-primary text-transparent font-semibold bg-clip-text">
                {item}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block"><ButtonCta /></div>
    </>
  )
}

const ButtonCta = () => {
  return (
    <div className="mt-3 md:mt-4 2xl:mt-6 flex flex-row gap-2 lg:gap-3 2xl:gap-4 flex-wrap md:flex-nowrap">
      <Button buttonType="link" urlTo={links.registerExness} variant="primary" size="md" className="text-nowrap flex-1">
        Daftar Sekarang
      </Button>
      <Button variant="outline" size="md" className="text-nowrap flex-1">
        Kunjungi Website
      </Button>
    </div>
  )
}

export default HeaderBroker;

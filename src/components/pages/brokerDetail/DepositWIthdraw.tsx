import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

type PaymentMethod = {
  method: string;
  time: string;
  fee: string;
}

type Platform = {
  username: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  { method: "E-Wallet", time: "<1m (Instant)", fee: "$0" },
  { method: "Bank Transfer", time: "5–30 Menit", fee: "$0" },
  { method: "VA Lokal (ID)", time: "5–30 Menit", fee: "$0" },
  { method: "Crypto", time: "<1m (Instant)", fee: "$0" },
  { method: "Skrill / Neteller", time: "<1m (Instant)", fee: "$0" },
  { method: "Perfect Money", time: "<1m (Instant)", fee: "$0" }
];

const platforms: Platform[] = [
  { username: "MetaTrader 4 (MT4)", icon: "meta-trader.png" },
  { username: "MetaTrader 5 (MT5)", icon: "meta-trader.png" },
  { username: "Exness Terminal (Web-based)", icon: "exness-web.png" },
  { username: "Copy Trading App", icon: "copy-trading.png" },
  { username: "Exness Mobile App", icon: "exness-mobile.png" },
];


const DepositWIthdraw = () => {
  return (
    <section className="mt-10 md:mt-12 2xl:mt-16 px-5 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 2xl:gap-14">

        {/* DEPOSIT & WITHDRAW */}
        <div id="deposit-withdraw" className="scroll-mt-26 lg:scroll-mt-10 w-full">
          <HeadingSection>Deposit & Withdraw</HeadingSection>
          <SubHeadingSection>Informasi metode serta waktu proses transaksi.</SubHeadingSection>
          <div className="mt-6 2xl:mt-10 border border-[#A9A9A9] overflow-hidden rounded-2xl">
            <table className="table-auto w-full text-[#1D2433] text-base 2xl:text-xl">
              <thead>
                <tr>
                  <th className="px-4 md:px-8 py-6 bg-[#F1F3F9] font-semibold tracking-[2%] text-left">
                    Metode
                  </th>
                  <th className="px-4 md:px-8 py-6 bg-[#F1F3F9] font-semibold tracking-[2%] text-left">
                    Waktu
                   Proses</th>
                  <th className="px-4 md:px-8 py-6 bg-[#F1F3F9] font-semibold tracking-[2%] text-left">
                    Biaya
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentMethods.map((method, idx) => (
                  <tr key={idx}>
                    <td className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"} 
                      px-4 md:px-8 py-6 md:py-4 text-left`}
                    >
                      {method.method}
                    </td>
                    <td className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"} 
                      px-4 md:px-8 py-6 md:py-4 text-left`}
                    >
                      {method.time}
                    </td>
                    <td className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"} 
                      px-4 md:px-8 py-6 md:py-4 text-left`}
                    >
                      {method.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* PLATFORM */}
        <div id="platform" className="scroll-mt-26 lg:scroll-mt-10 w-full">
          <HeadingSection>Platform Trading yang Didukung</HeadingSection>
          <SubHeadingSection>Daftar platform yang dapat digunakan untuk trading.</SubHeadingSection>
          <div className="mt-6 2xl:mt-10 flex flex-col gap-2 2xl:gap-3.5">
            {platforms.map((platform, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <img src={`/brokerDetail/${platform.icon}`} alt={`Profil ${platform.username}`} 
                  className="size-16 rounded-[10px]" />
                <div className="bg-linear-to-t from-dark-primary to-primary border border-transparent bg-clip-border rounded-lg overflow-hidden">
                  <div className="px-6 py-3 bg-my-light-blue">
                    <p className="text-base font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                        {platform.username}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default DepositWIthdraw
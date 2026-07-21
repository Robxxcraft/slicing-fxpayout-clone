import { useTranslation } from "react-i18next";
import BoundedIcon from "../brokerDetail/ui/BoundedIcon";
import BadgeSection from "@/components/ui/BadgeSection";

type Withdrawal = {
  icon: string;
  title: string;
  paragraph: string;
  translateKey: string;
};

const banks: any = [
  {
    name: "BCA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
  },
  {
    name: "BNI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg/250px-Bank_Negara_Indonesia_logo_%282004%29.svg.png",
  },
  {
    name: "Mandiri",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg",
  },
  {
    name: "BRI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg",
  }
];

const wallets: any = [
  {
    name: "DANA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
  },
  {
    name: "GOPAY",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
  },
  {
    name: "OVO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg",
  },
  {
    name: "SHOPEEPAY",
    logo: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2024/07/16/366956180.png",
  },
];

const Withdrawals = () => {
  const { t } = useTranslation(["homepage"]);
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <BadgeSection
          icon={
            <img src="/withdrawal.svg" alt="Logo Fxpayout" 
              className="h-8"/>
        }>
          {t("homepage:withdrawal.badge")}
        </BadgeSection>
        <h2 className="my-4 text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%] text-center">
          {t("homepage:withdrawal.title")}
        </h2>
        <p className="text-base md:text-xl leading-[160%] text-center">
          {t("homepage:withdrawal.paragraph")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 items-start xl:space-x-8">
        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-300 bg-white">
          {/* Header */}
          <div className="flex gap-4 p-5 h-[100px]">
            <div className="flex items-center justify-center rounded-xl px-4 bg-blue-100">
                <img
                src="/bank-icon-blue.svg"
                alt="bank-transfer"
                className="w-7 3xl:w-7 text-blue-600"
                />
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-600">
                Bank Transfer
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                <img
                src="/shield.svg"
                alt="logo fx payout"
                className="w-3 text-blue-600 my-1"
              /> Aman &amp; Terpercaya
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="px-5 text-sm leading-6 text-gray-600">
            Nikmati pencairan rebate yang aman dan transparan langsung ke rekening
            bank lokal Anda.
          </p>

          {/* Bank List */}
          <div className="mt-5 px-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-blue-600">
                Bank Tersedia
              </span>

              <span className="text-gray-400">
                dan lainnya
              </span>
            </div>

            <div className="select-none flex items-center justify-between rounded-xl border border-gray-200 p-4 h-18">
              {banks.map((bank: any) => (
                <div
                  key={bank.name}
                  className="flex h-10 w-13 items-center justify-center"
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="max-h-7 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <button className="mt-5 flex w-full items-center justify-center gap-2 bg-blue-600 py-4 text-sm font-semibold text-white">
            <span><img
                src="/clock.svg"
                alt="logo fx payout"
                className="w-5 3xl:w-5 text-blue-600"
                /></span>
            Proses 1-3 Hari Kerja
          </button>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-300 bg-white">
          {/* Header */}
          <div className="flex gap-4 p-5 h-[100px]">
            <div className="flex items-center justify-center rounded-xl px-4 bg-blue-100">
                <img
                src="/e-wallet-blue.svg"
                alt="logo fx payout"
                className="w-7 3xl:w-7 text-blue-600"
                />
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-600">
                E-Wallet
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-600">
                <img
                src="/timer.svg"
                alt="logo fx payout"
                className="w-4 text-blue-600 my-0.5"
              /> Praktis &amp; Instant
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="px-5 text-sm leading-6 text-gray-600">
            Terima rebate lebih cepat melalui berbagai dompet digital populer. Praktis, dan fleksibel.
          </p>

          {/* Bank List */}
          <div className="mt-5 px-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-blue-600">
                E-Wallet Tersedia
              </span>

              <span className="text-gray-400">
                dan lainnya
              </span>
            </div>

            <div className="select-none flex items-center justify-between rounded-xl border border-gray-200 p-4 h-18">
              {wallets.map((wallet: any) => (
                <div
                  key={wallet.name}
                  className="flex h-10 w-13 items-center justify-center"
                >
                  <img
                    src={wallet.logo}
                    alt={wallet.name}
                    className="max-h-7 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <button className="mt-5 flex w-full items-center justify-center gap-2 bg-blue-600 py-4 text-sm font-semibold text-white">
            <span><img
                src="/instant.svg"
                alt="logo fx payout"
                className="w-4 3xl:w-4 text-blue-600"
                /></span>
            Proses Instant (24/7)
          </button>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-300 bg-white">
          {/* Header */}
          <div className="flex gap-4 p-5 h-[100px]">
            <div className="flex items-center justify-center rounded-xl px-4 bg-blue-100">
                <img
                src="/crypto.svg"
                alt="logo fx payout"
                className="w-7 3xl:w-7 text-blue-600"
                />
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-600">
                Crypto
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                <img
                src="/globe.svg"
                alt="globe"
                className="w-3 text-blue-600 mr-0.5 my-1"
              /> Cepat &amp; Global
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="px-5 text-sm leading-6 text-gray-600">
            Solusi tercepat bagi trader internasional. Nikmati transfer USDT melalui jaringan BNB Smart Chain.
          </p>

          {/* Bank List */}
          <div className="mt-5 px-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-blue-600">
                Mata Uang
              </span>

              <span className="font-semibold text-blue-600">
                Semua Network
              </span>
            </div>

            <div className="select-none flex items-center justify-between rounded-xl border border-gray-200 p-4 h-18">
                <div
                  key="crypto"
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center space-x-1.5">
                    <img
                      src="/usdt-tether.svg"
                      alt="usdt-tether"
                      className="max-h-7 object-contain"
                    />
                  <div>
                    <div className="text-xs lg:text-sm xl:text-xs">USDT</div>
                    <div className="text-gray-500 text-xs lg:text-sm xl:text-xs">Tether USD</div>
                  </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <img
                      src="/line-network-1.svg"
                      alt="line-network-1"
                      className="w-6 h-4 lg:w-12 xl:w-6 text-blue-600"
                    />
                  </div>
                  <div className="text-[9px] lg:text-sm xl:text-[9px] text-gray-500 mx-1">Network</div>
                  <div>
                    <img
                      src="/line-network-2.svg"
                      alt="line-network-1"
                      className="w-6 h-4 lg:w-12 xl:w-6 text-blue-600"
                    />
                  </div>
                </div>
                <div
                  key="crypto"
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center space-x-1.5">
                    
                  <img
                    src="/bnb.svg"
                    alt="bnb"
                    className="max-h-7 object-contain"
                  />
                  <div>
                    <div className="text-xs lg:text-sm xl:text-xs">BNB</div>
                    <div className="text-gray-500 text-xs lg:text-sm xl:text-xs">BEP20</div>
                  </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Footer */}
          <button className="mt-5 flex w-full items-center justify-center gap-2 bg-blue-600 py-4 text-sm font-semibold text-white">
            <span><img
                src="/network.svg"
                alt="logo fx payout"
                className="w-5 3xl:w-5 text-blue-600"
                /></span>
            Proses 10-60 Menit
          </button>
        </div>
      </div>

      <div className="mt-10 w-full rounded-2xl border border-blue-300 bg-white p-5">
        <div className="flex flex-col gap-6 xl:flex-row items-start xl:items-center justify-start xl:justify-between">
          <div className="flex items-start gap-5">
            <div className="relative flex p-3 items-center justify-center rounded-2xl bg-blue-100">
                  <img
                  src="/shield.svg"
                  alt="shield"
                  className="w-13 3xl:w-13 text-blue-600"
                  />
            </div>

            <div>
              <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                100% Aman & Terverifikasi
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
                Kami menggunakan sistem keamanan berlapis untuk memastikan setiap
                transaksi penarikan Anda aman dan terlindungi.
              </p>
            </div>
          </div>

          <div className="flex gap-3 w-full max-w-sm">
            <div className="flex items-center rounded-full border border-blue-500 px-3 text-blue-600 bg-blue-100">
              <div className="font-semibold text-sm py-1 flex"><img
                src="/shield-2.svg"
                alt="logo fx payout"
                className="w-4 3xl:w-5 text-blue-600 mr-2"
                /><div className="text-sm lg:text-md">SSL Encrypted</div></div>
            </div>

            <div className="flex items-center rounded-full border border-blue-500 px-3 text-blue-600 bg-blue-100">
              <div className="font-semibold text-sm py-1 flex">
                <img
                src="/shield-3.svg"
                alt="logo fx payout"
                className="w-5 3xl:w-5 text-blue-600 mr-2"
                />
                <div className="text-sm lg:text-md">Aman & Terpercaya</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdrawals;

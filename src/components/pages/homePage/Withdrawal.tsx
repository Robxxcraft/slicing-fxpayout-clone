import { useTranslation } from "react-i18next";
import BadgeSection from "@/components/ui/BadgeSection";

const banks: any = [
  {
    name: "BCA",
    logo: "/withdrawal/bca.svg",
  },
  {
    name: "BNI",
    logo: "/withdrawal/bni.webp",
  },
  {
    name: "Mandiri",
    logo: "/withdrawal/mandiri.svg",
  },
  {
    name: "BRI",
    logo: "/withdrawal/bri.svg",
  }
];

const wallets: any = [
  {
    name: "DANA",
    logo: "/withdrawal/dana.svg",
  },
  {
    name: "GOPAY",
    logo: "/withdrawal/gopay.svg",
  },
  {
    name: "OVO",
    logo: "/withdrawal/ovo.svg",
  },
  {
    name: "SHOPEEPAY",
    logo: "/withdrawal/spay.webp",
  },
];

const Withdrawals = () => {
  const { t } = useTranslation(["homepage"]);
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <BadgeSection
          icon={
            <img src="/withdrawal.svg" alt="withdrawal" 
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
                {t("homepage:withdrawal.bankTransfer.title")}
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                <img
                src="/shield.svg"
                alt="shield"
                className="w-3 text-blue-600 my-1"
              /> {t("homepage:withdrawal.bankTransfer.badge")}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="px-5 text-sm leading-6 text-gray-600">
            {t("homepage:withdrawal.bankTransfer.description")}
          </p>

          {/* Bank List */}
          <div className="mt-5 px-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-blue-600">
                {t("homepage:withdrawal.bankTransfer.availableBanks")}
              </span>

              <span className="text-gray-400">
                {t("homepage:withdrawal.bankTransfer.others")}
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
                alt="clock"
                className="w-5 3xl:w-5 text-blue-600"
                /></span>
            {t("homepage:withdrawal.bankTransfer.process")}
          </button>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-300 bg-white">
          {/* Header */}
          <div className="flex gap-4 p-5 h-[100px]">
            <div className="flex items-center justify-center rounded-xl px-4 bg-blue-100">
                <img
                src="/e-wallet-blue.svg"
                alt="e-wallet"
                className="w-7 3xl:w-7 text-blue-600"
                />
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-600">
                {t("homepage:withdrawal.ewallet.title")}
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-600">
                <img
                src="/timer.svg"
                alt="timer"
                className="w-4 text-blue-600 my-0.5"
              /> {t("homepage:withdrawal.ewallet.badge")}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="px-5 text-sm leading-6 text-gray-600">
            {t("homepage:withdrawal.ewallet.description")}
          </p>

          {/* Bank List */}
          <div className="mt-5 px-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-blue-600">
                {t("homepage:withdrawal.ewallet.availableWallets")}
              </span>

              <span className="text-gray-400">
                {t("homepage:withdrawal.ewallet.others")}
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
                alt="instant"
                className="w-4 3xl:w-4 text-blue-600"
                /></span>
            {t("homepage:withdrawal.ewallet.process")}
          </button>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-blue-300 bg-white">
          {/* Header */}
          <div className="flex gap-4 p-5 h-[100px]">
            <div className="flex items-center justify-center rounded-xl px-4 bg-blue-100">
                <img
                src="/crypto.svg"
                alt="crypto"
                className="w-7 3xl:w-7 text-blue-600"
                />
            </div>

            <div>
              <h2 className="text-xl font-bold text-blue-600">
                {t("homepage:withdrawal.crypto.title")}
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                <img
                src="/globe.svg"
                alt="globe"
                className="w-3 text-blue-600 mr-0.5 my-1"
              /> {t("homepage:withdrawal.crypto.badge")}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="px-5 text-sm leading-6 text-gray-600">
            {t("homepage:withdrawal.crypto.description")}
          </p>

          {/* Bank List */}
          <div className="mt-5 px-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-blue-600">
                {t("homepage:withdrawal.crypto.currency")}
              </span>

              <span className="font-semibold text-blue-600">
                {t("homepage:withdrawal.crypto.network")}
              </span>
            </div>

            <div className="select-none flex items-center justify-between rounded-xl border border-gray-200 p-4 h-18">
                <div
                  key="crypto"
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center space-x-1.5">
                    <img
                      src="/withdrawal/usdt-tether.svg"
                      alt="usdt-tether"
                      className="max-h-7 object-contain"
                    />
                  <div>
                    <div className="text-xs lg:text-sm xl:text-xs">USDT</div>
                    <div className="text-gray-500 text-xs lg:text-sm xl:text-xs">{t("homepage:withdrawal.crypto.usdtName")}</div>
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
                  <div className="text-[9px] lg:text-sm xl:text-[9px] text-gray-500 mx-1">{t("homepage:withdrawal.crypto.networkLabel")}</div>
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
                    src="/withdrawal/bnb.svg"
                    alt="bnb"
                    className="max-h-7 object-contain"
                  />
                  <div>
                    <div className="text-xs lg:text-sm xl:text-xs">BNB</div>
                    <div className="text-gray-500 text-xs lg:text-sm xl:text-xs">{t("homepage:withdrawal.crypto.bnbName")}</div>
                  </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Footer */}
          <button className="mt-5 flex w-full items-center justify-center gap-2 bg-blue-600 py-4 text-sm font-semibold text-white">
            <span><img
                src="/network.svg"
                alt="network"
                className="w-5 3xl:w-5 text-blue-600"
                /></span>
            {t("homepage:withdrawal.crypto.process")}
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
                {t("homepage:withdrawal.security.title")}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
                {t("homepage:withdrawal.security.description")}
              </p>
            </div>
          </div>

          <div className="flex gap-3 xl:justify-end w-full max-w-sm">
            <div className="flex items-center rounded-full border border-blue-500 px-3 text-blue-600 bg-blue-100">
              <div className="font-semibold text-sm py-1 flex"><img
                src="/shield-2.svg"
                alt="shield"
                className="w-4 3xl:w-5 text-blue-600 mr-2"
                /><div className="text-sm lg:text-md">{t("homepage:withdrawal.security.ssl")}</div></div>
            </div>

            <div className="flex items-center rounded-full border border-blue-500 px-3 text-blue-600 bg-blue-100">
              <div className="font-semibold text-sm py-1 flex">
                <img
                src="/shield-3.svg"
                alt="shield"
                className="w-5 3xl:w-5 text-blue-600 mr-2"
                />
                <div className="text-sm lg:text-md">{t("homepage:withdrawal.security.trusted")}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdrawals;

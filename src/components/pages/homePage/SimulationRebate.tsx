import { useTranslation } from "react-i18next";
import BadgeSection from "@/components/ui/BadgeSection";
import Button from "../../ui/Button";

const brokers = [
  {
    logo: "/broker/tmgm.webp",
    name: "TMGM",
    commission: "$260.00",
    rebate: "90%",
    paid: "$234.00",
  },
  {
    logo: "/broker/valetax.webp",
    name: "Valetax",
    commission: "$180.00",
    rebate: "90%",
    paid: "$162.00",
  },
  {
    logo: "/broker/exness.webp",
    name: "Exness",
    commission: "$412.50",
    rebate: "90%",
    paid: "$371.25",
  },
  {
    logo: "/broker/vantage.webp",
    name: "Vantage",
    commission: "$320.00",
    rebate: "85%",
    paid: "$72.00",
  },
];

function Feature({ icon, title, text }: any) {
  return (
    <div className="flex gap-4 border-b border-blue-300 pt-3 pb-4">
      <div className="w-[40px]">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl ">
          {icon}
        </div>
      </div>

      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-blue-100">{text}</p>
      </div>
    </div>
  );
}

const RebateSimulations = () => {
  const { t } = useTranslation(["homepage"]);
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-14 xl:pt-[120px]">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <BadgeSection
          icon={
            <img
              src="/simulation-rebate.svg"
              alt="Simulation Rebate"
              className="h-8"
            />
          }
        >
          {t("rebateSimulation.badge")}
        </BadgeSection>

        <h2 className="my-4 text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%] text-center">
          {t("rebateSimulation.title")}
        </h2>

        <p className="text-base md:text-xl leading-[160%] text-center">
          {t("rebateSimulation.description")}
        </p>
      </div>

      <section className="bg-[#5C6EF8] rounded-2xl px-4 pt-4 md:px-8 md:pt-8 md:pb-8 text-white mt-6">
        <div className="flex flex-col xl:flex-row gap-8 items-center">
          <div className="basis-5/12 mb-3 xl:mb-0">
            <span className="inline-flex items-center rounded-xl bg-[#5BCB72] px-4 py-2 text-xs font-semibold">
              <img
                src="/shield-white.svg"
                alt="shield-white"
                className="w-4 mr-1.5"
              />
              {t("rebateSimulation.hero.badge")}
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight">
              {t("rebateSimulation.hero.title.0")}
              <br />
              {t("rebateSimulation.hero.title.1")}
            </h2>

            <p className="mt-4 text-blue-100 text-lg">
              {t("rebateSimulation.hero.description")}
            </p>

            <div className="mt-4 space-y-4">
              <Feature
                  icon={<img src="/bars.svg" className="w-4" />}
                  title={t("rebateSimulation.features.0.title")}
                  text={t("rebateSimulation.features.0.description")}
                />

                <Feature
                  icon={<img src="/simulation-rebate-blue.svg" className="w-4" />}
                  title={t("rebateSimulation.features.1.title")}
                  text={t("rebateSimulation.features.1.description")}
                />

                <Feature
                  icon={<img src="/fast-payment.svg" className="w-4" />}
                  title={t("rebateSimulation.features.2.title")}
                  text={t("rebateSimulation.features.2.description")}
                />

                <Feature
                  icon={<img src="/shield.svg" className="w-4" />}
                  title={t("rebateSimulation.features.3.title")}
                  text={t("rebateSimulation.features.3.description")}
                />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xl basis-7/12">
          <div className="overflow-x-scroll sm:overflow-hidden block! w-80 sm:w-full">
            <table className="w-xl sm:w-full">
              <thead className="text-gray-400 w-full">
                <tr className="bg-blue-100 text-left w-full">
                  <th className="rounded-s-lg py-1.5 pl-3 font-medium text-blue-600 text-xs w-2/6">
                    {t("rebateSimulation.table.broker")}
                  </th>

                  <th className="py-1 font-medium text-blue-600 text-xs 2/6">
                    {t("rebateSimulation.table.commission")}
                  </th>

                  <th className="py-1 font-medium text-blue-600 text-xs w-1/6">
                    {t("rebateSimulation.table.rebate")}
                  </th>

                  <th className="rounded-e-lg py-1 pr-3 font-medium text-blue-600 text-xs w-1/6">
                    {t("rebateSimulation.table.paid")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {brokers.map((item) => (
                  <tr key={item.name} className="border-t text-sm">
                    <td className="py-4 text-left">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.logo}
                          className="w-10 h-10 rounded-full"
                          alt={item.name}
                        />

                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {t("rebateSimulation.table.manualRebate")}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="font-semibold text-gray-700">
                      {item.commission}
                    </td>

                    <td className="text-blue-600 font-bold">
                      {item.rebate}
                    </td>

                    <td className="text-green-600 font-bold">
                      {item.paid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 bg-gray-100 p-2 shadow rounded-lg">
              <div className="flex">
                <div className="bg-blue-600 rounded-lg py-3 px-3.5 mr-2">
                  <img src="/commision.svg" className="w-5" />
                </div>

                <div className="pl-1">
                  <p className="text-xs text-gray-500">
                    {t("rebateSimulation.summary.commission")}
                  </p>

                  <p className="mt-1 text-lg font-bold text-blue-600">
                    $1,172.50
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-blue-600 rounded-lg py-3 px-3.5 mr-2">
                  <img src="/percent.svg" className="w-5" />
                </div>

                <div className="pl-1">
                  <p className="text-xs text-gray-500">
                    {t("rebateSimulation.summary.averageRebate")}
                  </p>

                  <p className="mt-1 text-lg font-bold text-blue-600">
                    88.75%
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-blue-600 rounded-lg py-3 px-3.5 mr-2">
                  <img src="/e-wallet-white.svg" className="w-5" />
                </div>

                <div className="pl-1">
                  <p className="text-xs text-gray-500">
                    {t("rebateSimulation.summary.totalPaid")}
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-600">
                    $1,039.25
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center mt-6">

              <div className="flex items-center rounded-xl border border-blue-300 border-dashed p-3 mr-0 md:mr-3">
                <img src="/info.svg" className="w-4 mr-2" />

                <p className="text-xs text-gray-500">
                  {t("rebateSimulation.footer.note")}
                </p>
              </div>

              <Button
                buttonType="link"
                urlTo="/calculator"
                variant="primary-light"
                size="md"
                className="text-sm! 3xl:text-base! font-medium! w-full!"
              >
                <img
                  src="/kalkulator-icon.svg"
                  className="w-4"
                />
                {t("rebateSimulation.footer.button")}
              </Button>

              <div className="flex items-center text-blue-600 text-xs ml-3">
                <div>{t("rebateSimulation.footer.history")}</div>
                <div className="text-lg">-&gt;</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 w-full rounded-2xl border border-blue-300 bg-white px-4 md:px-8 py-2 md:py-5">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 text-sm font-medium text-blue-600">

          <div className="flex py-3 space-x-3 border-b md:border-r xl:border-none border-blue-200">
            <img src="/no-fees.svg" className="w-4" />
            <div>{t("rebateSimulation.highlights.0")}</div>
          </div>

          <div className="flex py-3 space-x-3 border-b xl:border-none border-blue-200 md:pl-6 xl:pl-0">
            <img src="/bank-icon-blue.svg" className="w-4" />
            <div>{t("rebateSimulation.highlights.1")}</div>
          </div>

          <div className="flex py-3 space-x-3 border-b md:border-b-0 md:border-r xl:border-none border-blue-200">
            <img src="/user-lock.svg" className="w-4" />
            <div>{t("rebateSimulation.highlights.2")}</div>
          </div>

          <div className="flex py-3 space-x-3 md:pl-6 xl:pl-0">
            <img src="/shield-gradient.svg" className="w-4" />
            <div>{t("rebateSimulation.highlights.3")}</div>
          </div>

        </div>

      </div>
    </section>
  );
};


export default RebateSimulations;

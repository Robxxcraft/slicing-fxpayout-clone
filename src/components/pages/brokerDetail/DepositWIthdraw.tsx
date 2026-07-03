import type { PaymentMethod, Platform } from "@/utils/dataBroker/typeDetailBroker";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";
import { useTranslation } from "react-i18next";

const DepositWIthdraw = ({
  brokerId,
  paymentMethods, 
  platforms
}: {
  brokerId: string;
  paymentMethods: PaymentMethod[]; 
  platforms: Platform[]}
) => {
  const { t } = useTranslation([brokerId, "brokerdetailpage"]);
  return (
    <section className="mt-10 md:mt-12 2xl:mt-16 px-5 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 2xl:gap-14">

        {/* DEPOSIT & WITHDRAW */}
        <div id="deposit-withdraw" className="scroll-mt-26 lg:scroll-mt-10 lg:col-span-7 w-full">
          <HeadingSection>{t("brokerdetailpage:depositWithdraw.title")}</HeadingSection>
          <SubHeadingSection>{t("brokerdetailpage:depositWithdraw.subtitle")}</SubHeadingSection>
          <div className="mt-6 2xl:mt-10 border border-[#A9A9A9] overflow-auto rounded-2xl">
            <table className="table-auto w-full text-[#1D2433] text-base 2xl:text-xl">
              <thead>
                <tr>
                  {[
                    "brokerdetailpage:depositWithdraw.tableHeaders.0",
                    "brokerdetailpage:depositWithdraw.tableHeaders.1",
                    "brokerdetailpage:depositWithdraw.tableHeaders.2",
                    "brokerdetailpage:depositWithdraw.tableHeaders.3"
                  ].map((item) => (
                    <th key={item} className="px-4 md:px-8 py-6 bg-[#F1F3F9] font-semibold tracking-[2%] text-start">
                      {t(item)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentMethods.map((method, idx) => (
                  <tr key={idx}>
                    <td className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"} 
                      px-4 md:px-8 py-6 md:py-4 text-start`}
                    >
                      {t(method.method)}
                    </td>
                    <td className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"} 
                      px-4 md:px-8 py-6 md:py-4 text-start`}
                    >
                      {t(method.time.deposit)}
                    </td>
                    <td className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"} 
                      px-4 md:px-8 py-6 md:py-4 text-start`}
                    >
                      {t(method.time.withdraw)}
                    </td>
                    <td className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8F9FC]"} 
                      px-4 md:px-8 py-6 md:py-4 text-start`}
                    >
                      {t(method.fee)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* PLATFORM */}
        <div id="platform" className="scroll-mt-26 lg:scroll-mt-10 lg:col-span-5 w-full">
          <HeadingSection>{t("brokerdetailpage:platform.title")}</HeadingSection>
          <SubHeadingSection>{t("brokerdetailpage:platform.subtitle")}</SubHeadingSection>
          <div className="mt-6 2xl:mt-10 flex flex-col gap-2 2xl:gap-3.5">
            {platforms.map((platform, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <img src={`/broker/${platform.icon}`} alt={`Profil ${platform.username}`} 
                  className="size-16 rounded-[10px]" />
                <div className="bg-linear-to-t from-dark-primary to-primary border border-transparent bg-clip-border rounded-lg overflow-hidden">
                  <div className="px-6 py-3 bg-my-light-blue">
                    <p className="text-base font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                        {t(platform.username)}
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
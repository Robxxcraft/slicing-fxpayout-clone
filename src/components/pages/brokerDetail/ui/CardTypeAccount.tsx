import { FaCircleCheck } from "react-icons/fa6";
import HeadingSection from "./HeadingSection";
import type { AccountTypeStruc } from "@/utils/dataBroker/typeDetailBroker";
import { useTranslation } from "react-i18next";

const CardTypeAccount = ({ account }: { account: AccountTypeStruc }) => {
  const { t } = useTranslation(["brokerdetailpage"]);
  return (
    <div className="px-8 py-9 bg-white border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
      {account.notes &&
        <div className="mb-2 px-3 py-1 w-fit bg-red-200 text-right">
          <p className="text-base text-red-800">
            {account.notes}
          </p>
        </div>
      }
      <div className="flex gap-4 justify-between">
        <div className="max-w-[70%]">
          <HeadingSection variant="second" smText="text-2xl">{account.name}</HeadingSection>
        </div>
        <div className="w-fit">
          <div className="w-full h-fit bg-linear-to-t from-dark-primary to-primary bg-clip-border border border-transparent rounded-lg overflow-hidden">
            <div className="px-4 md:px-6 py-2 bg-my-light-blue">
              <p className="text-sm md:text-base font-semibold bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text md:text-nowrap text-center">
                  {account.level}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-10 lg:mt-8">
        <p className="text-xl font-medium leading-[115%] text-my-purple">
          {t("brokerdetailpage:accountType.profit")}:
        </p>
        <div className="mt-4 md:mt-6 flex flex-col gap-5 lg:gap-3">
          {account.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-5">
                <FaCircleCheck className="text-lg text-primary" />
              </div>
              <p className="text-xl -mt-1 leading-6 text-my-half-purple">
                {feature}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default CardTypeAccount;

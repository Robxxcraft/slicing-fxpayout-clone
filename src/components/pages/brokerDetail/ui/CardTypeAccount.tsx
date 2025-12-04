import { FaCircleCheck } from "react-icons/fa6";
import type { AccountDetail } from "../TypeAccount";
import HeadingSection from "./HeadingSection";

const CardTypeAccount = ({account}: {account: AccountDetail}) => {
  return (
    <div className="px-5 md:px-6 2xl:px-8 py-5 md:py-7 2xl:py-9 bg-white border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
      <div className="flex justify-between">
        <div className="max-w-[70%]">
          <HeadingSection variant="second">{account.title}</HeadingSection>
        </div>
        <div className="h-fit bg-linear-to-t from-dark-primary to-primary bg-clip-border border border-transparent rounded-lg overflow-hidden">
          <div className="px-4 md:px-5 2xl:px-6 py-2 bg-my-light-blue">
            <p className="text-sm 2xl:text-base font-semibold bg-linear-to-t from-dark-primary to-primary text-transparent bg-clip-text md:text-nowrap text-center">
                {account.badge}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 2xl:mt-8">
        <p className="text-base 2xl:text-xl font-medium leading-[115%] text-my-purple">
          Keuntungan:
        </p>
        <div className="mt-4 md:mt-5 2xl:mt-6 flex flex-col gap-2 2xl:gap-3">
          {account.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-5">
                <FaCircleCheck className="text-lg text-primary" />
              </div>
              <p className="text-base 2xl:text-xl leading-5 2xl:leading-6 text-my-half-purple">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardTypeAccount;

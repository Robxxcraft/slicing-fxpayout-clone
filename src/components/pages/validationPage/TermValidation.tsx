import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { TiInfoLarge } from "react-icons/ti";

type TermValidation = {
  translateKey: string;
}

const terms: TermValidation[] = [
  { translateKey: "validationpage:notify.terms.0" },
  { translateKey: "validationpage:notify.terms.1" },
  { translateKey: "validationpage:notify.terms.2" },
];

const TermValidation = ({
  setShowNotify,
}: {
  setShowNotify: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation(["validationpage"]);
  return (
    <div className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 pt-8 lg:pt-10">
      <div className="p-4 md:p-6 bg-my-light-blue border border-primary rounded-[10px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="flex shrink-0 items-center justify-center size-6 md:size-7 lg:size-9 border border-primary rounded-full">
              <TiInfoLarge className="text-base lg:text-[20px] text-primary" />
            </span>
            <p className="text-base lg:text-lg 3xl:text-xl font-semibold text-[rgba(0,0,0,0.8)]">
              {t("validationpage:notify.title")}
            </p>
          </div>
          <button
            onClick={() => setShowNotify(false)}
            className="cursor-pointer">
            <IoClose className="text-[#FF9C94] text-2xl md:text-3xl" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {terms.map((term, idx) => (
            <div key={idx} className="p-4 flex gap-3 md:gap-4 bg-[#0B1825]/2 border border-[#425DE8]/20 rounded-2xl">
              <span className="flex shrink-0 items-center justify-center size-7 lg:size-9 border-2 border-primary rounded-full font-medium text-sm lg:text-base text-primary">
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <div>
              <p className="text-base 3xl:text-xl font-medium leading-[142%]">
                {t(`${term.translateKey}.title`)}
              </p>
              <p className="mt-2.5 text-sm md:text-base leading-[142%]">
                {t(`${term.translateKey}.description`)}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TermValidation;

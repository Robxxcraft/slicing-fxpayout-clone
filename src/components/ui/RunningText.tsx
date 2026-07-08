import { useTranslation } from "react-i18next";
import MaskSvg from "./MaskSvg";

const detail = [
  { icon: "/no-fees.svg", keyTranslate: "homepage:hero.runningTexts.0" },
  { icon: "/recycle.svg", keyTranslate: "homepage:hero.runningTexts.1" },
  { icon: "/stop.svg", keyTranslate: "homepage:hero.runningTexts.2" },
  { icon: "/secure.svg", keyTranslate: "homepage:hero.runningTexts.3" },
];

const RunningText = () => {
  const { t } = useTranslation(["homepage"]);
  return (
    <>
      {detail.map((item, idx) => (
        <div
          key={idx}
          className="px-3 3xl:px-4 my-4 md:my-6 flex items-center gap-3 md:gap-6 3xl:gap-10 border-x border-[#F5F5F5]/50"
        >
          <MaskSvg
            icon={item.icon}
            label={"Icon"}
            color={"bg-white"}
            className="size-9 3xl:size-11"
          />
          <p className="text-xl md:text-2xl 3xl:text-[32px] font-medium text-white">
            {t(item.keyTranslate)}
          </p>
        </div>
      ))}
    </>
  )
}

export default RunningText;

import type { TypeWorkflowComponent } from "@/types/workflow.type";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa6";

const WorkflowCards = ({
  workflows,
  useShadowImg,
  colResponsive = "laptop"
}: {
  workflows: TypeWorkflowComponent[];
  useShadowImg?: boolean;
  colResponsive?: "small-laptop" | "laptop";
}) => {
  const { t } = useTranslation(["homepage"]);
  return (
    <div className={`mt-6 2xl:mt-10 flex justify-center items-stretch lg:items-center xl:items-stretch gap-2 h-max
      ${colResponsive === "small-laptop" ? "flex-col xl:flex-row":""}
      ${colResponsive === "laptop" ? "flex-col lg:flex-row":""}
    `}>
      {workflows.map((workflow, idx) => (
        <div key={idx} 
          className={`relative flex flex-col flex-1 w-full lg:max-w-[360px]
        `}>
          <div className="p-6 grow w-full h-full bg-[#F9F9F9] rounded-[40px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center size-[42px] bg-white rounded-full">
                <span className="text-base font-bold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  {idx + 1}
                </span>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text uppercase">
                {t(`${workflow.translateKey}.title`)}
              </p>
            </div>
            <h2 className="mb-4 text-xl md:text-2xl font-medium leading-[160%]">
              {t(`${workflow.translateKey}.subtitle`)}
            </h2>
            <div className={`p-4 w-full h-fit md:h-[280px] lg:h-fit rounded-2xl overflow-hidden
            `}>
              <img
                src={`/${workflow.image}`}
                alt="Workflow image"
                className={`w-full h-fit md:h-[280px] lg:h-fit object-contain rounded-2xl
                  ${useShadowImg ? "shadow-[0_5px_6px_0_rgba(0,0,0,0.04)]":""}
                `}
              />
            </div>
            <p className="mt-4 text-base md:text-xl text-[rgba(0,0,0,0.5)] leading-[160%]">
              {t(`${workflow.translateKey}.paragraph`)}
            </p>
          </div>
          {idx !== workflows.length - 1 && (
            <div className={`absolute top-full right-1/2 translate-x-1/2 -translate-y-6 flex items-center justify-center size-14 bg-[#EBECE7] rounded-full z-50 rotate-90 
              ${colResponsive === "small-laptop" ? "xl:top-1/2 xl:-right-8 xl:translate-x-0 xl:-translate-y-1/2 xl:rotate-0":""}
              ${colResponsive === "laptop" ? "lg:top-1/2 lg:-right-8 lg:translate-x-0 lg:-translate-y-1/2 lg:rotate-0":""}
            `}>
              <div className="flex items-center justify-center size-10 bg-linear-to-t from-dark-primary to-primary rounded-full">
                <FaArrowRight color="#fff" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default WorkflowCards;

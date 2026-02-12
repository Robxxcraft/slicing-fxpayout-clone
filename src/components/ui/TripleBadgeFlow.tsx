import { FaCheck } from "react-icons/fa6";

const TripleBadgeFlow = ({
  stepperActive,
  steps
}: {
  stepperActive: number;
  steps: string[]
}) => {
  const isMobile = window.innerWidth < 768;

  const clipPathLeft = "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)";
  const clipPathRight = "polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)";
  const clipPathMobile = "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-5xl h-full">
      {steps.map((step, index) => {
      let clipPath;
      if (index === 0) {
        clipPath = isMobile ? clipPathMobile : clipPathLeft;
      } else if (index === 1) {
        clipPath = isMobile ? clipPathMobile : "";
      } else {
        clipPath = isMobile ? clipPathMobile : clipPathRight;
      }

      return (
        <div key={index} className="filter h-full drop-shadow-[0_0_1px_#000000]">
          <div 
            className={`${stepperActive === index ? "text-primary" : stepperActive > index ? "text-black" : "text-[#ABB7C2]"} 
              px-6 py-3 h-full md:py-4 flex items-center gap-2 md:gap-4 bg-white`}
            style={{ clipPath: clipPath }}
          >
            <div className={`${stepperActive === index ? "border-primary" : "border-[#ABB7C2]"}
              ${stepperActive > index ? "bg-primary border-0" : "bg-transparent"}
              flex shrink-0 items-center justify-center size-8 lg:size-10 rounded-full border`}>
              {stepperActive > index ? 
                <FaCheck color="#ffffff" /> :
                <span className="font-medium text-sm">{(index + 1).toString().padStart(2, "0")}</span>
              }
            </div>
            <p className="w-fit text-sm font-medium break-">{step}</p>
          </div>
        </div>
      )})}
    </div>
  )
}

export default TripleBadgeFlow;

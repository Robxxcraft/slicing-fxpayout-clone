type CardOverviewProps = {
  status?: "active" | "warning";
  title: string;
  icon: React.ReactNode;
  sizeIcon?: "sm" | "base";
  content: string;
  detail: string;
  bottomLine?: boolean;
  isLoading?: boolean
};

const CardOverview = ({
  status, 
  title, 
  icon, 
  sizeIcon = "base",
  content, 
  detail,
  bottomLine,
  isLoading
}: CardOverviewProps) => {
  return (
    <div className={`
      ${status === "active" ? "bg-linear-to-t from-dark-primary to-primary text-white" : "bg-[#FFFEFE] border border-[#DDDDDD]"}
      rounded-lg h-full md:min-h-[136px] 3xl:min-h-fit overflow-hidden`}>
      <div className="p-4 3xl:p-6">
        <div className="flex justify-between items-center">
          <p className="text-base 3xl:text-2xl font-medium">{title}</p>
          <div className={`
            ${status === "active" ? "bg-[#FFFEFE]/20" : 
              status === "warning" ? "shadow-[0_0_3px_0_rgba(0,0,0,0.25)] text-[#BE5409]" : "shadow-[0_0_3px_0_rgba(0,0,0,0.25)] text-primary"}
            ${sizeIcon === "sm" ? "text-xl 3xl:text-2xl" : "text-lg 3xl:text-xl"}
            flex justify-center items-center size-8 3xl:size-12 rounded-full`}>{icon}</div>
        </div>
        {isLoading ? 
        <>
          <div className="mt-4 h-3 w-1/2 rounded-full animate-pulse bg-gray-300"></div>
          <div className="mt-3 h-2 w-full rounded-full animate-pulse bg-gray-300"></div>
        </> 
        :
        <>
          <p className="mt-2 font-medium text-[32px] 3xl:text-[36px]">
            {content}
          </p>
          <span className={`
            ${status === "active" ? "opacity-100" : 
              status === "warning" ? "opacity-100 text-[#BE5409]" : "opacity-60"}
            mt-1 text-sm 3xl:text-lg`}>
            {detail}
          </span>
        </>
        }
      </div>
      {bottomLine && <div className="w-full h-2.5 bg-primary"></div>}
    </div>
  )
}

export default CardOverview;

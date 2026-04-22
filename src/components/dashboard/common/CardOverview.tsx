const CardOverview = ({
  index, title, icon, content, detail 
}: {
    index: number;
    title: string;
    icon: React.ReactNode;
    content: string;
    detail: string;
}) => {
  return (
    <div className={`
      ${index === 0 ? "bg-linear-to-t from-dark-primary to-primary text-white" : "bg-[#FFFEFE] border border-[#DDDDDD]"}
      p-4 rounded-lg h-fit md:h-[136px]`}>
      <div className="flex justify-between items-center">
        <p className="text-base font-medium">{title}</p>
        <div className={`
          ${index === 0 ? "bg-[#FFFEFE]/20" : "shadow-[0_0_3px_0_rgba(0,0,0,0.25)] text-primary"}
          flex justify-center items-center text-lg size-8 rounded-full`}>{icon}</div>
      </div>
      <p className="mt-2 font-medium text-[32px]">
        {content}
      </p>
      <span className={`
        ${index === 0 ? "opacity-100" : "opacity-60"}
        mt-1 text-sm`}>
        {detail}
      </span>
    </div>
  )
}

export default CardOverview;

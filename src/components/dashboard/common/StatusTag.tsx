type statusEnum = "pending" | "approved" | "rejected" | "auto_credited";

const STATUS_CONFIG: Record<statusEnum, {
  background: string;
  text: string;
}> = {
  pending: {
    background: "FEF3C6",
    text: "BE5409"
  },
  approved: {
    background: "E3FFE8",
    text: "18BD36"
  },
  rejected: {
    background: "FAD4D4",
    text: "DF1E1E"
  },
  auto_credited: {
    background: "E3FFE8",
    text: "18BD36"
  },
}

const StatusTag = ({ 
  status, 
  text,
  icon,
  iconPosition="left"
}: { 
  status: statusEnum;
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right"; 
}) => {
  return (
    <div 
      style={{ 
        background: `#${STATUS_CONFIG[status].background}`,
        borderColor: `#${STATUS_CONFIG[status].text}`
       }}
      className={`px-2.5 2xl:px-4 py-1 2xl:py flex justify-center items-center gap-1 border-[0.5px] rounded-full
        ${iconPosition === "left" ? "flex-row" : "flex-row-reverse"}  
      `}
    >
      {icon &&
        <span style={{ color: `#${STATUS_CONFIG[status].text}` }}>{icon}</span>
      }
      <p 
        style={{ 
          color: `#${STATUS_CONFIG[status].text}`
        }}
        className="text-xs 2xl:text-base text-[#BE5409] font-medium">
       {text}      
      </p>
    </div>
  )
}

export default StatusTag;

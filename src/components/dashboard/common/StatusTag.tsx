type statusEnum = "pending" | "approved" | "rejected";

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
}

const StatusTag = ({ status, text }: { status: statusEnum, text: string }) => {
  return (
    <div 
      style={{ 
        background: `#${STATUS_CONFIG[status].background}`,
        borderColor: `#${STATUS_CONFIG[status].text}`
       }}
      className="px-2.5 py-1 flex justify-center border-[0.5px] rounded-full">
      <p 
        style={{ 
          color: `#${STATUS_CONFIG[status].text}`
        }}
        className="text-xs text-[#BE5409] font-medium">
       {text}      
      </p>
    </div>
  )
}

export default StatusTag;

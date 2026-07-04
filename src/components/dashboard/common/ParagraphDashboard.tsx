const ParagraphDashboard = ({ 
  maxW="w-fit md:w-[760px]",
  colorCL="text-black", 
  children
}: { 
  maxW?: string;
  colorCL?: string
  children: React.ReactNode 
}) => {
  const maxWCL = maxW === "full" ? "w-full" : maxW; 
  return (
    <p
     className={`${colorCL} ${maxWCL} text-base 3xl:text-xl leading-[169.2%]`}
     >
      {children}
    </p>
  )
}

export default ParagraphDashboard;

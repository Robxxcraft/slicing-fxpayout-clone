const ParagraphDashboard = ({ 
  maxW="760px",
  colorCL="text-black", 
  children
}: { 
  maxW?: string;
  colorCL?: string
  children: React.ReactNode 
}) => {
  return (
    <p style={{ 
      maxWidth: maxW === "full" ? "100%" : maxW
     }}
     className={`${colorCL}`}
     >
      {children}
    </p>
  )
}

export default ParagraphDashboard;

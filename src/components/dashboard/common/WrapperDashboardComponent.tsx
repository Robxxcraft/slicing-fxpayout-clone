const WrapperDashboardComponent = ({ 
  className, children 
}: { 
  className?: string; 
  children: React.ReactNode 
}) => {
  return (
    <main className={`${className} px-4 lg:px-8 py-7 3xl:py-10 bg-[#4160FF]/5 h-full`}>
      {children}
    </main>
  )
}

export default WrapperDashboardComponent;

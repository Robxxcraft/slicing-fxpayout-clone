const TitleDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-[26px] 3xl:text-[2rem] font-semibold">
      {children}
    </h1>
  )
}

export default TitleDashboard;

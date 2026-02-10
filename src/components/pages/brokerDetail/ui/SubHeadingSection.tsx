const SubHeadingSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-base md:text-xl 2xl:text-2xl leading-[180%] text-black/80">
      {children}
    </p>
  )
}

export default SubHeadingSection;

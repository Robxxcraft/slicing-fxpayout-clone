const ContentBody = ({children}: {children: React.ReactNode}) => {
  return (
    <p className="text-base md:text-lg 2xl:text-2xl md:leading-[180%] font-semibold text-black">
      {children}
    </p>
  )
}

export default ContentBody;

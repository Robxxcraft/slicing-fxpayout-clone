const ContentBody = ({smText, children}: {smText?: string; children: React.ReactNode}) => {
  return (
    <p className={`${smText !== null ? smText : "text-base" } text-base md:text-xl 2xl:text-2xl md:leading-[180%] font-semibold text-black`}>
      {children}
    </p>
  )
}

export default ContentBody;

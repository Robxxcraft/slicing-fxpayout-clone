const ContentHead = ({
  smText, 
  children
}: {
  smText?: string; 
  children: React.ReactNode
}) => {
  return (
    <p className={`${smText !== null ? smText : "text-base" } md:text-xl 3xl:text-2xl md:leading-[180%] text-black`}>
      {children}
    </p>
  )
}

export default ContentHead;

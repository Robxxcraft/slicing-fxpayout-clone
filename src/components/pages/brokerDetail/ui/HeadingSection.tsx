type HeadingVariant = "first" | "second"

const HeadingSection = ({
  variant = "first", 
  smText, 
  children
}: {
  variant?: HeadingVariant; 
  smText?: string; 
  children: React.ReactNode
}) => {
  const baseStyle = `${variant === "second" ? 
      smText !== null ? `${smText} md:text-2xl 2xl:text-[32px]` 
      : "text-xl md:text-2xl 2xl:text-[32px]" 
    : "text-2xl md:text-[32px]"} font-semibold` 
  let styleVariant = "";

  if (variant === "first") {
    styleVariant = "leading-[180%] text-black";
  }

  if (variant === "second") {
    styleVariant = "leading-[115%] text-my-purple";
  }

  const finalClass = `${baseStyle} ${styleVariant}`;

  return (
    <h3 className={finalClass}>
      {children}
    </h3>
  )
}

export default HeadingSection;

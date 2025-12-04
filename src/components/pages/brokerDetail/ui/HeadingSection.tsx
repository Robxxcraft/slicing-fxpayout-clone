type HeadingVariant = "first" | "second"

const HeadingSection = ({variant = "first", children}: {variant?: HeadingVariant; children: React.ReactNode}) => {
  const baseStyle = `${variant === "second" ? "text-[24px]" : "text-[28px]"} md:text-2xl 2xl:text-[32px] font-semibold` 
  let styleVariant = "";

  if (variant === "first") {
    styleVariant = "md:leading-[180%] text-black";
  }

  if (variant === "second") {
    styleVariant = "leading-[115%] text-my-purple";
  }

  const finalClass = `${baseStyle} ${styleVariant}`;

  return (
    <h2 className={finalClass}>
      {children}
    </h2>
  )
}

export default HeadingSection;

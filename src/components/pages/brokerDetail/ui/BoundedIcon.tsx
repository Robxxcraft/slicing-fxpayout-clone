import MaskSvg from "@/components/ui/MaskSvg";

type BoundedIconProps = {
  variant?: "first" | "second" | "third" | "fourth"; 
  paddingVariant?: "normal" | "small";
  roundedVariant?: "roundRect" | "circle";
  icon: string; 
  alt: string;
  maskColor?: string;
  bgCL?: string;
}

const BoundedIcon = ({
  variant = "first", 
  icon, 
  alt, 
  maskColor, 
  bgCL="bg-my-light-blue", 
  paddingVariant = "normal", 
  roundedVariant = "roundRect",
}: BoundedIconProps) => {
  return (
    <div className={`
      ${variant === "first" ? "size-16 3xl:size-20":""}
      ${variant === "second" ? "size-12 3xl:size-20":""}
      ${variant === "third" ? "size-12":""}
      ${variant === "fourth" ? "size-12 3xl:size-16":""}
      ${roundedVariant === "roundRect" ? "rounded-lg":""}
      ${roundedVariant === "circle" ? "rounded-full":""}
      ${bgCL}
      flex shrink-0 items-center justify-center`}>
      {maskColor === undefined ?
        <img src={icon} alt={alt}
          className={`
            ${variant === "first" ? "h-6 md:h-7 3xl:h-9":""} 
            ${variant === "second" ? "h-5 3xl:h-9":""} 
            ${variant === "third" ? "h-5":""} 
            ${variant === "fourth" ? paddingVariant === "normal" ? "h-5 3xl:h-7" : "h-9 3xl:h-11":""} 
            object-contain`} />
      : <MaskSvg 
        icon={icon} 
        label={alt} 
        color={maskColor} 
        className={`
          ${variant === "first" ? "size-6 md:size-7 3xl:size-9":""} 
          ${variant === "second" ? "size-5 3xl:size-9":""} 
          ${variant === "third" ? "size-5":""} 
          ${variant === "fourth" ? paddingVariant === "normal" ? "size-5 3xl:size-7" : "size-9 3xl:size-11":""}`} />
      }
    </div>
  )
}

export default BoundedIcon;

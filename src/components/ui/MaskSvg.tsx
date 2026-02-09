const MaskSvg = ({
    icon,
    label,
    color,
    className
}: {
    icon: string;
    label: string;
    className: string;
    color: string;
}) => {
  return (
    <div
      style={{ 
        maskImage: `url(${icon})`,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskImage: `url(${icon})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center"
      }}    
      className={`${color} ${className}`}
      aria-label={label}
    ></div>
  )
}

export default MaskSvg;

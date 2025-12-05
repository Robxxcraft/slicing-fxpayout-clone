const BoundedIcon = ({variant = "first", icon, alt}: {variant?: "first" | "second"; icon: string; alt: string}) => {
  return (
    <div className={`
      ${variant === "first" ? "size-16 2xl:size-20" : "size-12 2xl:size-20"}
      flex items-center justify-center bg-my-light-blue rounded-lg`}>
      <img src={icon} alt={alt}
        className={`
          ${variant === "first" ? "h-6 md:h-7 2xl:h-9" : "h-5 2xl:h-9"} 
          object-contain`} />
    </div>
  )
}

export default BoundedIcon;

const BoundedIcon = ({variant = "first", icon, alt}: {variant?: "first" | "second" | "third" | "fourth"; icon: string; alt: string}) => {
  return (
    <div className={`
      ${variant === "first" && "size-16 2xl:size-20"}
      ${variant === "second" && "size-12 2xl:size-20"}
      ${variant === "third" && "size-12"}
      ${variant === "fourth" && "size-12 2xl:size-16"}
      flex shrink-0 items-center justify-center bg-my-light-blue rounded-lg`}>
      <img src={icon} alt={alt}
        className={`
          ${variant === "first" && "h-6 md:h-7 2xl:h-9"} 
          ${variant === "second" && "h-5 2xl:h-9"} 
          ${variant === "third" && "h-5"} 
          ${variant === "fourth" && "h-5 2xl:h-7"} 
          object-contain`} />
    </div>
  )
}

export default BoundedIcon;

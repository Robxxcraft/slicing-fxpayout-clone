const BoundedIcon = ({icon, alt}: {icon: string; alt: string}) => {
  return (
    <div className="flex items-center justify-center size-14 md:size-16 2xl:size-20 bg-my-light-blue rounded-lg">
      <img src={icon} alt={alt}
        className="h-7 md:h-8 2xl:h-9 object-contain" />
    </div>
  )
}

export default BoundedIcon;

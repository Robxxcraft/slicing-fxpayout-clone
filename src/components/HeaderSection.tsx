type HeaderSection = {
  icon: string; 
  badge: string; 
  title: string; 
  titleHighlight?: string; 
  paragraph: string;
  flipTitle?: boolean
}

const HeaderSection = ({
  icon, 
  badge, 
  title, 
  titleHighlight, 
  paragraph,
  flipTitle=false
}: HeaderSection) => {
  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 pt-[120px] lg:pt-[150px] 2xl:pt-[200px]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
          <img src={icon} alt={badge}
            className="scale-90 md:scale-100" />
          <span className="text-base md:text-xl font-medium text-white">
            {badge}
          </span>
        </div>
        <h1 className={`${flipTitle ? "flex-row-reverse" : "flex-row"}
          my-4 flex gap-2 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]`}>
          {title}
          {titleHighlight !== undefined && <span className="text-primary">{" "} {titleHighlight}</span>}
        </h1>
        <p className="text-base md:text-xl leading-[160%] max-w-[786px]">
          {paragraph}
        </p>
      </div>
    </section>
  );
};

export default HeaderSection;

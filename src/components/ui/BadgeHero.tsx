type BadgeHeroProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const BadgeHero = ({ icon, children }: BadgeHeroProps) => {
  return (
    <div className="py-1 lg:py-2 px-4 lg:px-5 2xl:px-6 flex items-center gap-2.5 w-fit border border-white bg-[rgba(255,255,255,0.2)] rounded-full">
      {icon}

      <span className="text-sm 2xl:text-xl font-medium text-light-gray">
        {children}
      </span>
    </div>
  );
};

export default BadgeHero;

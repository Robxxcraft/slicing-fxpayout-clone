type BadgeSectionProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const BadgeSection = ({ icon, children }: BadgeSectionProps) => {
  return (
    <div className="px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
      {icon}

      <span className="text-base md:text-xl font-medium text-white uppercase">
        {children}
      </span>
    </div>
  );
};

export default BadgeSection;

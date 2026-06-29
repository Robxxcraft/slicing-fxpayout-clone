import Button from "./ui/Button";

const CtaSection = ({
  title,
  paragraph,
  button,
  urlButton
}: {
  title: string;
  paragraph: string;
  button: string;
  urlButton: string;
}) => {
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 lg:pt-18 xl:pt-28">
      <div className="relative py-10 xl:py-14 2xl:py-[72px] px-4 xl:px-10 bg-primary rounded-3xl text-center overflow-hidden">
        <div className="z-20 relative flex flex-col items-center justify-center">
          <h2 className="text-2xl 2xl:text-[40px] font-bold text-white leading-[134%] max-w-[620px] 2xl:max-w-[860px]">
            {/* {t("cta.title")} */}
            {title}
          </h2>
          <p className="mt-4 text-base 2xl:text-xl text-white leading-[160%] max-w-[620px] 2xl:max-w-[860px]">
            {paragraph}
          </p>
          <Button 
            buttonType="link" 
            urlTo={urlButton} 
            variant="primary-light" 
            size="xl" 
            className="w-full! md:w-fit! mt-8 font-medium!"
          >
            {button}
          </Button>
        </div>
        <img
          src="/circle-ornament.png"
          alt="ornament"
          className="absolute z-10 top-0 -start-[10%] ltr:-rotate-55 rtl:rotate-260 w-[600px]"
        />
      </div>
    </section>
  );
};

export default CtaSection;

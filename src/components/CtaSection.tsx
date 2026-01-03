import Button from "./ui/Button";

const CtaSection = () => {
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 lg:pt-18 xl:pt-28">
      <div className="relative py-10 xl:py-14 2xl:py-[72px] px-4 xl:px-10 flex flex-col items-center justify-center bg-primary rounded-3xl text-center overflow-hidden">
        <div className="z-999 w-full lg:w-fit">
          <h2 className="text-2xl 2xl:text-[40px] font-bold text-white leading-[134%] max-w-[620px]">
            Siap meningkatkan efisiensi profit trading Anda?
          </h2>
          <p className="mt-4 text-base 2xl:text-xl text-white leading-[160%] max-w-[620]">
            Daftar sekarang dan mulai dapatkan rebate hingga 90%.
          </p>
          <Button buttonType="link" urlTo="/broker" variant="primary-light" size="xl" className="w-full! lg:w-fit! mt-8 font-medium!">
            Daftar Sekarang
          </Button>
        </div>
        <img
          src="/circle-ornament.png"
          alt="ornament"
          className="absolute z-10 top-0 -left-[10%] -rotate-55 w-[600px]"
        />
      </div>
    </section>
  );
};

export default CtaSection;

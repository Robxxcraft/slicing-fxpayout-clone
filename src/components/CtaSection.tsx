const CtaSection = () => {
  return (
    <section className="px-5 xl:px-24 2xl:px-56 pt-18 xl:pt-[80px]">
      <div className="relative py-10 xl:py-14 2xl:py-[72px] px-4 xl:px-10 flex flex-col items-center justify-center bg-primary rounded-3xl text-center overflow-hidden">
        <div className="z-999">
          <h2 className="text-[28px] md:text-[32px] 2xl:text-[40px] font-bold text-white leading-[134%] max-w-[620px]">
            Siap meningkatkan efisiensi profit trading Anda?
          </h2>
          <p className="mt-4 text-base 2xl:text-xl text-white leading-[160%] max-w-[620]">
            Daftar sekarang dan mulai dapatkan rebate hingga 80%.
          </p>
          <button className="mt-8 px-[60px] py-3 2xl:py-5 bg-linear-to-t from-dark-primary to-primary w-fit border border-white rounded-full cursor-pointer hover:brightness-110 transition-all duration-300 ease-out">
            <span className="text-base 2xl:text-xl font-medium text-white">
              Daftar Sekarang
            </span>
          </button>
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

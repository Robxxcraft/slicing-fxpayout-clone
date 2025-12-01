import { IoMegaphone } from "react-icons/io5";

const Rewards = () => {
  return (
    <div className="relative mt-18 xl:mt-[120px] 2xl:mt-56 px-5 xl:px-[120px] 2xl:px-[166px] py-10 bg-primary overflow-hidden">
      <img
        src="/circle-ornament.png"
        alt="ornament"
        className="absolute top-0 -left-[5%] -rotate-55 md:w-[600px]"
      />
      <div className="z-999 relative flex flex-col xl:flex-row gap-x-8 gap-y-8 md:gap-y-12 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-6">
          <IoMegaphone className="text-white text-[48px]" />
          <div>
            <div className="mb-3 flex flex-col md:flex-row md:items-center gap-x-6 gap-y-2">
              <h2 className="order-2 md:order-1 text-[26px] 2xl:text-[32px] font-semibold text-white">
                Bonus Rebate +10% untuk Akun Baru
              </h2>
              <div className="order-1 md:order-2 px-5 py-1.5 2xl:py-2.5 flex items-center gap-2.5 w-fit border border-[#FF929D] rounded-full">
                <div className="size-2.5 rounded-full bg-[#FF929D]"></div>
                <span className="font-semibold text-[#FF929D]">
                  Periode Terbatas
                </span>
              </div>
            </div>
            <p className="text-base 2xl:text-xl font-semibold text-[rgba(255,255,255,0.8)]">
              Nikmati promo periode terbatas khusus untuk trader yang baru
              bergabung di RebateFX.
            </p>
          </div>
        </div>
        <button className="py-3 2xl:py-6 px-[60px] bg-white border border-white rounded-full font-medium text-lg 2xl:text-2xl text-black cursor-pointer hover:bg-[rgba(255,255,255,0.8)] transition-all duration-300 ease-out">
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
};

export default Rewards;

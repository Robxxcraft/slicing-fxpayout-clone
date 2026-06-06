import BadgeSection from "@/components/ui/BadgeSection";

const WhatRebateForex = () => {
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 md:pt-15 xl:pt-[120px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">

        <div className="space-y-4 flex flex-col items-center md:items-start">
          <BadgeSection
            icon={
              <img src="/problem-user.svg" alt="User"/>
          }>
            REBATE FOREX
          </BadgeSection>
          <h1 className="text-center lg:text-left text-[30px] md:text-[32px] 2xl:text-[48px] font-bold leading-[140%]">
            Apa Itu Rebate Forex?
          </h1>
          <p className="text-center lg:text-left text-base md:text-xl 2xl:text-2xl font-medium text-black/80 leading-[200%]">
            Rebate Forex adalah sistem cashback yang memungkinkan trader mendapatkan kembali sebagian biaya trading dari komisi broker. Saat ini, terdapat berbagai platform rebate forex dengan sistem dan tingkat transparansi yang berbeda.
          </p>
        </div>

        <div className="p-4 md:p-10 border border-primary bg-[#F6F9FF] rounded-3xl md:rounded-[40px]">
          <div className="py-3 md:py-6 w-full flex gap-2 justify-center items-center bg-linear-to-t from-dark-primary to-primary rounded-[20px] md:rounded-3xl">
            <img
              src="/fxpayout-white.svg"
              alt="logo fx payout"
              className="mb-2 lg:mb-3 w-5 lg:w-6 2xl:w-8"
            />
            <span className="text-2xl 2xl:text-3xl font-semibold text-white">
              FXPAYOUT
            </span>
          </div>
          <p className="mt-6 text-base md:text-xl 2xl:text-2xl text-center font-medium text-primary leading-[200%]">
            FXPayout adalah salah satu platform rebate forex yang beroperasi sebagai {" "} 
            <span className="font-bold italic">Introducing Broker (IB)</span>, {" "}
            bukan broker, dan {" "}
            <span className="font-bold italic">tidak menerima deposit</span> {" "}
            atau mengelola dana pengguna. 
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhatRebateForex;

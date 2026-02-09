import React from "react";
import BoundedIcon from "../brokerDetail/ui/BoundedIcon";

const DefinitionSection = ({sectionsRef}: {sectionsRef: React.RefObject<Record<string, HTMLElement | null>>}) => {
  return (
    <section
      id="definition"
      ref={el => {sectionsRef.current.definition = el}}
      className="px-6 md:px-11 xl:px-0 xl:pr-24 2xl:pr-56 scroll-mt-[136px] lg:scroll-mt-[120px] pb-8 md:pb-10 lg:pb-0"
    >
      <h2 className="font-medium text-2xl md:text-[2rem] 2xl:text-[2.5rem]">
        Apa itu Rebate Forex?
      </h2>
      <div className="my-6 2xl:my-8 py-5 lg:py-6 flex flex-col justify-center items-center gap-2 w-full bg-linear-to-t from-dark-primary to-primary rounded-3xl">
        <img src="fxpayout-white.svg" alt="Logo FXPayout" className="h-16" />
        <p className="font-semibold text-2xl text-white">Rebate Forex</p>
      </div>
      <p className="text-xl 2xl:text-2xl leading-[169.2%]">
        Rebate forex adalah pengembalian sebagian komisi atau spread dari setiap transaksi trading. Anda tetap trading seperti biasa di broker, namun sebagian biaya trading akan dikembalikan kepada Anda dalam bentuk rebate.
      </p>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#222222]/10 shadow-[0_4px_41.8px_0_rgba(65,96,255,0.1)]">
          <div className="flex items-center gap-3">
            <BoundedIcon variant="fourth" icon="crown-icon.svg" alt="Crown Icon" />
            <h3 className="font-semibold text-xl 2xl:text-2xl text-[#222222]">
              Keunggulan Rebate
            </h3>
          </div>
          <p className="mt-3 text-xl 2xl:text-2xl leading-[169.2%]">
            Spread, leverage, dan eksekusi trading tetap sama seperti akun biasa. Dengan rebate, Anda bisa mengurangi biaya trading dan berpotensi meningkatkan profit dalam jangka panjang.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-[#222222]/10 shadow-[0_4px_41.8px_0_rgba(65,96,255,0.1)]">
          <div className="flex items-center gap-3">
            <BoundedIcon variant="fourth" icon="money-perc-icon.svg" alt="How It Works" />
            <h3 className="font-semibold text-xl 2xl:text-2xl text-[#222222]">
              Sistem Kerja Rebate
            </h3>
          </div>
          <p className="mt-3 text-xl 2xl:text-2xl leading-[169.2%]">
            Setiap kali Anda melakukan transaksi, broker membagikan sebagian komisi kepada fxpayout sebagai IB. Komisi tersebut kemudian dikembalikan ke akun Anda sebagai rebate dan dapat cairkan.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DefinitionSection;

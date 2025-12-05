import BoundedIcon from "./ui/BoundedIcon";
import ContentBody from "./ui/ContentBody";
import ContentHead from "./ui/ContentHead";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

const ProfilBroker = () => {
  return (
    <section id="profil" className="scroll-mt-18 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>Profil Broker</HeadingSection>
      <SubHeadingSection>Informasi resmi mengenai identitas dan regulasi broker.</SubHeadingSection>
      <div className="mt-6 2xl:mt-8 flex flex-col lg:flex-row gap-4 lg:gap-5 2xl:gap-6">
        <div className="p-6 2xl:p-8 flex-2 w-full border border-[#D0D0D0] bg-white rounded-3xl">

          {/* INFORMASI UTAMA */}
          <div className="flex items-center gap-4 2xl:gap-6">
            <BoundedIcon variant="second" icon="/brokerDetail/info.svg" alt="icon"/>
            <HeadingSection variant="second">
              Informasi Utama
            </HeadingSection>
          </div>
          <div className="mt-6 2xl:mt-10">
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Nama Broker</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>Exness</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Slogan</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>Trade with accuracy, speed, and deep liquidity</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Tier</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>Tier 1 — Premium ECN Broker</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Tahun Berdiri</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>2008</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Jenis Broker</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>Multi-regulated, ECN/Market Execution</ContentBody>
              </div>
            </div>
          </div>
        </div>

        {/* REGULASI UTAMA */}
        <div className="p-6 2xl:p-8 flex-1 w-full border border-[#D0D0D0] bg-white rounded-3xl">
          <div className="flex items-center gap-4 2xl:gap-6">
            <BoundedIcon variant="second" icon="/brokerDetail/regulation.svg" alt="icon"/>
            <HeadingSection variant="second">
              Regulasi Utama
            </HeadingSection>
          </div>
          <div className="mt-6 2xl:mt-10">
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <div>
                <ContentHead>FSA</ContentHead>
              </div>
              <div className="text-right">
                <ContentBody>Seychelles</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <div>
                <ContentHead>CySEC</ContentHead>
              </div>
              <div className="text-right">
                <ContentBody>Eropa</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <div>
                <ContentHead>FSC</ContentHead>
              </div>
              <div className="text-right">
                <ContentBody>Mauritius</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <div>
                <ContentHead>FSCA</ContentHead>
              </div>
              <div className="text-right">
                <ContentBody>Afrika Selatan</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <div>
                <ContentHead>CBCS</ContentHead>
              </div>
              <div className="text-right">
                <ContentBody>Curacao</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <div>
                <ContentHead>FCA (historis)</ContentHead>
              </div>
              <div className="text-right">
                <ContentBody>United Kingdom</ContentBody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilBroker;

import BoundedIcon from "./ui/BoundedIcon";
import ContentBody from "./ui/ContentBody";
import ContentHead from "./ui/ContentHead";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

const ProfilBroker = () => {
  return (
    <section id="profil" className="scroll-mt-18 lg:scroll-mt-0 mt-10 md:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>Profil Broker</HeadingSection>
      <SubHeadingSection>Informasi resmi mengenai identitas dan regulasi broker.</SubHeadingSection>
      <div className="mt-5 md:mt-6 2xl:mt-8 flex flex-col lg:flex-row gap-4 md:gap-5 2xl:gap-6">
        <div className="p-5 md:p-6 2xl:p-8 flex-2 w-full border border-[#D0D0D0] bg-white rounded-3xl">

          {/* INFORMASI UTAMA */}
          <div className="flex items-center gap-4 2xl:gap-6">
            <BoundedIcon icon="/brokerDetail/info.svg" alt="icon"/>
            <HeadingSection variant="second">
              Informasi Utama
            </HeadingSection>
          </div>
          <div className="mt-4 md:mt-5 2xl:mt-10">
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-col md:flex-row justify-between w-full border-b border-[#828282]/50">
              <ContentHead>Nama Broker</ContentHead>
              <ContentBody>Exness</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-col md:flex-row justify-between w-full border-b border-[#828282]/50">
              <ContentHead>Slogan</ContentHead>
              <ContentBody>Trade with accuracy, speed, and deep liquidity</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-col md:flex-row justify-between w-full border-b border-[#828282]/50">
              <ContentHead>Tier</ContentHead>
              <ContentBody>Tier 1 — Premium ECN Broker</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-col md:flex-row justify-between w-full border-b border-[#828282]/50">
              <ContentHead>Tahun Berdiri</ContentHead>
              <ContentBody>2008</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-col md:flex-row justify-between w-full border-b border-[#828282]/50">
              <ContentHead>Jenis Broker</ContentHead>
              <ContentBody>Multi-regulated, ECN/Market Execution</ContentBody>
            </div>
          </div>
        </div>

        {/* REGULASI UTAMA */}
        <div className="p-5 md:p-6 2xl:p-8 flex-1 w-full border border-[#D0D0D0] bg-white rounded-3xl">
          <div className="flex items-center gap-4 2xl:gap-6">
            <BoundedIcon icon="/brokerDetail/regulation.svg" alt="icon"/>
            <HeadingSection variant="second">
              Regulasi Utama
            </HeadingSection>
          </div>
          <div className="mt-4 md:mt-5 2xl:mt-10">
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <ContentHead>FSA</ContentHead>
              <ContentBody>Seychelles</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <ContentHead>CySEC</ContentHead>
              <ContentBody>Eropa</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <ContentHead>FSC</ContentHead>
              <ContentBody>Mauritius</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <ContentHead>FSCA</ContentHead>
              <ContentBody>Afrika Selatan</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <ContentHead>CBCS</ContentHead>
              <ContentBody>Curacao</ContentBody>
            </div>
            <div className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
              <ContentHead>FCA (historis)</ContentHead>
              <ContentBody>United Kingdom</ContentBody>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilBroker;

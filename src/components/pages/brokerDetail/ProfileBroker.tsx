import type { BrokerRanking, ProfileDetailBroker } from "@/utils/dataBroker/typeDetailBroker";
import BoundedIcon from "./ui/BoundedIcon";
import ContentBody from "./ui/ContentBody";
import ContentHead from "./ui/ContentHead";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";

type ProfileDetail = {
  name: string;
  slogan?: string;
  entity?: string;
  group?: string;
  ranking: BrokerRanking;
  yearFounded: string;
  brokerCategory: string;
  model?: string;
  totalInstrument?: string;
}

const ProfileBroker = ({profile}: {profile: ProfileDetailBroker}) => {
  const profileKeys = Object.keys(profile) as Array<keyof ProfileDetail>;
  const objectTitle: Record<keyof ProfileDetail, string> = {
    name: "Nama Broker",
    slogan: "Slogan",
    entity: "Entitas",
    group: "Group",
    ranking: "Tier",
    yearFounded: "Tahun Berdiri",
    brokerCategory: "Jenis Broker",
    model: "Model",
    totalInstrument: "Jumlah Instrumen"
  }
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
            {profileKeys.slice(0, profileKeys.length - 1).map((key) => (
              <div key={key} className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
                <div className="w-1/2 md:w-fit">
                  <ContentHead>{objectTitle[key]}</ContentHead>
                </div>
                <div className="w-1/2 md:w-fit text-right">
                  <ContentBody>{
                    key === "ranking" ? 
                     `Tier ${profile.ranking.tier} — ${profile.ranking.title}` :
                     profile[key]
                }</ContentBody>
                </div>
              </div>
            ))}
            {/* <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Slogan</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>{profile.slogan}</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Tier</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>Tier {profile.ranking.tier} — {profile.ranking.title}</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Tahun Berdiri</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>{profile.yearFounded}</ContentBody>
              </div>
            </div>
            <div className="py-2 2xl:py-3 flex gap-y-2 flex-row justify-between w-full border-b border-[#828282]/50">
              <div className="w-1/2 md:w-fit">
                <ContentHead>Jenis Broker</ContentHead>
              </div>
              <div className="w-1/2 md:w-fit text-right">
                <ContentBody>{profile.brokerCategory}</ContentBody>
              </div>
            </div> */}
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
            {profile.regulations.map((item, idx) => (
              <div key={idx} className="py-2 2xl:py-3 flex justify-between w-full border-b border-[#828282]/50">
                <div>
                  <ContentHead>{item.name}</ContentHead>
                </div>
                <div className="text-right">
                  <ContentBody>{item.country}</ContentBody>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileBroker;

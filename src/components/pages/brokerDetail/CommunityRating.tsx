import { FaStar, FaStarHalf } from "react-icons/fa";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";
import { IoMdStar } from "react-icons/io";
import type { BrokerRanking, CommunityRatingStruc } from "@/utils/dataBroker/typeDetailBroker";

const CommunityRating = ({name, profileImage, ranking, communityRating}: 
  {
    name: string; 
    profileImage: string; 
    ranking: BrokerRanking; 
    communityRating: CommunityRatingStruc
  }
) => {

  return (
    <section id="rating" className="scroll-mt-26 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 px-5 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <HeadingSection>Rating Komunitas</HeadingSection>
      <SubHeadingSection>Penilaian dan umpan balik dari pengguna broker.</SubHeadingSection>
      <div className="mt-6 2xl:mt-8 flex flex-col lg:flex-row gap-6 2xl:gap-14">
        <div className="py-4 lg:py-6 2xl:py-8 px-4 flex-1 flex flex-col items-center justify-center w-full bg-[#F9F9F9] rounded-4xl 2xl:rounded-[40px]">
          <img src={`/broker/${profileImage}`} alt={`Logo ${name}`} 
            className="size-16 lg:size-12 2xl:size-16 rounded-full object-cover" />
          <p className="mt-2 lg:mt-3 2xl:mt-4 text-2xl 2xl:text-[32px] font-semibold">
            {name}
          </p>
          <p className="mt-3 2xl:mt-2 text-xl 2xl:text-2xl text-black/60 text-center">
            Tier {ranking.tier} {ranking.title}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 2xl:gap-10 flex-2">
          <div className="px-6 md:px-8 2xl:px-10 max-w-full md:max-w-80 flex flex-col items-center justify-start">
            <p className="text-2xl 2xl:text-[32px] leading-9 font-semibold">
                Overall Score
            </p>
            <div className="mt-1 lg:mt-8 2xl:mt-10 flex items-end">
              <p className="text-[40px] lg:text-[48px] 2xl:text-[64px] lg:leading-16 font-semibold">
                {communityRating.score}
              </p>
              <p className="text-2xl 2xl:text-[36px] leading-11 tracking-[10%] font-semibold">
                /5
              </p>
            </div>
            <div className="mt-1 lg:mt-3 2xl:mt-4 flex gap-1 2xl:gap-2">
              {Array.from({length: Math.floor(
                communityRating.score
              )}).map((_, idx) => (
                <FaStar key={idx} className="text-2xl text-my-yellow" />
              ))}
              {!Number.isInteger(communityRating.score) &&
                <FaStarHalf className="text-2xl text-my-yellow" />
              }
            </div>
            <div className="mt-4 lg:mt-5 2xl:mt-6 px-8 py-4 bg-[#F5F8FF] rounded-full text-nowrap">
              <p className="text-base">
                Berdasarkan <span className="font-bold">{communityRating.quantityVote}</span> Ulasan Komunitas
              </p>
            </div>
          </div>
          {communityRating.classifications && 
            <div className="flex flex-col gap-4 md:gap-5 2xl:gap-6 w-full">
              {communityRating.classifications.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between">
                    <p className="text-base 2xl:text-xl font-medium">
                      {item.type}
                    </p>
                    <div className="flex gap-1 2xl:gap-1.5 items-start">
                      <IoMdStar className="mt-px text-my-yellow text-xl 2xl:text-3xl" />
                      <p className="text-base 2xl:text-xl font-semibold">
                        {item.rate}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 2xl:mt-2 relative h-6 md:h-5 2xl:h-6 w-full bg-[#EBEBEB] rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-linear-to-t from-dark-primary to-primary rounded-full"
                      style={{ width: `${item.rate * 100 / 5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          }
          {communityRating.reviewHighlights &&
            <div className="w-full">
              <p className="text-2xl 2xl:text-[32px] leading-9 font-semibold">Ulasan teratas</p>
              {communityRating.reviewHighlights.map((value, idx) => (
                <p key={idx} className="my-2 px-4 py-2 bg-[#F5F8FF] rounded-lg text-base 2xl:text-xl">
                  {value}
                </p>
              ))}
            </div>
          }
        </div>
      </div>
    </section>
  )
}

export default CommunityRating;

import { FaStar, FaStarHalf } from "react-icons/fa";
import HeadingSection from "./ui/HeadingSection";
import SubHeadingSection from "./ui/SubHeadingSection";
import { IoMdStar } from "react-icons/io";

type DetailRating = {
  type: string;
  rate: number;
}

const detailsRating: DetailRating[] = [
  { type: "Kecepatan Withdraw (WD)", rate: 5.0 },
  { type: "Stabilitas Server", rate: 5.0 },
  { type: "Customer Support", rate: 4.5 },
];

const CommunityRating = () => {
  return (
    <section id="rating" className="scroll-mt-18 lg:scroll-mt-0 mt-10 md:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 xl:px-24 2xl:px-56">
      <HeadingSection>Rating Komunitas</HeadingSection>
      <SubHeadingSection>Penilaian dan umpan balik dari pengguna broker.</SubHeadingSection>
      <div className="mt-5 md:mt-6 2xl:mt-8 flex flex-col lg:flex-row gap-10 2xl:gap-14">
        <div className="py-5 md:py-6 2xl:py-8 flex-1 flex flex-col items-center justify-center w-full bg-[#F9F9F9] rounded-4xl 2xl:rounded-[40px]">
          <img src="/broker/exness.png" alt="Icon" 
            className="size-16 lg:size-12 2xl:size-16 rounded-full object-cover" />
          <p className="mt-3 2xl:mt-4 text-[26px] 2xl:text-[32px] font-semibold">
            Exness
          </p>
          <p className="mt-1 2xl:mt-2 text-lg 2xl:text-2xl text-black/60">
            Tier 1 Premium ECN Broker
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 2xl:gap-10 flex-2">
          <div className="px-6 md:px-8 2xl:px-10 max-w-full md:max-w-80 flex flex-col items-center justify-start">
            <p className="text-xl md:text-2xl 2xl:text-[32px] leading-9 font-semibold">
                Overall Score
            </p>
            <div className="mt-4 md:mt-8 2xl:mt-10 flex items-end">
              <p className="text-[48px] 2xl:text-[64px] leading-16 font-semibold">
                4.8
              </p>
              <p className="text-[26px] 2xl:text-[36px] leading-11 tracking-[10%] font-semibold">
                /5
              </p>
            </div>
            <div className="mt-3 2xl:mt-4 flex gap-1 2xl:gap-2">
              <FaStar className="text-xl 2xl:text-2xl text-my-yellow" />
              <FaStar className="text-xl 2xl:text-2xl text-my-yellow" />
              <FaStar className="text-xl 2xl:text-2xl text-my-yellow" />
              <FaStar className="text-xl 2xl:text-2xl text-my-yellow" />
              <FaStarHalf className="text-xl 2xl:text-2xl text-my-yellow" />
            </div>
            <div className="mt-4 md:mt-5 2xl:mt-6 px-5 md:px-6 2xl:px-8 py-3 2xl:py-4 bg-[#F5F8FF] rounded-full text-nowrap">
              <p className="text-sm 2xl:text-base">
                Berdasarkan <span className="font-bold">121</span> Ulasan Komunitas
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-5 2xl:gap-6 w-full">
            {detailsRating.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <p className="text-base 2xl:text-xl font-medium">
                    {item.type}
                  </p>
                  <div className="flex gap-1 2xl:gap-1.5 items-center">
                    <IoMdStar className="text-my-yellow text-xl 2xl:text-3xl" />
                    <p className="text-base 2xl:text-xl font-semibold">
                      {item.rate}
                    </p>
                  </div>
                </div>
                <div className="mt-1 2xl:mt-2 relative h-5 2xl:h-6 w-full bg-[#EBEBEB] rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-linear-to-t from-dark-primary to-primary rounded-full"
                    style={{ width: `${item.rate * 100 / 5}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityRating;

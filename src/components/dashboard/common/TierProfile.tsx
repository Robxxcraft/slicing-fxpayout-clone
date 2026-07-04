import { templateTier } from "@/constants/templateTier";
import UserContext from "@/context/UserContext";
import type { UserTier } from "@/types/user.type";
import { useContext } from "react";
import { TiInfoLarge } from "react-icons/ti";

const TierProfile = () => {
  const [authUser] = useContext(UserContext);

  if (!authUser || authUser.role === "admin") return null; 
  const selectedTemplate = templateTier[authUser.role as "user" | "affiliator"];
  return (
    <div className="mb-4 p-6 flex flex-col lg:flex-row bg-white border border-[#DDDDDD] rounded-2xl">
      <div className="shrink-0 pr-0 lg:pr-6 pb-4 lg:pb-0">
        <p className="text-xl 3xl:text-[26px] font-bold text-black/40 uppercase tracking-[5%]">
          Tier {" "}
          {authUser.role === "user" && "Trader"}
          {authUser.role === "affiliator" && "Affiliator"}
        </p>
        <div className="mt-6 flex gap-4">
          <div className="p-3 w-20 3xl:w-[100px] h-fit bg-[#F5F5F5] border border-[#DDDDDD] rounded-2xl">
            <img src="/diamond_31419852.png" alt="diamond-icon" 
              className="object-contain aspect-square" />
          </div>
          <div>
            <div className="px-4 3xl:px-5 py-3 lg:py-1.5 3xl:py-3 w-fit bg-linear-to-t from-dark-primary to-primary rounded-full">
              <p className="uppercase text-[14px] 3xl:text-base font-medium text-white tracking-wider">
                {selectedTemplate[authUser.tier as UserTier].title}
              </p>
            </div>
            <p className="mt-2 text-2xl 3xl:text-[28px] font-bold">
              {selectedTemplate[authUser.tier as UserTier].earning}
            </p>
          </div>
        </div>
      </div>
      <div className="pl-0 lg:pl-6 pt-4 lg:pt-0 flex flex-col md:flex-row lg:flex-col gap-4 border-t lg:border-s lg:border-t-0 border-[#DDDDDD] w-full">
        <div className="p-4 flex gap-4 bg-[#F5F5F5] border border-[#DDDDDD] rounded-lg w-full">
          <span className="flex shrink-0 items-center justify-center size-6 3xl:size-[30px] border border-primary rounded-full">
            <TiInfoLarge className="text-base 3xl:text-[20px] text-primary" />
          </span>
          <p className="text-base 3xl:text-xl leading-[160%]">
            <span className="font-semibold">{selectedTemplate.active.title}: </span> 
            {selectedTemplate.active.condition}
          </p>
        </div>
        <div className="p-4 flex gap-4 bg-primary/10 border border-primary rounded-lg w-full">
          <span className="flex shrink-0 items-center justify-center size-6 3xl:size-[30px] border border-primary rounded-full">
            <TiInfoLarge className="text-base 3xl:text-[20px] text-primary" />
          </span>
          <p className="text-base 3xl:text-xl leading-[160%]">
            <span className="font-semibold">{selectedTemplate.vip.title}: </span> 
            {selectedTemplate.vip.condition}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TierProfile;

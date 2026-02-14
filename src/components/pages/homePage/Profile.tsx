import { useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { PiStarFill } from "react-icons/pi";

type FeatureProfile = {
  title: string;
  paragraph: string;
  translateKey: string;
};

const featuresProfile: FeatureProfile[] = [
  {
    title: "Rebate Hingga 90%",
    paragraph:
      "Dapatkan cashback hingga 90% dari komisi broker langsung ke akun Anda.",
    translateKey: "homePage.profile.features.0"
  },
  {
    title: "Fokus ke trader",
    paragraph: "Cashback langsung tanpa mengubah kondisi trading.",
    translateKey: "homePage.profile.features.1"
  },
  {
    title: "Local Support",
    paragraph: "Support berbagai bahasa & jam operasional ramah trader.",
    translateKey: "homePage.profile.features.2"
  },
];

const Profile = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-14 xl:pt-[120px] 2xl:pt-56">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        <div className="order-2 lg:order-1 px-4 py-6 md:px-6 2xl:px-[42px] md:py-6 2xl:py-[42px] w-full bg-[#F9F8F4] rounded-[20px] md:rounded-[40px]">
          <div className="py-3 md:py-4 2xl:py-6 px-3 md:px-4 2xl:px-5 flex items-center gap-2 md:gap-4 w-full bg-white border border-[#D0D5DD] rounded-full">
            <label htmlFor="search" className="cursor-pointer">
              <CiSearch className="text-2xl text-[#7E7E7E]" />
            </label>
            <input
              id="search"
              name="search"
              placeholder={t("homePage.profile.searchPlaceholder")}
              value={query}
              onChange={handleSearch}
              type="text"
              className="w-full text-[12px] md:text-base placeholder:text-primary focus:outline-0"
            />
          </div>
          <div className="my-4 lg:my-5 2xl:my-6 flex flex-wrap gap-x-1 lg:gap-x-2 gap-y-3 lg:gap-y-2">
            {[
              "homePage.profile.badges.0",
              "homePage.profile.badges.1",
              "homePage.profile.badges.2",
              "homePage.profile.badges.3",
              "homePage.profile.badges.4",
              "homePage.profile.badges.5",
            ].map((item, idx) => (
              <div
                key={idx}
                className="px-4 lg:px-5 2xl:px-6 py-2 lg:py-3 bg-my-light-blue border border-primary rounded-full">
                <p className="text-[12px] md:text-base lg:text-sm bg-linear-to-t from-dark-primary to-primary bg-clip-text text-transparent">
                  {t(item)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 lg:gap-3 2xl:gap-4">
            {featuresProfile.map((item, idx) => (
              <div
                key={idx}
                className="p-4 flex items-start gap-4 w-full bg-[rgba(11,24,37,0.02)] border border-[rgba(0,0,0,0.1)] rounded-2xl">
                <img src="/check.svg" alt="check icon"
                  className="mt-1"
                />
                <div>
                  <h3 className="text-xl lg:text-lg font-semibold">{t(`${item.translateKey}.title`)}</h3>
                  <p className="text-[12px] md:text-sm">{t(`${item.translateKey}.paragraph`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex lg:block justify-center">
            <div className="px-6 py-2 md:py-4 flex flex-row items-center gap-x-2 bg-primary rounded-full w-fit">
              <div className="flex gap-0.5 lg:gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <PiStarFill
                    key={idx}
                    className="text-base md:text-xl text-[#FFC250]"
                  />
                ))}
              </div>
              <p className="text-sm md:text-base 2xl:text-xl font-medium text-[#E9E9E9] text-center">
                {t("homePage.profile.tag")}
              </p>
            </div>
          </div>
          <h2 className="font-wix-madefor-display my-6 2xl:my-8 text-center lg:text-left text-2xl md:text-[32px] lg:text-[36px] 2xl:text-[64px] font-bold leading-[120%]">
            {t("homePage.profile.title")}
          </h2>
          <p className="text-center lg:text-left text-base md:text-2xl font-medium text-[rgba(0,0,0,0.8)] leading-[200%]">
            {t("homePage.profile.paragraph")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;

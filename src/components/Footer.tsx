import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { PiInstagramLogoFill } from "react-icons/pi";
import { listNavigation } from "../utils/listNavigation";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helper/pathHelper";

const Footer = () => {
  const { t, i18n } = useTranslation(["common"]);
  return (
    <footer className="xl:mt-4 3xl:mt-5">
      <div className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 py-11 xl:py-20 flex flex-col md:flex-row gap-6 md:gap-10 flex-wrap lg:flex-nowrap">
        <div className="mb-2 md:mb-0 flex flex-2 basis-full lg:basis-0 flex-col">
          <div className="flex gap-2 items-center">
            <img
              src="/fxpayout-blue.svg"
              alt="logo fx payout"
              className="rtl:order-1 ltr:order-0 w-5 lg:w-6 3xl:w-8"
            />
            <span className="rtl:order-0 ltr:order-1 text-2xl 3xl:text-3xl font-semibold text-primary">
              FXPAYOUT
            </span>
          </div>
          <p className="mt-2 lg:mt-3 3xl:mt-4 mb-4 3xl:mb-6 text-base 3xl:text-lg text-primary">
           {t("footer.paragraph")}
          </p>
          <div className="flex items-center gap-4 3xl:gap-6">
            {socialMedia.map((item) => (
              <Link
                to={item.url}
                key={item.id}
                aria-label={`${item} FX Payout`}
                target="_blank"
                className="p-2.5 text-2xl text-primary bg-[#F4F4F4] rounded-full cursor-pointer">
                {item.element}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="mb-[26px] lg:mb-5 3xl:mb-6 text-xl md:text-2xl lg:text-lg 3xl:text-xl font-semibold text-primary">
            {t("footer.quickLink")}
          </p>
          <div className="flex flex-col gap-3 3xl:gap-4">
            {listNavigation.map(({ title, url, code, sublist }, index) => {
              if (title === "Klaim Rebate") {
                return (
                  <Link
                    key={index}
                    to={getLocalizedPath("rebate-forex", i18n.language)}
                    className="text-base 3xl:text-xl text-primary hover:font-semibold transition-all duration-300 ease-out">
                    {t(`navbar.${code}`)}
                  </Link>
                )
              } 
              else if (sublist === undefined) {
                return (
                  <Link
                    key={index}
                    to={getLocalizedPath(url, i18n.language)}
                    className="text-base 3xl:text-xl text-primary hover:font-semibold transition-all duration-300 ease-out">
                    {t(`navbar.${code}`)}
                  </Link>
                );
              } else {
                return sublist.map((item, idx) => (
                  <Link
                    key={idx}
                    to={getLocalizedPath(item.url, i18n.language)}
                    className="text-base 3xl:text-xl text-primary hover:font-semibold transition-all duration-300 ease-out">
                     {t(`navbar.subNav.${item.code}`)}
                  </Link>
                ))
              }
            })}
          </div>
        </div>
        <div className="flex flex-col flex-1 md:flex-2">
          <p className="mb-[26px] lg:mb-5 3xl:mb-6 text-xl md:text-2xl lg:text-lg 3xl:text-xl font-semibold text-primary">
            {t("footer.contact")}
          </p>
          <div className="flex flex-col gap-3 3xl:gap-4">
            <div className="flex gap-4 3xl:gap-5">
              <div className="mt-px shrink-0 relative size-6 3xl:size-8 bg-primary rounded-full">
                <FaMapMarkerAlt className="absolute top-1/2 left-1/2 -translate-1/2 text-base 3xl:text-lg text-white" />
              </div>
              <p className="w-fit text-base 3xl:text-[18px] text-primary">
                1 Raffles Quay, #10-02 <br /> Singapore 048583
              </p>
            </div>
            <div className="flex gap-4 3xl:gap-5">
              <div className="mt-px shrink-0 relative size-6 3xl:size-8 bg-primary rounded-full">
                <FaPhoneAlt className="absolute top-1/2 left-1/2 -translate-1/2 text-sm 3xl:text-base text-white" />
              </div>
              <div className="flex flex-col" dir="ltr">
                <a href="https://wa.me/6282125597634" target="_blank" className="w-fit text-base 3xl:text-[18px] text-primary underline">
                  +62 821-2559-7634
                </a>
              </div>
            </div>
            <div className="flex gap-4 3xl:gap-5">
              <div className="mt-px shrink-0 relative size-6 3xl:size-8 bg-primary rounded-full">
                <FaWhatsapp className="absolute top-1/2 left-1/2 -translate-1/2 text-sm 3xl:text-base text-white" />
              </div>
              <a href="https://whatsapp.com/channel/0029VbBwSxf8fewzsFqX8B2f" target="_blank" className="w-fit text-base 3xl:text-[18px] text-primary underline">
                WhatsApp Channel
              </a>
            </div>
            <div className="flex gap-4 3xl:gap-5">
              <div className="shrink-0 relative size-6 3xl:size-8 bg-primary rounded-full">
                <IoMdMail className="absolute top-1/2 left-1/2 -translate-1/2 text-base 3xl:text-lg text-white" />
              </div>
              <p className="w-fit text-base 3xl:text-[18px] text-primary">
                support@fxpayout.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-sm lg:text-base text-center py-5 text-white">
        © 2026 FXPayout. All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;

const socialMedia = [
  {
    id: "telegram",
    url: "https://t.me/fxpayout_support",
    element: <RiTelegram2Fill aria-hidden="true" />,
  },
  {
    id: "twitter",
    url: "https://x.com/fxpayout?s=21",
    element: <FaXTwitter aria-hidden="true" />,
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/fxpayoutdotcom?igsh=MWFtb29vdHBqaGV0MA%3D%3D&utm_source=qr",
    element: <PiInstagramLogoFill aria-hidden="true" />,
  },
  {
    id: "tiktok",
    url: "https://www.tiktok.com/@fxpayout.com?_r=1&_t=ZS-94MFu3SZZJJ",
    element: <IoLogoTiktok aria-hidden="true" />,
  },
  {
    id: "whatsapp",
    url: "https://wa.me/6282125597634",
    element: <FaWhatsapp aria-hidden="true" />,
  },
];

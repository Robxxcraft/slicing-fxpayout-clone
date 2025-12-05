import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { PiInstagramLogoFill } from "react-icons/pi";
import { listNavigation } from "../utils/listNavigation";

const Footer = () => {
  return (
    <footer className="xl:mt-4 2xl:mt-5">
      <div className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 py-11 xl:py-20 flex flex-col md:flex-row gap-6 md:gap-10 flex-wrap lg:flex-nowrap">
        <div className="mb-2 md:mb-0 flex flex-2 basis-full lg:basis-0 flex-col">
          <div className="flex gap-2 items-center">
            <img
              src="/logoBlue.svg"
              alt="logo fx payout"
              className="w-10 2xl:w-[50px]"
            />
            <span className="text-2xl 2xl:text-3xl font-semibold text-primary">
              FXPAYOUT
            </span>
          </div>
          <p className="mt-2 lg:mt-3 2xl:mt-4 mb-4 2xl:mb-6 text-base 2xl:text-lg text-primary">
            Kami mengembalkan hingga 80% komisi IB kepada trader. Proses cepat,
            aman, dan transparan tanpa mengubah spread atau kondisi trading.
          </p>
          <div className="flex items-center gap-4 2xl:gap-6">
            {socialMedia.map((item) => (
              <Link
                to={item.url}
                key={item.id}
                className="p-2.5 text-2xl text-primary bg-[#F4F4F4] rounded-full cursor-pointer">
                {item.element}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="mb-[26px] lg:mb-5 2xl:mb-6 text-xl md:text-2xl lg:text-lg 2xl:text-xl font-semibold text-primary">
            Tautan Cepat
          </p>
          <div className="flex flex-col gap-3 2xl:gap-4">
            {listNavigation.map(({ title, url }, index) => {
              if (title.toLocaleLowerCase() !== "legal")
                return (
                  <Link
                    key={index}
                    to={url}
                    className="text-base 2xl:text-xl text-primary hover:font-semibold transition-all duration-300 ease-out">
                    {title}
                  </Link>
                );
            })}
          </div>
        </div>
        <div className="flex flex-col flex-1 md:flex-2">
          <p className="mb-[26px] lg:mb-5 2xl:mb-6 text-xl md:text-2xl lg:text-lg 2xl:text-xl font-semibold text-primary">
            Kontak Kami
          </p>
          <div className="flex flex-col gap-3 2xl:gap-4">
            <div className="flex gap-4 2xl:gap-5">
              <div className="relative size-6 2xl:size-8 bg-primary rounded-full">
                <FaMapMarkerAlt className="absolute top-1/2 left-1/2 -translate-1/2 text-base 2xl:text-lg text-white" />
              </div>
              <p className="w-fit text-base 2xl:text-[18px] text-primary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div className="flex gap-4 2xl:gap-5">
              <div className="relative size-6 2xl:size-8 bg-primary rounded-full">
                <FaPhoneAlt className="absolute top-1/2 left-1/2 -translate-1/2 text-sm 2xl:text-base text-white" />
              </div>
              <p className="w-fit text-base 2xl:text-[18px] text-primary">
                +124 621 4634
              </p>
            </div>
            <div className="flex gap-4 2xl:gap-5">
              <div className="relative size-6 2xl:size-8 bg-primary rounded-full">
                <IoMdMail className="absolute top-1/2 left-1/2 -translate-1/2 text-base 2xl:text-lg text-white" />
              </div>
              <p className="w-fit text-base 2xl:text-[18px] text-primary">
                support@rebatefx.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-sm lg:text-base text-center py-5 text-white">
        © 2025 FXPayout. All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;

const socialMedia = [
  {
    id: "facebook",
    url: "#",
    element: <FaFacebookF />,
  },
  {
    id: "twitter",
    url: "#",
    element: <FaTwitter />,
  },
  {
    id: "instagram",
    url: "#",
    element: <PiInstagramLogoFill />,
  },
];

import { BiSolidQuoteAltRight } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { testimonials } from "@/utils/testimonial";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation();
  return (
    <section className="mb-20 xl:mb-0">
      <div className="px-6 md:px-10 lg:px-18 xl:px-24 2xl:px-56 pt-10 lg:pt-18 2xl:pt-28">
        <div className="flex flex-col items-center text-center">
          <div className="px-6 py-2 w-fit flex gap-2 items-center bg-primary rounded-full">
            <BiSolidQuoteAltRight className="scale-x-[-1] text-2xl text-[#FAC14C]" />
            <span className="text-base md:text-xl font-medium text-white">
              {t("homePage.reviews.tag")}
            </span>
          </div>
          <h2 className="my-4 text-2xl md:text-[32px] 2xl:text-[44px] font-bold leading-[132%]">
            {t("homePage.reviews.title")}
          </h2>
          <p className="text-base md:text-xl leading-[160%]">
            {t("homePage.reviews.paragraph")}
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3.5">
          {/* BUTTON PREV */}
          <button aria-label="Slide sebelumnya" className="swiper-button-prev-custom flex justify-center items-center z-10 size-14 text-white rounded-full bg-linear-to-t from-dark-primary to-primary disabled:bg-white disabled:bg-none disabled:text-primary cursor-pointer">
            <IoArrowBackOutline size={24} aria-hidden="true" />
          </button>

          {/* BUTTON NEXT */}
          <button aria-label="Slide berikutnya" className="swiper-button-next-custom flex justify-center items-center z-10 size-14 text-white rounded-full bg-linear-to-t from-dark-primary to-primary disabled:bg-white disabled:bg-none disabled:text-primary cursor-pointer">
            <IoArrowForward size={24} aria-hidden="true" />
          </button>
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          modules={[Autoplay, Navigation, FreeMode]}
          freeMode={false}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: "auto",
              spaceBetween: 0,
              freeMode: true,
              autoplay: false
            },
          }}
          className="mt-6 lg:mt-8 xl:mt-10">
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide
              key={idx}
              className={`${
                idx === 0 ? "ml-5 md:ml-10 xl:ml-24 2xl:ml-56" : "md:ml-4"
              } ${
                idx === testimonials.length - 1 && "mr-5 md:mr-10 xl:mr-24 2xl:mr-56"
              } relative p-[22px] lg:p-6 2xl:p-10 w-full! md:w-[400px]! lg:w-[560px]! 2xl:w-[660px]! min-h-[190px] lg:min-h-[260px]! max-h-[300px] bg-[#4160FB]/80 rounded-[20px]`}>
              <img
                src="/quote.png"
                alt="quote icon"
                className="absolute h-13 md:h-16 lg:h-[130px] bottom-5 lg:-bottom-5 right-5 lg:right-0 opacity-30"
              />
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1.5 md:gap-0.5">
                    {Array.from({ length: testimonial.rate }).map((_, num) => (
                      <PiStarFill
                        key={`${testimonial.username}-${num}`}
                        className="text-xl text-[#FFC250]"
                      />
                    ))}
                  </div>
                  <p className="mt-4 lg:mt-5 2xl:mt-6 text-base lg:text-[25px] 2xl:text-[32px] leading-[160%] text-white">
                    {testimonial.comment}
                  </p>
                </div>
                <div className="mt-4 lg:mt-5 2xl:mt-6 flex gap-2 lg:gap-4">
                  <img
                    src={`/testimonial/${testimonial.image_profil}`}
                    alt={`Profil ${testimonial.username}`}
                    className="size-9 lg:size-[60px] rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base lg:text-[21px] 2xl:text-[26px] text-white -tracking-[2.5%]">
                      {testimonial.username}
                    </p>
                    <p className="text-sm lg:text-base text-white/60 -tracking-[2.5%]">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;

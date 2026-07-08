import { BiSolidQuoteAltRight } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { type Testimonial } from "@/types/testimonial.type";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GuestAPI } from "@/api";
import BadgeSection from "@/components/ui/BadgeSection";

const Reviews = () => {
  const { t } = useTranslation(["common", "homepage"]);
  const [dataTestimonial, setDataTestimonial] = useState<Testimonial[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { error, result } = await GuestAPI.getFeedback();
      if (!error) {
        setDataTestimonial(result);
      }
    }
    getData();
  }, []);
  return (
    <>
      <section className="mt-14 xl:mt-[120px] py-14 xl:py-[120px] bg-[#F9F9F9]">
        <div className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56">
          <div className="flex flex-col items-center text-center">
            <BadgeSection
              icon={
                <BiSolidQuoteAltRight className="scale-x-[-1] text-2xl text-[#FAC14C]" />
            }>
              {t("homepage:reviews.tag")}
            </BadgeSection>
            <h2 className="my-4 text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%]">
              {t("homepage:reviews.title")}
            </h2>
            <p className="text-base md:text-xl leading-[160%]">
              {t("homepage:reviews.paragraph")}
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
            {dataTestimonial.length === 0 ? 
            <div className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 flex justify-center">
              <p className="text-center text-black/80 max-w-3xl">
                {t("homepage:reviews.emptyReview")}
              </p>
            </div>
             : 
            dataTestimonial.map((testimonial, idx) => (
              <SwiperSlide
                key={idx}
                className={`${
                  idx === 0 ? "ms-5 md:ms-10 xl:ms-24 3xl:ms-56" : "md:ms-4"
                } ${
                  idx === dataTestimonial.length - 1 && "me-5 md:me-10 xl:me-24 3xl:me-56"
                } relative p-[22px] lg:p-6 3xl:p-10 w-full! md:w-[400px]! lg:w-[560px]! 3xl:w-[660px]! h-full! bg-[#4160FB]/80 rounded-[20px]`}>
                <img
                  src="/quote.png"
                  alt="quote icon"
                  className="absolute h-13 md:h-16 lg:h-[130px] bottom-5 lg:-bottom-5 end-5 lg:end-0 opacity-30"
                />
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex gap-1.5 md:gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, num) => (
                        <PiStarFill
                          key={`${testimonial.name}-${num}`}
                          className="text-xl text-[#FFC250]"
                        />
                      ))}
                    </div>
                    <p className="mt-4 lg:mt-5 3xl:mt-6 text-base lg:text-[25px] 3xl:text-[32px] leading-[160%] text-white">
                      {testimonial.review}
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-5 3xl:mt-6 flex gap-2 lg:gap-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${testimonial.name}&background=fff&color=4160FF&bold=true&font-size=0.4`}
                      alt={`Profil ${testimonial.name}`}
                      className="size-9 lg:size-[60px] rounded-full object-cover"
                    />
                    <div>
                      <p className="text-base lg:text-[21px] 3xl:text-[26px] text-white -tracking-[2.5%]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm lg:text-base text-white/60 -tracking-[2.5%]">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Reviews;

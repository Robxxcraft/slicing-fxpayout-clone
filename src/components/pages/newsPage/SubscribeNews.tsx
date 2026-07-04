import Button from "@/components/ui/Button";
import { useForm } from "@/hooks/useForm";
import { useTranslation } from "react-i18next";

const SubscribeNews = () => {
  const { t } = useTranslation(["newspage"]);
  const mailForm = useForm({
    email: ""
  });

  const handleSubmitSubscribe = () => {

  }

  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 pt-10 md:pt-15 3xl:pt-20">
      <div className="relative py-10 xl:py-14 3xl:py-[72px] px-4 xl:px-10 flex flex-col items-center justify-center bg-primary rounded-3xl overflow-hidden">
        <div className="z-999 flex flex-col lg:flex-row justify-between items-center gap-6 w-full ">
          <div className="max-w-full lg:max-w-1/2 text-center lg:text-start">
            <h2 className="text-2xl 3xl:text-[40px] font-bold text-white leading-[134%] max-w-[620px]">
              {t("newspage:subscribe.title")}
            </h2>
            <p className="mt-4 text-base 3xl:text-xl text-white leading-[160%] max-w-[620]">
              {t("newspage:subscribe.paragraph")}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 max-w-full lg:max-w-1/2">
            <div className="relative w-full">
              <img src="/email-icon.svg" alt="Icon email"
                className="absolute start-8 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                name="email"
                id="email"
                placeholder={t("newspage:subscribe.emailPlaceholder")}
                value={mailForm.values.email}
                onChange={mailForm.handleChange}
                inputMode="email"
                autoComplete="email"
                className={`
                  ps-[70px] pe-8 py-5 md:py-4 3xl:py-5 w-full bg-white text-base 3xl:text-xl placeholder:text-[#747474] rounded-full focus:outline-primary disabled:bg-[#F5F5F5] disabled:cursor-not-allowed`
                }
              />
            </div>
            <Button buttonType="button" onClick={handleSubmitSubscribe} variant="primary-light" size="xl" className="w-full! md:w-fit! font-medium!">
              Subscribe
            </Button>
          </div>
        </div>
        <img
          src="/circle-ornament.png"
          alt="ornament"
          className="absolute z-10 top-0 -start-[10%] ltr:-rotate-55 rtl:rotate-260 w-[600px]"
        />
      </div>
    </section>
  )
}

export default SubscribeNews;

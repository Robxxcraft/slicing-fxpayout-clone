import BadgeSection from "@/components/ui/BadgeSection";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa6";

const dataFaq = [
  {
    question: "Apa itu forex rebate?",
    answer: "Forex rebate adalah cashback dari sebagian komisi atau spread yang dibayarkan setiap kali Anda melakukan trading. Dengan rebate, Anda bisa mengurangi biaya trading dan meningkatkan profit.",
    keyTranslate: "faqs.0"
  },
  {
    question: "Apakah forex rebate aman?",
    answer: "Ya, rebate aman karena berasal dari komisi broker resmi (Introducing Broker). Tidak ada perubahan pada akun trading atau kondisi trading Anda.",
    keyTranslate: "faqs.1"
  },
  {
    question: "Apakah FXPayout broker?",
    answer: "Tidak. FXPayout bukan broker dan tidak mengelola dana trading Anda. Kami hanya sebagai perantara (Introducing Broker) yang mengembalikan sebagian komisi kepada trader.",
    keyTranslate: "faqs.2"
  },
  {
    question: "Apakah saya perlu transfer dana ke FXPayout?",
    answer: "Tidak. Anda tidak perlu melakukan deposit ke FXPayout. Semua dana tetap berada di akun broker Anda.",
    keyTranslate: "faqs.3"
  },
  {
    question: "Apakah FXPayout memiliki akses ke akun trading saya?",
    answer: "Tidak. Kami tidak memiliki akses ke akun trading Anda dan tidak menyimpan data login atau password.",
    keyTranslate: "faqs.4"
  },
];

const FaqSection = () => {
  const { t } = useTranslation(["viprebatepage"]);
  const key = "viprebatepage:faqsection";
  return (
    <section className="px-6 md:px-10 lg:px-18 xl:px-24 3xl:px-56 py-10 md:py-15 3xl:py-20 bg-[#F9F9F9]">
      <div className="flex flex-col items-center justify-center gap-4">
        <BadgeSection
          icon={
            <img src="/question-mark.svg" alt="Question" 
              className="scale-90 md:scale-100" />
        }>
          FAQ
        </BadgeSection>
        <h2 className="text-2xl md:text-[32px] 3xl:text-[44px] font-bold leading-[132%] text-center">
          {t(`${key}.title`)}
        </h2>
        <p className="text-base md:text-xl leading-[160%] max-w-5xl text-center">
          {t(`${key}.paragraph`)}
        </p>
      </div>
      <div className="mt-6 3xl:mt-8 flex flex-col gap-2 lg:gap-3 3xl:gap-4">
        {Array.isArray(dataFaq) && dataFaq.map((f, idx) => (
          <details key={idx} name="faq-broker" open={idx === 0}
            className="group rounded-2xl bg-white border border-[#D9DBE9] shadow-[0_5px_24px_0_rgba(65,96,255,0.233xl:shadow-[0_5px_31.4px_0_rgba(65,96,255,0.23))]">
            <summary className="px-8 py-6 lg:py-4 3xl:py-6 flex gap-2 justify-between items-center cursor-pointer">
              <p className="w-fit text-base md:text-xl font-semibold leading-[135%] text-my-purple">
                {t(`${key}.${f.keyTranslate}.question`)}
              </p>
              <div className="flex items-center justify-center size-8 bg-[#F1F2F9] group-open:bg-linear-to-t from-dark-primary to-primary rounded-full">
                <FaChevronDown className="text-my-half-purple group-open:text-white group-open:rotate-180 transition-all duration-300" />
              </div>
            </summary>
            <p className="px-8 mb-10 md:mb-8 3xl:mb-10 text-base md:text-xl leading-[180%] text-my-half-purple">{t(`${key}.${f.keyTranslate}.answer`)}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqSection;

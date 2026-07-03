import BadgeSection from "@/components/ui/BadgeSection";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa6";

const dataFaq = [
  {
    question: "Apakah saya harus trading?",
    answer: "Tidak. Anda tidak perlu melakukan trading. Anda hanya perlu membagikan link referral, dan komisi akan dihasilkan dari aktivitas trading referral Anda.",
    translateKey: "faqs.0"
  },
  {
    question: "Apakah saya perlu mengelola dana?",
    answer: "Tidak. Anda tidak perlu mengelola dana apa pun. Semua aktivitas trading dilakukan langsung oleh trader di broker.",
    translateKey: "faqs.1"
  },
  {
    question: "Apakah ada potongan dari rebate trader?",
    answer: "Tidak ada potongan tambahan dari sisi Anda. Komisi yang Anda terima berasal dari pembagian komisi broker (Introducing Broker), tanpa mempengaruhi hasil trading trader.",
    translateKey: "faqs.2"
  },
  {
    question: "Apakah bisa menggunakan lebih dari satu broker?",
    answer: "Ya, Anda dapat menggunakan dan mempromosikan lebih dari satu broker yang tersedia di FXPayout untuk menjangkau lebih banyak trader.",
    translateKey: "faqs.3"
  },
];

const FaqAffiliateSection = () => {
  const { t } = useTranslation(["affiliatelandingpage"]);
  const key = "affiliatelandingpage:faqsection";
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
                {t(`${key}.${f.translateKey}.question`)}
              </p>
              <div className="flex items-center justify-center size-8 bg-[#F1F2F9] group-open:bg-linear-to-t from-dark-primary to-primary rounded-full">
                <FaChevronDown className="text-my-half-purple group-open:text-white group-open:rotate-180 transition-all duration-300" />
              </div>
            </summary>
            <p className="px-8 mb-10 md:mb-8 3xl:mb-10 text-base md:text-xl leading-[180%] text-my-half-purple">
              {t(`${key}.${f.translateKey}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqAffiliateSection;

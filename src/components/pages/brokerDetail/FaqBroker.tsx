import { FaChevronDown } from 'react-icons/fa';
import HeadingSection from './ui/HeadingSection';
import SubHeadingSection from './ui/SubHeadingSection';
import type { FaqStructure } from '@/utils/dataBroker/typeDetailBroker';
import { useTranslation } from 'react-i18next';

const FaqBroker = ({ brokerId, faq }: { brokerId: string; faq: string }) => {
  const { t } = useTranslation([brokerId, "brokerdetailpage"]);
  const dataFaq = t(faq, { returnObjects: true }) as FaqStructure[];
  return (
    <section id="faq" className="scroll-mt-18 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 md:px-11 lg:px-18 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>{t("brokerdetailpage:faq.title")}</HeadingSection>
      <SubHeadingSection>{t("brokerdetailpage:faq.subtitle")}</SubHeadingSection>
      <div className='mt-6 2xl:mt-8 flex flex-col gap-2 lg:gap-3 2xl:gap-4'>
        {Array.isArray(dataFaq) && dataFaq.map((f, idx) => (
          <details key={idx} name="faq-broker" open={idx === 0}
            className='group rounded-2xl bg-white border border-[#D9DBE9] shadow-[0_5px_24px_0_rgba(65,96,255,0.23)] 2xl:shadow-[0_5px_31.4px_0_rgba(65,96,255,0.23)]'>
            <summary className='px-8 py-6 lg:py-4 2xl:py-6 flex gap-2 justify-between items-center cursor-pointer'>
              <p className='w-fit text-base md:text-xl font-semibold leading-[135%] text-my-purple'>
                {f.question}
              </p>
              <div className='flex items-center justify-center size-8 bg-linear-to-t from-dark-primary to-primary rounded-full'>
                <FaChevronDown className='text-white group-open:rotate-180' />
              </div>
            </summary>
            <p className='px-8 mb-10 md:mb-8 2xl:mb-10 text-base md:text-xl leading-[180%] text-my-half-purple'>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqBroker;

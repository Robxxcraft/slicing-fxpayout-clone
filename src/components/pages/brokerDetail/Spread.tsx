import HeadingSection from './ui/HeadingSection';
import SubHeadingSection from './ui/SubHeadingSection';
import BoundedIcon from './ui/BoundedIcon';
import ContentHead from './ui/ContentHead';
import ContentBody from './ui/ContentBody';
import type { SpreadStructure } from '@/utils/dataBroker/typeDetailBroker';
import { useTranslation } from 'react-i18next';

const Spread = ({ tradingSpread }: { tradingSpread: SpreadStructure[] }) => {
  const { t } = useTranslation(["brokerdetailpage"]);
  return (
    <section id="spread-komisi" className="scroll-mt-26 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56">
      <HeadingSection>{t("brokerdetailpage:spread.title")}</HeadingSection>
      <SubHeadingSection>{t("brokerdetailpage:spread.subtitle")}</SubHeadingSection>
      <div className="mt-6 2xl:mt-8 flex flex-col md:flex-row gap-3 lg:gap-5 2xl:gap-6">
        {tradingSpread.map((item,idx) => (
          <div key={idx} className="p-6 2xl:p-8 max-w-full md:max-w-1/2 w-full border border-[#D0D0D0] bg-white rounded-3xl">
            <div className="flex items-center gap-4 lg:gap-6">
              <BoundedIcon variant='second' icon={`/brokerDetail/${item.icon}`} alt="icon"/>
              <HeadingSection variant="second">{item.pair}</HeadingSection>
            </div>
            <div className="mt-6 2xl:mt-10">
              <div className="py-3 text-base flex justify-between w-full border-b border-[#828282]/50">
                <p>{t("brokerdetailpage:spread.accountType")}</p>
                <p>{t("brokerdetailpage:spread.title").toLowerCase()}</p>
              </div>
              {item.spreads.map((spread, i) => (
                <div key={i} className="py-3 flex gap-4 justify-between w-full border-b border-[#828282]/50">
                  <ContentHead smText="text-xl">{t(spread.accountType)}</ContentHead>
                  <span className='text-right'> 
                    <ContentBody smText="text-xl">{t(spread.spread)}</ContentBody>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Spread;

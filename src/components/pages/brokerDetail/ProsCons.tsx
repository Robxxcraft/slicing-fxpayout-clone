import { TbTriangleInvertedFilled } from "react-icons/tb";
import { MdThumbUp } from "react-icons/md";
import HeadingSection from './ui/HeadingSection';
import SubHeadingSection from './ui/SubHeadingSection';

const ProsCons = ({advantages, disadvantages}: {advantages: string[]; disadvantages: string[]}) => {
  return (
    <section id="kelebihan-kekurangan" className="scroll-mt-18 lg:scroll-mt-0 mt-10 lg:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 md:px-11 lg:px-18 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>Kelebihan & Kekurangan</HeadingSection>
      <SubHeadingSection>Ringkasan poin positif dan hal yang perlu diperhatikan.</SubHeadingSection>
      <div className="mt-6 2xl:mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10 2xl:gap-14">
        
        {/* ADVANTAGES */}
        <div className="bg-[#F0F9FF] rounded-2xl md:rounded-4xl 2xl:rounded-[40px] shadow-[0_4px_50px_0_rgba(0,0,0,0.1)] 2xl:shadow-[0_4px_100px_0_rgba(0,0,0,0.1)]">
          <div className='relative py-5 md:py-6 w-full bg-primary rounded-2xl shadow-[0_7px_16.8px_0_rgba(65,96,255,0.28)]'>
            <h3 className='text-xl md:text-2xl font-semibold text-white text-center'>
              Kelebihan
            </h3>
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2">
              <TbTriangleInvertedFilled className="text-[48px] md:text-[56px] 2xl:text-[72px] text-primary"/>
            </div>
          </div>
          <div className='mb-7 md:mb-6 2xl:mb-8 mx-4 md:mx-7 2xl:mx-8 pt-10 md:pt-12 2xl:pt-16 pb-4 md:pb-6 2xl:pb-8 px-4 md:px-6 2xl:px-8 border-l border-r border-b border-[#4160FF] border-dashed rounded-b-2xl md:rounded-b-4xl 2xl:rounded-b-[40px]'>
            <div className="flex flex-col gap-6 md:gap-4 2xl:gap-5">
              {advantages.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <MdThumbUp className="text-primary text-2xl"/>  
                  <p className="w-fit text-xl md:text-2xl leading-[29px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* DISADVANTAGES */}
        <div className="relative bg-[#FEF7F7] rounded-2xl md:rounded-4xl 2xl:rounded-[40px] shadow-[0_4px_50px_0_rgba(0,0,0,0.1)] 2xl:shadow-[0_4px_100px_0_rgba(0,0,0,0.1)]">
          <div className='relative py-5 md:py-6 w-full bg-[#FC685B] rounded-2xl shadow-[0_7px_16.8px_0_rgba(252,104,91,0.28)]'>
            <h3 className='text-xl md:text-2xl font-semibold text-white text-center'>
              Kekurangan
            </h3>
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2">
              <TbTriangleInvertedFilled className="text-[48px] md:text-[56px] 2xl:text-[72px] text-[#FC685B]"/>
            </div>
          </div>
          <div className='mb-7 md:mb-6 2xl:mb-8 mx-4 md:mx-7 2xl:mx-8 pt-10 md:pt-12 2xl:pt-16 pb-4 md:pb-6 2xl:pb-8 px-4 md:px-6 2xl:px-8 border-l border-r border-b border-[#FC685B] border-dashed rounded-b-2xl md:rounded-b-4xl 2xl:rounded-b-[40px]'>
            <div className="flex flex-col gap-6 md:gap-4 2xl:gap-5">
              {disadvantages.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <MdThumbUp className="rotate-180 scale-x-[-1] text-[#FC685B] text-2xl"/>  
                  <p className="w-fit text-xl md:text-2xl leading-[29px]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProsCons;

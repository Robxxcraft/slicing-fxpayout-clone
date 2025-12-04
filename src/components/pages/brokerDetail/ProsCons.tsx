import { TbTriangleInvertedFilled } from "react-icons/tb";
import { MdThumbUp } from "react-icons/md";
import HeadingSection from './ui/HeadingSection';
import SubHeadingSection from './ui/SubHeadingSection';

const advantages = ["Spread & eksekusi sangat stabil", "Withdraw super cepat", "Banyak metode deposit & withdraw", "Tersedia akun Cent untuk pemula", "Ramah EA & scalping", "Leverage besar dan fleksibel"];
const disadvantages = ["Komisi berbeda-beda per pair di akun Raw/Zero", "Leverage dibatasi pada beberapa regulasi", "Tidak semua instrumen tersedia di akun Cent"];

const ProsCons = () => {
  return (
    <section id="kelebihan-kekurangan" className="scroll-mt-18 lg:scroll-mt-0 mt-10 md:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>Kelebihan & Kekurangan</HeadingSection>
      <SubHeadingSection>Ringkasan poin positif dan hal yang perlu diperhatikan.</SubHeadingSection>
      <div className="mt-5 md:mt-6 2xl:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 2xl:gap-14">
        
        {/* ADVANTAGES */}
        <div className="bg-[#F0F9FF] rounded-2xl md:rounded-4xl 2xl:rounded-[40px] shadow-[0_4px_50px_0_rgba(0,0,0,0.1)] 2xl:shadow-[0_4px_100px_0_rgba(0,0,0,0.1)]">
          <div className='relative py-3 md:py-4 2xl:py-6 w-full bg-primary rounded-2xl shadow-[0_7px_16.8px_0_rgba(65,96,255,0.28)]'>
            <p className='text-lg md:text-xl 2xl:text-2xl font-semibold text-white text-center'>
              Kelebihan
            </p>
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2">
              <TbTriangleInvertedFilled className="text-[48px] md:text-[56px] 2xl:text-[72px] text-primary"/>
            </div>
          </div>
          <div className='mb-4 md:mb-6 2xl:mb-8 mx-4 md:mx-6 2xl:mx-8 pt-10 md:pt-12 2xl:pt-16 pb-4 md:pb-6 2xl:pb-8 px-4 md:px-6 2xl:px-8 border-l border-r border-b border-[#4160FF] border-dashed rounded-b-2xl md:rounded-b-4xl 2xl:rounded-b-[40px]'>
            <div className="flex flex-col gap-4 2xl:gap-5">
              {advantages.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 2xl:gap-3">
                  <MdThumbUp className="text-primary text-xl 2xl:text-2xl"/>  
                  <p className="w-fit text-base md:text-lg 2xl:text-2xl">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* DISADVANTAGES */}
        <div className="relative bg-[#FEF7F7] rounded-2xl md:rounded-4xl 2xl:rounded-[40px] shadow-[0_4px_50px_0_rgba(0,0,0,0.1)] 2xl:shadow-[0_4px_100px_0_rgba(0,0,0,0.1)]">
          <div className='relative py-3 md:py-4 2xl:py-6 w-full bg-[#FC685B] rounded-2xl shadow-[0_7px_16.8px_0_rgba(252,104,91,0.28)]'>
            <p className='text-lg md:text-xl 2xl:text-2xl font-semibold text-white text-center'>
              Kekurangan
            </p>
            <div className="absolute top-[70%] left-1/2 -translate-x-1/2">
              <TbTriangleInvertedFilled className="text-[48px] md:text-[56px] 2xl:text-[72px] text-[#FC685B]"/>
            </div>
          </div>
          <div className='mb-4 md:mb-6 2xl:mb-8 mx-4 md:mx-6 2xl:mx-8 pt-10 md:pt-12 2xl:pt-16 pb-4 md:pb-6 2xl:pb-8 px-4 md:px-6 2xl:px-8 border-l border-r border-b border-[#FC685B] border-dashed rounded-b-2xl md:rounded-b-4xl 2xl:rounded-b-[40px]'>
            <div className="flex flex-col gap-4 2xl:gap-5">
              {disadvantages.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 2xl:gap-3">
                  <MdThumbUp className="text-[#FC685B] text-xl 2xl:text-2xl"/>  
                  <p className="w-fit text-base 2xl:text-2xl">
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

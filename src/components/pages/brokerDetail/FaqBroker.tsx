import { FaChevronDown } from 'react-icons/fa';
import HeadingSection from './ui/HeadingSection';
import SubHeadingSection from './ui/SubHeadingSection';

type FaqStructure = {
  summary: string;
  paragraph: string;
}

const itemsFaq: FaqStructure[] = [
  {
    summary: "Apakah Exness Aman?",
    paragraph: "Exness merupakan broker teregulasi oleh beberapa otoritas keuangan internasional, termasuk FSA, CySEC, FSCA, dan FSC. Perusahaan ini sudah beroperasi sejak 2008 dan dikenal transparan dalam menampilkan laporan keuangan serta statistik trading. Meski tidak berada di bawah regulasi Indonesia, Exness termasuk broker global yang banyak digunakan trader secara internasional."
  },
  {
    summary: "Apakah Exness Menyediakan Akun Cent?",
    paragraph: "Exness merupakan broker teregulasi oleh beberapa otoritas keuangan internasional, termasuk FSA, CySEC, FSCA, dan FSC. Perusahaan ini sudah beroperasi sejak 2008 dan dikenal transparan dalam menampilkan laporan keuangan serta statistik trading. Meski tidak berada di bawah regulasi Indonesia, Exness termasuk broker global yang banyak digunakan trader secara internasional."
  },
  {
    summary: "Apakah Exness Cocok Untuk Pemula?",
    paragraph: "Exness merupakan broker teregulasi oleh beberapa otoritas keuangan internasional, termasuk FSA, CySEC, FSCA, dan FSC. Perusahaan ini sudah beroperasi sejak 2008 dan dikenal transparan dalam menampilkan laporan keuangan serta statistik trading. Meski tidak berada di bawah regulasi Indonesia, Exness termasuk broker global yang banyak digunakan trader secara internasional."
  },
  {
    summary: "Apakah Exness Cocok Untuk EA & Scalping?",
    paragraph: "Exness merupakan broker teregulasi oleh beberapa otoritas keuangan internasional, termasuk FSA, CySEC, FSCA, dan FSC. Perusahaan ini sudah beroperasi sejak 2008 dan dikenal transparan dalam menampilkan laporan keuangan serta statistik trading. Meski tidak berada di bawah regulasi Indonesia, Exness termasuk broker global yang banyak digunakan trader secara internasional."
  },
  {
    summary: "Seberapa Cepat Proses WD di Exness?",
    paragraph: "Exness merupakan broker teregulasi oleh beberapa otoritas keuangan internasional, termasuk FSA, CySEC, FSCA, dan FSC. Perusahaan ini sudah beroperasi sejak 2008 dan dikenal transparan dalam menampilkan laporan keuangan serta statistik trading. Meski tidak berada di bawah regulasi Indonesia, Exness termasuk broker global yang banyak digunakan trader secara internasional."
  },
];

const FaqBroker = () => {
  return (
    <section id="faq" className="scroll-mt-18 lg:scroll-mt-0 mt-10 md:mt-12 2xl:mt-16 py-8 md:py-10 2xl:py-14 px-5 xl:px-24 2xl:px-56 bg-[#F9F9F9]">
      <HeadingSection>FAQ</HeadingSection>
      <SubHeadingSection>Pertanyaan yang paling sering diajukan oleh pengguna.</SubHeadingSection>
      <div className='mt-5 md:mt-6 2xl:mt-8 flex flex-col gap-3 2xl:gap-4'>
        {itemsFaq.map((f, idx) => (
          <details key={idx} name="faq-broker" open={idx === 0}
            className='group rounded-2xl bg-white border border-[#D9DBE9] shadow-[0_5px_24px_0_rgba(65,96,255,0.23)] 2xl:shadow-[0_5px_31.4px_0_rgba(65,96,255,0.23)]'>
            <summary className='px-5 md:px-6 2xl:px-8 py-5 md:py-4 2xl:py-6 flex gap-2 justify-between items-center cursor-pointer'>
              <p className='w-fit text-base 2xl:text-xl font-semibold leading-[135%] text-my-purple'>
                {f.summary}
              </p>
              <div className='flex items-center justify-center size-7 md:size-6 2xl:size-8 bg-linear-to-t from-dark-primary to-primary rounded-full'>
                <FaChevronDown className='text-white group-open:rotate-180' />
              </div>
            </summary>
            <p className='px-5 md:px-6 2xl:px-8 mb-6 md:mb-8 2xl:mb-10 text-base 2xl:text-xl leading-[180%] text-my-half-purple'>{f.paragraph}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqBroker;

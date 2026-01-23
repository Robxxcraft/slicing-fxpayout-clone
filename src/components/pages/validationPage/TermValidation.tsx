import type { Dispatch, SetStateAction } from 'react';
import { IoClose } from 'react-icons/io5';
import { TiInfoLarge } from 'react-icons/ti';

type TermValidation = {
  title: string;
  description: string;
}

const terms: TermValidation[] = [
  {
    title: "Validasi akun hanya dapat dilakukan satu kali.",
    description: "Pastikan seluruh data telah diisi dengan benar. Jika terjadi kesalahan pengisian, silakan hubungi tim support fxpayout sebelum mengirim formulir."
  },
  {
    title: "Pastikan seluruh data sesuai dengan identitas dan akun trading Anda.",
    description: "Data yang tidak sesuai dapat menyebabkan proses verifikasi tertunda atau ditolak."
  },
  {
    title: "Gunakan rekening bank yang aktif dan atas nama pribadi.",
    description: "Rekening ini akan digunakan untuk proses pencairan rebate. Pastikan nama pemegang rekening sesuai dengan data."
  },
];

const TermValidation = ({
  setShowNotify,
}: {
  setShowNotify: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 pt-8 lg:pt-10">
      <div className="p-4 md:p-6 bg-my-light-blue border border-primary rounded-[10px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="flex shrink-0 items-center justify-center size-6 md:size-7 lg:size-9 border border-primary rounded-full">
              <TiInfoLarge className="text-base lg:text-[20px] text-primary" />
            </span>
            <p className="text-base lg:text-lg 2xl:text-xl font-semibold text-[rgba(0,0,0,0.8)]">
              Ketentuan Validasi Akun
            </p>
          </div>
          <button
            onClick={() => setShowNotify(false)}
            className="cursor-pointer">
            <IoClose className="text-[#FF9C94] text-2xl md:text-3xl" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {terms.map((term, idx) => (
            <div key={idx} className="p-4 flex gap-3 md:gap-4 bg-[#0B1825]/2 border border-[#425DE8]/20 rounded-2xl">
              <span className="flex shrink-0 items-center justify-center size-7 lg:size-9 border-2 border-primary rounded-full font-medium text-sm lg:text-base text-primary">
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <div>
              <p className="text-base 2xl:text-xl font-medium leading-[142%]">
                {term.title}
              </p>
              <p className="mt-2.5 text-sm md:text-base leading-[142%]">
                {term.description}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TermValidation;

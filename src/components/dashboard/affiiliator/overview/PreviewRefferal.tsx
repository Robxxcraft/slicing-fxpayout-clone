import { TbCopy, TbWorld } from "react-icons/tb";
import ParagraphDashboard from "../../common/ParagraphDashboard";
import { FaCheck } from "react-icons/fa6";
import { VscKey } from "react-icons/vsc";

const PreviewRefferal = ({
  onCopy,
  isCopied,
  codeRefferal
}: {
  onCopy: (ref: "code" | "url") => void;
  isCopied: { url: boolean; code: boolean };
  codeRefferal: string;
}) => {
  return (
    <section className="mt-7 3xl:mt-10">
      <h2 className="text-xl 3xl:text-[2rem] font-semibold">
        Refferal Tools
      </h2>
      <div className="mt-4 3xl:mt-5 flex flex-col xl:flex-row gap-2 lg:gap-4 3xl:gap-5">
        <div className="max-w-[580px] 3xl:max-w-[960px] w-full rounded-lg overflow-hidden border border-[#DDDDDD] h-fit">
          <div className="pt-5 3xl:pt-6 px-4 3xl:px-6 pb-4 3xl:pb-6 flex flex-col gap-4 bg-white">
            <div className="flex items-center gap-2.5">
              <TbWorld className="text-[26px] 3xl:text-3xl text-gray-800" />
              <p className="font-medium text-xl 3xl:text-2xl">Your Refferal Link</p>
            </div>
            <ParagraphDashboard maxW="full" colorCL="text-black/80">
              Share link berikut kepada calon trader untuk mendaftar akun FXPayout trader dan dapatkan hadiah 10% dari total rebate yang diperoleh oleh tradermu.  
            </ParagraphDashboard>
            <div className="flex flex-col lg:flex-row items-center gap-2.5">
              <div className="p-4 w-full bg-[#FFFEFE] border border-[#DDDDDD] rounded-lg">
                <p className="text-base 3xl:text-xl text-nowrap truncate">
                  https://fxpayout.com/register?ref={codeRefferal}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => onCopy("url")} 
                className="p-4 flex justify-center items-center gap-2 w-full lg:w-fit rounded-lg bg-primary text-white font-medium text-nowrap cursor-pointer">
                {isCopied.url ? 
                  <FaCheck className="text-xl" /> : 
                  <>
                    <TbCopy className="rotate-90 text-xl 3xl:text-3xl" />
                    <span className="text-base 3xl:text-lg">Salin Link</span>
                  </>
                }
              </button>
            </div>
          </div>
          <div className="w-full h-2.5 bg-primary"></div>
        </div>  
        <div className="max-w-[360px] 3xl:max-w-[420px] w-full rounded-lg overflow-hidden border border-[#DDDDDD] h-fit">
          <div className="pt-5 3xl:pt-6 px-4 3xl:px-6 pb-4 3xl:pb-6 flex flex-col gap-4 bg-white">
            <div className="flex items-center gap-2.5">
              <VscKey className="text-2xl 3xl:text-3xl text-gray-800 scale-x-[-1] rotate-90" />
              <p className="font-medium text-xl 3xl:text-2xl">Unique Code</p>
            </div>
            <ParagraphDashboard maxW="full" colorCL="text-black/80">
              Trader bisa langsung memasukkan kode secara manual ketika mendaftar.
            </ParagraphDashboard>
            <div className="py-4 flex items-center justify-center w-full rounded-lg bg-[#F5F5F5] border border-primary border-dashed">
              <p className="text-[32px] font-bold">
                {codeRefferal}
              </p>
            </div>
            <button 
              type="button" 
              onClick={() => onCopy("code")} 
              className="p-4 flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-medium text-nowrap cursor-pointer">
              {isCopied.code ? 
                <FaCheck className="text-xl" /> : 
                <>
                  <TbCopy className="rotate-90 text-xl 3xl:text-3xl" />
                  <span className="text-base 3xl:text-lg">Salin Kode</span>
                </>
              }
            </button>
          </div>
          <div className="w-full h-2.5 bg-primary"></div>
        </div>  
      </div>
    </section>
  )
}

export default PreviewRefferal;

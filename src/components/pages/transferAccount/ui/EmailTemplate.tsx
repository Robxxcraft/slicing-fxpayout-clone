import Button from '@/components/ui/Button';
import { FaCheck } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { TbCopy } from 'react-icons/tb';

const EmailTemplate = ({
  onCopy, 
  isCopied, 
  onSendEmail
}: {
  onCopy: () => Promise<void>; 
  isCopied: boolean,
  onSendEmail: () => void
}) => {
  return (
    <div className="py-6 2xl:py-8 border border-[#4160FF] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
      <div className="pb-5 2xl:pb-6 px-6 2xl:px-8 border-b border-[#D0D0D0]">
        <h3 className="text-xl md:text-2xl text-my-purple font-semibold leading-[115%]">
          Template Email Transfer IB
        </h3>
      </div>
      <div className="px-6 2xl:px-8 mt-6">
        <div className="p-5 2xl:p-6 bg-my-light-blue rounded-xl">
          <div className="flex items-start gap-2 md:gap-4">
            <img src="/quotes-icon.svg" alt="Icon Quotes" 
              className="mt-1 scale-80 md:scale-90 2xl:scale-100"/>
            <p className="text-base md:text-xl 2xl:text-2xl text-black/60 whitespace-pre-line">
              Yth. Tim Support, <br /><br />                      
              Dengan ini saya memohon agar akun trading saya <b>xxxxx</b> ditempatkan di bawah <b>IB ll18ehwbyi.</b> <br /><br />

              Hormat saya, <br />
              <b>xxxxx</b>
            </p>
          </div>
          <div
            onClick={onCopy} 
            className="px-5 2xl:px-8 py-3 ml-auto flex items-center gap-2 border border-primary bg-white rounded-full w-fit hover:bg-black/2 transition-all duration-300 cursor-pointer">
            {isCopied ?
              <FaCheck /> : 
              <>
                <TbCopy className="rotate-90 text-xl 2xl:text-3xl text-primary" />
                <span className="text-base 2xl:text-xl font-medium text-primary">Copy</span>
              </>
            }
          </div>
        </div>
      </div>
      <div className="relative my-6 px-6 2xl:px-8">
        <div className="h-px w-full border border-primary border-dashed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-1/2 px-3 bg-white">
          <span className="text-base text-[#4160FF]">Selanjutnya</span>
        </div>
      </div>
      <div className="px-6 2xl:px-8 flex flex-col md:flex-row lg:flex-col xl:flex-row gap-3 justify-between items-center">
        <p className="text-lg md:text-xl 2xl:text-2xl text-black font-semibold leading-[115%]">
          Kirim ke Email:
        </p>
        <Button buttonType="button" onClick={onSendEmail} 
          iconPosition="left" icon={<IoIosMail className="text-white text-3xl" />}
          variant="primary-light" size="md" className="py-3!">
          support@fxpayout.com
        </Button>
      </div>
    </div>
  )
}

export default EmailTemplate;

import Button from '@/components/ui/Button';
import { FaCheck } from 'react-icons/fa6';
import { TbCopy } from 'react-icons/tb';
import type { TransferFormState } from '../TransferForm';
import type { BrokerStruc } from '@/utils/dataBroker/typeDetailBroker';

const EmailTemplate = ({
  onCopy, 
  isCopied, 
  onSendEmail,
  selectedBroker,
  values
}: {
  values: TransferFormState,
  onCopy: () => Promise<void>; 
  isCopied: boolean;
  selectedBroker: BrokerStruc | null;
  onSendEmail: () => void
}) => {
  const rawUsername = values.username.trim().length === 0 ? "xxxxx" : values.username.trim();
  const rawAccountNumber = values.accountNumber.trim().length === 0 ? "xxxxx" : values.accountNumber.trim();
  const rawBroker = values.broker.length === 0 ? "IB ll18ehwbyi" : values.broker;
  
  return (
    <div className="py-6 2xl:py-8 border border-[#4160FF] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
      <div className="pb-4 md:pb-6 px-4 md:px-6 2xl:px-8 border-b border-[#D0D0D0]">
        <h3 className="text-xl md:text-2xl text-my-purple font-semibold leading-[115%]">
          Template Email Transfer IB
        </h3>
      </div>
      <div className="px-4 md:px-6 2xl:px-8 mt-4 md:mt-6">
        <div className="p-4 md:p-5 2xl:p-6 bg-my-light-blue rounded-xl">
          <div className="flex items-start gap-2 md:gap-4">
            <img src="/quotes-icon.svg" alt="Icon Quotes" 
              className="mt-1 scale-70 md:scale-90 2xl:scale-100"/>
            <p className="text-base md:text-lg 2xl:text-2xl text-black/60 whitespace-pre-line">
              Yth. Tim Support {rawBroker}, <br /><br />

              Saya mengajukan permohonan pemindahan akun trading saya ke bawah IB berikut: <br />
              ID IB: {selectedBroker ? selectedBroker.id_ib : "xxxxxx"} <br />
              Link IB: {selectedBroker ? selectedBroker.websiteUrl : "xxxxxx"} <br /><br />

              Data akun saya: <br />
              Nama: {rawUsername} <br />
              Nomor Akun Trading: {rawAccountNumber} <br /><br />

              Mohon bantuan untuk proses transfer IB tersebut. <br />
              Terima kasih. <br /><br />

              Hormat saya, <br />
              {rawUsername}
            </p>
          </div>
          <div
            onClick={onCopy} 
            className="mt-3 px-5 2xl:px-8 py-3 ml-auto flex items-center justify-center gap-2 border border-primary bg-white rounded-full w-full md:w-fit hover:bg-black/2 transition-all duration-300 cursor-pointer">
            {isCopied ?
              <FaCheck className="text-primary" /> : 
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
        <p className="text-base md:text-xl 2xl:text-2xl text-black font-semibold leading-[115%]">
          Kirim ke {selectedBroker === null ? "Email" : selectedBroker.contactSupport.includes("@") ? "Email" : "WhatsApp"}:
        </p>
        <Button buttonType="button" onClick={onSendEmail} disabled={selectedBroker === null}
          variant="primary-light" size="md" className="py-3! w-full! md:w-fit! lg:w-full! xl:w-fit!">
          Contact Support
        </Button>
      </div>
    </div>
  )
}

export default EmailTemplate;

import { useState } from "react";
import CardForm from "./ui/CardForm";
import EmailTemplate from "./ui/EmailTemplate";
import TripleBadgeFlow from "@/components/ui/TripleBadgeFlow";
import { useForm } from "@/hooks/useForm";

export type TransferFormState = {
  broker: string;
  numberAccount: string;
  username: string;
}

const TransferForm = () => {
  const form = useForm<TransferFormState>({
    broker: "",
    numberAccount: "",
    username: ""
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  const handleCopyTemplate = async () => {
    const rawUsername = form.values.username.trim().length === 0 ? "xxxxx" : form.values.username.trim();
    const rawBroker = form.values.broker.length === 0 ? "IB ll18ehwbyi" : form.values.broker;
    const rawText = `Yth. Tim Support,

Dengan ini saya memohon agar akun trading saya **${rawUsername}** ditempatkan di bawah **${rawBroker}.**

Hormat saya,
**${rawUsername}**`;
    
    const fallbackCopy = (text: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
      } catch (err) {
        console.error(err);
      }
      document.body.removeChild(textArea);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) { 
        await navigator.clipboard.writeText(rawText);
        setIsCopied(true);
      } else {
        fallbackCopy(rawText);
      }

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  const handleSendEmail = () => {
    const rawUsername = form.values.username.trim().length === 0 ? "xxxxx" : form.values.username.trim();
    const rawBroker = form.values.broker.length === 0 ? "IB ll18ehwbyi" : form.values.broker;
    const recipient = "support@fxpayout.com";
    const subject = encodeURIComponent("Permohonan Pindah IB");
    const body = encodeURIComponent(`Yth. Tim Support,

Dengan ini saya memohon agar akun trading saya ${rawUsername} ditempatkan di bawah ${rawBroker}.

Hormat saya,
${rawUsername}`);

  const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;
  };

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 mt-6 lg:mt-8 2xl:mt-10">
      <div className="p-4 md:p-8 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
        <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center">
          <div className="xl:max-w-[540px]">
            <h2 className="text-xl md:text-[1.75rem] 2xl:text-[2rem] text-black font-semibold">
              Transfer Introducing Broker (IB)
            </h2>
            <p className="mt-2 w-full text-base 2xl:text-2xl font-medium text-black/60 leading-[160%]">
              Lengkapi formulir di bawah ini untuk melakukan Transfer IB ke fxpayout.
            </p>
          </div>
          <div className="flex justify-end w-full">
            <TripleBadgeFlow first="Lengkapi Formulir" second="Salin Template Email" third="Kirim Email ke fxpayout" />
          </div>
        </div>
        <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <CardForm 
            form={form.values} 
            handleChangeForm={form.handleChange} />
          <EmailTemplate 
            isCopied={isCopied}
            onCopy={handleCopyTemplate} 
            onSendEmail={handleSendEmail} />
        </div>
      </div>
    </section>
  )
}

export default TransferForm;

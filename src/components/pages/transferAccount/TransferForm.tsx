import { useEffect, useState } from "react";
import CardForm from "./ui/CardForm";
import EmailTemplate from "./ui/EmailTemplate";
import TripleBadgeFlow from "@/components/ui/TripleBadgeFlow";
import { useForm } from "@/hooks/useForm";
import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";

export type TransferFormState = {
  broker: string;
  accountNumber: string;
  username: string;
}

const TransferForm = () => {
  const form = useForm<TransferFormState>({
    broker: "",
    accountNumber: "",
    username: ""
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [stepperActive, setStepperActive] = useState<number>(0);
  const [selectedBroker, setSelectedBroker] = useState<BrokerStruc | null>(null);

  useEffect(() => {
    const isFormFilled = Object.values(form.values).every((str) => str.trim() !== "");
    
    if (isCopied && isFormFilled) {
      setStepperActive(2);
    } else if (isFormFilled && !isCopied) {
      setStepperActive(1);
    } else {
      setStepperActive(0);
    }
  }, [form.values, isCopied]);

  const handleCopyTemplate = async () => {
    const rawUsername = form.values.username.trim().length === 0 ? "xxxxx" : form.values.username.trim();
    const rawAccountNumber = form.values.accountNumber.trim().length === 0 ? "xxxxx" : form.values.accountNumber.trim();
    const rawBroker = form.values.broker.length === 0 ? "IB ll18ehwbyi" : form.values.broker;
    const rawText = `Yth. Tim Support ${rawBroker},

Saya mengajukan permohonan pemindahan akun trading saya ke bawah IB berikut:
ID IB: ${selectedBroker === null ? "xxxxxx" : selectedBroker.id_ib}
Link IB: ${selectedBroker === null ? "xxxxxx" : selectedBroker.websiteUrl}

Data akun saya:
Nama: ${rawUsername}
Nomor Akun Trading: ${rawAccountNumber}

Mohon bantuan untuk proses transfer IB tersebut.
Terima kasih.

Hormat saya,
${rawUsername}`;
    
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
    if (selectedBroker === null) return;

    const rawUsername = form.values.username.trim().length === 0 ? "xxxxx" : form.values.username.trim();
    const rawBroker = form.values.broker.length === 0 ? "IB ll18ehwbyi" : form.values.broker;
    const rawAccountNumber = form.values.accountNumber.trim().length === 0 ? "xxxxx" : form.values.accountNumber.trim();
    const recipient = selectedBroker.contactSupport;
    const subject = encodeURIComponent("Permohonan Pindah IB");
    const body = encodeURIComponent(`Yth. Tim Support ${rawBroker},

Saya mengajukan permohonan pemindahan akun trading saya ke bawah IB berikut:
ID IB: ${selectedBroker === null ? "xxxxxx" : selectedBroker.id_ib}
Link IB: ${selectedBroker === null ? "xxxxxx" : selectedBroker.websiteUrl}

Data akun saya:
Nama: ${rawUsername}
Nomor Akun Trading: ${rawAccountNumber}

Mohon bantuan untuk proses transfer IB tersebut.
Terima kasih.

Hormat saya,
${rawUsername}`);
  
  let contactUrl;
  if (recipient.includes("@")) {
    contactUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
  } else {
    contactUrl = `https://wa.me/${recipient}?text=${body}`
  }

  window.location.href = contactUrl;
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
            <TripleBadgeFlow 
              stepperActive={stepperActive}
              steps={["Lengkapi Formulir", "Salin Template Email", "Kirim Email ke fxpayout"]}
            />
          </div>
        </div>
        <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <CardForm 
            setSelectedBroker={setSelectedBroker}
            form={form.values} 
            handleChangeForm={form.handleChange} />
          <EmailTemplate 
            values={form.values}
            selectedBroker={selectedBroker}
            isCopied={isCopied}
            onCopy={handleCopyTemplate} 
            onSendEmail={handleSendEmail} />
        </div>
      </div>
    </section>
  )
}

export default TransferForm;

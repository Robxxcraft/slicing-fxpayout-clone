import { useState } from "react";
import CardForm from "./ui/CardForm";
import EmailTemplate from "./ui/EmailTemplate";
import TripleBadgeFlow from "@/components/ui/TripleBadgeFlow";
import { useForm } from "@/hooks/useForm";
import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";
import { useTranslation } from "react-i18next";

export type TransferFormState = {
  broker: string;
  accountNumber: string;
  username: string;
  email: string;
}

const TransferForm = () => {
  const { t } = useTranslation(["transferpage"]);
  const form = useForm<TransferFormState>({
    broker: "",
    accountNumber: "",
    username: "",
    email: ""
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [selectedBroker, setSelectedBroker] = useState<BrokerStruc | null>(null);
  const keyTemplateEmail = "transferpage:card.emailTemplate.template";

  const handleCopyTemplate = async () => {
    const rawUsername = form.values.username.trim().length === 0 ? "xxxxx" : form.values.username.trim();
    const rawAccountNumber = form.values.accountNumber.trim().length === 0 ? "xxxxx" : form.values.accountNumber.trim();
    const rawEmail = form.values.email.trim().length === 0 ? "xxxxx" : form.values.email.trim();
    const rawBroker = form.values.broker.length === 0 ? "IB ll18ehwbyi" : form.values.broker;
    const rawText = `
${t(`${keyTemplateEmail}.greeting`)} ${rawBroker},

${t(`${keyTemplateEmail}.intro`)}
${t(`${keyTemplateEmail}.ibId`)} ${selectedBroker === null ? "xxxxxx" : selectedBroker.id_ib}
${t(`${keyTemplateEmail}.ibLink`)} ${selectedBroker === null ? "xxxxxx" : selectedBroker.websiteUrl}

${t(`${keyTemplateEmail}.accountData`)}
${t(`${keyTemplateEmail}.name`)} ${rawUsername}
Email: ${rawEmail}
${t(`${keyTemplateEmail}.tradingAccount`)} ${rawAccountNumber}

${t(`${keyTemplateEmail}.closing`)}

${t(`${keyTemplateEmail}.regards`)}
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
    const rawEmail = form.values.email.trim().length === 0 ? "xxxxx" : form.values.email.trim();
    const recipient = selectedBroker.contactSupport;
    const subject = encodeURIComponent(t(`${keyTemplateEmail}.subject`));

    const body = encodeURIComponent(`
${t(`${keyTemplateEmail}.greeting`)} ${rawBroker},

${t(`${keyTemplateEmail}.intro`)}
${t(`${keyTemplateEmail}.ibId`)} ${selectedBroker === null ? "xxxxxx" : selectedBroker.id_ib}
${t(`${keyTemplateEmail}.ibLink`)} ${selectedBroker === null ? "xxxxxx" : selectedBroker.websiteUrl}

${t(`${keyTemplateEmail}.accountData`)}
${t(`${keyTemplateEmail}.name`)} ${rawUsername}
Email: ${rawEmail}
${t(`${keyTemplateEmail}.tradingAccount`)} ${rawAccountNumber}

${t(`${keyTemplateEmail}.closing`)}

${t(`${keyTemplateEmail}.regards`)}
${rawUsername}`);
  
  let contactUrl;
  if (recipient.includes("@")) {
    contactUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
  } else {
    contactUrl = `https://wa.me/${recipient}?text=${body}`
  }

  window.location.href = contactUrl;
  };

  const isFormFilled = Object.values(form.values).every((str) => str.trim() !== "");
  const stepperActive = isCopied && isFormFilled ? 2 : isFormFilled ? 1 : 0;

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 mt-6 lg:mt-8 2xl:mt-10">
      <div className="p-4 md:p-8 border border-[#D0D0D0] rounded-3xl shadow-[0_5px_30px_0_rgba(25,33,61,0.06)]">
        <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center">
          <div className="xl:max-w-[540px]">
            <h2 className="text-xl md:text-[1.75rem] 2xl:text-[2rem] text-black font-semibold">
              {t("transferpage:card.title")}
            </h2>
            <p className="mt-2 w-full text-base 2xl:text-2xl font-medium text-black/60 leading-[160%]">
              {t("transferpage:card.paragraph")}
            </p>
          </div>
          <div className="flex justify-end w-full">
            <TripleBadgeFlow 
              stepperActive={stepperActive}
              steps={[t("transferpage:card.steps.0"), t("transferpage:card.steps.1"), t("transferpage:card.steps.2")]}
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

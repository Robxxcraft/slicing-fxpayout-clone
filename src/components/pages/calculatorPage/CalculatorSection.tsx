import Button from "@/components/ui/Button";
import MaskSvg from "@/components/ui/MaskSvg";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { formattedUsd, scrollToErrorInput } from "@/helper/formHelper";
import { checkValidCalculator } from "@/helper/validationForm/calculatorValidation";
import { useForm } from "@/hooks/useForm";
import type { FormState, RebateResult } from "@/types/calculator.type";
import { brokers } from "@/utils/dataBroker/brokers";
import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";
import { supportPairs } from "@/utils/pairs";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { TiInfoLarge } from "react-icons/ti";

const CalculatorSection = () => {
  const { t } = useTranslation(["common", "calculatorpage"]);
  const form = useForm<FormState>({
    broker: "",
    accountType: "",
    pair: "",
    lots: ""
  });
  const [selectedBroker, setSelectedBroker] = useState<BrokerStruc>();
  const [rebateResult, setRebateResult] = useState<RebateResult>({
    estimate: 0.0,
    rebatesPerLot: 0.0
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const allBrokers = Object.values(brokers).sort((a, b) => a.name.localeCompare(b.name));

  const handleBrokerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    form.handleChange(e);

    const broker = allBrokers.find((broker) => broker.name === value);
    if (broker) {
      setSelectedBroker(broker);
      form.setSpecificValue(
        "accountType",
        broker.rebateRates[0]?.accountType ?? ""
      );
      form.setSpecificValue(
        "pair",
        broker.rebateRates[0]?.pair ?? ""
      );
    }
  }

  const handleCalculation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { isValidate, errorInput } = form.validate(checkValidCalculator);
    if (!isValidate && errorInput !== null) {
      if (errorInput) scrollToErrorInput(errorInput);
      setIsLoading(false);
      return;
    }

    if (selectedBroker === undefined) {
      setIsLoading(false);
      return;
    }
    const rebateEst = selectedBroker.rebateRates.filter(
      (rate) => rate.accountType === form.values.accountType 
      && rate.pair === form.values.pair)[0];
    setRebateResult({
      estimate: rebateEst.rebatePerLot * Number(form.values.lots),
      rebatesPerLot: rebateEst.rebatePerLot,
    });
    setIsLoading(false);
  }

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 3xl:px-56 mt-6 lg:mt-8 3xl:mt-10">
      <div className="relative px-4 md:px-8 xl:px-10 py-8 bg-my-light-blue border border-primary rounded-[20px] overflow-hidden">
        <img src="/big-fxpayout.png" alt="big-payout" 
          className="absolute -bottom-16 -right-16 -rotate-13 opacity-10 pointer-events-none"/>

        <div className="flex justify-center items-center gap-3">
          <MaskSvg 
            icon={"/kalkulator-icon.svg"} 
            label={"Icon Kalkulator"} 
            className={"size-6 md:size-8"} 
            color={"bg-linear-to-br from-primary to-dark-primary"} />

          <h2 className="text-xl md:text-[28px] 3xl:text-[32px] text-my-dark-purple font-semibold">
            {t("calculatorpage:card.title")}
          </h2>
        </div>
        <p className="mt-2 w-full text-base xl:text-lg 3xl:text-xl font-medium text-black/50 text-center leading-[178%]">
          {t("calculatorpage:card.paragraph")}
        </p>
        <form onSubmit={handleCalculation} >
          <div className="my-6 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectInput 
              id="broker" 
              label={t("calculatorpage:card.broker")} 
              icon="/bank-icon.svg" 
              altIcon="Icon broker" 
              defaultValue={`<${t("text.select")}>`} 
              value={form.values.broker} 
              onChangeForm={handleBrokerChange} 
              optionData={allBrokers.map((broker) => broker.name)}
              errorMessage={form.errors.broker && t(form.errors.broker)}
              required />
            <SelectInput 
              id="accountType" 
              label={t("calculatorpage:card.accountType")}
              icon="/view-grid-icon.svg" 
              altIcon="Icon Account Type" 
              defaultValue={form.values.broker.trim().length === 0 ? 
                `<${t("calculatorpage:card.accountTypePlaceholder")}>` : `<${t("text.select")}>`} 
              value={form.values.accountType} 
              onChangeForm={form.handleChange} 
              optionData={selectedBroker === undefined ? [] 
                : Array.from(new Set(selectedBroker.rebateRates.map((rebate) => rebate.accountType)))}
              errorMessage={form.errors.accountType && t(form.errors.accountType)}
              disabled={form.values.broker.trim().length === 0}
              required />
            <SelectInput 
              id="pair" 
              label={t("calculatorpage:card.pair")}
              icon="/sync-icon.svg" 
              altIcon="Icon Pair" 
              defaultValue={form.values.broker.trim().length === 0 ? 
                `<${t("calculatorpage:card.accountTypePlaceholder")}>` : `<${t("text.select")}>`} 
              value={form.values.pair} 
              onChangeForm={form.handleChange} 
              optionData={selectedBroker === undefined ? [] 
                : Array.from(new Set(
                  selectedBroker.rebateRates.map((rebate) => rebate.pair)
                  .filter((reb) => supportPairs.includes(reb))))}
              errorMessage={form.errors.pair && t(form.errors.pair)}
              disabled={form.values.broker.trim().length === 0}
              required />
            <TextInput 
              id="lots"
              label={t("calculatorpage:card.lots")}
              icon="/balance-sell-icon.svg"
              altIcon="Icon Balance" 
              placeholder={t("calculatorpage:card.pairPlaceholder")}
              value={form.values.lots} 
              onChangeForm={form.handleChange} 
              typeInput={"number"}
              errorMessage={form.errors.lots && t(form.errors.lots)}
              required />
          </div>
          <div className="text-center">
            <Button 
              disabled={isLoading} 
              buttonType="submit" 
              variant="primary-light" 
              className="py-4! 3xl:py-5! md:text-[20px]! 3xl:text-[24px]! font-medium! w-full md:w-[540px]!"
            >
              {t("calculatorpage:card.button")}
            </Button>
          </div>
        </form>
        <div className="mt-6 md:mt-8 flex flex-nowrap justify-center items-stretch w-full">
          <div className="primary-scrollbar pe-4 md:pe-8 w-1/2 border-e border-[#334BBB]">
            <div className="ms-auto flex flex-col justify-between w-full text-center">
              <p className="text-base font-medium text-my-dark-purple/80">
                {t("calculatorpage:card.estimatesRebates")}
              </p>
              <div className="overflow-x-auto w-full">
                <p className="min-w-max shrink-0 whitespace-nowrap text-[2rem] md:text-[3rem] 3xl:text-[64px] font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  USD {formattedUsd(Number(rebateResult.estimate)).replace("$", "")}
                </p>
              </div>
            </div>
          </div>
          <div className="primary-scrollbar ps-4 md:ps-8 w-1/2">
            <div className="flex flex-col justify-between w-full text-center">
              <p className="text-base font-medium text-my-dark-purple/80">
                {t("calculatorpage:card.rebatePerLot")}
              </p>
              <div className="overflow-x-auto w-full">
                <p className="min-w-max shrink-0 whitespace-nowrap text-[2rem] md:text-[3rem] 3xl:text-[64px] font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
                  USD {formattedUsd(Number(rebateResult.rebatesPerLot)).replace("$", "")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-px bg-[#334BBB]/20"></div>
        <div className="p-3 flex items-center gap-3 border border-primary border-dashed rounded-[10px]">
          <span className="mt-2 flex shrink-0 items-center justify-center size-7 md:size-10 3xl:size-12 border border-primary rounded-full">
            <TiInfoLarge className="text-xl md:text-[1.5rem] 3xl:text-[2rem] text-primary" />
          </span>
          <p className="w-fit text-[0.75rem] md:text-base 3xl:text-xl font-medium text-black/80 leading-[178%]">
            <Trans i18nKey="calculatorpage:card.info">
              <strong />
            </Trans>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;

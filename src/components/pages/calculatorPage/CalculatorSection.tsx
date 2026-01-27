import Button from "@/components/ui/Button";
import MaskSvg from "@/components/ui/MaskSvg";
import SelectInput from "@/components/ui/SelectInput";
import TextInput from "@/components/ui/TextInput";
import { useForm } from "@/hooks/useForm";
import { brokers } from "@/utils/dataBroker/brokers";
import { supportPairs } from "@/utils/pairs";
import { TiInfoLarge } from "react-icons/ti";

type FormState = {
  broker: string;
  accountType: string;
  pair: string;
  lots: string;
}

const CalculatorSection = () => {
  const form = useForm<FormState>({
    broker: "",
    accountType: "",
    pair: "",
    lots: ""
  });
  const allBrokers = Object.values(brokers);

  return (
    <section className="px-6 md:px-11 lg:px-18 xl:px-24 2xl:px-56 mt-6 lg:mt-8 2xl:mt-10">
      <div className="relative px-5 md:px-10 py-8 bg-my-light-blue border border-primary rounded-[20px] overflow-hidden">
        <img src="/big-fxpayout.png" alt="big-payout" 
          className="absolute -bottom-16 -right-16 -rotate-13 opacity-10"/>

        <div className="flex justify-center items-center gap-3">
          <MaskSvg 
            icon={"/kalkulator-icon.svg"} 
            label={"Icon Kalkulator"} 
            className={"size-8"} 
            color={"bg-linear-to-br from-primary to-dark-primary"} />

          <h2 className="text-2xl md:text-[28px] 2xl:text-[32px] text-my-dark-purple font-semibold">
            Kalkulator Estimate Rebate
          </h2>
        </div>
        <p className="mt-2 w-full text-base xl:text-lg 2xl:text-xl font-medium text-black/50 text-center">
          Pilih broker dan masukkan detail trading Anda untuk melihat estimasi rebate secara instan.
        </p>
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput 
            id="broker" 
            label="Broker" 
            icon="bank-icon.svg" 
            altIcon="Icon broker" 
            defaultValue="&lt;Pilih&gt;" 
            value={form.values.broker} 
            onChangeForm={form.handleChange} 
            optionData={allBrokers.map((broker) => broker.name)} />
          <SelectInput 
            id="accountType" 
            label="Account Type" 
            icon="view-grid-icon.svg" 
            altIcon="Icon Account Type" 
            defaultValue="&lt;Pilih&gt;" 
            value={form.values.accountType} 
            onChangeForm={form.handleChange} 
            optionData={[]} />
          <SelectInput 
            id="pair" 
            label="Pair / Instrumen Trading" 
            icon="sync-icon.svg" 
            altIcon="Icon Pair" 
            defaultValue="&lt;Pilih&gt;" 
            value={form.values.pair} 
            onChangeForm={form.handleChange} 
            optionData={supportPairs} />
          <TextInput 
            id="lots"
            label="Lots" 
            icon="/balance-sell-icon.svg"
            altIcon="Icon Balance" 
            placeholder="Masukkan Lot"
            value={form.values.lots} 
            onChangeForm={form.handleChange} 
            typeInput={"number"} />
        </div>
        <div className="text-center">
          <Button variant="primary-light" className="py-4! 2xl:py-5! text-[20px]! 2xl:text-[24px]! font-medium! w-full md:w-[540px]!">
            Hitung Estimasi Rebate
          </Button>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-5 md:gap-8">
          <div className="text-center">
            <p className="text-base font-medium text-my-dark-purple/80">Estimates Rebates</p>
            <p className="text-[56px] 2xl:text-[64px] leading-[77px] font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              USD 0.00
            </p>
          </div>
          <div className="h-px md:h-[100px] w-full md:w-px bg-[#334BBB]"/>
          <div className="text-center">
            <p className="text-base font-medium text-my-dark-purple/80">Rebates per Lot</p>
            <p className="text-[56px] 2xl:text-[64px] leading-[77px] font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              USD 0.00
            </p>
          </div>
        </div>
        <div className="mt-8 p-3 flex gap-3 border border-primary border-dashed rounded-[10px]">
          <span className="mt-2 flex shrink-0 items-center justify-center size-10 2xl:size-12 border border-primary rounded-full">
            <TiInfoLarge className="text-[24px] 2xl:text-[32px] text-primary" />
          </span>
          <p className="w-fit text-base 2xl:text-xl font-medium text-black/80 leading-[178%]">
            <b>fxpayout</b> mengembalikan hingga 90% komisi IB kepada trader. Proses rebate dilakukan secara otomatis, aman, dan transparan tanpa mengubah spread, leverage, maupun kondisi trading Anda.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;

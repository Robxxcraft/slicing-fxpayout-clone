import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";
import Button from "../ui/Button";
import { TiInfoLarge } from "react-icons/ti";

const BrokerItem = ({ item }: { item: BrokerStruc }) => {
  let estimateEur;
  let estimateXau;
  let estimateAud;
  const rebateProgram = item.rebateProgram;
  const isRebateProgramText = typeof rebateProgram === "string";
  
  if (!isRebateProgramText) {
    estimateEur = typeof rebateProgram[0].estimate === "number" ?
      `${rebateProgram[0].estimate}` : `${rebateProgram[0].estimate.max}`;
    estimateXau = typeof rebateProgram[1].estimate === "number" ?
      `${rebateProgram[1].estimate}` : `${rebateProgram[1].estimate.max}`;
    estimateAud = typeof rebateProgram[2].estimate === "number" ?
      `${rebateProgram[2].estimate}` : `${rebateProgram[2].estimate.max}`;
  }

  return (
    <div className="p-6 flex flex-col justify-between w-full border border-[rgba(34,34,34,0.1)] rounded-3xl shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)]">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={`/broker/${item.profileImage}`}
              alt={item.name}
              className="size-16 rounded-full object-cover object-center"
            />
            <h4 className="text-xl md:text-2xl font-semibold text-[#222222]">
              {item.name}
            </h4>
          </div>
          <Button variant="primary-light" size="md" className="py-3! text-sm! 2xl:text-base! font-medium!">
            Pilih
          </Button>
        </div>
        <p className="mt-2 text-[#222222] leading-[160%]">{item.cardDescription}</p>
        <div className="my-3 lg:my-4 h-[0.5px] w-full bg-[rgba(0,0,0,0.2)]"></div>
        {isRebateProgramText ? 
          <div className="flex gap-2 h-fit">
            <span className="flex items-center justify-center size-6 border border-primary rounded-full">
              <TiInfoLarge className="text-sm text-primary" />
            </span>
            <p className="w-fit text-justify">{rebateProgram}</p>
          </div>
        :
          <div>
            <p className="text-sm font-semibold text-[#222222]">
              Rebate per Instrumen
            </p>
            <table className="table-fixed mt-3 border-collapse text-[#222222] w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2 font-semibold border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    Instrumen
                  </th>
                  <th className="py-2 font-semibold border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    Rebate
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    EUR/USD
                  </td>
                  <td className="font-semibold text-black py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    ${estimateEur}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    XAU/USD
                  </td>
                  <td className="font-semibold text-black py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    ${estimateXau}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    AUD/USD
                  </td>
                  <td className="font-semibold text-black py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                    ${estimateAud}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
      <div className="mt-4 md:mt-7 flex flex-row items-center gap-2 flex-wrap md:flex-nowrap">
        <Button buttonType="link" urlTo={item.registerUrl} target="_blank" variant="primary-light" size="md" className="px-0! text-sm! 2xl:text-base! font-medium! w-full!">
          Daftar Broker
        </Button>
        <Button buttonType="link" urlTo={`/broker/${item.detailUrl}#`} variant="outline" size="md" className="px-0! text-sm! 2xl:text-base! font-medium! w-full!">
          Selengkapnya
        </Button>
      </div>
    </div>
  );
};

export default BrokerItem;

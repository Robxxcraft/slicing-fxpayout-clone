import type { BrokerStruc } from "@/utils/dataBroker/typeDetailBroker";
import Button from "../ui/Button";
import { TiInfoLarge } from "react-icons/ti";

const BrokerItem = ({ item }: { item: BrokerStruc }) => {
  const rebateProgram = item.rebateProgram;
  const isRebateProgramText = typeof rebateProgram === "string";
  
  const getEstimateValue = (estimate: number | {
    min: number;
    max: number;
  }) => {
    return typeof estimate === "number" ?
      `${estimate}` : `${estimate.max}`
  }

  return (
    <div className="p-6 flex flex-col justify-between w-full border border-[rgba(34,34,34,0.1)] rounded-3xl shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)]">
      <div>
        <div className="flex items-center gap-2 justify-between">
          <div className="w-fit flex items-center gap-2 md:gap-4 wrap-break-word">
            <img
              src={`/broker/${item.profileImage}`}
              alt={item.name}
              className="size-14 md:size-16 rounded-full object-cover object-center"
            />
            <h2 className="text-xl md:text-2xl font-semibold text-[#222222] break-all">
              {item.name}
            </h2>
          </div>
          <div className="px-2 2xl:px-4 py-3 text-sm 2xl:text-base font-medium bg-linear-to-t from-dark-primary to-primary text-white border-white h-fit rounded-full border inline-flex items-center justify-center gap-3 text-nowrap">
            {item.statusRebate} Rebate
          </div>
        </div>
        <p className="mt-2 text-[#222222] leading-[160%]">{item.badges.join(", ")}</p>
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
                {item.rebateProgram.slice(0, 3).map((rebate, idx) => (
                  <tr key={idx}>
                    <td className="py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                      {rebate.pair}
                    </td>
                    <td className="font-semibold text-black py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                      ${getEstimateValue(rebate.estimate)}
                    </td>
                  </tr>
                ))}
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

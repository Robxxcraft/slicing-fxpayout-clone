import type { BrokerPartner } from "../../utils/brokerPartner";
import Button from "../ui/Button";

const BrokerItem = ({ item }: { item: BrokerPartner }) => {
  return (
    <div className="p-6 w-full border border-[rgba(34,34,34,0.1)] rounded-3xl shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`/broker/${item.image_profil}`}
            alt={item.username}
            className="size-16 rounded-full object-cover object-center"
          />
          <h4 className="text-xl md:text-2xl font-semibold text-[#222222]">
            {item.username}
          </h4>
        </div>
        <Button variant="primary-light" size="md" className="py-3! text-sm! 2xl:text-base! font-medium!">
          Pilih
        </Button>
      </div>
      <p className="mt-2 text-[#222222] leading-[160%]">{item.description}</p>
      <div className="my-3 lg:my-4 h-[0.5px] w-full bg-[rgba(0,0,0,0.2)]"></div>
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
                ${item.instruments.eur}
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                XAU/USD
              </td>
              <td className="font-semibold text-black py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                ${item.instruments.xau}
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                AUD/USD
              </td>
              <td className="font-semibold text-black py-2 border-b-[0.5px] border-[rgba(0,0,0,0.2)]">
                ${item.instruments.aud}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 md:mt-7 flex flex-row items-center gap-2 flex-wrap md:flex-nowrap">
        <Button variant="primary-light" size="md" className="px-0! text-sm! 2xl:text-base! font-medium! w-full!">
          Daftar Broker
        </Button>
        <Button buttonType="link" urlTo={`/broker/${item.url}`} variant="outline" size="md" className="px-0! text-sm! 2xl:text-base! font-medium! w-full!">
          Selengkapnya
        </Button>
      </div>
    </div>
  );
};

export default BrokerItem;

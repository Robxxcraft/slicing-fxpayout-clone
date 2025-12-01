import type { BrokerPartner } from "../../utils/brokerPartner";

const BrokerItem = ({ item }: { item: BrokerPartner }) => {
  return (
    <div className="p-6 w-full border border-[rgba(34,34,34,0.1)] rounded-3xl shadow-[0_4px_41.8px_0_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 2xl:gap-4">
          <img
            src={`/broker/${item.image_profil}`}
            alt={item.username}
            className="size-14 2xl:size-16"
          />
          <h4 className="text-xl 2xl:text-2xl font-semibold text-[#222222]">
            {item.username}
          </h4>
        </div>
        <button className="px-6 2xl:px-8 py-3 bg-linear-to-t from-dark-primary to-primary font-medium text-white rounded-full cursor-pointer">
          Pilih
        </button>
      </div>
      <p className="mt-2 text-[#222222] leading-[160%]">{item.description}</p>
      <div className="my-4 h-[0.5px] w-full bg-[rgba(0,0,0,0.2)]"></div>
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
      <div className="mt-7 flex items-center gap-2">
        <button className="py-4 w-full  bg-linear-to-t from-dark-primary to-primary border border-white text-white rounded-full cursor-pointer">
          Daftar Broker
        </button>
        <button className="py-4 w-full  border border-black text-black rounded-full cursor-pointer">
          Link Broker
        </button>
      </div>
    </div>
  );
};

export default BrokerItem;

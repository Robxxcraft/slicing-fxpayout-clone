import { IoIosAdd } from "react-icons/io";
import { getLocalizedPath } from "@/helper/pathHelper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { BrokerUser } from "@/types/broker.type";
import TinyButton from "../../common/TinyButton";
import CardBroker from "./CardBroker";

const BrokerOverview = ({
  initLoad, brokersUser
}: {
  initLoad: boolean;
  brokersUser: BrokerUser[];
}) => {
  const { i18n } = useTranslation();
  return (
    <section className="mt-7 2xl:mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
        <div>
          <h2 className="text-xl 2xl:text-[2rem] font-semibold">
            Connected Broker
          </h2>
          <p className="text-base 2xl:text-xl text-black/80 md:max-w-[760px] leading-[169.2%]">
            Daftar seluruh broker yang terkoneksi dengan akun Anda dan pantau status koneksi dan perolehan komisi rebate Anda.
          </p>
        </div>
        <TinyButton 
          buttonType="link" 
          icon={<IoIosAdd className="text-2xl 2xl:text-3xl" />} 
          iconPosition="left"
          urlTo={getLocalizedPath("trader/broker/connect", i18n.language)}
        >
          Tambah Broker
        </TinyButton>
      </div>
      <div className="mt-4 2xl:mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-5">
        {initLoad ?
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="w-full rounded-lg overflow-hidden border border-[#DDDDDD]">
              <div className="px-4 lg:px-6 pt-4 lg:pt-6 pb-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 size-10 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-col gap-3">
                    <div className="h-2 w-60 bg-gray-300 rounded-full"></div>
                    <div className="h-2 w-60 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="h-2 w-32 bg-gray-300 rounded-full"></div>
                  <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="h-2 w-[80%] bg-gray-300 rounded-full"></div>
                  <div className="h-2 w-[20%] bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))
        :
        brokersUser.length > 0 ? 
          brokersUser.map((item, idx) => (
            <CardBroker 
              key={idx} 
              name={item.name} 
              accountNumber={item.accountNumber} 
              totalRebate={item.totalRebate}
              status={item.status}              
            />
          ))
        : 
          <div className="mt-4 2xl:mt-5 col-span-1 md:col-span-2 xl:col-span-3">
            <p className="text-base 2xl:text-xl text-center text-black/80">Belum ditemukan data broker yang terhubung. {" "}
              <Link to={getLocalizedPath("trader/broker/connect", i18n.language)}
                className="text-primary underline"
              >Hubungkan broker.</Link>
            </p>
          </div>
        }
      </div>
    </section>
  )
}

export default BrokerOverview;

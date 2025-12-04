import type { Dispatch, SetStateAction } from "react";
import { TiInfoLarge } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const NotifyBroker = ({
  setShowNotify,
}: {
  setShowNotify: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="px-5 xl:px-24 2xl:px-56 pt-10">
      <div className="p-4 md:p-6 bg-my-light-blue border border-primary rounded-[10px]">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 md:gap-3">
            <span className="flex items-center justify-center size-7 md:size-9 border border-primary rounded-full">
              <TiInfoLarge className="text-base md:text-[20px] text-primary" />
            </span>
            <div className="w-fit">
              <p className="text-base md:text-lg 2xl:text-xl font-semibold text-[rgba(0,0,0,0.8)]">
                Transparansi Rebate
              </p>
              <p className="mt-1 text-sm md:text-base font-medium text-[rgba(0,0,0,0.6)]">
                Kami menyimpan riwayat komisi & rebate yang dapat diaudit oleh
                pengguna. (Demo: data disimpan di browser).
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowNotify(false)}
            className="cursor-pointer">
            <IoClose className="text-[#FF9C94] text-xl md:text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotifyBroker;

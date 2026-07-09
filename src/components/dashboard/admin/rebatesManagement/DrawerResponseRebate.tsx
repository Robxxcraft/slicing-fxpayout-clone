import DrawerContainer from "@/components/ui/DrawerContainer";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseOutline, IoWarning } from "react-icons/io5";
import TableReviewErrorImport from "../importRebatePage/TableReviewErrorImport";
import type { ResponseChangeStatusRebate } from "@/types/rebate.type";
import type { SetStatusType } from "@/types/status.type";

interface DrawerResponseRebateProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
  response: ResponseChangeStatusRebate;
  status: SetStatusType | null;
}

const DrawerResponseRebate = ({
  isOpen,
  onCloseDrawer,
  response,
  status
}: DrawerResponseRebateProps) => {
  const formatDetailError = response.detailFailed.map(({ id, error }) => ({ row: id, message: error }));

  return (
    <DrawerContainer 
      isOpen={isOpen} 
      onClose={onCloseDrawer}
      maxWCL="max-w-[700px]"
    >
      <div className="primary-scrollbar border-t border-s border-[#D2CEE1] bg-white overflow-y-auto h-screen">
        <div className="px-5 py-3 h-[calc(100%-64px)] overflow-y-auto overflow-x-hidden">
          {/* HEADER */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <h2 className="text-xl 3xl:text-2xl font-semibold">
                Change Status Rebate Result
              </h2>
              <div
                onClick={onCloseDrawer} 
                className="p-2 aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
                <IoCloseOutline 
                  className="text-2xl 3xl:text-3xl" />
              </div>
            </div>
            {status &&
              <p className="mt-1 text-black/60 text-base 3xl:text-xl leading-[160%]">
                Status: {status === "approved" ? "Approved" : "Rejected"} 
              </p>
            }
          </div>

          {/* DETAIL */}
          <div className="mt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="p-5 flex justify-between items-center w-full rounded-2xl border border-[#DDDDDD]">
                <div>
                  <p className="font-medium text-[28px]">
                    {response.successCount}
                  </p>
                  <p className="text-base 3xl:text-xl font-medium">
                    Success
                  </p>
                </div>
                <div className={`shrink-0 size-14 flex items-center justify-center border rounded-lg bg-[#E3FFE8] border-[#18BD36]
                `}>
                  <FaCircleCheck className="text-[#18BD36] text-2xl" />
                </div>
              </div>
              <div className="p-5 flex justify-between items-center w-full rounded-2xl border border-[#DDDDDD]">
                <div>
                  <p className="font-medium text-[28px]">
                    {response.failedCount}
                  </p>
                  <p className="text-base 3xl:text-xl font-medium">
                    Error
                  </p>
                </div>
                <div className={`shrink-0 size-14 flex items-center justify-center border rounded-lg bg-[#FF9292]/40 border-[#DF1E1E]
                `}>
                  <IoWarning className="text-[#DF1E1E] text-2xl" />
                </div>
              </div>
            </div>
            <p className="mt-2 text-black text-base 3xl:text-xl leading-[160%]">
              {response.message} 
            </p>
          </div>
          
          {formatDetailError.length > 0 &&
            <div className="mt-6 w-full rounded-2xl bg-white">
              <div className="flex items-center gap-4">
                <IoWarning className="text-[#DF1E1E] text-2xl" />
                <p className="text-lg 3xl:text-xl font-medium">
                  Failed Rebates
                </p>
              </div>
              <TableReviewErrorImport 
                nameKey="ID"
                detailError={formatDetailError}
              />
            </div>
          }
        </div>
      </div>
    </DrawerContainer>
  )
}

export default DrawerResponseRebate;

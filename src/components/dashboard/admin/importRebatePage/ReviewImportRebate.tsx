import { FaCircleCheck } from "react-icons/fa6";
import PreviewFileXlsx from "../common/PreviewFileXlsx";
import { IoWarning } from "react-icons/io5";
import TableReviewErrorImport from "./TableReviewErrorImport";
import type { StatusImport } from "@/utils/adminUnit";

type ReviewImportRebateProps = {
  file: File;
  statusImport: StatusImport;
  totalData: number;
  countError: number;
  detailError: {
    row: number;
    message: string;
  }[]
};

const ReviewImportRebate = ({
  file,
  statusImport,
  totalData,
  countError,
  detailError
}: ReviewImportRebateProps) => {
  return (
    <div className="w-full">
      <div className="px-4 md:px-5 py-6 w-full rounded-2xl bg-white">
        {file &&
          <PreviewFileXlsx 
            filname={file.name}
            size={file.size} 
            canDelete={false}
          />
        }

        <div className="mt-6 flex gap-4">
          <div className="p-5 flex justify-between w-full rounded-2xl border border-[#DDDDDD]">
            <div>
              <p className="font-medium text-[28px]">
                {statusImport === "SUCCESS" ? totalData:""}
                {statusImport === "ERROR" ? countError:""}
              </p>
              <p className="text-base 2xl:text-xl font-medium">
                {statusImport === "SUCCESS" ? "Success":""}
                {statusImport === "ERROR" ? "Error":""}
              </p>
            </div>
            <div className={`shrink-0 aspect-square flex items-center justify-center  border rounded-lg
              ${statusImport === "SUCCESS" ? "bg-[#E3FFE8] border-[#18BD36]":""}  
              ${statusImport === "ERROR" ? "bg-[#FF9292]/40 border-[#DF1E1E]":""}  
            `}>
              {statusImport === "SUCCESS" && <FaCircleCheck className="text-[#18BD36] text-2xl" />}
              {statusImport === "ERROR" && <IoWarning className="text-[#DF1E1E] text-2xl" />}
            </div>
          </div>
        </div>

        <p className="mt-6 text-lg 2xl:text-xl">
          {statusImport === "SUCCESS" &&
            "Seluruh data berhasil diimpor. Silakan tinjau dan verifikasi data rebate agar dapat segera diterima oleh pengguna."
          }
          {statusImport === "ERROR" &&
            "Sistem menemukan kesalahan data pada file. Seluruh data gagal diimport. Silakan periksa kembali dokumen Anda dan lakukan unggah ulang."
          }
        </p>
      </div>
      {statusImport === "ERROR" &&
        <div className="mt-6 px-4 md:px-5 py-6 w-full rounded-2xl bg-white">
          <div className="flex items-center gap-4">
            <IoWarning className="text-[#DF1E1E] text-2xl" />
            <p className="text-lg 2xl:text-xl font-medium">
              ERROR IMPORT
            </p>
          </div>
          <TableReviewErrorImport 
            detailError={detailError}
          />
        </div>
      }
    </div>
  )
}

export default ReviewImportRebate;

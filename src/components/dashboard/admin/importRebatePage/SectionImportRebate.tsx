import DropzoneFile from "@/components/dashboard/common/DropzoneFile";
import { LuDownload } from "react-icons/lu";
import PreviewFileXlsx from "../common/PreviewFileXlsx";
import { brokersName } from "@/constants/brokersName";

const SectionImportRebate = ({
  onDrop, 
  errorImport,
  onDeleteFile,
  file
}: {
  onDrop: (acceptedFiles: File[]) => void; 
  errorImport: string;
  onDeleteFile: () => void;
  file: File | null;
}) => {
  const clauses = [
    `Kolom Broker wajib berisi ${brokersName.join(", ")}. `,
    "Format total rebate dalam USD 2 digit dibelakang koma.",
    "Tanggal ditulis dalam format YYYY-MM-DD.",
    "Pastikan tidak ada data yang duplikat."
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="shrink-0 px-4 md:px-5 py-6 w-full lg:w-[35%] h-fit rounded-2xl bg-white">
        <p className="mb-6 font-medium text-lg">
          Ketentuan Pengisian Data
        </p>
        <div className="space-y-4">
          {clauses.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <img src="/brokerDetail/check-gradient.png" alt="Check Icon" 
                className="size-5"
              />
              <p className="text-base 2xl:text-xl font-medium text-black/80">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-6 w-full lg:w-[65%] rounded-2xl bg-white">
        <div className="pb-5 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#DDDDDD]">
          <p className="text-base 2xl:text-xl">
            Gunakan template untuk menghindari kesalahan format.
          </p>
          <a 
            download="Template_Data_Rebate.xlsx"
            href="/file/template-rebate.xlsx" 
            className="shrink-0 px-4 py-3 flex items-center gap-2 border border-primary rounded-full hover:bg-[#F5F5F5] cursor-pointer transition-all duration-300"
          >
            <LuDownload className="text-xl text-primary" />
            <span className="text-base 2xl:text-xl text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text whitespace-nowrap">
              Download Template
            </span>
          </a>
        </div>
        <div className="pt-5">
          {!file ?
            <DropzoneFile 
              onDrop={onDrop} 
              errorImport={errorImport} 
              maxSizeMb={10}
            />
          :
            <PreviewFileXlsx 
              filname={file.name}
              size={file.size}
              onDeleteFile={onDeleteFile}
              canDelete
            />
          }
        </div>
      </div>
    </div>
  )
}

export default SectionImportRebate;

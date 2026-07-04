import type { ImportRebateData } from "@/types/importRebate.type";
import PreviewFileXlsx from "../common/PreviewFileXlsx";
import TablePreviewDataImport from "./TablePreviewDataImport";

const PreviewImportRebate = ({
  file,
  data,
}: {
  file: File;
  data: ImportRebateData[];
}) => {
  return (
    <div className="px-4 md:px-5 py-6 w-full rounded-2xl bg-white">
      {file &&
        <PreviewFileXlsx 
          filname={file.name}
          size={file.size} 
          canDelete={false}
        />
      }
    
      <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p className="font-medium text-lg 3xl:text-xl">
            Preview Data
          </p>
          <p className="text-base 3xl:text-lg text-black/80">
            Tampilan 5 data teratas dari keseluruhan data yang di import.
          </p>
        </div>
        <p className="shrink-0 px-4 py-2.5 h-fit border border-primary rounded-full text-sm 3xl:text-lg text-center text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text whitespace-nowrap">
          Records {data.length} data
        </p>
      </div>
    
      <TablePreviewDataImport data={data} />
    </div>
  )
}

export default PreviewImportRebate;

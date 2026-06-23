import type { ValidationData } from '@/models/validationData';
import { useCallback, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Papa from "papaparse";
import { brokers } from '@/utils/dataBroker/brokers';
import Button from '../ui/Button';
import DropzoneFile from '../dashboard/common/DropzoneFile';
import PreviewValDataTable from './PreviewValDataTable';
import PreviewFile from './PreviewFile';
import FeedbackUploadFile from './FeedbackUploadFile';
import { HEADER_MAPPING, type StatusImport } from '@/utils/adminUnit';
import { toast } from 'react-toastify';
import { AdminAPI } from '@/api';
import { getSizeFileFormat } from '@/helper/fileHelper';

type ResponseImport = {
  messages: string[];
  countError?: number
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const DrawerImportCsv = ({
  closeDrawer,
  refreshData,
}: {
  closeDrawer: () => void;
  refreshData: () => Promise<void>
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ValidationData[]>([]);
  const [errorImport, setErrorImport] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusImport, setStatusImport] = useState<StatusImport>(null);
  const [responseImport, setResponseImport] = useState<ResponseImport>({
    messages: [],
    countError: 0
  });
  const allBrokers = Object.values(brokers).map((broker) => broker.name);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setStatusImport(null);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setErrorImport("File terlalu besar! Maksimal 5mb.");
        return;
      }
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => {
          const trimHeader = header.trim();
          return HEADER_MAPPING[trimHeader] || trimHeader;
        },
        complete: (result) => {
          const data = result.data;
          if (data.length === 0) {
            setErrorImport("Tidak ditemukan data dalam file csv.");
            return;
          }
          const detectedHeaders = Object.keys(data[0] || {});
          const missingHeaders = Object.values(HEADER_MAPPING).filter((item) => !detectedHeaders.includes(item));
          
          if (missingHeaders.length > 0) {
            setErrorImport("File CSV tidak valid. Pastikan format kolom sesuai.");
            return;
          }
          setFile(file);
          setData(data as ValidationData[]);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }, []);

  const handleImportData = async () => {
    if (data.length === 0) return;
    setStatusImport("UPLOAD");
    setIsLoading(true);
    try {
      const { error, message, errorsDetail } = await AdminAPI.bulkPostFormValidationData({ items: data });
      if (error) {
        setStatusImport("ERROR");
        if (errorsDetail) {
          setResponseImport({ countError: errorsDetail.length, messages: errorsDetail });
        } else {
          setResponseImport({ countError: 1, messages: [message] });
        }
      } else {
        setResponseImport({ countError: 0, messages: [message] });
        setStatusImport("SUCCESS");
        toast.success(message);
        await refreshData();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="z-100 fixed py-5 top-20 right-0 max-w-[640px] 2xl:max-w-[720px] w-full h-[calc(100vh-80px)] border-t border-l border-[#D2CEE1] bg-white">
      <div className="px-5 pb-2 relative flex items-center justify-between border-b border-[#D2CEE1]">
        <h2 className="text-xl font-medium">
          Import CSV/Excel
        </h2>
        <IoCloseOutline 
          onClick={() => {
            if (isLoading) return;
            closeDrawer();
          }}
          className="text-2xl cursor-pointer" />
      </div>
      <div className="pt-2 pb-4 px-5 flex flex-col gap-5 w-full h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden">
        <p className="text-base 2xl:text-xl text-black/80">
          Pastikan penamaan kolom sudah sesuai dengan sistem. Download 
          <a href="/file/template-validation-data.csv" className="underline" download="Template_Validation_Data.csv"> template file CSV</a>.
        </p>

        {!file && data.length === 0 ? 
          <DropzoneFile 
            onDrop={onDrop}
            errorImport={errorImport} />
        : <PreviewValDataTable
            data={data} />}

        {file && <PreviewFile 
          filename={file.name}
          fileSize={getSizeFileFormat(file.size)}
          countData={data.length}
          handleDeleteFile={() => {
            setFile(null);
            setData([]); 
            setStatusImport(null) }} />}

        {statusImport === "UPLOAD" &&
          <p className="text-primary">
            Uploading process
          </p>
        }
        
        {(statusImport === "ERROR" || statusImport === "SUCCESS")  &&
          <FeedbackUploadFile 
            status={statusImport} 
            messages={responseImport.messages}
            countError={responseImport.countError}
          />
        }
        <div className="text-black/80 font-medium">
          <p>Ketentuan pengisian data</p>
          <ol className="mt-2.5 list-decimal pl-5">
            <li>Kolom Broker wajib berisi {allBrokers.join(", ")}.</li>
            <li>Kolom Rebate hanya berisi Akun Trading atau Bank.</li>
            <li>Kolom Status harus sesuai ketentuan (Pending/Approved/Rejected).</li>
            <li>Kolom Platform Trading hanya berisi MT4 atau MT5.</li>
            <li>Kolom Tanggal dapat bernilai kosong, default nilai mengikuti waktu import data.</li>
            <li>Nilai kolom Tanggal wajib dalam format YYYY-MM-DD (2026-31-01).</li>
          </ol>
        </div>
      </div>
      <div className="absolute px-5 py-2 left-0 bottom-0 flex w-full bg-white border-t border-[#D2CEE1]">
        <Button 
          buttonType="button"
          disabled={isLoading}
          variant="no-bg" 
          onClick={closeDrawer}
          className="py-3! w-1/2! rounded-lg!"
        > Tutup
        </Button>
        <Button 
          buttonType="button"
          onClick={() => {
            if (!isLoading)
            handleImportData();
          }}
          disabled={!file || data.length === 0 || isLoading || statusImport === "SUCCESS" || statusImport === "UPLOAD"}
          loading={isLoading} 
          variant="primary-light" 
          className="py-3! w-1/2! rounded-lg!"
        > 
          {statusImport === "ERROR" ? 
            "Upload Ulang" : "Upload Data"
          }
        </Button>
      </div>
    </div>
  )
}

export default DrawerImportCsv;

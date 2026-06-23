import { useDropzone } from "react-dropzone";

const DropzoneFile = ({
  onDrop,
  errorImport,
  maxSizeMb=5
}: {
  onDrop: (acceptedFiles: File[]) => void;
  errorImport: string;
  maxSizeMb?: number
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"]
    },
    multiple: false,
  });
  
  return (
    <div {...getRootProps()} className="relative">
      <div
        className="px-4 flex flex-col items-center justify-center w-full h-80 rounded-2xl cursor-pointer text-center"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25'   fill='none' rx='16' ry='16' stroke='%2300000099' stroke-width='2' stroke-dasharray='5%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          backgroundColor: isDragActive ? "rgba(0,0,0,0.1)" : "#ffffff"
        }}
      >
        <img src="/upload-cloud-icon.svg" alt="cloud upload" />
        {isDragActive ?
          <span className="text-sm 2xl:text-base text-black/80 font-medium">Lepaskan file disini</span>
          :
          <>
            <span className="text-sm 2xl:text-base text-black/80 font-medium">
              Klik atau geser file ke sini untuk mengunggah
            </span>
            <span className="text-sm 2xl:text-base text-black/60">
              Pastikan file berformat .xlsx dengan ukuran maksimal {maxSizeMb} MB.
            </span>
          </>
        }
        <input {...getInputProps()} />
      </div>
      {errorImport &&
        <p className="mt-2 text-my-red text-sm">
          {errorImport}
        </p>
      }
    </div>
  )
}

export default DropzoneFile;

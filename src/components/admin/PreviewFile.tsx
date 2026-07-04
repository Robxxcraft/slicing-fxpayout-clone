import { IoCloseOutline } from 'react-icons/io5';

const PreviewFile = ({
  filename,
  countData,
  fileSize,
  handleDeleteFile,
}: {
  filename: string;
  countData: number;
  fileSize: string;
  handleDeleteFile: () => void;
}) => {
  return (
    <div className="px-5 py-4 flex justify-between border border-black/40 rounded-2xl">
      <div className="flex items-center gap-4">
        <img src="/csv-icon.svg" alt="csv icon" 
          className="scale-90 3xl:scale-100" />
        <div>
          <p>{filename}</p>
          <p className="text-sm text-black/60">{fileSize} ({countData} baris)</p>
        </div>
      </div>
      <IoCloseOutline 
        onClick={handleDeleteFile}
        className="text-2xl cursor-pointer text-my-red" />
    </div>
  )
}

export default PreviewFile;

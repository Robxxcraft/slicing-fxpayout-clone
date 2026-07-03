import { getSizeFileFormat } from "@/helper/fileHelper";
import { IoCloseOutline } from "react-icons/io5";

const PreviewFileXlsx = ({
  filname,
  size,
  canDelete,
  onDeleteFile
}: {
  filname: string;
  size: number;
  canDelete: boolean;
  onDeleteFile?: () => void;
}) => {
  return (
    <div className="px-2 md:px-5 py-4 flex justify-between gap-4 rounded-2xl border border-[#DDDDDD]">
      <div className="flex items-center gap-3">
        <img src="/icon-excel.png" alt="Icon Excel" 
          className="scale-90 md:scale-100 select-none"
        />
        <div className="space-y-2">
          <p className="text-base 3xl:text-lg line-clamp-2 text-ellipsis">
            {filname}
          </p>
          <p className="text-sm 3xl:text-base">
            {getSizeFileFormat(size)}
          </p>
        </div>
      </div>
      {canDelete &&
        <div
          onClick={onDeleteFile} 
          className="shrink-0 group p-2 h-fit aspect-square hover:bg-[#F5F5F5] rounded-xl transition-all duration-300 cursor-pointer">
          <IoCloseOutline 
            className="text-2xl 3xl:text-3xl group-hover:text-my-red transition-all duration-300" />
        </div>
      }
    </div>
  )
}

export default PreviewFileXlsx;

import SelectDropdown from "@/components/ui/SelectDropdown";
import NextPreviousButton from "../../common/NextPreviousButton";

type PaginationFooterProps = {
  pageIndex: number; // From 0
  pageSize: number;
  totalData: number;
  onChangePageSize: (val: string) => void;
  onNext: () => void;
  onPrev: () => void;
  disabledNext: boolean;
  disabledPrev: boolean;
  isLoading: boolean;
  supportEntry: {
    key: string;
    value: string;
  }[];
};

const PaginationFooterTable = ({
  pageIndex,
  pageSize,
  totalData,
  onChangePageSize,
  onNext,
  onPrev,
  disabledNext,
  disabledPrev,
  isLoading,
  supportEntry
}: PaginationFooterProps) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
        <p className="text-base 2xl:text-xl">Baris per halaman</p>
        <SelectDropdown
          selectedInput={pageSize.toString()}
          handleChangeInput={onChangePageSize}
          objectInput={supportEntry}
          containerCL="w-fit!"
          inputCL="w-[80px]! text-center!"
          positionDrop="center"
          positionY="up"
        />

        <p className="text-base 2xl:text-xl">
          {totalData === 0 
            ? "Menampilkan 0 entri." 
            : `Menampilkan ${pageIndex * pageSize + 1} hingga ${Math.min((pageIndex + 1) * pageSize, totalData)} dari ${totalData} entri.`
          }
        </p>
      </div>

      <div className="hidden md:block">
        <NextPreviousButton
          onNextPage={onNext}
          onPreviousPage={onPrev}
          disabledNext={isLoading || disabledNext}
          disabledPrev={isLoading || disabledPrev}
        />
      </div>
    </div>
  );
}

export default PaginationFooterTable;

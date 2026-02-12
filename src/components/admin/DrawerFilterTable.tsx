import { IoCloseOutline } from 'react-icons/io5';
import type { Table } from '@tanstack/react-table';
import type { ValidationData } from '@/models/validationData';
import CheckboxFilter from './CheckboxFilter';

const DrawerFilterTable = ({
  closeDrawer,
  tableInstance
}: {
  closeDrawer: () => void;
  tableInstance: Table<ValidationData>;
}) => {

  return (
    <div className="z-100 fixed py-5 top-20 right-0 max-w-full md:max-w-[320px] w-full h-[calc(100vh-50px)] border-t border-l border-[#D2CEE1] bg-white">
      <div className="px-5 pb-2 relative flex items-center justify-between border-b border-[#D2CEE1]">
        <h2 className="text-xl font-medium">
          Filter
        </h2>
        <IoCloseOutline 
          onClick={closeDrawer}
          className="text-2xl cursor-pointer" />
      </div>
      <div className="pt-2 pb-4 px-5 flex flex-col w-full h-[calc(100%-50px)] overflow-y-auto overflow-x-hidden">
        <button
          onClick={tableInstance.getToggleAllColumnsVisibilityHandler()}
          className="my-2 text-sm font-medium text-gray-700 text-left hover:underline cursor-pointer"
        >
          {tableInstance.getIsAllColumnsVisible() ?
            "Hapus semua" : "Pilih semua"
          }
        </button>
        {tableInstance.getAllLeafColumns().map((column) => {
          if (column.columnDef.id === "select") return;
          // if (column.columnDef.id === "status") {
          //   return (
          //     <>
          //       <CheckboxFilter
          //         key={column.id}
          //         id={column.id}
          //         label={column.columnDef.header === undefined ? "-" : column.columnDef.header as string} 
          //         checked={column.getIsVisible()}
          //         onChange={column.getToggleVisibilityHandler()}
          //       />
          //       <div className="ml-4">
          //         {["Pending", "Approved", "Rejected"].map((item) => (
          //           <CheckboxFilter
          //             key={item.toLowerCase()}
          //             id={item.toLowerCase()}
          //             label={item}
          //             checked={false}
          //             onChange={() => {}}
          //           />
          //         ))}
          //       </div>
          //     </>
          //   )
          // }
          return (
          <CheckboxFilter
            key={column.id}
            id={column.id}
            label={column.columnDef.header === undefined ? "-" : column.columnDef.header as string} 
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
          />
        )})}
      </div>
    </div>
  )
}

export default DrawerFilterTable;

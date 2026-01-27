import { listSectionsRebateForex } from "@/utils/listNavigation";
import type { Dispatch, Ref, SetStateAction } from "react";
import { GoSidebarCollapse } from "react-icons/go";

const AsideSection = ({
  asideBarRef,
  activeNameRef,
  setOpenSidebar,
  openSidebar,
  activeNameWidth,
  activeName,
  activeSection
}: {
  asideBarRef: Ref<HTMLDivElement> | null;
  activeNameRef: Ref<HTMLDivElement> | null;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  openSidebar: boolean;
  activeNameWidth: number;
  activeName: string;
  activeSection: string
}) => {
  return (
    <aside ref={asideBarRef} className="relative w-full lg:w-[20%] z-9999999">
      <div className="fixed lg:sticky top-20 lg:top-[120px] 2xl:top-[148px] left-0 h-fit w-full">
        <div className="py-3 lg:py-0 px-6 lg:px-0 flex items-center gap-2 w-full border-b lg:border-0 border-[#CECECE] bg-white">
          <div ref={activeNameRef} className="flex items-center gap-2">
            <GoSidebarCollapse 
              onClick={() => setOpenSidebar(!openSidebar)}
              className="inline-block lg:hidden text-xl cursor-pointer" />
            <h2 className="font-medium text-base lg:text-2xl 2xl:text-4xl whitespace-nowrap">
              Daftar Isi
            </h2>
            <span className="inline-block lg:hidden">&gt;</span>
          </div>
          <span
            style={{ width: `${activeNameWidth}px` }}
            className="inline-block lg:hidden text-primary overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {activeName}
          </span>
        </div>
        <div className={`${openSidebar ? "left-0" : "-left-[120%]"} 
          absolute lg:static mt-10 px-6 lg:px-0 pt-4 lg:pt-0 top-[9px] bg-white h-screen lg:h-full w-full flex flex-col gap-4 lg:gap-6 transition-all duration-300 ease-out`}>
          {listSectionsRebateForex.map((item, idx) => (
            <a 
              href={`#${item.id}`} 
              key={idx} 
              onClick={() => setOpenSidebar(!openSidebar)}
              className={`${activeSection == item.id && "text-primary font-medium lg:after:content-[''] lg:after:absolute lg:after:left-0 lg:after:-bottom-0.5 lg:after:h-1 lg:after:w-20 lg:after:bg-primary lg:after:rounded-full"} 
              relative block pb-0 lg:pb-3 2xl:pb-5 lg:border-b border-[#CECECE] text-lg lg:text-base 2xl:text-xl hover:text-primary transition-all duration-300 ease-out`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default AsideSection;

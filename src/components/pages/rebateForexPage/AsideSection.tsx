import { listSectionsRebateForex } from "@/utils/listNavigation";
import type { Dispatch, Ref, SetStateAction } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";

const AsideSection = ({
  asideBarRef,
  setOpenSidebar,
  openSidebar,
  activeSection
}: {
  asideBarRef: Ref<HTMLDivElement> | null;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  openSidebar: boolean;
  activeSection: string
}) => {
  return (
    <aside ref={asideBarRef} className="px-6 md:px-11 xl:px-0 xl:pl-24 2xl:pl-56 relative w-full lg:w-[20%] z-9999999">
      <div className="sticky top-20 lg:top-[120px] 2xl:top-[148px] left-0 h-[56px] lg:h-fit w-full">
        <div className="py-6 md:py-8 lg:py-0 flex items-center justify-between w-full bg-white">
          <h2 className="font-medium text-xl md:text-3xl lg:text-2xl 2xl:text-4xl whitespace-nowrap">
            Daftar Isi
          </h2>
          <div className="lg:hidden flex items-center justify-center size-8 md:size-10 border-2 border-primary rounded-[8px]">
            {openSidebar ? 
              <IoClose 
                onClick={() => setOpenSidebar(false)} 
                className="text-3xl text-primary cursor-pointer" 
              /> :
              <IoMenu
                onClick={() => setOpenSidebar(true)}
                className="text-2xl text-primary cursor-pointer"
              />
            }
          </div>
        </div>
        <div className={`${openSidebar ? "left-0" : "-left-[120%]"} 
          absolute lg:static mt-10 pt-4 lg:pt-0 top-[36px] bg-white h-screen lg:h-full w-full flex flex-col gap-4 lg:gap-6 transition-all duration-300 ease-out`}>
          {listSectionsRebateForex.map((item, idx) => (
            <HashLink 
              smooth
              to={`#${item.id}`} 
              key={idx} 
              onClick={() => {
                if (openSidebar) {
                  setOpenSidebar(false)
                }
              }}
              className={`${activeSection == item.id && "text-primary font-medium lg:after:content-[''] lg:after:absolute lg:after:left-0 lg:after:-bottom-0.5 lg:after:h-1 lg:after:w-20 lg:after:bg-primary lg:after:rounded-full"} 
              relative block pb-0 lg:pb-3 2xl:pb-5 lg:border-b border-[#CECECE] text-lg md:text-xl lg:text-base 2xl:text-xl hover:text-primary transition-all duration-300 ease-out`}
            >
              {item.name}
            </HashLink>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default AsideSection;

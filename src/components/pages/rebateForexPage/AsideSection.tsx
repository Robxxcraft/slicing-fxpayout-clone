import { listSectionsRebateForex } from "@/utils/listNavigation";
import type { Dispatch, Ref, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(["common"]);
  return (
    <aside ref={asideBarRef} className="px-6 md:px-11 xl:px-0 xl:ps-24 3xl:ps-56 relative w-full lg:w-[25%] z-999990">
      <div className="sticky top-20 lg:top-[120px] 3xl:top-[148px] start-0 h-14 lg:h-fit w-full">
        <div className="py-6 md:py-8 lg:py-0 flex items-center justify-between w-full bg-white">
          <h2 className="font-medium text-xl md:text-3xl lg:text-2xl 3xl:text-4xl">
            {t(`text.tableOfContents`)}
          </h2>
          <div className="lg:hidden flex items-center justify-center size-8 md:size-10 border-2 border-primary rounded-lg">
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
        <div className={`${openSidebar ? "start-0" : "-start-[120%]"} 
          absolute lg:static mt-10 pt-4 lg:pt-0 top-9 bg-white h-screen lg:h-full w-full flex flex-col gap-4 lg:gap-6 transition-all duration-300 ease-out`}>
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
              className={`${activeSection == item.id && "text-primary font-medium lg:after:content-[''] lg:after:absolute lg:after:start-0 lg:after:-bottom-0.5 lg:after:h-1 lg:after:w-20 lg:after:bg-primary lg:after:rounded-full"} 
              relative block pb-0 lg:pb-3 3xl:pb-5 lg:border-b border-[#CECECE] text-lg md:text-xl lg:text-base 3xl:text-xl hover:text-primary transition-all duration-300 ease-out`}
            >
              {t(`navbar.subNav.${item.code}`)}
            </HashLink>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default AsideSection;

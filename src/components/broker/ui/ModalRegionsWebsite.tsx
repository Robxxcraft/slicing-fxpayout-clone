import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import type { RegionWebsite } from "@/utils/dataBroker/typeDetailBroker";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

interface ModalRegionsWebsiteProps {
  isVisible: boolean;
  handleClose: () => void;
  brokerName: string;
  imageBroker: string;
  websiteItems: RegionWebsite[]
}

const ModalRegionsWebsite = ({
  isVisible,
  handleClose,
  brokerName,
  imageBroker,
  websiteItems
}: ModalRegionsWebsiteProps) => {
  const globalWebsite = websiteItems.find((item) => item.region.toLowerCase() === "global");
  const generalWebsite = websiteItems.filter((item) => item.region.toLowerCase() !== "global");
  return (
    <Modal isOpen={isVisible} onClose={handleClose} maxWCL="max-w-[360px]">
      <div className="mb-4 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={`/broker/${imageBroker}`}
            alt={brokerName}
            className="size-12 rounded-full object-cover object-center"
          />
          <p className="text-2xl font-semibold max-w-[200px] truncate">
            {brokerName}
          </p>
        </div>
        <div onClick={handleClose} className="shrink-0 flex justify-center items-center size-10 rounded-lg hover:bg-[#F5F5F5] cursor-pointer">
          <IoCloseOutline className="text-black/80 text-2xl"/>
        </div>
      </div>
      {globalWebsite && 
        <div className="mb-3">
          <Button
            buttonType="link"
            urlTo={globalWebsite.url}
            target="_blank"
            variant="primary-light"
            className="justify-between! w-full!"
          >
            <div className="size-5"></div>
            <p>
              {globalWebsite.region}
            </p>
            <div className="size-5 flex items-center justify-center">
              <FaExternalLinkAlt className="text-base 2xl:text-xl" />
            </div>
          </Button>
        </div>
      }
      <div className="space-y-2">
        {generalWebsite.map((web, index) => (
          <div key={index}>
            <Button
              buttonType="link"
              urlTo={web.url}
              target="_blank"
              variant="outline-primary"
              className="justify-between! w-full!"
            >
              <div className="size-5"></div>
              <p>
                {web.region}
              </p>
              <div className="size-5 flex items-center justify-center">
                <FaExternalLinkAlt className="text-base 2xl:text-xl" />
              </div>
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default ModalRegionsWebsite;

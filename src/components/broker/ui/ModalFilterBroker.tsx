import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { DEFAULT_MIN_DEPOSIT, DEFAULT_PLATFORMS, DEFAULT_REBATE } from "@/constants/defaultFilterBrokerData";
import { removeLocalStorage } from "@/services/apiClient";
import type { EnumPlatformBroker, RebateRange } from "@/types/databroker.type";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa6";
import { getTrackBackground, Range } from "react-range";

interface ModalFilterBrokerProps {
  isVisible: boolean;
  handleClose: () => void;
  selectedRebate: RebateRange;
  selectedMinDeposit: number;
  selectedPlatforms: EnumPlatformBroker[];
  onApplyChanges: ({ 
    rebate,
    minDeposit,
    platforms
  }: { 
    rebate: RebateRange;
    minDeposit: number; 
    platforms: EnumPlatformBroker[];
  }) => void;
};

const rebateMarks = [0, 10, 20, 30, 40, 50];
const minDepositMarks = [0, 50, 100, 150, 200];

const levelSpread = [
  { key: "low", keyTranslate: "text.title_low", text: "Rendah" },
  { key: "medium", keyTranslate: "text.title_medium", text: "Sedang" },
  { key: "high", keyTranslate: "text.title_high", text: "Tinggi" },
];
const availablePlatforms = [
  { key: "mt4", text: "MetaTrader 4 (MT4)" },
  { key: "mt5", text: "MetaTrader 5 (MT5)" },
  { key: "c_trader", text: "cTrader" },
  { key: "trading_view", text: "Trading View" },
  { key: "web_trader", text: "WebTrader" },
  { key: "pro_trader", text: "ProTrader" },
];

const ModalFilterBroker = ({
  isVisible,
  handleClose,
  selectedRebate,
  selectedMinDeposit,
  selectedPlatforms,
  onApplyChanges,
}: ModalFilterBrokerProps) => {
  const { t } = useTranslation(["common"]);
  const [rebate, setRebate] = useState<RebateRange>(selectedRebate);
  const [minDeposit, setMinDeposit] = useState<number[]>([selectedMinDeposit]);
  const [selectedSpread, setSelectedSpread] = useState<string>("low");
  const [platforms, setPlatforms] = useState<EnumPlatformBroker[]>(selectedPlatforms);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsOpen(true);
    }, 100);
    } else {
        setIsOpen(false);
    }
  }, [isVisible]);

  const handleCheckedPlatforms = (
    platform: EnumPlatformBroker,
    checked: boolean,
  ) => {
    if (checked) {
      setPlatforms([...platforms, platform]);
    } else {
      setPlatforms((prev) => {
        return prev.filter((item) => item !== platform);
      });
    }
  };

  const handleApplyFilter = () => {
    onApplyChanges({
      rebate, 
      minDeposit: minDeposit[0],
      platforms
    });
    handleClose();
  }

  const handleResetFilter = () => {
    setRebate(DEFAULT_REBATE);
    setMinDeposit([DEFAULT_MIN_DEPOSIT]);
    setPlatforms(DEFAULT_PLATFORMS);
    removeLocalStorage("broker-filters");
    handleApplyFilter();
  }

  return (
    <Modal isOpen={isVisible} onClose={handleClose} maxWCL="max-w-[820px] px-2! lg:px-4!">
      <div className="scrollbar-thin px-4 space-y-4 2xl:space-y-6 max-h-[calc(100dvh-100px)] overflow-y-auto">
        <div className="pb-2 relative flex flex-col border-b border-primary/20">
          <div className="flex items-center justify-center gap-2">
            <FaFilter className="scale-x-[-1] text-3xl 2xl:text-4xl text-primary" />
            <h2 className="text-2xl 2xl:text-[32px] font-semibold text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              Filter Broker
            </h2>
          </div>
          
          <button
            type="button"
            className="ml-auto md:absolute right-0 top-1/2 md:-translate-y-1/2 text-base 2xl:text-xl text-primary underline cursor-pointer"
            onClick={handleResetFilter}
          >
            Reset Filter
          </button>
        </div>
        <h3 className="pb-2 font-medium text-lg 2xl:text-2xl leading-[160%] border-b border-primary/20">
          Trading
        </h3>
        <div className="pb-10">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-base 2xl:text-xl font-medium leading-6 text-[#344054]">
              Range Rebate : 
            </p>
            <p className="text-base 2xl:text-xl font-bold leading-6 text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              ${rebate.start} -  ${rebate.end}
            </p>
          </div>
          
          {isOpen ?
            <Range 
                values={[rebate.start, rebate.end]} 
                min={0}
                max={50}
                allowOverlap={false}
                onChange={([start, end]) => setRebate({ start, end })} 
                renderTrack={({ props, children }) => (
                    <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "8px",
                        width: "100%",
                        background: getTrackBackground({
                            values: [rebate.start, rebate.end],
                            colors: [
                                "rgba(48,127,226,0.3)", // passive kiri
                                "#4160FF",             // active
                                "rgba(48,127,226,0.3)" // passive kanan
                            ],
                            min: 0,
                            max: 50,
                        }),
                    }}
                    className="rounded-full"
                    >
                        {children}
                    </div>
                )} 
                renderThumb={({ props }) => (
                    <div
                    {...props}
                    key={props.key}
                    style={{
                        ...props.style,
                        height: "24px",
                        width: "24px",
                    }}
                    className="p-1 bg-primary rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    />
                )}          
            />
            : <div className="size-2" />
          }

          <div className="mt-4 relative">
              {rebateMarks.map((mark, index) => {
                let right, left = undefined;
                let className = "absolute top-0 text-sm md:text-xl lg:text-base 2xl:text-xl text-[#344054] font-medium ";
                const min = rebateMarks[0];
                const max = rebateMarks[rebateMarks.length - 1];
                if (index === 0) {
                  left = 0;
                } else if (index === rebateMarks.length - 1) {
                  right = 0;
                } else {
                  const position = ((mark - min) / (max - min)) * 100;
                  className += `-translate-x-1/2`;
                  left = `${position}%`;
                }

                return (
                  <span key={mark}
                    className={className}
                    style={{ 
                      right,
                      left
                    }}
                  >${mark}</span>
                )
              })}
            </div>
        </div>

        {/* SPREAD */}
        <p className="text-base 2xl:text-xl font-medium leading-6 text-[#344054]">
            Spread Broker:
        </p>
        <div className="mt-4 2xl:mt-6 flex flex-wrap items-center gap-2">
            {levelSpread.map((item, index) => (
              <div 
                key={index}
                onClick={() => setSelectedSpread(item.key)}
                className={`px-6 2xl:px-8 py-3 2xl:py-4 border rounded-full cursor-pointer
                  ${item.key === selectedSpread ? "bg-primary" : "bg-transparent"}
              `}>
                <p className={`text-sm md:text-base font-medium
                    ${item.key === selectedSpread ? "text-white" : "text-black"}
                `}>
                    {t(item.keyTranslate)}
                </p>
              </div>
            ))}
        </div>

        {/* MINIMUM DEPOSIT */}
        <div className="pb-10 border-b border-primary/20">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-base 2xl:text-xl font-medium leading-6 text-[#344054]">
              Minimum Deposit : 
            </p>
            <p className="text-base 2xl:text-xl font-bold leading-6 text-transparent bg-linear-to-t from-dark-primary to-primary bg-clip-text">
              &gt;${minDeposit[0]} 
            </p>
          </div>

          {isOpen ?
            <Range 
                values={minDeposit} 
                min={0}
                max={200}
                allowOverlap={false}
                onChange={(values) => setMinDeposit(values)} 
                renderTrack={({ props, children }) => (
                    <div
                    {...props}
                    style={{
                        ...props.style,
                        height: "8px",
                        width: "100%",
                        background: getTrackBackground({
                            values: minDeposit,
                            colors: [
                                "#4160FF",             // active
                                "rgba(48,127,226,0.3)" // passive kanan
                            ],
                            min: 0,
                            max: 200,
                        }),
                    }}
                    className="rounded-full"
                    >
                        {children}
                    </div>
                )} 
                renderThumb={({ props }) => (
                    <div
                    {...props}
                    key={props.key}
                    style={{
                        ...props.style,
                        height: "24px",
                        width: "24px",
                    }}
                    className="p-1 bg-primary rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    />
                )}          
            />
            : <div className="size-2" />
          }

          <div className="mt-4 relative">
              {minDepositMarks.map((mark, index) => {
                let right, left = undefined;
                let className = "absolute top-0 text-sm md:text-xl lg:text-base 2xl:text-xl text-[#344054] font-medium ";
                const min = minDepositMarks[0];
                const max = minDepositMarks[minDepositMarks.length - 1];
                if (index === 0) {
                  left = 0;
                } else if (index === minDepositMarks.length - 1) {
                  right = 0;
                } else {
                  const position = ((mark - min) / (max - min)) * 100;
                  className += `-translate-x-1/2`;
                  left = `${position}%`;
                }

                return (
                  <span key={mark}
                    className={className}
                    style={{ 
                      right,
                      left
                    }}
                  >${mark}</span>
                )
              })}
            </div>
        </div>

        {/* PLATFORM */}
        <h3 className="pb-2 font-medium text-lg 2xl:text-2xl leading-[160%] border-b border-primary/20">
          Platform
        </h3>
        <div>
          <p className="text-base 2xl:text-xl font-medium leading-6 text-[#344054]">
            Platform:
          </p>

          <div className="mt-4 2xl:mt-6 flex items-center gap-4 2xl:gap-6 flex-wrap">
            {availablePlatforms.map((data) => (
              <div key={data.key} className="flex items-center cursor-pointer">
                <input 
                  id={`platform-checkbox-${data.key}`}
                  name={`platform-checkbox-${data.key}`}
                  type="checkbox" 
                  onChange={(e) => {
                    handleCheckedPlatforms(
                      data.key as EnumPlatformBroker, 
                      e.target.checked
                    )
                  }}
                  checked={platforms.includes(data.key as EnumPlatformBroker)}
                  className="size-4 2xl:size-6 checked:accent-primary rounded-sm cursor-pointer"
                />
                <label 
                    htmlFor={`platform-checkbox-${data.key}`} 
                    className="pl-2 text-base font-medium leading-6 cursor-pointer select-none"
                >
                  {data.text}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="primary-light"
          buttonType="button"
          className="py-4! md:py-6! lg:py-4! 2xl:py-6! w-full!"
          onClick={handleApplyFilter}
        >
          {t("text.title_apply")}
        </Button>
      </div>
    </Modal>
  )
}

export default ModalFilterBroker;

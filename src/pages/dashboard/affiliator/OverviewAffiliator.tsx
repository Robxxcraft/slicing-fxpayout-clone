import CardOverview from "@/components/dashboard/common/CardOverview";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import Table from "@/components/TableLayout";
import BalanceContext from "@/context/BalanceContext";
import UserContext from "@/context/UserContext";
import { copyToClipboard } from "@/helper/copyToClipboard";
import { formattingUsd } from "@/helper/formattingCurrency";
import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { TbCopy, TbWorld } from "react-icons/tb";
import { VscKey } from "react-icons/vsc";
import { Link } from "react-router-dom";

const dataEarnings = [
  {
    date: "8/2/19",
    trader: "Ronald Richards",
    broker: "Pepperstone",
    numberTrading: "28104472",
    rebate: "$406.27",
    comission: "$40.63"
  },
  {
    date: "7/11/19",
    trader: "Annette Black",
    broker: "HFM",
    numberTrading: "13294857",
    rebate: "$928.41",
    comission: "$92.84"
  },
  {
    date: "6/21/19",
    trader: "Bessie Cooper",
    broker: "FP Markets",
    numberTrading: "76840125",
    rebate: "$450.54",
    comission: "$45.05"
  },
  {
    date: "4/4/18",
    trader: "Jenny Wilson",
    broker: "Finex",
    numberTrading: "59321085",
    rebate: "$328.85",
    comission: "$32.89"
  },
  {
    date: "12/4/17",
    trader: "Leslie Alexander",
    broker: "Octa FX",
    numberTrading: "90638412",
    rebate: "$943.65",
    comission: "$94.37"
  },
  {
    date: "8/15/17",
    trader: "Jacob Jones",
    broker: "Exness",
    numberTrading: "77394012",
    rebate: "$202.87",
    comission: "$20.29"
  }
];

const OverviewAffiliator = () => {
  const [authUser] = useContext(UserContext);
  const [balance] = useContext(BalanceContext);
  const [isCopied, setIsCopied] = useState({
    url: false,
    code: false
  });

  const handleCopy = async (ref: "url" | "code") => {
    if (!authUser?.affiliatorCode) return;

    const text = ref === "url" ? `https://fxpayout.com/register?ref=${authUser.affiliatorCode}` : authUser.affiliatorCode;
    const isCopySuccess = await copyToClipboard(text);
    if (isCopySuccess) {
      setIsCopied((prev) => ({
        ...prev,
        [ref]: true
      }));
      setTimeout(() => {
        setIsCopied((prev) => ({
          ...prev,
          [ref]: false
        }));
      }, 2000);
    }
  }
  return (
    <WrapperDashboardComponent>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-4">
        <CardOverview index={0} title={"Reffered Traders"} icon={<LuUsers />} content={"20"} detail={"Total traders joined using your link"} />
        <CardOverview index={1} title={"Active Traders"} icon={<LuUsers />} content={"18"} detail={"Active traders in your network"} />
        <CardOverview 
          index={2} title={"Balance"} icon={<IoWalletOutline />} 
          content={formattingUsd(balance?.balance || 0)} detail={"Available balance for withdrawal"} />
      </section>
      <section className="mt-7">
        <h2 className="text-xl font-medium">
          Refferal Tools
        </h2>
        <div className="mt-4 flex flex-col md:flex-row gap-2 lg:gap-4">
          <div className="max-w-[580px] w-full rounded-lg overflow-hidden border border-[#DDDDDD] h-fit">
            <div className="pt-5 px-4 pb-4 flex flex-col gap-4 bg-white">
              <div className="flex items-center gap-2.5">
                <TbWorld className="text-[26px] text-gray-800" />
                <p className="font-medium text-xl">Your Refferal Link</p>
              </div>
              <ParagraphDashboard maxW="full" colorCL="text-black/80">
                Share link berikut kepada calon trader untuk mendaftar akun FXPayout trader dan dapatkan hadiah 10% dari total rebate yang diperoleh oleh tradermu.  
              </ParagraphDashboard>
              <div className="flex flex-col lg:flex-row items-center gap-2.5">
                <div className="p-4 w-full bg-[#FFFEFE] border border-[#DDDDDD] rounded-lg">
                  <p className="text-nowrap line-clamp-1 text-ellipsis">
                    https://fxpayout.com/register?ref={authUser?.affiliatorCode}
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopy("url")} 
                  className="p-4 flex justify-center items-center gap-2 w-full lg:w-fit rounded-lg bg-primary text-white font-medium text-nowrap cursor-pointer">
                  {isCopied.url ? 
                    <FaCheck className="text-xl" /> : 
                    <>
                      <TbCopy className="rotate-90 text-xl 2xl:text-3xl" />
                      <span>Salin Link</span>
                    </>
                  }
                </button>
              </div>
            </div>
            <div className="w-full h-2.5 bg-primary"></div>
          </div>  
          <div className="max-w-[360px] w-full rounded-lg overflow-hidden border border-[#DDDDDD] h-fit">
            <div className="pt-5 px-4 pb-4 flex flex-col gap-4 bg-white">
              <div className="flex items-center gap-2.5">
                <VscKey className="text-2xl text-gray-800 scale-x-[-1] rotate-90" />
                <p className="font-medium text-xl">Unique Code</p>
              </div>
              <ParagraphDashboard maxW="full" colorCL="text-black/80">
                Trader bisa langsung memasukkan kode secara manual ketika mendaftar.
              </ParagraphDashboard>
              <div className="py-4 flex items-center justify-center w-full rounded-lg bg-[#F5F5F5] border border-primary border-dashed">
                <p className="text-[32px] font-bold">
                  {authUser?.affiliatorCode}
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => handleCopy("code")} 
                className="p-4 flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-medium text-nowrap cursor-pointer">
                {isCopied.code ? 
                  <FaCheck className="text-xl" /> : 
                  <>
                    <TbCopy className="rotate-90 text-xl 2xl:text-3xl" />
                    <span>Salin Kode</span>
                  </>
                }
              </button>
            </div>
            <div className="w-full h-2.5 bg-primary"></div>
          </div>  
        </div>
      </section>
      <section className="mt-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium">
              Recent Earnings
            </h2>
            <ParagraphDashboard colorCL="text-black/60">
              History perolehan komisi terkini dari pendapatan rebate trader yang anda undang. 
            </ParagraphDashboard>
          </div>
          <Link to="#"
            className="flex items-center gap-4 font-medium text-primary underline"
          >
            <span>Lihat semua</span>
            <HiOutlineArrowLongRight className="text-2xl" />
          </Link>
        </div>
        <Table>
          <Table.Heading>
            {["Date", "Trader", "Broker", "Nomor Akun Trading", "Rebate", "Komisi"].map((header, idx) => (
              <Table.HeadingItem key={idx} className="text-nowrap py-3!">
                {header}
              </Table.HeadingItem>
            ))}
          </Table.Heading>

          <Table.Body>
            {dataEarnings.map((data, idx) => (
              <Table.Row key={idx}>
                {Object.values(data).map((item, index) => (
                  <Table.Cell key={index} rowIndex={idx} className="py-2! text-nowrap">
                    {item}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    </WrapperDashboardComponent>
  )
}

export default OverviewAffiliator;

// TODO: Pagination, search get, filter status

import { BrokerAPI } from "@/api";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import StatusTag from "@/components/dashboard/common/StatusTag";
import TinyButton from "@/components/dashboard/common/TinyButton";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import Table from "@/components/TableLayout";
import ModalDeleteData from "@/components/ui/ModalDeleteData";
import Spinner from "@/components/ui/Spinner";
import Tooltip from "@/components/ui/Tooltip";
import { formattingFullDate } from "@/helper/formattingDate";
import { getLocalizedPath } from "@/helper/pathHelper";
import { useBrokerUserContext } from "@/hooks/useBrokerUserContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HEADER_TABLE = [
  {key: "name", header: "Broker"}, 
  {key: "accountNumber", header: "Nomor Akun Trading"}, 
  {key: "rebate", header: "Total Rebate"}, 
  {key: "status", header: "Status"}, 
  {key: "createdAt", header: "Tanggal Dibuat"}, 
  {key: "action", header: "Aksi"}
];

const ConnectedBrokerPage = () => {
  const { i18n } = useTranslation();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [querySearch, setQuerySearch] = useState<string>("");
  const [showPopupDelete, setShowPopupDelete] = useState<boolean>(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const { brokersUser, fetchBrokerUser } = useBrokerUserContext();
 
  const fetchInitData = async () => {
    setIsLoading(true);
    await fetchBrokerUser();
    setIsLoading(false);
  };
  const fetchData = async () => {
    setIsLoading(true);
    await fetchBrokerUser(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInitData();
    setInitLoad(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteBroker = async (brokerId: number) => {
    const { error, message } =  await BrokerAPI.deleteBrokerByUser({ brokerId });

    if (error) {
      toast.error(message);
    } else {
      await fetchData();
      toast.success(message);
    }
    setShowPopupDelete(false);
  }

  return (
    <WrapperDashboardComponent>
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start gap-3">
          <div>
            <TitleDashboard>
              Connected Brokers
            </TitleDashboard>
            <ParagraphDashboard>
              Daftar seluruh broker yang terkoneksi dengan akun Anda dan pantau status koneksi dan perolehan komisi rebate Anda. {" "}
              <Link to={getLocalizedPath("broker", i18n.language)}
                className="text-primary underline"
              >
                Lihat detail setiap broker
              </Link>.
            </ParagraphDashboard>
          </div>
          <TinyButton 
            buttonType="link" 
            icon={<IoIosAdd className="text-2xl" />} 
            iconPosition="left"
            urlTo={getLocalizedPath("trader/broker/connect", i18n.language)}
          >
            Tambah Broker
          </TinyButton>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="py-1 px-2 flex flex-1 items-center gap-2 w-full bg-white border border-[#D2CEE1] rounded-sm max-w-full lg:max-w-[456px]">
              <label htmlFor="search" className="cursor-pointer">
                <CiSearch className="text-2xl text-[#7E7E7E]" />
              </label>
              <input
                id="search"
                name="search"
                placeholder="Cari nama broker dan nomor akun trading"
                value={querySearch}
                onChange={(e) => setQuerySearch(e.target.value)}
                type="text"
                autoComplete="off"
                className="w-full text-base placeholder:text-[rgba(0,0,0,0.6)] focus:outline-0 placeholder:text-ellipsis placeholder:line-clamp-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative inline-block">
                <select 
                  name="status" 
                  id="status" 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-2 pr-8 py-1 text-base text-black/80 bg-white border border-[#CED4DA] rounded-md appearance-none focus:outline-primary"
                >
                  {[
                    {key: "all", value: "Semua status"}, 
                    {key: "pending", value: "Pending"},
                    {key: "rejected", value: "Rejected"}, 
                    {key: "approved", value: "Approved"}].map((item) => (
                    <option key={item.key} value={item.value}>{item.value}</option>
                  ))}
                </select>
                <FaChevronDown 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-black/60"
                />
              </div>
              <Tooltip 
                disabled={false}
                icon={<LuRefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />} 
                handleClick={() => fetchData()} 
                detail={"Reload Data"} />
                <div className="flex">
                  <button
                    onClick={() => {}}
                    disabled={true}
                    className="p-2 rounded-l-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => {}}
                    disabled={false}
                    className="p-2 rounded-r-md bg-white border border-[#D2CEE1] text-black/60 place-items-center cursor-pointer hover:bg-black/5 transition-all duration-300 ease-out disabled:opacity-60 disabled:hover:bg-black/0 disabled:cursor-auto"
                  >
                    <FaChevronRight />
                  </button>
                </div>
            </div>

          </div>
        </div>
        <Table>
          <Table.Heading>
            {HEADER_TABLE.map((header, idx) => (
              <Table.HeadingItem key={idx} className="text-nowrap py-3!">
                {header.header}
              </Table.HeadingItem>
            ))}

          </Table.Heading>
          
          <Table.Body>
            {brokersUser.length > 0 && brokersUser.map((data, idx) => (
              <Table.Row key={idx}>
                {HEADER_TABLE.map((header, index) => {
                  let value;
                  if (header.key === "rebate") {
                    value = "$90.00";
                  } else if (header.key === "createdAt") {
                    value = formattingFullDate(data.createdAt)
                  } else if (header.key === "action") {
                    return (
                    <Table.Cell key={index} rowIndex={idx} className="py-2! align-middle!">
                      <FaTrash
                        onClick={() => {
                          setSelectedBrokerId(data.connectionId);
                          setShowPopupDelete(true);
                        }} 
                        className="text-base text-black/60 cursor-pointer" />
                    </Table.Cell>)
                  } else if (header.key === "status") {
                    value = data.status === "pending" ? "Verifying" : data.status === "approved" ? "Connected" : "Rejected";
                    return ( 
                    <Table.Cell key={index} rowIndex={idx} className="py-2! align-middle!">
                      <StatusTag status={data.status} text={value} />
                    </Table.Cell>)
                  } else {
                    value = data[header.key as keyof typeof data];
                  }

                  return <Table.Cell key={index} rowIndex={idx} className="py-2! text-nowrap">
                    {value}
                  </Table.Cell>
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        {brokersUser.length === 0 &&
          <div className="mt-4 flex flex-col items-center justify-center w-full h-fit">
            {initLoad || isLoading ?
              <Spinner />
            :
              <>
                <div className="text-center">
                  <p className="text-black/80">Belum ditemukan data broker yang terhubung. {" "}
                    <Link to={getLocalizedPath("trader/broker/connect", i18n.language)}
                      className="text-primary underline"
                    >Hubungkan broker.</Link>
                  </p>
                </div>
              </>
            }
          </div>
        }
      </section>

      {showPopupDelete && <ModalDeleteData
        title="Hapus koneksi broker"
        paragraph="Tindakan ini akan menghapus koneksi broker secara permanen dan tidak dapat dibatalkan."
        handleDelete={async () => {
          if (selectedBrokerId) {
            await handleDeleteBroker(selectedBrokerId);
          }
        }} 
        isVisible={showPopupDelete} 
        handleClose={() => {
          setSelectedBrokerId(null);
          setShowPopupDelete(false);
        }}          
      />}
    </WrapperDashboardComponent>
  )
}

export default ConnectedBrokerPage;

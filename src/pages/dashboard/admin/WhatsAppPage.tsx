import { useEffect, useState } from "react";

import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import CardOverview from "@/components/dashboard/common/CardOverview";

import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "react-toastify";

import { AdminAPI } from "@/api";
import StatusTag from "@/components/dashboard/common/StatusTag";
import { GoDotFill } from "react-icons/go";
import Button from "@/components/ui/Button";

const WhatsAppPage = () => {
  const [qr, setQr] = useState<string>("");
  const [status, setStatus] = useState<string>("disconnected");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // =========================
  // 🔥 POLLING STATUS REST
  // =========================
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await AdminAPI.statusWhatsApp();

        if (!res.error && res.data) {
          const { status, qr } = res.data;
          setStatus(status || "disconnected");
          if (qr) {
            setQr(qr);
          }
          if (status === "connected") {
            setQr("");
          }
        }
      } catch (err) {
          console.log("STATUS ERROR:", err);
      }
    };

    fetchStatus(); // initial call
    const interval = setInterval(fetchStatus, 3000); // polling tiap 3 detik
    return () => clearInterval(interval);
  }, []);

  // =========================
  // CONNECT & DISCONNECT WHATSAPP
  // =========================
  const connectWA = async () => {
    try {
      setIsLoading(true);
      const res = await AdminAPI.connectWhatsApp();
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed connect WhatsApp");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWA = async () => {
    try {
      setIsLoading(true);
      const res = await AdminAPI.disconnectWhatsApp();
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed disconnect WhatsApp");
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // STATUS UI
  // =========================
  const getStatusColor = () => {
    if (status === "connected") return "active";
    if (status === "scan_qr") return "warning";
    return "warning";
  };

  const getStatusText = () => {
    if (status === "connected") return "Connected";
    if (status === "scan_qr") return "Scan QR";
    if (status === "connecting") return "Connecting";
    return "Disconnected";
  };

  return (
    <WrapperDashboardComponent>
      {/* HEADER */}
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <TitleDashboard>
            WhatsApp Management
          </TitleDashboard>
          <ParagraphDashboard maxW="w-full">
            Monitoring realtime WhatsApp connection and incoming messages.
          </ParagraphDashboard>
        </div>
        <div className="h-fit">
          <StatusTag 
            status={status === "connected" ? "approved" : status ==="" ? "rejected" : "pending"} 
            text={getStatusText()} 
            icon={<GoDotFill />}
          />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* STATUS */}
          <div className="h-fit">
            <CardOverview
              title="Connection Status"
              content={getStatusText()}
              detail="REST API Mode"
              icon={<FaWhatsapp />}
              status={getStatusColor()}
            />
          </div>
          {/* CONNECTION */}
          <div className="p-5 col-span-1 lg:col-span-2 bg-white rounded-xl border border-[#DDDDDD] h-fit">
            <div className="flex flex-col md:flex-row gap-y-4 items-start md:items-center justify-between">
              <div>
                <h2 className="text-base 3xl:text-lg font-semibold">
                  WhatsApp Connection
                </h2>
                <p className="text-sm 3xl:text-base text-gray-500">
                  Connect WhatsApp account menggunakan QR code
                </p>
              </div>
              <Button
                variant={status === "connected" ? "danger" : "primary-light"}
                onClick={() => {
                  if (status === "connected") {
                    disconnectWA();
                  } else {
                    connectWA();
                  }
                }}
                disabled={isLoading}
                loading={isLoading}
                className="py-3! px-5! text-base! font-medium!"
              >
                {
                  status === "connected"
                    ? "Disconnect"
                    : "Connect WhatsApp"
                }
              </Button>
            </div>

            {/* QR */}
            {
              qr && (
                <div className="mt-5 flex justify-center">
                  <div className="border rounded-xl p-4 bg-white">
                    <img src={qr} alt="QR Code" className="w-72" />
                  </div>
                </div>
              )
            }

            {/* CONNECTED */}
            {
              status === "connected" && (
                <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-green-700 font-medium">
                    WhatsApp Connected Successfully
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </WrapperDashboardComponent>
  );
};

export default WhatsAppPage;

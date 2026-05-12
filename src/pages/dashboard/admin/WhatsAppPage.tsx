import { useEffect, useState } from "react";

import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import CardOverview from "@/components/dashboard/common/CardOverview";

import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "react-toastify";

import { AdminAPI } from "@/api";

// type MessageType = {
//     jid: string;
//     text: string;
//     fromMe: boolean;
// };

const WhatsAppPage = () => {

    const [qr, setQr] = useState<string>("");
    const [status, setStatus] = useState<string>("disconnected");
    // const [messages] = useState<MessageType[]>([]);
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
    // CONNECT WHATSAPP
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
            console.log(error);
            toast.error("Failed connect WhatsApp");
        } finally {
            setIsLoading(false);
        }
    };

    // =========================
    // FORMAT JID
    // =========================
    // const formatJid = (jid: string) => {

    //     if (!jid) return "-";

    //     if (jid.includes("@g.us")) return "GROUP";
    //     if (jid.includes("status@broadcast")) return "STATUS";

    //     const id = jid.split("@")[0];

    //     if (id.length <= 6) return "******";

    //     return `${id.slice(0, 4)}*****${id.slice(-3)}`;
    // };

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

            <div className="space-y-5">

                {/* HEADER */}
                <div>
                    <TitleDashboard>
                        WhatsApp Management
                    </TitleDashboard>

                    <ParagraphDashboard maxW="w-full">
                        Monitoring realtime WhatsApp connection and incoming messages.
                    </ParagraphDashboard>
                </div>

                {/* STATUS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    <CardOverview
                        title="Connection Status"
                        content={getStatusText()}
                        detail="REST API Mode"
                        icon={<FaWhatsapp />}
                        status={getStatusColor()}
                    />

                </div>

                {/* CONNECTION */}
                <div className="bg-white rounded-xl border p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-semibold">
                                WhatsApp Connection
                            </h2>

                            <p className="text-sm text-gray-500">
                                Connect WhatsApp account menggunakan QR code
                            </p>
                        </div>

                        <button
                            onClick={connectWA}
                            disabled={isLoading || status === "connected"}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                        >
                            {
                                isLoading
                                    ? "Connecting..."
                                    : status === "connected"
                                        ? "Connected"
                                        : "Connect WhatsApp"
                            }
                        </button>

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

                {/* MESSAGES (OPTIONAL MOCK / EXTEND LATER) */}
                {/* <div className="bg-white rounded-xl border p-5">

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">
                            Incoming Messages
                        </h2>
                        <p className="text-sm text-gray-500">
                            (REST mode tidak realtime — butuh polling tambahan endpoint messages)
                        </p>
                    </div>

                    {
                        messages.length === 0 && (
                            <div className="text-center text-gray-400 py-10">
                                No messages (REST mode)
                            </div>
                        )
                    }

                </div> */}

            </div>

        </WrapperDashboardComponent>
    );
};

export default WhatsAppPage;
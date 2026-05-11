import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { SOCKET_URL } from "@/services/apiClient";
import WrapperDashboardComponent from "@/components/dashboard/common/WrapperDashboardComponent";
import TitleDashboard from "@/components/dashboard/common/TitleDashboard";
import ParagraphDashboard from "@/components/dashboard/common/ParagraphDashboard";
import CardOverview from "@/components/dashboard/common/CardOverview";

import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "react-toastify";

import { AdminAPI } from "@/api";

type MessageType = {
    jid: string;
    text: string;
    fromMe: boolean;
};

const WhatsAppPage = () => {

    const [qr, setQr] = useState<string>("");
    const [status, setStatus] = useState<string>("disconnected");
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const socketRef = useRef<any>(null);
    
    useEffect(() => {

        if (socketRef.current) return;

        const token = localStorage.getItem("token");

        const socketInstance = io(SOCKET_URL, {
            auth: {
                token
            },
            transports: ["websocket"]
        });

        // SOCKET CONNECT
        socketInstance.on("connect", () => {

            console.log("SOCKET CONNECTED");
            // console.log(socketInstance.id);
            socketInstance.emit("wa_status:get");
        });

        // SOCKET ERROR
        socketInstance.on("connect_error", (err) => {

            // console.log("SOCKET ERROR");
            // console.log(err.message);

            toast.error(err.message);

        });

        // SOCKET DISCONNECT
        socketInstance.on("disconnect", () => {

            console.log("SOCKET DISCONNECTED");

        });

        // QR EVENT
        socketInstance.on("wa_qr", (data) => {

            // console.log("QR EVENT");
            // console.log(data);

            if (data?.qr) {
                setQr(data.qr);
            }

        });

        // STATUS EVENT
        socketInstance.on("wa_status", (data) => {

            // console.log("STATUS EVENT");
            // console.log(data);

            setStatus(data.status);

            if (data.status === "connected") {

                setQr("");

                toast.success("WhatsApp Connected");

            }

            // kalau disconnected kosongkan qr
            if (data.status === "disconnected") {

                setQr("");

                toast.error("WhatsApp Disconnected");

            }

        });

        // MESSAGE EVENT
        socketInstance.on("wa_message", (data) => {

            // console.log("MESSAGE EVENT");
            // console.log(data);

            // skip pesan kosong
            if (!data.text) {
                return;
            }

            setMessages((prev) => [
                data,
                ...prev
            ]);

        });

        return () => {

            socketInstance.disconnect();

        };

    }, []);

    // CONNECT WHATSAPP
    const connectWA = async () => {

        try {

            setIsLoading(true);

            const {
                error,
                message
            } = await AdminAPI.connectWhatsApp();

            if (error) {

                toast.error(message);

            } else {

                toast.success(message);

            }

        } catch (error) {

            console.log(error);

            toast.error("Failed connect WhatsApp");

        } finally {

            setIsLoading(false);

        }

    };

    // FORMAT JID
    const formatJid = (jid: string) => {

        if (!jid) {
            return "-";
        }

        // GROUP
        if (jid.includes("@g.us")) {
            return "GROUP";
        }

        // STATUS
        if (jid.includes("status@broadcast")) {
            return "STATUS";
        }

        const id = jid.split("@")[0];

        // sensor id
        if (id.length <= 6) {
            return "******";
        }

        const first = id.slice(0, 4);
        const last = id.slice(-3);

        return `${first}*****${last}`;
    };

    // STATUS COLOR
    const getStatusColor = () => {

        if (status === "connected") {
            return "active";
        }

        if (status === "scan_qr") {
            return "warning";
        }

        return "warning";

    };

    // STATUS TEXT
    const getStatusText = () => {

        if (status === "connected") {
            return "Connected";
        }

        if (status === "scan_qr") {
            return "Scan QR";
        }

        if (status === "connecting") {
            return "Connecting";
        }

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
                        detail="Realtime WhatsApp"
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
                            disabled={
                                isLoading ||
                                status === "connected"
                            }
                            className="
                                bg-green-500
                                hover:bg-green-600
                                transition-all
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                disabled:opacity-50
                            "
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

                                    <img
                                        src={qr}
                                        alt="QR Code"
                                        className="w-72"
                                    />

                                </div>

                            </div>
                        )
                    }

                    {/* CONNECTED INFO */}
                    {
                        status === "connected" && (
                            <div className="mt-5">

                                <div
                                    className="
                                        bg-green-50
                                        border
                                        border-green-200
                                        rounded-xl
                                        p-4
                                        text-center
                                    "
                                >
                                    <p className="text-green-700 font-medium">
                                        WhatsApp Connected Successfully
                                    </p>
                                </div>

                            </div>
                        )
                    }

                </div>

                {/* MESSAGE */}
                <div className="bg-white rounded-xl border p-5">

                    <div className="mb-4">

                        <h2 className="text-lg font-semibold">
                            Incoming Messages
                        </h2>

                        <p className="text-sm text-gray-500">
                            Realtime WhatsApp messages
                        </p>

                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-auto">

                        {
                            messages.length === 0 && (
                                <div className="text-center text-gray-400 py-10">
                                    No messages
                                </div>
                            )
                        }

                        {
                            messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className="
                                        border
                                        rounded-xl
                                        p-4
                                        bg-gray-50
                                    "
                                >

                                    <div className="flex items-center justify-between">

                                        <p className="font-medium">
                                            {formatJid(msg.jid)}
                                        </p>

                                        <span
                                            className="
                                                text-xs
                                                px-2
                                                py-1
                                                rounded-full
                                                bg-gray-200
                                            "
                                        >
                                            {
                                                msg.fromMe
                                                    ? "From Me"
                                                    : "Incoming"
                                            }
                                        </span>

                                    </div>

                                    <p className="mt-2 text-sm text-gray-700 break-all">
                                        {msg.text}
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </WrapperDashboardComponent>
    );
};

export default WhatsAppPage;
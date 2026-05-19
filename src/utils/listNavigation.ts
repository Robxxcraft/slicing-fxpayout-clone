import { FaUser, FaUsers } from "react-icons/fa6";
import type { UserRole } from "@/types/user.type";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BsBank2 } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { TbChartHistogram } from "react-icons/tb";
import { IoCardOutline, IoWalletOutline } from "react-icons/io5";
import { RiStockFill } from "react-icons/ri";
import type { NavigationLink, NavSideDashboardSection, SectionsRebateForex, SubNavigationList } from "@/types/navigationBar.type";
import { LuDatabase } from "react-icons/lu";

const claimRebateSuNav: SubNavigationList[] = [
  { code: "definition", title: "Apa itu Rebate Forex?", url: '/rebate-forex#' },
  { code: "howRebate", title: "Cara Mendapatkan Rebate Forex", url: '/rebate-forex#how-to-rebate' },
  { code: "howWorks", title: "Bagaimana Cara Kerjanya?", url: '/rebate-forex#how-it-works' },
  { code: "payment", title: "Sistem Pembayaran Rebate", url: '/rebate-forex#payment' },
  { code: "schedule", title: "Jadwal Rebate", url: '/rebate-forex#schedule' },
];

const serviceSubNav: SubNavigationList[] = [
  { code: "validation", title: "Validasi Akun", url: '/validation' },
  { code: "transfer", title: "Pindah Akun", url: '/transfer' },
  { code: "affiliate", title: "Affiliate", url: '#' },
];

export const listNavigation: NavigationLink[] = [
  {
    code: "home",
    title: "Home",
    url: "/",
  },
  {
    code: "broker",
    title: "Broker",
    url: "/broker",
  },
  {
    code: "news",
    title: "News",
    url: "/news",
  },
  {
    code: "calculator",
    title: "Kalkulator",
    url: "/calculator",
  },
  {
    code: "claimRebate",
    title: "Klaim Rebate",
    url: "#",
    sublist: claimRebateSuNav
  },
  {
    code: "service",
    title: "Layanan",
    url: "#",
    sublist: serviceSubNav
  },
];

export const listNavigationBrokers: NavigationLink[] = [
  { code: "profil", title: "Profil", url: "#profil" },
  { code: "summary", title: "Ringkasan", url: "#ringkasan" },
  { code: "accountType", title: "Jenis Akun", url: "#jenis-akun" },
  { code: "spreadCommission", title: "Spread & Komisi", url: "#spread-komisi" },
  { code: "advantage", title: "Keunggulan", url: "#keunggulan" },
  { code: "platform", title: "Platform", url: "#platform" },
  { code: "depositWithdraw", title: "Deposit & Withdraw", url: "#deposit-withdraw" },
  { code: "advantagesDisadvantages", title: "Kelebihan & Kekurangan", url: "#kelebihan-kekurangan" },
  { code: "rating", title: "Rating", url: "#rating" },
  { code: "faq", title: "FAQ", url: "#faq" },
];

export const listNavigationNews: NavigationLink[] = [
  { code: "latest", title: "Terbaru", url: "#" },
  { code: "popular", title: "Populer", url: "#" },
  { code: "breakingNews", title: "Breaking News", url: "#" },
  { code: "crypto", title: "Cripto", url: "#" },
  { code: "stocks", title: "Saham", url: "#" },
  { code: "commodity", title: "Komoditas", url: "#" },
  { code: "economy", title: "Ekonomi", url: "#" },
  { code: "company", title: "Perusahaan", url: "#" },
  { code: "world", title: "Dunia", url: "#" },
];

export const listSectionsRebateForex: SectionsRebateForex[] = [
  { code: "definition", id: "definition", name: "Apa itu Rebate Forex?" },
  { code: "howRebate", id: "how-to-rebate", name: "Cara Mendapatkan Rebate Forex" },
  { code: "howWorks", id: "how-it-works", name: "Bagaimana Cara Kerjanya?" },
  { code: "payment", id: "payment", name: "Sistem Pembayaran Rebate" },
  { code: "schedule", id: "schedule", name: "Jadwal Rebate" },
];

export const NAV_DASHBOARD_CONFIG: Record<UserRole, NavSideDashboardSection[]> = {
  user: [
    {
      title: "Content Management",
      items: [
        { key: "overview", label: "Overview", path: "/trader/overview", icon: RiDashboardHorizontalFill },
        { key: "broker", label: "Broker", path: "/trader/broker", icon: BsBank2 },
        { key: "rebate", label: "History Rebate", path: "/trader/rebate", icon: TbChartHistogram },
      ],
    },
    {
      title: "Withdrawal",
      items: [
        { key: "withdrawal", label: "Withdrawal Funds", path: "/trader/withdrawal", icon: IoCardOutline },
        { key: "history", label: "Transaction History", path: "/trader/withdrawal/history", icon: IoWalletOutline },
      ],
    },
    {
      title: "Settings",
      items: [
        { key: "profile", label: "Profil", path: "/trader/profile", icon: FaUser },
      ],
    },
  ],
  affiliator: [
    {
      title: "Content Management",
      items: [
        { key: "overview", label: "Overview", path: "/affiliator/overview", icon: RiDashboardHorizontalFill },
        { key: "traders", label: "Traders", path: "/affiliator/traders", icon: FaUser },
        { key: "performance", label: "Performance", path: "/affiliator/performance", icon: RiStockFill },
      ],
    },
    {
      title: "Withdrawal",
      items: [
        { key: "withdrawal", label: "Withdrawal Funds", path: "/affiliator/withdrawal", icon: IoCardOutline },
        { key: "history", label: "Transaction History", path: "/affiliator/withdrawal/history", icon: IoWalletOutline },
      ],
    },
    {
      title: "Settings",
      items: [
        { key: "profile", label: "Profil", path: "/affiliator/profile", icon: FaUser },
      ],
    },
  ],
  admin: [
    {
      title: "Main Content",
      items: [
        { key: "overview", label: "Overview", path: "/dashboard/overview", icon: RiDashboardHorizontalFill },
        { key: "affiliators", label: "Affiliators", path: "/dashboard/affiliators", icon: FaUsers },
        { key: "traders", label: "Traders", path: "/dashboard/traders", icon: FaUsers },
        { key: "rebates", label: "Rebates", path: "/dashboard/rebates", icon: RiStockFill },
        { key: "brokers", label: "Brokers", path: "/dashboard/brokers", icon: BsBank2 },
        { key: "banks", label: "Banks", path: "/dashboard/banks", icon: IoCardOutline },
      ]
    },
    {
      title: "Transaction",
      items: [
        { key: "withdrawals", label: "Withdrawals", path: "/dashboard/withdrawals", icon: IoWalletOutline },
        { key: "import-rebate", label: "Import Rebate", path: "/dashboard/rebates/import", icon: LuDatabase },
      ]
    },
    {
      title: "Settings",
      items: [
        { key: "profile", label: "Profil", path: "/dashboard/profile", icon: FaUser },
        { key: "whatsapp", label: "WhatsApp", path: "/dashboard/whatsapp", icon: FaWhatsapp },
      ],
    },
  ]
};

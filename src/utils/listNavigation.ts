export type NavigationLink = {
  code: string;
  title: string;
  url: string;
  sublist?: SubNavigationList[];
};

type SubNavigationList = {
  code: string;
  title: string;
  url: string
}

type SectionsRebateForex = {
  id: string;
  name: string
}

const claimRebateSuNav: SubNavigationList[] = [
  { code: "definition", title: "Apa itu Rebate Forex?", url: '/rebate-forex#' },
  { code: "howRebate", title: "Cara Mendapatkan Rebate Forex", url: '/rebate-forex#how-to-rebate' },
  { code: "howWorks", title: "Bagaimana Cara Kerjanya?", url: '/rebate-forex#how-it-works' },
  { code: "payment", title: "Sistem Pembayaran Rebate", url: '/rebate-forex#payment' },
  { code: "shcedule", title: "Jadwal Rebate", url: '/rebate-forex#schedule' },
];

const serviceSubNav: SubNavigationList[] = [
  { code: "validation", title: "Validasi Akun", url: '/validation' },
  { code: "transfer", title: "Pindah Akun", url: '/transfer' },
]

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
  { code: "spreadComission", title: "Spread & Komisi", url: "#spread-komisi" },
  { code: "advantage", title: "Keunggulan", url: "#keunggulan" },
  { code: "platform", title: "Platform", url: "#platform" },
  { code: "depositWithdraw", title: "Deposit & Withdraw", url: "#deposit-withdraw" },
  { code: "advantagesDisadvantages", title: "Kelebihan & Kekurangan", url: "#kelebihan-kekurangan" },
  { code: "rating", title: "Rating", url: "#rating" },
  { code: "faq", title: "FAQ", url: "#faq" },
];

export const listSectionsRebateForex: SectionsRebateForex[] = [
  { id: "definition", name: "Apa itu Rebate Forex?" },
  { id: "how-to-rebate", name: "Cara Mendapatkan Rebate Forex" },
  { id: "how-it-works", name: "Bagaimana Cara Kerjanya?" },
  { id: "payment", name: "Sistem Pembayaran Rebate" },
  { id: "schedule", name: "Jadwal Rebate" },
];
export type NavigationLink = {
  title: string;
  url: string;
  sublist?: SubNavigationList[];
};

type SubNavigationList = {
  title: string;
  url: string
}

type SectionsRebateForex = {
  id: string;
  name: string
}

export const listNavigation: NavigationLink[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Broker",
    url: "/broker",
  },
  {
    title: "Kalkulator",
    url: "/calculator",
  },
  {
    title: "Klaim Rebate",
    url: "/rebate-forex#",
    sublist: [
      { title: "Apa itu Rebate Forex?", url: '/rebate-forex#' },
      { title: "Cara Mendapatkan Rebate Forex", url: '/rebate-forex#how-to-rebate' },
      { title: "Bagaimana Cara Kerjanya?", url: '/rebate-forex#how-it-works' },
      { title: "Sistem Pembayaran Rebate", url: '/rebate-forex#payment' },
      { title: "Jadwal Rebate", url: '/rebate-forex#schedule' },
    ]
  },
  {
    title: "Layanan",
    url: "#",
    sublist: [
      { title: "Validasi Akun", url: '/validation' },
      { title: "Pindah Akun", url: '/transfer' },
    ]
  },
];

export const listNavigationBrokers: NavigationLink[] = [
  { title: "Profil", url: "#profil" },
  { title: "Ringkasan", url: "#ringkasan" },
  { title: "Jenis Akun", url: "#jenis-akun" },
  { title: "Spread & Komisi", url: "#spread-komisi" },
  { title: "Keunggulan", url: "#keunggulan" },
  { title: "Platform", url: "#platform" },
  { title: "Deposit & Withdraw", url: "#deposit-withdraw" },
  { title: "Kelebihan & Kekurangan", url: "#kelebihan-kekurangan" },
  { title: "Rating", url: "#rating" },
  { title: "FAQ", url: "#faq" },
];

export const listSectionsRebateForex: SectionsRebateForex[] = [
  { id: "definition", name: "Apa itu Rebate Forex?" },
  { id: "how-to-rebate", name: "Cara Mendapatkan Rebate Forex" },
  { id: "how-it-works", name: "Bagaimana Cara Kerjanya?" },
  { id: "payment", name: "Sistem Pembayaran Rebate" },
  { id: "schedule", name: "Jadwal Rebate" },
];
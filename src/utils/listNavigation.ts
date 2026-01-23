export type NavigationLink = {
  title: string;
  url: string;
  sublist?: SubNavigationList[];
};

type SubNavigationList = {
  title: string;
  url: string
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
    url: "#",
    sublist: [
      { title: "Rebate Forex", url: '/rebate-forex' },
      { title: "Jadwal Rebate", url: '/schedule' },
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

export type BrokerPartner = {
  image_profil: string;
  username: string;
  description: string;
  urlDetail: string;
  urlRegister: string;
  instruments: InstrumenBroker;
};

type InstrumenBroker = {
  eur: number;
  xau: number;
  aud: number;
};

export const brokerPartners: BrokerPartner[] = [
  {
    image_profil: "exness.png",
    username: "Exness",
    description:
      "Broker ECN premium untuk scalper & EA. Likuiditas dalam & komisi stabil.",
    urlDetail: "exness",
    urlRegister: "https://one.exnessonelink.com/a/8cegzmlbpk",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "ic_markets.png",
    username: "IC Markets",
    description:
      "Broker global dengan eksekusi cepat & spread rendah. Akun Raw/Zero populer untuk rebate tinggi.",
    urlDetail: "ic-markets",
    urlRegister: "#",
    instruments: {
      eur: 8,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "pepperstone.png",
    username: "Pepperstone",
    description:
      "Broker regulasi top dengan eksekusi sangat cepat dan kondisi raw spread.",
    urlDetail: "pepperstone",
    urlRegister: "#",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "tickmill.png",
    username: "Tickmill",
    description:
      "Broker ECN terkenal dengan komisi rendah dan rebate kompetitif.",
    urlDetail: "tickmill",
    urlRegister: "#",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "fp_markets.png",
    username: "FP Markets",
    description:
      "Broker ECN Australia dengan eksekusi cepat & kondisi pro-trader.",
    urlDetail: "fp-markets",
    urlRegister: "#",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "xm.png",
    username: "XM",
    description:
      "Broker global dengan akun XM Zero berkomisi tinggi sehingga rebate besar.",
    urlDetail: "xm",
    urlRegister: "#",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "eightcap.png",
    username: "Eightcap",
    description: "Broker ECN cepat, terintegrasi TradingView & kompatibel EA.",
    urlDetail: "eightcap",
    urlRegister: "#",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "vantage.png",
    username: "Vantage",
    description:
      "Broker ECN memiliki spread rendah, populer di Asia & Australia.",
    urlDetail: "vantage",
    urlRegister: "#",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
  {
    image_profil: "axi.png",
    username: "Axi",
    description: "Broker global dengan fokus pada keamanan & eksekusi stabil.",
    urlDetail: "axi",
    urlRegister: "#",
    instruments: {
      eur: 6,
      xau: 10,
      aud: 5,
    },
  },
];

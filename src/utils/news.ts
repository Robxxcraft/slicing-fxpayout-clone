export type NewsState = {
  id: number;
  cover?: string | undefined;
  title: string;
  category: string;
  excerpt: string;
  url: string;
  createdAt: string;
  user: {
    profile: string;
    username: string;
  }
}

export const featuredNews: NewsState[] = [
  {
    id: 1,
    cover: "2942502c7519cbbc826e9418ef774c2a9d40d6ac.png",
    title: "The Federal Reserve Signals Possible Rate Cut as Inflation Continues to Cool",
    category: "economy",
    excerpt: "The Federal Reserve hinted at a potential interest rate cut later this year as inflation data shows signs of slowing. Investors are closely watching upcoming economic indicators to confirm the central bank’s next move.",
    url: "#",
    createdAt: "newspage:time.minutesAgo",
    user: {
      profile: "FXPayout.png",
      username: "FX Payout"
    }
  },
  {
    id: 2,
    cover: "1dccf46dc6e768270cb259a05fa34dc5f5a667ed.png",
    title: "Gold Prices Rise Amid Global Economic Uncertainty",
    category: "commodity",
    excerpt: "Gold prices moved higher as investors turned to safe-haven assets amid concerns about global economic growth.",
    url: "#",
    createdAt: "newspage:time.minutesAgo",
    user: {
      profile: "FXPayout.png",
      username: "FX Payout"
    }
  },
  {
    id: 3,
    cover: "26caeac28d9f4d20411a311ac1a3686a04fbfa72.png",
    title: "US Stock Market Closes Higher as Tech Stocks Rally",
    category: "stocks",
    excerpt: "Major U.S. stock indices closed higher as technology companies led the rally following strong earnings reports.",
    url: "#",
    createdAt: "newspage:time.minutesAgo",
    user: {
      profile: "cnn.png",
      username: "CNN"
    }
  },
  {
    id: 4,
    cover: "a44a81d76f8b450d2bc022ac17858607cd92dac8.png",
    title: "Oil Prices Stabilize After Volatile Week",
    category: "commodity",
    excerpt: "Crude oil prices stabilized after a volatile trading week influenced by supply concerns and geopolitical tensions.",
    url: "#",
    createdAt: "newspage:time.minutesAgo",
    user: {
      profile: "cnn.png",
      username: "CNN"
    }
  },
];

export const breakingNews: NewsState[] = [
  {
    id: 1,
    cover: "6289a7c853ec2f80536c0f9a9bead9782cdc0a61.png",
    title: "Bitcoin Surges Above $70,000 as Institutional Demand Grows",
    category: "crypto",
    excerpt: "Bitcoin climbed above the $70,000 level as institutional investors increased exposure to digital assets amid rising market optimism.",
    url: "#",
    createdAt: "11,newspage:time.march",
    user: {
      profile: "FXPayout.png",
      username: "FX Payout"
    }
  },
  {
    id: 2,
    cover: "1dccf46dc6e768270cb259a05fa34dc5f5a667ed.png",
    title: "Gold Prices Rise Amid Global Economic Uncertainty",
    category: "commodity",
    excerpt: "Gold prices moved higher as investors turned to safe-haven assets amid concerns about global economic growth.",
    url: "#",
    createdAt: "10,newspage:time.march",
    user: {
      profile: "FXPayout.png",
      username: "FX Payout"
    }
  },
  {
    id: 3,
    cover: "26caeac28d9f4d20411a311ac1a3686a04fbfa72.png",
    title: "US Stock Market Closes Higher as Tech Stocks Rally",
    category: "stocks",
    excerpt: "Major U.S. stock indices closed higher as technology companies led the rally following strong earnings reports.",
    url: "#",
    createdAt: "10,newspage:time.march",
    user: {
      profile: "cnn.png",
      username: "CNN"
    }
  },
  {
    id: 4,
    cover: "a44a81d76f8b450d2bc022ac17858607cd92dac8.png",
    title: "Oil Prices Stabilize After Volatile Week",
    category: "commodity",
    excerpt: "Crude oil prices stabilized after a volatile trading week influenced by supply concerns and geopolitical tensions.",
    url: "#",
    createdAt: "9,newspage:time.march",
    user: {
      profile: "cnn.png",
      username: "CNN"
    }
  },
];

export const cryptoNews: NewsState[] = [
  {
    id: 1,
    cover: "2cda0580a9e63dd2385a5184bda0ab9ea4e26cfe.png",
    title: "Ethereum Network Upgrade Expected to Improve Transaction Efficiency",
    category: "crypto",
    excerpt: "Ethereum developers are preparing a network upgrade designed to improve transaction efficiency and reduce costs for users.",
    url: "#",
    createdAt: "10,newspage:time.march",
    user: {
      profile: "cnbc.png",
      username: "CNBC"
    }
  },
  {
    id: 2,
    cover: "dbf5cb56f2dd2af28a1cfa3e87161bd46a40f256.png",
    title: "Crypto Market Shows Signs of Recovery After Recent Correction",
    category: "crypto",
    excerpt: "The cryptocurrency market is showing signs of recovery after a recent correction triggered by macroeconomic concerns.",
    url: "#",
    createdAt: "10,newspage:time.march",
    user: {
      profile: "cnbc.png",
      username: "CNBC"
    }
  }
];

export const commodityNews: NewsState[] = [
  {
    id: 1,
    cover: "05232e059212b7c950b01193051697239e5cceeb.png",
    title: "Silver Demand Expected to Increase in Renewable Energy Sector",
    category: "commodity",
    excerpt: "Industrial demand for silver is expected to rise as renewable energy technologies expand worldwide.",
    url: "#",
    createdAt: "10,newspage:time.march",
    user: {
      profile: "FXPayout.png",
      username: "FX Payout"
    }
  },
  {
    id: 2,
    cover: "36be493fb4d7d9a1b3ef5d3cbee61673bf4f2baf.png",
    title: "Asian Markets Mixed as Investors Await Economic Data",
    category: "economy",
    excerpt: "Asian markets traded mixed as investors awaited key economic data from major economies.",
    url: "#",
    createdAt: "10,newspage:time.march",
    user: {
      profile: "FXPayout.png",
      username: "FX Payout"
    }
  }
];

export const plainNews: NewsState[] = [
  {
    id: 1,
    title: "Ethereum Network Upgrade Expected to Improve Transaction Efficiency",
    category: "crypto",
    excerpt: "Ethereum developers are preparing a network upgrade designed to improve transaction efficiency and reduce costs for users.",
    url: "#",
    createdAt: "8,newspage:time.march",
    user: {
      profile: "FXPayout.png",
      username: "FX Payout"
    }
  },
  {
    id: 2,
    title: "Crypto Market Shows Signs of Recovery After Recent Correction",
    category: "economy",
    excerpt: "The cryptocurrency market is showing signs of recovery after a recent correction triggered by macroeconomic concerns.",
    url: "#",
    createdAt: "9,newspage:time.march",
    user: {
      profile: "cnbc.png",
      username: "CNBC"
    }
  }
]

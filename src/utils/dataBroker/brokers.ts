import { axiDetail } from "./axi";
// import { eightcapDetail } from "./eightcap";
import { exnessDetail } from "./exness";
import { fbsDetail } from "./fbs";
import { finexDetail } from "./finex";
import { fpMarketsDetail } from "./fpMarkets";
import { hfmDetail } from "./hfm";
// import { icMarketDetail } from "./icMarket";
import { octaFxDetail } from "./octafx";
import { pepperstoneDetail } from "./perpperstone";
import { tickmillDetail } from "./tickmill";
import { tmgmDetail } from "./tmgm";
import { valetaxDetail } from "./valetax";
import { vantageDetail } from "./vantage";
import { xmDetail } from "./xm";
import { zfxDetail } from "./zfx";

export const brokers = {
  "tmgm": tmgmDetail,
  "exness": exnessDetail,
  "valetax": valetaxDetail,
  "xm": xmDetail,
  "hfm": hfmDetail,
  "zfx": zfxDetail,
  "fbs": fbsDetail,
  "octafx": octaFxDetail,
  "tickmill": tickmillDetail,
  "pepperstone": pepperstoneDetail,
  // "ic-markets": icMarketDetail,
  "fp-markets": fpMarketsDetail,
  // "eightcap": eightcapDetail,
  "vantage": vantageDetail,
  "axi": axiDetail,
  "finex": finexDetail,
}
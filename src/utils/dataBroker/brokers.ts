import { axiDetail } from "./axi";
import { eightcapDetail } from "./eightcap";
import { exnessDetail } from "./exness";
import { fbsDetail } from "./fbs";
import { finexDetail } from "./finex";
import { fpMarketsDetail } from "./fpMarkets";
import { hfmDetail } from "./hfm";
import { icMarketDetail } from "./icMarket";
import { oandaDetail } from "./oanda";
import { octaFxDetail } from "./octafx";
import { pepperstoneDetail } from "./perpperstone";
import { tickmillDetail } from "./tickmill";
import { vantageDetail } from "./vantage";
import { xmDetail } from "./xm";
import { zfxDetail } from "./zfx";

export const brokers = {
  "exness": exnessDetail,
  "hfm": hfmDetail,
  "fbs": fbsDetail,
  "octafx": octaFxDetail,
  "zfx": zfxDetail,
  "tickmill": tickmillDetail,
  "pepperstone": pepperstoneDetail,
  "ic-markets": icMarketDetail,
  "fp-markets": fpMarketsDetail,
  "xm": xmDetail,
  "eightcap": eightcapDetail,
  "vantage": vantageDetail,
  "axi": axiDetail,
  "finex": finexDetail,
  "oanda": oandaDetail,
}
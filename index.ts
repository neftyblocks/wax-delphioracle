import { CronJob } from "cron";
import { get_ticker as getBinanceTicker } from "./plugins/binance";
import { get_ticker as getKrakenTicker } from "./plugins/kraken";
import { get_ticker as getKucoinTicker } from "./plugins/kucoin";
import { type Quote, write } from "./plugins/delphioracle";
import { transact } from "./src/utils";
import { api, CRON_INTERVAL, ACCOUNT, AUTHORIZATION, DATA_SOURCE } from "./src/config";

async function getStableCoinPrices() {
  const [usdt, usdc] = await Promise.all([
    getKrakenTicker("USDTZUSD"),
    getKrakenTicker("USDCUSD"),
  ]);
  return { usdt, usdc };
}

async function getTickerPrices() {
  console.log(`Using data source: ${DATA_SOURCE}`);
  switch (DATA_SOURCE) {
    case "binance": {
      const [wax, btc, eth, eosUsd] = await Promise.all([
        getBinanceTicker("WAXPUSDT"),
        getBinanceTicker("BTCUSDT"),
        getBinanceTicker("ETHUSDT"),
        getBinanceTicker("EOSUSDT"),
      ]);
      return { wax, btc, eth, eosUsd };
    }
    case "kucoin": {
      const [wax, btc, eth, eosUsd] = await Promise.all([
        getKucoinTicker("WAX-USDT"),
        getKucoinTicker("BTC-USDT"),
        getKucoinTicker("ETH-USDT"),
        getKucoinTicker("EOS-USDT"),
      ]);
      return { wax, btc, eth, eosUsd };
    }
    default:
      throw new Error(`Unsupported data source: ${DATA_SOURCE}`);
  }
}

console.log(`Starting cron job with interval ${CRON_INTERVAL}`);
new CronJob(
  CRON_INTERVAL,
  async () => {
    const [{ usdt, usdc }, { wax, btc, eth, eosUsd }] = await Promise.all([
      getStableCoinPrices(),
      getTickerPrices(),
    ]);

    const usdtRate = Number(usdt.lastPrice);
    const usdcRate = Number(usdc.lastPrice);
    const waxRate = Number(wax.lastPrice) * Number(usdt.lastPrice);
    const btcRate = Number(wax.lastPrice) / Number(btc.lastPrice);
    const ethRate = Number(wax.lastPrice) / Number(eth.lastPrice);
    const eosRate = Number(wax.lastPrice) / Number(eosUsd.lastPrice);
    const quotes: Quote[] = [
      { pair: "usdtusd", value: to_uint(usdtRate, 4) },
      { pair: "usdcusd", value: to_uint(usdcRate, 4) },
      { pair: "waxpusd", value: to_uint(waxRate, 4) },
      { pair: "waxpbtc", value: to_uint(btcRate, 8) },
      { pair: "waxpeth", value: to_uint(ethRate, 8) },
      { pair: "waxpeos", value: to_uint(eosRate, 6) },
    ];
    try {
      await transact(api, [write(ACCOUNT, quotes, [AUTHORIZATION])]);
    } catch (error) {
      console.error(error);
    }
  },
  null,
  true
).fireOnTick();

function to_uint(num: string | number, exp: number) {
  return Number((Number(num) * 10 ** exp).toFixed(0));
}

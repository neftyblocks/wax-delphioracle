import { CronJob } from "cron";
import { get_ticker as getBitFinexTicker } from "./plugins/bitfinex";
import { get_ticker as getCryptoPricesTicker } from "./plugins/cryptoprices";
import { Quote, write } from "./plugins/delphioracle";
import { transact } from "./src/utils";
import { api, CRON_INTERVAL, ACCOUNT, AUTHORIZATION } from "./src/config";

console.log(`Starting cron job with interval ${CRON_INTERVAL}`);
new CronJob(
  CRON_INTERVAL,
  async () => {
    const [usd, btc, eth, eosUsd] = await Promise.all([
      getCryptoPricesTicker("WAXP"),
      getBitFinexTicker("tBTCUSD"),
      getBitFinexTicker("tETHUSD"),
      getBitFinexTicker("tEOSUSD"),
    ]);

    const btcRate = Number(usd.lastPrice) / Number(btc.lastPrice);
    const ethRate = Number(usd.lastPrice) / Number(eth.lastPrice);
    const eosRate = Number(usd.lastPrice) / Number(eosUsd.lastPrice);
    const quotes: Quote[] = [
      { pair: "waxpusd", value: to_uint(usd.lastPrice, 4) },
      { pair: "waxpbtc", value: to_uint(btcRate, 8) },
      { pair: "waxpeth", value: to_uint(ethRate, 8) },
      { pair: "waxpeos", value: to_uint(eosRate, 6) },
    ];
    console.log(quotes);
    await transact(api, [write(ACCOUNT, quotes, [AUTHORIZATION])]);
  },
  null,
  true
).fireOnTick();

function to_uint(num: string | number, exp: number) {
  return Number((Number(num) * 10 ** exp).toFixed(0));
}

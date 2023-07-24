import { CronJob } from "cron";
import { get_ticker as getBitFinexTicker } from "./plugins/bitfinex";
import { get_ticker as getCryptoPricesTicker } from "./plugins/cryptoprices";
import { get_ticker as getCryptoComTicker } from "./plugins/cryptocom";
import { Quote, write } from "./plugins/delphioracle";
import { transact } from "./src/utils";
import { api, CRON_INTERVAL, ACCOUNT, AUTHORIZATION } from "./src/config";

console.log(`Starting cron job with interval ${CRON_INTERVAL}`);
new CronJob(
  CRON_INTERVAL,
  async () => {
    const [usd, btc, eth, eosUsd] = await Promise.all([
      getCryptoComTicker("WAXP_USD"),
      getCryptoComTicker("BTC_USD"),
      getCryptoComTicker("ETH_USD"),
      getCryptoComTicker("EOS_USD"),
    ]);

    const btcRate = Number(usd.a) / Number(btc.a);
    const ethRate = Number(usd.a) / Number(eth.a);
    const eosRate = Number(usd.a) / Number(eosUsd.a);
    const quotes: Quote[] = [
      { pair: "waxpusd", value: to_uint(usd.a, 4) },
      { pair: "waxpbtc", value: to_uint(btcRate, 8) },
      { pair: "waxpeth", value: to_uint(ethRate, 8) },
      { pair: "waxpeos", value: to_uint(eosRate, 6) },
    ];
    await transact(api, [write(ACCOUNT, quotes, [AUTHORIZATION])]);
  },
  null,
  true
).fireOnTick();

function to_uint(num: string | number, exp: number) {
  return Number((Number(num) * 10 ** exp).toFixed(0));
}

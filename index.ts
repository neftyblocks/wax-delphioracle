import { CronJob } from "cron"
import { get_ticker } from "./plugins/bittrex"
import { Quote, write } from "./plugins/delphioracle"
import { transact } from "./src/utils";
import { api, CRON_INTERVAL, ACCOUNT, AUTHORIZATION } from "./src/config";

console.log(`Starting cron job with interval ${CRON_INTERVAL}`);
new CronJob(CRON_INTERVAL, async () => {
    const usd = await get_ticker("WAXP-USD");
    const btc = await get_ticker("WAXP-BTC");
    const eth = await get_ticker("WAXP-ETH");
    const eosUsd = await get_ticker("EOS-USD");
    const eosRate = Number(usd.lastTradeRate) / Number(eosUsd.lastTradeRate);
    const quotes: Quote[] = [
        { pair: "waxpusd", value: to_uint(usd.lastTradeRate, 4)},
        { pair: "waxpbtc", value: to_uint(btc.lastTradeRate, 8)},
        { pair: "waxpeth", value: to_uint(eth.lastTradeRate, 8)},
        { pair: "waxpeos", value: to_uint(eosRate, 6)}
    ]
    await transact( api, [ write( ACCOUNT, quotes, [ AUTHORIZATION ] )]);

}, null, true).fireOnTick();


function to_uint( num: string | number, exp: number ) {
    return Number((Number(num) * 10 ** exp).toFixed(0));
}
import fetch from "node-fetch";

interface Ticker {
  bid: number;
  bigSize: number;
  ask: number;
  askSize: number;
  dailyChange: number;
  dailyChangeRelative: number;
  lastPrice: number;
  volume: number;
  high: number;
  low: number;
}

export async function get_ticker(ticker: string): Promise<Ticker> {
  const url = `https://cryptoprices.cc/${ticker}`;
  const response = await fetch(url);
  const result = await response.text();
  console.log(result);
  return {
    bid: 0,
    bigSize: 0,
    ask: 0,
    askSize: 0,
    dailyChange: 0,
    dailyChangeRelative: 0,
    lastPrice: Number(result),
    volume: 0,
    high: 0,
    low: 0,
  } as Ticker;
}

// (async () => {
//     const foo = await get_ticker("WAXP-BTC")
//     console.log(foo);
// })()

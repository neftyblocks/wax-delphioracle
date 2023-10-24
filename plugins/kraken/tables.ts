import fetch from "node-fetch";

interface Ticker {
  bid: number;
  bidSize: number;
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
  const url = `https://api.kraken.com/0/public/Ticker?pair=${ticker}`;
  const response = await fetch(url);
  const data = (await response.json());
  const result = data.result[ticker];
  return {
    bid: +result.b[0],
    bidSize: +result.b[2],
    ask: +result.a[0],
    askSize: +result.a[2],
    dailyChange: 0,
    dailyChangeRelative: 0,
    lastPrice: +result.c[0],
    volume: +result.v[1],
    high: +result.h[1],
    low: +result.l[1],
  } as Ticker;
}

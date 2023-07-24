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
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`;
  const response = await fetch(url);
  const result = await response.json();
  return {
    bid: 0,
    bigSize: 0,
    ask: 0,
    askSize: 0,
    dailyChange: 0,
    dailyChangeRelative: 0,
    lastPrice: Number(result.price),
    volume: 0,
    high: 0,
    low: 0,
  } as Ticker;
}

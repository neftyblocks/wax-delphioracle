import fetch from "node-fetch";
import type { Ticker } from "../../src/types";

export async function get_ticker(ticker: string): Promise<Ticker> {
  const url = `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${ticker}`;
  const result = await fetch(url).then((res) => res.json());
  if (!result.data?.price) {
    throw new Error(`Invalid response from Kucoin ${ticker}`);
  }
  return {
    lastPrice: Number(result.data.price),
  };
}

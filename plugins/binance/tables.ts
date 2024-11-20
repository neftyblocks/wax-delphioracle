import fetch from "node-fetch";
import type { Ticker } from "../../src/types";

export async function get_ticker(ticker: string): Promise<Ticker> {
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`;
  const result = (await fetch(url).then((res) => res.json()));
  if (!result.price) {
    throw new Error(`Invalid response from Binance ${ticker}`);
  }
  return {
    lastPrice: Number(result.price),
  } as Ticker;
}

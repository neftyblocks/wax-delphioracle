import fetch from "node-fetch";
import type { Ticker } from "../../src/types";

export async function get_ticker(ticker: string): Promise<Ticker> {
  const url = `https://api.kraken.com/0/public/Ticker?pair=${ticker}`;
  const data = await fetch(url).then((res) => res.json());
  const result = data.result[ticker];
  if (!result.c) {
    throw new Error(`Invalid response from Kraken ${ticker}`);
  }
  return {
    lastPrice: +result.c[0],
  };
}

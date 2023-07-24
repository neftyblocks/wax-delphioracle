import fetch from "node-fetch";

interface Ticker {
  h: string;
  l: string;
  a: string;
  i: string;
  v: string;
  vv: string;
  oi: string;
  c: string;
  b: string;
  k: string;
  t: number;
}

export async function get_ticker(ticker: string): Promise<Ticker> {
  const url = `https://api.crypto.com/exchange/v1/public/get-tickers?instrument_name=${ticker}`;
  const response = await fetch(url);
  const result = await response.json();
  const [data] = result.result.data;
  return data;
}

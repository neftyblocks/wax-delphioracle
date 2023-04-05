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

export async function get_ticker( ticker: string ): Promise<Ticker> {
    const url = `https://api-pub.bitfinex.com/v2/ticker/${ticker}`;
    const response = await fetch( url );
    const [bid, bigSize, ask, askSize, dailyChange, dailyChangeRelative, lastPrice, volume, high, low] = await response.json();
    return {
        bid,
        bigSize,
        ask,
        askSize,
        dailyChange,
        dailyChangeRelative,
        lastPrice,
        volume,
        high,
        low
    } as Ticker;

}

// (async () => {
//     const foo = await get_ticker("WAXP-BTC")
//     console.log(foo);
// })()
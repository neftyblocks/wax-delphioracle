# WAX Delphi Oracle - Price feed

## Stable coin Sources

- Kraken: [USDT/USD](https://api.kraken.com/0/public/Ticker?pair=USDTZUSD)
- Kraken: [USDC/USD](https://api.kraken.com/0/public/Ticker?pair=USDCUSD)

## Ticker sources

- Binance: [WAXP/USDT](https://api.binance.com/api/v3/ticker/price?symbol=WAXPUSDT)
- Binance: [BTC/USDT](https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT)
- Binance: [ETH/USDT](https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT)
- Binance: [EOS/USDT](https://api.binance.com/api/v3/ticker/price?symbol=EOSUSDT)
- Kucoin: [WAXP/USDT](https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=WAX-USDT)
- Kucoin: [BTC/USDT](https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=BTC-USDT)
- Kucoin: [ETH/USDT](https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=ETH-USDT)
- Kucoin: [EOS/USDT](https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=EOS-USDT)

## Feeds

- usdtusd
- usdcusd
- waxpusd
- waxpbtc
- waxpeth
- waxpeos

## `.env` settings

```bash
NODEOS_ENDPOINT="https://wax.neftyblocks.com"
PRIVATE_KEYS="<PRIVATE KEY>"
ACCOUNT="<ACCOUNT>"
PERMISSION="<PERMISSION>"
CRON_INTERVAL="* * * * *"
DATA_SOURCE="<binance|kucoin>"
```

## Install

```
$ pm2 install typescript
$ npm install
```

## Quickstart

```
$ npm start
```
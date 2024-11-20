# WAX Delphi Oracle - Price feed

## Sources

- Kraken: [USDT/USD](https://api.kraken.com/0/public/Ticker?pair=USDTZUSD)
- Kraken: [USDC/USD](https://api.kraken.com/0/public/Ticker?pair=USDCUSD)
- Binance: [WAXP/USDT](https://api.binance.com/api/v3/ticker/price?symbol=WAXPUSDT)
- Binance: [BTC/USDT](https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT)
- Binance: [ETH/USDT](https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT)
- Binance: [EOS/USDT](https://api.binance.com/api/v3/ticker/price?symbol=EOSUSDT)

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
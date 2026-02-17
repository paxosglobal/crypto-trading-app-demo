export function getAssetIconUrl(symbol: string): string {
  return `https://raw.githubusercontent.com/LedgerHQ/crypto-icons/main/assets/${symbol.toUpperCase()}.png`;
}

export type CryptoAsset = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  iconColor: string;
  holdings: number;
};

export const cryptoAssets: CryptoAsset[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67456.93,
    change24h: 2.14,
    high24h: 68120.0,
    low24h: 66180.45,
    volume24h: 28_430_000_000,
    marketCap: 1_326_000_000_000,
    iconColor: "#F7931A",
    holdings: 0.4215,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3412.78,
    change24h: -0.87,
    high24h: 3485.2,
    low24h: 3378.1,
    volume24h: 14_720_000_000,
    marketCap: 410_500_000_000,
    iconColor: "#627EEA",
    holdings: 3.82,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 198.45,
    change24h: 5.63,
    high24h: 202.3,
    low24h: 187.9,
    volume24h: 4_810_000_000,
    marketCap: 91_200_000_000,
    iconColor: "#9945FF",
    holdings: 24.5,
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.1823,
    change24h: -1.42,
    high24h: 0.1891,
    low24h: 0.1785,
    volume24h: 1_340_000_000,
    marketCap: 26_700_000_000,
    iconColor: "#C2A633",
    holdings: 12500,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.7241,
    change24h: 3.28,
    high24h: 0.7385,
    low24h: 0.698,
    volume24h: 892_000_000,
    marketCap: 25_600_000_000,
    iconColor: "#0033AD",
    holdings: 5400,
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    price: 38.72,
    change24h: 1.95,
    high24h: 39.45,
    low24h: 37.6,
    volume24h: 620_000_000,
    marketCap: 15_800_000_000,
    iconColor: "#E84142",
    holdings: 65.3,
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    price: 18.34,
    change24h: -2.51,
    high24h: 19.12,
    low24h: 18.05,
    volume24h: 510_000_000,
    marketCap: 11_400_000_000,
    iconColor: "#2A5ADA",
    holdings: 142,
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    price: 7.86,
    change24h: 0.74,
    high24h: 8.02,
    low24h: 7.65,
    volume24h: 340_000_000,
    marketCap: 10_900_000_000,
    iconColor: "#E6007A",
    holdings: 310,
  },
];

export type OrderBookEntry = {
  price: number;
  amount: number;
  total: number;
};

export function generateOrderBook(midPrice: number): {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
} {
  const spread = midPrice * 0.0002;
  const asks: OrderBookEntry[] = [];
  const bids: OrderBookEntry[] = [];

  let askTotal = 0;
  for (let i = 0; i < 12; i++) {
    const price = midPrice + spread * (i + 1);
    const amount = parseFloat((Math.random() * 2.5 + 0.01).toFixed(6));
    askTotal += amount;
    asks.push({
      price: parseFloat(price.toFixed(2)),
      amount,
      total: parseFloat(askTotal.toFixed(6)),
    });
  }

  let bidTotal = 0;
  for (let i = 0; i < 12; i++) {
    const price = midPrice - spread * (i + 1);
    const amount = parseFloat((Math.random() * 2.5 + 0.01).toFixed(6));
    bidTotal += amount;
    bids.push({
      price: parseFloat(price.toFixed(2)),
      amount,
      total: parseFloat(bidTotal.toFixed(6)),
    });
  }

  return { asks, bids };
}

export type TradeHistoryEntry = {
  id: string;
  price: number;
  amount: number;
  time: string;
  side: "buy" | "sell";
};

export function generateTradeHistory(midPrice: number): TradeHistoryEntry[] {
  const trades: TradeHistoryEntry[] = [];
  let hour = 12;
  let minute = 34;
  let second = 56;

  for (let i = 0; i < 15; i++) {
    const deviation = (Math.random() - 0.5) * midPrice * 0.004;
    const price = parseFloat((midPrice + deviation).toFixed(2));
    const amount = parseFloat((Math.random() * 1.8 + 0.001).toFixed(6));
    const side: "buy" | "sell" = Math.random() > 0.45 ? "buy" : "sell";

    const timeStr = [
      String(hour).padStart(2, "0"),
      String(minute).padStart(2, "0"),
      String(second).padStart(2, "0"),
    ].join(":");

    trades.push({ id: `trade-${i}`, price, amount, time: timeStr, side });

    second -= Math.floor(Math.random() * 15 + 3);
    if (second < 0) {
      second += 60;
      minute -= 1;
    }
    if (minute < 0) {
      minute += 60;
      hour -= 1;
    }
  }

  return trades;
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value < 0.01) {
    return `$${value.toFixed(6)}`;
  }
  if (value < 1) {
    return `$${value.toFixed(4)}`;
  }
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export type GainerEntry = {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
};

export const topGainers: GainerEntry[] = [
  { symbol: "PEPE", name: "Pepe", price: 0.00001234, changePercent: 42.17 },
  { symbol: "BONK", name: "Bonk", price: 0.00003456, changePercent: 28.34 },
  { symbol: "WIF", name: "dogwifhat", price: 2.47, changePercent: 19.52 },
  { symbol: "FLOKI", name: "FLOKI", price: 0.000234, changePercent: 15.78 },
  { symbol: "INJ", name: "Injective", price: 24.83, changePercent: 12.43 },
  { symbol: "RNDR", name: "Render", price: 7.92, changePercent: 9.87 },
  { symbol: "FET", name: "Fetch.ai", price: 2.31, changePercent: 8.61 },
  { symbol: "TIA", name: "Celestia", price: 12.45, changePercent: 7.24 },
];

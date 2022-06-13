const baseURL = import.meta.env.DEV ? '/proxy' : '/';

export type DisplayItem = { type: string; value: string | number } | string;

export type AppToken = {
  type: 'app-token';
  address: string;
  network: string;
  appId: string;
  groupId: string;
  symbol: string;
  decimals: number;
  supply: number;
  price: number;
  pricePerShare: number[];
  tokens: (AppToken | BaseToken)[];
  displayProps: {
    label: string;
    secondaryLabel?: DisplayItem;
    images: string[];
    statsItems: { label: string; value: DisplayItem }[];
  };
  balance: number;
  balanceRaw: string;
  balanceUSD: number;
};

export type BaseToken = {
  type: 'base-token';
  id: string;
  networkId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  coingeckoId: string;
  status: string;
  hide: boolean;
  canExchange: boolean;
  updatedAt: string;
  createdAt: string;
  price: number;
  networkEnumValue: string;
  network: string;
  balance: number;
  balanceRaw: string;
  balanceUSD: number;
};

export type ContractPosition = {
  type: 'contract-position';
  address: string;
  network: string;
  appId: string;
  groupId: string;
  tokens: (AppToken | BaseToken)[];
  dataProps: Record<string, any>;
  displayProps: {
    label: string;
    secondaryLabel?: DisplayItem;
    images: string[];
    statsItems: { label: string; value: DisplayItem }[];
  };
  balanceUSD: number;
};

export type BalanceResponse = Record<
  string,
  {
    products: {
      label: string;
      assets: (AppToken | ContractPosition)[];
    }[];
    meta: {
      label: string;
      value: string | number;
      type: string;
    }[];
  }
>;

export function fetcher(url: string, opt?: RequestInit) {
  const nextUrl = `${baseURL}${url}`;
  return fetch(nextUrl, opt).then(res => res.json());
}

export async function fetchBalance(appId: string, network: string, addresses: string[]) {
  const addressQueryString = addresses.map(a => `addresses[]=${a}`).join('&');

  const data = await fetcher(`/apps/${appId}/balances?network=avalanche&${addressQueryString}`);

  return data as BalanceResponse;
}

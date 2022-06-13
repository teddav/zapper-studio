export const getTokenImg = (address: string, network: string) => {
  return `https://storage.googleapis.com/zapper-fi-assets/tokens/${network}/${address}.png`;
};

export const getAppImg = (appName: string) => {
  return `https://storage.googleapis.com/zapper-fi-assets/apps/${appName}.png`;
};

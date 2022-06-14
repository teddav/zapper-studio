import type { DisplayItem } from './fetcher';

const usdFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 });
const numberFormat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 });

function formatDollar(monies: number) {
  if (monies < 0.001) {
    return '< 0.001';
  }

  return usdFormat.format(monies);
}

function formatNumber(num: number) {
  if (num < 0.001) {
    return '< 0.001';
  }

  return numberFormat.format(num);
}

function formatDisplayItem(displayItem?: DisplayItem) {
  if (!displayItem) {
    return;
  }

  if (typeof displayItem === 'string') {
    return displayItem;
  }

  if (typeof displayItem === 'number') {
    return formatNumber(displayItem);
  }

  if (displayItem.type === 'dollar' && typeof displayItem.value === 'number') {
    return usdFormat.format(displayItem.value);
  }

  return JSON.stringify(displayItem);
}

export const format = {
  dollar: formatDollar,
  number: formatNumber,
  displayItem: formatDisplayItem,
};

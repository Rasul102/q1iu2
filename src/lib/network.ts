export type NetworkMode = 'testnet' | 'mainnet';

const KEY = 'quicky_network_mode';

export function getNetworkMode(): NetworkMode {
  const v = (typeof window !== 'undefined' ? window.localStorage.getItem(KEY) : null) as NetworkMode | null;
  return v === 'mainnet' || v === 'testnet' ? v : 'testnet';
}

export function setNetworkMode(mode: NetworkMode) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, mode);
}

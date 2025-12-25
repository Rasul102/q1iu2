import type { NetworkMode } from './network';

export async function fetchTonBalanceTon(address: string, network: NetworkMode): Promise<number | null> {
  // returns TON amount
  const addr = encodeURIComponent(address);
  const candidates: string[] = [];

  // tonapi (mainnet)
  if (network === 'mainnet') {
    candidates.push(`https://tonapi.io/v2/accounts/${addr}`);
  } else {
    candidates.push(`https://testnet.tonapi.io/v2/accounts/${addr}`);
  }

  // toncenter fallback (often works without key)
  if (network === 'mainnet') {
    candidates.push(`https://toncenter.com/api/v2/getAddressBalance?address=${addr}`);
  } else {
    candidates.push(`https://testnet.toncenter.com/api/v2/getAddressBalance?address=${addr}`);
  }

  for (const url of candidates) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const j = await r.json();

      // tonapi: { balance: string }
      if (typeof j?.balance === 'string') {
        const nano = Number(j.balance);
        if (isFinite(nano)) return nano / 1e9;
      }

      // toncenter: { result: "..." }
      if (typeof j?.result === 'string') {
        const nano = Number(j.result);
        if (isFinite(nano)) return nano / 1e9;
      }
    } catch {
      // ignore and try next
    }
  }

  return null;
}

export async function fetchTonUsdPrice(): Promise<number | null> {
  const cacheKey = 'quicky_ton_usd';
  const tsKey = 'quicky_ton_usd_ts';
  try {
    const ts = Number(sessionStorage.getItem(tsKey) || 0);
    const cached = Number(sessionStorage.getItem(cacheKey) || 0);
    if (isFinite(cached) && cached > 0 && Date.now() - ts < 60_000) return cached;
  } catch {}

  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd';
    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    const p = j?.['the-open-network']?.usd;
    if (typeof p === 'number') {
      try {
        sessionStorage.setItem(cacheKey, String(p));
        sessionStorage.setItem(tsKey, String(Date.now()));
      } catch {}
      return p;
    }
  } catch {}
  return null;
}

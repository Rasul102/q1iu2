import { ArrowLeft } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Coin = 'BTC' | 'ETH' | 'SOL' | 'BNB' | 'TON';

const COINGECKO_IDS: Record<Coin, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  BNB: 'binancecoin',
  TON: 'the-open-network',
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatUsd(n: number) {
  if (!isFinite(n)) return '--';
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function oddsFromProb(p: number) {
  const prob = clamp(p, 0.05, 0.95);
  const o = 1 / prob;
  return clamp(o, 1.01, 20);
}

function buildPath(points: number[]) {
  if (points.length < 2) return '';
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1e-9, max - min);

  const W = 320;
  const H = 140;
  const pad = 10;

  const xs = points.map((_, i) => pad + (i * (W - pad * 2)) / (points.length - 1));
  const ys = points.map((v) => {
    const t = (v - min) / range;
    return pad + (1 - t) * (H - pad * 2);
  });

  return ys.map((y, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(2)} ${y.toFixed(2)}`).join(' ');
}

async function fetchUsdPrice(coin: Coin): Promise<number | null> {
  const id = COINGECKO_IDS[coin];
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`;
  const r = await fetch(url);
  if (!r.ok) return null;
  const j = await r.json();
  const v = j?.[id]?.usd;
  return typeof v === 'number' ? v : null;
}

function get15mBucketStart(nowMs: number) {
  const m = 15 * 60 * 1000;
  return Math.floor(nowMs / m) * m;
}

export function QuickTradeScreen({ coin, onBack }: { coin: Coin; onBack: () => void }) {
  const [price, setPrice] = useState<number | null>(null);
  const [series, setSeries] = useState<number[]>(() => {
    const key = `quicky_price_series_${coin}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        const arr = JSON.parse(cached);
        if (Array.isArray(arr) && arr.every((x) => typeof x === 'number')) return arr.slice(-60);
      }
    } catch {}
    return [];
  });

  const [bucketStart, setBucketStart] = useState<number>(() => get15mBucketStart(Date.now()));
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // refresh bucket start every minute (in case user stays open)
  useEffect(() => {
    const t = setInterval(() => {
      const b = get15mBucketStart(Date.now());
      setBucketStart((prev) => (prev === b ? prev : b));
    }, 60_000);
    return () => clearInterval(t);
  }, []);

  // price polling
  useEffect(() => {
    let timer: any;

    const tick = async () => {
      try {
        const p = await fetchUsdPrice(coin);
        if (!isMounted.current) return;

        if (typeof p === 'number') {
          setPrice(p);
          setSeries((prev) => {
            const next = [...prev, p].slice(-60);
            try {
              sessionStorage.setItem(`quicky_price_series_${coin}`, JSON.stringify(next));
            } catch {}
            return next;
          });

          setStartPrice((prev) => {
            // reset start price when the 15m bucket changes
            const bucketKey = `quicky_start_${coin}_${bucketStart}`;
            if (prev != null) return prev;
            try {
              const cached = sessionStorage.getItem(bucketKey);
              if (cached) return Number(cached) || p;
              sessionStorage.setItem(bucketKey, String(p));
            } catch {}
            return p;
          });
        }
      } catch {
        // ignore
      } finally {
        timer = setTimeout(tick, 5_000);
      }
    };

    tick();
    return () => clearTimeout(timer);
    // bucketStart included to reset startPrice when bucket changes
  }, [coin, bucketStart]);

  // when bucket changes: reset start price immediately from latest price
  useEffect(() => {
    setStartPrice(null);
  }, [bucketStart, coin]);

  const path = useMemo(() => buildPath(series.length ? series : price != null ? [price, price] : [0, 0]), [series, price]);

  const deltaPct = useMemo(() => {
    if (price == null || startPrice == null || startPrice <= 0) return 0;
    return ((price - startPrice) / startPrice) * 100;
  }, [price, startPrice]);

  const upProb = useMemo(() => {
    // Map market move to implied probability: bigger move up => higher UP prob
    const x = clamp(deltaPct / 1.2, -6, 6); // ~1.2% move swings a lot for demo
    const p = 0.5 + x * 0.06; // 6% per "unit"
    return clamp(p, 0.05, 0.95);
  }, [deltaPct]);

  const downProb = 1 - upProb;

  const upOdds = useMemo(() => oddsFromProb(upProb), [upProb]);
  const downOdds = useMemo(() => oddsFromProb(downProb), [downProb]);

  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-5 bg-[#112D4E]">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="w-10 h-10 rounded-xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-xl flex items-center justify-center active:scale-95">
          <ArrowLeft className="w-5 h-5 text-[#F6F0D7]/80" />
        </button>
        <div className="text-[#F6F0D7] font-semibold">{coin} • Quick 15m</div>
        <div className="w-10" />
      </div>

      <div className="rounded-3xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[#F6F0D7]/70 text-sm">Current</div>
            <div className="text-[#F6F0D7] text-3xl font-semibold mt-1">${price != null ? formatUsd(price) : '--'}</div>
          </div>
          <div className={`text-sm font-medium ${deltaPct >= 0 ? 'text-[#C5D89D]' : 'text-[#F6F0D7]/70'}`}>
            {deltaPct >= 0 ? '+' : ''}{deltaPct.toFixed(2)}%
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-black/10 border border-white/10 backdrop-blur-2xl p-3">
          <div className="text-[#F6F0D7]/70 text-sm mb-2">Price</div>
          <svg viewBox="0 0 320 140" className="w-full h-40">
            <path d={path} fill="none" stroke="rgba(197,216,157,0.95)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
            <div className="text-[#F6F0D7]/70 text-xs">UP</div>
            <div className="text-[#F6F0D7] text-3xl font-semibold mt-1">{upOdds.toFixed(2)}x</div>
            <div className="text-[#F6F0D7]/60 text-xs mt-1">Implied {(upProb * 100).toFixed(0)}%</div>
          </div>
          <div className="rounded-2xl border border-[#89986D]/40 bg-black/10 backdrop-blur-2xl p-4">
            <div className="text-[#F6F0D7]/70 text-xs">DOWN</div>
            <div className="text-[#F6F0D7] text-3xl font-semibold mt-1">{downOdds.toFixed(2)}x</div>
            <div className="text-[#F6F0D7]/60 text-xs mt-1">Implied {(downProb * 100).toFixed(0)}%</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="rounded-2xl py-4 font-semibold text-[#112D4E] bg-[#C5D89D] shadow-[0_0_20px_rgba(197,216,157,0.35)] active:scale-[0.98]">
            Up
          </button>
          <button className="rounded-2xl py-4 font-semibold text-[#F6F0D7] bg-[#89986D]/70 border border-[#89986D]/70 active:scale-[0.98]">
            Down
          </button>
        </div>

        <div className="mt-3 text-[#F6F0D7]/55 text-xs">
          Demo odds (start price fixed at the beginning of the current 15-minute round). Updates every 5s.
        </div>
      </div>
    </div>
  );
}

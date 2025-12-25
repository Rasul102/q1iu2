import { Search, Sparkles, ChevronRight } from 'lucide-react';

interface MarketsScreenProps {
  onMarketClick: (marketId: string) => void;
  onQuickTrade: (coin: 'BTC' | 'ETH' | 'SOL' | 'BNB' | 'TON') => void;
}

const QUICK = [
  { coin: 'BTC' as const, title: 'BTC up in the next 15 minutes?' },
  { coin: 'ETH' as const, title: 'ETH up in the next 15 minutes?' },
  { coin: 'SOL' as const, title: 'SOL up in the next 15 minutes?' },
  { coin: 'BNB' as const, title: 'BNB up in the next 15 minutes?' },
  { coin: 'TON' as const, title: 'TON up in the next 15 minutes?' },
];

export function MarketsScreen({ onQuickTrade }: MarketsScreenProps) {
  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-5 bg-[#112D4E]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[#F6F0D7] text-xl font-semibold">Welcome to Quicky</div>
          <div className="text-[#F6F0D7]/60 text-sm mt-1">Pick a side. Fast charts. Demo odds.</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-xl flex items-center justify-center">
            <Search className="w-5 h-5 text-[#F6F0D7]/70" />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C5D89D]" />
          <div className="text-[#F6F0D7] font-semibold">Quick 15m</div>
        </div>
        <div className="text-[#F6F0D7]/65 text-sm mt-1">Live price + chart, updates every 5 seconds.</div>

        <div className="mt-4 grid gap-3">
          {QUICK.map((q) => (
            <button
              key={q.coin}
              onClick={() => onQuickTrade(q.coin)}
              className="w-full text-left rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between">
                <div className="text-[#F6F0D7] font-semibold">{q.title}</div>
                <div className="flex items-center gap-1 text-[#F6F0D7]/70">
                  <span className="text-sm">Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
              <div className="text-[#F6F0D7]/60 text-sm mt-1">Next 15 minutes • Up / Down</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

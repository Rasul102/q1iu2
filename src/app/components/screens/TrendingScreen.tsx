import { TrendingUp } from 'lucide-react';

export function TrendingScreen() {
  return (
    <div className="h-full overflow-y-auto px-4 pb-24 pt-5 bg-[#112D4E]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#F6F0D7]" />
          <div className="text-[#F6F0D7] text-xl font-semibold">Trending</div>
        </div>
        <div className="text-[#F6F0D7]/70 text-sm">Coming soon</div>
      </div>

      <div className="rounded-2xl border border-[#C5D89D]/40 bg-[#F6F0D7]/10 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.20)] relative overflow-hidden">
        <div className="text-[#F6F0D7] font-semibold text-lg">Trending markets</div>
        <div className="text-[#F6F0D7]/75 text-sm mt-2">
          Once real bets are live, we’ll populate this with the hottest markets by volume.
        </div>
        <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-2xl" />
      </div>
    </div>
  );
}

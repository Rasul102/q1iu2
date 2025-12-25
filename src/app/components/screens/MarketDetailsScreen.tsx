import { ArrowLeft } from 'lucide-react';
import { markets } from '../../data/markets';
import { useMemo } from 'react';

interface MarketDetailsScreenProps {
  marketId: string;
  onBack: () => void;
}

export function MarketDetailsScreen({ marketId, onBack }: MarketDetailsScreenProps) {
  const market = useMemo(() => markets.find((m) => m.id === marketId), [marketId]);

  if (!market) {
    return (
      <div className="min-h-screen bg-[#112D4E] text-[#F6F0D7] p-4 pb-28">
        <button onClick={onBack} className="flex items-center gap-2 text-[#F6F0D7]/80 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="opacity-70">Market not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#112D4E] text-[#F6F0D7] p-4 pb-28">
      <button onClick={onBack} className="flex items-center gap-2 text-[#F6F0D7]/80 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{market.title}</h1>
      <p className="text-[#F6F0D7]/70 mb-6">{market.description}</p>

      <div className="rounded-2xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-2xl p-6">
        <div className="text-[#F6F0D7]/70 text-sm">This is a demo market screen.</div>
        <div className="mt-4 flex gap-3">
          <button className="flex-1 py-3 bg-[#C5D89D] text-[#112D4E] rounded-xl font-semibold active:scale-[0.98]">Yes</button>
          <button className="flex-1 py-3 bg-[#89986D]/70 text-[#F6F0D7] rounded-xl font-semibold active:scale-[0.98]">No</button>
        </div>
      </div>
    </div>
  );
}

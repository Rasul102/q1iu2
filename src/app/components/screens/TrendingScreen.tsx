import { useState } from 'react';
import { MarketCard } from '../MarketCard';
import { Flame, Sparkles, Clock } from 'lucide-react';

interface TrendingScreenProps {
  onMarketClick: (marketId: string) => void;
}

export function TrendingScreen({ onMarketClick }: TrendingScreenProps) {
  const [activeFilter, setActiveFilter] = useState<'hot' | 'new' | 'ending'>('hot');

  const hotMarkets = [
    {
      id: '1',
      question: 'Will Bitcoin reach $150k in 2025?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$2.4M',
      timeRemaining: '3d 12h',
      isActive: true,
    },
    {
      id: '3',
      question: 'Will a new L1 enter top 10 by Q2?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$920K',
      timeRemaining: '12d 18h',
      isActive: true,
    },
  ];

  const newMarkets = [
    {
      id: '6',
      question: 'Will Telegram TON reach $20 in 2025?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$180K',
      timeRemaining: '29d 8h',
      isActive: false,
    },
    {
      id: '7',
      question: 'Will NFT market cap exceed $50B?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$95K',
      timeRemaining: '25d 14h',
      isActive: false,
    },
  ];

  const endingSoonMarkets = [
    {
      id: '5',
      question: 'Will Solana maintain sub-second finality?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$650K',
      timeRemaining: '2d 15h',
      isActive: true,
    },
    {
      id: '1',
      question: 'Will Bitcoin reach $150k in 2025?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$2.4M',
      timeRemaining: '3d 12h',
      isActive: false,
    },
  ];

  const markets =
    activeFilter === 'hot'
      ? hotMarkets
      : activeFilter === 'new'
      ? newMarkets
      : endingSoonMarkets;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 bg-[#F2EFE7]">
        <h1 className="mb-4 text-[#006A71]">Trending</h1>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter('hot')}
            className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-all ${
              activeFilter === 'hot'
                ? 'bg-[#48A6A7] text-[#F2EFE7]'
                : 'bg-[#9ACBD0]/30 text-[#006A71]'
            }`}
          >
            {activeFilter === 'hot' && (
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-radial from-[#48A6A7]/40 via-[#9ACBD0]/15 to-transparent blur-sm pointer-events-none" />
            )}
            <Flame className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Hot</span>
          </button>

          <button
            onClick={() => setActiveFilter('new')}
            className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-all ${
              activeFilter === 'new'
                ? 'bg-[#48A6A7] text-[#F2EFE7]'
                : 'bg-[#9ACBD0]/30 text-[#006A71]'
            }`}
          >
            {activeFilter === 'new' && (
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-radial from-[#48A6A7]/40 via-[#9ACBD0]/15 to-transparent blur-sm pointer-events-none" />
            )}
            <Sparkles className="w-4 h-4 relative z-10" />
            <span className="relative z-10">New</span>
          </button>

          <button
            onClick={() => setActiveFilter('ending')}
            className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg transition-all ${
              activeFilter === 'ending'
                ? 'bg-[#48A6A7] text-[#F2EFE7]'
                : 'bg-[#9ACBD0]/30 text-[#006A71]'
            }`}
          >
            {activeFilter === 'ending' && (
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-radial from-[#48A6A7]/40 via-[#9ACBD0]/15 to-transparent blur-sm pointer-events-none" />
            )}
            <Clock className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Ending</span>
          </button>
        </div>
      </div>

      {/* Market Cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="space-y-3">
          {markets.map((market) => (
            <MarketCard
              key={market.id}
              {...market}
              onClick={() => onMarketClick(market.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

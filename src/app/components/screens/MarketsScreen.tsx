import { Search } from 'lucide-react';
import { MarketCard } from '../MarketCard';

interface MarketsScreenProps {
  onMarketClick: (marketId: string) => void;
}

export function MarketsScreen({ onMarketClick }: MarketsScreenProps) {
  const markets = [
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
      id: '2',
      question: 'Will Ethereum ETF outperform BTC ETF?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$1.8M',
      timeRemaining: '5d 6h',
      isActive: false,
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
    {
      id: '4',
      question: 'Will DeFi TVL exceed $200B in 2025?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$1.2M',
      timeRemaining: '8d 4h',
      isActive: false,
    },
    {
      id: '5',
      question: 'Will Solana maintain sub-second finality?',
      optionA: 'Yes',
      optionB: 'No',
      volume: '$650K',
      timeRemaining: '2d 15h',
      isActive: false,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 bg-[#F2EFE7]">
        <h1 className="mb-4 text-[#006A71]">Markets</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#006A71]/50" />
          <input
            type="text"
            placeholder="Search markets..."
            className="w-full pl-10 pr-4 py-3 bg-[#9ACBD0]/30 border border-[#9ACBD0] rounded-xl text-[#006A71] placeholder:text-[#006A71]/50 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
          />
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

import { Clock, TrendingUp } from 'lucide-react';

interface MarketCardProps {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  volume: string;
  timeRemaining: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function MarketCard({
  question,
  optionA,
  optionB,
  volume,
  timeRemaining,
  isActive = false,
  onClick,
}: MarketCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-[#F6F0D7] border border-[#C5D89D] rounded-2xl p-4 cursor-pointer transition-all ${
        isActive ? 'shadow-lg' : 'active:scale-[0.98]'
      }`}
    >
      {/* Eye effect - radial glow on active/popular markets */}
      {isActive && (
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-radial from-[#89986D]/30 via-[#C5D89D]/15 to-transparent opacity-75 blur-md pointer-events-none" />
      )}
      
      <div className="relative z-10">
        <h3 className="mb-3 text-[#89986D]">{question}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="bg-[#C5D89D] hover:bg-[#89986D] text-[#89986D] hover:text-[#F6F0D7] rounded-lg py-3 px-4 transition-colors">
            {optionA}
          </button>
          <button className="bg-[#C5D89D] hover:bg-[#89986D] text-[#89986D] hover:text-[#F6F0D7] rounded-lg py-3 px-4 transition-colors">
            {optionB}
          </button>
        </div>
        
        <div className="flex justify-between items-center text-sm text-[#89986D]/70">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{volume}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

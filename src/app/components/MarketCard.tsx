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
      className={`relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-2xl p-4 cursor-pointer transition-all ${
        isActive ? 'shadow-lg' : 'active:scale-[0.98]'
      }`}
    >
      {/* Eye effect - radial glow on active/popular markets */}
      {isActive && (
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-radial from-[#48A6A7]/30 via-[#9ACBD0]/15 to-transparent opacity-75 blur-md pointer-events-none" />
      )}
      
      <div className="relative z-10">
        <h3 className="mb-3 text-[#006A71]">{question}</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="bg-[#9ACBD0] hover:bg-[#48A6A7] text-[#006A71] hover:text-[#F2EFE7] rounded-lg py-3 px-4 transition-colors">
            {optionA}
          </button>
          <button className="bg-[#9ACBD0] hover:bg-[#48A6A7] text-[#006A71] hover:text-[#F2EFE7] rounded-lg py-3 px-4 transition-colors">
            {optionB}
          </button>
        </div>
        
        <div className="flex justify-between items-center text-sm text-[#006A71]/70">
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

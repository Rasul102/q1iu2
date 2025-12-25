import { ArrowLeft, Clock, TrendingUp, Info } from 'lucide-react';
import { useState } from 'react';

interface MarketDetailsScreenProps {
  onBack: () => void;
}

export function MarketDetailsScreen({ onBack }: MarketDetailsScreenProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no' | null>(null);
  const [amount, setAmount] = useState('');

  const recentTrades = [
    { user: '0x4f2...8a3', outcome: 'Yes', amount: '$500', time: '2m ago' },
    { user: '0x8b1...9c7', outcome: 'No', amount: '$1,200', time: '5m ago' },
    { user: '0x3d5...2f1', outcome: 'Yes', amount: '$800', time: '12m ago' },
    { user: '0x9a7...4e2', outcome: 'Yes', amount: '$2,500', time: '18m ago' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2EFE7]">
      {/* Header */}
      <div className="p-4 border-b border-[#9ACBD0]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#006A71] mb-3 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h2 className="text-[#006A71]">Will Bitcoin reach $150k in 2025?</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Stats */}
        <div className="p-4 grid grid-cols-2 gap-3">
          <div className="bg-[#9ACBD0]/30 rounded-xl p-3 border border-[#9ACBD0]">
            <div className="flex items-center gap-1 text-sm text-[#006A71]/70 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Volume</span>
            </div>
            <div className="text-[#006A71]">$2.4M</div>
          </div>
          <div className="bg-[#9ACBD0]/30 rounded-xl p-3 border border-[#9ACBD0]">
            <div className="flex items-center gap-1 text-sm text-[#006A71]/70 mb-1">
              <Clock className="w-4 h-4" />
              <span>Ends in</span>
            </div>
            <div className="text-[#006A71]">3d 12h</div>
          </div>
        </div>

        {/* Probability Visualization */}
        <div className="px-4 mb-4">
          <div className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#006A71]/70">Current Odds</span>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="flex-1 h-12 bg-[#48A6A7] rounded-lg flex items-center justify-center text-[#F2EFE7] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-[#48A6A7]/80 via-transparent to-transparent opacity-60" />
                <span className="relative z-10">Yes - 68%</span>
              </div>
              <div className="flex-[0.47] h-12 bg-[#9ACBD0] rounded-lg flex items-center justify-center text-[#006A71]">
                No - 32%
              </div>
            </div>
          </div>
        </div>

        {/* Outcome Selection */}
        <div className="px-4 mb-4">
          <label className="block text-[#006A71] mb-2">Select Outcome</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedOutcome('yes')}
              className={`relative py-4 rounded-xl border-2 transition-all ${
                selectedOutcome === 'yes'
                  ? 'bg-[#48A6A7] border-[#48A6A7] text-[#F2EFE7]'
                  : 'bg-[#9ACBD0]/30 border-[#9ACBD0] text-[#006A71]'
              }`}
            >
              {selectedOutcome === 'yes' && (
                <div className="absolute -inset-[2px] rounded-xl bg-gradient-radial from-[#48A6A7]/50 via-[#9ACBD0]/20 to-transparent blur-md pointer-events-none" />
              )}
              <span className="relative z-10">Yes</span>
            </button>
            <button
              onClick={() => setSelectedOutcome('no')}
              className={`relative py-4 rounded-xl border-2 transition-all ${
                selectedOutcome === 'no'
                  ? 'bg-[#48A6A7] border-[#48A6A7] text-[#F2EFE7]'
                  : 'bg-[#9ACBD0]/30 border-[#9ACBD0] text-[#006A71]'
              }`}
            >
              {selectedOutcome === 'no' && (
                <div className="absolute -inset-[2px] rounded-xl bg-gradient-radial from-[#48A6A7]/50 via-[#9ACBD0]/20 to-transparent blur-md pointer-events-none" />
              )}
              <span className="relative z-10">No</span>
            </button>
          </div>
        </div>

        {/* Trade Amount */}
        <div className="px-4 mb-4">
          <label className="block text-[#006A71] mb-2">Trade Amount (USDT)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-[#9ACBD0]/30 border border-[#9ACBD0] rounded-xl text-[#006A71] placeholder:text-[#006A71]/50 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
          />
        </div>

        {/* Confirm Button */}
        <div className="px-4 mb-6">
          <button
            disabled={!selectedOutcome || !amount}
            className="relative w-full py-4 bg-[#48A6A7] text-[#F2EFE7] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-radial from-[#48A6A7] via-[#48A6A7]/90 to-[#48A6A7]/80 animate-pulse" />
            <span className="relative z-10">Confirm Trade</span>
          </button>
        </div>

        {/* Recent Trades */}
        <div className="px-4 mb-4">
          <h3 className="text-[#006A71] mb-3">Recent Trades</h3>
          <div className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl overflow-hidden">
            {recentTrades.map((trade, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 ${
                  index !== recentTrades.length - 1 ? 'border-b border-[#9ACBD0]' : ''
                }`}
              >
                <div>
                  <div className="text-[#006A71] text-sm">{trade.user}</div>
                  <div className="text-[#006A71]/60 text-xs">{trade.time}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${
                    trade.outcome === 'Yes' ? 'text-[#48A6A7]' : 'text-[#9ACBD0]'
                  }`}>
                    {trade.outcome}
                  </div>
                  <div className="text-[#006A71] text-xs">{trade.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Rules */}
        <div className="px-4 mb-4">
          <div className="bg-[#9ACBD0]/20 border border-[#9ACBD0] rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-[#006A71] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#006A71] mb-1">Resolution Rules</h4>
                <p className="text-sm text-[#006A71]/70">
                  Market resolves to "Yes" if Bitcoin (BTC) reaches or exceeds $150,000 USD 
                  on any major exchange before Dec 31, 2025 23:59 UTC. Otherwise resolves to "No".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function PortfolioScreen() {
  const [activeFilter, setActiveFilter] = useState<'open' | 'resolved'>('open');

  const openPositions = [
    {
      id: 1,
      question: 'Will Bitcoin reach $150k in 2025?',
      outcome: 'Yes',
      amount: '$500',
      currentValue: '$540',
      pnl: '+$40',
      pnlPercent: '+8%',
      isProfit: true,
    },
    {
      id: 2,
      question: 'Will a new L1 enter top 10 by Q2?',
      outcome: 'Yes',
      amount: '$300',
      currentValue: '$285',
      pnl: '-$15',
      pnlPercent: '-5%',
      isProfit: false,
    },
    {
      id: 3,
      question: 'Will DeFi TVL exceed $200B in 2025?',
      outcome: 'No',
      amount: '$200',
      currentValue: '$220',
      pnl: '+$20',
      pnlPercent: '+10%',
      isProfit: true,
    },
  ];

  const resolvedPositions = [
    {
      id: 4,
      question: 'Will Ethereum hit $5k in Q1 2025?',
      outcome: 'Yes',
      amount: '$400',
      finalValue: '$0',
      pnl: '-$400',
      pnlPercent: '-100%',
      isProfit: false,
      status: 'Lost',
    },
    {
      id: 5,
      question: 'Will Solana remain in top 10?',
      outcome: 'Yes',
      amount: '$250',
      finalValue: '$475',
      pnl: '+$225',
      pnlPercent: '+90%',
      isProfit: true,
      status: 'Won',
    },
  ];

  const positions = activeFilter === 'open' ? openPositions : resolvedPositions;

  const totalOpenValue = openPositions.reduce((acc, pos) => {
    const value = parseFloat(pos.currentValue.replace('$', '').replace(',', ''));
    return acc + value;
  }, 0);

  const totalPnL = positions.reduce((acc, pos) => {
    const pnl = parseFloat(pos.pnl.replace('$', '').replace('+', '').replace(',', ''));
    return acc + pnl;
  }, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 bg-[#F2EFE7]">
        <h1 className="mb-4 text-[#006A71]">Portfolio</h1>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
            <div className="absolute -right-2 -top-2 w-20 h-20 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
            <div className="relative z-10">
              <div className="text-sm text-[#006A71]/70 mb-1">Total Value</div>
              <div className="text-xl text-[#006A71]">${totalOpenValue.toFixed(0)}</div>
            </div>
          </div>

          <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
            <div className="absolute -right-2 -top-2 w-20 h-20 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
            <div className="relative z-10">
              <div className="text-sm text-[#006A71]/70 mb-1">Total P&L</div>
              <div className={`text-xl ${totalPnL >= 0 ? 'text-[#48A6A7]' : 'text-destructive'}`}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter('open')}
            className={`relative flex-1 py-2.5 rounded-lg transition-all ${
              activeFilter === 'open'
                ? 'bg-[#48A6A7] text-[#F2EFE7]'
                : 'bg-[#9ACBD0]/30 text-[#006A71]'
            }`}
          >
            {activeFilter === 'open' && (
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-radial from-[#48A6A7]/40 via-[#9ACBD0]/15 to-transparent blur-sm pointer-events-none" />
            )}
            <span className="relative z-10">Open</span>
          </button>

          <button
            onClick={() => setActiveFilter('resolved')}
            className={`relative flex-1 py-2.5 rounded-lg transition-all ${
              activeFilter === 'resolved'
                ? 'bg-[#48A6A7] text-[#F2EFE7]'
                : 'bg-[#9ACBD0]/30 text-[#006A71]'
            }`}
          >
            {activeFilter === 'resolved' && (
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-radial from-[#48A6A7]/40 via-[#9ACBD0]/15 to-transparent blur-sm pointer-events-none" />
            )}
            <span className="relative z-10">Resolved</span>
          </button>
        </div>
      </div>

      {/* Positions List */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="space-y-3">
          {positions.map((position) => (
            <div
              key={position.id}
              className={`relative bg-[#F2EFE7] border rounded-xl p-4 ${
                position.isProfit ? 'border-[#48A6A7]' : 'border-[#9ACBD0]'
              }`}
            >
              {position.isProfit && (
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-radial from-[#48A6A7]/15 via-[#9ACBD0]/8 to-transparent blur-sm pointer-events-none" />
              )}

              <div className="relative z-10">
                <div className="mb-3">
                  <div className="text-[#006A71] mb-1">{position.question}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-[#9ACBD0] text-[#006A71] px-2 py-0.5 rounded">
                      {position.outcome}
                    </span>
                    {'status' in position && (
                      <span
                        className={`text-sm px-2 py-0.5 rounded ${
                          position.status === 'Won'
                            ? 'bg-[#48A6A7] text-[#F2EFE7]'
                            : 'bg-destructive/20 text-destructive'
                        }`}
                      >
                        {position.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-[#006A71]/60 mb-1">Invested</div>
                    <div className="text-sm text-[#006A71]">{position.amount}</div>
                  </div>

                  <div>
                    <div className="text-xs text-[#006A71]/60 mb-1">
                      {activeFilter === 'open' ? 'Current' : 'Final'}
                    </div>
                    <div className="text-sm text-[#006A71]">
                      {activeFilter === 'open' ? position.currentValue : (position as any).finalValue}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[#006A71]/60 mb-1">P&L</div>
                    <div
                      className={`text-sm flex items-center gap-1 ${
                        position.isProfit ? 'text-[#48A6A7]' : 'text-destructive'
                      }`}
                    >
                      {position.isProfit ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>{position.pnl}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {positions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#006A71]/40 mb-2">No positions yet</div>
            <div className="text-sm text-[#006A71]/60">
              Start trading to see your positions here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

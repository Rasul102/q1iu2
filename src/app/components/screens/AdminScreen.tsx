import { Plus, CheckCircle, BarChart, Settings } from 'lucide-react';
import { useState } from 'react';

export function AdminScreen() {
  const [showCreateMarket, setShowCreateMarket] = useState(false);
  const [marketQuestion, setMarketQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');

  const pendingMarkets = [
    {
      id: 1,
      question: 'Will Bitcoin reach $150k in 2025?',
      volume: '$2.4M',
      status: 'Active',
      endsIn: '3d 12h',
    },
    {
      id: 2,
      question: 'Will Ethereum ETF outperform BTC ETF?',
      volume: '$1.8M',
      status: 'Active',
      endsIn: '5d 6h',
    },
  ];

  const marketsToResolve = [
    {
      id: 3,
      question: 'Will SOL price exceed $200 in Dec 2024?',
      volume: '$580K',
      status: 'Ended',
      totalBets: 245,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F2EFE7]">
      {/* Header */}
      <div className="p-4 pb-3 bg-[#F2EFE7] border-b border-[#9ACBD0]">
        <h1 className="mb-2 text-[#006A71]">Admin Dashboard</h1>
        <p className="text-sm text-[#006A71]/70">Platform management & moderation</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
            <div className="relative z-10">
              <div className="text-sm text-[#006A71]/70 mb-1">Active Markets</div>
              <div className="text-2xl text-[#006A71]">24</div>
            </div>
          </div>

          <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
            <div className="relative z-10">
              <div className="text-sm text-[#006A71]/70 mb-1">Total Volume</div>
              <div className="text-2xl text-[#006A71]">$12.8M</div>
            </div>
          </div>

          <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
            <div className="relative z-10">
              <div className="text-sm text-[#006A71]/70 mb-1">Total Users</div>
              <div className="text-2xl text-[#006A71]">3,421</div>
            </div>
          </div>

          <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
            <div className="relative z-10">
              <div className="text-sm text-[#006A71]/70 mb-1">To Resolve</div>
              <div className="text-2xl text-[#48A6A7]">1</div>
            </div>
          </div>
        </div>

        {/* Create Market Button */}
        <button
          onClick={() => setShowCreateMarket(!showCreateMarket)}
          className="relative w-full mb-4 bg-[#48A6A7] text-[#F2EFE7] rounded-xl p-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-[#48A6A7] via-[#48A6A7]/90 to-[#48A6A7]/80" />
          <Plus className="w-5 h-5 relative z-10" />
          <span className="relative z-10">Create New Market</span>
        </button>

        {/* Create Market Form */}
        {showCreateMarket && (
          <div className="mb-6 bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4">
            <h3 className="text-[#006A71] mb-3">New Market</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-[#006A71] mb-1">Market Question</label>
                <input
                  type="text"
                  value={marketQuestion}
                  onChange={(e) => setMarketQuestion(e.target.value)}
                  placeholder="e.g., Will Bitcoin reach $200k in 2025?"
                  className="w-full px-3 py-2 bg-[#9ACBD0]/30 border border-[#9ACBD0] rounded-lg text-[#006A71] placeholder:text-[#006A71]/50 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-[#006A71] mb-1">Option A</label>
                  <input
                    type="text"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="Yes"
                    className="w-full px-3 py-2 bg-[#9ACBD0]/30 border border-[#9ACBD0] rounded-lg text-[#006A71] placeholder:text-[#006A71]/50 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#006A71] mb-1">Option B</label>
                  <input
                    type="text"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="No"
                    className="w-full px-3 py-2 bg-[#9ACBD0]/30 border border-[#9ACBD0] rounded-lg text-[#006A71] placeholder:text-[#006A71]/50 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#006A71] mb-1">Resolution Rules</label>
                <textarea
                  rows={3}
                  placeholder="Define how this market will be resolved..."
                  className="w-full px-3 py-2 bg-[#9ACBD0]/30 border border-[#9ACBD0] rounded-lg text-[#006A71] placeholder:text-[#006A71]/50 focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
                />
              </div>

              <button className="w-full bg-[#48A6A7] text-[#F2EFE7] py-3 rounded-lg active:scale-[0.98] transition-transform">
                Create Market
              </button>
            </div>
          </div>
        )}

        {/* Markets to Resolve */}
        {marketsToResolve.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[#006A71] mb-3">Markets to Resolve</h3>
            <div className="space-y-3">
              {marketsToResolve.map((market) => (
                <div
                  key={market.id}
                  className="relative bg-[#F2EFE7] border border-[#48A6A7] rounded-xl p-4"
                >
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-radial from-[#48A6A7]/20 via-[#9ACBD0]/10 to-transparent blur-sm pointer-events-none" />

                  <div className="relative z-10">
                    <div className="mb-3">
                      <div className="text-[#006A71] mb-1">{market.question}</div>
                      <div className="flex gap-2 text-sm text-[#006A71]/70">
                        <span>{market.volume} volume</span>
                        <span>•</span>
                        <span>{market.totalBets} bets</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-[#48A6A7] text-[#F2EFE7] py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-transform">
                        <CheckCircle className="w-4 h-4" />
                        <span>Resolve Yes</span>
                      </button>
                      <button className="bg-[#9ACBD0] text-[#006A71] py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-transform">
                        <CheckCircle className="w-4 h-4" />
                        <span>Resolve No</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Markets */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#006A71]">Active Markets</h3>
            <button className="text-sm text-[#48A6A7]">View All</button>
          </div>

          <div className="space-y-2">
            {pendingMarkets.map((market) => (
              <div
                key={market.id}
                className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="text-sm text-[#006A71] mb-1">{market.question}</div>
                    <div className="text-xs text-[#006A71]/60">
                      {market.volume} • Ends in {market.endsIn}
                    </div>
                  </div>
                  <span className="text-xs bg-[#48A6A7] text-[#F2EFE7] px-2 py-1 rounded">
                    {market.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-[#006A71] mb-3">Quick Actions</h3>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-[#006A71]" />
                <span className="text-[#006A71]">View Analytics</span>
              </div>
            </button>

            <button className="w-full flex items-center justify-between bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#006A71]" />
                <span className="text-[#006A71]">Platform Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

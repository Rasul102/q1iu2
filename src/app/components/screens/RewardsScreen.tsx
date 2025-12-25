import { Trophy, Calendar, TrendingUp, Users, Gift } from 'lucide-react';

export function RewardsScreen() {
  const dailyChallenges = [
    { id: 1, title: 'Make 3 predictions', progress: 2, total: 3, reward: '50 PTS', active: true },
    { id: 2, title: 'Trade $100 volume', progress: 45, total: 100, reward: '100 PTS', active: true },
  ];

  const weeklyChallenges = [
    { id: 3, title: 'Win 5 markets', progress: 3, total: 5, reward: '500 PTS', active: false },
    { id: 4, title: 'Trade $1000 volume', progress: 680, total: 1000, reward: '1000 PTS', active: true },
  ];

  const volumeRewards = [
    { tier: 'Bronze', volume: '$1,000', reward: '200 PTS', unlocked: true },
    { tier: 'Silver', volume: '$5,000', reward: '1,500 PTS', unlocked: false },
    { tier: 'Gold', volume: '$25,000', reward: '10,000 PTS', unlocked: false },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 bg-[#F2EFE7]">
        <h1 className="mb-2 text-[#006A71]">Rewards</h1>
        
        {/* Total Points Card */}
        <div className="relative bg-gradient-to-br from-[#48A6A7] to-[#48A6A7]/80 rounded-2xl p-6 overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-radial from-[#9ACBD0]/30 via-transparent to-transparent rounded-full blur-xl" />
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-gradient-radial from-[#9ACBD0]/20 via-transparent to-transparent rounded-full blur-lg" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-[#F2EFE7]" />
              <span className="text-[#F2EFE7]/80">Total Points</span>
            </div>
            <div className="text-3xl text-[#F2EFE7]">2,450 PTS</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Daily Challenges */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#006A71]" />
            <h3 className="text-[#006A71]">Daily Challenges</h3>
          </div>
          
          <div className="space-y-3">
            {dailyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4"
              >
                {challenge.active && (
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-radial from-[#48A6A7]/20 via-[#9ACBD0]/10 to-transparent blur-sm pointer-events-none" />
                )}
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-[#006A71] mb-1">{challenge.title}</div>
                      <div className="text-sm text-[#006A71]/60">
                        {challenge.progress}/{challenge.total}
                      </div>
                    </div>
                    <div className="bg-[#48A6A7] text-[#F2EFE7] px-3 py-1 rounded-lg text-sm">
                      {challenge.reward}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#9ACBD0]/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#48A6A7] rounded-full transition-all"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Challenges */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#006A71]" />
            <h3 className="text-[#006A71]">Weekly Challenges</h3>
          </div>
          
          <div className="space-y-3">
            {weeklyChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4"
              >
                {challenge.active && (
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-radial from-[#48A6A7]/20 via-[#9ACBD0]/10 to-transparent blur-sm pointer-events-none" />
                )}
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-[#006A71] mb-1">{challenge.title}</div>
                      <div className="text-sm text-[#006A71]/60">
                        {challenge.progress}/{challenge.total}
                      </div>
                    </div>
                    <div className="bg-[#48A6A7] text-[#F2EFE7] px-3 py-1 rounded-lg text-sm">
                      {challenge.reward}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#9ACBD0]/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#48A6A7] rounded-full transition-all"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume-Based Rewards */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-[#006A71]" />
            <h3 className="text-[#006A71]">Volume Rewards</h3>
          </div>
          
          <div className="space-y-3">
            {volumeRewards.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-[#F2EFE7] border rounded-xl p-4 ${
                  tier.unlocked ? 'border-[#48A6A7]' : 'border-[#9ACBD0]'
                }`}
              >
                {tier.unlocked && (
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-radial from-[#48A6A7]/25 via-[#9ACBD0]/10 to-transparent blur-md pointer-events-none" />
                )}
                
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <div className="text-[#006A71] mb-1">{tier.tier} Tier</div>
                    <div className="text-sm text-[#006A71]/60">{tier.volume} volume</div>
                  </div>
                  <div>
                    {tier.unlocked ? (
                      <button className="bg-[#48A6A7] text-[#F2EFE7] px-4 py-2 rounded-lg active:scale-95 transition-transform">
                        Claim {tier.reward}
                      </button>
                    ) : (
                      <div className="bg-[#9ACBD0]/30 text-[#006A71]/60 px-4 py-2 rounded-lg">
                        {tier.reward}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Rewards */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-[#006A71]" />
            <h3 className="text-[#006A71]">Referral Rewards</h3>
          </div>
          
          <div className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4">
            <div className="text-[#006A71] mb-2">Invite friends and earn rewards</div>
            <div className="text-sm text-[#006A71]/70 mb-3">
              Get 100 PTS for each friend who joins and makes their first trade
            </div>
            <button className="w-full bg-[#48A6A7] text-[#F2EFE7] py-3 rounded-lg active:scale-[0.98] transition-transform">
              Share Referral Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

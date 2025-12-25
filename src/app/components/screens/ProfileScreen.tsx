import { Settings, Wallet, TrendingUp, Award, LogOut } from 'lucide-react';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';

export function ProfileScreen() {
  const wallet = useTonWallet();
  const address = useTonAddress();
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 bg-[#F2EFE7]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#006A71]">Profile</h1>
          <TonConnectButton />
        </div>

        {/* Profile Card */}
        <div className="relative bg-gradient-to-br from-[#48A6A7] to-[#48A6A7]/80 rounded-2xl p-6 overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-radial from-[#9ACBD0]/30 via-transparent to-transparent rounded-full blur-xl" />
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-gradient-radial from-[#9ACBD0]/20 via-transparent to-transparent rounded-full blur-lg" />

          <div className="relative z-10 flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-[#F2EFE7] rounded-full flex items-center justify-center text-2xl text-[#006A71]">
              👤
            </div>

            <div className="flex-1">
              <div className="text-xl text-[#F2EFE7] mb-1">CryptoTrader</div>
              <div className="text-sm text-[#F2EFE7]/80">{address ? `${address.slice(0, 4)}...${address.slice(-4)}` : '@connect_wallet'}</div>
            </div>

            <button className="p-2 hover:bg-[#F2EFE7]/10 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-[#F2EFE7]" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Wallet Connection */}
        <div className="mb-6">
          <div className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#006A71]" />
                <span className="text-[#006A71]">Wallet</span>
              </div>
              <div className="bg-[#48A6A7] text-[#F2EFE7] px-2 py-1 rounded text-xs">
                Connected
              </div>
            </div>
            <div className="text-sm text-[#006A71]/70 font-mono">
              0x742d...8a3f
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6">
          <h3 className="text-[#006A71] mb-3">Statistics</h3>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
              <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
              <div className="relative z-10">
                <div className="flex items-center gap-1 text-sm text-[#006A71]/70 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Total Volume</span>
                </div>
                <div className="text-xl text-[#006A71]">$8,450</div>
              </div>
            </div>

            <div className="relative bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 overflow-hidden">
              <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-gradient-radial from-[#48A6A7]/15 via-transparent to-transparent rounded-full blur-lg" />
              <div className="relative z-10">
                <div className="flex items-center gap-1 text-sm text-[#006A71]/70 mb-1">
                  <Award className="w-4 h-4" />
                  <span>Win Rate</span>
                </div>
                <div className="text-xl text-[#48A6A7]">68%</div>
              </div>
            </div>
          </div>

          <div className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-[#006A71]/60 mb-1">Markets</div>
                <div className="text-lg text-[#006A71]">24</div>
              </div>
              <div>
                <div className="text-xs text-[#006A71]/60 mb-1">Won</div>
                <div className="text-lg text-[#48A6A7]">16</div>
              </div>
              <div>
                <div className="text-xs text-[#006A71]/60 mb-1">Lost</div>
                <div className="text-lg text-destructive">8</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h3 className="text-[#006A71] mb-3">Recent Achievements</h3>

          <div className="space-y-3">
            <div className="relative bg-[#F2EFE7] border border-[#48A6A7] rounded-xl p-4">
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-radial from-[#48A6A7]/20 via-[#9ACBD0]/10 to-transparent blur-sm pointer-events-none" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#48A6A7] rounded-full flex items-center justify-center text-xl">
                  🏆
                </div>
                <div className="flex-1">
                  <div className="text-[#006A71] mb-0.5">Early Adopter</div>
                  <div className="text-sm text-[#006A71]/60">
                    Joined in the first 1000 users
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#9ACBD0] rounded-full flex items-center justify-center text-xl">
                  📈
                </div>
                <div className="flex-1">
                  <div className="text-[#006A71] mb-0.5">Volume Trader</div>
                  <div className="text-sm text-[#006A71]/60">
                    Traded over $5,000 total
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#9ACBD0] rounded-full flex items-center justify-center text-xl">
                  🎯
                </div>
                <div className="flex-1">
                  <div className="text-[#006A71] mb-0.5">Prediction Master</div>
                  <div className="text-sm text-[#006A71]/60">
                    Won 10 markets in a row
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mb-6">
          <h3 className="text-[#006A71] mb-3">Account</h3>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 active:scale-[0.98] transition-transform">
              <span className="text-[#006A71]">Privacy & Security</span>
              <Settings className="w-5 h-5 text-[#006A71]" />
            </button>

            <button className="w-full flex items-center justify-between bg-[#F2EFE7] border border-[#9ACBD0] rounded-xl p-4 active:scale-[0.98] transition-transform">
              <span className="text-[#006A71]">Notifications</span>
              <Settings className="w-5 h-5 text-[#006A71]" />
            </button>

            <button className="w-full flex items-center justify-between bg-[#F2EFE7] border border-destructive rounded-xl p-4 active:scale-[0.98] transition-transform">
              <span className="text-destructive">Disconnect Wallet</span>
              <LogOut className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

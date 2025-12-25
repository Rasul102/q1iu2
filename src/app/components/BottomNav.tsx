import { TrendingUp, Trophy, Briefcase, User, BarChart3, Shield } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  showAdmin?: boolean;
}

export function BottomNav({ activeTab, onTabChange, showAdmin }: BottomNavProps) {
  const tabs = [
    { id: 'markets', icon: BarChart3, label: 'Markets' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'rewards', icon: Trophy, label: 'Rewards' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  if (showAdmin) {
    tabs.splice(4, 0, { id: 'admin', icon: Shield, label: 'Admin' });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto px-4 pb-5">
      <div className="relative bg-black/25 backdrop-blur-2xl border border-[#C5D89D]/25 rounded-2xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center gap-1 py-2 rounded-xl transition-all active:scale-[0.98] ${
                  isActive ? 'text-[#F6F0D7]' : 'text-[#F6F0D7]/65 hover:text-[#F6F0D7]/85'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#C5D89D]/30 via-[#9CAB84]/10 to-transparent blur-sm" />
                )}
                <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span className={`text-[11px] relative z-10 ${isActive ? 'font-medium' : ''}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

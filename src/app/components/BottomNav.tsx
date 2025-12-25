import { TrendingUp, Trophy, Briefcase, User, ChartBar } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'markets', icon: ChartBar, label: 'Markets' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'rewards', icon: Trophy, label: 'Rewards' },
    { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#F2EFE7] border-t border-[#9ACBD0] pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all relative ${
                isActive ? 'text-[#006A71]' : 'text-[#9ACBD0]'
              }`}
            >
              {/* Eye effect glow on active tab */}
              {isActive && (
                <div className="absolute inset-0 rounded-lg bg-gradient-radial from-[#48A6A7]/20 via-[#9ACBD0]/10 to-transparent blur-sm animate-pulse" />
              )}
              <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs relative z-10 ${isActive ? 'font-medium' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
import { useEffect, useMemo, useState } from 'react';
import { useTonAddress } from '@tonconnect/ui-react';
import { BottomNav } from './components/BottomNav';
import { MarketsScreen } from './components/screens/MarketsScreen';
import { MarketDetailsScreen } from './components/screens/MarketDetailsScreen';
import { QuickTradeScreen } from './components/screens/QuickTradeScreen';
import { TrendingScreen } from './components/screens/TrendingScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { PortfolioScreen } from './components/screens/PortfolioScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AdminScreen } from './components/screens/AdminScreen';

type TabType = 'markets' | 'trending' | 'rewards' | 'portfolio' | 'profile' | 'admin';

const ADMIN_WALLETS = new Set<string>([
  // Rasul admin wallet (can extend later)
  'UQBCgJlpPbnHbuR4iMi_3wtNCBRTs3C-ZgI0Pm7AYgTkc3vY',
]);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('markets');
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedQuick, setSelectedQuick] = useState<'BTC' | 'ETH' | 'SOL' | 'BNB' | 'TON' | null>(null);

  const address = useTonAddress();
  const showAdmin = useMemo(() => !!address && ADMIN_WALLETS.has(address), [address]);

  // Telegram WebApp init
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    tg?.ready?.();
    tg?.expand?.();
  }, []);

  const handleMarketClick = (marketId: string) => {
    setSelectedMarket(marketId);
  };

  const handleBackFromDetails = () => {
    setSelectedMarket(null);
  };

  const handleQuickTrade = (coin: 'BTC' | 'ETH' | 'SOL' | 'BNB' | 'TON') => {
    setSelectedQuick(coin);
  };

  const handleBackFromQuick = () => {
    setSelectedQuick(null);
  };

  const renderScreen = () => {
    if (selectedQuick) {
      return <QuickTradeScreen coin={selectedQuick} onBack={handleBackFromQuick} />;
    }

    if (selectedMarket) {
      return <MarketDetailsScreen onBack={handleBackFromDetails} marketId={selectedMarket} />;
    }

    switch (activeTab) {
      case 'markets':
        return <MarketsScreen onMarketClick={handleMarketClick} onQuickTrade={handleQuickTrade} />;
      case 'trending':
        return <TrendingScreen onMarketClick={handleMarketClick} />;
      case 'rewards':
        return <RewardsScreen />;
      case 'portfolio':
        return <PortfolioScreen />;
      case 'profile':
        return <ProfileScreen onOpenAdmin={() => setActiveTab('admin')} showAdmin={showAdmin} />;
      case 'admin':
        return <AdminScreen />;
      default:
        return <MarketsScreen onMarketClick={handleMarketClick} onQuickTrade={handleQuickTrade} />;
    }
  };

  return (
    <div className="h-screen bg-[#112D4E] overflow-hidden flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-hidden">{renderScreen()}</div>
      <BottomNav activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSelectedMarket(null); setSelectedQuick(null); }} showAdmin={showAdmin} />
    </div>
  );
}

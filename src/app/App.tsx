import { useEffect, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { MarketsScreen } from './components/screens/MarketsScreen';
import { MarketDetailsScreen } from './components/screens/MarketDetailsScreen';
import { TrendingScreen } from './components/screens/TrendingScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { PortfolioScreen } from './components/screens/PortfolioScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

/**
 * Telegram Mini App - Crypto Prediction Market
 * 
 * SIGNATURE EYE EFFECT:
 * The app uses a subtle "eye/focus" visual effect throughout to indicate:
 * - Active elements (navigation tabs, cards, buttons)
 * - User attention points (selected outcomes, trending markets)
 * - Areas of importance (winning positions, active challenges)
 * 
 * Implementation: Radial gradients with colors #48A6A7 and #9ACBD0
 * Effect: Soft spotlight/iris-like glow suggesting observation and focus
 * 
 * STRICT COLOR PALETTE:
 * - #F2EFE7: Background, light surfaces
 * - #9ACBD0: Secondary surfaces, borders
 * - #48A6A7: Primary actions, highlights
 * - #006A71: Text, important UI elements
 */

export default function App() {
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    tg?.ready?.();
    tg?.expand?.();
  }, []);

  const [activeTab, setActiveTab] = useState('markets');
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  const handleMarketClick = (marketId: string) => {
    setSelectedMarket(marketId);
  };

  const handleBackFromDetails = () => {
    setSelectedMarket(null);
  };

  const renderScreen = () => {
    // Show market details if a market is selected
    if (selectedMarket) {
      return <MarketDetailsScreen onBack={handleBackFromDetails} />;
    }

    // Otherwise show the active tab screen
    switch (activeTab) {
      case 'markets':
        return <MarketsScreen onMarketClick={handleMarketClick} />;
      case 'trending':
        return <TrendingScreen onMarketClick={handleMarketClick} />;
      case 'rewards':
        return <RewardsScreen />;
      case 'portfolio':
        return <PortfolioScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <MarketsScreen onMarketClick={handleMarketClick} />;
    }
  };

  return (
    <div className="h-screen bg-[#F2EFE7] overflow-hidden flex flex-col max-w-md mx-auto">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
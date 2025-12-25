/**
 * Splash Screen Component
 * Initial loading screen for the Telegram Mini App
 */

export function SplashScreen() {
  return (
    <div className="h-screen bg-[#F6F0D7] flex flex-col items-center justify-center">
      {/* Eye Effect Logo */}
      <div className="relative mb-8">
        {/* Outer glow rings */}
        <div className="absolute inset-0 -m-12 rounded-full bg-gradient-radial from-[#89986D]/20 via-[#C5D89D]/10 to-transparent animate-pulse" />
        <div className="absolute inset-0 -m-8 rounded-full bg-gradient-radial from-[#89986D]/30 via-[#C5D89D]/15 to-transparent animate-pulse delay-150" />
        
        {/* Center circle - represents the "eye" focus */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-[#89986D] to-[#89986D]/80 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-[#F6F0D7] rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-[#89986D] rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-2xl text-[#89986D] mb-2">Prediction Market</h1>
      <p className="text-[#89986D]/70">Crypto predictions on Telegram</p>

      {/* Loading indicator */}
      <div className="mt-8 flex gap-1.5">
        <div className="w-2 h-2 bg-[#89986D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[#89986D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[#89986D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import { getCredits } from '../../../lib/demoDb';
import { getNetworkMode, type NetworkMode } from '../../../lib/network';
import { fetchTonBalanceTon, fetchTonUsdPrice } from '../../../lib/ton';

export function PortfolioScreen() {
  const wallet = useTonWallet();
  const address = useTonAddress();
  const isConnected = !!wallet?.account?.address || !!address;
  const displayAddress = useMemo(() => address || wallet?.account?.address || '', [address, wallet]);

  const [network] = useState<NetworkMode>(() => getNetworkMode());
  const [demoUsd, setDemoUsd] = useState<number>(0);
  const [walletUsd, setWalletUsd] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (!isConnected) {
        if (alive) setDemoUsd(0);
        return;
      }
      try {
        const credits = await getCredits(displayAddress, network);
        if (alive) setDemoUsd(credits);
      } catch {
        if (alive) setDemoUsd(0);
      }
    };
    run();
    const t = setInterval(run, 5_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [isConnected, displayAddress, network]);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (!isConnected || !displayAddress) {
        if (alive) setWalletUsd(null);
        return;
      }
      try {
        const ton = await fetchTonBalanceTon(displayAddress, network);
        const px = await fetchTonUsdPrice();
        if (!alive) return;
        if (ton == null || px == null) setWalletUsd(null);
        else setWalletUsd(ton * px);
      } catch {
        if (alive) setWalletUsd(null);
      }
    };
    run();
    const t = setInterval(run, 30_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [isConnected, displayAddress, network]);

  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-5 bg-[#112D4E]">
      <div className="rounded-3xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#C5D89D]" />
          <div className="text-[#F6F0D7] text-xl font-semibold">Portfolio</div>
        </div>

        {!isConnected ? (
          <div className="mt-4 text-[#F6F0D7]/65 text-sm">Connect your wallet to see balances.</div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
              <div className="text-[#F6F0D7]/65 text-xs">Wallet Balance (USD)</div>
              <div className="text-[#F6F0D7] text-2xl font-semibold mt-1">
                {walletUsd == null ? '--' : `$${walletUsd.toFixed(2)}`}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
              <div className="text-[#F6F0D7]/65 text-xs">Demo Balance (USD)</div>
              <div className="text-[#F6F0D7] text-2xl font-semibold mt-1">${demoUsd.toFixed(2)}</div>
              <div className="text-[#F6F0D7]/45 text-[11px] mt-1">Admin can top up for team demos.</div>
            </div>
          </div>
        )}

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
          <div className="text-[#F6F0D7] font-semibold">Stats</div>
          <div className="text-[#F6F0D7]/60 text-sm mt-1">Coming soon — will show total volume, wins/losses, and P&L.</div>
        </div>
      </div>
    </div>
  );
}

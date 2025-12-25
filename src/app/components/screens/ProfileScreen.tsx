import { useEffect, useMemo, useState } from 'react';
import { Settings, LogOut, Shield } from 'lucide-react';
import { TonConnectButton, useTonAddress, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import { getOrCreateUser, getCredits } from '../../../lib/demoDb';
import { getNetworkMode, type NetworkMode } from '../../../lib/network';
import { fetchTonBalanceTon, fetchTonUsdPrice } from '../../../lib/ton';

export function ProfileScreen({ onOpenAdmin, showAdmin }: { onOpenAdmin: () => void; showAdmin: boolean }) {
  const wallet = useTonWallet();
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

const isConnected = !!wallet?.account?.address || !!address;
  const displayAddress = useMemo(() => address || wallet?.account?.address || '', [address, wallet]);

  const [network] = useState<NetworkMode>(() => getNetworkMode());
  const [demoUsd, setDemoUsd] = useState<number>(0);
  const [walletUsd, setWalletUsd] = useState<number | null>(null);

  const tgUser = useMemo(() => {
    const u = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;
    const username = u?.username ? `@${u.username}` : null;
    return { username, id: u?.id ? String(u.id) : null };
  }, []);

  const maskedWallet = useMemo(() => {
    const a = displayAddress;
    if (!a) return '';
    return `${a.slice(0, 4)}...${a.slice(-4)}`;
  }, [displayAddress]);

  // Placeholder stats (will become real once bets are on-chain + recorded)
  const stats = useMemo(() => ({ wins: 0, losses: 0, winRate: 0, pnl24h: 0, activeTrades: 0 }), []);


  
  // ensure user exists when connected (username flow handled elsewhere / earlier)
  useEffect(() => {
    if (!isConnected || !displayAddress) return;
    // users table is network-agnostic in this MVP
    getOrCreateUser(displayAddress).catch(() => {});
  }, [isConnected, displayAddress]);

  // load demo credits
  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (!isConnected) {
        if (alive) setDemoUsd(0);
        return;
      }
      try {
        const creditsUsd = await getCredits(displayAddress, network);
        if (alive) setDemoUsd(creditsUsd);
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

  // load real TON wallet balance -> USD
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

  const disconnect = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch {
      // ignore
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-5 bg-[#112D4E]">
      <div className="rounded-3xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#F6F0D7] text-xl font-semibold">Profile</div>
            <div className="text-[#F6F0D7]/60 text-sm mt-1">Connect wallet to view your stats.</div>
          </div>
          <button className="w-10 h-10 rounded-xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-[#F6F0D7]/70" />
          </button>
        </div>

        <div className="mt-5">
          <TonConnectButton />
        </div>

        {isConnected && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
            <div className="text-[#F6F0D7]/70 text-sm">Wallet</div>
            <div className="text-[#F6F0D7] font-mono text-sm mt-1 break-all">{maskedWallet}</div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
                <div className="text-[#F6F0D7]/65 text-xs">Wallet Balance (USD)</div>
                <div className="text-[#F6F0D7] text-xl font-semibold mt-1">
                  {walletUsd == null ? '--' : `$${walletUsd.toFixed(2)}`}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
                <div className="text-[#F6F0D7]/65 text-xs">Demo Balance (USD)</div>
                <div className="text-[#F6F0D7] text-xl font-semibold mt-1">${demoUsd.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
                <div className="text-[#F6F0D7]/65 text-xs">Win Rate</div>
                <div className="text-[#F6F0D7] text-xl font-semibold mt-1">{stats.winRate.toFixed(0)}%</div>
                <div className="text-[#F6F0D7]/45 text-[11px] mt-1">{stats.wins}W • {stats.losses}L</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
                <div className="text-[#F6F0D7]/65 text-xs">P&L (24h)</div>
                <div className="text-[#F6F0D7] text-xl font-semibold mt-1">${stats.pnl24h.toFixed(2)}</div>
                <div className="text-[#F6F0D7]/45 text-[11px] mt-1">Active: {stats.activeTrades}</div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
              <div className="text-[#F6F0D7] font-semibold">My Achievements</div>
              <div className="text-[#F6F0D7]/60 text-sm mt-1">No recent achievements.</div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4 relative overflow-hidden">
              <div className="text-[#F6F0D7] font-semibold">Holdings</div>
              <div className="text-[#F6F0D7]/60 text-sm mt-1">NFT holdings will appear here.</div>
              <div className="absolute inset-0 backdrop-blur-2xl bg-black/30 flex items-center justify-center">
                <div className="text-[#F6F0D7] font-semibold">Coming soon</div>
              </div>
            </div>


            <div className="mt-3 flex gap-3">
              {showAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="flex-1 rounded-2xl py-3 font-semibold text-[#112D4E] bg-[#C5D89D] shadow-[0_0_20px_rgba(197,216,157,0.35)] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" /> Admin
                </button>
              )}

              <button
                onClick={disconnect}
                className="flex-1 rounded-2xl py-3 font-semibold text-[#F6F0D7] bg-black/20 border border-white/10 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

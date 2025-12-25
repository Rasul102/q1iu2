import { useEffect, useState } from 'react';
import { Coins, UserRound, RefreshCcw } from 'lucide-react';
import { getCreditsByUsername, topUpCreditsByUsername } from '../../../lib/demoDb';
import { getNetworkMode, setNetworkMode, type NetworkMode } from '../../../lib/network';

export function AdminScreen() {
  const [network, setNetwork] = useState<NetworkMode>(() => getNetworkMode());
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('100');
  const [status, setStatus] = useState<string>('');
  const [current, setCurrent] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNetworkMode(network);
  }, [network]);

  const refresh = async () => {
    const u = username.trim().replace(/^@/, '');
    if (!u) return;
    setLoading(true);
    setStatus('');
    try {
      const c = await getCreditsByUsername(u, network);
      setCurrent(c.balance_usd);
    } catch (e: any) {
      setCurrent(null);
      setStatus(e?.message ?? 'Failed to load user balance');
    } finally {
      setLoading(false);
    }
  };

  const topUp = async () => {
    const u = username.trim().replace(/^@/, '');
    const n = Number(amount);
    if (!u || !isFinite(n) || n <= 0) return;

    setLoading(true);
    setStatus('');
    try {
      const res = await topUpCreditsByUsername(u, n, network);
      setCurrent(res.balance_usd);
      setStatus(`TopUp OK: @${res.username} now has $${res.balance_usd.toFixed(2)} demo balance on ${network}.`);
    } catch (e: any) {
      setStatus(e?.message ?? 'TopUp failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 pb-28 pt-5 bg-[#112D4E]">
      <div className="rounded-3xl border border-[#C5D89D]/25 bg-black/10 backdrop-blur-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#F6F0D7] text-xl font-semibold">Admin Panel</div>
            <div className="text-[#F6F0D7]/60 text-sm mt-1">Top up demo balance by username.</div>
          </div>

          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value as NetworkMode)}
            className="bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-[#F6F0D7] text-sm"
          >
            <option value="testnet">Testnet</option>
            <option value="mainnet">Mainnet</option>
          </select>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
            <div className="text-[#F6F0D7]/70 text-sm mb-2 flex items-center gap-2">
              <UserRound className="w-4 h-4" /> Username
            </div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
              className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-[#F6F0D7] placeholder:text-[#F6F0D7]/40"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4">
            <div className="text-[#F6F0D7]/70 text-sm mb-2 flex items-center gap-2">
              <Coins className="w-4 h-4" /> Amount (USD)
            </div>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              inputMode="decimal"
              className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-[#F6F0D7] placeholder:text-[#F6F0D7]/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              className="rounded-2xl py-4 font-semibold text-[#F6F0D7] bg-black/20 border border-white/10 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Check
            </button>
            <button
              onClick={topUp}
              disabled={loading}
              className="rounded-2xl py-4 font-semibold text-[#112D4E] bg-[#C5D89D] shadow-[0_0_20px_rgba(197,216,157,0.35)] active:scale-[0.98] disabled:opacity-60"
            >
              TopUp demo
            </button>
          </div>

          <div className="text-[#F6F0D7]/65 text-sm">
            Current demo balance: <span className="text-[#F6F0D7] font-semibold">{current == null ? '--' : `$${current.toFixed(2)}`}</span>
          </div>

          {status && (
            <div className="rounded-2xl border border-white/10 bg-black/10 backdrop-blur-2xl p-4 text-sm text-[#F6F0D7]/80">
              {status}
            </div>
          )}

          <div className="text-xs text-[#F6F0D7]/50">
            Note: user must have created a profile (connected wallet + username) before admin can top up.
          </div>
        </div>
      </div>
    </div>
  );
}

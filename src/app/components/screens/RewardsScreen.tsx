import { useMemo, useState } from 'react';
import { Trophy, Users, ListChecks, Crown, Sparkles, Copy, Check } from 'lucide-react';
import { useTonAddress, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

type RewardsTab = 'quests' | 'referrals' | 'leaderboard' | 'nft';

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        'relative rounded-2xl border border-[#C5D89D]/50 bg-[#F6F0D7]/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.20)] ' +
        className
      }
    >
      {children}
    </div>
  );
}

function ComingSoonCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <GlassCard className="p-5 overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[#F6F0D7] text-lg font-semibold">{title}</div>
          <div className="text-[#F6F0D7]/75 text-sm mt-1">{subtitle}</div>
        </div>
        <div className="text-[#F6F0D7]/60 text-xs rounded-full border border-[#C5D89D]/40 px-3 py-1 bg-black/10">
          Coming soon
        </div>
      </div>

      {/* Frosted "locked" overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-2xl" />
      <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(246,240,215,0.18),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(197,216,157,0.16),transparent_55%)]" />
    </GlassCard>
  );
}

export function RewardsScreen() {
  const wallet = useTonWallet();
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const [tab, setTab] = useState<RewardsTab>('quests');
  const [copied, setCopied] = useState(false);

  const referralCode = useMemo(() => {
    if (!address) return '';
    return address.slice(0, 6) + '...' + address.slice(-6);
  }, [address]);

  const referralText = useMemo(() => {
    // We don’t know the bot username here, so we provide a shareable code for the demo.
    return `Quicky invite code: ${referralCode}`;
  }, [referralCode]);

  async function copyReferral() {
    try {
      await navigator.clipboard.writeText(referralText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <div className="h-full overflow-y-auto px-4 pb-24 pt-5 bg-[#112D4E]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#F6F0D7]" />
          <h1 className="text-[#F6F0D7] text-xl font-semibold">Rewards</h1>
        </div>
        <div className="text-[#F6F0D7]/70 text-sm">Early user hub</div>
      </div>

      {/* Internal menu (tabs) */}
      <GlassCard className="p-2 mb-5">
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'quests', label: 'Quests', icon: ListChecks },
            { id: 'referrals', label: 'Referrals', icon: Users },
            { id: 'leaderboard', label: 'Board', icon: Crown },
            { id: 'nft', label: 'NFT', icon: Sparkles },
          ].map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id as RewardsTab)}
                className={
                  'relative rounded-xl px-2 py-3 flex flex-col items-center justify-center gap-1 transition-all ' +
                  (active
                    ? 'bg-[#C5D89D]/25 border border-[#C5D89D]/40'
                    : 'bg-black/10 border border-[#C5D89D]/15 hover:bg-black/15')
                }
              >
                <Icon className={'w-5 h-5 ' + (active ? 'text-[#F6F0D7]' : 'text-[#F6F0D7]/70')} />
                <div className={'text-xs ' + (active ? 'text-[#F6F0D7] font-medium' : 'text-[#F6F0D7]/70')}>
                  {label}
                </div>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Content */}
      {tab === 'quests' && (
        <div className="space-y-4">
          <ComingSoonCard
            title="Daily challenges"
            subtitle="Complete simple actions to earn points and multipliers."
          />
          <ComingSoonCard
            title="Weekly challenges"
            subtitle="Bigger goals. Bigger rewards. Weekly resets."
          />
          <ComingSoonCard
            title="Volume rewards"
            subtitle="Trading volume tiers and weekly prize pools will appear here."
          />
        </div>
      )}

      {tab === 'referrals' && (
        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[#F6F0D7] text-lg font-semibold">Referrals</div>
                <div className="text-[#F6F0D7]/75 text-sm mt-1">
                  Invite teammates for a multiplier boost (demo).
                </div>
              </div>
              <div className="text-[#F6F0D7]/60 text-xs rounded-full border border-[#C5D89D]/40 px-3 py-1 bg-black/10">
                0.1x per referral
              </div>
            </div>

            <div className="mt-4">
              {!wallet ? (
                <button
                  onClick={() => tonConnectUI.openModal()}
                  className="w-full rounded-xl py-3 bg-[#C5D89D] text-[#112D4E] font-semibold active:scale-[0.99] transition-transform"
                >
                  Connect wallet to get your invite code
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl border border-[#C5D89D]/40 bg-black/10 p-4">
                    <div className="text-[#F6F0D7]/75 text-xs">Your invite code</div>
                    <div className="text-[#F6F0D7] text-lg font-semibold mt-1">{referralCode}</div>
                    <div className="text-[#F6F0D7]/60 text-xs mt-1">
                      (When we connect the bot, this will become a real referral link.)
                    </div>
                  </div>

                  <button
                    onClick={copyReferral}
                    className="w-full rounded-xl py-3 bg-[#89986D] text-[#F6F0D7] font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition-transform"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied' : 'Copy invite text'}
                  </button>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === 'leaderboard' && (
        <div className="space-y-4">
          <ComingSoonCard
            title="Leaderboard"
            subtitle="Top traders & top referrers will show up here once betting goes live."
          />
        </div>
      )}

      {tab === 'nft' && (
        <div className="space-y-4">
          <ComingSoonCard
            title="NFT multiplier"
            subtitle="Hold Quicky NFT(s) to boost rewards. Mint + perks coming soon."
          />
        </div>
      )}
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { WalletGate } from "@/components/wallet-gate";
import { useWallet, shortAddress } from "@/lib/wallet-context";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { getAllModules, getOwnedModules, type MintedModule } from "@/lib/modules-store";
import { ModuleCard } from "@/components/module-card";
import { Button } from "@/components/ui/button";
import { Download, Coins, FileStack, TrendingUp, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Educator Dashboard · Morrighans NFT" },
      { name: "description", content: "Track your modules, downloads, and royalties in real-time." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t } = useI18n();
  return (
    <WalletGate title={t("gate.dashboard_title")} description={t("gate.dashboard_desc")}>
      <DashboardContent />
    </WalletGate>
  );
}

function DashboardContent() {
  const { address, balance } = useWallet();
  const { t } = useI18n();
  const [owned, setOwned] = useState<MintedModule[]>([]);
  const [all, setAll] = useState<MintedModule[]>([]);

  useEffect(() => {
    setOwned(getOwnedModules(address));
    setAll(getAllModules());
  }, [address]);

  const showcase = owned.length > 0 ? owned : all.slice(0, 3);
  const totalDownloads = showcase.reduce((acc, m) => acc + m.downloads, 0);
  const totalRoyalties = showcase.reduce((acc, m) => acc + parseFloat(m.royaltiesSol), 0).toFixed(4);

  const stats = [
    { icon: FileStack, label: t("dash.stat_published"), value: showcase.length.toString(), accent: "bg-primary text-primary-foreground" },
    { icon: Download, label: t("dash.stat_downloads"), value: totalDownloads.toLocaleString(), accent: "bg-chain text-primary" },
    { icon: Coins, label: t("dash.stat_royalties"), value: `${totalRoyalties} SOL`, accent: "bg-success text-success-foreground" },
    { icon: TrendingUp, label: t("dash.stat_balance"), value: `${balance} SOL`, accent: "bg-primary-glow text-primary-foreground" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:px-8 md:py-14">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">{t("dash.eyebrow")}</div>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{t("dash.greeting")}</h1>
          <p className="mt-1 text-sm text-muted-foreground font-mono">{shortAddress(address)}</p>
        </div>
        <Button asChild className="bg-primary">
          <Link to="/upload"><Plus className="mr-2 h-4 w-4" /> {t("dash.new_module")}</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-bold">{s.value}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">{t("dash.your_modules")}</h2>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((m) => (
            <ModuleCard key={m.id} m={m} />
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-card-soft">
        <h3 className="font-display text-lg font-semibold">{t("dash.history")}</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">{t("dash.col_module")}</th>
                <th className="py-2">{t("dash.col_token")}</th>
                <th className="py-2">{t("dash.col_downloads")}</th>
                <th className="py-2 text-right">{t("dash.col_royalty")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {showcase.map((m) => (
                <tr key={m.id}>
                  <td className="py-3">{m.title}</td>
                  <td className="py-3 font-mono text-xs">#{m.tokenId}</td>
                  <td className="py-3">{m.downloads}</td>
                  <td className="py-3 text-right font-mono text-chain">{m.royaltiesSol} SOL</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

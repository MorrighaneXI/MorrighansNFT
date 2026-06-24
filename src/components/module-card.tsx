import { Link } from "@tanstack/react-router";
import { BadgeCheck, Download, FileText } from "lucide-react";
import type { MintedModule } from "@/lib/modules-store";
import { useI18n } from "@/lib/i18n";

const categoryGradient: Record<string, string> = {
  Sains: "from-sky-500/30 to-indigo-500/30",
  Ekologi: "from-emerald-500/30 to-teal-500/30",
  Kimia: "from-fuchsia-500/30 to-pink-500/30",
  Matematika: "from-amber-500/30 to-orange-500/30",
  Bahasa: "from-rose-500/30 to-red-500/30",
  Sejarah: "from-yellow-500/30 to-amber-500/30",
  Teknologi: "from-cyan-500/30 to-blue-500/30",
};

export function ModuleCard({ m }: { m: MintedModule }) {
  const { t } = useI18n();
  const grad = categoryGradient[m.category] ?? "from-primary/30 to-primary-glow/30";
  return (
    <Link
      to="/certificate/$id"
      params={{ id: m.id }}
      className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${grad}`}>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-medium backdrop-blur">
          <BadgeCheck className="h-3 w-3 text-chain" /> Verified NFT
        </div>
        <div className="absolute right-3 top-3 rounded-md bg-background/90 px-2 py-1 text-[10px] font-mono backdrop-blur">
          #{m.tokenId}
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-primary/90 px-2 py-1 text-[10px] font-medium text-primary-foreground">
          {t(`cat.${m.category}`)}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="h-14 w-14 text-foreground/30 transition group-hover:scale-110" />
        </div>
      </div>
      <div className="p-4">
        <div className="line-clamp-2 font-display text-base font-semibold leading-snug">{m.title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{m.educator} · {m.institution}</div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Download className="h-3 w-3" /> {m.downloads.toLocaleString()}
          </span>
          <span className="font-mono text-chain">{(m.royaltyBps / 100).toFixed(0)}% royalty</span>
        </div>
      </div>
    </Link>
  );
}

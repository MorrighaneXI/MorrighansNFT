import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CATEGORIES, getAllModules, type MintedModule, type ModuleCategory } from "@/lib/modules-store";
import { ModuleCard } from "@/components/module-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Module Gallery · Morrighans NFT" },
      { name: "description", content: "Explore NFT-verified teaching modules from educators." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useI18n();
  const [modules, setModules] = useState<MintedModule[]>([]);
  const [filter, setFilter] = useState<ModuleCategory | "all">("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    setModules(getAllModules());
  }, []);

  const filtered = modules.filter((m) => {
    if (filter !== "all" && m.category !== filter) return false;
    if (q && !`${m.title} ${m.educator} ${m.institution}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-10 md:px-8 md:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">{t("gallery.eyebrow")}</div>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{t("gallery.title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("gallery.subtitle")}</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("gallery.search_placeholder")} className="pl-9" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip label={t("gallery.all")} active={filter === "all"} onClick={() => setFilter("all")} />
        {CATEGORIES.map((c) => (
          <FilterChip key={c} label={t(`cat.${c}`)} active={filter === c} onClick={() => setFilter(c)} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          {t("gallery.empty")}
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => (
            <ModuleCard key={m.id} m={m} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FloatingSchoolItems } from "@/components/floating-school-items";
import { useI18n } from "@/lib/i18n";
import {
  ShieldCheck,
  Sparkles,
  Fingerprint,
  Database,
  Anchor,
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Lock,
  Coins,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Morrighans NFT — Protect Teaching Modules with Blockchain" },
      {
        name: "description",
        content:
          "Educators can prove ownership of digital teaching modules through NFTs. SHA-256 hashing, IPFS metadata, and automatic royalties.",
      },
      { property: "og:title", content: "Morrighans NFT — Copyright for Teaching Modules on Blockchain" },
      {
        property: "og:description",
        content: "Mint your teaching modules in minutes. Secure, transparent, verified.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { t } = useI18n();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <FloatingSchoolItems />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-glow/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-chain/30 blur-3xl" />

        <div className="container relative mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur">
              <Sparkles className="h-3 w-3 text-chain" />
              {t("home.badge")}
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-balance md:text-6xl">
              {t("home.hero_title_a")} <span className="text-chain">{t("home.hero_title_b")}</span> {t("home.hero_title_c")}
            </h1>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/80 md:text-lg">
              {t("home.hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-chain text-primary hover:opacity-90">
                <Link to="/upload">
                  {t("home.cta_mint")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-primary-foreground hover:bg-white/10">
                <Link to="/gallery">{t("home.cta_gallery")}</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-primary-foreground/70">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-chain" /> {t("home.trust_sha")}</div>
              <div className="flex items-center gap-2"><Database className="h-4 w-4 text-chain" /> {t("home.trust_ipfs")}</div>
              <div className="flex items-center gap-2"><Anchor className="h-4 w-4 text-chain" /> {t("home.trust_metaplex")}</div>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-elegant">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60">{t("home.cert_label")}</div>
                <BadgeCheck className="h-5 w-5 text-chain" />
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-chain/30 to-primary-glow/30 p-6">
                <div className="font-display text-xl font-semibold leading-tight">{t("home.cert_title")}</div>
                <div className="mt-1 text-xs text-primary-foreground/70">{t("home.cert_author")}</div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <div className="text-primary-foreground/50 uppercase tracking-wider">{t("home.cert_token")}</div>
                    <div className="font-mono mt-1">#1042</div>
                  </div>
                  <div>
                    <div className="text-primary-foreground/50 uppercase tracking-wider">{t("home.cert_royalty")}</div>
                    <div className="font-mono mt-1">10%</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-primary-foreground/50 uppercase tracking-wider">{t("home.cert_hash")}</div>
                    <div className="font-mono mt-1 truncate">9f1a3b7c8e2d4f5a6b7c…</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-mono text-primary-foreground/60">AnKx…UaM</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2 py-1 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {t("home.cert_minted")}
                </span>
              </div>
            </div>
            <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-2xl bg-chain/30 backdrop-blur md:block" />
            <div className="absolute -bottom-6 -left-6 hidden h-16 w-16 rounded-2xl bg-primary-glow/30 backdrop-blur md:block" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {[
            { n: "1,284", l: t("home.stat_modules") },
            { n: "486", l: t("home.stat_educators") },
            { n: "127", l: t("home.stat_institutions") },
            { n: "10%", l: t("home.stat_royalty") },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-2xl font-bold text-primary md:text-3xl">{s.n}</div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="container mx-auto px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">{t("home.why_eyebrow")}</div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t("home.why_title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("home.why_desc")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Lock, title: t("home.feat1_title"), text: t("home.feat1_text") },
            { icon: Coins, title: t("home.feat2_title"), text: t("home.feat2_text") },
            { icon: GraduationCap, title: t("home.feat3_title"), text: t("home.feat3_text") },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-5 font-display text-lg font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">{t("home.how_eyebrow")}</div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t("home.how_title")}</h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { i: Fingerprint, t: t("home.step_hash_t"), d: t("home.step_hash_d") },
              { i: Database, t: t("home.step_ipfs_t"), d: t("home.step_ipfs_d") },
              { i: Anchor, t: t("home.step_mint_t"), d: t("home.step_mint_d") },
              { i: BadgeCheck, t: t("home.step_verify_t"), d: t("home.step_verify_d") },
            ].map((s, idx) => {
              const Icon = s.i;
              return (
                <div key={s.t} className="relative rounded-2xl border border-border bg-card p-6 shadow-card-soft">
                  <div className="absolute -top-3 left-6 rounded-md bg-chain px-2 py-0.5 text-[10px] font-mono text-primary">
                    {t("home.step_label")} {idx + 1}
                  </div>
                  <Icon className="h-7 w-7 text-primary" />
                  <div className="mt-4 font-display text-lg font-semibold">{s.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 text-primary-foreground shadow-elegant md:p-16">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <FloatingSchoolItems />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-display text-2xl font-bold md:text-3xl text-balance">
                {t("home.cta_title")}
              </h3>
              <p className="mt-3 max-w-xl text-primary-foreground/80">
                {t("home.cta_sub")}
              </p>
            </div>
            <Button asChild size="lg" className="bg-chain text-primary hover:opacity-90">
              <Link to="/upload">{t("home.cta_now")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

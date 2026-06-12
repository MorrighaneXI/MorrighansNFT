import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FloatingSchoolItems } from "@/components/floating-school-items";
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
      { title: "Morrighans NFT — Lindungi Modul Ajar dengan Blockchain" },
      {
        name: "description",
        content:
          "Pendidik Indonesia kini bisa membuktikan kepemilikan modul ajar digital melalui NFT. Hashing SHA-256, metadata IPFS, dan royalti otomatis.",
      },
      { property: "og:title", content: "Morrighans NFT — Hak Cipta Modul Ajar di Blockchain" },
      {
        property: "og:description",
        content: "Mint modul ajar Anda dalam hitungan menit. Aman, transparan, terverifikasi.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <VerticalStreaks />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-glow/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-chain/30 blur-3xl" />

        <div className="container relative mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur">
              <Sparkles className="h-3 w-3 text-chain" />
              Era baru perlindungan IPR pendidik
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-balance md:text-6xl">
              Modul ajar Anda, <span className="text-chain">aset digital</span> yang sah di blockchain.
            </h1>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/80 md:text-lg">
              Morrighans NFT membantu dosen & guru Indonesia melindungi karya intelektualnya — hashing kriptografis,
              metadata terdesentralisasi, dan sertifikat kepemilikan yang dapat diverifikasi siapa saja.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-chain text-primary hover:opacity-90">
                <Link to="/upload">
                  Mulai Mint Modul <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-primary-foreground hover:bg-white/10">
                <Link to="/gallery">Jelajahi Galeri</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-primary-foreground/70">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-chain" /> SHA-256 Verified</div>
              <div className="flex items-center gap-2"><Database className="h-4 w-4 text-chain" /> IPFS Storage</div>
              <div className="flex items-center gap-2"><Anchor className="h-4 w-4 text-chain" /> ERC-721 Standard</div>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-elegant">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/60">Certificate of Ownership</div>
                <BadgeCheck className="h-5 w-5 text-chain" />
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-chain/30 to-primary-glow/30 p-6">
                <div className="font-display text-xl font-semibold leading-tight">Ekosistem Mangrove Pesisir Jawa</div>
                <div className="mt-1 text-xs text-primary-foreground/70">Dr. Anindya Kusuma · Universitas Indonesia</div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <div className="text-primary-foreground/50 uppercase tracking-wider">Token</div>
                    <div className="font-mono mt-1">#1042</div>
                  </div>
                  <div>
                    <div className="text-primary-foreground/50 uppercase tracking-wider">Royalty</div>
                    <div className="font-mono mt-1">10%</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-primary-foreground/50 uppercase tracking-wider">Content Hash</div>
                    <div className="font-mono mt-1 truncate">0x9f1a3b7c8e2d4f5a6b7c…</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-mono text-primary-foreground/60">0xA42f…91Cd</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2 py-1 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Minted
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
            { n: "1,284", l: "Modul terverifikasi" },
            { n: "486", l: "Pendidik terdaftar" },
            { n: "127", l: "Institusi mitra" },
            { n: "10%", l: "Royalti otomatis" },
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
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">Mengapa NFT untuk pendidik?</div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Karya akademis menghadapi tantangan digital baru.</h2>
          <p className="mt-4 text-muted-foreground">
            Plagiarisme, distribusi tanpa izin, dan hilangnya jejak kepemilikan adalah masalah nyata. Morrighans NFT memberi bukti yang tidak bisa diubah.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Lock,
              title: "Bukti kepemilikan permanen",
              text: "Setiap modul memiliki hash unik & timestamp di blockchain — tak bisa diklaim ulang.",
            },
            {
              icon: Coins,
              title: "Royalti otomatis",
              text: "Smart contract menjamin pendidik mendapat 10% dari setiap transfer aset.",
            },
            {
              icon: GraduationCap,
              title: "Kredensial akademik",
              text: "Sertifikat digital yang dapat diverifikasi oleh institusi, kampus, dan publik.",
            },
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
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">Alur Mint</div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Empat langkah dari modul ke sertifikat.</h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              { i: Fingerprint, t: "Hashing", d: "File dipindai dan diubah jadi sidik jari SHA-256." },
              { i: Database, t: "IPFS", d: "Metadata diunggah ke jaringan penyimpanan terdesentralisasi." },
              { i: Anchor, t: "Mint", d: "Smart contract menerbitkan token ERC-721 atas nama Anda." },
              { i: BadgeCheck, t: "Verifikasi", d: "Sertifikat publik siap dibagikan & diverifikasi siapa saja." },
            ].map((s, idx) => {
              const Icon = s.i;
              return (
                <div key={s.t} className="relative rounded-2xl border border-border bg-card p-6 shadow-card-soft">
                  <div className="absolute -top-3 left-6 rounded-md bg-chain px-2 py-0.5 text-[10px] font-mono text-primary">
                    STEP {idx + 1}
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
          <VerticalStreaks />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="font-display text-2xl font-bold md:text-3xl text-balance">
                Siap mengamankan modul ajar pertama Anda?
              </h3>
              <p className="mt-3 max-w-xl text-primary-foreground/80">
                Hubungkan wallet, unggah modul, dan terbitkan sertifikat NFT — dalam waktu kurang dari dua menit.
              </p>
            </div>
            <Button asChild size="lg" className="bg-chain text-primary hover:opacity-90">
              <Link to="/upload">Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

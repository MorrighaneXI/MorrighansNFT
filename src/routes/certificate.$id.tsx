import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getModule, type MintedModule } from "@/lib/modules-store";
import { useEffect, useState } from "react";
import { BadgeCheck, ArrowLeft, ExternalLink, Copy, Check, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/certificate/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Certificate #${params.id} · Morrighans NFT` },
      { name: "description", content: "NFT ownership certificate for an educator's teaching module." },
    ],
  }),
  component: CertificatePage,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error, reset }) => <ErrorView error={error} reset={reset} />,
});

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">{t("cert.not_found")}</h1>
      <Link to="/gallery" className="mt-4 inline-block text-chain underline">{t("cert.back_gallery")}</Link>
    </div>
  );
}

function ErrorView({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">{t("cert.load_fail")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-4 text-chain underline">{t("cert.try_again")}</button>
    </div>
  );
}

function CertificatePage() {
  const { id } = Route.useParams();
  const { t, lang } = useI18n();
  const [m, setM] = useState<MintedModule | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const found = getModule(id);
    if (!found) {
      setLoaded(true);
      return;
    }
    setM(found);
    setLoaded(true);
  }, [id]);

  if (!loaded) return <div className="container mx-auto p-10 text-muted-foreground">{t("cert.loading")}</div>;
  if (!m) {
    throw notFound();
  }

  function copy(value: string, key: string) {
    navigator.clipboard.writeText(value);
    setCopied(key);
    toast.success(t("cert.copied"));
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <Link to="/gallery" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("cert.back")}
      </Link>

      <div className="relative mt-6 overflow-hidden rounded-3xl bg-hero p-8 text-primary-foreground shadow-elegant md:p-12">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs backdrop-blur">
              <BadgeCheck className="h-3 w-3 text-chain" /> {t("cert.verified")}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl text-balance">{m.title}</h1>
            <p className="mt-2 text-primary-foreground/80">{m.educator} · {m.institution}</p>
            <p className="mt-4 max-w-xl text-sm text-primary-foreground/70">{m.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-md bg-white/10 px-3 py-1 text-xs">{t(`cat.${m.category}`)}</span>
              <span className="rounded-md bg-white/10 px-3 py-1 text-xs font-mono">Token #{m.tokenId}</span>
              <span className="rounded-md bg-white/10 px-3 py-1 text-xs">{t("home.cert_royalty")} {m.royaltyBps / 100}%</span>
            </div>
          </div>

          <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-chain/40 to-primary-glow/40 backdrop-blur">
            <FileText className="h-16 w-16 text-primary-foreground/60" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card-soft">
          <h2 className="font-display text-lg font-semibold">{t("cert.blockchain_details")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("cert.blockchain_sub")}</p>

          <div className="mt-5 divide-y divide-border text-sm">
            <Row label={t("cert.row_hash")} value={m.hash} mono onCopy={() => copy(m.hash, "hash")} copied={copied === "hash"} />
            <Row label={t("cert.row_cid")} value={m.ipfsCid} mono onCopy={() => copy(m.ipfsCid, "cid")} copied={copied === "cid"}
              external={`https://ipfs.io/ipfs/${m.ipfsCid}`} />
            <Row label={t("cert.row_mint")} value={m.mintAddress} mono onCopy={() => copy(m.mintAddress, "mint")} copied={copied === "mint"}
              external={`https://explorer.solana.com/address/${m.mintAddress}?cluster=devnet`} />
            <Row label={t("cert.row_sig")} value={m.signature} mono onCopy={() => copy(m.signature, "sig")} copied={copied === "sig"}
              external={`https://explorer.solana.com/tx/${m.signature}?cluster=devnet`} />
            <Row label={t("cert.row_owner")} value={m.owner} mono />
            <Row label={t("cert.row_issued")} value={new Date(m.mintedAt).toLocaleString(lang, { dateStyle: "long", timeStyle: "short" })} />
            <Row label={t("cert.row_file")} value={`${m.fileName} · ${(m.fileSize / 1024 / 1024).toFixed(2)} MB`} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h3 className="font-display text-base font-semibold">{t("cert.stats")}</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("cert.downloads")}</span>
                <span className="font-semibold">{m.downloads.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("cert.royalties")}</span>
                <span className="font-mono text-chain">{m.royaltiesSol} SOL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("cert.status")}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {t("cert.active")}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h3 className="font-display text-base font-semibold">{t("cert.verification")}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{t("cert.verify_desc")}</p>
            <Button asChild className="mt-4 w-full bg-primary">
              <a href={`https://explorer.solana.com/tx/${m.signature}?cluster=devnet`} target="_blank" rel="noreferrer">
                {t("cert.open_explorer")} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" className="mt-2 w-full">
              <Download className="mr-2 h-4 w-4" /> {t("cert.download")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  onCopy,
  copied,
  external,
}: {
  label: string;
  value: string;
  mono?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  external?: string;
}) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="flex min-w-0 items-center gap-2">
        <span className={`min-w-0 truncate ${mono ? "font-mono text-xs" : "text-sm"}`}>{value}</span>
        {onCopy && (
          <button onClick={onCopy} className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Copy">
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
        {external && (
          <a href={external} target="_blank" rel="noreferrer" className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Open">
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

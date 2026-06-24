import logoAsset from "@/assets/morrighans-logo.png.asset.json";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-24">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white overflow-hidden">
              <img src={logoAsset.url} alt="Morrighans logo" className="h-6 w-6 object-contain" />
            </div>
            <div className="font-display font-semibold">Morrighans NFT</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            {t("footer.tagline")}
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">{t("footer.platform")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{t("footer.f_gallery")}</li>
            <li>{t("footer.f_mint")}</li>
            <li>{t("footer.f_dashboard")}</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">{t("footer.tech")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Metaplex NFT Standard</li>
            <li>IPFS Storage</li>
            <li>Solana Devnet</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4">
        <div className="container mx-auto px-4 md:px-8 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <div>{t("footer.copyright", { year: new Date().getFullYear() })}</div>
          <div className="font-mono">v0.1.0 · testnet</div>
        </div>
      </div>
    </footer>
  );
}

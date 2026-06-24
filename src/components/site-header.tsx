import { Link } from "@tanstack/react-router";
import { ConnectWalletButton } from "./connect-wallet-button";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/lib/i18n";
import logoAsset from "@/assets/morrighans-logo.png.asset.json";

export function SiteHeader() {
  const { t } = useI18n();
  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/upload", label: t("nav.upload") },
    { to: "/dashboard", label: t("nav.dashboard") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-card-soft overflow-hidden">
            <img src={logoAsset.url} alt="Morrighans logo" className="h-7 w-7 object-contain" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold">Morrighans</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t("nav.tagline")}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}

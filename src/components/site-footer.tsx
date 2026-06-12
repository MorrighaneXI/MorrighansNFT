import { ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-24">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-hero">
              <ShieldCheck className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="font-display font-semibold">Morrighans NFT</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Platform perlindungan hak kekayaan intelektual untuk pendidik. Aman, transparan, dan terverifikasi di blockchain.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Platform</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Galeri Modul</li>
            <li>Mint NFT</li>
            <li>Dashboard Royalti</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Teknologi</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>ERC-721 Standard</li>
            <li>IPFS Storage</li>
            <li>Sepolia Testnet</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4">
        <div className="container mx-auto px-4 md:px-8 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Morrighans NFT. Untuk demo akademis.</div>
          <div className="font-mono">v0.1.0 · testnet</div>
        </div>
      </div>
    </footer>
  );
}

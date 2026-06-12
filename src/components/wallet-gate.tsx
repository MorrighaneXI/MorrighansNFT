import { useWallet } from "@/lib/wallet-context";
import { ConnectWalletButton } from "./connect-wallet-button";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";

export function WalletGate({ children, title = "Hubungkan Wallet Anda", description }: { children: ReactNode; title?: string; description?: string }) {
  const { isConnected } = useWallet();
  if (isConnected) return <>{children}</>;
  return (
    <div className="container mx-auto px-4 md:px-8 py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-card-soft">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {description ?? "Halaman ini terlindungi. Hubungkan wallet untuk mengakses fitur minting & dashboard royalti Anda."}
        </p>
        <div className="mt-6 flex justify-center">
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
}

import { useWallet } from "@/lib/wallet-context";
import { useI18n } from "@/lib/i18n";
import { ConnectWalletButton } from "./connect-wallet-button";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";

export function WalletGate({ children, title, description }: { children: ReactNode; title?: string; description?: string }) {
  const { isConnected } = useWallet();
  const { t } = useI18n();
  if (isConnected) return <>{children}</>;
  return (
    <div className="container mx-auto px-4 md:px-8 py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-card-soft">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">{title ?? t("gate.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {description ?? t("gate.desc")}
        </p>
        <div className="mt-6 flex justify-center">
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useWallet, shortAddress } from "@/lib/wallet-context";
import { Wallet, LogOut, Copy, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

export function ConnectWalletButton() {
  const { address, balance, chainName, isConnected, isConnecting, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!isConnected) {
    return (
      <Button
        onClick={() =>
          connect()
            .then(() => toast.success("Wallet terhubung", { description: "Solana Devnet siap digunakan." }))
            .catch(() => toast.error("Gagal menghubungkan wallet"))
        }
        disabled={isConnecting}
        className="bg-chain text-primary-foreground hover:opacity-90 shadow-card-soft"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnecting ? "Menghubungkan..." : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-mono">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
          {shortAddress(address)}
          <span className="ml-3 text-muted-foreground">{balance} SOL</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Connected to</div>
          <div className="text-sm font-medium">{chainName}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <div className="text-xs text-muted-foreground">Alamat</div>
          <div className="font-mono text-xs break-all mt-1">{address}</div>
          <div className="text-xs text-muted-foreground mt-3">Saldo Testnet</div>
          <div className="text-lg font-semibold">{balance} SOL</div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(address ?? "");
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          Salin alamat
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            disconnect();
            toast("Wallet diputuskan");
          }}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Mock Solana wallet provider. Structured so it can be swapped for
// @solana/wallet-adapter-react + @solana/web3.js later.

type WalletState = {
  address: string | null;
  balance: string; // SOL devnet, formatted
  chainName: string;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletState | null>(null);

const STORAGE_KEY = "morrighans:wallet";
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function randomBase58(len: number) {
  let out = "";
  for (let i = 0; i < len; i++) out += BASE58[Math.floor(Math.random() * BASE58.length)];
  return out;
}

function randomAddress() {
  // Solana public keys are base58-encoded, typically 43–44 chars.
  return randomBase58(44);
}

export function shortAddress(addr: string | null | undefined) {
  if (!addr) return "";
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.0000");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAddress(parsed.address);
        setBalance(parsed.balance);
      } catch {
        // ignore
      }
    }
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    await new Promise((r) => setTimeout(r, 900));
    const addr = randomAddress();
    const bal = (Math.random() * 12 + 0.5).toFixed(4); // SOL devnet airdrop range
    setAddress(addr);
    setBalance(bal);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ address: addr, balance: bal }));
    }
    setIsConnecting(false);
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance("0.0000");
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<WalletState>(
    () => ({
      address,
      balance,
      chainName: "Solana Devnet",
      isConnected: !!address,
      isConnecting,
      connect,
      disconnect,
    }),
    [address, balance, isConnecting, connect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export { randomBase58 };

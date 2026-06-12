import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Mock wallet provider. Structured so it can be swapped for wagmi/ethers later
// by replacing the connect/disconnect implementations.

type WalletState = {
  address: string | null;
  balance: string; // ETH testnet, formatted
  chainName: string;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletState | null>(null);

const STORAGE_KEY = "morrighans:wallet";

function randomAddress() {
  const chars = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 40; i++) out += chars[Math.floor(Math.random() * 16)];
  return out;
}

export function shortAddress(addr: string | null | undefined) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
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
    // Simulate wallet handshake latency
    await new Promise((r) => setTimeout(r, 900));
    const addr = randomAddress();
    const bal = (Math.random() * 4 + 0.25).toFixed(4);
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
      chainName: "Sepolia Testnet",
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

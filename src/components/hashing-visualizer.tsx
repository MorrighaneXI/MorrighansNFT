import { useEffect, useState } from "react";
import { Fingerprint, Cpu, Database, Anchor, CheckCircle2 } from "lucide-react";

export type MintStage =
  | { name: "idle" }
  | { name: "hashing"; progress: number }
  | { name: "ipfs"; cid?: string }
  | { name: "chain"; tx?: string }
  | { name: "done"; tx: string; cid: string; hash: string };

const steps = [
  { key: "hashing", label: "SHA-256 Hashing", icon: Fingerprint },
  { key: "ipfs", label: "Upload ke IPFS", icon: Database },
  { key: "chain", label: "Sign & Mint on-chain", icon: Cpu },
  { key: "done", label: "Token diterbitkan", icon: Anchor },
] as const;

export function HashingVisualizer({ stage, hash }: { stage: MintStage; hash?: string }) {
  const activeIdx = steps.findIndex((s) => s.key === stage.name);
  const [stream, setStream] = useState<string[]>([]);

  useEffect(() => {
    if (stage.name === "hashing" || stage.name === "ipfs" || stage.name === "chain") {
      const id = setInterval(() => {
        const chars = "0123456789abcdef";
        let line = "";
        for (let i = 0; i < 48; i++) line += chars[Math.floor(Math.random() * 16)];
        setStream((prev) => [line, ...prev].slice(0, 8));
      }, 90);
      return () => clearInterval(id);
    }
  }, [stage.name]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-primary text-primary-foreground shadow-elegant">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-chain animate-pulse" />
          Cryptographic Pipeline
        </div>
        <span className="font-mono text-xs text-primary-foreground/60">morrighans.proto://mint</span>
      </div>

      <div className="grid gap-0 md:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === activeIdx;
          const isDone = i < activeIdx || stage.name === "done";
          return (
            <div
              key={s.key}
              className={`relative flex flex-col items-center justify-center gap-2 p-5 border-white/5 md:border-r last:border-r-0 ${
                isActive ? "bg-white/5" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  isDone
                    ? "bg-success text-success-foreground border-success"
                    : isActive
                      ? "bg-chain text-primary border-chain animate-pulse-ring"
                      : "border-white/15 text-primary-foreground/40"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div className="text-xs font-medium tracking-wide">{s.label}</div>
              {isActive && stage.name === "hashing" && (
                <div className="mt-1 h-1 w-full max-w-[120px] overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-chain transition-all" style={{ width: `${Math.round(stage.progress * 100)}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative h-44 overflow-hidden border-t border-white/10 bg-black/40 font-mono text-[11px] leading-5 text-chain/80">
        {stage.name !== "idle" && stage.name !== "done" && (
          <div className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-chain/30 via-chain/10 to-transparent animate-scan" />
        )}
        <div className="p-4 space-y-0.5">
          {stage.name === "idle" && (
            <div className="text-primary-foreground/40">// menunggu file untuk diproses…</div>
          )}
          {stream.map((line, i) => (
            <div key={i} style={{ opacity: 1 - i * 0.1 }}>
              0x{line}
            </div>
          ))}
        </div>
      </div>

      {hash && (
        <div className="border-t border-white/10 px-5 py-3 text-xs">
          <div className="text-primary-foreground/50 uppercase tracking-wider">Content Hash · SHA-256</div>
          <div className="mt-1 break-all font-mono text-chain">{hash}</div>
        </div>
      )}
    </div>
  );
}

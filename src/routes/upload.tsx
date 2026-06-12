import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { WalletGate } from "@/components/wallet-gate";
import { FileDropzone } from "@/components/file-dropzone";
import { HashingVisualizer, type MintStage } from "@/components/hashing-visualizer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useWallet, shortAddress } from "@/lib/wallet-context";
import { addModule, CATEGORIES, generateCid, generateTxHash, hashFile, type ModuleCategory } from "@/lib/modules-store";
import { toast } from "sonner";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Mint Modul Ajar · Morrighans NFT" },
      { name: "description", content: "Unggah modul ajar, hashing kriptografis, dan minting NFT dalam satu alur." },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  return (
    <WalletGate title="Mint Modul Ajar" description="Hubungkan wallet untuk membuktikan kepemilikan modul Anda di blockchain.">
      <UploadForm />
    </WalletGate>
  );
}

function UploadForm() {
  const { address } = useWallet();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [educator, setEducator] = useState("");
  const [institution, setInstitution] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ModuleCategory>("Sains");

  const [stage, setStage] = useState<MintStage>({ name: "idle" });
  const [hash, setHash] = useState<string | undefined>();
  const [minting, setMinting] = useState(false);

  const canSubmit = !!file && title.trim() && educator.trim() && institution.trim() && description.trim() && !minting;

  async function handleMint() {
    if (!file || !address) return;
    setMinting(true);
    try {
      // 1. Hashing
      setStage({ name: "hashing", progress: 0 });
      const h = await hashFile(file, (p) => setStage({ name: "hashing", progress: p }));
      setHash(h);

      // 2. IPFS upload (simulated)
      setStage({ name: "ipfs" });
      await new Promise((r) => setTimeout(r, 1200));
      const cid = generateCid();
      setStage({ name: "ipfs", cid });

      // 3. On-chain mint (simulated)
      setStage({ name: "chain" });
      await new Promise((r) => setTimeout(r, 1400));
      const tx = generateTxHash();

      // 4. Done
      const tokenId = 1000 + Math.floor(Math.random() * 9000);
      const id = `mod-${Date.now()}`;
      const newModule = {
        id,
        tokenId,
        title: title.trim(),
        educator: educator.trim(),
        institution: institution.trim(),
        description: description.trim(),
        category,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || "unknown",
        hash: h,
        ipfsCid: cid,
        txHash: tx,
        owner: shortAddress(address),
        royaltyBps: 1000,
        downloads: 0,
        royaltiesWei: "0.0000",
        mintedAt: Date.now(),
      };
      addModule(newModule);
      setStage({ name: "done", tx, cid, hash: h });

      toast.success("Mint berhasil!", {
        description: `Token #${tokenId} diterbitkan ke wallet Anda.`,
      });

      setTimeout(() => {
        navigate({ to: "/certificate/$id", params: { id } });
      }, 900);
    } catch (e) {
      console.error(e);
      toast.error("Mint gagal", { description: "Coba lagi atau hubungi support." });
      setStage({ name: "idle" });
    } finally {
      setMinting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">Mint NFT</div>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Terbitkan modul ajar sebagai NFT</h1>
        <p className="mt-2 text-muted-foreground">
          Isi metadata, unggah file modul, dan biarkan sistem menghasilkan sidik jari kriptografis sebelum melakukan minting.
        </p>

        <div className="mt-10 space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h2 className="font-display text-lg font-semibold">1. Metadata Modul</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="title">Judul Modul</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="contoh: Ekosistem Mangrove Pesisir"
                  maxLength={120}
                />
              </div>
              <div>
                <Label htmlFor="educator">Nama Lengkap Pendidik</Label>
                <Input id="educator" value={educator} onChange={(e) => setEducator(e.target.value)} placeholder="Dr. Anindya Kusuma" maxLength={80} />
              </div>
              <div>
                <Label htmlFor="institution">Institusi</Label>
                <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Universitas Indonesia" maxLength={120} />
              </div>
              <div>
                <Label>Kategori Mata Pelajaran</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as ModuleCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="desc">Deskripsi</Label>
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ringkasan singkat tentang modul Anda…"
                  rows={4}
                  maxLength={500}
                />
                <div className="mt-1 text-right text-[11px] text-muted-foreground">{description.length}/500</div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h2 className="font-display text-lg font-semibold">2. Unggah File</h2>
            <p className="mt-1 text-sm text-muted-foreground">File akan diproses secara lokal untuk menghasilkan SHA-256 hash sebelum diunggah ke IPFS.</p>
            <div className="mt-5">
              <FileDropzone file={file} onFile={setFile} />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h2 className="font-display text-lg font-semibold">3. Royalti & Kontrak</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Standard</div>
                <div className="mt-1 font-mono">ERC-721</div>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Royalty Fee</div>
                <div className="mt-1 font-mono text-chain">10%</div>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Network</div>
                <div className="mt-1 font-mono">Sepolia Testnet</div>
              </div>
            </div>
          </section>

          {(stage.name !== "idle" || hash) && (
            <section className="space-y-3">
              <h2 className="font-display text-lg font-semibold">4. Proses Mint</h2>
              <HashingVisualizer stage={stage} hash={hash} />
            </section>
          )}

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
            <div className="text-xs text-muted-foreground sm:mr-auto">
              <Sparkles className="mr-1 inline h-3 w-3 text-chain" />
              Estimasi gas: ~0.0012 ETH (testnet)
            </div>
            <Button size="lg" disabled={!canSubmit} onClick={handleMint} className="bg-primary">
              {minting ? "Memproses…" : "Mint NFT"} {!minting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

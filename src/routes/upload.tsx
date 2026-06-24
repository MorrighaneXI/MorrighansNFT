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
import { useI18n } from "@/lib/i18n";
import { addModule, CATEGORIES, generateCid, generateSignature, generateMintAddress, hashFile, type ModuleCategory } from "@/lib/modules-store";
import { toast } from "sonner";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Mint Module · Morrighans NFT" },
      { name: "description", content: "Upload teaching module, cryptographic hashing, and NFT minting in one flow." },
    ],
  }),
  component: UploadPage,
});

function UploadPage() {
  const { t } = useI18n();
  return (
    <WalletGate title={t("gate.upload_title")} description={t("gate.upload_desc")}>
      <UploadForm />
    </WalletGate>
  );
}

function UploadForm() {
  const { address } = useWallet();
  const { t } = useI18n();
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
      setStage({ name: "hashing", progress: 0 });
      const h = await hashFile(file, (p) => setStage({ name: "hashing", progress: p }));
      setHash(h);

      setStage({ name: "ipfs" });
      await new Promise((r) => setTimeout(r, 1200));
      const cid = generateCid();
      setStage({ name: "ipfs", cid });

      setStage({ name: "chain" });
      await new Promise((r) => setTimeout(r, 1400));
      const signature = generateSignature();
      const mintAddress = generateMintAddress();

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
        mintAddress,
        signature,
        owner: shortAddress(address),
        royaltyBps: 1000,
        downloads: 0,
        royaltiesSol: "0.0000",
        mintedAt: Date.now(),
      };
      addModule(newModule);
      setStage({ name: "done", tx: signature, cid, hash: h });

      toast.success(t("upload.toast_success"), {
        description: t("upload.toast_success_desc", { tokenId }),
      });

      setTimeout(() => {
        navigate({ to: "/certificate/$id", params: { id } });
      }, 900);
    } catch (e) {
      console.error(e);
      toast.error(t("upload.toast_fail"), { description: t("upload.toast_fail_desc") });
      setStage({ name: "idle" });
    } finally {
      setMinting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-chain">{t("upload.eyebrow")}</div>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{t("upload.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("upload.subtitle")}</p>

        <div className="mt-10 space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h2 className="font-display text-lg font-semibold">{t("upload.section1")}</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="title">{t("upload.f_title")}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("upload.f_title_ph")}
                  maxLength={120}
                />
              </div>
              <div>
                <Label htmlFor="educator">{t("upload.f_educator")}</Label>
                <Input id="educator" value={educator} onChange={(e) => setEducator(e.target.value)} placeholder="Dr. Anindya Kusuma" maxLength={80} />
              </div>
              <div>
                <Label htmlFor="institution">{t("upload.f_institution")}</Label>
                <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="University of Indonesia" maxLength={120} />
              </div>
              <div>
                <Label>{t("upload.f_category")}</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as ModuleCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{t(`cat.${c}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="desc">{t("upload.f_desc")}</Label>
                <Textarea
                  id="desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("upload.f_desc_ph")}
                  rows={4}
                  maxLength={500}
                />
                <div className="mt-1 text-right text-[11px] text-muted-foreground">{description.length}/500</div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h2 className="font-display text-lg font-semibold">{t("upload.section2")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("upload.section2_hint")}</p>
            <div className="mt-5">
              <FileDropzone file={file} onFile={setFile} />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
            <h2 className="font-display text-lg font-semibold">{t("upload.section3")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("upload.standard")}</div>
                <div className="mt-1 font-mono">Metaplex NFT</div>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("upload.royalty_fee")}</div>
                <div className="mt-1 font-mono text-chain">10%</div>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("upload.network")}</div>
                <div className="mt-1 font-mono">Solana Devnet</div>
              </div>
            </div>
          </section>

          {(stage.name !== "idle" || hash) && (
            <section className="space-y-3">
              <h2 className="font-display text-lg font-semibold">{t("upload.section4")}</h2>
              <HashingVisualizer stage={stage} hash={hash} />
            </section>
          )}

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end">
            <div className="text-xs text-muted-foreground sm:mr-auto">
              <Sparkles className="mr-1 inline h-3 w-3 text-chain" />
              {t("upload.fee_estimate")}
            </div>
            <Button size="lg" disabled={!canSubmit} onClick={handleMint} className="bg-primary">
              {minting ? t("upload.btn_processing") : t("upload.btn_mint")} {!minting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

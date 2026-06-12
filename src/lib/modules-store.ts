// Local mock data store for minted modules. Persists in localStorage so the
// demo feels real across reloads. Swap for on-chain reads later.

export type ModuleCategory = "Sains" | "Ekologi" | "Kimia" | "Matematika" | "Bahasa" | "Sejarah" | "Teknologi";

export const CATEGORIES: ModuleCategory[] = [
  "Sains",
  "Ekologi",
  "Kimia",
  "Matematika",
  "Bahasa",
  "Sejarah",
  "Teknologi",
];

export type MintedModule = {
  id: string;
  tokenId: number;
  title: string;
  educator: string;
  institution: string;
  description: string;
  category: ModuleCategory;
  fileName: string;
  fileSize: number;
  fileType: string;
  hash: string;
  ipfsCid: string;
  txHash: string;
  owner: string;
  royaltyBps: number; // basis points (1000 = 10%)
  downloads: number;
  royaltiesWei: string; // formatted ETH
  mintedAt: number;
};

const KEY = "morrighans:modules";

const SEED: MintedModule[] = [
  {
    id: "seed-1",
    tokenId: 1042,
    title: "Ekosistem Mangrove Pesisir Jawa",
    educator: "Dr. Anindya Kusuma",
    institution: "Universitas Indonesia",
    description: "Modul interaktif kelas X tentang peran mangrove dalam mitigasi abrasi.",
    category: "Ekologi",
    fileName: "mangrove-pesisir.pdf",
    fileSize: 4_200_000,
    fileType: "application/pdf",
    hash: "0x9f1a3b7c8e2d4f5a6b7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c",
    ipfsCid: "bafybeibwzifw5e3l6r7c2yc4o5w7s2k3q4u5v6w7x8y9z0a1b2c3d4e5f6",
    txHash: "0x4a7d1ed414474e4033867fbd9d2f6b09c0a8e9b1c2d3e4f5061728394a5b6c7d",
    owner: "0xA42f...91Cd",
    royaltyBps: 1000,
    downloads: 312,
    royaltiesWei: "0.4820",
    mintedAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
  {
    id: "seed-2",
    tokenId: 1043,
    title: "Stoikiometri untuk SMA Kelas XI",
    educator: "Prof. Rangga Pratama",
    institution: "Institut Teknologi Bandung",
    description: "Pembahasan visual reaksi kimia dengan latihan adaptif.",
    category: "Kimia",
    fileName: "stoikiometri.pdf",
    fileSize: 6_800_000,
    fileType: "application/pdf",
    hash: "0x2b4c6d8e0f1a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e4f6081a2b3c4d5e6f708",
    ipfsCid: "bafybeibhash2example3kimia4modulajar5digital6pendidik7indonesia8",
    txHash: "0x1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a",
    owner: "0xB13c...7e22",
    royaltyBps: 1000,
    downloads: 198,
    royaltiesWei: "0.2140",
    mintedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "seed-3",
    tokenId: 1044,
    title: "Trigonometri Kontekstual",
    educator: "Sari Wulandari, M.Pd.",
    institution: "SMA Negeri 8 Yogyakarta",
    description: "Penerapan trigonometri pada arsitektur lokal dan navigasi.",
    category: "Matematika",
    fileName: "trigonometri.pdf",
    fileSize: 3_100_000,
    fileType: "application/pdf",
    hash: "0x7c8d9e0f1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5",
    ipfsCid: "bafybeitrigonometri9kontekstual0arsitektur1lokal2nusantara3edu4",
    txHash: "0x9e8d7c6b5a4938271605f4e3d2c1b0a9988776655443322110aabbccddeeff00",
    owner: "0xC91a...44Fe",
    royaltyBps: 1000,
    downloads: 87,
    royaltiesWei: "0.0910",
    mintedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
];

export function getAllModules(): MintedModule[] {
  if (typeof window === "undefined") return SEED;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) {
    window.localStorage.setItem(KEY, JSON.stringify(SEED));
    return SEED;
  }
  try {
    return JSON.parse(raw) as MintedModule[];
  } catch {
    return SEED;
  }
}

export function getModule(id: string): MintedModule | undefined {
  return getAllModules().find((m) => m.id === id);
}

export function addModule(m: MintedModule) {
  const all = getAllModules();
  const next = [m, ...all];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function getOwnedModules(address: string | null): MintedModule[] {
  if (!address) return [];
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
  return getAllModules().filter((m) => m.owner === short || m.owner === address);
}

export function generateTxHash() {
  const chars = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 64; i++) out += chars[Math.floor(Math.random() * 16)];
  return out;
}

export function generateCid() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "bafybei";
  for (let i = 0; i < 52; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

// Browser-only SHA-256 helper used by the hashing visualizer.
export async function hashFile(file: File, onProgress?: (pct: number) => void): Promise<string> {
  const chunkSize = 1024 * 256;
  let offset = 0;
  // Stream the file through SubtleCrypto via incremental array building.
  // SubtleCrypto.digest doesn't support streaming, so we accumulate and hash at the end
  // while emitting progress.
  const buffers: Uint8Array[] = [];
  while (offset < file.size) {
    const slice = file.slice(offset, offset + chunkSize);
    const buf = new Uint8Array(await slice.arrayBuffer());
    buffers.push(buf);
    offset += chunkSize;
    onProgress?.(Math.min(1, offset / file.size));
    // Let the UI paint
    await new Promise((r) => setTimeout(r, 8));
  }
  const total = buffers.reduce((acc, b) => acc + b.length, 0);
  const merged = new Uint8Array(total);
  let pos = 0;
  for (const b of buffers) {
    merged.set(b, pos);
    pos += b.length;
  }
  const digest = await crypto.subtle.digest("SHA-256", merged);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return "0x" + hex;
}

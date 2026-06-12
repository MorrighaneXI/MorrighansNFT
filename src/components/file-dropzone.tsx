import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileCheck2, X } from "lucide-react";

export function FileDropzone({ file, onFile }: { file: File | null; onFile: (f: File | null) => void }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const f = e.dataTransfer.files?.[0];
      if (f) onFile(f);
    },
    [onFile],
  );

  if (file) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/15 text-success">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-medium">{file.name}</div>
            <div className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type || "unknown"}
            </div>
          </div>
        </div>
        <button
          onClick={() => onFile(null)}
          className="rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          aria-label="Hapus file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onClick={() => ref.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
        drag ? "border-primary-glow bg-primary-glow/5" : "border-border bg-secondary/30 hover:bg-secondary/60"
      }`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <UploadCloud className="h-7 w-7" />
      </div>
      <div className="mt-4 font-medium">Tarik & lepas file modul di sini</div>
      <div className="mt-1 text-xs text-muted-foreground">PDF, MP4, atau gambar infografis · maks 50MB</div>
      <input
        ref={ref}
        type="file"
        accept=".pdf,video/*,image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

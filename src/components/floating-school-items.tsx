// Subtle floating school items rising from the bottom — used inside hero/CTA
// backgrounds. Parent must be `relative` + `overflow-hidden`.
import {
  GraduationCap,
  BookOpen,
  Pencil,
  PenTool,
  Ruler,
  Backpack,
  Calculator,
  Notebook,
  Lightbulb,
  Beaker,
  Compass,
  Palette,
} from "lucide-react";

const ICONS = [GraduationCap, BookOpen, Pencil, PenTool, Ruler, Backpack, Calculator, Notebook, Lightbulb, Beaker, Compass, Palette];

const ITEMS = Array.from({ length: 18 }).map((_, i) => {
  // Deterministic pseudo-random so SSR + client match.
  const Icon = ICONS[i % ICONS.length];
  const left = (i * 53 + 7) % 96;
  const duration = 18 + ((i * 7) % 16);   // 18s – 34s (slow drift)
  const delay = -((i * 2.3) % 20);        // negative delay → already in motion on load
  const size = 22 + ((i * 13) % 28);      // 22 – 50 px
  const opacity = 0.06 + ((i * 11) % 9) / 100; // 0.06 – 0.15
  const rotate = (i * 37) % 360;
  const sway = (i % 2 === 0 ? 1 : -1) * (8 + ((i * 5) % 12)); // px
  return { Icon, left, duration, delay, size, opacity, rotate, sway, key: i };
});

export function FloatingSchoolItems() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {ITEMS.map(({ Icon, left, duration, delay, size, opacity, rotate, sway, key }) => (
        <span
          key={key}
          className="absolute bottom-[-10%] text-primary-foreground"
          style={{
            left: `${left}%`,
            opacity,
            // CSS vars consumed by the keyframes below
            ["--rot" as never]: `${rotate}deg`,
            ["--sway" as never]: `${sway}px`,
            animation: `float-up ${duration}s linear ${delay}s infinite`,
          }}
        >
          <Icon style={{ width: size, height: size }} strokeWidth={1.25} />
        </span>
      ))}
    </div>
  );
}

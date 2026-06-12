// Animated vertical light streaks rising from the bottom — used inside hero/CTA
// backgrounds. Positioned absolutely; parent must be `relative` + `overflow-hidden`.

const STREAKS = Array.from({ length: 18 }).map((_, i) => {
  // Deterministic pseudo-random so SSR + client match.
  const left = (i * 53) % 100;
  const duration = 4 + ((i * 7) % 7);    // 4s – 10s
  const delay = (i * 0.6) % 6;
  const height = 60 + ((i * 17) % 120);  // 60 – 180px
  const opacity = 0.25 + ((i * 11) % 50) / 100; // 0.25 – 0.75
  return { left, duration, delay, height, opacity };
});

export function VerticalStreaks() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {STREAKS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute bottom-0 w-px"
          style={{
            left: `${s.left}%`,
            height: `${s.height}px`,
            opacity: s.opacity,
            background:
              "linear-gradient(to top, transparent, oklch(0.85 0.12 200 / 0.9), transparent)",
            animation: `streak-up ${s.duration}s linear ${s.delay}s infinite`,
            filter: "blur(0.4px)",
          }}
        />
      ))}
    </div>
  );
}

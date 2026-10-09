import { memo } from "react";

function hash(str: string) {
  let x = 2166136261;
  for (let i = 0; i < str.length; i++) x = Math.imul(x ^ str.charCodeAt(i), 16777619);
  return x >>> 0;
}
const pick = <T,>(arr: T[], r: number, n: number) => arr[(Math.imul(r, 2654435761 + n * 40503) >>> 16) % arr.length];
const R = (x: number, y: number, w: number, h: number, c: string, k: string) => <rect key={k} x={x} y={y} width={w} height={h} fill={c} />;

/** 10x10 pixel-art face, deterministic per name */
export const PixelAvatar = memo(function PixelAvatar({ name, size = 34 }: { name: string; size?: number }) {
  const r = hash(name);
  const bg = pick(["#bfe3ff", "#ffd6e0", "#d8f0c0", "#ffe9a8", "#e0d4ff", "#c8f0e8"], r, 1);
  const skin = pick(["#ffdcb8", "#f3c48a", "#e2a672", "#ffe3cc"], r, 2);
  const hair = pick(["#222222", "#5a3a1a", "#9a4f22", "#d9a830", "#c23a6a", "#3a56c8"], r, 3);
  const shirt = pick(["#e8281c", "#2a8ad0", "#2a9a3a", "#8a3ab8", "#e8821c", "#444444"], r, 4);
  const st = (r >>> 7) % 4;
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} className="px block shrink-0 shadow-[0_0_0_1px_#000]" aria-hidden>
      {R(0, 0, 10, 10, bg, "bg")}{R(1, 8, 8, 2, shirt, "sh")}{R(2, 3, 6, 5, skin, "fc")}{R(2, 2, 6, 2, hair, "h1")}
      {st === 1 && [R(1, 3, 1, 5, hair, "a"), R(8, 3, 1, 5, hair, "b")]}
      {st === 2 && [R(4, 1, 2, 1, hair, "a"), R(1, 4, 1, 1, hair, "b"), R(8, 4, 1, 1, hair, "c")]}
      {st === 3 && [R(1, 2, 8, 1, hair, "a"), R(2, 1, 6, 1, hair, "b")]}
      {R(3, 5, 1, 1, "#222", "e1")}{R(6, 5, 1, 1, "#222", "e2")}{R(4, 7, 2, 1, "#b03030", "m")}
    </svg>
  );
});

const PERSON = ["..XXXX..", "..XXXX..", "..XXXX..", "...XX...", ".XXXXXX.", "XXXXXXXX", "XXXXXXXX", "XXXXXXXX"];
const BUBBLE = [".XXXXXX.", "XXXXXXXX", "XXXXXXXX", "XXXXXXXX", ".XXXXXX.", "..XX....", ".X......", "........"];
export function PixelIcon({ kind, className }: { kind: "person" | "bubble"; className?: string }) {
  const rows = kind === "person" ? PERSON : BUBBLE;
  return (
    <svg viewBox="0 0 8 8" className={className} shapeRendering="crispEdges" aria-hidden>
      {rows.flatMap((row, y) => [...row].map((ch, x) => (ch === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#000" /> : null)))}
    </svg>
  );
}

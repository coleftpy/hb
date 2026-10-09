export const cn = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");
export const rnd = (a: number, b: number) => Math.random() * (b - a) + a;
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
export const pickOne = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];
export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

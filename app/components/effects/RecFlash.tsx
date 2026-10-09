"use client";
import { useEffect, useRef, useState } from "react";
import { FX_CONFIG, fxAcquire, fxRelease } from "@/lib/fx";
import { rnd } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** REC badge in the top-right corner for ~0.6s (the dot blinks once), very rarely. */
export function RecFlash({ enabled }: { enabled: boolean }) {
  const [tc, setTc] = useState<string | null>(null);
  const [dot, setDot] = useState(true);
  const t0 = useRef(Date.now());

  useEffect(() => {
    if (!enabled) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let timer: ReturnType<typeof setTimeout>, alive = true;
    const schedule = (r: readonly [number, number]) => { timer = setTimeout(show, rnd(r[0], r[1]) * 1000); };
    function show() {
      if (!alive) return;
      if (!fxAcquire()) { schedule([5, 8]); return; }
      const t = Math.floor((Date.now() - t0.current) / 1000);
      setTc(`${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(t % 60)}`);
      setDot(true);
      timers.push(setTimeout(() => setDot(false), 180), setTimeout(() => setDot(true), 260));
      timers.push(setTimeout(() => { setTc(null); fxRelease(); if (alive) schedule(FX_CONFIG.recEvery); }, 620));
    }
    schedule(FX_CONFIG.recFirst);
    return () => { alive = false; clearTimeout(timer); timers.forEach(clearTimeout); };
  }, [enabled]);

  if (!tc) return null;
  return (
    <div
      aria-hidden className="pointer-events-none fixed right-3 z-[9999] flex items-center gap-2 border border-white/40 bg-black/75 px-2.5 py-[5px] font-[Courier_New,Consolas,monospace] text-[15px] font-bold tracking-wider text-white"
      style={{ top: "calc(10px + env(safe-area-inset-top, 0px))" }}
    >
      <i className="block h-[13px] w-[13px] rounded-full bg-[#ff1a1a] shadow-[0_0_10px_#ff1a1a]" style={{ opacity: dot ? 1 : 0 }} />
      REC <span className="text-xs font-normal tracking-normal text-[#ddd]">{tc}</span>
    </div>
  );
}

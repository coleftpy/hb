"use client";
import gsap from "gsap";
import { EasePack, RoughEase } from "gsap/EasePack";
import { useEffect, useRef } from "react";
import { FX_CONFIG, fxAcquire, fxRelease } from "@/lib/fx";
import { pickOne, reducedMotion, rnd } from "@/lib/utils";

const BANDS = 8;
const COLORS = ["#8888FF", "#888800"];   // shift a band left / right

/**
 * Subtle screen glitch driven by GSAP: a few horizontal bands of #screen shift sideways,
 * the red and cyan channels split ~2px and faint scanlines flicker. Nothing else moves.
 * Short bursts, rare. Tune the timing in lib/fx.ts.
 */
export function GlitchFx({ enabled }: { enabled: boolean }) {
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const offR = useRef<SVGFEOffsetElement>(null);
  const offB = useRef<SVGFEOffsetElement>(null);
  const bands = useRef<(SVGFEFloodElement | null)[]>([]);
  const scan = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || reducedMotion()) return;
    const screen = document.getElementById("screen");
    if (!screen) return;
    gsap.registerPlugin(EasePack);
    const rough = RoughEase.ease.config({ strength: 2.5, points: 12 });
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;

    const schedule = (r: readonly [number, number]) => { timer = setTimeout(run, rnd(r[0], r[1]) * 1000); };
    function run() {
      if (!alive) return;
      if (!fxAcquire()) { schedule([5, 8]); return; }
      const H = screen!.clientHeight, k = 3 + Math.floor(Math.random() * 3);
      bands.current.forEach((b, n) => {
        if (!b) return;
        if (n < k) {
          b.setAttribute("y", String(Math.round(rnd(0, H))));
          b.setAttribute("height", String(Math.round(rnd(4, H * 0.08))));
          b.setAttribute("flood-color", pickOne(COLORS));
        } else b.setAttribute("height", "0.01");
      });
      screen!.style.filter = "url(#glitch-fx)";
      const dur = rnd(0.2, 0.4), peak = rnd(9, 18), sh = rnd(1.5, 3);
      gsap.timeline({ onComplete: () => { screen!.style.filter = ""; fxRelease(); if (alive) schedule(FX_CONFIG.glitchEvery); } })
        .to(disp.current, { attr: { scale: peak }, duration: dur, ease: rough }, 0)
        .to(offR.current, { attr: { dx: sh }, duration: dur, ease: rough }, 0)
        .to(offB.current, { attr: { dx: -sh }, duration: dur, ease: rough }, 0)
        .to(scan.current, { opacity: 0.14, duration: dur, ease: rough }, 0)
        .to(disp.current, { attr: { scale: 0 }, duration: 0.08 }, ">")
        .to(offR.current, { attr: { dx: 0 }, duration: 0.08 }, "<")
        .to(offB.current, { attr: { dx: 0 }, duration: 0.08 }, "<")
        .to(scan.current, { opacity: 0, duration: 0.08 }, "<");
    }
    schedule(FX_CONFIG.glitchFirst);
    return () => { alive = false; clearTimeout(timer); gsap.killTweensOf([disp.current, offR.current, offB.current, scan.current]); screen.style.filter = ""; };
  }, [enabled]);

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="glitch-fx" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
            <feFlood floodColor="#888888" result="base" />
            {Array.from({ length: BANDS }, (_, i) => (
              <feFlood key={i} ref={(el) => { bands.current[i] = el; }} floodColor="#8888FF" y="0" height="0.01" result={`b${i}`} />
            ))}
            <feMerge result="bands">
              <feMergeNode in="base" />
              {Array.from({ length: BANDS }, (_, i) => <feMergeNode key={i} in={`b${i}`} />)}
            </feMerge>
            <feDisplacementMap ref={disp} in="SourceGraphic" in2="bands" scale="0" xChannelSelector="B" yChannelSelector="R" result="d" />
            <feColorMatrix in="d" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset ref={offR} in="r" dx="0" dy="0" result="ro" />
            <feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb" />
            <feOffset ref={offB} in="gb" dx="0" dy="0" result="gbo" />
            <feComposite in="ro" in2="gbo" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>
      </svg>
      <div ref={scan} aria-hidden className="scan-layer pointer-events-none fixed inset-0 z-[9995] opacity-0" />
    </>
  );
}

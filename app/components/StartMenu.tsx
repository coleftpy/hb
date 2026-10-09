"use client";
import { useEffect, useState } from "react";
import { START_MENU, type MenuItem } from "@/lib/data";
import { useWM } from "@/lib/wm";
import { Hot } from "./ui";
import { cn } from "@/lib/utils";

type Leaf = Exclude<MenuItem, { sep: true }>;
const underline = (l: string) => { const m = l.match(/[A-Za-z]/); return m ? l.replace(m[0], "_" + m[0]) : l; };

export function StartMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const wm = useWM();
  const [sub, setSub] = useState<number | null>(null);
  useEffect(() => { if (!open) setSub(null); }, [open]);
  if (!open) return null;

  const run = (it: Leaf) => {
    if (it.kids) return;
    if (it.app) wm.open(it.app);
    onClose();
  };

  return (
    <div
      className="bevel-out absolute left-[2px] z-[950] flex bg-[#c0c0c0] p-[3px] text-black"
      style={{ bottom: "calc(var(--tb) + env(safe-area-inset-bottom, 0px))" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="relative w-[21px] shrink-0 bg-linear-to-t/srgb from-[#1084d0] via-[#000080] to-[#000080]">
        <span className="absolute bottom-[6px] left-0 origin-bottom-left whitespace-nowrap text-[19px] leading-[21px] tracking-tight text-[#c0c0c0]" style={{ transform: "rotate(-90deg) translate(0,21px)" }}>
          <b className="text-white">Windows</b>95
        </span>
      </div>
      <div className="w-[150px] py-px max-[420px]:w-[138px]">
        {START_MENU.map((it, i) => {
          if ("sep" in it) return <div key={i} className="m-[2px] border-b border-t border-b-white border-t-[#808080]" />;
          const Icon = it.icon, isOpen = sub === i;
          return (
            <div
              key={it.label}
              className={cn("relative flex h-8 items-center gap-2.5 pl-2 pr-1.5 coarse:h-[42px]", isOpen ? "bg-[#000080] text-white" : "fine:hover:bg-[#000080] fine:hover:text-white")}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setSub(it.kids ? i : null); }}
              onClick={() => { if (it.kids) setSub(isOpen ? null : i); else run(it); }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center" style={{ color: it.color }}><Icon className="h-[22px] w-[22px]" strokeWidth={1.6} /></span>
              <span><Hot text={underline(it.label)} /></span>
              {it.kids && <span className="ml-auto text-[8px]">&#9654;</span>}
              {it.kids && isOpen && (
                <div className="bevel-out absolute -top-1 left-full z-10 -ml-0.5 bg-[#c0c0c0] p-[3px] text-black max-[420px]:left-[52px]" onClick={(e) => e.stopPropagation()}>
                  <div className="whitespace-nowrap py-px">
                    {it.kids.map((k, j) => {
                      if ("sep" in k) return <div key={j} className="sep" />;
                      const KI = k.icon;
                      return (
                        <div key={k.label} onClick={() => run(k)} className="flex h-[22px] items-center gap-2 pl-1.5 pr-3.5 active:bg-[#000080] active:text-white fine:hover:bg-[#000080] fine:hover:text-white coarse:h-[38px]">
                          <span style={{ color: k.color }} className="flex h-[18px] w-[18px] items-center justify-center"><KI className="h-4 w-4" strokeWidth={1.6} /></span>
                          {k.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

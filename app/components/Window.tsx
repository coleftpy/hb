"use client";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { type AppId, useWM } from "@/lib/wm";
import { useViewport } from "@/lib/useViewport";
import { clamp, cn } from "@/lib/utils";

export interface WinDef { title: string; icon: LucideIcon; w: number; h: number; x: number; y: number }

// remembers where each window was last dragged to (like the original, position survives close/reopen)
const savedPos: Partial<Record<AppId, { x: number; y: number }>> = {};

const TitleBtn = ({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) => (
  <button type="button" aria-label={label} onClick={onClick} className="btn95 flex h-[14px] w-4 items-center justify-center p-0 coarse:h-5 coarse:w-[22px]">
    {children}
  </button>
);

export function Window({ id, def, children }: { id: AppId; def: WinDef; children: ReactNode }) {
  const wm = useWM();
  const { vw, vh, tb } = useViewport();
  const st = wm.wins[id];

  const w = Math.min(def.w, vw - 8);
  const h = Math.min(def.h, vh - tb - 8);
  const wide = vw >= 900;
  const home = { x: wide ? Math.min(def.x, vw - w - 4) : 4, y: wide ? def.y : Math.min(def.y, 70) };

  const [pos, setPos] = useState<{ x: number; y: number } | null>(savedPos[id] ?? null);
  const [max, setMax] = useState(false);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const cur = pos ?? home;
  const geo = max ? { left: 0, top: 0, width: vw, height: vh - tb } : { left: cur.x, top: cur.y, width: w, height: h };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button") || max) return;
    drag.current = { dx: e.clientX - cur.x, dy: e.clientY - cur.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const p = { x: clamp(e.clientX - drag.current.dx, -w + 80, vw - 80), y: clamp(e.clientY - drag.current.dy, 0, vh - tb - 28) };
    savedPos[id] = p;
    setPos(p);
  };
  const onUp = () => { drag.current = null; };

  const Icon = def.icon;
  return (
    <div
      className={cn("bevel-out absolute flex flex-col bg-[#c0c0c0] p-[3px] text-black", st.minimized && "hidden")}
      style={{ zIndex: 10 + st.z, ...geo }}
      onPointerDownCapture={() => wm.focus(id)}
    >
      <div
        className="mb-[2px] flex h-[18px] shrink-0 touch-none items-center justify-between bg-linear-to-r/srgb from-[#000080] to-[#1084d0] px-[3px] font-bold text-white coarse:h-[26px]"
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        onDoubleClick={(e) => { if (!(e.target as HTMLElement).closest("button")) setMax((m) => !m); }}
      >
        <span className="flex items-center gap-1 overflow-hidden whitespace-nowrap"><Icon className="h-3.5 w-3.5 shrink-0" />{def.title}</span>
        <span className="flex gap-[2px]">
          <TitleBtn label="Minimize" onClick={() => wm.minimize(id)}><svg viewBox="0 0 8 8" className="h-2 w-2"><rect x="0" y="6" width="6" height="2" /></svg></TitleBtn>
          <TitleBtn label="Maximize" onClick={() => setMax((m) => !m)}><svg viewBox="0 0 8 8" className="h-2 w-2"><path fillRule="evenodd" d="M0 0h8v8H0zM1 2v5h6V2z" /></svg></TitleBtn>
          <span className="w-[2px]" />
          <TitleBtn label="Close" onClick={() => wm.close(id)}><svg viewBox="0 0 8 8" className="h-2 w-2"><path d="M0 0h2l2 2 2-2h2L5 4l3 4H6L4 6 2 8H0l3-4z" /></svg></TitleBtn>
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

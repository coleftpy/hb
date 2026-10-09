"use client";
import { Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { PHOTOS } from "@/lib/data";
import { useDoubleTap } from "@/lib/useDoubleTap";
import { useWM } from "@/lib/wm";
import { cn } from "@/lib/utils";
import { AddressBar, MenuBar, StatusBar } from "../ui";

export default function Gallery() {
  const wm = useWM();
  const [sel, setSel] = useState(-1);
  const [view, setView] = useState(-1);
  const tap = useDoubleTap();
  const n = PHOTOS.length;

  const step = (d: number) => setView((v) => (v + d + n) % n);
  useEffect(() => {
    if (view < 0 || wm.active !== "gallery") return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1); else if (e.key === "Escape") setView(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [view, wm.active]);

  return (
    <>
      <MenuBar items={["_File", "_Edit", "_View", "_Help"]} />
      <AddressBar icon={ImageIcon}><span>Gallery</span></AddressBar>
      <div className="sunken relative flex min-h-0 flex-1 overflow-hidden bg-white p-[2px]" onClick={() => setSel(-1)}>
        {view < 0 ? (
          <div className="grid flex-1 content-start gap-x-1.5 gap-y-3 overflow-auto p-2.5 [grid-template-columns:repeat(auto-fill,minmax(108px,1fr))]">
            {PHOTOS.map((p, i) => (
              <div
                key={p.name} className="text-center"
                onClick={(e) => { e.stopPropagation(); setSel(i); tap(i, () => setView(i)); }}
              >
                <div className={cn("sunken-thin mx-1.5 mb-1 h-[74px] border-2 border-transparent", i === sel && "outline outline-2 outline-[#000080]")} style={{ background: p.bg }} />
                <span className={cn("inline-block max-w-[100px] truncate px-0.5 leading-[1.2]", i === sel && "bg-[#000080] text-white")}>{p.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="relative m-1.5 min-h-0 flex-1 overflow-hidden border-2 border-[#c0c0c0]">
              <div className="absolute inset-0" style={{ background: PHOTOS[view].bg, backgroundSize: "cover" }} />
            </div>
            <div className="flex items-center gap-1.5 px-1.5 pb-1.5">
              <button type="button" className="btn95 h-6 min-w-[62px] px-2" onClick={() => step(-1)}>&lt; Prev</button>
              <span className="flex-1 truncate text-center">{PHOTOS[view].name} ({view + 1}/{n})</span>
              <button type="button" className="btn95 h-6 min-w-[62px] px-2" onClick={() => step(1)}>Next &gt;</button>
              <button type="button" className="btn95 h-6 min-w-[62px] px-2" onClick={() => setView(-1)}>Close</button>
            </div>
          </div>
        )}
      </div>
      <StatusBar cells={[view >= 0 ? PHOTOS[view].name : sel >= 0 ? "1 object(s) selected" : `${n} object(s)`, <><ImageIcon className="h-3.5 w-3.5" />Gallery</>]} />
    </>
  );
}

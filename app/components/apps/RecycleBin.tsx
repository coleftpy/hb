"use client";
import { useEffect, useState } from "react";
import { BIN_FILES, type BinFile } from "@/lib/data";
import { useWM } from "@/lib/wm";
import { cn } from "@/lib/utils";
import { Hot, MenuBar, Pane, StatusBar } from "../ui";

const COLS = "grid-cols-[22px_minmax(0,1.3fr)_minmax(0,1.5fr)_74px_96px_66px] max-[480px]:grid-cols-[22px_minmax(0,1fr)_70px_62px]";
const kb = (n: number) => `${n.toLocaleString("en-US")} KB`;

export default function RecycleBin() {
  const wm = useWM();
  const [files, setFiles] = useState<BinFile[]>(() => [...BIN_FILES]);
  const [sel, setSel] = useState(-1);
  const [menu, setMenu] = useState(false);

  const remove = () => { if (sel >= 0) { setFiles((f) => f.filter((_, i) => i !== sel)); setSel(-1); } };
  useEffect(() => {
    if (wm.active !== "bin") return;
    const k = (e: KeyboardEvent) => { if (e.key === "Delete") remove(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });

  const actions: [string, string, boolean, () => void][] = [
    ["_Restore", "restore", sel < 0, remove],
    ["_Delete", "delete", sel < 0, remove],
    ["", "sep", false, () => {}],
    ["_Empty Recycle Bin", "empty", !files.length, () => { setFiles([]); setSel(-1); }],
    ["", "sep2", false, () => {}],
    ["_Close", "close", false, () => wm.close("bin")],
  ];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col" onPointerDown={() => setMenu(false)}>
      <MenuBar items={["_File", "_Edit", "_View", "_Help"]} onItem={(l) => { if (l === "_File") setMenu((m) => !m); }} />
      {menu && (
        <div className="bevel-out absolute left-1.5 top-[26px] z-20 min-w-[170px] bg-[#c0c0c0] p-[2px]" onPointerDown={(e) => e.stopPropagation()}>
          {actions.map(([label, key, off, fn]) =>
            key.startsWith("sep") ? <div key={key} className="sep" /> : (
              <div key={key} onClick={() => { setMenu(false); fn(); }}
                className={cn("whitespace-nowrap px-6 py-1 coarse:py-2.5", off ? "pointer-events-none text-[#808080]" : "fine:hover:bg-[#000080] fine:hover:text-white")}>
                <Hot text={label} />
              </div>
            ),
          )}
        </div>
      )}
      <Pane className="mt-[3px] flex-1" >
        <div onClick={() => setSel(-1)} className="min-h-full">
          <div className={cn("sticky -top-0.5 z-[1] -mx-[2px] -mt-[2px] mb-0.5 grid h-[19px] bg-[#c0c0c0] px-[2px] coarse:h-6", COLS)}>
            {["", "Name", "Original Location", "Date Deleted", "Type", "Size"].map((h, i) => (
              <span key={i} className={cn("bevel-btn box-border h-[19px] truncate px-1 leading-[19px] coarse:h-6 coarse:leading-6", (i === 2 || i === 4) && "max-[480px]:hidden", i === 5 && "text-right")}>{h}</span>
            ))}
          </div>
            {files.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.name}
                  onClick={(e) => { e.stopPropagation(); setSel(i); }}
                  className={cn("grid h-[18px] items-center whitespace-nowrap coarse:h-[26px]", COLS, i === sel && "bg-[#000080] text-white")}
                >
                  <span className="flex justify-center"><Icon className="h-[13px] w-[13px]" strokeWidth={1.8} /></span>
                  <span className="truncate px-1">{f.name}</span>
                  <span className="truncate px-1 max-[480px]:hidden">{f.loc}</span>
                  <span className="px-1">{f.date}</span>
                  <span className="truncate px-1 max-[480px]:hidden">{f.type}</span>
                  <span className="px-1 text-right">{kb(f.kb)}</span>
                </div>
              );
            })}
          {!files.length && <div className="p-3 text-[#808080]">Recycle Bin is empty.</div>}
        </div>
      </Pane>
      <StatusBar cells={[`${files.length} object(s)`, kb(files.reduce((a, f) => a + f.kb, 0))]} />
    </div>
  );
}

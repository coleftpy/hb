"use client";
import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { APP_IDS, useWM } from "@/lib/wm";
import { APPS } from "./appRegistry";
import { WinFlag } from "./ui";
import { cn } from "@/lib/utils";

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => {
      const d = new Date(), h = d.getHours(), m = d.getMinutes();
      setT(`${h % 12 || 12}:${m < 10 ? "0" : ""}${m} ${h >= 12 ? "PM" : "AM"}`);
    };
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

export function Taskbar({ startOpen, onStart }: { startOpen: boolean; onStart: () => void }) {
  const wm = useWM();
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-[900] box-border flex items-center gap-1 border-t border-t-[#dfdfdf] bg-[#c0c0c0] px-[2px] pt-[2px] shadow-[inset_0_1px_0_#fff]"
      style={{ height: "calc(var(--tb) + env(safe-area-inset-bottom, 0px))", paddingBottom: "calc(2px + env(safe-area-inset-bottom, 0px))" }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button type="button" onClick={onStart} className={cn("btn95 flex h-[calc(var(--tb)-6px)] items-center gap-1 pl-[5px] pr-2 text-[1.05em] font-bold", startOpen && "pressed")}>
        <WinFlag className="h-3.5 w-4" />Start
      </button>
      <span className="h-[calc(var(--tb)-8px)] w-[2px] border-l border-l-[#808080] border-r border-r-white" />
      <div className="flex min-w-0 flex-1 items-center gap-1">
        {APP_IDS.filter((id) => wm.wins[id].open).map((id) => {
          const def = APPS[id].def, Icon = def.icon, on = wm.active === id;
          return (
            <button
              key={id} type="button" onClick={() => wm.taskClick(id)}
              className={cn("btn95 flex h-[calc(var(--tb)-6px)] min-w-0 max-w-[160px] flex-1 basis-[160px] items-center gap-1 px-1.5 font-bold", on && "pressed dither")}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{def.title}</span>
            </button>
          );
        })}
      </div>
      <div className="sunken-thin flex h-[calc(var(--tb)-6px)] shrink-0 items-center gap-2 px-2.5">
        <Volume2 className="h-3.5 w-3.5" /><Clock />
      </div>
    </div>
  );
}

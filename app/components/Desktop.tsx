"use client";
import { useEffect, useState } from "react";
import { DESKTOP_ICONS } from "@/lib/data";
import { useDoubleTap } from "@/lib/useDoubleTap";
import { APP_IDS, useWM, WMProvider } from "@/lib/wm";
import { cn } from "@/lib/utils";
import { APPS } from "./appRegistry";
import { CrtOverlay } from "./effects/Atmosphere";
import { GlitchFx } from "./effects/GlitchFx";
import { RecFlash } from "./effects/RecFlash";
import { StartMenu } from "./StartMenu";
import { Taskbar } from "./Taskbar";
import { Window } from "./Window";

function DesktopIcons({
  sel,
  setSel,
}: {
  sel: number;
  setSel: (i: number) => void;
}) {
  const wm = useWM();
  const tap = useDoubleTap();
  return (
    <div
      className="absolute left-1.5 grid auto-cols-[80px] grid-flow-col grid-rows-4 gap-x-1.5 gap-y-1 text-white coarse:auto-cols-[84px]"
      style={{ top: "calc(6px + env(safe-area-inset-top, 0px))" }}
    >
      {DESKTOP_ICONS.map((d, i) => {
        const Icon = d.icon;
        return (
          <div
            key={d.name}
            className="w-[80px] cursor-default pb-0.5 pt-1 text-center coarse:w-[84px]"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              setSel(i);
              tap(i, () => wm.open(d.app));
            }}
          >
            <Icon
              className={cn(
                "mx-auto mb-[5px] block h-[34px] w-[34px]",
                sel === i && "opacity-60",
              )}
              style={{ color: d.color }}
              strokeWidth={1.4}
            />
            <span
              className={cn(
                "inline-block max-w-[76px] px-0.5 py-px leading-[1.2]",
                sel === i &&
                  "bg-[#000080] outline-dotted outline-1 outline-yellow-300",
              )}
            >
              {d.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Shell() {
  const wm = useWM();
  const [startOpen, setStartOpen] = useState(false);
  const [sel, setSel] = useState(-1);
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#000080]">
      <div
        id="screen"
        className="absolute inset-0 overflow-hidden bg-[#000080]"
        onPointerDown={() => {
          setStartOpen(false);
          setSel(-1);
        }}
      >
        <DesktopIcons sel={sel} setSel={setSel} />
        {APP_IDS.map(
          (id) =>
            wm.wins[id].open && (
              <Window key={id} id={id} def={APPS[id].def}>
                {APPS[id].render()}
              </Window>
            ),
        )}
        <Taskbar
          startOpen={startOpen}
          onStart={() => setStartOpen((o) => !o)}
        />
        <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />
      </div>
      <GlitchFx enabled />
      <RecFlash enabled />
      <CrtOverlay />
    </div>
  );
}

export default function Desktop() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="fixed inset-0 bg-[#000080]" />;
  return (
    <WMProvider>
      <Shell />
    </WMProvider>
  );
}

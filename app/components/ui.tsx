"use client";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** "_File" -> File with the F underlined */
export function Hot({ text }: { text: string }) {
  const i = text.indexOf("_");
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<u>{text[i + 1]}</u>{text.slice(i + 2)}</>;
}

export const Grip = () => <span className="mx-[2px] h-[18px] w-[3px] shrink-0 border-l border-l-white border-r border-r-[#808080]" />;

export function MenuBar({ items, right, onItem }: { items: string[]; right?: ReactNode; onItem?: (label: string, el: HTMLElement) => void }) {
  return (
    <div className="flex shrink-0 items-center border-y border-t-white border-b-[#808080] py-[2px] shadow-[0_1px_#fff]">
      <Grip />
      {items.map((t) => (
        <button key={t} type="button" onClick={(e) => onItem?.(t, e.currentTarget)} className="px-[7px] py-[2px] text-left fine:hover:flat-raise active:bevel-down coarse:py-2">
          <Hot text={t} />
        </button>
      ))}
      {right && <span className="ml-auto flex">{right}</span>}
    </div>
  );
}

export function AddressBar({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 px-[3px] pb-[3px] pt-[2px]">
      <Grip />
      <span>Address</span>
      <div className="sunken flex h-5 min-w-0 flex-1 items-center gap-1 bg-white px-1 coarse:h-7">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {children}
      </div>
    </div>
  );
}

export function StatusBar({ cells, className }: { cells: ReactNode[]; className?: string }) {
  return (
    <div className={cn("mt-[3px] flex shrink-0 gap-[2px]", className)}>
      {cells.map((c, i) => (
        <div key={i} className={cn("sunken-thin flex h-5 items-center gap-1 px-1", i === 0 ? "flex-1" : "")}>{c}</div>
      ))}
    </div>
  );
}

/** the waving four-colour flag used in the menu bar and the Start button */
export function WinFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 19 16" className={className} aria-hidden>
      <path fill="#ff2a1a" d="M1 2C3 .5 6 3 8.5 1.5V7C6 8.5 3 6 1 7.5z" />
      <path fill="#2fc23a" d="M9.5 1.3C12-.2 15 2.5 18 1v5.5C15 8 12 5.3 9.5 6.8z" />
      <path fill="#1f4fff" d="M1 8.5C3 7 6 9.5 8.5 8v5.5C6 15 3 12.5 1 14z" />
      <path fill="#ffd400" d="M9.5 8.3C12 6.8 15 9.5 18 8v5.5C15 15 12 12.3 9.5 13.8z" />
    </svg>
  );
}
export const FlagBox = () => (
  <span className="flex h-[22px] w-10 items-center justify-center bg-black"><WinFlag className="h-[18px] w-[22px]" /></span>
);

/** Win95 sunken white list pane */
export const Pane = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn("sunken min-h-0 overflow-auto bg-white p-[2px]", className)}>{children}</div>
);

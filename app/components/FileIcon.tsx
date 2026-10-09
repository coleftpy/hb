"use client";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileIcon({ icon: Icon, color, label, selected, onClick, className }: {
  icon: LucideIcon; color: string; label: string; selected?: boolean; onClick: () => void; className?: string;
}) {
  return (
    <div data-icon onClick={(e) => { e.stopPropagation(); onClick(); }} className={cn("mb-3 w-[76px] text-center max-[480px]:w-16", className)}>
      <Icon className={cn("mx-auto mb-1 block h-8 w-8", selected && "opacity-60")} style={{ color }} strokeWidth={1.5} />
      <span className={cn("inline-block max-w-[72px] px-0.5 leading-[1.2] max-[480px]:max-w-[62px]", selected && "bg-[#000080] text-white")}>{label}</span>
    </div>
  );
}

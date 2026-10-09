"use client";
import { CornerLeftUp, type LucideIcon } from "lucide-react";
import { useState } from "react";
import type { FolderItem } from "@/lib/data";
import { useDoubleTap } from "@/lib/useDoubleTap";
import { FileIcon } from "../FileIcon";
import { AddressBar, MenuBar, StatusBar } from "../ui";

interface Level { name: string; items: FolderItem[] }

export default function FolderApp({ title, icon: Icon, root }: { title: string; icon: LucideIcon; root: FolderItem[] }) {
  const [stack, setStack] = useState<Level[]>([{ name: title, items: root }]);
  const [sel, setSel] = useState(-1);
  const tap = useDoubleTap();
  const top = stack[stack.length - 1];
  const up = stack.length > 1;
  const list: (FolderItem & { isUp?: boolean })[] = up ? [{ name: "..", icon: CornerLeftUp, color: "#666", isUp: true }, ...top.items] : top.items;

  const activate = (i: number) => {
    const it = list[i];
    if (it.isUp) { setStack((s) => s.slice(0, -1)); setSel(-1); }
    else if (it.kids) { setStack((s) => [...s, { name: it.name, items: it.kids! }]); setSel(-1); }
  };
  return (
    <>
      <MenuBar items={["_File", "_Edit", "_View", "_Help"]} />
      <AddressBar icon={Icon}><span className="truncate">{stack.map((s) => s.name).join("\\")}</span></AddressBar>
      <div className="sunken flex min-h-0 flex-1 bg-white p-[2px]" onClick={() => setSel(-1)}>
        <div className="flex min-w-0 flex-1 flex-wrap content-start overflow-auto px-1.5 pt-2">
          {list.map((it, i) => (
            <FileIcon key={stack.length + it.name} icon={it.icon} color={it.color} label={it.name} selected={i === sel}
              onClick={() => { setSel(i); tap(`${stack.length}:${i}`, () => activate(i)); }} />
          ))}
        </div>
      </div>
      <StatusBar cells={[sel >= 0 ? "1 object(s) selected" : `${top.items.length} object(s)`, <><Icon className="h-3.5 w-3.5" />{title}</>]} />
    </>
  );
}

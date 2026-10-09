"use client";
import { Monitor } from "lucide-react";
import { useState } from "react";
import { COMPUTER_ITEMS } from "@/lib/data";
import { FileIcon } from "../FileIcon";
import { AddressBar, FlagBox, MenuBar, StatusBar } from "../ui";

export default function MyComputer() {
  const [sel, setSel] = useState(-1);
  const it = sel >= 0 ? COMPUTER_ITEMS[sel] : null;
  return (
    <>
      <MenuBar items={["_File", "_Edit", "_View", "_Go", "F_avorites", "_Help"]} right={<FlagBox />} />
      <AddressBar icon={Monitor}><span>My Computer</span></AddressBar>
      <div className="sunken flex min-h-0 flex-1 bg-white p-[2px]" onClick={() => setSel(-1)}>
        <div className="sky-panel w-[150px] shrink-0 pb-3 pr-[3px] pt-3 max-[480px]:w-[104px]">
          <Monitor className="mb-2 ml-[14px] h-8 w-8 text-[#1a3fb0] max-[480px]:ml-2" strokeWidth={1.6} />
          <h2 className="rainbow-rule mr-[11%] pb-2 pl-[14px] text-[21px] font-bold leading-[1.15] max-[480px]:pl-2 max-[480px]:text-[17px]">My<br />Computer</h2>
          <p className="ml-[14px] mt-5 max-w-[106px] leading-[1.3] max-[480px]:ml-2 max-[480px]:max-w-[90px]">
            {it ? <><b>{it.name}</b><br />{it.desc}</> : "Select an item to view its description."}
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-wrap content-start overflow-auto pl-1.5 pr-0.5 pt-2">
          {COMPUTER_ITEMS.map((c, i) => (
            <FileIcon key={c.name} icon={c.icon} color={c.color} label={c.name} selected={i === sel} onClick={() => setSel(i)} />
          ))}
        </div>
      </div>
      <StatusBar cells={[sel < 0 ? "0 object(s)" : "1 object(s) selected", <><Monitor className="h-3.5 w-3.5" />My Computer</>]} />
    </>
  );
}

"use client";
import { Mail as MailIcon, MailOpen } from "lucide-react";
import { useState } from "react";
import { MAIL, type Mail } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MenuBar, Pane, StatusBar } from "../ui";

const COLS = "grid-cols-[22px_150px_minmax(0,1fr)_104px] max-[480px]:grid-cols-[22px_84px_minmax(0,1fr)]";

export default function Inbox() {
  const [mails, setMails] = useState<Mail[]>(() => MAIL.map((m) => ({ ...m })));
  const [sel, setSel] = useState(-1);
  const unread = mails.filter((m) => m.unread).length;
  const m = sel >= 0 ? mails[sel] : null;

  const open = (i: number) => {
    setSel(i);
    setMails((ms) => ms.map((x, j) => (j === i ? { ...x, unread: false } : x)));
  };

  return (
    <>
      <MenuBar items={["_File", "_Edit", "_View", "_Tools", "_Compose", "_Help"]} />
      <div className="mt-[3px] flex min-h-0 flex-1 flex-col gap-[3px]">
        <Pane className="basis-[52%]">
          <div className={cn("sticky -top-0.5 z-[1] -mx-[2px] -mt-[2px] mb-0.5 grid h-[19px] bg-[#c0c0c0] px-[2px] coarse:h-6", COLS)}>
            {["", "From", "Subject", "Received"].map((h, i) => (
              <span key={i} className={cn("bevel-btn box-border h-[19px] truncate px-1 leading-[19px] coarse:h-6 coarse:leading-6", i === 3 && "max-[480px]:hidden")}>{h}</span>
            ))}
          </div>
          {mails.map((x, i) => (
            <div
              key={i} onClick={() => open(i)}
              className={cn("grid h-[18px] cursor-default items-center whitespace-nowrap coarse:h-[26px]", COLS, x.unread && "font-bold", i === sel && "bg-[#000080] text-white")}
            >
              <span className="flex items-center justify-center">{x.unread ? <MailIcon className="h-[13px] w-[13px]" strokeWidth={1.8} /> : <MailOpen className="h-[13px] w-[13px]" strokeWidth={1.8} />}</span>
              <span className="truncate px-1">{x.from}</span>
              <span className="truncate px-1">{x.subject}</span>
              <span className="truncate px-1 max-[480px]:hidden">{x.date}</span>
            </div>
          ))}
        </Pane>
        <div className="sunken flex min-h-0 basis-[48%] flex-col overflow-hidden bg-white p-[2px]">
          {m ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="shrink-0 border-b border-b-[#808080] bg-[#c0c0c0] px-2 py-1 leading-[1.5]">
                {([["From:", m.from], ["To:", "You"], ["Sent:", m.date], ["Subject:", m.subject]] as const).map(([k, v]) => (
                  <div key={k}><b className="inline-block w-14 max-[480px]:w-[50px]">{k}</b>{v}</div>
                ))}
              </div>
              <div className="flex-1 overflow-auto whitespace-pre-wrap px-2.5 py-2 font-[Courier_New,Consolas,monospace] leading-[1.4]">{m.body}</div>
            </div>
          ) : (
            <div className="flex-1 px-2.5 py-2 text-[#808080]">Select a message to read it.</div>
          )}
        </div>
      </div>
      <StatusBar cells={[`${mails.length} Message(s), ${unread} Unread`]} />
    </>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { FRIENDS, INITIAL_ROOMS, ME, REPLY_EN, REPLY_KO, type Room } from "@/lib/data";
import { useDoubleTap } from "@/lib/useDoubleTap";
import { cn, pickOne, rnd } from "@/lib/utils";
import { PixelAvatar, PixelIcon } from "../pixel";

const nowStr = () => {
  const d = new Date(), h = d.getHours(), m = d.getMinutes();
  return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${m < 10 ? "0" : ""}${m}`;
};
const Badge = ({ n }: { n: number }) =>
  n ? <span className="kbubble ml-0.5 inline-block h-4 min-w-4 bg-[#e8281c] px-[3px] text-center text-[10px] leading-4 text-white">{n > 99 ? "99+" : n}</span> : null;
const inputCls = "sunken h-[22px] min-w-0 flex-1 bg-white px-1.5 text-black outline-none coarse:h-8 coarse:text-base";

export default function Messenger() {
  const [rooms, setRooms] = useState<Room[]>(() => INITIAL_ROOMS.map((r) => ({ ...r, msgs: [...r.msgs] })));
  const [tab, setTab] = useState<"f" | "c">("f");
  const [cur, setCur] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [draft, setDraft] = useState("");
  const [selF, setSelF] = useState(-1);
  const curRef = useRef<number | null>(null);
  curRef.current = cur;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const msgsRef = useRef<HTMLDivElement>(null);
  const tap = useDoubleTap();

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const room = rooms.find((r) => r.id === cur) ?? null;
  const unreadTotal = rooms.reduce((a, r) => a + r.unread, 0);
  useEffect(() => { const el = msgsRef.current; if (el) el.scrollTop = el.scrollHeight; }, [room?.msgs.length, cur]);

  const openRoom = (id: number) => {
    setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, unread: 0 } : r)));
    setCur(id); setTab("c"); setDraft("");
  };
  const openFriend = (i: number) => {
    const name = FRIENDS[i][0];
    const ex = rooms.find((r) => !r.group && r.name === name);
    if (ex) return openRoom(ex.id);
    const id = Date.now();
    setRooms((rs) => [{ id, name, group: false, unread: 0, msgs: [] }, ...rs]);
    setCur(id); setTab("c"); setDraft("");
  };

  const send = () => {
    const t = draft.trim();
    if (!t || !room) return;
    const id = room.id;
    setDraft("");
    setRooms((rs) => { const r = rs.find((x) => x.id === id)!; return [{ ...r, msgs: [...r.msgs, [ME, t, nowStr()]] }, ...rs.filter((x) => x.id !== id)]; });
    const who = room.group ? pickOne(room.members ?? [room.name]) : room.name;
    timers.current.push(setTimeout(() => {
      const text = pickOne(/^[A-Za-z]/.test(who) ? REPLY_EN : REPLY_KO);
      setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, msgs: [...r.msgs, [who, text, nowStr()]], unread: curRef.current === id ? 0 : r.unread + 1 } : r)));
    }, 900 + rnd(0, 1300)));
  };

  const f = filter.trim().toLowerCase();
  const friends = FRIENDS.map((x, i) => [x, i] as const).filter(([x]) => !f || x[0].toLowerCase().includes(f));
  const rowCls = (sel = false) => cn("flex items-center gap-2.5 px-1.5 py-[5px] coarse:py-2", sel ? "bg-[#000080] text-white" : "fine:hover:bg-[#000080] fine:hover:text-white");

  const tabBtn = (t: "f" | "c", label: string, icon: "person" | "bubble", badge = 0) => {
    const on = (cur ? "c" : tab) === t;
    return (
      <button type="button" onClick={() => { setTab(t); setCur(null); }}
        className={cn("relative z-[1] mr-px flex items-center gap-1.5 bg-[#c0c0c0] px-3.5 font-bold shadow-[inset_1px_1px_#fff,inset_-1px_0_#0a0a0a,inset_-2px_0_#808080,inset_2px_2px_#dfdfdf]", on ? "top-px h-6" : "top-[3px] h-[21px] text-[#404040]")}>
        <PixelIcon kind={icon} className="h-3.5 w-3.5" />{label}<Badge n={badge} />
      </button>
    );
  };

  return (
    <>
      <div className="flex shrink-0 px-1 pt-0.5">{tabBtn("f", "Friends", "person")}{tabBtn("c", "Chats", "bubble", unreadTotal)}</div>
      <div className="bevel-out mx-[3px] mb-[3px] flex min-h-0 flex-1 flex-col bg-[#c0c0c0] p-[3px]">
        {room ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex shrink-0 items-center gap-2 px-[3px] pb-[5px] pt-[3px]">
              <button type="button" aria-label="Back" onClick={() => { setCur(null); setTab("c"); }} className="btn95 h-6 w-[26px] p-0 text-[10px]">&lt;</button>
              <PixelAvatar name={room.name} size={28} />
              <b>{room.name}</b>{room.group && <span className="text-[#444]">{(room.members?.length ?? 0) + 1}</span>}
            </div>
            <div ref={msgsRef} className="sunken min-h-0 flex-1 overflow-auto bg-[#b2c7da] px-1.5 pb-2.5 pt-2">
              <div className="mx-auto mb-2.5 mt-1.5 w-max bg-black/25 px-2.5 py-0.5 text-[10px] text-white">2026년 10월 8일 목요일</div>
              {room.msgs.map(([who, text, time], i) => {
                const me = who === ME;
                return (
                  <div key={i} className={cn("mb-2.5 flex items-start gap-1.5", me && "flex-row-reverse")}>
                    {!me && <PixelAvatar name={who} size={28} />}
                    <div className={cn("min-w-0 max-w-[78%]", me && "flex flex-col items-end")}>
                      {!me && room.group && <div className="mb-1 ml-0.5 text-[10px] text-[#223]">{who}</div>}
                      <div className={cn("flex items-end gap-[5px]", me && "flex-row-reverse")}>
                        <span className={cn("kbubble m-0.5 inline-block whitespace-pre-wrap break-words px-[9px] py-1.5 leading-[1.35]", me ? "bg-[#fee500]" : "bg-white")}>{text}</span>
                        <span className="shrink-0 whitespace-nowrap text-[9px] text-[#334]">{time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex shrink-0 gap-1 pt-[5px]">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) send(); }}
                placeholder="Type a message" autoComplete="off" spellCheck={false} className={cn(inputCls, "h-[26px]")} />
              <button type="button" onClick={send} className="btn95 h-[26px] px-3 font-bold coarse:h-8" style={{ background: "#fee500" }}>Send</button>
            </div>
          </div>
        ) : tab === "f" ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex shrink-0 items-center gap-1.5 px-0.5 pb-[5px] pt-0.5">
              <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search friends" autoComplete="off" spellCheck={false} className={inputCls} />
            </div>
            <div className="sunken min-h-0 flex-1 overflow-auto bg-white p-[2px]">
              <div className="mb-0.5 flex items-center gap-2.5 border-b border-b-[#808080] px-1.5 py-[5px] shadow-[0_1px_#fff]">
                <PixelAvatar name={ME} /><div><div className="font-bold">{ME}</div><div className="text-[#666]">오늘도 화이팅</div></div>
              </div>
              <div className="mx-0.5 mb-0.5 mt-1 border-b border-b-[#c0c0c0] px-1.5 pb-0.5 pt-1 text-[10px] text-[#444]">Friends {friends.length}</div>
              {friends.map(([x, i]) => (
                <div key={x[0]} className={rowCls(i === selF)} onClick={() => { setSelF(i); tap(`f${i}`, () => openFriend(i)); }}>
                  <PixelAvatar name={x[0]} />
                  <div className="min-w-0 flex-1"><div className="font-bold">{x[0]}</div><div className="truncate opacity-70">{x[1]}</div></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="sunken min-h-0 flex-1 overflow-auto bg-white p-[2px]">
            {rooms.map((r) => {
              const m = r.msgs[r.msgs.length - 1];
              return (
                <div key={r.id} className={rowCls()} onClick={() => openRoom(r.id)}>
                  <PixelAvatar name={r.name} />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold">{r.name}{r.group && <span className="ml-1 font-normal opacity-60">{(r.members?.length ?? 0) + 1}</span>}</div>
                    <div className="truncate opacity-70">{m?.[1] ?? ""}</div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-[3px] text-[10px] opacity-80"><span>{m?.[2] ?? ""}</span><Badge n={r.unread} /></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

"use client";
import { ArrowLeft, ArrowRight, Globe, House, RefreshCw, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AddressBar, FlagBox, MenuBar, StatusBar } from "../ui";

type Go = (u: string) => void;
interface Page { title: string; dark?: boolean; body: (go: Go) => ReactNode }

const A = ({ to, go, children }: { to: string; go: Go; children: ReactNode }) => (
  <a onClick={() => go(to)} className="cursor-pointer text-[#00e] underline">{children}</a>
);

const PAGES: Record<string, Page> = {
  "home.net": { title: "Welcome to My Homepage!", body: (go) => (
    <>
      <h1 className="my-[.3em] text-center text-[26px] font-bold"><span className="animate-blink">*</span> Welcome to My Homepage! <span className="animate-blink">*</span></h1>
      <p className="text-center"><b className="animate-blink text-red-600">NEW!</b> Last updated October 2026</p>
      <hr className="my-3 border-0 border-t border-t-[#808080] border-b border-b-white" />
      <p>Hi! My name is Alex and this is my little corner of the World Wide Web. I like computers, old movies and long walks.</p>
      <ul className="my-3 list-disc pl-8">
        <li><A to="home.net/links.html" go={go}>My Favorite Links</A></li>
        <li><A to="home.net/guestbook.html" go={go}>Sign my Guestbook</A></li>
        <li><A to="dailydigest.net" go={go}>Daily Digest</A></li>
      </ul>
      <div className="mx-auto my-3.5 w-max max-w-full border-[3px] border-dashed border-black bg-yellow-300 px-3 py-1.5 font-sans text-sm font-bold">UNDER CONSTRUCTION</div>
      <p className="text-center">You are visitor number <span className="bg-black px-1.5 font-mono text-sm font-bold tracking-widest text-green-400">004217</span></p>
      <p className="text-center text-xs">Best viewed with any browser at 800x600</p>
    </>
  ) },
  "home.net/links.html": { title: "My Favorite Links", body: (go) => (
    <>
      <h1 className="my-[.3em] text-[26px] font-bold">My Favorite Links</h1>
      <hr className="my-3" />
      <ul className="list-disc pl-8">
        <li><A to="dailydigest.net" go={go}>Daily Digest</A> - news, weather, the usual</li>
        <li><A to="home.net/guestbook.html" go={go}>Guestbook</A> - say hi!</li>
        <li><A to="are-you-still-watching.net" go={go}>A page I found at 3 AM</A> - don&apos;t ask</li>
      </ul>
      <p className="mt-3"><A to="home.net" go={go}>Back to the home page</A></p>
    </>
  ) },
  "home.net/guestbook.html": { title: "Guestbook", body: (go) => (
    <>
      <h1 className="my-[.3em] text-[26px] font-bold">Guestbook</h1>
      <hr className="my-3" />
      {([["Tim", "9/28", "cool page!! love the counter"], ["Mina", "10/2", "the old movies section made my day"], ["anonymous", "10/5", "did you see it too?"]] as const).map(([n, d, t]) => (
        <div key={n} className="my-2 border border-[#888] bg-[#ffffe0] px-2.5 py-1.5"><b>{n}</b> ({d}): {t}</div>
      ))}
      <p className="mt-3"><A to="home.net" go={go}>Back to the home page</A></p>
    </>
  ) },
  "dailydigest.net": { title: "Daily Digest", body: (go) => (
    <>
      <h1 className="my-[.3em] text-[26px] font-bold">Daily Digest</h1>
      <p><i>Your daily dose of nothing in particular.</i></p>
      <hr className="my-3" />
      <h2 className="mt-3 text-xl font-bold">Local library extends weekend hours</h2><p>Starting this month the main branch stays open until 8 PM on Saturdays and Sundays.</p>
      <h2 className="mt-3 text-xl font-bold">New bus route opens downtown</h2><p>Route 14 connects the station to the riverside market every fifteen minutes.</p>
      <h2 className="mt-3 text-xl font-bold">Weather</h2><p>Sunny, high of 18. Light wind in the evening.</p>
      <p className="mt-3"><A to="home.net" go={go}>Back to My Homepage</A></p>
    </>
  ) },
  "are-you-still-watching.net": { title: "...", dark: true, body: (go) => (
    <>
      <p>&gt; are you still watching?</p><p>&gt; it only lasts a second.</p><p>&gt; if you blink you miss it.</p>
      <p>&gt; <span className="animate-blink">_</span></p>
      <p className="mt-10 text-xs"><a onClick={() => go("home.net")} className="cursor-pointer text-green-400 underline">leave</a></p>
    </>
  ) },
};

const ErrorPage = () => (
  <>
    <h2 className="text-xl font-bold">The page cannot be displayed</h2>
    <hr className="my-3" />
    <p>The page you are looking for is currently unavailable. The Web site might be experiencing technical difficulties, or you may need to adjust your browser settings.</p>
    <p className="mt-2">Please try the following:</p>
    <ul className="list-disc pl-8">
      <li>Click the <b>Refresh</b> button, or try again later.</li>
      <li>If you typed the page address in the Address bar, make sure that it is spelled correctly.</li>
      <li>Click the <b>Back</b> button to try another link.</li>
    </ul>
    <p className="mt-2">HTTP 404 - File not found</p>
  </>
);

const keyOf = (u: string) => u.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/index\.html?$/, "").replace(/\/+$/, "");
const pretty = (k: string) => `http://www.${k}${k.includes("/") ? "" : "/"}`;

function ToolBtn({ icon: Icon, label, off, onClick }: { icon: typeof X; label: string; off?: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex h-[38px] w-[54px] flex-col items-center justify-center gap-0.5 text-[10px] max-[480px]:h-[30px] max-[480px]:w-11", off ? "text-[#808080]" : "fine:hover:flat-raise active:bevel-down")}>
      <Icon className={cn("h-[18px] w-[18px]", off && "opacity-45")} strokeWidth={1.7} /><span className="max-[480px]:hidden">{label}</span>
    </button>
  );
}

export default function Browser() {
  const [hist, setHist] = useState<string[]>(["home.net"]);
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("home.net");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(pretty("home.net"));
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scroller = useRef<HTMLDivElement>(null);

  const load = (k: string) => {
    setLoading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setShown(k); setInput(pretty(k)); setLoading(false); scroller.current?.scrollTo(0, 0); }, 350);
  };
  const go: Go = (u) => {
    const k = keyOf(u); if (!k) return;
    setHist((h) => [...h.slice(0, idx + 1), k]); setIdx((i) => i + 1); load(k);
  };
  const step = (d: number) => { const n = idx + d; if (n < 0 || n >= hist.length) return; setIdx(n); load(hist[n]); };
  useEffect(() => () => clearTimeout(timer.current), []);

  const page = PAGES[shown];
  return (
    <>
      <MenuBar items={["_File", "_Edit", "_View", "_Go", "F_avorites", "_Help"]} right={<FlagBox />} />
      <div className="mb-[3px] flex shrink-0 gap-px border-b border-b-[#808080] px-[3px] py-0.5 shadow-[0_1px_#fff]">
        <ToolBtn icon={ArrowLeft} label="Back" off={idx <= 0} onClick={() => step(-1)} />
        <ToolBtn icon={ArrowRight} label="Forward" off={idx >= hist.length - 1} onClick={() => step(1)} />
        <ToolBtn icon={X} label="Stop" onClick={() => { clearTimeout(timer.current); setLoading(false); }} />
        <ToolBtn icon={RefreshCw} label="Refresh" onClick={() => load(hist[idx])} />
        <ToolBtn icon={House} label="Home" onClick={() => go("home.net")} />
      </div>
      <AddressBar icon={Globe}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") go(input); }}
          spellCheck={false} autoCapitalize="off" autoComplete="off" className="min-w-0 flex-1 bg-transparent outline-none coarse:text-base"
        />
        <button type="button" onClick={() => go(input)} className="btn95 ml-auto flex h-4 w-4 items-center justify-center p-0 text-[7px]">&#9654;</button>
      </AddressBar>
      <div className="sunken flex min-h-0 flex-1 bg-white p-[2px]">
        <div
          ref={scroller}
          className={cn("flex-1 select-text overflow-auto px-4 py-2.5 font-serif text-base leading-[1.35]", page?.dark ? "bg-black font-[Courier_New,Consolas,monospace] text-green-400" : "bg-white text-black")}
        >
          {page ? page.body(go) : <ErrorPage />}
        </div>
      </div>
      <StatusBar cells={[loading ? `Opening page ${pretty(hist[idx])}...` : "Done", <><Globe className="h-3.5 w-3.5" />Internet</>]} />
    </>
  );
}

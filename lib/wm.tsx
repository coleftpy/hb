"use client";
import { createContext, ReactNode, useContext, useMemo, useReducer } from "react";

export type AppId = "computer" | "inbox" | "browser" | "bin" | "work" | "docs" | "gallery" | "messenger";
export const APP_IDS: AppId[] = ["computer", "inbox", "browser", "bin", "work", "docs", "gallery", "messenger"];

interface WinState { open: boolean; minimized: boolean; z: number }
interface State { wins: Record<AppId, WinState>; zTop: number }
type Action = { type: "open" | "close" | "minimize" | "focus" | "task"; id: AppId } | { type: "reset" };

const init = (): State => {
  const wins = Object.fromEntries(APP_IDS.map((id) => [id, { open: false, minimized: false, z: 0 }])) as Record<AppId, WinState>;
  wins.computer = { open: true, minimized: false, z: 1 };
  return { wins, zTop: 1 };
};

export const activeOf = (s: State): AppId | null => {
  let best: AppId | null = null;
  for (const id of APP_IDS) {
    const w = s.wins[id];
    if (w.open && !w.minimized && (!best || w.z > s.wins[best].z)) best = id;
  }
  return best;
};

function reducer(s: State, a: Action): State {
  if (a.type === "reset") return init();
  const w = s.wins[a.id];
  const raise = (patch: Partial<WinState>): State => ({ zTop: s.zTop + 1, wins: { ...s.wins, [a.id]: { ...w, ...patch, z: s.zTop + 1 } } });
  switch (a.type) {
    case "open": return raise({ open: true, minimized: false });
    case "close": return { ...s, wins: { ...s.wins, [a.id]: { ...w, open: false, minimized: false } } };
    case "minimize": return { ...s, wins: { ...s.wins, [a.id]: { ...w, minimized: true } } };
    case "focus": return !w.open || activeOf(s) === a.id ? s : raise({ minimized: false });
    case "task":
      // Windows 95 taskbar rules: hidden -> show on top, behind -> bring to front, in front -> minimize
      if (!w.open) return s;
      if (w.minimized) return raise({ minimized: false });
      if (activeOf(s) === a.id) return { ...s, wins: { ...s.wins, [a.id]: { ...w, minimized: true } } };
      return raise({});
  }
}

interface Ctx {
  wins: Record<AppId, WinState>;
  active: AppId | null;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  minimize: (id: AppId) => void;
  focus: (id: AppId) => void;
  taskClick: (id: AppId) => void;
  reset: () => void;
}
const WMContext = createContext<Ctx | null>(null);

export function WMProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const value = useMemo<Ctx>(() => ({
    wins: state.wins,
    active: activeOf(state),
    open: (id) => dispatch({ type: "open", id }),
    close: (id) => dispatch({ type: "close", id }),
    minimize: (id) => dispatch({ type: "minimize", id }),
    focus: (id) => dispatch({ type: "focus", id }),
    taskClick: (id) => dispatch({ type: "task", id }),
    reset: () => dispatch({ type: "reset" }),
  }), [state]);
  return <WMContext.Provider value={value}>{children}</WMContext.Provider>;
}

export function useWM(): Ctx {
  const c = useContext(WMContext);
  if (!c) throw new Error("useWM must be used inside <WMProvider>");
  return c;
}

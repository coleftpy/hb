"use client";
import { useRef } from "react";

/** double-click on desktop, quick double-tap on touch: call tap(key, fn) from onClick */
export function useDoubleTap(ms = 450) {
  const last = useRef({ k: "", t: 0 });
  return (key: string | number, onDouble: () => void) => {
    const now = Date.now(), k = String(key);
    if (last.current.k === k && now - last.current.t < ms) {
      last.current = { k: "", t: 0 };
      onDouble();
      return true;
    }
    last.current = { k, t: now };
    return false;
  };
}

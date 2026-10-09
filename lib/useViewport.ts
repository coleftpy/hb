"use client";
import { useEffect, useState } from "react";

export interface Viewport { vw: number; vh: number; coarse: boolean; tb: number }

export function useViewport(): Viewport {
  const [v, setV] = useState({ vw: 1280, vh: 720, coarse: false });
  useEffect(() => {
    const f = () => setV({ vw: window.innerWidth, vh: window.innerHeight, coarse: window.matchMedia("(pointer: coarse)").matches });
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return { ...v, tb: v.coarse ? 38 : 28 };
}

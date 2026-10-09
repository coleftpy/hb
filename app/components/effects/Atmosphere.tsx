"use client";

/** CRT: scanlines, phosphor mask, vignette, faint flicker. Pure overlay, nothing moves. */
export function CrtOverlay() {
  return (
    <>
      <div className="crt-layer pointer-events-none fixed inset-0 z-[9990] animate-flicker" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-[9991] bg-[radial-gradient(ellipse_at_50%_40%,rgba(160,200,255,.06),transparent_70%)]" aria-hidden />
    </>
  );
}

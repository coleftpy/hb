// Shared lock so glitch and REC flash never overlap, plus tuning knobs (all in seconds).
export const FX_CONFIG = {
  glitchFirst: [5, 15],        // until the first glitch
  glitchEvery: [20, 60],       // between glitches
  recFirst: [200, 1000],       // until the first REC flash
  recEvery: [400, 1200],       // between REC flashes
  cooldown: 8000,              // ms of quiet after any effect
} as const;

export const fxLock = { busy: false, until: 0 };
export const fxFree = () => !fxLock.busy && Date.now() >= fxLock.until;
export const fxAcquire = () => { if (!fxFree()) return false; fxLock.busy = true; return true; };
export const fxRelease = () => { fxLock.busy = false; fxLock.until = Date.now() + FX_CONFIG.cooldown; };

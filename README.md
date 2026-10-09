# Windows 95 Desktop (Next.js)

A Windows 95 desktop with CRT, glitch and boot effects, built with
**Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP · lucide-react**.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## What is in it
| App | Notes |
| --- | --- |
| My Computer | sky-gradient side panel, rainbow rule, item descriptions |
| Inbox | unread/read state, preview pane, mock mail |
| Internet Explorer | typed addresses, history, 5 mock pages, 404 page |
| Recycle Bin | File menu (Restore / Delete / Empty), Delete key |
| Work / Documents | nested folders (double-click in, `..` up) |
| Gallery | CSS-painted photos, viewer with Prev/Next, arrow keys |
| KakaoTalk | Friends / Chats tabs, pixel avatars, auto replies |

Window manager: drag, minimize, maximize, close, focus.
The taskbar follows Windows 95 rules: hidden -> show, behind -> bring to front, in front -> minimize.
The Start menu has sub-menus.

## Effects
- **GSAP**: the screen glitch - a few horizontal bands shift sideways, red/cyan channels split ~2px, faint scanlines flicker (SVG displacement filter + RoughEase). Subtle, short, rare.
- **REC flash**: a camcorder badge in the top-right corner for ~0.6s, very rarely. It never overlaps the glitch.
- **CRT overlay**: scanlines, phosphor mask, vignette, faint flicker.
- Honors `prefers-reduced-motion`.
- Windows open, close, minimize and switch instantly (no transition animations).

## Tuning
- `lib/fx.ts` - how often the glitch and REC flash appear (seconds), cool-down, shared lock so they never overlap.
- `components/effects/GlitchFx.tsx` - glitch strength (`peak`, `sh`) and variants.
- `components/appRegistry.tsx` - window titles, sizes, default positions.
- `lib/data.ts` - all mock data (mail, friends, chats, files, photos, start menu).

## Structure
No `src/` folder: `app/` sits at the project root.
```
app/              layout.tsx, page.tsx, globals.css (Tailwind v4 theme + @utility classes)
lib/              wm.tsx (window manager), data.ts, fx.ts, hooks, utils
components/
  Desktop.tsx     shell: icons, windows, taskbar
  Window.tsx  Taskbar.tsx  StartMenu.tsx  ui.tsx  pixel.tsx  FileIcon.tsx  appRegistry.tsx
  apps/           MyComputer, Inbox, Browser, RecycleBin, FolderApp, Gallery, Messenger
  effects/        GlitchFx, RecFlash, Atmosphere (CRT overlay)
```
The `@/` import alias points at the project root (`tsconfig.json`).

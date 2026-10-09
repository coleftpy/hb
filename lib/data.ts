import {
  AppWindow,
  Briefcase,
  Calculator,
  CalendarClock,
  Disc,
  File,
  FileSpreadsheet,
  FileText,
  Film,
  FolderOpen,
  FolderTree,
  Globe,
  HardDrive,
  Image as ImageIcon,
  Inbox,
  MessageCircle,
  Monitor,
  NotebookPen,
  Paintbrush,
  PanelBottom,
  Phone,
  Presentation,
  Printer,
  Save,
  SlidersHorizontal,
  Terminal,
  Trash2,
  Bomb,
  Spade,
  CircleHelp,
  CirclePlay,
  FileSearch,
  Power,
  Settings,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { AppId } from "./wm";
import {
  Gmail,
  Folder,
  GoogleChrome,
  GoogleChromeSolid,
  Laptop,
  Trash,
  Image,
  CommentTextSharp,
  CommentText,
} from "pixelarticons/react";

/* ---------- desktop + start menu ---------- */
export interface DesktopIcon {
  name: string;
  icon: any;
  color: string;
  app: AppId;
}
export const DESKTOP_ICONS: DesktopIcon[] = [
  { name: "My Computer", icon: Laptop, color: "#e6e6e6", app: "computer" },
  { name: "Inbox", icon: Gmail, color: "#ffd24a", app: "inbox" },
  {
    name: "Internet Explorer",
    icon: GoogleChromeSolid,
    color: "#4fc3ff",
    app: "browser",
  },
  { name: "Recycle Bin", icon: Trash, color: "#c8d0d8", app: "bin" },
  { name: "Work", icon: Folder, color: "#9ee37d", app: "work" },
  { name: "Documents", icon: FolderOpen, color: "#ffe94a", app: "docs" },
  { name: "Gallery", icon: Image, color: "#ff9ec4", app: "gallery" },
  {
    name: "KakaoTalk",
    icon: CommentText,
    color: "#fee500",
    app: "messenger",
  },
];

export type MenuItem =
  | { sep: true }
  | {
      label: string;
      icon: LucideIcon;
      color: string;
      app?: AppId;
      kids?: MenuItem[];
    };
export const START_MENU: MenuItem[] = [
  {
    label: "Programs",
    icon: AppWindow,
    color: "#1a3fb0",
    kids: [
      {
        label: "Internet Explorer",
        icon: Globe,
        color: "#1a6fd0",
        app: "browser",
      },
      { label: "Inbox", icon: Inbox, color: "#c08a00", app: "inbox" },
      { label: "Gallery", icon: ImageIcon, color: "#2a7a2a", app: "gallery" },
      {
        label: "KakaoTalk",
        icon: MessageCircle,
        color: "#c9a800",
        app: "messenger",
      },
      { label: "Calculator", icon: Calculator, color: "#444" },
      { label: "Notepad", icon: NotebookPen, color: "#1a3fb0" },
      { label: "Paint", icon: Paintbrush, color: "#c0392b" },
      { label: "Minesweeper", icon: Bomb, color: "#222" },
      { label: "Solitaire", icon: Spade, color: "#222" },
      { label: "MS-DOS Prompt", icon: Terminal, color: "#111" },
      {
        label: "Windows Explorer",
        icon: FolderTree,
        color: "#b8860b",
        app: "computer",
      },
    ],
  },
  {
    label: "Documents",
    icon: FolderOpen,
    color: "#b8860b",
    kids: [
      {
        label: "My Documents",
        icon: FolderOpen,
        color: "#b8860b",
        app: "docs",
      },
      { label: "Letter.doc", icon: FileText, color: "#1a3fb0" },
      { label: "Notes.txt", icon: FileText, color: "#555" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    color: "#555",
    kids: [
      { label: "Control Panel", icon: SlidersHorizontal, color: "#1a3fb0" },
      { label: "Printers", icon: Printer, color: "#444" },
      { label: "Taskbar...", icon: PanelBottom, color: "#555" },
    ],
  },
  {
    label: "Find",
    icon: Search,
    color: "#c08a00",
    kids: [
      { label: "Files or Folders...", icon: FileSearch, color: "#c08a00" },
      { label: "Computer...", icon: Monitor, color: "#555" },
    ],
  },
  { label: "Help", icon: CircleHelp, color: "#1a3fb0" },
  { label: "Run...", icon: CirclePlay, color: "#2a7a2a" },
  { sep: true },
  { label: "Shut Down...", icon: Power, color: "#c0392b" },
];

/* ---------- My Computer ---------- */
export const COMPUTER_ITEMS: {
  name: string;
  icon: LucideIcon;
  color: string;
  desc: string;
}[] = [
  {
    name: "3\u00bd Floppy (A:)",
    icon: Save,
    color: "#555",
    desc: "Removable disk drive.",
  },
  {
    name: "Ms-dos_6 (C:)",
    icon: HardDrive,
    color: "#555",
    desc: "Local disk drive.",
  },
  { name: "(D:)", icon: Disc, color: "#7b2d9e", desc: "CD-ROM drive." },
  {
    name: "Printers",
    icon: Printer,
    color: "#c08a00",
    desc: "Shows installed printers and lets you add new ones.",
  },
  {
    name: "Control Panel",
    icon: SlidersHorizontal,
    color: "#c08a00",
    desc: "Changes settings for your computer.",
  },
  {
    name: "Dial-Up Networking",
    icon: Phone,
    color: "#c08a00",
    desc: "Connects to another computer over a modem.",
  },
  {
    name: "Scheduled Tasks",
    icon: CalendarClock,
    color: "#c08a00",
    desc: "Schedules programs to run automatically.",
  },
];

/* ---------- Inbox ---------- */
export interface Mail {
  from: string;
  subject: string;
  date: string;
  unread: boolean;
  body: string;
}
export const MAIL: Mail[] = [
  {
    from: "Welcome Team",
    subject: "Welcome to your new mailbox!",
    date: "10/8 9:12 AM",
    unread: true,
    body: "Hello,\n\nYour mailbox is ready. You can send and receive messages, keep a list of contacts and organize mail into folders.\n\nIf you need help, open the Help menu.\n\n- The Welcome Team",
  },
  {
    from: "Mom",
    subject: "Dinner on Sunday?",
    date: "10/8 8:40 AM",
    unread: true,
    body: "Hi sweetie,\n\nAre you coming over on Sunday? I'm making the soup you like. Dad says to bring the cable for the printer, he can never find it.\n\nCall me when you get this.\n\nLove, Mom",
  },
  {
    from: "Sarah Kim",
    subject: "Meeting moved to 3:00 PM",
    date: "10/8 8:05 AM",
    unread: true,
    body: "Quick update: Thursday's design review is now at 3:00 PM in the small conference room.\n\nPlease bring the latest mockups, printed if possible. The projector is acting up again.\n\nThanks,\nSarah",
  },
  {
    from: "IT Helpdesk",
    subject: "Scheduled maintenance tonight",
    date: "10/7 5:30 PM",
    unread: false,
    body: "The file server will be offline from 11:00 PM to 1:00 AM for maintenance.\n\nPlease save your work and log off before leaving. Files left open may not be recoverable.\n\nIT Helpdesk",
  },
  {
    from: "Jake",
    subject: "FW: FW: FW: you won't believe this",
    date: "10/7 2:14 PM",
    unread: false,
    body: "> > > Send this to 10 people in the next 5 minutes or something terrible will happen.\n> > >\n> > > A girl in Ohio ignored this message and her computer\n> > > never worked right again.\n\nlol i don't believe it but i sent it to you anyway",
  },
  {
    from: "Library Notice",
    subject: "Item due soon",
    date: "10/7 11:02 AM",
    unread: false,
    body: 'The following item is due in 2 days:\n\n  "Introduction to Computer Networks"\n\nPlease return or renew it at the front desk.',
  },
  {
    from: "Dr. Park's Office",
    subject: "Appointment reminder",
    date: "10/6 4:48 PM",
    unread: false,
    body: "This is a reminder of your appointment on Monday at 10:30 AM.\n\nPlease arrive 10 minutes early. If you need to reschedule, call us at least one day in advance.",
  },
  {
    from: "Daily Digest",
    subject: "Today's top stories",
    date: "10/6 7:00 AM",
    unread: false,
    body: "- Local library extends weekend hours\n- New bus route opens downtown\n- Weather: sunny, high of 18, light wind in the evening\n\nTo stop receiving this digest, reply with UNSUBSCRIBE.",
  },
  {
    from: "Unknown Sender",
    subject: "Re: Re: are you still watching?",
    date: "10/5 3:33 AM",
    unread: true,
    body: "Did you see it too?\n\nIt only lasts a second. If you blink you miss it.\n\nI keep seeing it.",
  },
  {
    from: "Welcome Team",
    subject: "Getting started: tips and tricks",
    date: "10/5 9:00 AM",
    unread: false,
    body: "Tip 1: Double-click an icon on the desktop to open it.\nTip 2: Use the Start button to find programs.\nTip 3: Don't forget to save your work!\n\nEnjoy!",
  },
];

/* ---------- Recycle Bin ---------- */
export interface BinFile {
  name: string;
  loc: string;
  date: string;
  type: string;
  kb: number;
  icon: LucideIcon;
}
export const BIN_FILES: BinFile[] = [
  {
    name: "Untitled.txt",
    loc: "C:\\My Documents",
    date: "10/7/26",
    type: "Text Document",
    kb: 1,
    icon: FileText,
  },
  {
    name: "budget_final_v7.xls",
    loc: "C:\\My Documents\\Work",
    date: "10/6/26",
    type: "Spreadsheet",
    kb: 46,
    icon: FileSpreadsheet,
  },
  {
    name: "resume_OLD.doc",
    loc: "C:\\My Documents",
    date: "10/5/26",
    type: "Document",
    kb: 27,
    icon: FileText,
  },
  {
    name: "photo001.jpg",
    loc: "C:\\Pictures",
    date: "10/4/26",
    type: "JPEG Image",
    kb: 312,
    icon: ImageIcon,
  },
  {
    name: "diary.txt",
    loc: "C:\\My Documents\\Private",
    date: "10/3/26",
    type: "Text Document",
    kb: 9,
    icon: FileText,
  },
  {
    name: "setup.exe",
    loc: "C:\\Downloads",
    date: "10/2/26",
    type: "Application",
    kb: 1204,
    icon: AppWindow,
  },
  {
    name: "recording_0003.avi",
    loc: "C:\\Video",
    date: "10/1/26",
    type: "Video Clip",
    kb: 8420,
    icon: Film,
  },
];

/* ---------- Folder trees (Work / Documents) ---------- */
export interface FolderItem {
  name: string;
  icon: any;
  color: string;
  kids?: FolderItem[];
}
const C = {
  folder: "#d9a400",
  doc: "#4a6fd0",
  xls: "#2a9a3a",
  ppt: "#d46a1a",
  txt: "#555",
  img: "#c0508a",
  drv: "#666",
};
const Fo = (name: string, kids: FolderItem[] = []): FolderItem => ({
  name,
  icon: Folder,
  color: C.folder,
  kids,
});
const Dc = (name: string): FolderItem => ({
  name,
  icon: name.endsWith(".txt") ? File : FileText,
  color: name.endsWith(".txt") ? C.txt : C.doc,
});
const Xl = (name: string): FolderItem => ({
  name,
  icon: FileSpreadsheet,
  color: C.xls,
});
const Pp = (name: string): FolderItem => ({
  name,
  icon: Presentation,
  color: C.ppt,
});
const Im = (name: string): FolderItem => ({
  name,
  icon: ImageIcon,
  color: C.img,
});
export const WORK_TREE: FolderItem[] = [
  Fo("Projects", [
    Fo("Website_Redesign", [Im("mockup_v3.png"), Dc("notes.txt")]),
    Dc("Q4_Plan.doc"),
    Xl("Timeline.xls"),
  ]),
  Fo("Reports", [Dc("Q3_Report.doc"), Xl("Sales_Sept.xls"), Dc("Summary.txt")]),
  {
    name: "Shared (S:)",
    icon: HardDrive,
    color: C.drv,
    kids: [
      Fo("Templates", [Dc("Letterhead.doc"), Dc("Memo.doc")]),
      Dc("Policies.doc"),
      Xl("Holiday_Calendar.xls"),
    ],
  },
  Dc("Q3_Report.doc"),
  Xl("Budget_2026.xls"),
  Xl("Schedule.xls"),
  Dc("Meeting_Notes.txt"),
  Pp("Presentation.ppt"),
];
export const DOCS_TREE: FolderItem[] = [
  Fo("Old Stuff", [
    Dc("homework_1998.doc"),
    Dc("poem_draft.txt"),
    Im("scan0001.jpg"),
  ]),
  Dc("Letter.doc"),
  Dc("Notes.txt"),
  Dc("Resume.doc"),
  Dc("Recipes.txt"),
  Xl("Taxes_2025.xls"),
  Dc("Travel_Plan.doc"),
  Dc("Poem.txt"),
];

/* ---------- Gallery (CSS-painted "photos") ---------- */
export const PHOTOS: { name: string; bg: string }[] = [
  {
    name: "beach.jpg",
    bg: "radial-gradient(circle at 78% 24%, #fff7b0 0 8%, transparent 9%), linear-gradient(#7ec8f0 0 58%, #2a8fd0 58% 72%, #f2dca0 72%)",
  },
  {
    name: "mountain.jpg",
    bg: "radial-gradient(ellipse 60% 45% at 30% 100%, #3f6a4a 0 98%, transparent 100%), radial-gradient(ellipse 70% 55% at 78% 105%, #2c5238 0 98%, transparent 100%), linear-gradient(#8ec6f2, #e8f4fc)",
  },
  {
    name: "sunset.jpg",
    bg: "radial-gradient(circle at 50% 72%, #ffd36b 0 12%, transparent 13%), linear-gradient(#2b1b5a, #c0396b 55%, #ff9a4a 82%)",
  },
  {
    name: "city_night.jpg",
    bg: "repeating-linear-gradient(90deg, #12172b 0 18px, #1b2340 18px 34px, #0d1020 34px 46px) left bottom / 100% 55% no-repeat, linear-gradient(#050818, #1a2a5a)",
  },
  {
    name: "forest.jpg",
    bg: "repeating-linear-gradient(80deg, rgba(0,0,0,.18) 0 6px, transparent 6px 22px), linear-gradient(#cfe9b8, #2f6a35)",
  },
  {
    name: "snow.jpg",
    bg: "radial-gradient(ellipse 80% 40% at 50% 110%, #fff 0 98%, transparent 100%), linear-gradient(#a9c4de, #e6eef6)",
  },
  {
    name: "desert.jpg",
    bg: "radial-gradient(ellipse 70% 40% at 20% 105%, #d9a05a 0 98%, transparent 100%), radial-gradient(ellipse 80% 50% at 85% 108%, #c8854a 0 98%, transparent 100%), linear-gradient(#f6c97a, #fbe8b8)",
  },
  { name: "lake.jpg", bg: "linear-gradient(#bde3ff 0 45%, #3a7fb0 45%)" },
  {
    name: "untitled_0003.jpg",
    bg: "radial-gradient(circle at 90% 10%, #f22 0 2.2%, transparent 2.8%), repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px), linear-gradient(#0a0a0a, #1c1c24)",
  },
];

/* ---------- Messenger ---------- */
export const ME = "나";
export interface Room {
  id: number;
  name: string;
  group: boolean;
  members?: string[];
  unread: number;
  msgs: [string, string, string][];
}
export const FRIENDS: [string, string][] = [
  ["지민", "점심 뭐 먹지"],
  ["민수", "바쁘다 바빠"],
  ["엄마", "건강이 최고"],
  ["준호", "운동 중"],
  ["수아", "커피 한 잔의 여유"],
  ["팀장님", "회의 중입니다"],
  ["현우", "퇴근하고 싶다"],
  ["Sarah", "Busy day!"],
  ["하은", "좋은 하루 :)"],
];
export const INITIAL_ROOMS: Room[] = [
  {
    id: 1,
    name: "지민",
    group: false,
    unread: 2,
    msgs: [
      ["지민", "오늘 저녁에 시간 돼?", "오후 5:12"],
      [ME, "응 괜찮아! 몇 시?", "오후 5:14"],
      ["지민", "7시쯤 어때? 홍대에서 보자", "오후 5:15"],
      ["지민", "늦지 마 ㅋㅋ", "오후 5:15"],
    ],
  },
  {
    id: 2,
    name: "프로젝트팀",
    group: true,
    members: ["팀장님", "현우", "수아", "준호"],
    unread: 3,
    msgs: [
      ["팀장님", "내일 회의 3시로 변경됐습니다", "오전 9:30"],
      ["현우", "넵 확인했습니다", "오전 9:32"],
      ["수아", "자료는 제가 준비할게요", "오전 9:40"],
      ["팀장님", "다들 수고했어요", "오전 9:41"],
    ],
  },
  {
    id: 3,
    name: "엄마",
    group: false,
    unread: 1,
    msgs: [
      ["엄마", "밥은 먹었니?", "오전 8:02"],
      ["엄마", "주말에 집에 오렴", "오전 8:03"],
    ],
  },
  {
    id: 4,
    name: "민수",
    group: false,
    unread: 0,
    msgs: [
      [ME, "그 영화 봤어?", "어제"],
      ["민수", "아직 못 봤어 ㅠㅠ", "어제"],
      [ME, "같이 보자", "어제"],
    ],
  },
  {
    id: 5,
    name: "스터디 모임",
    group: true,
    members: ["준호", "하은", "Sarah"],
    unread: 0,
    msgs: [
      ["하은", "다음 주 발표 순서 정했어?", "월요일"],
      ["준호", "내가 먼저 할게", "월요일"],
      ["Sarah", "Sounds good!", "월요일"],
    ],
  },
  {
    id: 6,
    name: "Sarah",
    group: false,
    unread: 0,
    msgs: [
      ["Sarah", "Did you get my email?", "수요일"],
      [ME, "Yes! I'll reply tonight", "수요일"],
      ["Sarah", "Perfect, thanks!", "수요일"],
    ],
  },
  {
    id: 7,
    name: "알 수 없음",
    group: false,
    unread: 1,
    msgs: [["알 수 없음", "혹시 너도 봤어?", "오전 3:33"]],
  },
];
export const REPLY_KO = [
  "ㅋㅋㅋ 그래",
  "알겠어!",
  "잠깐만~",
  "오 좋아",
  "나중에 얘기하자",
  "ㅇㅋ",
  "헐 진짜?",
  "지금 가는 중이야",
];
export const REPLY_EN = ["Sounds good!", "Haha okay", "Let me check", "Sure!"];

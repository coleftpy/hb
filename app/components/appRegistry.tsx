"use client";
import { Briefcase, FolderOpen, Globe, Image as ImageIcon, Inbox as InboxIcon, MessageCircle, Monitor, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { DOCS_TREE, WORK_TREE } from "@/lib/data";
import type { AppId } from "@/lib/wm";
import type { WinDef } from "./Window";
import Browser from "./apps/Browser";
import FolderApp from "./apps/FolderApp";
import Gallery from "./apps/Gallery";
import Inbox from "./apps/Inbox";
import Messenger from "./apps/Messenger";
import MyComputer from "./apps/MyComputer";
import RecycleBin from "./apps/RecycleBin";

// x / y: default position on wide screens (clear of the desktop icons)
export const APPS: Record<AppId, { def: WinDef; render: () => ReactNode }> = {
  computer: { def: { title: "My Computer", icon: Monitor, w: 508, h: 410, x: 190, y: 30 }, render: () => <MyComputer /> },
  inbox: { def: { title: "Inbox - Mail", icon: InboxIcon, w: 640, h: 430, x: 230, y: 56 }, render: () => <Inbox /> },
  browser: { def: { title: "Internet Explorer", icon: Globe, w: 700, h: 460, x: 260, y: 40 }, render: () => <Browser /> },
  bin: { def: { title: "Recycle Bin", icon: Trash2, w: 580, h: 330, x: 210, y: 90 }, render: () => <RecycleBin /> },
  work: { def: { title: "Work", icon: Briefcase, w: 520, h: 360, x: 220, y: 50 }, render: () => <FolderApp title="Work" icon={Briefcase} root={WORK_TREE} /> },
  docs: { def: { title: "Documents", icon: FolderOpen, w: 520, h: 360, x: 250, y: 80 }, render: () => <FolderApp title="Documents" icon={FolderOpen} root={DOCS_TREE} /> },
  gallery: { def: { title: "Gallery", icon: ImageIcon, w: 580, h: 400, x: 200, y: 110 }, render: () => <Gallery /> },
  messenger: { def: { title: "KakaoTalk", icon: MessageCircle, w: 360, h: 540, x: 480, y: 24 }, render: () => <Messenger /> },
};

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineMap,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineChartBar,
  HiOutlineTrophy,
  HiOutlineUser,
} from "react-icons/hi2";

export default function Navigation() {
  const currentPath = usePathname();
  return (
    <nav className="btm-nav max-w-md mx-auto">
      <Link
        href={"/"}
        className={`text-primary ${
          currentPath === "/" ? "active" : "text-gray-400"
        }`}
      >
        <HiOutlineMap size={25} />
        <span className="btm-nav-label">맵</span>
      </Link>
      <Link
        href={"/chat-list"}
        className={`text-primary ${
          currentPath === "/chat-list" ? "active" : "text-gray-400"
        }`}
      >
        <HiOutlineChatBubbleOvalLeftEllipsis size={25} />
        <span className="btm-nav-label">채팅</span>
      </Link>
      <Link
        href={"/ranking"}
        className={`text-primary ${
          currentPath === "/ranking" ? "active" : "text-gray-400"
        }`}
      >
        <HiOutlineTrophy size={25} />
        <span className="btm-nav-label">랭킹</span>
      </Link>
      <Link
        href={"/chart"}
        className={`text-primary ${
          currentPath === "/chart" ? "active" : "text-gray-400"
        }`}
      >
        <HiOutlineChartBar size={25} />
        <span className="btm-nav-label">기록</span>
      </Link>
      <Link
        href={"/mypage"}
        className={`text-primary ${
          currentPath === "/mypage" ? "active" : "text-gray-400"
        }`}
      >
        <HiOutlineUser size={25} />
        <span className="btm-nav-label">마이 페이지</span>
      </Link>
    </nav>
  );
}

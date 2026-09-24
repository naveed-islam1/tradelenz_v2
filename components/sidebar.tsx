"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavigationItem = {
  label: "Dashboard" | "Add Trade" | "Analytics" | "Progress Cards" | "All Time Trades";
  icon: string;
  href: string;
};

const navigationItems: NavigationItem[] = [
  { label: "Dashboard", icon: "/sidebar-icons/dashboard.svg", href: "/" },
  { label: "Add Trade", icon: "/sidebar-icons/add-trade.svg", href: "/add-trade" },
  { label: "Analytics", icon: "/sidebar-icons/analytics.svg", href: "/analytics" },
  { label: "Progress Cards", icon: "/sidebar-icons/progress-cards.svg", href: "/progress-cards" },
  { label: "All Time Trades", icon: "/sidebar-icons/all-time-trades.svg", href: "/all-time-trades" },
];

type SidebarProps = {
  initialActiveItem?: NavigationItem["label"];
};

const Sidebar = ({ initialActiveItem = "Dashboard" }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState<NavigationItem["label"]>(initialActiveItem);
  const [isDark, setIsDark] = useState(true);

  const surfaceClass = isDark
    ? "bg-[#182338] text-[#f1f5f9]"
    : "bg-white text-[#0f172a]";
  const mutedClass = isDark ? "text-[#9aaac0]" : "text-[#64748b]";
  const secondaryClass = isDark ? "bg-[#202d44]" : "bg-[#f1f5f9]";

  return (
    <aside
      className={`flex min-h-screen w-60 shrink-0 flex-col px-4 pb-6 pt-7 ${surfaceClass}`}
      aria-label="Primary navigation"
    >
      <div className="flex items-center gap-2.5">
        <Image alt="TradeLenz logo" height={28} priority src="/brand/tradelens-mark.svg" width={28} />
        <div className="flex flex-col gap-0.5">
          <p className="text-xl font-semibold leading-7 tracking-[-0.02em]">Trade <span className="text-status-positive">Lenz</span></p>
          <p className={`text-xs font-medium leading-4 ${mutedClass}`}>TRADING JOURNAL</p>
        </div>
      </div>

      <nav className="mt-[18px] flex flex-col gap-1" aria-label="TradeLenz sections">
        {navigationItems.map((item) => {
          const isActive = item.label === activeItem;

          return (
            <Link
              className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-[#057854] to-[#21c45c] font-medium text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)]"
                  : `${mutedClass} hover:bg-[#202d44]`
              }`}
              href={item.href}
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              aria-current={isActive ? "page" : undefined}
            >
              <Image
                alt=""
                className={isActive ? "brightness-0 invert" : "opacity-85"}
                height={18}
                src={item.icon}
                width={18}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* <button
        aria-pressed={isDark}
        className={`mt-auto flex h-10 w-full items-center justify-center gap-2.5 rounded-lg px-3 text-sm transition-colors ${secondaryClass} ${
          isDark ? "text-[#f1f5f9]" : "text-[#0f172a]"
        }`}
        onClick={() => setIsDark((currentTheme) => !currentTheme)}
        type="button"
      >
        <Image alt="" height={18} src="/sidebar-icons/moon.svg" width={18} />
        <span>{isDark ? "Dark theme" : "Light theme"}</span>
      </button> */}
    </aside>
  );
};

export default Sidebar;

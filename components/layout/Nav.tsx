"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/specification", label: "Specification" },
  { href: "/rate", label: "Rate Your Project" },
  { href: "/about", label: "About" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-gpcs-border text-gpcs-silver hover:text-gpcs-text hover:border-gpcs-gold/40 transition-colors duration-200 cursor-pointer"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function Nav({ version }: { version: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gpcs-border bg-gpcs-bg/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-gpcs-gold/40 bg-gpcs-gold/10 transition-colors group-hover:bg-gpcs-gold/20">
            <span className="font-display text-xs font-bold text-gpcs-gold">
              G
            </span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-gpcs-text">
            GPCS
          </span>
          <span className="hidden text-xs text-gpcs-muted sm:block">
            v{version}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const isRate = link.href === "/rate";

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isRate
                      ? "border border-gpcs-gold/50 bg-gpcs-gold/10 text-gpcs-gold hover:bg-gpcs-gold/20"
                      : isActive
                      ? "text-gpcs-gold"
                      : "text-gpcs-silver hover:text-gpcs-text"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: theme toggle + mobile menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex items-center justify-center rounded-md p-2 text-gpcs-silver hover:text-gpcs-text md:hidden cursor-pointer transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gpcs-border bg-gpcs-surface md:hidden">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const isRate = link.href === "/rate";

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isRate
                        ? "border border-gpcs-gold/50 bg-gpcs-gold/10 text-gpcs-gold"
                        : isActive
                        ? "text-gpcs-gold bg-gpcs-gold/5"
                        : "text-gpcs-silver hover:text-gpcs-text"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
  level: number;
}

interface SpecNavProps {
  sections: Section[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function SpecNav({ sections }: SpecNavProps) {
  const [active, setActive] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = sections
      .filter((s) => s.level <= 2)
      .map((s) => document.getElementById(slugify(s.title)))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topVisible = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(topVisible.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const topSections = sections.filter((s) => s.level <= 2);

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gpcs-muted">
        Contents
      </p>
      <ul className="space-y-0.5">
        {topSections.map((section) => {
          const id = slugify(section.title);
          const isActive = active === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block rounded px-2.5 py-1.5 text-xs transition-colors duration-150",
                  section.level === 1 ? "font-semibold" : "pl-4 font-normal",
                  isActive
                    ? "bg-gpcs-gold/10 text-gpcs-gold"
                    : "text-gpcs-muted hover:text-gpcs-silver"
                )}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

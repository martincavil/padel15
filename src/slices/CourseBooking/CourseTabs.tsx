"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Course = { label: string; emoji: string; description: ReactNode; includes: ReactNode };

/** Onglets des types de cours (particulier, collectif…). */
export function CourseTabs({ courses }: { courses: Course[] }) {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="flex gap-3 mb-8 bg-white p-1.5 rounded-xl border border-gray-200">
        {courses.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer",
              active === i ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-gray-500 hover:text-gray-900",
            )}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      {courses.map((c, i) => (
        <div key={i} className={cn("transition-all duration-300", active === i ? "block" : "hidden")}>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            {c.description}
            {c.includes}
          </div>
        </div>
      ))}
    </>
  );
}

'use client'

import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {


  return (
    <div className="bg-card rounded-lg border border-slate-200 p-4 flex flex-col justify-center gap-4 h-full">
      {children}
    </div>
  )
}

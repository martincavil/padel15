'use client'

import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {


  return (
    <div className="bg-card rounded-lg border border-slate-200 p-4 flex flex-col justify-between h-full">
      {children}
    </div>
  )
}

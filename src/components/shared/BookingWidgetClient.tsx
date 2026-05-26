"use client";

import { BookingWidget } from "@/components/shared/BookingWidget";

export function BookingWidgetClient({ className }: { className?: string }) {
  return <BookingWidget className={className} />;
}

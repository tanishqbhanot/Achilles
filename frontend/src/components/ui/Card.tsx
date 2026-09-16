import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/5 bg-surface p-5 ${className}`}
    >
      {children}
    </div>
  );
}

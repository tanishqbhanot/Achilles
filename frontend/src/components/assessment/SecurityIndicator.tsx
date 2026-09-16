import { useState } from "react";
import { Check, Shield } from "lucide-react";
import { securityStatus } from "../../data/mockData";

export default function SecurityIndicator() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Assessment Security Active
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-white/10 bg-surface p-4 shadow-xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
            <Shield size={16} className="text-accent" />
            Security Status
          </p>
          <ul className="flex flex-col gap-2">
            {securityStatus.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 text-sm text-secondary"
              >
                <Check size={14} className="text-accent" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

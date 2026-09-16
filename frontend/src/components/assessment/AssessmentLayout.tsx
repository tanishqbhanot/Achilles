import { Outlet } from "react-router-dom";
import SecurityIndicator from "./SecurityIndicator";

export default function AssessmentLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-secondary">
          ACHILLES
        </p>
        <SecurityIndicator />
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

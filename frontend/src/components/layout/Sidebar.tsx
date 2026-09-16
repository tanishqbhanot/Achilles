import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  Network,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { candidate } from "../../data/mockData";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assessment", label: "Assessment", icon: ClipboardCheck },
  { to: "/skills", label: "Skills", icon: Network },
  { to: "/interview", label: "Interview", icon: MessageSquare },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const initials = candidate.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-white/5 bg-surface">
      <div className="px-6 py-6">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-secondary">
          ACHILLES
        </p>
        <p className="mt-1 text-sm text-secondary">Technical assessment</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-accent/15 font-medium text-accent"
                  : "text-secondary hover:bg-white/5 hover:text-primary"
              }`
            }
            end={to === "/dashboard"}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/5 px-3 py-4">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary hover:bg-white/5 hover:text-primary"
        >
          <Settings size={18} />
          Settings
        </NavLink>
        <div className="mt-3 flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
            {initials}
          </div>
          <div>
            <p className="text-sm text-primary">{candidate.name}</p>
            <p className="text-xs text-secondary">VA</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Network,
  FolderKanban,
  ClipboardCheck,
  User,
} from "lucide-react";

const links = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/skills",
    label: "Skills",
    icon: Network,
    end: false,
  },
  {
    to: "/projects",
    label: "Projects",
    icon: FolderKanban,
    end: false,
  },
  {
    to: "/assessment/overview",
    label: "Assessment",
    icon: ClipboardCheck,
    end: false,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
    end: false,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[252px] shrink-0 flex-col border-r border-white/[0.07] bg-[#111113]">

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="px-5 pb-7 pt-5">
        <NavLink
          to="/dashboard"
          aria-label="Achilles dashboard"
          className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.025]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#da224b]/35 bg-[#171114]">
            <img
              src="/achilles-logo.png"
              alt="Achilles"
              className="h-9 w-9 object-contain"
            />
          </div>

          <p className="text-[12px] font-semibold tracking-[0.28em] text-[#da224b]">
            ACHILLES
          </p>
        </NavLink>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="flex flex-1 flex-col px-3">
        <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
          Workspace
        </p>

        <div className="flex flex-col gap-1">
          {links.map(
            ({
              to,
              label,
              icon: Icon,
              end,
            }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all duration-200 ${
                    isActive
                      ? "border border-[#da224b]/15 bg-[#241519] font-medium text-white shadow-[inset_3px_0_0_#da224b]"
                      : "border border-transparent text-white/45 hover:bg-white/[0.025] hover:text-white/80"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={
                        isActive ? 2 : 1.7
                      }
                      className={
                        isActive
                          ? "text-[#da224b]"
                          : "text-white/35 transition-colors group-hover:text-white/60"
                      }
                    />

                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            )
          )}
        </div>
      </nav>
    </aside>
  );
}
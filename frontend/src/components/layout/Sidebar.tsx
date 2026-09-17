import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  Network,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

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
  const [logoPulse, setLogoPulse] = useState(0);

  function handleLogoClick() {
    setLogoPulse((value) => value + 1);
  }

  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0b0b0d]">
      <div className="flex h-full flex-col px-4 py-5">
        {/* =====================================================
            ACHILLES LOGO
        ===================================================== */}
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Achilles"
          className="group mb-8 flex items-center gap-3 rounded-xl p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/40"
        >
          <motion.div
            key={logoPulse}
            initial={{
              scale: 1,
            }}
            animate={{
              scale:
                logoPulse === 0
                  ? 1
                  : [1, 0.92, 1.08, 0.98, 1],
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#da224b]/25 bg-[#151518] transition-colors duration-200 group-hover:border-[#da224b]/55 group-hover:bg-[#181215]"
          >
            {/* Expanding ring */}
            {logoPulse > 0 && (
              <motion.span
                key={`ring-${logoPulse}`}
                initial={{
                  opacity: 0.75,
                  scale: 0.65,
                }}
                animate={{
                  opacity: 0,
                  scale: 1.75,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pointer-events-none absolute inset-0 rounded-xl border border-[#da224b]/70"
              />
            )}

            {/* Second softer ring */}
            {logoPulse > 0 && (
              <motion.span
                key={`glow-${logoPulse}`}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.15, 1.4],
                }}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                }}
                className="pointer-events-none absolute inset-0 rounded-xl bg-[#da224b]/15 blur-lg"
              />
            )}

            {/* Scan sweep */}
            {logoPulse > 0 && (
              <motion.span
                key={`scan-${logoPulse}`}
                initial={{
                  opacity: 0,
                  x: -24,
                }}
                animate={{
                  opacity: [0, 0.9, 0],
                  x: 24,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#da224b] blur-md"
              />
            )}

            {/* Logo glow */}
            <motion.img
              src="/achilles-logo.png"
              alt="Achilles"
              animate={
                logoPulse === 0
                  ? {
                      filter:
                        "drop-shadow(0 0 0 rgba(218,34,75,0))",
                    }
                  : {
                      filter: [
                        "drop-shadow(0 0 0 rgba(218,34,75,0))",
                        "drop-shadow(0 0 18px rgba(218,34,75,0.9))",
                        "drop-shadow(0 0 4px rgba(218,34,75,0.25))",
                      ],
                    }
              }
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="relative z-10 h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </motion.div>

          <div>
            <p className="text-[13px] font-semibold tracking-[0.28em] text-[#da224b]">
              ACHILLES
            </p>

            <p className="mt-1 text-xs text-white/35">
              Technical profile
            </p>
          </div>
        </button>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}
        <nav className="space-y-1.5">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "group relative flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-[#191114] text-white"
                    : "text-white/45 hover:bg-white/[0.025] hover:text-white/75",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2 rounded-full bg-[#da224b] shadow-[0_0_12px_rgba(218,34,75,0.5)]"
                    />
                  )}

                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className={
                      isActive
                        ? "text-[#da224b]"
                        : "text-white/30 transition-colors duration-200 group-hover:text-white/55"
                    }
                  />

                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/[0.07] pt-4">
          <p className="px-3 text-[11px] uppercase tracking-[0.14em] text-white/20">
            Achilles
          </p>
        </div>
      </div>
    </aside>
  );
}
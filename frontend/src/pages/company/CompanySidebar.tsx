import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  LayoutDashboard,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";

type CompanyPlan = "basic" | "plus" | "pro";

type CompanySidebarProps = {
  plan?: CompanyPlan;
};

type CompanyLocationState = {
  skills?: string[];
  plan?: CompanyPlan;
  companyName?: string;
};

const links = [
  {
    to: "/company/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/company/candidate-preferences",
    label: "Update Preferences",
    icon: SlidersHorizontal,
    end: false,
  },
];

export default function CompanySidebar({
  plan = "pro",
}: CompanySidebarProps) {
  const [logoStrike, setLogoStrike] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const locationState =
    (location.state as CompanyLocationState | null) ?? null;

  const currentSkills =
    locationState?.skills && locationState.skills.length > 0
      ? locationState.skills
      : ["React", "Python"];

  const companyName = locationState?.companyName;

  const canUpgrade = plan === "basic" || plan === "plus";

  const planLabel =
    plan.charAt(0).toUpperCase() + plan.slice(1);

  function handleLogoClick() {
    setLogoStrike((value) => value + 1);
  }

  function handleUpgrade() {
    navigate("/company/subscription", {
      state: {
        skills: currentSkills,
        plan,
        companyName,
      },
    });
  }

  return (
    <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 self-start flex-col border-r border-white/[0.07] bg-[#0b0b0d]">
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
          <div className="relative h-12 w-12">
            <motion.div
              key={`logo-${logoStrike}`}
              animate={{
                scale:
                  logoStrike === 0
                    ? 1
                    : [1, 0.985, 1.01, 1],
              }}
              transition={{
                duration: 1.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 flex items-center justify-center overflow-visible rounded-xl border border-[#da224b]/25 bg-[#151518] transition-colors duration-300 group-hover:border-[#da224b]/45"
            >
              {/* =================================================
                  FIRST SWORD SLASH
              ================================================= */}
              {logoStrike > 0 && (
                <>
                  <motion.div
                    key={`slash-one-${logoStrike}`}
                    initial={{
                      opacity: 0,
                      x: -42,
                      y: 42,
                      scale: 0.82,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [-42, 0, 42],
                      y: [42, 0, -42],
                      scale: [0.82, 1, 1.02],
                    }}
                    transition={{
                      duration: 0.8,
                      times: [0, 0.52, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[7px] w-[82px] -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-[#da224b] shadow-[0_0_7px_rgba(218,34,75,0.55)]"
                    style={{
                      clipPath:
                        "polygon(0% 50%, 12% 35%, 82% 8%, 100% 50%, 82% 92%, 12% 65%)",
                    }}
                  />

                  <motion.div
                    key={`edge-one-${logoStrike}`}
                    initial={{
                      opacity: 0,
                      x: -42,
                      y: 42,
                    }}
                    animate={{
                      opacity: [0, 1, 0.95, 0],
                      x: [-42, 0, 42],
                      y: [42, 0, -42],
                    }}
                    transition={{
                      duration: 0.62,
                      times: [0, 0.52, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-[1px] w-[76px] -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-white shadow-[0_0_5px_rgba(255,255,255,0.9)]"
                  />

                  <motion.div
                    key={`trail-one-${logoStrike}`}
                    initial={{
                      opacity: 0,
                      x: -30,
                      y: 30,
                      scaleX: 0.2,
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      x: [-12, 0, 22],
                      y: [12, 0, -22],
                      scaleX: [0.2, 0.75, 1],
                    }}
                    transition={{
                      duration: 0.7,
                      times: [0, 0.5, 1],
                      ease: "easeOut",
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[2px] w-[48px] origin-center -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded-full bg-[#da224b]/45 blur-[1px]"
                  />
                </>
              )}

              {/* =================================================
                  SECOND SWORD SLASH
              ================================================= */}
              {logoStrike > 0 && (
                <>
                  <motion.div
                    key={`slash-two-${logoStrike}`}
                    initial={{
                      opacity: 0,
                      x: -42,
                      y: -42,
                      scale: 0.82,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: [-42, 0, 42],
                      y: [-42, 0, 42],
                      scale: [0.82, 1, 1.02],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.34,
                      times: [0, 0.52, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[7px] w-[82px] -translate-x-1/2 -translate-y-1/2 rotate-[45deg] bg-[#da224b] shadow-[0_0_7px_rgba(218,34,75,0.55)]"
                    style={{
                      clipPath:
                        "polygon(0% 50%, 12% 35%, 82% 8%, 100% 50%, 82% 92%, 12% 65%)",
                    }}
                  />

                  <motion.div
                    key={`edge-two-${logoStrike}`}
                    initial={{
                      opacity: 0,
                      x: -42,
                      y: -42,
                    }}
                    animate={{
                      opacity: [0, 1, 0.95, 0],
                      x: [-42, 0, 42],
                      y: [-42, 0, 42],
                    }}
                    transition={{
                      duration: 0.62,
                      delay: 0.34,
                      times: [0, 0.52, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-[1px] w-[76px] -translate-x-1/2 -translate-y-1/2 rotate-[45deg] bg-white shadow-[0_0_5px_rgba(255,255,255,0.9)]"
                  />

                  <motion.div
                    key={`trail-two-${logoStrike}`}
                    initial={{
                      opacity: 0,
                      x: -30,
                      y: -30,
                      scaleX: 0.2,
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      x: [-12, 0, 22],
                      y: [-12, 0, 22],
                      scaleX: [0.2, 0.75, 1],
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.34,
                      times: [0, 0.5, 1],
                      ease: "easeOut",
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[2px] w-[48px] origin-center -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded-full bg-[#da224b]/45 blur-[1px]"
                  />
                </>
              )}

              {/* =================================================
                  CENTRE IMPACT
              ================================================= */}
              {logoStrike > 0 && (
                <motion.div
                  key={`impact-${logoStrike}`}
                  initial={{
                    opacity: 0,
                    scale: 0.2,
                  }}
                  animate={{
                    opacity: [0, 0.95, 0.4, 0],
                    scale: [0.2, 0.85, 1.05, 1.4],
                  }}
                  transition={{
                    duration: 0.38,
                    delay: 0.42,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pointer-events-none absolute left-1/2 top-1/2 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_18px_rgba(218,34,75,0.7)]"
                />
              )}

              {/* =================================================
                  RED IMPACT GLOW
              ================================================= */}
              {logoStrike > 0 && (
                <motion.div
                  key={`impact-glow-${logoStrike}`}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    scale: [0.3, 1, 1.55],
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#da224b]/25 blur-md"
                />
              )}

              {/* =================================================
                  OUTER SHOCKWAVE
              ================================================= */}
              {logoStrike > 0 && (
                <motion.span
                  key={`shock-${logoStrike}`}
                  initial={{
                    opacity: 0,
                    scale: 0.72,
                  }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    scale: [0.72, 1.15, 1.4],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.45,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute inset-0 z-20 rounded-xl border border-[#da224b]/45"
                />
              )}

              {/* =================================================
                  LOGO IMAGE
              ================================================= */}
              <motion.img
                src="/achilles-logo.png"
                alt="Achilles"
                animate={
                  logoStrike === 0
                    ? {
                        scale: 1,
                        filter:
                          "drop-shadow(0 0 0 rgba(218,34,75,0))",
                      }
                    : {
                        scale: [1, 0.985, 1.02, 1],
                        filter: [
                          "drop-shadow(0 0 0 rgba(218,34,75,0))",
                          "drop-shadow(0 0 6px rgba(218,34,75,0.35))",
                          "drop-shadow(0 0 14px rgba(218,34,75,0.7))",
                          "drop-shadow(0 0 2px rgba(218,34,75,0.2))",
                        ],
                      }
                }
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 h-8 w-8 object-contain"
              />
            </motion.div>
          </div>

          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#da224b]"
              style={{
                fontFamily:
                  '"Wide Latin", "Arial Narrow", sans-serif',
              }}
            >
              ACHILLES
            </p>
          </div>
        </button>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}
        <nav className="space-y-1.5">
          {links.map(
            ({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                state={{
                  skills: currentSkills,
                  plan,
                  companyName,
                  mode:
                    to ===
                    "/company/candidate-preferences"
                      ? "update"
                      : undefined,
                }}
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
                        layoutId="company-sidebar-active-indicator"
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
            ),
          )}
        </nav>

        {/* =====================================================
            BOTTOM INFORMATION
        ===================================================== */}
        <div className="mt-auto">

          {/* ===================================================
              PROFILES LEFT
          =================================================== */}
          <div className="mb-5 px-3">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
                Profiles Left
              </p>

              <p className="font-mono text-xs font-medium text-white/55">
                120
              </p>
            </div>
          </div>

          {/* ===================================================
              CURRENT PLAN
          =================================================== */}
          <div className="border-t border-white/[0.07] pt-4">
            <div className="px-3">
              <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
                Current Plan
              </p>

              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white">
                  {planLabel}
                </p>

                {canUpgrade ? (
                  <button
                    type="button"
                    onClick={handleUpgrade}
                    className="group flex items-center gap-1 text-[11px] font-medium text-[#da224b] transition-colors duration-200 hover:text-[#f03a61]"
                  >
                    Upgrade

                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.8}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                ) : (
                  <span className="text-[10px] text-white/25">
                    Highest plan
                  </span>
                )}
              </div>

              {plan === "basic" && (
                <p className="mt-1.5 text-[10px] leading-4 text-white/25">
                  Upgrade to Plus for expanded candidate access.
                </p>
              )}

              {plan === "plus" && (
                <p className="mt-1.5 text-[10px] leading-4 text-white/25">
                  Upgrade to Pro for full candidate access.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
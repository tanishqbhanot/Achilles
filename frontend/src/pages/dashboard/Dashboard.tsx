import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";

import Card from "../../components/ui/Card";
import Topbar from "../../components/layout/Topbar";
import SkillBars from "../../components/dashboard/SkillBars";

import { useAppStore } from "../../store/appStore";

export default function Dashboard() {
  const projects = useAppStore((state) => state.projects);

  const dashboardRef = useRef<HTMLDivElement>(null);

  const [pointer, setPointer] = useState({
    x: 50,
    y: 35,
  });

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 1150);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
    const element = dashboardRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      ref={dashboardRef}
      onMouseMove={handlePointerMove}
      className="relative min-h-screen overflow-hidden bg-[#0b0b0d] text-white"
    >
      {/* =====================================================
          AMBIENT CURSOR LIGHT
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(
            720px circle at ${pointer.x}% ${pointer.y}%,
            rgba(218, 34, 75, 0.12),
            rgba(218, 34, 75, 0.045) 30%,
            transparent 67%
          )`,
        }}
      />

      {/* =====================================================
          SUBTLE TECHNICAL GRID
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* =====================================================
          DASHBOARD CONTENT
      ===================================================== */}
      <div className="relative z-10">
        <Topbar
          title="Dashboard"
          subtitle="Your skills and projects."
        />

        <motion.main
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: showIntro ? 0 : 1,
            y: showIntro ? 18 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-1 flex-col gap-7 overflow-auto px-5 py-7 md:px-8 md:py-8"
        >
          {/* =====================================================
              SKILLS
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: showIntro ? 0 : 1,
              y: showIntro ? 12 : 0,
            }}
            transition={{
              duration: 0.45,
              delay: 0.12,
              ease: "easeOut",
            }}
          >
            <Card className="border-white/[0.08] bg-[#131013]">
              <div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Skills
                  </h2>

                  <p className="mt-1 text-sm text-white/35">
                    Your extracted skills and current evaluation.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border border-white/[0.06] bg-[#0f0f11] p-3 md:p-4">
                  <SkillBars />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* =====================================================
              PROJECTS
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: showIntro ? 0 : 1,
              y: showIntro ? 14 : 0,
            }}
            transition={{
              duration: 0.48,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <Card className="border-white/[0.08] bg-[#131013]">
              <div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Projects
                  </h2>

                  <p className="mt-1 text-sm text-white/35">
                    Projects currently included in your profile.
                  </p>
                </div>

                <div className="mt-7">
                  {projects.length === 0 ? (
                    <div className="rounded-xl border border-white/[0.07] bg-[#111113] p-5">
                      <p className="text-sm font-medium text-white/65">
                        No projects added yet.
                      </p>

                      <p className="mt-2 text-sm text-white/35">
                        Add projects to build your technical profile.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-3 md:grid-cols-2">
                      {projects.slice(0, 4).map((project) => {
                        const technologies = project.technologies
                          ? project.technologies
                              .split(",")
                              .map((technology) => technology.trim())
                              .filter(Boolean)
                          : [];

                        return (
                          <motion.div
                            key={project.id}
                            whileHover={{
                              y: -3,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: "easeOut",
                            }}
                            className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#111113] p-5 text-left transition-colors duration-200 hover:border-[#da224b]/25 hover:bg-[#181215]"
                          >
                            {/* Hover light */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                              style={{
                                background:
                                  "radial-gradient(circle, rgba(218,34,75,0.10), transparent 65%)",
                              }}
                            />

                            <div className="relative z-10">
                              <div className="flex items-start justify-between gap-5">
                                <div className="min-w-0">
                                  <p className="text-[15px] font-semibold text-white">
                                    {project.name}
                                  </p>

                                  {project.description && (
                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/38">
                                      {project.description}
                                    </p>
                                  )}
                                </div>

                                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/[0.12] transition-all duration-200 group-hover:bg-[#da224b] group-hover:shadow-[0_0_14px_rgba(218,34,75,0.7)]" />
                              </div>

                              {technologies.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                  {technologies.slice(0, 4).map((technology) => (
                                    <span
                                      key={technology}
                                      className="rounded-md border border-white/[0.06] bg-[#171719] px-2.5 py-1.5 text-[11px] font-medium text-white/48 transition-all duration-200 group-hover:border-[#da224b]/10 group-hover:text-white/60"
                                    >
                                      {technology}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.main>
      </div>

      {/* =====================================================
          ACHILLES DASHBOARD INTRO
      ===================================================== */}
      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: showIntro ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0d]"
        aria-hidden="true"
      >
        <div className="relative flex h-36 w-36 items-center justify-center">
          {/* Outer expanding ring */}
          <motion.div
            initial={{
              scale: 0.55,
              opacity: 0,
            }}
            animate={{
              scale: [0.55, 1, 1.28],
              opacity: [0, 0.65, 0],
            }}
            transition={{
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 rounded-full border border-[#da224b]/60"
          />

          {/* Inner pulse */}
          <motion.div
            initial={{
              scale: 0.75,
              opacity: 0,
            }}
            animate={{
              scale: [0.75, 1, 1.08],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="absolute inset-5 rounded-full bg-[#da224b]/10 blur-xl"
          />

          {/* Logo container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.72,
              clipPath: "inset(0 100% 0 0)",
            }}
            animate={{
              opacity: [0, 1, 1, 0.96],
              scale: [0.72, 1.04, 1],
              clipPath: "inset(0 0% 0 0)",
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-[#da224b]/35 bg-[#151518] shadow-[0_0_60px_rgba(218,34,75,0.12)]"
          >
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                x: 40,
              }}
              transition={{
                duration: 0.55,
                delay: 0.18,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-transparent via-[#da224b]/80 to-transparent blur-sm"
            />

            <motion.img
              src="/achilles-logo.png"
              alt=""
              initial={{
                scale: 0.85,
                filter: "drop-shadow(0 0 0 rgba(218,34,75,0))",
              }}
              animate={{
                scale: [0.85, 1.04, 1],
                filter: [
                  "drop-shadow(0 0 0 rgba(218,34,75,0))",
                  "drop-shadow(0 0 18px rgba(218,34,75,0.8))",
                  "drop-shadow(0 0 5px rgba(218,34,75,0.25))",
                ],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="h-16 w-16 object-contain"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
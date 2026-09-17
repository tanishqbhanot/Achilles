import { useRef, useState, type MouseEvent } from "react";
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
          STATIC AMBIENT DEPTH
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              850px circle at 50% 18%,
              rgba(218, 34, 75, 0.045),
              transparent 68%
            )
          `,
        }}
      />

      {/* =====================================================
          CURSOR LIGHT
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              220px circle at ${pointer.x}% ${pointer.y}%,
              rgba(245, 9, 60, 0.18),
              rgba(218, 34, 75, 0.10) 26%,
              rgba(218, 34, 75, 0.035) 48%,
              transparent 72%
            )
          `,
          transition:
            "background-position 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Small concentrated light at cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#da224b]/[0.06] blur-2xl"
        style={{
          left: `${pointer.x}%`,
          top: `${pointer.y}%`,
          transition:
            "left 180ms cubic-bezier(0.22, 1, 0.36, 1), top 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* =====================================================
          SUBTLE TECHNICAL GRID
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.32) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="relative z-10">
        <Topbar
          title="Dashboard"
          subtitle="Your skills and projects."
        />

        <main className="flex flex-1 flex-col gap-7 overflow-auto px-5 py-7 md:px-8 md:py-8">
          {/* =====================================================
              SKILLS
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.42,
              ease: "easeOut",
            }}
          >
            <Card className="border-white/[0.08] bg-[#151315]">
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
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.42,
              delay: 0.07,
              ease: "easeOut",
            }}
          >
            <Card className="border-white/[0.08] bg-[#151315]">
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
                            {/* Restrained hover light */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#da224b]/[0.045] blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
        </main>
      </div>
    </div>
  );
}
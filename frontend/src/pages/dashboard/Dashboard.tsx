import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/ui/Card";
import Topbar from "../../components/layout/Topbar";
import SkillBars from "../../components/dashboard/SkillBars";

import { useAppStore } from "../../store/appStore";

export default function Dashboard() {
  const navigate = useNavigate();

  const projects = useAppStore((state) => state.projects);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <Topbar
        title="Dashboard"
        subtitle="Your skills and projects."
      />

      <main className="flex flex-1 flex-col gap-7 overflow-auto px-5 py-7 md:px-8 md:py-8">
        {/* =====================================================
            SKILLS
        ===================================================== */}
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
              <div
                className="
                  [&>div]:!grid
                  [&>div]:!grid-cols-1
                  [&>div]:!gap-2.5
                  md:[&>div]:!grid-cols-2
                  
                  [&>div>a]:rounded-xl
                  [&>div>a]:border
                  [&>div>a]:border-white/[0.055]
                  [&>div>a]:bg-[#141416]
                  [&>div>a]:p-4
                  [&>div>a]:transition-all
                  [&>div>a]:duration-200
                  
                  [&>div>a:hover]:border-[#da224b]/20
                  [&>div>a:hover]:bg-[#181215]
                  [&>div>a:hover]:-translate-y-[1px]
                  
                  [&>div>a:focus-visible]:border-[#da224b]/30
                  [&>div>a:focus-visible]:outline-none
                  [&>div>a:focus-visible]:ring-2
                  [&>div>a:focus-visible]:ring-[#da224b]/20
                "
              >
                <SkillBars />
              </div>
            </div>
          </div>
        </Card>

        {/* =====================================================
            PROJECTS
        ===================================================== */}
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
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => navigate("/projects")}
                        className="group rounded-xl border border-white/[0.07] bg-[#111113] p-5 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-[#da224b]/25 hover:bg-[#181215] focus-visible:border-[#da224b]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/20"
                      >
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

                          <ArrowRight
                            size={16}
                            className="mt-0.5 shrink-0 text-white/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#da224b]"
                          />
                        </div>

                        {technologies.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {technologies.slice(0, 4).map((technology) => (
                              <span
                                key={technology}
                                className="rounded-md border border-white/[0.06] bg-[#171719] px-2.5 py-1.5 text-[11px] font-medium text-white/48 transition-colors duration-200 group-hover:border-[#da224b]/10 group-hover:text-white/58"
                              >
                                {technology}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/ui/Button";
import { useAppStore } from "../../store/appStore";

type ProjectForm = {
  name: string;
  github: string;
};

const emptyProject: ProjectForm = {
  name: "",
  github: "",
};

const initialProjects: ProjectForm[] = [
  { ...emptyProject },
  { ...emptyProject },
  { ...emptyProject },
];

const meResponse = await fetch(
  `${import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/auth/me`,
  {
    method: "GET",
    credentials: "include",
  },
);

const meResult = (await meResponse.json()) as {
  success?: boolean;
  user?: {
    id: string;
  };
  message?: string;
};

if (!meResponse.ok || !meResult.user?.id) {
  throw new Error(
    meResult.message ?? "Unable to retrieve user information",
  );
}

const userId = "6aab165845b99ec9c8e77bbf";

export default function ProjectSetup() {
  const navigate = useNavigate();
  const { addProject } = useAppStore();

  const [projects, setProjects] = useState<ProjectForm[]>(
    initialProjects,
  );

  function updateProject(
    index: number,
    key: keyof ProjectForm,
    value: string,
  ) {
    setProjects((current) =>
      current.map((project, projectIndex) =>
        projectIndex === index
          ? {
            ...project,
            [key]: value,
          }
          : project,
      ),
    );
  }

  function handleSaveProjects() {
    projects.forEach((project) => {
      const name = project.name.trim();
      const github = project.github.trim();

      if (!name || !github) return;

      addProject({
        name,
        github,
        description: "",
        technologies: "",
        contribution: "",
      });
    });
  }

  const projectsAdded = projects.filter(
    (project) =>
      project.name.trim() && project.github.trim(),
  ).length;

  async function handleSubmitProjects() {
    const links = projects
      .map((project) => project.github.trim())
      .filter(Boolean);

    // Minimum 1, maximum 3
    if (links.length < 1) {
      return;
    }

    if (links.length > 3) {
      return;
    }

    try {
      const response = await fetch(
        `https://mounted-infrastructure-sacred-hierarchy.trycloudflare.com/${userId}/questions`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            links,
          }),
        },
      );

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      console.log("Project submission result:", result);

      if (!response.ok) {
        throw new Error(
          result.message ?? "Unable to save projects",
        );
      }

      navigate("/assessment");
    } catch (error) {
      console.error("Project submission failed:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-7 md:px-10">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-white/[0.07] pb-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#da224b]/40 bg-[#151518]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-8 w-8 object-contain"
                />
              </div>

              <div>
                <p className="text-[13px] font-semibold tracking-[0.28em] text-[#da224b]">
                  ACHILLES
                </p>

                <p className="mt-1 text-sm text-white/45">
                  Technical onboarding
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-5 sm:flex">
              <span className="text-xs text-white/45">
                Step 3 of 4
              </span>

              <div className="flex gap-1.5">
                <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
                <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
                <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
                <div className="h-1.5 w-8 rounded-full bg-white/[0.10]" />
              </div>
            </div>
          </header>

          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-16 md:pt-20"
          >
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#da224b]">
                  Projects
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
                  Add your{" "}
                  <span className="text-[#da224b]">projects.</span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                  Add up to three projects and their GitHub
                  repositories.
                </p>
              </div>

              <div className="w-fit min-w-[145px] rounded-xl border border-[#da224b]/20 bg-[#171114] px-5 py-4">
                <p className="text-xs text-white/45">
                  Projects added
                </p>

                <p className="mt-1 text-3xl font-semibold text-white">
                  {projectsAdded}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-10"
          >
            <div className="overflow-hidden rounded-2xl border border-[#da224b]/20 bg-[#191114] shadow-[0_20px_55px_rgba(0,0,0,0.22)]">
              <div className="border-b border-[#da224b]/10 px-6 py-5 md:px-7">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#da224b]">
                  Projects
                </p>

                <h2 className="mt-1.5 text-xl font-semibold text-white">
                  Your projects
                </h2>

                <p className="mt-1.5 text-sm text-white/45">
                  Enter a project name and its GitHub repository.
                </p>
              </div>

              <div className="px-6 py-6 md:px-7 md:py-7">
                <div className="flex flex-col gap-5">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/[0.09] bg-[#111113] p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        {/* <p className="text-sm font-medium text-white/80">
                          Project {index + 1}
                        </p> */}

                        {/* <ExternalLink
                          size={15}
                          className="text-white/30"
                        /> */}
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <label>
                          <span className="mb-2 block text-sm font-medium text-white/80">
                            Project name
                          </span>

                          <input
                            type="text"
                            value={project.name}
                            onChange={(e) =>
                              updateProject(
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder="Project name"
                            className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/28 transition-colors duration-200 focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/25"
                          />
                        </label>

                        <label>
                          <span className="mb-2 block text-sm font-medium text-white/80">
                            GitHub repository
                          </span>

                          <input
                            type="url"
                            value={project.github}
                            onChange={(e) =>
                              updateProject(
                                index,
                                "github",
                                e.target.value,
                              )
                            }
                            placeholder="https://github.com/username/repository"
                            className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/28 transition-colors duration-200 focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/25"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-4 border-t border-[#da224b]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/40">
                    Add up to three projects.
                  </p>

                  <Button
                    variant="outline"
                    onClick={handleSaveProjects}
                    disabled={projectsAdded === 0}
                  >
                    Save projects
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Continue */}
          <div className="mt-10 flex justify-end border-t border-white/[0.07] py-6">
            <Button
              onClick={() => {
                handleSubmitProjects();
                navigate("/assessment");
              }}
              className="group"
            >
              Continue to Assessment

              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </div>

          {/* Progress */}
          <div className="mt-auto flex justify-center gap-2 pb-2 pt-5">
            <div className="h-1 w-10 rounded-full bg-[#da224b]" />
            <div className="h-1 w-10 rounded-full bg-[#da224b]" />
            <div className="h-1 w-10 rounded-full bg-[#da224b]" />
            <div className="h-1 w-10 rounded-full bg-white/[0.10]" />
          </div>
        </div>
      </div>
    </div>
  );
}
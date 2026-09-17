import { useState } from "react";
import { ExternalLink, Plus } from "lucide-react";
import {  motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Topbar from "../../components/layout/Topbar";
import { useAppStore } from "../../store/appStore";

const MAX_PROJECTS = 3;

type ProjectForm = {
  name: string;
  github: string;
};

const emptyForm: ProjectForm = {
  name: "",
  github: "",
};

function normalizeGithubUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function isValidGithubUrl(value: string) {
  try {
    const url = new URL(normalizeGithubUrl(value));

    return (
      url.protocol === "https:" &&
      (url.hostname === "github.com" ||
        url.hostname === "www.github.com") &&
      url.pathname.split("/").filter(Boolean).length >= 2
    );
  } catch {
    return false;
  }
}

export default function ProjectSetup() {
  const navigate = useNavigate();

  const {
    projects,
    addProject,
    removeProject,
  } = useAppStore();

  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const projectLimitReached =
    projects.length >= MAX_PROJECTS;

  function updateField(
    field: keyof ProjectForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleAddProject() {
    if (projectLimitReached) {
      return;
    }

    const name = form.name.trim();
    const github = form.github.trim();

    if (!name) {
      setError("Enter a project name.");
      return;
    }

    if (!github) {
      setError("Enter the GitHub repository URL.");
      return;
    }

    if (!isValidGithubUrl(github)) {
      setError(
        "Enter a valid GitHub repository URL.",
      );
      return;
    }

    const normalizedGithub =
      normalizeGithubUrl(github);

    const alreadyAdded = projects.some(
      (project) =>
        project.github.toLowerCase() ===
        normalizedGithub.toLowerCase(),
    );

    if (alreadyAdded) {
      setError(
        "This repository has already been added.",
      );
      return;
    }

    addProject({
      name,
      description: "",
      technologies: "",
      github: normalizedGithub,
      contribution: "",
    });

    setForm(emptyForm);
    setError("");
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <Topbar
        title="Projects"
        subtitle=""
      />

      <main className="mx-auto w-full max-w-6xl px-5 py-7 md:px-8 md:py-8">
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
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* =====================================================
              PROJECTS
          ===================================================== */}

          <section className="grid gap-4 md:grid-cols-2">
            {Array.from({
              length: MAX_PROJECTS,
            }).map((_, index) => {
              const project = projects[index];

              return (
                <motion.section
                  key={project?.id ?? `project-slot-${index}`}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden rounded-2xl border border-[#da224b]/20 bg-[#191114] transition-colors duration-200 hover:border-[#da224b]/30"
                >
                  {/* Card header */}

                  <div className="flex items-start justify-between border-b border-[#da224b]/10 px-5 py-5">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#da224b]/75">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2 className="mt-1.5 text-base font-semibold text-white">
                        {project
                          ? project.name
                          : "Add a project"}
                      </h2>
                    </div>

                    <span className="h-1.5 w-1.5 rounded-full bg-[#da224b]/70" />
                  </div>

                  <div className="px-5 py-5">
                    {project ? (
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-xs uppercase tracking-[0.14em] text-white/25">
                              GitHub repository
                            </p>

                            <p className="mt-2 truncate text-sm text-white/55">
                              {project.github}
                            </p>
                          </div>

                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.name} GitHub repository`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#da224b]/15 bg-[#201519] text-white/45 transition-all duration-200 hover:border-[#da224b]/40 hover:text-[#da224b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/60"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-[#da224b]/10 pt-4">
                          <p className="text-xs text-white/30">
                            Repository connected
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              removeProject(
                                project.id,
                              )
                            }
                            className="text-xs font-medium text-white/30 transition-colors hover:text-[#da224b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block">
                          <span className="mb-2 block text-sm font-medium text-white/75">
                            Project name
                            <span className="ml-1 text-[#da224b]">
                              *
                            </span>
                          </span>

                          <input
                            type="text"
                            value={
                              index === projects.length
                                ? form.name
                                : ""
                            }
                            disabled={
                              index !== projects.length
                            }
                            onChange={(event) =>
                              index === projects.length &&
                              updateField(
                                "name",
                                event.target.value,
                              )
                            }
                            placeholder="e.g. SpendWise"
                            className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/20 disabled:cursor-not-allowed disabled:opacity-40"
                          />
                        </label>

                        <label className="mt-5 block">
                          <span className="mb-2 block text-sm font-medium text-white/75">
                            GitHub repository
                            <span className="ml-1 text-[#da224b]">
                              *
                            </span>
                          </span>

                          <input
                            type="url"
                            value={
                              index === projects.length
                                ? form.github
                                : ""
                            }
                            disabled={
                              index !== projects.length
                            }
                            onChange={(event) =>
                              index === projects.length &&
                              updateField(
                                "github",
                                event.target.value,
                              )
                            }
                            placeholder="https://github.com/username/repository"
                            className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/20 disabled:cursor-not-allowed disabled:opacity-40"
                          />
                        </label>

                        {index === projects.length && (
                          <>
                            {error && (
                              <motion.p
                                initial={{
                                  opacity: 0,
                                  y: -4,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                className="mt-4 text-sm text-[#da224b]"
                              >
                                {error}
                              </motion.p>
                            )}

                            <div className="mt-6 border-t border-[#da224b]/10 pt-5">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    "/projects/manual",
                                  )
                                }
                                className="text-sm font-medium text-white/40 transition-colors hover:text-[#da224b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/50"
                              >
                                I don't have a GitHub repository
                              </button>

                              <Button
                                type="button"
                                onClick={
                                  handleAddProject
                                }
                                disabled={
                                  !form.name.trim() ||
                                  !form.github.trim()
                                }
                                className="mt-4 w-full"
                              >
                                {saved
                                  ? "Project added"
                                  : "Add project"}

                                {!saved && (
                                  <Plus
                                    size={16}
                                    className="ml-2"
                                  />
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </motion.section>
              );
            })}
          </section>

          {/* =====================================================
              FULL STATE
          ===================================================== */}

          {projectLimitReached && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="mt-5 rounded-2xl border border-[#da224b]/15 bg-[#151013] px-5 py-4"
            >
              <p className="text-sm text-white/55">
                All three project slots are filled.
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
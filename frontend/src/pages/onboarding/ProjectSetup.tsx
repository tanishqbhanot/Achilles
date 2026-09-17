import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../components/ui/Button";
import { useAppStore } from "../../store/appStore";

const empty = {
  name: "",
  description: "",
  technologies: "",
  github: "",
  contribution: "",
};

const fields = [
  {
    key: "name",
    label: "Project name",
    placeholder: "e.g. SpendWise",
    type: "input",
  },
  {
    key: "description",
    label: "Description",
    placeholder: "Describe what the project does",
    type: "textarea",
  },
  {
    key: "technologies",
    label: "Technologies",
    placeholder: "React, Node.js, MongoDB",
    type: "input",
  },
  {
    key: "github",
    label: "GitHub URL",
    placeholder: "https://github.com/username/project",
    type: "input",
  },
  {
    key: "contribution",
    label: "Your contribution",
    placeholder: "Describe what you personally built or owned",
    type: "textarea",
  },
] as const;

export default function ProjectSetup() {
  const navigate = useNavigate();
  const { projects, addProject } = useAppStore();

  const [form, setForm] = useState(empty);
  const [saved, setSaved] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  function updateField(key: keyof typeof empty, value: string) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSaveProject() {
    const name = form.name.trim();

    if (!name) return;

    addProject({
      name,
      description: form.description.trim(),
      technologies: form.technologies.trim(),
      github: form.github.trim(),
      contribution: form.contribution.trim(),
    });

    setForm(empty);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2200);
  }

  function handleContinue() {
    if (isNavigating) return;

    setIsNavigating(true);

    window.setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  }

  return (
    <>
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
                  Tell us what{" "}
                  <span className="text-[#da224b]">you built.</span>
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                  Add the projects that best represent your technical
                  experience. These projects will help personalize your
                  assessment.
                </p>
              </div>

              <div className="w-fit min-w-[145px] rounded-xl border border-[#da224b]/20 bg-[#171114] px-5 py-4">
                <p className="text-xs text-white/45">
                  Projects added
                </p>

                <p className="mt-1 text-3xl font-semibold text-white">
                  {projects.length}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Existing projects */}
          <AnimatePresence>
            {projects.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-12"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
                      Saved projects
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-white">
                      Your work
                    </h2>
                  </div>

                  <span className="text-xs text-white/40">
                    {projects.length}{" "}
                    {projects.length === 1 ? "project" : "projects"}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {projects.map((project, index) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                      className="rounded-2xl border border-[#da224b]/20 bg-[#191114] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:border-[#da224b]/30"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold text-white">
                            {project.name}
                          </h3>

                          {project.description && (
                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/52">
                              {project.description}
                            </p>
                          )}
                        </div>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.name} GitHub repository`}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#da224b]/15 bg-[#201519] text-white/45 transition-colors hover:border-[#da224b]/40 hover:text-[#da224b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/60"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>

                      {project.technologies && (
                        <div className="mt-5 flex flex-wrap gap-2 border-t border-[#da224b]/10 pt-4">
                          {project.technologies
                            .split(",")
                            .map((technology) => technology.trim())
                            .filter(Boolean)
                            .map((technology) => (
                              <span
                                key={technology}
                                className="rounded-md border border-[#da224b]/10 bg-[#21171a] px-2.5 py-1.5 text-xs text-white/70"
                              >
                                {technology}
                              </span>
                            ))}
                        </div>
                      )}

                      {project.contribution && (
                        <div className="mt-4">
                          <p className="text-xs font-medium text-white/70">
                            Your contribution
                          </p>

                          <p className="mt-1.5 text-sm leading-6 text-white/48">
                            {project.contribution}
                          </p>
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Add project */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-10"
          >
            <div className="overflow-hidden rounded-2xl border border-[#da224b]/20 bg-[#191114] shadow-[0_20px_55px_rgba(0,0,0,0.22)]">
              <div className="border-b border-[#da224b]/10 px-6 py-5 md:px-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#da224b]">
                      New project
                    </p>

                    <h2 className="mt-1.5 text-xl font-semibold text-white">
                      Add a project
                    </h2>

                    <p className="mt-1.5 text-sm text-white/45">
                      Enter the details below.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-6 md:px-7 md:py-7">
                <div className="grid gap-5 md:grid-cols-2">
                  {fields.map((field) => {
                    const isWide =
                      field.key === "description" ||
                      field.key === "contribution";

                    const value = form[field.key];

                    return (
                      <label
                        key={field.key}
                        className={isWide ? "md:col-span-2" : ""}
                      >
                        <span className="mb-2 block text-sm font-medium text-white/80">
                          {field.label}

                          {field.key === "name" && (
                            <span className="ml-1 text-[#da224b]">
                              *
                            </span>
                          )}
                        </span>

                        {field.type === "textarea" ? (
                          <textarea
                            value={value}
                            onChange={(e) =>
                              updateField(field.key, e.target.value)
                            }
                            placeholder={field.placeholder}
                            rows={4}
                            className="w-full resize-none rounded-xl border border-white/[0.09] bg-[#111113] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/28 transition-colors duration-200 focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/25"
                          />
                        ) : (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              updateField(field.key, e.target.value)
                            }
                            placeholder={field.placeholder}
                            className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/28 transition-colors duration-200 focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/25"
                          />
                        )}
                      </label>
                    );
                  })}
                </div>

                <div className="mt-7 flex flex-col gap-4 border-t border-[#da224b]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-white/40">
                    You can add multiple projects.
                  </p>

                  <Button
                    variant="outline"
                    onClick={handleSaveProject}
                    className="group"
                    disabled={!form.name.trim()}
                  >
                    {saved ? "Project saved" : "Save project"}

                    {!saved && (
                      <Plus
                        size={16}
                        className="ml-2 transition-transform duration-200 group-hover:rotate-90"
                      />
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {saved && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 text-sm text-[#da224b]"
                    >
                      Project added successfully.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>

          {/* Continue */}
          <div className="mt-10 flex justify-end border-t border-white/[0.07] py-6">
            <Button
              onClick={handleContinue}
              disabled={isNavigating}
              className="group"
            >
              Continue to Dashboard

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

      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#0b0b0d]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
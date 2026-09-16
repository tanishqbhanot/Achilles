import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../components/ui/Button";
import { useAppStore } from "../../store/appStore";

const groups = [
  {
    key: "languages",
    label: "Languages",
    description: "Programming languages detected from your resume",
  },
  {
    key: "frameworks",
    label: "Frameworks",
    description: "Libraries and frameworks detected",
  },
  {
    key: "databases",
    label: "Databases",
    description: "Database technologies detected",
  },
  {
    key: "cloud",
    label: "Cloud",
    description: "Cloud and infrastructure technologies",
  },
] as const;

export default function SkillReview() {
  const navigate = useNavigate();
  const { skillsByGroup, addSkill, removeSkill } = useAppStore();

  const [draft, setDraft] = useState<Record<string, string>>({});

  const totalSkills = groups.reduce(
    (total, group) => total + (skillsByGroup[group.key] ?? []).length,
    0
  );

  function handleAddSkill(groupKey: string) {
    const value = (draft[groupKey] ?? "").trim();

    if (!value) return;

    addSkill(groupKey, value);

    setDraft((current) => ({
      ...current,
      [groupKey]: "",
    }));
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
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
              Step 2 of 4
            </span>

            <div className="flex gap-1.5">
              <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
              <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
              <div className="h-1.5 w-8 rounded-full bg-white/[0.10]" />
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
                Skills
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
                Your technical{" "}
                <span className="text-[#da224b]">fingerprint.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
                Review the technologies extracted from your resume. Remove
                anything inaccurate or add skills that should be considered.
              </p>
            </div>

            <div className="w-fit min-w-[145px] rounded-xl border border-[#da224b]/20 bg-[#171114] px-5 py-4">
              <p className="text-xs text-white/45">
                Skills detected
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-white">
                  {totalSkills}
                </span>

                <span className="text-xs text-white/40">
                  technologies
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skill groups */}
        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {groups.map((group, index) => {
            const skills = skillsByGroup[group.key] ?? [];

            return (
              <motion.section
                key={group.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.06,
                }}
                className="overflow-hidden rounded-2xl border border-[#da224b]/20 bg-[#191114] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-colors duration-200 hover:border-[#da224b]/30"
              >
                {/* Heading */}
                <div className="flex items-start justify-between border-b border-[#da224b]/10 px-5 py-5">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {group.label}
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-white/48">
                      {group.description}
                    </p>
                  </div>

                  <span className="rounded-md border border-[#da224b]/15 bg-[#201519] px-2.5 py-1 text-xs text-white/50">
                    {skills.length}
                  </span>
                </div>

                {/* Content */}
                <div className="px-5 py-5">
                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {skills.map((skill) => (
                          <motion.button
                            key={skill}
                            type="button"
                            layout
                            initial={{
                              opacity: 0,
                              scale: 0.95,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.95,
                            }}
                            whileHover={{
                              backgroundColor: "rgba(218,34,75,0.12)",
                              borderColor: "rgba(218,34,75,0.45)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                              removeSkill(group.key, skill)
                            }
                            className="rounded-lg border border-white/[0.10] bg-[#24191d] px-3.5 py-2.5 text-sm font-medium text-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/60"
                            aria-label={`Remove ${skill}`}
                          >
                            {skill}
                          </motion.button>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#da224b]/15 bg-[#120e10] px-4 py-6 text-center">
                      <p className="text-sm text-white/40">
                        No skills added yet.
                      </p>
                    </div>
                  )}

                  {/* Add skill */}
                  <form
                    className="mt-5 flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddSkill(group.key);
                    }}
                  >
                    <input
                      value={draft[group.key] ?? ""}
                      onChange={(e) =>
                        setDraft((current) => ({
                          ...current,
                          [group.key]: e.target.value,
                        }))
                      }
                      placeholder={`Add ${group.label.toLowerCase()}`}
                      className="h-11 min-w-0 flex-1 rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/30 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/25"
                      aria-label={`Add ${group.label.toLowerCase()}`}
                    />

                    <button
                      type="submit"
                      aria-label={`Add ${group.label.toLowerCase()}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#da224b]/20 bg-[#201519] text-white/60 transition-colors hover:border-[#da224b]/45 hover:text-[#da224b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/60"
                    >
                      <Plus size={17} />
                    </button>
                  </form>
                </div>
              </motion.section>
            );
          })}
        </section>

        {/* Continue */}
        <div className="mt-10 flex justify-end border-t border-white/[0.07] py-6">
          <Button
            onClick={() => navigate("/onboarding/projects")}
            className="group"
          >
            Continue to Projects

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
          <div className="h-1 w-10 rounded-full bg-white/[0.10]" />
          <div className="h-1 w-10 rounded-full bg-white/[0.10]" />
        </div>
      </div>
    </div>
  );
}
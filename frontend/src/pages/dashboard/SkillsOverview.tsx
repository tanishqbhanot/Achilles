import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Topbar from "../../components/layout/Topbar";
import { useAppStore } from "../../store/appStore";

const groups = [
  {
    key: "languages",
    label: "Languages",
    description: "Programming languages",
  },
  {
    key: "frameworks",
    label: "Frameworks",
    description: "Libraries and frameworks",
  },
  {
    key: "databases",
    label: "Databases",
    description: "Database technologies",
  },
  {
    key: "cloud",
    label: "Cloud",
    description: "Cloud and infrastructure",
  },
] as const;

export default function SkillsOverview() {
  const { skillsByGroup, addSkill, removeSkill } =
    useAppStore();

  const [draft, setDraft] =
    useState<Record<string, string>>({});

  function handleAddSkill(groupKey: string) {
    const value =
      (draft[groupKey] ?? "").trim();

    if (!value) {
      return;
    }

    addSkill(groupKey, value);

    setDraft((current) => ({
      ...current,
      [groupKey]: "",
    }));
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <Topbar title="Technical Skills" />

      <main className="mx-auto w-full max-w-6xl px-5 py-7 md:px-8 md:py-8">
        <motion.section
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
          className="grid gap-4 md:grid-cols-2"
        >
          {groups.map((group, index) => {
            const skills =
              skillsByGroup[group.key] ?? [];

            return (
              <motion.section
                key={group.key}
                initial={{
                  opacity: 0,
                  y: 14,
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
                <div className="flex items-start justify-between border-b border-[#da224b]/10 px-5 py-5">
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {group.label}
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-white/45">
                      {group.description}
                    </p>
                  </div>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#da224b]/70" />
                </div>

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
                              backgroundColor:
                                "rgba(218,34,75,0.12)",
                              borderColor:
                                "rgba(218,34,75,0.45)",
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={() =>
                              removeSkill(
                                group.key,
                                skill,
                              )
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
                    <div className="rounded-xl border border-dashed border-white/[0.08] bg-[#120e10] px-4 py-6 text-center">
                      <p className="text-sm text-white/40">
                        No skills added yet.
                      </p>
                    </div>
                  )}

                  <form
                    className="mt-6"
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleAddSkill(group.key);
                    }}
                  >
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-white/70">
                        Add skill
                      </span>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={
                            draft[group.key] ?? ""
                          }
                          onChange={(event) =>
                            setDraft((current) => ({
                              ...current,
                              [group.key]:
                                event.target.value,
                            }))
                          }
                          placeholder={`Add ${group.label.toLowerCase()}...`}
                          className="h-12 min-w-0 flex-1 rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/30 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/25"
                          aria-label={`Add ${group.label.toLowerCase()}`}
                        />

                        <button
                          type="submit"
                          aria-label={`Add ${group.label.toLowerCase()}`}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#da224b] text-white transition-all duration-200 hover:bg-[#e52a55] hover:shadow-[0_8px_24px_rgba(218,34,75,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/60"
                        >
                          <Plus size={19} />
                        </button>
                      </div>
                    </label>
                  </form>
                </div>
              </motion.section>
            );
          })}
        </motion.section>
      </main>
    </div>
  );
}
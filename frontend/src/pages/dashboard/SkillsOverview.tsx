import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Topbar from "../../components/layout/Topbar";

import { useAppStore } from "../../store/appStore";

const groups = [
  {
    key: "languages",
    label: "Languages",
    description:
      "Programming languages detected from your resume",
  },
  {
    key: "frameworks",
    label: "Frameworks",
    description:
      "Libraries and frameworks detected from your resume",
  },
  {
    key: "databases",
    label: "Databases",
    description:
      "Database technologies detected from your resume",
  },
  {
    key: "cloud",
    label: "Cloud",
    description:
      "Cloud and infrastructure technologies detected",
  },
] as const;

export default function SkillsOverview() {
  const navigate = useNavigate();

  const {
    skillsByGroup,
    addSkill,
    removeSkill,
  } = useAppStore();

  const [newSkillByGroup, setNewSkillByGroup] =
    useState<Record<string, string>>({});

  const totalSkills = Object.values(
    skillsByGroup
  ).reduce(
    (total, skills) =>
      total + skills.length,
    0
  );

  function handleAddSkill(
    group: string
  ) {
    const value =
      newSkillByGroup[group]?.trim();

    if (!value) {
      return;
    }

    addSkill(group, value);

    setNewSkillByGroup((current) => ({
      ...current,
      [group]: "",
    }));
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    group: string
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddSkill(group);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">

      {/* =====================================================
          TOPBAR
      ===================================================== */}

      <Topbar
        title="Skills"
        subtitle="Review and edit the skills extracted from your resume."
      />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto w-full max-w-6xl px-5 py-7 md:px-8 md:py-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-sm font-medium text-[#da224b]">
              Extracted skills
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Your technical skills
            </h1>

            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/40">
              These skills were extracted from your resume.
              Add anything that is missing or remove anything
              that does not belong to your profile.
            </p>

          </div>

          <div className="rounded-xl border border-[#da224b]/20 bg-[#191114] px-5 py-4">

            <p className="text-sm text-white/40">
              Skills in profile
            </p>

            <p className="mt-1 text-2xl font-semibold text-white">
              {totalSkills}
            </p>

          </div>

        </section>

        {/* =================================================
            SKILL GROUPS
        ================================================= */}

        <div className="grid gap-5 lg:grid-cols-2">

          {groups.map((group) => {
            const skills =
              skillsByGroup[group.key] ??
              [];

            return (
              <section
                key={group.key}
                className="rounded-2xl border border-[#da224b]/20 bg-[#191114] p-5 md:p-6"
              >

                {/* GROUP HEADER */}

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    {group.label}
                  </h2>

                  <p className="mt-1.5 text-sm leading-6 text-white/35">
                    {group.description}
                  </p>

                </div>

                {/* SKILLS */}

                <div className="mt-6 flex min-h-[52px] flex-wrap gap-2.5">

                  {skills.length === 0 ? (

                    <p className="text-sm text-white/30">
                      No skills added yet.
                    </p>

                  ) : (

                    skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          removeSkill(
                            group.key,
                            skill
                          )
                        }
                        className="rounded-lg border border-[#da224b]/15 bg-[#24191d] px-3.5 py-2 text-sm font-medium text-white/80 transition-all duration-150 hover:border-[#da224b]/40 hover:bg-[#2b1b20] hover:text-white"
                        title="Click to remove this skill"
                      >
                        {skill}
                      </button>
                    ))

                  )}

                </div>

                {/* ADD SKILL */}

                <div className="mt-6 border-t border-white/[0.07] pt-5">

                  <label
                    htmlFor={`skill-${group.key}`}
                    className="text-sm font-medium text-white/55"
                  >
                    Add skill
                  </label>

                  <div className="mt-2 flex gap-2">

                    <input
                      id={`skill-${group.key}`}
                      value={
                        newSkillByGroup[
                          group.key
                        ] ?? ""
                      }
                      onChange={(event) =>
                        setNewSkillByGroup(
                          (current) => ({
                            ...current,
                            [group.key]:
                              event.target.value,
                          })
                        )
                      }
                      onKeyDown={(event) =>
                        handleKeyDown(
                          event,
                          group.key
                        )
                      }
                      placeholder={`Add a ${group.label.toLowerCase().slice(0, -1)}...`}
                      className="min-w-0 flex-1 rounded-xl border border-white/[0.10] bg-[#111113] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/50 focus:ring-1 focus:ring-[#da224b]/15"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleAddSkill(
                          group.key
                        )
                      }
                      aria-label={`Add skill to ${group.label}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#da224b] text-white transition-colors hover:bg-[#ef3159] focus:outline-none focus:ring-2 focus:ring-[#da224b]/30"
                    >
                      <Plus
                        size={18}
                        strokeWidth={2}
                      />
                    </button>

                  </div>

                </div>

              </section>
            );
          })}

        </div>

        {/* =================================================
            DONE / BACK TO DASHBOARD
        ================================================= */}

        <div className="mt-7 flex justify-end">

          <Button
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Back to Dashboard

            <ArrowRight
              size={16}
              className="ml-2"
            />

          </Button>

        </div>

      </main>
    </div>
  );
}
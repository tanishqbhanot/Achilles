import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const availableSkills = [
  "React",
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "SQL",
  "C++",
  "C",
  "C#",
  "Go",
  "AWS",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Git",
  "HTML",
  "CSS",
  "Next.js",
  "Express.js",
  "Spring Boot",
  "Django",
  "Flask",
  "Angular",
  "Vue.js",
  "Kotlin",
  "Swift",
  "Rust",
  "PHP",
  "Redis",
];

export default function CompanyCandidatePreferences() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return availableSkills;
    }

    return availableSkills.filter((skill) =>
      skill.toLowerCase().includes(query),
    );
  }, [search]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) => {
      if (current.includes(skill)) {
        return current.filter((item) => item !== skill);
      }

      return [...current, skill];
    });
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((current) =>
      current.filter((item) => item !== skill),
    );
  };

  const addCustomSkill = () => {
    const skill = search.trim();

    if (!skill) {
      return;
    }

    const exists = selectedSkills.some(
      (item) => item.toLowerCase() === skill.toLowerCase(),
    );

    if (!exists) {
      setSelectedSkills((current) => [...current, skill]);
    }

    setSearch("");
  };

  const handleContinue = () => {
    navigate("/company/subscription", {
      state: {
        skills: selectedSkills,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="relative min-h-screen overflow-hidden">
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-56 top-[-12%] h-[650px] w-[650px] rounded-full bg-[#da224b]/[0.065] blur-[180px]" />

          <div className="absolute -right-52 bottom-[-15%] h-[650px] w-[650px] rounded-full bg-[#da224b]/[0.045] blur-[180px]" />

          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(224,224,224,0.8) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(224,224,224,0.8) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "52px 52px",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(11,11,13,0.88)_100%)]" />
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="relative z-10 border-b border-white/[0.07]">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#da224b]/30 bg-[#171114]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-8 w-8 object-contain"
                />
              </div>

              <p className="text-[12px] font-semibold tracking-[0.28em] text-[#da224b]">
                ACHILLES
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                COMPANY SETUP
              </p>

              <p className="mt-1 text-xs text-white/45">
                Candidate requirements
              </p>
            </div>
          </div>
        </header>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col px-6 py-12 lg:px-8 lg:py-16">
          {/* Intro */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#da224b]">
              DEFINE YOUR SEARCH
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.65rem]">
              What skills are you
              <br />
              <span className="text-[#da224b]">
                hiring for?
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
              Select the technical skills you want in your candidates.
              Achilles will use these requirements to identify candidates
              based on their demonstrated assessment performance.
            </p>
          </motion.div>

          {/* =================================================
              SKILL SELECTION
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10"
          >
            <Card className="border-white/[0.08] bg-[#131013] p-6 sm:p-7 lg:p-8">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Technical skills
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-white/35">
                  Choose all the skills that matter for the role.
                </p>
              </div>

              {/* Search */}

              <div className="relative mt-7">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addCustomSkill();
                    }
                  }}
                  placeholder="Search for a skill"
                  className="w-full rounded-xl border border-white/[0.09] bg-[#0f0f11] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25 hover:border-white/[0.15] focus:border-[#da224b]/60 focus:bg-[#111113] focus:ring-4 focus:ring-[#da224b]/10"
                />
              </div>

              {/* Selected Skills */}

              {selectedSkills.length > 0 && (
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                      Selected skills
                    </p>

                    <span className="text-xs text-white/25">
                      {selectedSkills.length} selected
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="group inline-flex items-center gap-2 rounded-lg border border-[#da224b]/30 bg-[#241519] px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-[#da224b]/55"
                      >
                        {skill}

                        <X
                          size={14}
                          className="text-white/35 transition-colors group-hover:text-[#da224b]"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Skills */}

              <div className="mt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                  Browse skills
                </p>

                <div className="mt-3 flex flex-wrap gap-2.5">
                  {filteredSkills.map((skill) => {
                    const isSelected =
                      selectedSkills.includes(skill);

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`rounded-lg border px-3.5 py-2.5 text-sm transition-all duration-200 ${
                          isSelected
                            ? "border-[#da224b]/45 bg-[#241519] text-white"
                            : "border-white/[0.08] bg-[#111113] text-white/50 hover:border-white/[0.16] hover:bg-[#171114] hover:text-white/80"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}

                  {filteredSkills.length === 0 &&
                    search.trim() && (
                      <div className="w-full rounded-xl border border-white/[0.07] bg-[#111113] p-5">
                        <p className="text-sm text-white/40">
                          No matching skill found.
                        </p>

                        <button
                          type="button"
                          onClick={addCustomSkill}
                          className="mt-3 text-sm font-medium text-[#da224b] transition-colors hover:text-[#ed315c]"
                        >
                          Add "{search.trim()}"
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* =================================================
              BOTTOM ACTION
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.25,
            }}
            className="mt-8 flex justify-end"
          >
            <Button
              type="button"
              onClick={handleContinue}
              disabled={selectedSkills.length === 0}
              className="group flex min-w-[220px] items-center justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span>Continue</span>

              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
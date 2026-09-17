import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

type CompanyPlan = "basic" | "plus" | "pro";

type CompanyProfileLocationState = {
  skills?: string[];
  plan?: CompanyPlan;
  companyName?: string;
};

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
];

export default function CompanyProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState =
    (location.state as CompanyProfileLocationState | null) ?? null;

  const initialSkills =
    locationState?.skills && locationState.skills.length > 0
      ? locationState.skills
      : ["React", "Python"];

  const initialPlan = locationState?.plan ?? "plus";

  const [selectedSkills, setSelectedSkills] =
    useState<string[]>(initialSkills);

  const [search, setSearch] = useState("");

  const [saved, setSaved] = useState(false);

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase();

    return availableSkills.filter((skill) => {
      if (selectedSkills.includes(skill)) {
        return false;
      }

      if (!query) {
        return true;
      }

      return skill.toLowerCase().includes(query);
    });
  }, [search, selectedSkills]);

  function addSkill(skill: string) {
    if (selectedSkills.includes(skill)) {
      return;
    }

    setSelectedSkills((current) => [...current, skill]);
    setSaved(false);
  }

  function removeSkill(skill: string) {
    setSelectedSkills((current) =>
      current.filter((item) => item !== skill),
    );
    setSaved(false);
  }

  function saveRequirements() {
    setSaved(true);

    navigate("/company/dashboard", {
      replace: true,
      state: {
        skills: selectedSkills,
        plan: initialPlan,
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#0b0b0d]/95 backdrop-blur-xl">
        <div className="flex min-h-[82px] items-center px-5 md:px-8">
          <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#da224b]">
            COMPANY PROFILE
          </p>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* PAGE TITLE */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Candidate Requirements
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
              Update the technical skills you want candidates to match
              against.
            </p>
          </div>

          {/* =================================================
              REQUIREMENTS CARD
          ================================================= */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#131013] p-6 md:p-8">
            {/* SELECTED SKILLS */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                    Required Skills
                  </p>

                  <p className="mt-2 text-sm text-white/45">
                    These skills are used when finding matching candidates.
                  </p>
                </div>

                <span className="font-mono text-xs text-white/25">
                  {selectedSkills.length}
                </span>
              </div>

              <div className="mt-5 min-h-[64px] rounded-xl border border-white/[0.07] bg-[#111113] p-3">
                {selectedSkills.length === 0 ? (
                  <div className="flex min-h-[38px] items-center px-2">
                    <p className="text-sm text-white/25">
                      No technical requirements selected.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <motion.button
                        key={skill}
                        type="button"
                        layout
                        onClick={() => removeSkill(skill)}
                        className="group inline-flex items-center gap-2 rounded-lg border border-[#da224b]/20 bg-[#1b1215] px-3 py-2 text-xs font-medium text-white/70 transition-colors duration-200 hover:border-[#da224b]/40 hover:bg-[#211316] hover:text-white"
                      >
                        {skill}

                        <X
                          size={13}
                          strokeWidth={1.8}
                          className="text-[#da224b]/70 transition-colors group-hover:text-[#da224b]"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-8 border-t border-white/[0.07]" />

            {/* SEARCH */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                Add Skills
              </p>

              <div className="relative mt-4">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search technical skills"
                  className="w-full rounded-xl border border-white/[0.09] bg-[#111113] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/45 focus:ring-4 focus:ring-[#da224b]/10"
                />
              </div>

              {/* AVAILABLE SKILLS */}
              <div className="mt-4 flex max-h-[300px] flex-wrap gap-2 overflow-y-auto pr-1">
                {filteredSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="rounded-lg border border-white/[0.08] bg-[#111113] px-3 py-2 text-xs font-medium text-white/45 transition-all duration-200 hover:border-[#da224b]/30 hover:bg-[#171114] hover:text-white/75"
                  >
                    {skill}
                  </button>
                ))}

                {filteredSkills.length === 0 && (
                  <p className="px-1 py-3 text-sm text-white/25">
                    No additional skills found.
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                SAVE
            ================================================= */}
            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
              <div>
                {saved ? (
                  <p className="text-sm text-white/45">
                    Requirements updated.
                  </p>
                ) : (
                  <p className="text-sm text-white/25">
                    Changes will update your candidate matching.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={saveRequirements}
                disabled={selectedSkills.length === 0}
                className="rounded-xl bg-[#da224b] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#c91d43] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Save Requirements
              </button>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
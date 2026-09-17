import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Search, X } from "lucide-react";

import CompanySidebar from "./CompanySidebar";

type CompanyPlan = "basic" | "plus" | "pro";

type PreferencesLocationState = {
  skills?: string[];
  plan?: CompanyPlan;
  companyName?: string;
  mode?: "setup" | "update";
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

export default function CompanyCandidatePreferences() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState =
    (location.state as PreferencesLocationState | null) ??
    null;

  const isUpdateMode =
    locationState?.mode === "update";

  const initialSkills =
    locationState?.skills &&
    locationState.skills.length > 0
      ? locationState.skills
      : ["React", "Python"];

  const initialPlan =
    locationState?.plan ?? "plus";

  const companyName =
    locationState?.companyName ?? "";

  const [selectedSkills, setSelectedSkills] =
    useState<string[]>(initialSkills);

  const [search, setSearch] = useState("");

  const [isSaving, setIsSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const filteredSkills = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return availableSkills.filter(
      (skill) => {
        if (selectedSkills.includes(skill)) {
          return false;
        }

        if (!query) {
          return true;
        }

        return skill
          .toLowerCase()
          .includes(query);
      },
    );
  }, [search, selectedSkills]);

  function addSkill(skill: string) {
    if (selectedSkills.includes(skill)) {
      return;
    }

    setSelectedSkills((current) => [
      ...current,
      skill,
    ]);

    setSaved(false);
  }

  function removeSkill(skill: string) {
    setSelectedSkills((current) =>
      current.filter(
        (item) => item !== skill,
      ),
    );

    setSaved(false);
  }

  function handleContinue() {
    if (selectedSkills.length === 0) {
      return;
    }

    setIsSaving(true);

    window.setTimeout(() => {
      navigate("/company/subscription", {
        state: {
          skills: selectedSkills,
          companyName,
          plan: initialPlan,
        },
      });
    }, 450);
  }

  function handleUpdate() {
    if (selectedSkills.length === 0) {
      return;
    }

    setIsSaving(true);

    window.setTimeout(() => {
      setSaved(true);
      setIsSaving(false);

      navigate("/company/dashboard", {
        replace: true,
        state: {
          skills: selectedSkills,
          plan: initialPlan,
          companyName,
        },
      });
    }, 450);
  }

  const content = (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#0b0b0d]/95 backdrop-blur-xl">
        <div className="flex min-h-[82px] items-center px-5 md:px-8">
          <p className="text-[14px] font-bold uppercase tracking-[0.2em]">
            <span className="text-white">
              Technical Skills
            </span>{" "}
            <span className="text-[#da224b]">
              Required
            </span>
          </p>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="mx-auto w-full max-w-[1000px] px-5 py-10 md:px-8 md:py-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 8,
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
          <div className="rounded-2xl border border-white/[0.08] bg-[#131013] p-6 md:p-8">
            {/* =================================================
                SEARCH
            ================================================= */}
            <div className="relative">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search technical skills"
                className="w-full rounded-xl border border-white/[0.09] bg-[#111113] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/45 focus:ring-4 focus:ring-[#da224b]/10"
              />
            </div>

            {/* =================================================
                SELECTED SKILLS
            ================================================= */}
            <AnimatePresence mode="popLayout">
              {selectedSkills.length > 0 && (
                <motion.div
                  layout
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {selectedSkills.map(
                    (skill) => (
                      <motion.button
                        key={skill}
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
                        type="button"
                        onClick={() =>
                          removeSkill(skill)
                        }
                        className="group inline-flex items-center gap-2 rounded-lg border border-[#da224b]/25 bg-[#1b1215] px-3 py-2 text-xs font-medium text-white/75 transition-colors duration-200 hover:border-[#da224b]/45 hover:bg-[#211316] hover:text-white"
                      >
                        {skill}

                        <X
                          size={13}
                          strokeWidth={1.8}
                          className="text-[#da224b]/75 transition-colors group-hover:text-[#da224b]"
                        />
                      </motion.button>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                AVAILABLE SKILLS
            ================================================= */}
            <div className="mt-6 flex flex-wrap gap-2">
              {filteredSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() =>
                    addSkill(skill)
                  }
                  className="rounded-lg border border-white/[0.08] bg-[#111113] px-3 py-2 text-xs font-medium text-white/45 transition-all duration-200 hover:border-[#da224b]/30 hover:bg-[#171114] hover:text-white/80"
                >
                  {skill}
                </button>
              ))}

              {filteredSkills.length === 0 && (
                <p className="py-2 text-sm text-white/25">
                  No additional skills found.
                </p>
              )}
            </div>

            {/* =================================================
                BOTTOM ACTION
            ================================================= */}
            <div className="mt-8 flex items-center justify-between gap-5 border-t border-white/[0.07] pt-6">
              <div>
                {saved && (
                  <p className="text-sm text-white/40">
                    Preferences updated.
                  </p>
                )}
              </div>

              {isUpdateMode ? (
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={
                    selectedSkills.length === 0 ||
                    isSaving
                  }
                  className="rounded-xl bg-[#da224b] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#c91d43] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {isSaving
                    ? "Saving..."
                    : "Save Preferences"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={
                    selectedSkills.length === 0 ||
                    isSaving
                  }
                  className="rounded-xl bg-[#da224b] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#c91d43] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {isSaving
                    ? "Continuing..."
                    : "Continue"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );

  {/* ==========================================================
      UPDATE MODE
      Show the company sidebar when this page is opened from
      the logged-in company dashboard.
  ========================================================== */}

  if (isUpdateMode) {
    return (
      <div className="flex min-h-screen bg-[#0b0b0d] text-white">
        <CompanySidebar plan={initialPlan} />

        <main className="min-w-0 flex-1">
          {content}
        </main>
      </div>
    );
  }

  return content;
}
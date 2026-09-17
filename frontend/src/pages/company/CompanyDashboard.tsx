import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

type PlanId = "basic" | "plus" | "pro";

type CandidateProject = {
  name: string;
  description: string;
  technologies: string[];
};

type Candidate = {
  id: string;
  name: string;
  university: string;
  graduationYear: number;
  location: string;
  about: string;
  skills: Record<string, number>;
  projects: CandidateProject[];
  assessment: {
    overall: number;
    dsa: number;
    technical: number;
    project: number;
  };
};

type DashboardLocationState = {
  skills?: string[];
  plan?: PlanId;
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

const skillBenchmarks: Record<string, number> = {
  React: 72,
  Python: 74,
  Java: 69,
  JavaScript: 71,
  TypeScript: 70,
  "Node.js": 68,
  SQL: 73,
  "C++": 67,
  C: 65,
  "C#": 69,
  Go: 70,
  AWS: 66,
  MongoDB: 71,
  PostgreSQL: 72,
  Docker: 68,
  Git: 75,
  HTML: 70,
  CSS: 70,
  "Next.js": 69,
  "Express.js": 68,
  "Spring Boot": 70,
  Django: 71,
  Flask: 70,
  Angular: 69,
  "Vue.js": 68,
};

const candidates: Candidate[] = [
  {
    id: "cand-001",
    name: "Arjun Mehta",
    university: "VIT Vellore",
    graduationYear: 2027,
    location: "Bengaluru",
    about:
      "Computer science student focused on building scalable web applications and backend systems.",
    skills: {
      React: 94,
      TypeScript: 91,
      JavaScript: 93,
      "Node.js": 89,
      SQL: 84,
      Java: 86,
      Git: 91,
    },
    projects: [
      {
        name: "Distributed Task Platform",
        description:
          "Built a task management platform with role-based access, live updates and REST APIs.",
        technologies: [
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
        ],
      },
    ],
    assessment: {
      overall: 92,
      dsa: 90,
      technical: 94,
      project: 92,
    },
  },
  {
    id: "cand-002",
    name: "Riya Sharma",
    university: "Manipal Institute of Technology",
    graduationYear: 2027,
    location: "Hyderabad",
    about:
      "Full-stack developer interested in frontend architecture, APIs and developer tooling.",
    skills: {
      React: 88,
      TypeScript: 87,
      JavaScript: 91,
      "Node.js": 85,
      SQL: 82,
      Python: 78,
      Git: 88,
    },
    projects: [
      {
        name: "Developer Analytics Dashboard",
        description:
          "Created a dashboard for tracking repository activity and engineering metrics.",
        technologies: [
          "React",
          "TypeScript",
          "Node.js",
          "SQL",
        ],
      },
    ],
    assessment: {
      overall: 87,
      dsa: 83,
      technical: 89,
      project: 89,
    },
  },
  {
    id: "cand-003",
    name: "Karan Patel",
    university: "NIT Surat",
    graduationYear: 2027,
    location: "Ahmedabad",
    about:
      "Backend-oriented developer with strong fundamentals in Java, databases and distributed systems.",
    skills: {
      Java: 91,
      SQL: 88,
      "Spring Boot": 89,
      Python: 81,
      React: 69,
      Git: 86,
    },
    projects: [
      {
        name: "Enterprise Inventory System",
        description:
          "Developed a Java backend for inventory management with authentication and reporting.",
        technologies: [
          "Java",
          "Spring Boot",
          "PostgreSQL",
        ],
      },
    ],
    assessment: {
      overall: 88,
      dsa: 91,
      technical: 89,
      project: 84,
    },
  },
  {
    id: "cand-004",
    name: "Ananya Rao",
    university: "IIIT Hyderabad",
    graduationYear: 2028,
    location: "Pune",
    about:
      "Software engineering student working across machine learning, Python and modern web stacks.",
    skills: {
      Python: 94,
      React: 83,
      TypeScript: 81,
      JavaScript: 84,
      SQL: 89,
      Docker: 82,
      Git: 90,
    },
    projects: [
      {
        name: "AI Hiring Assistant",
        description:
          "Built a recruitment assistant that analyzes candidate profiles and technical evidence.",
        technologies: [
          "Python",
          "React",
          "PostgreSQL",
          "Docker",
        ],
      },
    ],
    assessment: {
      overall: 91,
      dsa: 88,
      technical: 93,
      project: 92,
    },
  },
  {
    id: "cand-005",
    name: "Dev Malhotra",
    university: "SRM Institute of Science and Technology",
    graduationYear: 2028,
    location: "Chennai",
    about:
      "Frontend developer with hands-on experience building responsive interfaces and APIs.",
    skills: {
      React: 79,
      JavaScript: 82,
      TypeScript: 76,
      "Node.js": 73,
      SQL: 71,
      HTML: 88,
      CSS: 89,
    },
    projects: [
      {
        name: "E-commerce Platform",
        description:
          "Developed a responsive e-commerce application with product discovery and checkout flows.",
        technologies: [
          "React",
          "JavaScript",
          "Node.js",
          "SQL",
        ],
      },
    ],
    assessment: {
      overall: 78,
      dsa: 72,
      technical: 81,
      project: 82,
    },
  },
  {
    id: "cand-006",
    name: "Ishita Verma",
    university: "BITS Pilani",
    graduationYear: 2027,
    location: "Delhi",
    about:
      "Software engineering student focused on Python, cloud infrastructure and data systems.",
    skills: {
      Python: 86,
      AWS: 88,
      SQL: 84,
      Docker: 87,
      PostgreSQL: 85,
      React: 64,
      Git: 89,
    },
    projects: [
      {
        name: "Cloud Data Pipeline",
        description:
          "Built a cloud-native data processing pipeline with automated deployment and monitoring.",
        technologies: [
          "Python",
          "AWS",
          "Docker",
          "PostgreSQL",
        ],
      },
    ],
    assessment: {
      overall: 85,
      dsa: 79,
      technical: 88,
      project: 88,
    },
  },
  {
    id: "cand-007",
    name: "Rahul Singh",
    university: "Vellore Institute of Technology",
    graduationYear: 2028,
    location: "Lucknow",
    about:
      "Computer science student with a broad foundation across frontend and backend development.",
    skills: {
      Java: 73,
      React: 75,
      JavaScript: 78,
      Python: 72,
      SQL: 76,
      Git: 80,
    },
    projects: [
      {
        name: "Campus Collaboration App",
        description:
          "Built a collaborative campus platform for sharing events, resources and announcements.",
        technologies: [
          "React",
          "JavaScript",
          "Node.js",
          "MongoDB",
        ],
      },
    ],
    assessment: {
      overall: 76,
      dsa: 75,
      technical: 77,
      project: 76,
    },
  },
  {
    id: "cand-008",
    name: "Meera Iyer",
    university: "NIT Trichy",
    graduationYear: 2027,
    location: "Bengaluru",
    about:
      "Full-stack developer with strong Python, React and database fundamentals.",
    skills: {
      Python: 89,
      React: 86,
      JavaScript: 84,
      TypeScript: 79,
      SQL: 91,
      PostgreSQL: 92,
      Git: 88,
    },
    projects: [
      {
        name: "Financial Intelligence Platform",
        description:
          "Built a financial analytics product with predictive reporting and a React dashboard.",
        technologies: [
          "Python",
          "React",
          "PostgreSQL",
          "Docker",
        ],
      },
    ],
    assessment: {
      overall: 90,
      dsa: 87,
      technical: 91,
      project: 92,
    },
  },
  {
    id: "cand-009",
    name: "Aditya Joshi",
    university: "SRM University",
    graduationYear: 2028,
    location: "Mumbai",
    about:
      "Developer learning modern backend systems with Java, Python and cloud technologies.",
    skills: {
      Java: 68,
      Python: 69,
      React: 61,
      SQL: 70,
      AWS: 63,
      Git: 73,
    },
    projects: [
      {
        name: "Recruitment Management Tool",
        description:
          "Created a recruitment workflow application for managing openings and candidate records.",
        technologies: [
          "Java",
          "SQL",
          "React",
        ],
      },
    ],
    assessment: {
      overall: 68,
      dsa: 64,
      technical: 71,
      project: 69,
    },
  },
  {
    id: "cand-010",
    name: "Sanjana Kapoor",
    university: "Anna University",
    graduationYear: 2027,
    location: "Chennai",
    about:
      "Frontend-focused engineer interested in React, TypeScript and accessible product interfaces.",
    skills: {
      React: 91,
      TypeScript: 89,
      JavaScript: 95,
      "Node.js": 78,
      SQL: 74,
      Git: 90,
      CSS: 94,
    },
    projects: [
      {
        name: "Accessibility-first Design System",
        description:
          "Created and documented a reusable component system for responsive product teams.",
        technologies: [
          "React",
          "TypeScript",
          "CSS",
        ],
      },
    ],
    assessment: {
      overall: 90,
      dsa: 84,
      technical: 93,
      project: 94,
    },
  },
];

const profileLimits: Record<PlanId, number | null> = {
  basic: 150,
  plus: 250,
  pro: null,
};

const planLabels: Record<PlanId, string> = {
  basic: "Basic",
  plus: "Plus",
  pro: "Pro",
};

function getCandidateThreshold(
  plan: PlanId,
  skill: string,
): number | null {
  if (plan === "pro") {
    return null;
  }

  const benchmark = skillBenchmarks[skill];

  if (benchmark === undefined) {
    return plan === "basic" ? 80 : 90;
  }

  return plan === "basic"
    ? Math.min(benchmark + 11, 100)
    : Math.min(benchmark + 21, 100);
}

function getCandidateSkillScore(
  candidate: Candidate,
  skill: string,
): number | undefined {
  return candidate.skills[skill];
}

function candidateMatchesPlan(
  candidate: Candidate,
  selectedSkills: string[],
  plan: PlanId,
): boolean {
  if (selectedSkills.length === 0) {
    return false;
  }

  if (plan === "pro") {
    return selectedSkills.some((skill) => {
      return typeof getCandidateSkillScore(candidate, skill) === "number";
    });
  }

  return selectedSkills.every((skill) => {
    const score = getCandidateSkillScore(candidate, skill);

    if (typeof score !== "number") {
      return false;
    }

    const threshold = getCandidateThreshold(plan, skill);

    if (threshold === null) {
      return true;
    }

    return score <= threshold;
  });
}

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState =
    (location.state as DashboardLocationState | null) ?? null;

  const initialSkills =
    locationState?.skills &&
    locationState.skills.length > 0
      ? locationState.skills
      : ["React", "Python"];

  const initialPlan = locationState?.plan ?? "plus";

  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [selectedSkills, setSelectedSkills] =
    useState<string[]>(initialSkills);

  const [candidateSearch, setCandidateSearch] =
    useState("");

  const [showRequirements, setShowRequirements] =
    useState(false);

  const [skillSearch, setSkillSearch] = useState("");

  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const [profilesViewed, setProfilesViewed] =
    useState(18);

  const filteredSkillOptions = useMemo(() => {
    const query = skillSearch.trim().toLowerCase();

    if (!query) {
      return availableSkills;
    }

    return availableSkills.filter((skill) =>
      skill.toLowerCase().includes(query),
    );
  }, [skillSearch]);

  const matchingCandidates = useMemo(() => {
    const query = candidateSearch.trim().toLowerCase();

    return candidates
      .filter((candidate) =>
        candidateMatchesPlan(
          candidate,
          selectedSkills,
          plan,
        ),
      )
      .filter((candidate) => {
        if (!query) {
          return true;
        }

        const nameMatch = candidate.name
          .toLowerCase()
          .includes(query);

        const universityMatch = candidate.university
          .toLowerCase()
          .includes(query);

        const locationMatch = candidate.location
          .toLowerCase()
          .includes(query);

        const skillMatch = Object.keys(candidate.skills).some(
          (skill) =>
            skill.toLowerCase().includes(query),
        );

        return (
          nameMatch ||
          universityMatch ||
          locationMatch ||
          skillMatch
        );
      })
      .sort(
        (a, b) =>
          b.assessment.overall -
          a.assessment.overall,
      );
  }, [candidateSearch, plan, selectedSkills]);

  const toggleRequirementSkill = (skill: string) => {
    setSelectedSkills((current) => {
      if (current.includes(skill)) {
        return current.filter(
          (item) => item !== skill,
        );
      }

      return [...current, skill];
    });
  };

  const openCandidate = (candidate: Candidate) => {
    const limit = profileLimits[plan];

    if (limit !== null && profilesViewed >= limit) {
      return;
    }

    setProfilesViewed((current) => current + 1);
    setSelectedCandidate(candidate);
  };

  const handleUpgrade = (targetPlan: PlanId) => {
    navigate("/company/subscription", {
      state: {
        skills: selectedSkills,
        plan: targetPlan,
        upgradeFrom: plan,
      },
    });
  };

  const profileLimit = profileLimits[plan];

  const profilesRemaining =
    profileLimit === null
      ? null
      : Math.max(profileLimit - profilesViewed, 0);

  const usagePercentage =
    profileLimit === null
      ? 0
      : Math.min(
          (profilesViewed / profileLimit) * 100,
          100,
        );

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="flex min-h-screen">
        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="hidden w-[250px] shrink-0 border-r border-white/[0.07] bg-[#111113] lg:flex lg:flex-col">
          <div className="border-b border-white/[0.07] px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#da224b]/30 bg-[#171114]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-8 w-8 object-contain"
                />
              </div>

              <div>
                <p className="text-[12px] font-semibold tracking-[0.28em] text-[#da224b]">
                  ACHILLES
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/25">
                  Company
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-5">
            <button
              type="button"
              className="flex w-full items-center rounded-xl border border-[#da224b]/15 bg-[#241519] px-3.5 py-3 text-left text-sm font-medium text-white shadow-[inset_3px_0_0_#da224b]"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={() =>
                setShowRequirements(
                  (current) => !current,
                )
              }
              className="mt-1.5 flex w-full items-center justify-between rounded-xl border border-transparent px-3.5 py-3 text-sm text-white/45 transition-colors hover:bg-white/[0.025] hover:text-white/80"
            >
              <span>Candidate requirements</span>

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  showRequirements
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("plan-section")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="mt-1.5 flex w-full items-center rounded-xl border border-transparent px-3.5 py-3 text-sm text-white/45 transition-colors hover:bg-white/[0.025] hover:text-white/80"
            >
              Subscription
            </button>

            <button
              type="button"
              className="mt-1.5 flex w-full items-center rounded-xl border border-transparent px-3.5 py-3 text-sm text-white/45 transition-colors hover:bg-white/[0.025] hover:text-white/80"
            >
              Company profile
            </button>
          </nav>

          <div className="border-t border-white/[0.07] p-4">
            <div className="rounded-xl border border-white/[0.07] bg-[#0f0f11] p-4">
              <p className="text-xs text-white/30">
                Current plan
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {planLabels[plan]}
              </p>

              {plan !== "pro" ? (
                <button
                  type="button"
                  onClick={() =>
                    handleUpgrade(
                      plan === "basic"
                        ? "plus"
                        : "pro",
                    )
                  }
                  className="mt-4 text-xs font-medium text-[#da224b] transition-colors hover:text-[#ed315c]"
                >
                  Upgrade plan
                </button>
              ) : (
                <p className="mt-4 text-xs text-white/25">
                  Maximum access
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="min-w-0 flex-1">
          {/* Header */}

          <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#0b0b0d]/95 backdrop-blur-xl">
            <div className="flex min-h-[82px] items-center justify-between gap-6 px-5 md:px-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#da224b]">
                  COMPANY DASHBOARD
                </p>

                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  Find the right candidates.
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-white/25">
                    Current plan
                  </p>

                  <p className="text-sm font-medium text-white">
                    {planLabels[plan]}
                  </p>
                </div>

                {plan !== "pro" && (
                  <Button
                    type="button"
                    onClick={() =>
                      handleUpgrade(
                        plan === "basic"
                          ? "plus"
                          : "pro",
                      )
                    }
                    className="hidden sm:flex"
                  >
                    Upgrade
                  </Button>
                )}
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1380px] px-5 py-7 md:px-8 md:py-8">
            {/* =================================================
                REQUIREMENTS EDITOR
            ================================================= */}

            {showRequirements && (
              <Card className="mb-6 border-[#da224b]/20 bg-[#151116] p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#da224b]">
                      CANDIDATE REQUIREMENTS
                    </p>

                    <h2 className="mt-2 text-lg font-semibold text-white">
                      Update the skills you're hiring for.
                    </h2>

                    <p className="mt-1.5 text-sm leading-6 text-white/35">
                      Your candidate list updates automatically
                      when these requirements change.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowRequirements(false)
                    }
                    aria-label="Close requirements"
                    className="self-start rounded-lg p-2 text-white/30 transition-colors hover:bg-white/[0.04] hover:text-white"
                  >
                    <X size={17} />
                  </button>
                </div>

                <div className="relative mt-6">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    value={skillSearch}
                    onChange={(event) =>
                      setSkillSearch(event.target.value)
                    }
                    placeholder="Search skills"
                    className="w-full rounded-xl border border-white/[0.09] bg-[#0f0f11] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#da224b]/50 focus:ring-4 focus:ring-[#da224b]/10"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {filteredSkillOptions.map((skill) => {
                    const selected =
                      selectedSkills.includes(skill);

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() =>
                          toggleRequirementSkill(
                            skill,
                          )
                        }
                        className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                          selected
                            ? "border-[#da224b]/40 bg-[#241519] text-white"
                            : "border-white/[0.08] bg-[#111113] text-white/45 hover:border-white/[0.16] hover:text-white/75"
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-white/[0.07] pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                    Active requirements
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSkills.length > 0 ? (
                      selectedSkills.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() =>
                            toggleRequirementSkill(
                              skill,
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-[#da224b]/30 bg-[#241519] px-3 py-2 text-sm text-white"
                        >
                          {skill}

                          <X
                            size={13}
                            className="text-white/35"
                          />
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-white/30">
                        Select at least one skill.
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* =================================================
                SEARCH / REQUIREMENTS
            ================================================= */}

            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[#da224b]/20 bg-[#171114] px-3 py-1.5 text-xs font-medium text-white/65"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h2 className="mt-5 text-xl font-semibold text-white">
                  Candidates matched to your requirements
                </h2>

                <p className="mt-1.5 text-sm text-white/35">
                  {matchingCandidates.length} candidates currently visible.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative min-w-[260px]">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    value={candidateSearch}
                    onChange={(event) =>
                      setCandidateSearch(
                        event.target.value,
                      )
                    }
                    placeholder="Search candidates"
                    className="w-full rounded-xl border border-white/[0.09] bg-[#111113] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#da224b]/50 focus:ring-4 focus:ring-[#da224b]/10"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowRequirements(
                      (current) => !current,
                    )
                  }
                  className="rounded-xl border border-white/[0.08] bg-[#131013] px-4 py-3 text-sm font-medium text-white/55 transition-all hover:border-white/[0.15] hover:text-white"
                >
                  Update requirements
                </button>
              </div>
            </div>

            {/* =================================================
                USAGE
            ================================================= */}

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card className="border-white/[0.08] bg-[#131013] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                  Subscription
                </p>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      {planLabels[plan]}
                    </p>

                    <p className="mt-1 text-sm text-white/30">
                      Candidate access enabled
                    </p>
                  </div>

                  {plan !== "pro" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleUpgrade(
                          plan === "basic"
                            ? "plus"
                            : "pro",
                        )
                      }
                      className="text-sm font-medium text-[#da224b] hover:text-[#ed315c]"
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              </Card>

              <Card className="border-white/[0.08] bg-[#131013] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                  Profile views
                </p>

                <p className="mt-3 text-2xl font-semibold text-white">
                  {profileLimit === null
                    ? "Unlimited"
                    : `${profilesViewed} / ${profileLimit}`}
                </p>

                <p className="mt-1 text-sm text-white/30">
                  {profileLimit === null
                    ? "No monthly profile cap"
                    : `${profilesRemaining} remaining this month`}
                </p>

                {profileLimit !== null && (
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-[#da224b] transition-all duration-300"
                      style={{
                        width: `${usagePercentage}%`,
                      }}
                    />
                  </div>
                )}
              </Card>

              <Card className="border-white/[0.08] bg-[#131013] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                  Requirements
                </p>

                <p className="mt-3 text-2xl font-semibold text-white">
                  {selectedSkills.length}
                </p>

                <p className="mt-1 text-sm text-white/30">
                  Active technical skills
                </p>
              </Card>
            </div>

            {/* =================================================
                CANDIDATE LIST
            ================================================= */}

            <section className="mt-8">
              {matchingCandidates.length === 0 ? (
                <Card className="border-white/[0.08] bg-[#131013] p-10 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    No candidates match these requirements.
                  </h3>

                  <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/35">
                    Try updating your required skills or upgrading
                    your plan to access a broader candidate pool.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setShowRequirements(true)
                    }
                    className="mt-6 text-sm font-medium text-[#da224b] hover:text-[#ed315c]"
                  >
                    Update requirements
                  </button>
                </Card>
              ) : (
                <div className="grid gap-4 xl:grid-cols-2">
                  {matchingCandidates.map((candidate) => {
                    const visibleScores =
                      selectedSkills
                        .map((skill) => ({
                          skill,
                          score:
                            getCandidateSkillScore(
                              candidate,
                              skill,
                            ),
                        }))
                        .filter(
                          (
                            item,
                          ): item is {
                            skill: string;
                            score: number;
                          } =>
                            typeof item.score ===
                            "number",
                        );

                    const strongestSkill =
                      visibleScores.length > 0
                        ? [...visibleScores].sort(
                            (a, b) =>
                              b.score - a.score,
                          )[0]
                        : null;

                    const limitReached =
                      profileLimit !== null &&
                      profilesViewed >= profileLimit;

                    return (
                      <Card
                        key={candidate.id}
                        className="border-white/[0.08] bg-[#131013] p-6 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#151116]"
                      >
                        <div className="flex items-start justify-between gap-5">
                          <div className="flex min-w-0 items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#da224b]/20 bg-[#241519] text-sm font-semibold text-[#da224b]">
                              {candidate.name
                                .split(" ")
                                .map(
                                  (part) =>
                                    part[0] ?? "",
                                )
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-lg font-semibold text-white">
                                {candidate.name}
                              </h3>

                              <p className="mt-1 truncate text-sm text-white/35">
                                {candidate.university}
                              </p>

                              <p className="mt-1 text-xs text-white/25">
                                {candidate.location} · Class of{" "}
                                {candidate.graduationYear}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
                              Overall
                            </p>

                            <p className="mt-1 font-mono text-lg font-semibold text-white">
                              {candidate.assessment.overall}
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 line-clamp-2 text-sm leading-6 text-white/40">
                          {candidate.about}
                        </p>

                        {visibleScores.length > 0 && (
                          <div className="mt-5 border-t border-white/[0.07] pt-5">
                            <div className="flex flex-wrap gap-2">
                              {visibleScores.map(
                                ({ skill, score }) => (
                                  <div
                                    key={skill}
                                    className="rounded-lg border border-white/[0.07] bg-[#111113] px-3 py-2"
                                  >
                                    <p className="text-[10px] text-white/25">
                                      {skill}
                                    </p>

                                    <p className="mt-1 font-mono text-sm font-semibold text-white/75">
                                      {score}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-5 flex items-center justify-between gap-4">
                          <div>
                            {strongestSkill && (
                              <p className="text-xs text-white/30">
                                Strongest match:{" "}
                                <span className="text-white/55">
                                  {strongestSkill.skill}
                                </span>
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              openCandidate(candidate)
                            }
                            disabled={limitReached}
                            className="group inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white disabled:cursor-not-allowed disabled:text-white/20"
                          >
                            {limitReached
                              ? "Profile limit reached"
                              : "View profile"}

                            {!limitReached && (
                              <ArrowRight
                                size={15}
                                className="text-[#da224b] transition-transform duration-200 group-hover:translate-x-1"
                              />
                            )}
                          </button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </section>

            {/* =================================================
                UPGRADE
            ================================================= */}

            {plan !== "pro" && (
              <section
                id="plan-section"
                className="mt-10"
              >
                <Card className="border-[#da224b]/15 bg-[#171114] p-6 sm:p-7">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#da224b]">
                        NEED MORE ACCESS?
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-white">
                        Upgrade your candidate access.
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/35">
                        Unlock a wider candidate pool and a higher
                        monthly profile viewing allowance.
                      </p>
                    </div>

                    <Button
                      type="button"
                      onClick={() =>
                        handleUpgrade(
                          plan === "basic"
                            ? "plus"
                            : "pro",
                        )
                      }
                      className="shrink-0"
                    >
                      {plan === "basic"
                        ? "Upgrade to Plus"
                        : "Upgrade to Pro"}
                    </Button>
                  </div>
                </Card>
              </section>
            )}
          </div>
        </main>

        {/* =================================================
            CANDIDATE PROFILE DRAWER
        ================================================= */}

        {selectedCandidate && (
          <div className="fixed inset-0 z-50">
            <button
              type="button"
              aria-label="Close candidate profile"
              onClick={() =>
                setSelectedCandidate(null)
              }
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <aside className="absolute right-0 top-0 flex h-full w-full max-w-[600px] flex-col overflow-y-auto border-l border-white/[0.08] bg-[#111113] shadow-[-20px_0_80px_rgba(0,0,0,0.45)]">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.07] bg-[#111113]/95 px-6 py-5 backdrop-blur-xl">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#da224b]">
                    CANDIDATE PROFILE
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    {selectedCandidate.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCandidate(null)
                  }
                  aria-label="Close candidate profile"
                  className="rounded-lg p-2 text-white/30 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Candidate summary */}

                <Card className="border-white/[0.08] bg-[#151116] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#da224b]/20 bg-[#241519] text-base font-semibold text-[#da224b]">
                      {selectedCandidate.name
                        .split(" ")
                        .map(
                          (part) => part[0] ?? "",
                        )
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {selectedCandidate.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/40">
                        {selectedCandidate.university}
                      </p>

                      <p className="mt-1 text-xs text-white/25">
                        {selectedCandidate.location} · Class of{" "}
                        {selectedCandidate.graduationYear}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-white/40">
                    {selectedCandidate.about}
                  </p>
                </Card>

                {/* Assessment */}

                <Card className="border-white/[0.08] bg-[#131013] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                    ASSESSMENT
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-white">
                    {selectedCandidate.assessment.overall}
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    Overall assessment score
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/[0.07] bg-[#111113] p-4">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                        DSA
                      </p>

                      <p className="mt-2 font-mono text-lg font-semibold text-white">
                        {selectedCandidate.assessment.dsa}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-[#111113] p-4">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                        Technical
                      </p>

                      <p className="mt-2 font-mono text-lg font-semibold text-white">
                        {selectedCandidate.assessment.technical}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-[#111113] p-4">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                        Project
                      </p>

                      <p className="mt-2 font-mono text-lg font-semibold text-white">
                        {selectedCandidate.assessment.project}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Skills */}

                <Card className="border-white/[0.08] bg-[#131013] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                    SKILL PERFORMANCE
                  </p>

                  <div className="mt-5 space-y-4">
                    {Object.entries(
                      selectedCandidate.skills,
                    )
                      .sort(([, a], [, b]) => b - a)
                      .map(([skill, score]) => (
                        <div key={skill}>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-white/65">
                              {skill}
                            </span>

                            <span className="font-mono text-sm text-white/45">
                              {score}
                            </span>
                          </div>

                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className="h-full rounded-full bg-[#da224b]"
                              style={{
                                width: `${score}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>

                {/* Projects */}

                <Card className="border-white/[0.08] bg-[#131013] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                    PROJECT EVIDENCE
                  </p>

                  <div className="mt-5 space-y-4">
                    {selectedCandidate.projects.map(
                      (project) => (
                        <div
                          key={project.name}
                          className="rounded-xl border border-white/[0.07] bg-[#111113] p-4"
                        >
                          <h3 className="text-sm font-semibold text-white">
                            {project.name}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-white/35">
                            {project.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.technologies.map(
                              (technology) => (
                                <span
                                  key={technology}
                                  className="rounded-md border border-white/[0.07] px-2.5 py-1 text-xs text-white/35"
                                >
                                  {technology}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </Card>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
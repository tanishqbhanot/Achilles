import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  detectedSkills,
} from "../data/mockData";

type ProjectDraft = {
  id: string;
  name: string;
  description: string;
  technologies: string;
  github: string;
  contribution: string;
};

type SectionStatus =
  | "pending"
  | "in_progress"
  | "completed";

type AssessmentSection = {
  status: SectionStatus;
  score: number | null;
  startedAt: string | null;
  completedAt: string | null;
};

type CurrentSection =
  | "dsa"
  | "quiz"
  | "project"
  | null;

type AssessmentState = {
  status:
    | "not_started"
    | "in_progress"
    | "completed";

  currentSection: CurrentSection;

  startedAt: string | null;
  completedAt: string | null;

  dsa: AssessmentSection;
  quiz: AssessmentSection;
  project: AssessmentSection;

  overallScore: number | null;
};

type AppStore = {
  skillsByGroup: Record<string, string[]>;

  skillScores: Record<string, number>;

  addSkill: (
    group: string,
    skill: string,
  ) => void;

  removeSkill: (
    group: string,
    skill: string,
  ) => void;

  setSkillScores: (
    scores: Record<string, number>,
  ) => void;

  projects: ProjectDraft[];

  addProject: (
    project: Omit<ProjectDraft, "id">,
  ) => void;

  removeProject: (
    projectId: string,
  ) => void;

  assessment: AssessmentState;

  startAssessment: () => void;

  startDsa: () => void;
  completeDsa: (
    score?: number,
  ) => void;

  startQuiz: () => void;
  completeQuiz: (
    score?: number,
  ) => void;

  startProject: () => void;
  completeProject: (
    score?: number,
  ) => void;

  resetAssessment: () => void;
};

function createPendingSection(): AssessmentSection {
  return {
    status: "pending",
    score: null,
    startedAt: null,
    completedAt: null,
  };
}

function createInitialAssessment(): AssessmentState {
  return {
    status: "not_started",

    currentSection: null,

    startedAt: null,
    completedAt: null,

    dsa: createPendingSection(),
    quiz: createPendingSection(),
    project: createPendingSection(),

    overallScore: null,
  };
}

function createInitialSkillScores() {
  const scores: Record<
    string,
    number
  > = {};

  Object.values(detectedSkills)
    .flat()
    .forEach((skill) => {
      scores[skill] = 0;
    });

  return scores;
}

export const useAppStore =
  create<AppStore>()(
    persist(
      (set) => ({
        /* =====================================================
           SKILLS
        ===================================================== */

        skillsByGroup: {
          ...detectedSkills,
        },

        skillScores:
          createInitialSkillScores(),

        addSkill: (group, skill) =>
          set((state) => {
            const current =
              state.skillsByGroup[group] ??
              [];

            if (current.includes(skill)) {
              return state;
            }

            return {
              skillsByGroup: {
                ...state.skillsByGroup,

                [group]: [
                  ...current,
                  skill,
                ],
              },

              skillScores: {
                ...state.skillScores,

                [skill]:
                  state.skillScores[
                    skill
                  ] ?? 0,
              },
            };
          }),

        removeSkill: (group, skill) =>
          set((state) => {
            const nextScores = {
              ...state.skillScores,
            };

            delete nextScores[skill];

            return {
              skillsByGroup: {
                ...state.skillsByGroup,

                [group]: (
                  state.skillsByGroup[
                    group
                  ] ?? []
                ).filter(
                  (item) =>
                    item !== skill,
                ),
              },

              skillScores:
                nextScores,
            };
          }),

        setSkillScores: (scores) =>
          set((state) => ({
            skillScores: {
              ...state.skillScores,
              ...scores,
            },
          })),

        /* =====================================================
           PROJECTS
        ===================================================== */

        /*
         * Projects are entered by the candidate.
         * They are no longer seeded from the resume/mock data.
         */

        projects: [],

        addProject: (project) =>
          set((state) => {
            if (state.projects.length >= 3) {
              return state;
            }

            return {
              projects: [
                ...state.projects,
                {
                  ...project,
                  id: String(
                    Date.now(),
                  ),
                },
              ],
            };
          }),

        removeProject: (projectId) =>
          set((state) => ({
            projects:
              state.projects.filter(
                (project) =>
                  project.id !==
                  projectId,
              ),
          })),

        /* =====================================================
           ASSESSMENT
        ===================================================== */

        assessment:
          createInitialAssessment(),

        /* =====================================================
           START ASSESSMENT
        ===================================================== */

        startAssessment: () =>
          set((state) => {
            if (
              state.assessment.status !==
              "not_started"
            ) {
              return state;
            }

            const now =
              new Date().toISOString();

            return {
              assessment: {
                ...state.assessment,

                status: "in_progress",

                currentSection:
                  "dsa",

                startedAt: now,

                dsa: {
                  ...state.assessment
                    .dsa,

                  status:
                    "in_progress",

                  startedAt: now,
                },
              },
            };
          }),

        /* =====================================================
           DSA
        ===================================================== */

        startDsa: () =>
          set((state) => {
            const now =
              new Date().toISOString();

            return {
              assessment: {
                ...state.assessment,

                status: "in_progress",

                currentSection:
                  "dsa",

                startedAt:
                  state.assessment
                    .startedAt ??
                  now,

                dsa: {
                  ...state.assessment
                    .dsa,

                  status:
                    "in_progress",

                  startedAt:
                    state.assessment
                      .dsa.startedAt ??
                    now,
                },
              },
            };
          }),

        completeDsa: (score) =>
          set((state) => {
            const now =
              new Date().toISOString();

            return {
              assessment: {
                ...state.assessment,

                status: "in_progress",

                currentSection:
                  "quiz",

                dsa: {
                  ...state.assessment
                    .dsa,

                  status:
                    "completed",

                  score:
                    score ?? null,

                  completedAt: now,
                },

                quiz: {
                  ...state.assessment
                    .quiz,

                  status:
                    state.assessment
                      .quiz.status ===
                    "completed"
                      ? "completed"
                      : "in_progress",

                  startedAt:
                    state.assessment
                      .quiz.startedAt ??
                    now,
                },
              },
            };
          }),

        /* =====================================================
           TECHNICAL QUIZ
        ===================================================== */

        startQuiz: () =>
          set((state) => {
            const now =
              new Date().toISOString();

            return {
              assessment: {
                ...state.assessment,

                status: "in_progress",

                currentSection:
                  "quiz",

                startedAt:
                  state.assessment
                    .startedAt ??
                  now,

                quiz: {
                  ...state.assessment
                    .quiz,

                  status:
                    "in_progress",

                  startedAt:
                    state.assessment
                      .quiz.startedAt ??
                    now,
                },
              },
            };
          }),

        completeQuiz: (score) =>
          set((state) => {
            const now =
              new Date().toISOString();

            return {
              assessment: {
                ...state.assessment,

                status: "in_progress",

                currentSection:
                  "project",

                quiz: {
                  ...state.assessment
                    .quiz,

                  status:
                    "completed",

                  score:
                    score ?? null,

                  completedAt: now,
                },

                project: {
                  ...state.assessment
                    .project,

                  status:
                    state.assessment
                      .project.status ===
                    "completed"
                      ? "completed"
                      : "in_progress",

                  startedAt:
                    state.assessment
                      .project
                      .startedAt ??
                    now,
                },
              },
            };
          }),

        /* =====================================================
           PROJECT ASSESSMENT
        ===================================================== */

        startProject: () =>
          set((state) => {
            const now =
              new Date().toISOString();

            return {
              assessment: {
                ...state.assessment,

                status: "in_progress",

                currentSection:
                  "project",

                startedAt:
                  state.assessment
                    .startedAt ??
                  now,

                project: {
                  ...state.assessment
                    .project,

                  status:
                    "in_progress",

                  startedAt:
                    state.assessment
                      .project
                      .startedAt ??
                    now,
                },
              },
            };
          }),

        completeProject: (score) =>
          set((state) => {
            const now =
              new Date().toISOString();

            const allSectionsCompleted =
              state.assessment.dsa
                .status ===
                "completed" &&
              state.assessment.quiz
                .status ===
                "completed";

            if (
              !allSectionsCompleted
            ) {
              return {
                assessment: {
                  ...state.assessment,

                  status:
                    "in_progress",

                  currentSection:
                    "project",

                  project: {
                    ...state.assessment
                      .project,

                    status:
                      "completed",

                    score:
                      score ?? null,

                    completedAt: now,
                  },
                },
              };
            }

            /*
             * Score can remain null until the backend
             * performs the final evaluation.
             */

            return {
              assessment: {
                ...state.assessment,

                status: "completed",

                currentSection: null,

                project: {
                  ...state.assessment
                    .project,

                  status:
                    "completed",

                  score:
                    score ?? null,

                  completedAt: now,
                },

                completedAt: now,

                overallScore: null,
              },
            };
          }),

        /* =====================================================
           RESET
        ===================================================== */

        resetAssessment: () =>
          set(() => ({
            assessment:
              createInitialAssessment(),

            skillScores:
              createInitialSkillScores(),
          })),
      }),

      {
        name: "achilles-app",

        /*
         * Version 3 clears the old seeded
         * resume/mock projects from persisted state.
         */

        version: 3,

        migrate: () => ({
          skillsByGroup: {
            ...detectedSkills,
          },

          skillScores:
            createInitialSkillScores(),

          projects: [],

          assessment:
            createInitialAssessment(),
        }),
      },
    ),
  );
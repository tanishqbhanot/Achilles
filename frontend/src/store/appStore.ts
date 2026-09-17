import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  detectedSkills,
  projects as seedProjects,
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
    skill: string
  ) => void;

  removeSkill: (
    group: string,
    skill: string
  ) => void;

  setSkillScores: (
    scores: Record<string, number>
  ) => void;

  projects: ProjectDraft[];

  addProject: (
    project: Omit<ProjectDraft, "id">
  ) => void;

  assessment: AssessmentState;

  startAssessment: () => void;

  startDsa: () => void;
  completeDsa: (score?: number) => void;

  startQuiz: () => void;
  completeQuiz: (score?: number) => void;

  startProject: () => void;
  completeProject: (score?: number) => void;

  resetAssessment: () => void;
};

/*
 * =========================================================
 * HELPERS
 * =========================================================
 */

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

function createInitialSkillScores(): Record<
  string,
  number
> {
  const scores: Record<string, number> = {};

  Object.values(detectedSkills)
    .flat()
    .forEach((skill) => {
      scores[skill] = 0;
    });

  return scores;
}

/*
 * =========================================================
 * STORE
 * =========================================================
 */

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      /*
       * =====================================================
       * SKILLS
       * =====================================================
       */

      skillsByGroup: {
        ...detectedSkills,
      },

      skillScores:
        createInitialSkillScores(),

      addSkill: (group, skill) =>
        set((state) => {
          const current =
            state.skillsByGroup[group] ?? [];

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
                state.skillScores[skill] ??
                0,
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
                state.skillsByGroup[group] ??
                []
              ).filter(
                (item) => item !== skill
              ),
            },

            skillScores: nextScores,
          };
        }),

      setSkillScores: (scores) =>
        set((state) => ({
          skillScores: {
            ...state.skillScores,
            ...scores,
          },
        })),

      /*
       * =====================================================
       * PROJECTS
       * =====================================================
       */

      projects: seedProjects.map(
        (project) => ({
          id: project.id,
          name: project.name,
          description:
            project.description,
          technologies:
            project.technologies.join(", "),
          github: project.github,
          contribution:
            project.contribution ??
            "",
        })
      ),

      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,

            {
              ...project,
              id: String(Date.now()),
            },
          ],
        })),

      /*
       * =====================================================
       * ASSESSMENT
       * =====================================================
       */

      assessment:
        createInitialAssessment(),

      /*
       * =====================================================
       * START ASSESSMENT
       * =====================================================
       */

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

              currentSection: "dsa",

              startedAt: now,

              dsa: {
                ...state.assessment.dsa,

                status: "in_progress",

                startedAt: now,
              },
            },
          };
        }),

      /*
       * =====================================================
       * DSA
       * =====================================================
       */

      startDsa: () =>
        set((state) => {
          const now =
            new Date().toISOString();

          return {
            assessment: {
              ...state.assessment,

              status: "in_progress",

              currentSection: "dsa",

              startedAt:
                state.assessment.startedAt ??
                now,

              dsa: {
                ...state.assessment.dsa,

                status: "in_progress",

                startedAt:
                  state.assessment.dsa
                    .startedAt ?? now,
              },
            },
          };
        }),

      completeDsa: (score) =>
        set((state) => {
          const now =
            new Date().toISOString();

          const normalizedScore =
            score ?? null;

          return {
            assessment: {
              ...state.assessment,

              status: "in_progress",

              currentSection: "quiz",

              dsa: {
                ...state.assessment.dsa,

                status: "completed",

                score: normalizedScore,

                completedAt: now,
              },

              quiz: {
                ...state.assessment.quiz,

                status:
                  state.assessment.quiz
                    .status ===
                  "completed"
                    ? "completed"
                    : "in_progress",

                startedAt:
                  state.assessment.quiz
                    .startedAt ?? now,
              },
            },
          };
        }),

      /*
       * =====================================================
       * TECHNICAL QUIZ
       * =====================================================
       */

      startQuiz: () =>
        set((state) => {
          const now =
            new Date().toISOString();

          return {
            assessment: {
              ...state.assessment,

              status: "in_progress",

              currentSection: "quiz",

              startedAt:
                state.assessment.startedAt ??
                now,

              quiz: {
                ...state.assessment.quiz,

                status: "in_progress",

                startedAt:
                  state.assessment.quiz
                    .startedAt ?? now,
              },
            },
          };
        }),

      completeQuiz: (score) =>
        set((state) => {
          const now =
            new Date().toISOString();

          const normalizedScore =
            score ?? null;

          return {
            assessment: {
              ...state.assessment,

              status: "in_progress",

              currentSection: "project",

              quiz: {
                ...state.assessment.quiz,

                status: "completed",

                score: normalizedScore,

                completedAt: now,
              },

              project: {
                ...state.assessment.project,

                status:
                  state.assessment.project
                    .status ===
                  "completed"
                    ? "completed"
                    : "in_progress",

                startedAt:
                  state.assessment.project
                    .startedAt ?? now,
              },
            },
          };
        }),

      /*
       * =====================================================
       * PROJECT
       * =====================================================
       */

      startProject: () =>
        set((state) => {
          const now =
            new Date().toISOString();

          return {
            assessment: {
              ...state.assessment,

              status: "in_progress",

              currentSection: "project",

              startedAt:
                state.assessment.startedAt ??
                now,

              project: {
                ...state.assessment.project,

                status: "in_progress",

                startedAt:
                  state.assessment.project
                    .startedAt ?? now,
              },
            },
          };
        }),

      completeProject: (score) =>
        set((state) => {
          const now =
            new Date().toISOString();

          const normalizedScore =
            score ?? null;

          /*
           * The complete assessment state is reached
           * only when DSA and Quiz are already complete.
           */
          const dsaCompleted =
            state.assessment.dsa.status ===
            "completed";

          const quizCompleted =
            state.assessment.quiz.status ===
            "completed";

          /*
           * If Project somehow completes before
           * the previous rounds, only the project
           * section is marked complete.
           */
          if (
            !dsaCompleted ||
            !quizCompleted
          ) {
            return {
              assessment: {
                ...state.assessment,

                status: "in_progress",

                currentSection: "project",

                project: {
                  ...state.assessment.project,

                  status: "completed",

                  score: normalizedScore,

                  completedAt: now,
                },
              },
            };
          }

          /*
           * All three assessment rounds are complete.
           */
          const dsaScore =
            state.assessment.dsa.score ??
            0;

          const quizScore =
            state.assessment.quiz.score ??
            0;

          const projectScore =
            normalizedScore ?? 0;

          const overallScore =
            Math.round(
              (dsaScore +
                quizScore +
                projectScore) /
                3
            );

          return {
            assessment: {
              ...state.assessment,

              status: "completed",

              currentSection: null,

              project: {
                ...state.assessment.project,

                status: "completed",

                score:
                  normalizedScore,

                completedAt: now,
              },

              completedAt: now,

              overallScore,
            },
          };
        }),

      /*
       * =====================================================
       * RESET
       * =====================================================
       */

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
       * Bump this when changing the persisted
       * state structure so older state is rebuilt.
       */
      version: 3,

      migrate: () => ({
        skillsByGroup: {
          ...detectedSkills,
        },

        skillScores:
          createInitialSkillScores(),

        projects: seedProjects.map(
          (project) => ({
            id: project.id,
            name: project.name,
            description:
              project.description,
            technologies:
              project.technologies.join(
                ", "
              ),
            github: project.github,
            contribution:
              project.contribution ??
              "",
          })
        ),

        assessment:
          createInitialAssessment(),
      }),
    }
  )
);
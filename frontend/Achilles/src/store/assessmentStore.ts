import { create } from "zustand";
import { mockAssessment } from "../data/mockAssessment";
import type { SupportedLanguage } from "../data/mockAssessment";

interface TestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput?: string;
  error?: string;
}

interface QuestionProgress {
  code: Record<SupportedLanguage, string>;
  submitted: boolean;
  isRunning: boolean;
  testResults: TestResult[];
}

interface AssessmentState {
  assessmentId: string;

  questions: typeof mockAssessment.questions;

  currentQuestionIndex: number;

  language: SupportedLanguage;

  timeRemaining: number;

  started: boolean;
  completed: boolean;

  progress: Record<string, QuestionProgress>;

  // Navigation
  goToQuestion: (index: number) => void;

  // Code
  updateCode: (
    questionId: string,
    language: SupportedLanguage,
    code: string,
  ) => void;

  setLanguage: (language: SupportedLanguage) => void;

  // Execution
  setRunning: (
    questionId: string,
    value: boolean,
  ) => void;

  setTestResults: (
    questionId: string,
    results: TestResult[],
  ) => void;

  // Assessment
  submitQuestion: (questionId: string) => void;

  startAssessment: () => void;
  decrementTimer: () => void;
  completeAssessment: () => void;
}

const createInitialProgress = () => {
  const progress: Record<string, QuestionProgress> = {};

  mockAssessment.questions.forEach((question) => {
    progress[question.id] = {
      code: {
        java: question.starterCode.java,
        cpp: question.starterCode.cpp,
        python: question.starterCode.python,
        javascript: question.starterCode.javascript,
      },

      submitted: false,
      isRunning: false,
      testResults: [],
    };
  });

  return progress;
};

export const useAssessmentStore = create<AssessmentState>(
  (set) => ({
    assessmentId: mockAssessment.id,

    questions: mockAssessment.questions,

    currentQuestionIndex: 0,

    language: "java",

    timeRemaining:
      mockAssessment.durationMinutes * 60,

    started: false,

    completed: false,

    progress: createInitialProgress(),

    // Navigation
    goToQuestion: (index) =>
      set((state) => ({
        currentQuestionIndex: Math.max(
          0,
          Math.min(
            index,
            state.questions.length - 1,
          ),
        ),
      })),

    // Code
    updateCode: (
      questionId,
      language,
      code,
    ) =>
      set((state) => ({
        progress: {
          ...state.progress,

          [questionId]: {
            ...state.progress[questionId],

            code: {
              ...state.progress[questionId].code,

              [language]: code,
            },
          },
        },
      })),

    setLanguage: (language) =>
      set({
        language,
      }),

    // Execution
    setRunning: (questionId, value) =>
      set((state) => ({
        progress: {
          ...state.progress,

          [questionId]: {
            ...state.progress[questionId],

            isRunning: value,
          },
        },
      })),

    setTestResults: (
      questionId,
      results,
    ) =>
      set((state) => ({
        progress: {
          ...state.progress,

          [questionId]: {
            ...state.progress[questionId],

            testResults: results,
          },
        },
      })),

    // Assessment
    submitQuestion: (questionId) =>
      set((state) => ({
        progress: {
          ...state.progress,

          [questionId]: {
            ...state.progress[questionId],

            submitted: true,
          },
        },
      })),

    startAssessment: () =>
      set({
        started: true,
      }),

    decrementTimer: () =>
      set((state) => {
        const nextTime = Math.max(
          state.timeRemaining - 1,
          0,
        );

        return {
          timeRemaining: nextTime,
          completed:
            nextTime === 0
              ? true
              : state.completed,
        };
      }),

    completeAssessment: () =>
      set({
        completed: true,
      }),
  }),
);
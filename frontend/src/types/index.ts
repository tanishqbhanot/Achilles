export type Skill = {
  id: string;
  name: string;
  score: number;
  errors: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  contribution?: string;
};

export type QuizQuestion = {
  id: number;
  prompt: string;
  options: string[];
  answer: number;
};

export type ProjectQuestion = {
  id: number;
  projectName: string;
  prompt: string;
};

export type InterviewTurn = {
  id: number;
  from: "ai" | "candidate";
  text: string;
};

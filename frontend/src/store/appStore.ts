import { create } from "zustand";
import { detectedSkills, projects as seedProjects } from "../data/mockData";

type ProjectDraft = {
  id: string;
  name: string;
  description: string;
  technologies: string;
  github: string;
  contribution: string;
};

type AppStore = {
  skillsByGroup: Record<string, string[]>;
  addSkill: (group: string, skill: string) => void;
  removeSkill: (group: string, skill: string) => void;
  projects: ProjectDraft[];
  addProject: (project: Omit<ProjectDraft, "id">) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  skillsByGroup: { ...detectedSkills },
  addSkill: (group, skill) =>
    set((state) => {
      const current = state.skillsByGroup[group] ?? [];
      if (current.includes(skill)) return state;
      return {
        skillsByGroup: {
          ...state.skillsByGroup,
          [group]: [...current, skill],
        },
      };
    }),
  removeSkill: (group, skill) =>
    set((state) => ({
      skillsByGroup: {
        ...state.skillsByGroup,
        [group]: (state.skillsByGroup[group] ?? []).filter((s) => s !== skill),
      },
    })),
  projects: seedProjects.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    technologies: p.technologies.join(", "),
    github: p.github,
    contribution: p.contribution ?? "",
  })),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: String(Date.now()) }],
    })),
}));

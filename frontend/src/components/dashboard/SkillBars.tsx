import { Link } from "react-router-dom";
import { skills } from "../../data/mockData";
import ProgressBar from "../ui/ProgressBar";

export default function SkillBars() {
  return (
    <div className="flex flex-col gap-5">
      {skills.map((skill) => (
        <Link
          key={skill.id}
          to={`/skills/${skill.id}`}
          className="block rounded-lg p-1 -mx-1 transition-colors hover:bg-white/5"
        >
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-primary">{skill.name}</span>
            <span className="text-secondary">{skill.score}%</span>
          </div>
          <ProgressBar value={skill.score} />
        </Link>
      ))}
    </div>
  );
}

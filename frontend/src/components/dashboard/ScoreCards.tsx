import { Link } from "react-router-dom";
import { assessmentScores } from "../../data/mockData";
import Card from "../ui/Card";

const items = [
  { key: "dsa", label: "DSA / Coding", to: "/assessment/dsa" },
  { key: "technicalQuiz", label: "Technical Quiz", to: "/assessment/quiz" },
  { key: "projectAssessment", label: "Project Assessment", to: "/assessment/project" },
  { key: "interview", label: "Interview", to: "/interview" },
] as const;

export default function ScoreCards() {
  return (
    <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Link key={item.key} to={item.to}>
          <Card className="h-full transition-colors hover:border-accent/40">
            <p className="text-sm text-secondary">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-primary">
              {assessmentScores[item.key]}
              <span className="text-base font-normal text-secondary"> / 100</span>
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}

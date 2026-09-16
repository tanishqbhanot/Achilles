import { useNavigate } from "react-router-dom";
import { assessmentScores } from "../../data/mockData";
import ScoreCards from "../../components/dashboard/ScoreCards";
import SkillBars from "../../components/dashboard/SkillBars";
import SkillGraph from "../../components/dashboard/SkillGraph";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Topbar from "../../components/layout/Topbar";

export default function AssessmentResults() {
  const navigate = useNavigate();
  const overall = Math.round(
    (assessmentScores.dsa +
      assessmentScores.technicalQuiz +
      assessmentScores.projectAssessment +
      assessmentScores.interview) /
      4,
  );

  return (
    <>
      <Topbar title="Assessment Complete" subtitle="Your Technical Performance" />
      <main className="flex flex-1 flex-col gap-6 overflow-auto px-8 py-6">
        <p className="text-sm text-secondary">
          Composite score{" "}
          <span className="text-primary">{overall}/100</span>
        </p>
        <ScoreCards />
        <Card>
          <h2 className="mb-5 text-sm font-medium tracking-wide text-secondary">
            SKILL PERFORMANCE
          </h2>
          <SkillBars />
        </Card>
        <Card>
          <SkillGraph />
        </Card>
        <div className="flex gap-3">
          <Button onClick={() => navigate("/skills")}>View Skill Graph</Button>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Open Dashboard
          </Button>
        </div>
      </main>
    </>
  );
}

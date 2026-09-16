import { Link, useParams } from "react-router-dom";
import { skillDetails, skills } from "../../data/mockData";
import Card from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";
import Topbar from "../../components/layout/Topbar";
import SkillGraph from "../../components/dashboard/SkillGraph";

export default function SkillDetail() {
  const { skillId = "aws" } = useParams();
  const skill = skills.find((s) => s.id === skillId) ?? skills[3];
  const detail = skillDetails[skill.id];

  return (
    <>
      <Topbar title={skill.name} subtitle="Performance → Errors → Weak Areas" />
      <main className="flex flex-1 flex-col gap-6 overflow-auto px-8 py-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-5xl font-semibold">{skill.score}%</p>
            <p className="mt-2 text-sm text-secondary">Overall skill score</p>
          </div>
          <Link to="/skills" className="text-sm text-accent">
            View skill graph
          </Link>
        </div>

        <ProgressBar value={skill.score} className="h-4" />

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-sm text-secondary">Technical Quiz</p>
            <p className="mt-2 text-2xl">{detail.breakdown.technicalQuiz}%</p>
          </Card>
          <Card>
            <p className="text-sm text-secondary">Project Assessment</p>
            <p className="mt-2 text-2xl">
              {detail.breakdown.projectAssessment}%
            </p>
          </Card>
          <Card>
            <p className="text-sm text-secondary">Interview</p>
            <p className="mt-2 text-2xl">{detail.breakdown.interview}%</p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-sm font-medium text-secondary">
              Weak Areas
            </h2>
            {detail.weakAreas.length ? (
              <ul className="flex flex-col gap-2 text-primary">
                {detail.weakAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary">No weak areas flagged.</p>
            )}
          </Card>
          <Card>
            <h2 className="mb-4 text-sm font-medium text-secondary">
              Mistakes
            </h2>
            {detail.mistakes.length ? (
              <ul className="flex flex-col gap-2 text-primary">
                {detail.mistakes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary">No mistakes recorded.</p>
            )}
          </Card>
        </div>

        {skill.errors.length ? (
          <Card>
            <h2 className="mb-3 text-sm font-medium text-secondary">
              Recorded errors
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-secondary">
              {skill.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Card>
        ) : null}

        <Card>
          <SkillGraph />
        </Card>
      </main>
    </>
  );
}

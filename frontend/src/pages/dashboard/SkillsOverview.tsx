import { Link } from "react-router-dom";
import SkillBars from "../../components/dashboard/SkillBars";
import SkillGraph from "../../components/dashboard/SkillGraph";
import Card from "../../components/ui/Card";
import Topbar from "../../components/layout/Topbar";

export default function SkillsOverview() {
  return (
    <>
      <Topbar
        title="Skills"
        subtitle="Click a skill to open performance, errors, and weak areas."
      />
      <main className="flex flex-1 flex-col gap-6 overflow-auto px-8 py-6">
        <Card>
          <h2 className="mb-5 text-sm font-medium text-secondary">
            Skill performance
          </h2>
          <SkillBars />
        </Card>
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-medium text-secondary">Skill graph</h2>
            <Link to="/skills/aws" className="text-sm text-accent">
              Open AWS detail
            </Link>
          </div>
          <SkillGraph />
        </Card>
      </main>
    </>
  );
}

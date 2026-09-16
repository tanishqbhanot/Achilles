import { candidate } from "../../data/mockData";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import ScoreCards from "../../components/dashboard/ScoreCards";
import SkillBars from "../../components/dashboard/SkillBars";
import SkillGraph from "../../components/dashboard/SkillGraph";
import Card from "../../components/ui/Card";
import Topbar from "../../components/layout/Topbar";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  return (
    <>
      <Topbar
        title={`${greeting()}, ${candidate.firstName}`}
        subtitle="Here's your technical assessment overview."
      />
      <main className="flex flex-1 flex-col gap-6 overflow-auto px-8 py-6">
        <ScoreCards />

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <h2 className="mb-5 text-sm font-medium text-secondary">Skills</h2>
            <SkillBars />
          </Card>
          <Card>
            <h2 className="mb-5 text-sm font-medium text-secondary">
              Recent assessment activity
            </h2>
            <ActivityFeed />
          </Card>
        </div>

        <Card>
          <h2 className="mb-2 text-sm font-medium text-secondary">
            Skill graph
          </h2>
          <SkillGraph />
        </Card>
      </main>
    </>
  );
}

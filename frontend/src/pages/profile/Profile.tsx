import { candidate, githubRepos, projects, skills, assessmentScores } from "../../data/mockData";
import Card from "../../components/ui/Card";
import Topbar from "../../components/layout/Topbar";

export default function Profile() {
  return (
    <>
      <Topbar title="Profile" subtitle="Candidate information" />
      <main className="flex flex-1 flex-col gap-6 overflow-auto px-8 py-6">
        <Card>
          <h1 className="text-2xl font-semibold">{candidate.name}</h1>
          <p className="mt-1 text-secondary">{candidate.role}</p>
          <p className="text-secondary">
            {candidate.university} · {candidate.graduationYear}
          </p>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-secondary">About</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-primary">
            {candidate.about}
          </p>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-secondary">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-secondary">Projects</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border border-white/5 bg-bg p-4"
              >
                <h3 className="font-medium">{project.name}</h3>
                <p className="mt-1 text-sm text-secondary">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-secondary">GitHub</h2>
          <p className="mt-2 text-sm text-accent">{candidate.github}</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-secondary">
            {githubRepos.map((repo) => (
              <li key={repo.name}>
                {repo.name} · {repo.language} · {repo.stars} stars
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-secondary">
            Assessment History
          </h2>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li>DSA / Coding — {assessmentScores.dsa}/100</li>
            <li>Technical Quiz — {assessmentScores.technicalQuiz}/100</li>
            <li>Project Assessment — {assessmentScores.projectAssessment}/100</li>
            <li>Interview — {assessmentScores.interview}/100</li>
          </ul>
        </Card>
      </main>
    </>
  );
}

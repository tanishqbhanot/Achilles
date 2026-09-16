import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { projectQuestions } from "../../data/mockData";

export default function ProjectAssessment() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const question = projectQuestions[index];

  function continueNext() {
    if (index < projectQuestions.length - 1) {
      setIndex((i) => i + 1);
      return;
    }
    navigate("/interview");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm text-secondary">Project Assessment</p>
      <h1 className="mt-2 text-3xl font-semibold">{question.projectName}</h1>
      <p className="mt-6 text-sm text-secondary">Question {question.id}</p>
      <p className="mt-3 text-xl leading-8">{question.prompt}</p>

      <textarea
        value={answers[question.id] ?? ""}
        onChange={(e) =>
          setAnswers((a) => ({ ...a, [question.id]: e.target.value }))
        }
        placeholder="Type your answer..."
        className="mt-8 min-h-[180px] w-full resize-none rounded-xl border border-white/10 bg-surface p-4 text-sm outline-none focus:border-accent"
      />

      <Button className="mt-8" onClick={continueNext}>
        Continue
      </Button>
    </div>
  );
}

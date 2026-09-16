import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { quizQuestions } from "../../data/mockData";

export default function TechnicalQuiz() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(6);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [seconds, setSeconds] = useState(18 * 60);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const question = quizQuestions[index];
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="flex items-center justify-between text-sm text-secondary">
        <p>
          Question {index + 1} / {quizQuestions.length}
        </p>
        <p>
          {minutes}:{secs}
        </p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-accent"
          style={{
            width: `${((index + 1) / quizQuestions.length) * 100}%`,
          }}
        />
      </div>

      <h1 className="mt-10 text-2xl font-semibold leading-snug">
        {question.prompt}
      </h1>

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option, i) => {
          const selected = answers[question.id] === i;
          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                setAnswers((a) => ({ ...a, [question.id]: i }))
              }
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                selected
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-white/10 bg-surface text-secondary hover:border-white/20"
              }`}
            >
              <span className="mr-3 text-accent">
                {selected ? "●" : "○"}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          Previous
        </Button>
        {index === quizQuestions.length - 1 ? (
          <Button onClick={() => navigate("/assessment/project")}>
            Submit
          </Button>
        ) : (
          <Button onClick={() => setIndex((i) => i + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
}

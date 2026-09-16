import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { projectQuestions } from "../../data/mockData";

const PREPARATION_SECONDS = 5;

export default function ProjectAssessment() {
  const navigate = useNavigate();

  /*
   * 0 = Question 1
   * 1 = Question 2
   * ...
   */
  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  /*
   * Transition screen before the section starts.
   */
  const [isPreparing, setIsPreparing] = useState(true);

  const [preparationSeconds, setPreparationSeconds] =
    useState(PREPARATION_SECONDS);

  /*
   * Final completion screen.
   */
  const [isCompleted, setIsCompleted] = useState(false);

  /*
   * Always start at the top.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
   * =========================================================
   * PREPARATION COUNTDOWN
   *
   * 5 → 4 → 3 → 2 → 1 → QUESTION 1
   * =========================================================
   */
  useEffect(() => {
    if (!isPreparing) {
      return;
    }

    let current = PREPARATION_SECONDS;

    const timer = window.setInterval(() => {
      current -= 1;

      if (current <= 0) {
        window.clearInterval(timer);

        setPreparationSeconds(0);
        setIsPreparing(false);

        return;
      }

      setPreparationSeconds(current);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPreparing]);

  /*
   * Safety check.
   */
  if (projectQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white">
        <header className="border-b border-white/[0.07] bg-[#101012]">
          <div className="mx-auto flex h-16 max-w-5xl items-center px-5 md:px-8">
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/40 bg-[#151518]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-7 w-7 object-contain"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
                  ACHILLES
                </p>

                <p className="text-xs text-white/45">
                  Technical Assessment
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5">
          <div className="rounded-2xl border border-[#da224b]/20 bg-[#191114] px-8 py-10 text-center">
            <h1 className="text-xl font-semibold text-white">
              Project assessment unavailable
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/45">
              No project questions were found.
            </p>
          </div>
        </main>
      </div>
    );
  }

  /*
   * =========================================================
   * COMPLETION SCREEN
   * =========================================================
   */
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white">
        <header className="border-b border-white/[0.07] bg-[#101012]">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/40 bg-[#151518]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-7 w-7 object-contain"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
                  ACHILLES
                </p>

                <p className="text-xs text-white/45">
                  Technical Assessment
                </p>
              </div>
            </div>

            <p className="text-sm font-medium text-white/45">
              Assessment Complete
            </p>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-12">
          <section className="w-full max-w-2xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#da224b]/30 bg-[#191114]">
              <div className="h-5 w-5 rounded-full bg-[#da224b]" />
            </div>

            <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Thank you for attempting the assessment.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/50 md:text-base">
              Your responses have been recorded successfully.
              Your score will be revealed on your dashboard.
            </p>

            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#da224b]/20 bg-[#191114] p-6 text-left">
              <p className="text-sm font-semibold text-white">
                Assessment submitted
              </p>

              <p className="mt-2 text-sm leading-6 text-white/45">
                You can return to your dashboard to view your
                assessment status and score when it becomes
                available.
              </p>
            </div>

            <div className="mt-10">
              <Button
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                Return to Dashboard
              </Button>
            </div>

          </section>
        </main>
      </div>
    );
  }

  /*
   * =========================================================
   * PREPARATION SCREEN
   * =========================================================
   */
  if (isPreparing) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white">
        <header className="border-b border-white/[0.07] bg-[#101012]">
          <div className="mx-auto flex h-16 items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/40 bg-[#151518]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-7 w-7 object-contain"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
                  ACHILLES
                </p>

                <p className="text-xs text-white/45">
                  Technical Assessment
                </p>
              </div>
            </div>

            <p className="text-sm font-medium text-white/45">
              Project Assessment
            </p>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-12">
          <section className="w-full max-w-2xl text-center">

            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#da224b]">
              Get ready
            </p>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Project Assessment
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/50 md:text-base">
              The previous section is complete. Get ready
              for the project assessment.
            </p>

            <div className="mt-10">
              <p
                key={preparationSeconds}
                className="font-mono text-7xl font-semibold tracking-tight text-[#da224b] md:text-8xl"
              >
                {preparationSeconds}
              </p>
            </div>

            <p className="mt-8 text-sm text-white/35">
              Your first question will appear automatically.
            </p>

          </section>
        </main>
      </div>
    );
  }

  /*
   * =========================================================
   * CURRENT QUESTION
   * =========================================================
   */

  const question = projectQuestions[index];

  const answer =
    answers[question.id] ?? "";

  const progress =
    ((index + 1) /
      projectQuestions.length) *
    100;

  const isFirstQuestion =
    index === 0;

  const isLastQuestion =
    index ===
    projectQuestions.length - 1;

  function handleAnswerChange(
    value: string
  ) {
    setAnswers((current) => ({
      ...current,
      [question.id]: value,
    }));
  }

  function goNext() {
    /*
     * FINAL QUESTION
     *
     * Don't navigate to interview.
     * Show the completion screen instead.
     */
    if (isLastQuestion) {
      setIsCompleted(true);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      return;
    }

    setIndex((current) =>
      Math.min(
        current + 1,
        projectQuestions.length - 1
      )
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  function goPrevious() {
    setIndex((current) =>
      Math.max(0, current - 1)
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-white/[0.07] bg-[#101012]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">

          <div className="flex items-center gap-3.5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/40 bg-[#151518]">
              <img
                src="/achilles-logo.png"
                alt="Achilles"
                className="h-7 w-7 object-contain"
              />
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
                ACHILLES
              </p>

              <p className="text-xs text-white/45">
                Technical Assessment
              </p>
            </div>

          </div>

          <p className="text-sm font-medium text-white/45">
            Project Assessment
          </p>

        </div>
      </header>

      {/* =====================================================
          ASSESSMENT CONTENT
      ===================================================== */}

      <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-12">

        {/* QUESTION NUMBER */}

        <p className="text-sm font-medium text-white/55">
          Question {index + 1} /{" "}
          {projectQuestions.length}
        </p>

        {/* PROGRESS */}

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-[#da224b] transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* CONTENT */}

        <section className="mt-12 max-w-4xl">

          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {question.projectName}
          </h1>

          {/* QUESTION CARD */}

          <div className="mt-8 rounded-2xl border border-[#da224b]/20 bg-[#191114] p-5 md:p-6">

            <p className="text-sm font-medium text-white/40">
              Question {index + 1}
            </p>

            <h2 className="mt-3 text-xl font-semibold leading-8 text-white md:text-2xl">
              {question.prompt}
            </h2>

          </div>

          {/* ANSWER */}

          <div className="mt-8">

            <label
              htmlFor="project-answer"
              className="text-sm font-medium text-white/70"
            >
              Your answer
            </label>

            <textarea
              id="project-answer"
              value={answer}
              onChange={(event) =>
                handleAnswerChange(
                  event.target.value
                )
              }
              placeholder="Type your answer..."
              className="mt-3 min-h-[260px] w-full resize-y rounded-2xl border border-white/[0.10] bg-[#111113] p-5 text-[15px] leading-7 text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/20"
            />

          </div>

          {/* NAVIGATION */}

          <div className="mt-10 flex items-center justify-between">

            <Button
              variant="ghost"
              disabled={isFirstQuestion}
              onClick={goPrevious}
            >
              Previous
            </Button>

            <Button onClick={goNext}>
              {isLastQuestion
                ? "Submit Assessment"
                : "Continue"}
            </Button>

          </div>

        </section>
      </main>
    </div>
  );
}
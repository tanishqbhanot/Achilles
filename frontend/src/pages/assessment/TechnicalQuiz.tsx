import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { quizQuestions } from "../../data/mockData";

const PREPARATION_SECONDS = 5;
const QUIZ_DURATION_SECONDS = 18 * 60;

export default function TechnicalQuiz() {
  const navigate = useNavigate();

  /*
   * Start at question 1.
   *
   * JavaScript arrays are zero-indexed, so:
   * index 0 = Question 1
   * index 1 = Question 2
   * ...
   */
  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState<
    Record<number, number>
  >({});

  /*
   * The quiz timer starts only after the
   * 5-second preparation screen finishes.
   */
  const [seconds, setSeconds] = useState(
    QUIZ_DURATION_SECONDS
  );

  const [isPreparing, setIsPreparing] =
    useState(true);

  const [preparationSeconds, setPreparationSeconds] =
    useState(PREPARATION_SECONDS);

  /*
   * Scroll to top when the quiz opens.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
   * Preparation countdown.
   *
   * This happens BEFORE the actual quiz timer begins.
   */
  useEffect(() => {
    if (!isPreparing) {
      return;
    }

    if (preparationSeconds <= 0) {
      setIsPreparing(false);
      setSeconds(QUIZ_DURATION_SECONDS);
      return;
    }

    const timer = window.setTimeout(() => {
      setPreparationSeconds(
        (current) => current - 1
      );
    }, 1000);

    return () =>
      window.clearTimeout(timer);
  }, [
    isPreparing,
    preparationSeconds,
  ]);

  /*
   * Quiz timer.
   *
   * It does not run during the preparation phase.
   */
  useEffect(() => {
    if (isPreparing) {
      return;
    }

    if (seconds <= 0) {
      navigate("/assessment/project");
      return;
    }

    const timer = window.setInterval(() => {
      setSeconds(
        (current) =>
          Math.max(0, current - 1)
      );
    }, 1000);

    return () =>
      window.clearInterval(timer);
  }, [
    isPreparing,
    seconds,
    navigate,
  ]);

  /*
   * Safety check in case the question data
   * is empty.
   */
  if (!quizQuestions.length) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white">
        <header className="border-b border-white/[0.07] bg-[#101012]">
          <div className="flex h-16 items-center px-5 md:px-8">
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
              No quiz questions available
            </h1>

            <p className="mt-3 text-sm text-white/45">
              The technical quiz could not be loaded.
            </p>
          </div>
        </main>
      </div>
    );
  }

  /*
   * Preparation screen
   */
  if (isPreparing) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white">
        <header className="border-b border-white/[0.07] bg-[#101012]">
          <div className="flex h-16 items-center justify-between px-5 md:px-8">
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
              Next section
            </p>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-12">
          <section className="w-full max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#da224b]">
              Get ready
            </p>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Technical Quiz
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/50 md:text-base">
              The previous assessment section is complete.
              Your quiz will begin automatically.
            </p>

            <div className="mt-10">
              <p
                key={preparationSeconds}
                className="font-mono text-7xl font-semibold tracking-tight text-[#da224b] md:text-8xl"
              >
                {preparationSeconds}
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-md rounded-xl border border-[#da224b]/20 bg-[#191114] px-5 py-4 text-left">
              <p className="text-sm font-semibold text-white">
                Technical quiz is ready
              </p>

              <p className="mt-1.5 text-sm leading-6 text-white/45">
                You will have {Math.floor(
                  QUIZ_DURATION_SECONDS / 60
                )} minutes to complete all questions.
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const question = quizQuestions[index];

  const minutes = Math.floor(
    seconds / 60
  )
    .toString()
    .padStart(2, "0");

  const secs = (seconds % 60)
    .toString()
    .padStart(2, "0");

  const progress =
    ((index + 1) /
      quizQuestions.length) *
    100;

  const selectedAnswer =
    answers[question.id];

  const isLastQuestion =
    index === quizQuestions.length - 1;

  function selectAnswer(optionIndex: number) {
    setAnswers((current) => ({
      ...current,
      [question.id]: optionIndex,
    }));
  }

  function goNext() {
    if (isLastQuestion) {
      navigate("/assessment/project");
      return;
    }

    setIndex(
      (current) =>
        Math.min(
          quizQuestions.length - 1,
          current + 1
        )
    );

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }

  function goPrevious() {
    setIndex(
      (current) =>
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
            Technical Quiz
          </p>

        </div>
      </header>

      {/* =====================================================
          QUIZ
      ===================================================== */}

      <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-12">

        {/* TOP INFO */}

        <div className="flex items-center justify-between gap-6">

          <p className="text-sm font-medium text-white/55">
            Question {index + 1} /{" "}
            {quizQuestions.length}
          </p>

          <p className="font-mono text-sm font-medium text-white">
            {minutes}:{secs}
          </p>

        </div>

        {/* PROGRESS */}

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">

          <div
            className="h-full rounded-full bg-[#da224b] transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        {/* QUESTION */}

        <section className="mt-12 max-w-4xl">

          

          <h1 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl">
            {question.prompt}
          </h1>

          {/* OPTIONS */}

          <div className="mt-9 flex flex-col gap-3">

            {question.options.map(
              (option, optionIndex) => {

                const selected =
                  selectedAnswer ===
                  optionIndex;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      selectAnswer(
                        optionIndex
                      )
                    }
                    className={`w-full rounded-xl border px-5 py-4 text-left text-[15px] transition-all duration-200 ${
                      selected
                        ? "border-[#da224b]/70 bg-[#191114] text-white"
                        : "border-white/[0.09] bg-[#151517] text-white/55 hover:border-[#da224b]/30 hover:bg-[#191114] hover:text-white/80"
                    }`}
                  >
                    <div className="flex items-center gap-4">

                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          selected
                            ? "border-[#da224b]"
                            : "border-white/30"
                        }`}
                      >
                        {selected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#da224b]" />
                        )}
                      </span>

                      <span className="leading-6">
                        {option}
                      </span>

                    </div>
                  </button>
                );
              }
            )}

          </div>

          {/* NAVIGATION */}

          <div className="mt-10 flex items-center justify-between">

            <Button
              variant="ghost"
              disabled={index === 0}
              onClick={
                goPrevious
              }
            >
              Previous
            </Button>

            <Button
              onClick={goNext}
            >
              {isLastQuestion
                ? "Submit"
                : "Next"}
            </Button>

          </div>

        </section>

      </main>
    </div>
  );
}
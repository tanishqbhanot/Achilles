import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import { projectQuestions } from "../../data/mockData";
import { useAppStore } from "../../store/appStore";

const PREPARATION_SECONDS = 5;

export default function ProjectAssessment() {
  const navigate = useNavigate();

  const { completeProject } = useAppStore();

  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  const [isPreparing, setIsPreparing] =
    useState(true);

  const [preparationSeconds, setPreparationSeconds] =
    useState(PREPARATION_SECONDS);

  const [isCompleted, setIsCompleted] =
    useState(false);

  /*
   * =========================================================
   * ALWAYS START AT THE TOP
   * =========================================================
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /*
   * =========================================================
   * 5 SECOND PREPARATION
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
   * =========================================================
   * SAFETY CHECK
   * =========================================================
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

              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
                ACHILLES
              </p>
            </div>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5">
          <div className="text-center">
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
   *
   * This screen remains inside fullscreen.
   * Fullscreen is exited ONLY when the candidate clicks
   * "Return to Dashboard".
   * =========================================================
   */
  if (isCompleted) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#0b0b0d] text-white">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="relative z-30 border-b border-white/[0.07] bg-[#101012]">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">

            <div className="flex items-center gap-3.5">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/40 bg-[#151518]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-7 w-7 object-contain"
                />
              </div>

              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
                ACHILLES
              </p>

            </div>

            <p className="text-sm font-medium text-white/45">
              Assessment Complete
            </p>

          </div>
        </header>

        {/* =====================================================
            COMPLETION AREA
        ===================================================== */}

        <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-12">

          {/* =================================================
              BACKGROUND ATMOSPHERE
          ================================================= */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute left-1/2 top-[30%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#da224b]/[0.035] blur-[90px]" />
          </div>

          {/* =================================================
              SCREEN FLASH
          ================================================= */}

          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.85, 0] }}
            transition={{
              duration: 0.4,
              delay: 0.55,
              times: [0, 0.4, 0.55, 1],
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 z-40 bg-white"
          />

          <section className="relative z-10 w-full max-w-4xl text-center">

            {/* =================================================
                SPARTAN / SLASH REVEAL
            ================================================= */}

            <div className="relative mx-auto h-[260px] w-full max-w-[780px]">

              {/* Back glow */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.4,
                }}
                animate={{
                  opacity: [0, 0, 0.9, 0.25],
                  scale: [0.4, 0.4, 1.15, 1],
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.5,
                  times: [0, 0.5, 0.78, 1],
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#da224b]/15 blur-3xl"
              />

              {/* Shockwave ring */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.2,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0.2, 2.6],
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.55,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 z-20 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#da224b]/60"
              />

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.2,
                }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0.2, 3.4],
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.6,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 z-20 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
              />

              {/* =================================================
                  SWORD SLASH 1
                  Slower than before
              ================================================= */}

              <motion.div
                initial={{
                  x: -460,
                  y: -280,
                  rotate: -34,
                  opacity: 0,
                  scaleX: 0.4,
                }}
                animate={{
                  x: 460,
                  y: 280,
                  rotate: -34,
                  opacity: [0, 1, 1, 0],
                  scaleX: [0.4, 1, 1, 1],
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.14,
                  times: [0, 0.3, 0.78, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-1/2 top-1/2 z-30 h-[5px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  boxShadow:
                    "0 0 22px 3px rgba(255,255,255,0.55)",
                }}
              />

              {/* =================================================
                  SWORD SLASH 2
              ================================================= */}

              <motion.div
                initial={{
                  x: 460,
                  y: -280,
                  rotate: 34,
                  opacity: 0,
                  scaleX: 0.4,
                }}
                animate={{
                  x: -460,
                  y: 280,
                  rotate: 34,
                  opacity: [0, 1, 1, 0],
                  scaleX: [0.4, 1, 1, 1],
                }}
                transition={{
                  duration: 0.65,
                  delay: 0.42,
                  times: [0, 0.3, 0.78, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-1/2 top-1/2 z-30 h-[5px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#da224b] to-transparent"
                style={{
                  boxShadow:
                    "0 0 22px 3px rgba(218,34,75,0.6)",
                }}
              />

              {/* =================================================
                  ACHILLES SPARTAN LOGO
              ================================================= */}

              <motion.div
                initial={{
                  scale: 0.15,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  scale: [
                    0.15,
                    0.15,
                    1.22,
                    0.96,
                    1.04,
                    1,
                  ],
                  opacity: [
                    0,
                    0,
                    1,
                    1,
                    1,
                    1,
                  ],
                  rotate: [
                    0,
                    0,
                    -3,
                    2,
                    -1,
                    0,
                  ],
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.7,
                  times: [
                    0,
                    0.35,
                    0.55,
                    0.72,
                    0.86,
                    1,
                  ],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-1/2 top-1/2 z-40 flex h-[155px] w-[155px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              >

                <div className="absolute inset-5 rounded-full border border-[#da224b]/30 bg-[#0b0b0d]/60 shadow-[0_0_70px_rgba(218,34,75,0.18)]" />

                <img
                  src="/achilles-logo.png"
                  alt="Achilles Spartan"
                  className="relative z-10 h-[130px] w-[130px] object-contain drop-shadow-[0_14px_32px_rgba(0,0,0,0.7)]"
                />

              </motion.div>

              {/* =================================================
                  IMPACT PARTICLES
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: -135,
                  y: -90,
                  scale: [0, 1, 0.3],
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                }}
                className="absolute left-1/2 top-1/2 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-white"
              />

              <motion.div
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.9, 0],
                  x: 150,
                  y: -55,
                  scale: [0, 0.85, 0.2],
                }}
                transition={{
                  delay: 0.82,
                  duration: 0.55,
                }}
                className="absolute left-1/2 top-1/2 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-[#da224b]"
              />

              <motion.div
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  x: 100,
                  y: 95,
                  scale: [0, 0.9, 0.2],
                }}
                transition={{
                  delay: 0.84,
                  duration: 0.6,
                }}
                className="absolute left-1/2 top-1/2 z-50 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-[#da224b]/70"
              />

              <motion.div
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  x: -105,
                  y: 100,
                  scale: [0, 0.8, 0.2],
                }}
                transition={{
                  delay: 0.86,
                  duration: 0.55,
                }}
                className="absolute left-1/2 top-1/2 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-white/50"
              />

            </div>

            {/* =================================================
                COMPLETION COPY
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.3,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <h1 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                Thank you for completing the assessment.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/50 md:text-base">
                Your responses have been recorded successfully.
                Your score will be revealed on your dashboard.
              </p>

            </motion.div>

            {/* =================================================
                RETURN TO DASHBOARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.55,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10"
            >
              <Button
                onClick={async () => {
                  try {
                    if (document.fullscreenElement) {
                      await document.exitFullscreen();
                    }
                  } catch {
                    // Continue to dashboard even if fullscreen exit fails.
                  } finally {
                    navigate("/dashboard");
                  }
                }}
              >
                Return to Dashboard
              </Button>
            </motion.div>

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

          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">

            <div className="flex items-center gap-3.5">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/40 bg-[#151518]">

                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-7 w-7 object-contain"
                />

              </div>

              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
                ACHILLES
              </p>

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

  const question =
    projectQuestions[index];

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

  async function goNext() {
    /*
     * FINAL QUESTION
     *
     * Keep the candidate in the assessment fullscreen.
     * Show the completion animation.
     *
     * Fullscreen is exited only when they press
     * Return to Dashboard.
     */
    if (isLastQuestion) {
      completeProject();

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

  /*
   * =========================================================
   * QUESTION SCREEN
   * =========================================================
   */

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

            <p className="text-[11px] font-semibold tracking-[0.26em] text-[#da224b]">
              ACHILLES
            </p>

          </div>

          <p className="text-sm font-medium text-white/45">
            Project Assessment
          </p>

        </div>

      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-12">

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

        {/* =================================================
            QUESTION
        ================================================= */}

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

          {/* =================================================
              ANSWER
          ================================================= */}

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

          {/* =================================================
              NAVIGATION
          ================================================= */}

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
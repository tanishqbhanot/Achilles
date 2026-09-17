import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Topbar from "../../components/layout/Topbar";

import { useAppStore } from "../../store/appStore";

export default function AssessmentOverview() {
  const navigate =
    useNavigate();

  const {
    assessment,
    startAssessment,
  } = useAppStore();

  const isComplete =
    assessment.status ===
    "completed";

  const isInProgress =
    assessment.status ===
    "in_progress";

  function startOrContinue() {
    if (
      assessment.status ===
      "not_started"
    ) {
      startAssessment();

      navigate(
        "/assessment"
      );

      return;
    }

    if (
      assessment.currentSection ===
      "dsa"
    ) {
      navigate(
        "/assessment/dsa"
      );

      return;
    }

    if (
      assessment.currentSection ===
      "quiz"
    ) {
      navigate(
        "/assessment/quiz"
      );

      return;
    }

    if (
      assessment.currentSection ===
      "project"
    ) {
      navigate(
        "/assessment/project"
      );

      return;
    }

    navigate(
      "/assessment"
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">

      <Topbar
        title="Assessment"
        subtitle="Complete your technical evaluation through one guided assessment."
      />

      <main className="flex min-h-[calc(100vh-82px)] items-center justify-center px-5 py-10 md:px-8">

        <section className="w-full max-w-2xl">

          {/* =================================================
              MAIN CARD
          ================================================= */}

          <Card className="relative overflow-hidden border-[#da224b]/20 bg-[#191114] p-7 md:p-9">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-80px] top-[-100px] h-[260px] w-[260px] rounded-full bg-[#da224b]/[0.055] blur-[90px]"
            />

            <div className="relative">

              {/* LOGO */}

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#da224b]/30 bg-[#151114]">

                  <img
                    src="/achilles-logo.png"
                    alt="Achilles"
                    className="h-10 w-10 object-contain"
                  />

                </div>

                <p className="text-[12px] font-semibold tracking-[0.28em] text-[#da224b]">
                  ACHILLES
                </p>

              </div>

              {/* CONTENT */}

              <h1 className="mt-9 text-3xl font-semibold tracking-tight text-white md:text-4xl">

                {isComplete
                  ? "Assessment complete."
                  : isInProgress
                    ? "Continue your assessment."
                    : "Technical Assessment"}

              </h1>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/45">

                {isComplete
                  ? "Your assessment has been submitted. Your evaluated score will appear on your dashboard when it becomes available."
                  : isInProgress
                    ? "Continue from the assessment round where you left off."
                    : "One guided assessment covering coding, technical knowledge, and project understanding."}

              </p>

              {/* ROUNDS */}

              {!isComplete && (
                <div className="mt-8 grid gap-3">

                  <div className="rounded-xl border border-white/[0.07] bg-[#111113] p-4">

                    <p className="text-sm font-medium text-white">
                      DSA / Coding
                    </p>

                    <p className="mt-1 text-sm text-white/35">
                      Coding problem in your selected language.
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-[#111113] p-4">

                    <p className="text-sm font-medium text-white">
                      Technical Quiz
                    </p>

                    <p className="mt-1 text-sm text-white/35">
                      Technical questions based on your profile.
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-[#111113] p-4">

                    <p className="text-sm font-medium text-white">
                      Project Assessment
                    </p>

                    <p className="mt-1 text-sm text-white/35">
                      Questions about your projects and technical decisions.
                    </p>

                  </div>

                </div>
              )}

              {/* ACTION */}

              {!isComplete && (
                <div className="mt-8">

                  <Button
                    onClick={
                      startOrContinue
                    }
                  >
                    {assessment.status ===
                    "not_started"
                      ? "Start Assessment"
                      : "Continue Assessment"}

                    <ArrowRight
                      size={16}
                      className="ml-2"
                    />

                  </Button>

                </div>
              )}

              {isComplete && (
                <div className="mt-8">

                  <Button
                    onClick={() =>
                      navigate(
                        "/dashboard"
                      )
                    }
                  >
                    Return to Dashboard

                    <ArrowRight
                      size={16}
                      className="ml-2"
                    />

                  </Button>

                </div>
              )}

            </div>

          </Card>

        </section>

      </main>

    </div>
  );
}
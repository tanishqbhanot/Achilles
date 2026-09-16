import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

type CheckStatus = "checking" | "passed" | "failed";

type RequirementCheck = {
  id: string;
  title: string;
  description: string;
  status: CheckStatus;
  detail: string;
};

const INITIAL_CHECKS: RequirementCheck[] = [
  {
    id: "browser",
    title: "Browser compatibility",
    description: "Your browser supports the features required for the assessment.",
    status: "checking",
    detail: "Checking browser capabilities...",
  },
  {
    id: "internet",
    title: "Internet connection",
    description: "A stable internet connection is required during the assessment.",
    status: "checking",
    detail: "Checking connection...",
  },
  {
    id: "screen",
    title: "Screen size",
    description: "Your window must be large enough to use the coding workspace comfortably.",
    status: "checking",
    detail: "Checking viewport size...",
  },
  {
    id: "fullscreen",
    title: "Fullscreen support",
    description: "Your browser must support fullscreen mode for the coding workspace.",
    status: "checking",
    detail: "Checking fullscreen support...",
  },
];

const MIN_WIDTH = 1024;
const MIN_HEIGHT = 650;
const READY_COUNTDOWN = 5;

export default function SystemRequirements() {
  const navigate = useNavigate();

  const [checks, setChecks] = useState<RequirementCheck[]>(INITIAL_CHECKS);
  const [checking, setChecking] = useState(true);
  const [readyPhase, setReadyPhase] = useState(false);
  const [countdown, setCountdown] = useState(READY_COUNTDOWN);

  const allPassed = useMemo(
    () => checks.every((check) => check.status === "passed"),
    [checks]
  );

  const hasFailed = useMemo(
    () => checks.some((check) => check.status === "failed"),
    [checks]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    runChecks();

    function handleOnlineStatus() {
      if (!readyPhase) {
        runChecks();
      }
    }

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, [readyPhase]);

  useEffect(() => {
    if (!readyPhase) {
      return;
    }

    if (countdown <= 0) {
      navigate("/assessment/dsa");
      return;
    }

    const timer = window.setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown, navigate, readyPhase]);

  async function runChecks() {
    if (readyPhase) {
      return;
    }

    setChecking(true);

    setChecks((previous) =>
      previous.map((check) => ({
        ...check,
        status: "checking",
        detail: "Checking...",
      }))
    );

    /*
     * Small delay so the candidate can actually see the
     * system-check state instead of getting an instant flash.
     */
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    const browserPassed =
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      "Promise" in window &&
      "fetch" in window &&
      "localStorage" in window;

    const internetPassed = navigator.onLine;

    const screenPassed =
      window.innerWidth >= MIN_WIDTH &&
      window.innerHeight >= MIN_HEIGHT;

    const fullscreenPassed =
      typeof document !== "undefined" &&
      typeof document.documentElement.requestFullscreen === "function";

    setChecks([
      {
        id: "browser",
        title: "Browser compatibility",
        description:
          "Your browser supports the features required for the assessment.",
        status: browserPassed ? "passed" : "failed",
        detail: browserPassed
          ? "Browser is compatible."
          : "Your browser does not support all required features.",
      },
      {
        id: "internet",
        title: "Internet connection",
        description:
          "A stable internet connection is required during the assessment.",
        status: internetPassed ? "passed" : "failed",
        detail: internetPassed
          ? "Connection is available."
          : "No active internet connection detected.",
      },
      {
        id: "screen",
        title: "Screen size",
        description:
          "Your window must be large enough to use the coding workspace comfortably.",
        status: screenPassed ? "passed" : "failed",
        detail: screenPassed
          ? `${window.innerWidth} × ${window.innerHeight} viewport detected.`
          : `Resize your window to at least ${MIN_WIDTH} × ${MIN_HEIGHT}.`,
      },
      {
        id: "fullscreen",
        title: "Fullscreen support",
        description:
          "Your browser must support fullscreen mode for the coding workspace.",
        status: fullscreenPassed ? "passed" : "failed",
        detail: fullscreenPassed
          ? "Fullscreen mode is supported."
          : "Fullscreen mode is not available in this browser.",
      },
    ]);

    setChecking(false);
  }

  async function startAssessment() {
    if (!allPassed || checking) {
      return;
    }

    /*
     * Fullscreen requests must happen from a user interaction.
     * This is why we trigger it from the Continue button.
     */
    try {
      if (
        !document.fullscreenElement &&
        typeof document.documentElement.requestFullscreen === "function"
      ) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      /*
       * We don't block the candidate if fullscreen is denied
       * by the browser. The requirement itself already passed.
       */
    }

    setCountdown(READY_COUNTDOWN);
    setReadyPhase(true);
  }

  function retryChecks() {
    setReadyPhase(false);
    setCountdown(READY_COUNTDOWN);
    runChecks();
  }

  if (readyPhase) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white">
        <header className="border-b border-white/[0.07] bg-[#101012]">
          <div className="flex h-16 items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/35 bg-[#151518]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-7 w-7 object-contain"
                />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-[#da224b]">
                  ACHILLES
                </p>
                <p className="text-sm text-white/45">
                  Technical Assessment
                </p>
              </div>
            </div>

            <p className="text-sm font-medium text-white/55">
              System check complete
            </p>
          </div>
        </header>

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-5 py-12">
          <section className="w-full max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#da224b]">
              Get ready
            </p>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Your coding round starts in
            </h1>

            <div className="mt-10">
              <p
                key={countdown}
                className="font-mono text-7xl font-semibold tracking-tight text-[#da224b] md:text-8xl"
              >
                {countdown}
              </p>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-[15px] leading-7 text-white/50 md:text-base">
              Get comfortable, make sure you are ready to code, and stay on
              this screen. The assessment will begin automatically.
            </p>

            <div className="mx-auto mt-10 max-w-md rounded-xl border border-[#da224b]/20 bg-[#191114] px-5 py-4 text-left">
              <p className="text-sm font-medium text-white">
                Assessment environment ready
              </p>
              <p className="mt-1.5 text-sm leading-6 text-white/45">
                Your coding workspace will open next.
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <header className="border-b border-white/[0.07] bg-[#101012]">
        <div className="flex min-h-16 items-center justify-between gap-6 px-5 py-3 md:px-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#da224b]/35 bg-[#151518]">
              <img
                src="/achilles-logo.png"
                alt="Achilles"
                className="h-7 w-7 object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#da224b]">
                ACHILLES
              </p>
              <p className="text-sm text-white/45">
                Technical Assessment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-white/50">
              Step 4 of 4
            </p>

            <div className="hidden h-1.5 w-28 gap-1 sm:flex">
              <span className="flex-1 rounded-full bg-[#da224b]" />
              <span className="flex-1 rounded-full bg-[#da224b]" />
              <span className="flex-1 rounded-full bg-[#da224b]" />
              <span className="flex-1 rounded-full bg-[#da224b]" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#da224b]">
            System requirements
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Check your assessment environment
          </h1>

          <p className="mt-4 text-[15px] leading-7 text-white/50 md:text-base">
            Achilles will automatically verify that your browser and device
            are ready for the coding round.
          </p>
        </div>

        <section className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-[#da224b]/20 bg-[#191114]">
            {checks.map((check, index) => {
              const statusText =
                check.status === "checking"
                  ? "Checking"
                  : check.status === "passed"
                    ? "Passed"
                    : "Failed";

              const statusClass =
                check.status === "passed"
                  ? "text-[#da224b]"
                  : check.status === "failed"
                    ? "text-white/75"
                    : "text-white/45";

              return (
                <div
                  key={check.id}
                  className={`px-5 py-5 md:px-6 ${
                    index !== checks.length - 1
                      ? "border-b border-white/[0.07]"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-xl">
                      <h2 className="text-base font-semibold text-white md:text-lg">
                        {check.title}
                      </h2>

                      <p className="mt-1.5 text-sm leading-6 text-white/45 md:text-[15px]">
                        {check.description}
                      </p>

                      <p className="mt-3 text-sm text-white/55">
                        {check.detail}
                      </p>
                    </div>

                    <div
                      className={`shrink-0 text-sm font-semibold ${statusClass}`}
                    >
                      {statusText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 rounded-xl border border-white/[0.07] bg-[#111113] px-5 py-4 md:px-6">
          {checking ? (
            <p className="text-sm leading-6 text-white/50">
              Checking your environment. This should only take a moment.
            </p>
          ) : hasFailed ? (
            <p className="text-sm leading-6 text-white/55">
              Resolve the failed requirement above, then run the checks again.
            </p>
          ) : (
            <p className="text-sm font-semibold leading-6 text-white">
              Your assessment environment is ready.
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {!checking && hasFailed && (
              <Button variant="outline" onClick={retryChecks}>
                Retry Checks
              </Button>
            )}
          </div>

          <Button
            onClick={startAssessment}
            disabled={checking || !allPassed}
          >
            Continue to Assessment
          </Button>
        </div>
      </main>
    </div>
  );
}
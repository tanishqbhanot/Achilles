import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  ChevronDown,
  Maximize2,
  Minimize2,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/ui/Button";
import { dsaProblem } from "../../data/mockData";

type TestStatus = "idle" | "pass" | "fail" | "running";

type LanguageKey =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp"
  | "c"
  | "csharp"
  | "go";

type LanguageConfig = {
  label: string;
  monaco: string;
  starterCode: string;
};

const languageConfigs: Record<
  LanguageKey,
  LanguageConfig
> = {
  javascript: {
    label: "JavaScript",
    monaco: "javascript",
    starterCode: `function twoSumClosest(nums, target) {
  // Write your solution here

  return [];
}`,
  },

  typescript: {
    label: "TypeScript",
    monaco: "typescript",
    starterCode: `function twoSumClosest(
  nums: number[],
  target: number
): number[] {
  // Write your solution here

  return [];
}`,
  },

  python: {
    label: "Python",
    monaco: "python",
    starterCode: `def two_sum_closest(nums, target):
    # Write your solution here

    return []`,
  },

  java: {
    label: "Java",
    monaco: "java",
    starterCode: `class Solution {
    public int[] twoSumClosest(
        int[] nums,
        int target
    ) {
        // Write your solution here

        return new int[0];
    }
}`,
  },

  cpp: {
    label: "C++",
    monaco: "cpp",
    starterCode: `class Solution {
public:
    vector<int> twoSumClosest(
        vector<int>& nums,
        int target
    ) {
        // Write your solution here

        return {};
    }
};`,
  },

  c: {
    label: "C",
    monaco: "c",
    starterCode: `int* twoSumClosest(
    int* nums,
    int numsSize,
    int target,
    int* returnSize
) {
    // Write your solution here

    *returnSize = 0;
    return NULL;
}`,
  },

  csharp: {
    label: "C#",
    monaco: "csharp",
    starterCode: `public class Solution
{
    public int[] TwoSumClosest(
        int[] nums,
        int target
    )
    {
        // Write your solution here

        return Array.Empty<int>();
    }
}`,
  },

  go: {
    label: "Go",
    monaco: "go",
    starterCode: `func twoSumClosest(
    nums []int,
    target int,
) []int {
    // Write your solution here

    return []int{}
}`,
  },
};

const languageKeys: LanguageKey[] = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "csharp",
  "go",
];

export default function DsaAssessment() {
  const navigate = useNavigate();
  const workspaceRef =
    useState<HTMLDivElement | null>(null)[0];

  const [language, setLanguage] =
    useState<LanguageKey>("javascript");

  const [codeByLanguage, setCodeByLanguage] =
    useState<Record<LanguageKey, string>>(() => ({
      javascript:
        dsaProblem.starterCode ||
        languageConfigs.javascript.starterCode,

      typescript:
        languageConfigs.typescript.starterCode,

      python:
        languageConfigs.python.starterCode,

      java:
        languageConfigs.java.starterCode,

      cpp:
        languageConfigs.cpp.starterCode,

      c:
        languageConfigs.c.starterCode,

      csharp:
        languageConfigs.csharp.starterCode,

      go:
        languageConfigs.go.starterCode,
    }));

  const [tests, setTests] = useState(
    dsaProblem.tests.map((test) => ({
      ...test,
      status: "idle" as TestStatus,
    }))
  );

  const [activeProblemTab, setActiveProblemTab] =
    useState<"problem" | "examples">("problem");

  const [activeBottomTab, setActiveBottomTab] =
    useState<"tests" | "terminal">("tests");

  const [terminalOpen, setTerminalOpen] =
    useState(false);

  const [executionTemplateOpen, setExecutionTemplateOpen] =
    useState(false);

  const [terminalOutput, setTerminalOutput] =
    useState<string[]>([
      "Achilles coding environment ready.",
      "Write your solution and run the test cases.",
    ]);

  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const [isRunning, setIsRunning] =
    useState(false);

  const currentCode =
    codeByLanguage[language];

  const passed = useMemo(
    () =>
      tests.filter(
        (test) => test.status === "pass"
      ).length,
    [tests]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds(
        (current) => current + 1
      );
    }, 1000);

    return () =>
      window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(
        document.fullscreenElement !== null
      );
    }

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  function formatTime(seconds: number) {
    const minutes = Math.floor(
      seconds / 60
    );

    const remainingSeconds =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(
      2,
      "0"
    )}`;
  }

  function handleCodeChange(
    value: string
  ) {
    setCodeByLanguage(
      (previous) => ({
        ...previous,
        [language]: value,
      })
    );
  }

  function handleLanguageChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    const nextLanguage =
      event.target.value as LanguageKey;

    if (!languageConfigs[nextLanguage]) {
      return;
    }

    setLanguage(nextLanguage);

    setTerminalOutput([
      `> Language changed to ${languageConfigs[nextLanguage].label}.`,
      "> Your saved solution for this language has been loaded.",
    ]);
  }

  function runCode() {
    if (isRunning) {
      return;
    }

    if (!currentCode.trim()) {
      setActiveBottomTab("terminal");
      setTerminalOpen(true);

      setTerminalOutput([
        "> No solution code found.",
        "> Write your solution before running the test cases.",
      ]);

      return;
    }

    setIsRunning(true);
    setActiveBottomTab("tests");
    setTerminalOpen(true);

    setTests((previous) =>
      previous.map((test) => ({
        ...test,
        status: "running",
      }))
    );

    setTerminalOutput([
      `> Running solution in ${languageConfigs[language].label}...`,
      "> Preparing test environment...",
      "> Compiling solution...",
      "> Running test cases...",
    ]);

    /*
     * Prototype simulation.
     * Replace this with the actual execution API later.
     */
    window.setTimeout(() => {
      setTests((previous) =>
        previous.map((test) => ({
          ...test,
          status: "pass",
        }))
      );

      setTerminalOutput([
        `> Running solution in ${languageConfigs[language].label}...`,
        "> Preparing test environment...",
        "> Compiling solution...",
        "> Running test cases...",
        `> ${dsaProblem.tests.length}/${dsaProblem.tests.length} test cases passed.`,
        "> Execution completed.",
      ]);

      setIsRunning(false);
    }, 1400);
  }

  function submitCode() {
    if (isRunning) {
      return;
    }

    if (!currentCode.trim()) {
      setActiveBottomTab("terminal");
      setTerminalOpen(true);

      setTerminalOutput([
        "> No solution code found.",
        "> Write your solution before submitting.",
      ]);

      return;
    }

    setIsRunning(true);
    setTerminalOpen(true);
    setActiveBottomTab("tests");

    setTests((previous) =>
      previous.map((test) => ({
        ...test,
        status: "running",
      }))
    );

    setTerminalOutput([
      `> Submitting solution in ${languageConfigs[language].label}...`,
      "> Preparing full evaluation...",
      "> Running hidden test cases...",
    ]);

    window.setTimeout(() => {
      setTests((previous) =>
        previous.map((test, index) => ({
          ...test,
          status:
            index === 3 ? "fail" : "pass",
        }))
      );

      setTerminalOutput([
        `> Submission evaluated in ${languageConfigs[language].label}.`,
        "> Hidden test evaluation completed.",
        "> One or more test cases failed.",
      ]);

      setIsRunning(false);

      window.setTimeout(() => {
        navigate("/assessment/quiz");
      }, 900);
    }, 1400);
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setIsFullscreen(false);
    }
  }

  return (
    <div
      className="h-screen overflow-hidden bg-[#0b0b0d] text-white"
    >
      {/* =====================================================
          TOP ASSESSMENT BAR
      ===================================================== */}

      <header className="h-16 border-b border-white/[0.07] bg-[#101012]">

        <div className="flex h-full items-center justify-between px-5 md:px-7">

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

          <div className="hidden items-center gap-6 lg:flex">

            <div className="text-right">

              <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                Problem
              </p>

              <p className="mt-0.5 text-sm font-medium text-white">
                1 of 1
              </p>

            </div>

            <div className="h-7 w-px bg-white/[0.08]" />

            <div className="text-right">

              <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                Time
              </p>

              <p className="mt-0.5 font-mono text-sm font-medium text-white">
                {formatTime(
                  elapsedSeconds
                )}
              </p>

            </div>

          </div>

          <div className="font-mono text-sm text-white/60 lg:hidden">
            {formatTime(
              elapsedSeconds
            )}
          </div>

        </div>

      </header>

      {/* =====================================================
          COMPLETE ASSESSMENT AREA
      ===================================================== */}

      <main className="grid h-[calc(100vh-64px)] min-h-0 lg:grid-cols-[390px_minmax(0,1fr)]">

        {/* ===================================================
            PROBLEM PANEL
        =================================================== */}

        <aside className="min-h-0 overflow-y-auto border-r border-white/[0.07] bg-[#131013]">

          <div className="border-b border-white/[0.07] px-6 py-5">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#da224b]">
                  Problem
                </p>

                <h1 className="mt-2 text-xl font-semibold text-white">
                  {dsaProblem.title}
                </h1>

              </div>

              <span className="rounded-md border border-[#da224b]/20 bg-[#201519] px-2.5 py-1 text-xs font-medium text-[#da224b]">
                {dsaProblem.difficulty}
              </span>

            </div>

          </div>

          <div className="flex border-b border-white/[0.07] px-6">

            <button
              type="button"
              onClick={() =>
                setActiveProblemTab(
                  "problem"
                )
              }
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeProblemTab ===
                "problem"
                  ? "border-[#da224b] text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              Problem
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveProblemTab(
                  "examples"
                )
              }
              className={`ml-6 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeProblemTab ===
                "examples"
                  ? "border-[#da224b] text-white"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              Examples
            </button>

          </div>

          <div className="px-6 py-6">

            {activeProblemTab ===
            "problem" ? (

              <motion.div
                key="problem"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                <p className="text-[15px] leading-7 text-white/65">
                  {
                    dsaProblem.statement
                  }
                </p>

                <div className="mt-8">

                  <h2 className="text-sm font-semibold text-white">
                    Examples
                  </h2>

                  <div className="mt-3 flex flex-col gap-3">

                    {dsaProblem.examples.map(
                      (
                        example
                      ) => (
                        <div
                          key={
                            example.input
                          }
                          className="rounded-xl border border-white/[0.08] bg-[#111113] p-4"
                        >

                          <div className="space-y-2 font-mono text-xs leading-5">

                            <p>

                              <span className="text-white/35">
                                Input
                              </span>{" "}

                              <span className="text-white/75">
                                {
                                  example.input
                                }
                              </span>

                            </p>

                            <p>

                              <span className="text-white/35">
                                Output
                              </span>{" "}

                              <span className="text-white/75">
                                {
                                  example.output
                                }
                              </span>

                            </p>

                          </div>

                          <p className="mt-3 text-sm leading-6 text-white/45">
                            {
                              example.explanation
                            }
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>

                <div className="mt-8">

                  <h2 className="text-sm font-semibold text-white">
                    Constraints
                  </h2>

                  <ul className="mt-3 space-y-2">

                    {dsaProblem.constraints.map(
                      (
                        constraint
                      ) => (
                        <li
                          key={
                            constraint
                          }
                          className="text-sm leading-6 text-white/50"
                        >
                          {
                            constraint
                          }
                        </li>
                      )
                    )}

                  </ul>

                </div>

              </motion.div>

            ) : (

              <motion.div
                key="examples"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
              >

                <h2 className="text-sm font-semibold text-white">
                  Test examples
                </h2>

                <div className="mt-4 flex flex-col gap-4">

                  {dsaProblem.examples.map(
                    (
                      example
                    ) => (
                      <div
                        key={
                          example.input
                        }
                        className="rounded-xl border border-white/[0.08] bg-[#111113] p-4"
                      >

                        <div className="grid gap-3">

                          <div>

                            <p className="text-xs font-medium text-white/35">
                              Input
                            </p>

                            <p className="mt-1 font-mono text-sm text-white/75">
                              {
                                example.input
                              }
                            </p>

                          </div>

                          <div>

                            <p className="text-xs font-medium text-white/35">
                              Output
                            </p>

                            <p className="mt-1 font-mono text-sm text-white/75">
                              {
                                example.output
                              }
                            </p>

                          </div>

                          <div className="border-t border-white/[0.06] pt-3">

                            <p className="text-sm leading-6 text-white/45">
                              {
                                example.explanation
                              }
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </motion.div>

            )}

          </div>

        </aside>

        {/* ===================================================
            CODE WORKSPACE
        =================================================== */}

        <section className="flex min-h-0 flex-col bg-[#0f0f11]">

          {/* =================================================
              CODE TOOLBAR

              RUN + SUBMIT ARE HERE
          ================================================= */}

          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#141416] px-4">

            <div className="flex items-center gap-4">

              <span className="text-xs font-medium text-white/75">
                Solution
              </span>

              <div className="relative">

                <select
                  value={language}
                  onChange={
                    handleLanguageChange
                  }
                  aria-label="Programming language"
                  className="h-8 appearance-none rounded-lg border border-[#da224b]/40 bg-[#1b1b1f] py-1 pl-3 pr-9 text-xs font-medium text-white outline-none transition-colors hover:border-[#da224b]/60 focus:border-[#da224b] focus:ring-1 focus:ring-[#da224b]/30"
                >

                  {languageKeys.map(
                    (
                      key
                    ) => (
                      <option
                        key={key}
                        value={key}
                        className="bg-[#161619] text-white"
                      >
                        {
                          languageConfigs[
                            key
                          ].label
                        }
                      </option>
                    )
                  )}

                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/35"
                />

              </div>

            </div>

            {/* RIGHT TOOLBAR */}

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => {
                  setActiveBottomTab(
                    "terminal"
                  );
                  setTerminalOpen(
                    true
                  );
                }}
                className={`flex h-8 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors ${
                  terminalOpen &&
                  activeBottomTab ===
                    "terminal"
                    ? "bg-[#241519] text-[#da224b]"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/75"
                }`}
              >

                <Terminal
                  size={14}
                />

                Terminal

              </button>

              <button
                type="button"
                onClick={
                  toggleFullscreen
                }
                aria-label={
                  isFullscreen
                    ? "Exit fullscreen"
                    : "Enter fullscreen"
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/[0.04] hover:text-white/75"
              >

                {isFullscreen ? (
                  <Minimize2
                    size={15}
                  />
                ) : (
                  <Maximize2
                    size={15}
                  />
                )}

              </button>

              <div className="mx-1 h-5 w-px bg-white/[0.08]" />

              {/* RUN CODE */}

              <Button
                variant="outline"
                onClick={
                  runCode
                }
                disabled={
                  isRunning
                }
              >
                {isRunning
                  ? "Running..."
                  : "Run Code"}
              </Button>

              {/* SUBMIT */}

              <Button
                onClick={
                  submitCode
                }
                disabled={
                  isRunning
                }
              >
                Submit
              </Button>

            </div>

          </div>

          {/* =================================================
              CANDIDATE EDITOR
          ================================================= */}

          <div className="min-h-0 flex-1">

            <Editor
              height="100%"
              language={
                languageConfigs[
                  language
                ].monaco
              }
              theme="vs-dark"
              value={
                currentCode
              }
              onChange={(
                value
              ) =>
                handleCodeChange(
                  value ?? ""
                )
              }
              loading={
                <div className="flex h-full items-center justify-center bg-[#111113] text-sm text-white/45">
                  Loading editor...
                </div>
              }
              options={{
                minimap: {
                  enabled: false,
                },

                fontSize: 14,

                lineHeight: 22,

                padding: {
                  top: 18,
                  bottom: 18,
                },

                scrollBeyondLastLine:
                  false,

                automaticLayout:
                  true,

                smoothScrolling:
                  true,

                cursorBlinking:
                  "smooth",

                renderLineHighlight:
                  "line",

                wordWrap: "on",

                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />

          </div>

          {/* =================================================
              COLLAPSED EXECUTION TEMPLATE
          ================================================= */}

          <div className="shrink-0 border-t border-white/[0.07] bg-[#131013]">

            <button
              type="button"
              onClick={() =>
                setExecutionTemplateOpen(
                  (current) =>
                    !current
                )
              }
              aria-expanded={
                executionTemplateOpen
              }
              className="flex w-full items-center justify-between px-5 py-3 transition-colors hover:bg-white/[0.02] md:px-6"
            >

              <div className="text-left">

                <p className="text-sm font-medium text-white">
                  Execution Template
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Platform-managed code used to run your solution
                </p>

              </div>

              <ChevronDown
                size={17}
                className={`text-white/40 transition-transform duration-200 ${
                  executionTemplateOpen
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

            {executionTemplateOpen && (
              <div className="border-t border-white/[0.07] bg-[#0f0f11]">

                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-2.5 md:px-6">

                  <p className="text-xs font-medium text-white/45">
                    {languageConfigs[language].label} execution harness
                  </p>

                  <p className="text-xs text-white/30">
                    Read-only
                  </p>

                </div>

                <div className="max-h-[240px] overflow-auto px-5 py-4 md:px-6">

                  <pre className="font-mono text-[13px] leading-6 text-white/45">
{`// Platform-managed execution template

// The assessment system supplies:
// 1. Test input
// 2. Function call
// 3. Output validation
// 4. Hidden test cases

// Candidate code:
// ${languageConfigs[language].label} solution above

// The execution harness is not editable.`}
                  </pre>

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              TERMINAL / TEST RESULTS

              THIS IS THE LOWEST ELEMENT
          ================================================= */}

          <div className="shrink-0 border-t border-white/[0.07] bg-[#111113]">

            {/* PANEL HEADER */}

            <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-4">

              <div className="flex h-full items-center gap-5">

                <button
                  type="button"
                  onClick={() => {
                    setActiveBottomTab(
                      "tests"
                    );
                    setTerminalOpen(
                      true
                    );
                  }}
                  className={`relative h-full text-xs font-medium transition-colors ${
                    activeBottomTab ===
                    "tests"
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >

                  Test Cases

                  {activeBottomTab ===
                    "tests" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#da224b]" />
                  )}

                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveBottomTab(
                      "terminal"
                    );
                    setTerminalOpen(
                      true
                    );
                  }}
                  className={`relative h-full text-xs font-medium transition-colors ${
                    activeBottomTab ===
                    "terminal"
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >

                  Terminal

                  {activeBottomTab ===
                    "terminal" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#da224b]" />
                  )}

                </button>

              </div>

              <div className="flex items-center gap-4">

                <span className="text-xs text-white/35">
                  {passed}/
                  {tests.length} passed
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setTerminalOpen(
                      false
                    )
                  }
                  className="text-xs text-white/35 transition-colors hover:text-white/70"
                >
                  Close
                </button>

              </div>

            </div>

            {/* RESULTS */}

            <div className="h-[170px] overflow-y-auto p-4">

              {activeBottomTab ===
              "terminal" ? (

                <div className="font-mono text-xs leading-6">

                  {terminalOutput.map(
                    (
                      line,
                      index
                    ) => (
                      <p
                        key={`${line}-${index}`}
                        className={
                          index ===
                          terminalOutput.length -
                            1
                            ? "text-white/75"
                            : "text-white/40"
                        }
                      >
                        {
                          line
                        }
                      </p>
                    )
                  )}

                </div>

              ) : (

                <div className="space-y-2">

                  {tests.map(
                    (
                      test
                    ) => {

                      const statusClass =
                        test.status ===
                        "pass"
                          ? "border-[#da224b]/30 bg-[#201519]"
                          : test.status ===
                              "fail"
                            ? "border-white/[0.10] bg-[#1a1a1d]"
                            : test.status ===
                                "running"
                              ? "border-white/[0.10] bg-[#1a1a1d]"
                              : "border-white/[0.08] bg-[#151518]";

                      const statusTextClass =
                        test.status ===
                        "pass"
                          ? "text-[#da224b]"
                          : "text-white/50";

                      return (
                        <div
                          key={
                            test.id
                          }
                          className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 ${statusClass}`}
                        >

                          <span className="text-sm text-white/70">
                            {
                              test.name
                            }
                          </span>

                          <span
                            className={`text-xs font-medium ${statusTextClass}`}
                          >
                            {test.status ===
                            "idle"
                              ? "Not run"
                              : test.status ===
                                  "running"
                                ? "Running"
                                : test.status ===
                                    "pass"
                                  ? "Passed"
                                  : "Failed"}
                          </span>

                        </div>
                      );
                    }
                  )}

                </div>

              )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Button from "../../components/ui/Button";
import { dsaProblem } from "../../data/mockData";

type TestStatus = "idle" | "pass" | "fail" | "running";

type Language = "java" | "cpp" | "python" | "javascript";

const languageOptions: {
  value: Language;
  label: string;
}[] = [
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
];

export default function DsaAssessment() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState<Language>("javascript");

  const [codeByLanguage, setCodeByLanguage] = useState<
    Record<Language, string>
  >({
    java: "// Write your Java solution here",
    cpp: "// Write your C++ solution here",
    python: "# Write your Python solution here",
    javascript: dsaProblem.starterCode,
  });

  const [tests, setTests] = useState(
    dsaProblem.tests.map((t) => ({
      ...t,
      status: "idle" as TestStatus,
    })),
  );

  const code = codeByLanguage[language];

  const passed = useMemo(
    () => tests.filter((t) => t.status === "pass").length,
    [tests],
  );

  function handleLanguageChange(newLanguage: Language) {
    setLanguage(newLanguage);
  }

  function handleCodeChange(value: string) {
    setCodeByLanguage((prev) => ({
      ...prev,
      [language]: value,
    }));
  }

  function simulate(kind: "run" | "submit") {
    setTests((prev) =>
      prev.map((t) => ({
        ...t,
        status: "running",
      })),
    );

    window.setTimeout(() => {
      setTests((prev) =>
        prev.map((t, i) => ({
          ...t,
          status:
            kind === "submit" && i === 3
              ? "fail"
              : "pass",
        })),
      );

      if (kind === "submit") {
        window.setTimeout(
          () => navigate("/assessment/quiz"),
          900,
        );
      }
    }, 900);
  }

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="max-h-[40vh] overflow-auto border-b border-white/5 bg-surface p-6 lg:max-h-none lg:border-b-0 lg:border-r">
          <p className="text-xs text-accent">
            {dsaProblem.difficulty}
          </p>

          <h1 className="mt-2 text-xl font-semibold">
            {dsaProblem.title}
          </h1>

          <p className="mt-4 text-sm leading-6 text-secondary">
            {dsaProblem.statement}
          </p>

          <h2 className="mt-6 text-sm font-medium">
            Examples
          </h2>

          <div className="mt-3 flex flex-col gap-3">
            {dsaProblem.examples.map((ex) => (
              <div
                key={ex.input}
                className="rounded-lg bg-bg p-3 text-xs leading-5 text-secondary"
              >
                <p>Input: {ex.input}</p>
                <p>Output: {ex.output}</p>
                <p className="mt-1">
                  {ex.explanation}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-6 text-sm font-medium">
            Constraints
          </h2>

          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-secondary">
            {dsaProblem.constraints.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </aside>

        <div className="relative flex min-h-[420px] min-w-0 flex-col">
          {/* Editor toolbar */}
          <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/5 bg-surface px-4">
            <span className="text-xs text-secondary">
              Code Editor
            </span>

            <div className="flex items-center gap-2">
              <label
                htmlFor="language-select"
                className="text-xs text-secondary"
              >
                Language
              </label>

              <select
                id="language-select"
                value={language}
                onChange={(e) =>
                  handleLanguageChange(
                    e.target.value as Language,
                  )
                }
                className="rounded-md border border-white/10 bg-bg px-3 py-1.5 text-xs text-primary outline-none transition focus:border-accent/50"
              >
                {languageOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Monaco */}
          <div className="relative min-h-0 flex-1">
            <div className="absolute inset-0">
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) =>
                  handleCodeChange(value ?? "")
                }
                loading={
                  <div className="flex h-full items-center justify-center text-sm text-secondary">
                    Loading editor…
                  </div>
                }
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/5 bg-surface px-6 py-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-secondary">
            Test Cases · {passed}/{tests.length} passing
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => simulate("run")}
            >
              Run Code
            </Button>

            <Button
              onClick={() => simulate("submit")}
            >
              Submit
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tests.map((test) => (
            <span
              key={test.id}
              className={`rounded-full px-3 py-1 text-xs ${
                test.status === "pass"
                  ? "bg-accent/15 text-accent"
                  : test.status === "fail"
                    ? "bg-white/10 text-secondary"
                    : test.status === "running"
                      ? "bg-white/10 text-primary"
                      : "bg-bg text-secondary"
              }`}
            >
              {test.name}
              {test.status !== "idle"
                ? ` · ${test.status}`
                : ""}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
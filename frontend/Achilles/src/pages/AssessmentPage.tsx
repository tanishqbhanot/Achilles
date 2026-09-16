import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useAssessmentStore } from "../store/assessmentStore";
import { useAssessmentTimer } from "../hooks/useAssessmentTimer";

export default function AssessmentPage() {
    const timeRemaining = useAssessmentTimer();

    const started = useAssessmentStore(
        (state) => state.started,
    );

    const startAssessment = useAssessmentStore(
        (state) => state.startAssessment,
    );

    const completed = useAssessmentStore(
        (state) => state.completed,
    );

    useEffect(() => {
        if (!started) {
            startAssessment();
        }
    }, [started, startAssessment]);

    const hours = Math.floor(timeRemaining / 3600);

    const minutes = Math.floor(
        (timeRemaining % 3600) / 60,
    );

    const seconds = timeRemaining % 60;

    const formattedTime = `${String(hours).padStart(
        2,
        "0",
    )}:${String(minutes).padStart(
        2,
        "0",
    )}:${String(seconds).padStart(
        2,
        "0",
    )}`;

    const questions = useAssessmentStore(
        (state) => state.questions,
    );

    const currentQuestionIndex = useAssessmentStore(
        (state) => state.currentQuestionIndex,
    );

    const language = useAssessmentStore(
        (state) => state.language,
    );

    const progress = useAssessmentStore(
        (state) => state.progress,
    );

    const updateCode = useAssessmentStore(
        (state) => state.updateCode,
    );

    const goToQuestion = useAssessmentStore(
        (state) => state.goToQuestion,
    );

    const currentQuestion =
        questions[currentQuestionIndex];

    if (!currentQuestion) {
        return (
            <div className="h-screen bg-[#0f1115] text-white p-10">
                No question found.
            </div>
        );
    }

    const currentProgress =
        progress[currentQuestion.id];

    return (
        <div className="h-screen w-screen bg-[#0f1115] text-white flex flex-col">
            {/* Header */}
            <header className="h-14 shrink-0 border-b border-white/10 flex items-center justify-between px-5">
                <div className="font-semibold">
                    Skill Certification
                </div>

                <div className="text-sm text-gray-400">
                    Question{" "}
                    <span className="text-white">
                        {currentQuestionIndex + 1}
                    </span>{" "}
                    / {questions.length}
                </div>

                <div
                    className={`font-mono text-sm tabular-nums ${timeRemaining <= 300
                            ? "text-red-400"
                            : timeRemaining <= 600
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }`}
                >
                    {formattedTime}
                </div>
            </header>

            {/* Workspace */}
            <main className="flex-1 min-h-0 grid grid-cols-[220px_1fr]">
                {/* Question navigation */}
                <aside className="border-r border-white/10 p-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
                        Questions
                    </div>

                    <div className="space-y-2">
                        {questions.map((question, index) => {
                            const isActive =
                                index === currentQuestionIndex;

                            const isSubmitted =
                                progress[question.id]?.submitted;

                            return (
                                <button
                                    key={question.id}
                                    onClick={() => goToQuestion(index)}
                                    className={`
                    w-full flex items-center gap-3
                    px-3 py-2.5 rounded-lg
                    text-sm text-left
                    transition
                    ${isActive
                                            ? "bg-white text-black"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }
                  `}
                                >
                                    <span
                                        className={`
                      flex items-center justify-center
                      w-7 h-7 rounded-md
                      text-xs font-medium
                      ${isActive
                                                ? "bg-black/10"
                                                : isSubmitted
                                                    ? "bg-green-500/15 text-green-400"
                                                    : "bg-white/5"
                                            }
                    `}
                                    >
                                        {index + 1}
                                    </span>

                                    <span className="truncate">
                                        {question.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Content */}
                <section className="min-w-0 min-h-0 grid grid-cols-2">
                    {/* Question */}
                    <div className="overflow-y-auto p-8 border-r border-white/10">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold">
                                {currentQuestion.title}
                            </h1>

                            <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400">
                                {currentQuestion.difficulty}
                            </span>
                        </div>

                        <p className="mt-5 text-gray-300 leading-7">
                            {currentQuestion.description}
                        </p>

                        <div className="mt-8">
                            <h2 className="text-sm font-semibold text-gray-200">
                                Examples
                            </h2>

                            <div className="mt-3 space-y-3">
                                {currentQuestion.examples.map(
                                    (example, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                                        >
                                            <div className="font-mono text-xs text-gray-400">
                                                Input
                                            </div>

                                            <div className="mt-1 font-mono text-sm">
                                                {example.input}
                                            </div>

                                            <div className="mt-3 font-mono text-xs text-gray-400">
                                                Output
                                            </div>

                                            <div className="mt-1 font-mono text-sm">
                                                {example.output}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-sm font-semibold text-gray-200">
                                Constraints
                            </h2>

                            <ul className="mt-3 space-y-2 text-sm text-gray-400">
                                {currentQuestion.constraints.map(
                                    (constraint) => (
                                        <li key={constraint}>
                                            • {constraint}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="min-w-0 min-h-0 flex flex-col">
                        <div className="h-11 shrink-0 border-b border-white/10 flex items-center px-4">
                            <span className="text-sm text-gray-400">
                                {language.toUpperCase()}
                            </span>
                        </div>

                        <div className="flex-1 min-h-0">
                            <Editor
                                height="100%"
                                language={
                                    language === "cpp"
                                        ? "cpp"
                                        : language
                                }
                                value={
                                    currentProgress.code[language]
                                }
                                theme="vs-dark"
                                onChange={(value) => {
                                    updateCode(
                                        currentQuestion.id,
                                        language,
                                        value ?? "",
                                    );
                                }}
                                options={{
                                    automaticLayout: true,
                                    minimap: {
                                        enabled: false,
                                    },
                                    fontSize: 14,
                                    padding: {
                                        top: 16,
                                    },
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
import type { ChangeEvent, DragEvent } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "../../components/ui/Button";

type Phase =
  | "idle"
  | "dragging"
  | "absorbing"
  | "analyzing"
  | "done";

export default function ResumeUpload() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  async function processFile(file: File) {
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const lowerName = file.name.toLowerCase();

    const isValid = allowedExtensions.some((extension) =>
      lowerName.endsWith(extension)
    );

    if (!isValid) {
      setError("Please upload a PDF, DOC or DOCX file.");
      return;
    }

    setSelectedFile(file);
    setError("");
    setPhase("absorbing");

    const analyzingTimer = window.setTimeout(() => {
      setPhase("analyzing");
    }, 900);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // 1. Upload resume
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/resumes`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to upload your resume");
      }

      // 2. Get the authenticated user's resume S3 key
      const s3KeyResponse = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/resumes`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const s3KeyResult = (await s3KeyResponse.json()) as {
        success?: boolean;
        s3Key?: string;
        message?: string;
      };

      if (!s3KeyResponse.ok || !s3KeyResult.s3Key) {
        throw new Error(
          s3KeyResult.message ?? "Unable to retrieve resume information",
        );
      }

      // 3. Get current user
      const meResponse = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/auth/me`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const meResult = (await meResponse.json()) as {
        success?: boolean;
        user?: {
          id: string;
        };
        message?: string;
      };

      if (!meResponse.ok || !meResult.user?.id) {
        throw new Error(
          meResult.message ?? "Unable to retrieve user information",
        );
      }

      const userId = meResult.user.id;
      const s3Key = s3KeyResult.s3Key;

      // 4. Send userId + s3Key to your arbitrary API
      const processResponse = await fetch(
        `https://underground-alloy-crossing-stunning.trycloudflare.com/${userId}/docs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            s3_key: s3Key,
          }),
        },
      );

      const processResult = (await processResponse.json()) as {
        message?: string;
      };

      if (!processResponse.ok) {
        throw new Error(
          processResult.message ?? "Unable to start resume processing",
        );
      }

      window.clearTimeout(analyzingTimer);
      setPhase("done");

      window.setTimeout(() => {
        navigate("/onboarding/skills");
      }, 700);
    } catch (uploadError) {
      window.clearTimeout(analyzingTimer);
      setPhase("idle");

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload your resume",
      );
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      processFile(file);
    }

    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (phase === "idle") {
      setPhase("dragging");
    }
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const relatedTarget = event.relatedTarget as Node | null;

    if (
      !event.currentTarget.contains(relatedTarget) &&
      phase === "dragging"
    ) {
      setPhase("idle");
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];

    if (file) {
      processFile(file);
    } else {
      setPhase("idle");
    }
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleManualSkills() {
    navigate("/onboarding/skills");
  }

  const isProcessing =
    phase === "absorbing" ||
    phase === "analyzing" ||
    phase === "done";

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-7 md:px-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/[0.07] pb-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#da224b]/40 bg-[#151518]">
              <img
                src="/achilles-logo.png"
                alt="Achilles"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div>
              <p className="text-[13px] font-semibold tracking-[0.28em] text-[#da224b]">
                ACHILLES
              </p>

              <p className="mt-1 text-sm text-white/45">
                Technical onboarding
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-5 sm:flex">
            <span className="text-xs text-white/45">
              Step 1 of 4
            </span>

            <div className="flex gap-1.5">
              <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
              <div className="h-1.5 w-8 rounded-full bg-white/[0.10]" />
              <div className="h-1.5 w-8 rounded-full bg-white/[0.10]" />
              <div className="h-1.5 w-8 rounded-full bg-white/[0.10]" />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex flex-1 flex-col items-center justify-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-3xl"
          >
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#da224b]">
                Resume
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
                Complete your technical profile.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/55">
                Upload your resume and Achilles will extract your technical
                experience automatically.
              </p>
            </div>

            {/* Drop zone */}
            <motion.div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              animate={{
                borderColor:
                  phase === "dragging"
                    ? "rgba(218,34,75,0.75)"
                    : "rgba(218,34,75,0.22)",
                backgroundColor:
                  phase === "dragging"
                    ? "rgba(37,15,20,1)"
                    : "rgba(25,17,20,1)",
                scale: phase === "dragging" ? 1.012 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="relative mt-12 overflow-hidden rounded-2xl border p-8 md:p-12"
            >
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#da224b]/30 bg-[#24191d]">
                      <FileUp
                        size={25}
                        strokeWidth={1.7}
                        className="text-[#da224b]"
                      />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-white">
                      Drop your resume here
                    </h2>

                    <p className="mt-2 text-sm text-white/45">
                      PDF, DOC or DOCX
                    </p>

                    <button
                      type="button"
                      onClick={openFilePicker}
                      className="mt-7 h-11 rounded-xl border border-[#da224b]/20 bg-[#21171a] px-5 text-sm font-medium text-white transition-colors hover:border-[#da224b]/45 hover:bg-[#281b20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/60"
                    >
                      Choose a file
                    </button>

                    <input
                      ref={inputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </motion.div>
                )}

                {phase === "dragging" && (
                  <motion.div
                    key="dragging"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[260px] flex-col items-center justify-center text-center"
                  >
                    <div className="h-px w-16 bg-[#da224b]" />

                    <h2 className="mt-7 text-3xl font-semibold tracking-tight text-[#da224b] md:text-4xl">
                      DROP IT LIKE IT'S HOT
                    </h2>

                    <p className="mt-3 text-sm text-white/50">
                      Release your resume to continue
                    </p>

                    <div className="mt-7 h-px w-16 bg-[#da224b]" />
                  </motion.div>
                )}

                {phase === "absorbing" && (
                  <motion.div
                    key="absorbing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[260px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                        opacity: [1, 0.65, 1],
                      }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                      }}
                      className="h-16 w-16 rounded-xl border border-[#da224b]/50 bg-[#24191d]"
                    />

                    <h2 className="mt-7 text-xl font-semibold text-white">
                      Processing your resume
                    </h2>

                    <p className="mt-2 text-sm text-white/45">
                      {selectedFile?.name}
                    </p>

                    <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 0.85 }}
                        className="h-full w-full rounded-full bg-[#da224b]"
                      />
                    </div>
                  </motion.div>
                )}

                {phase === "analyzing" && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[260px] flex-col items-center justify-center text-center"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[#da224b] shadow-[0_0_14px_rgba(218,34,75,0.7)]" />

                    <h2 className="mt-7 text-xl font-semibold text-white">
                      Analyzing technical experience
                    </h2>

                    <p className="mt-2 text-sm text-white/45">
                      Extracting skills and experience
                    </p>

                    <div className="mt-7 flex w-48 gap-1">
                      {[0, 1, 2, 3].map((item) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{
                            duration: 1,
                            delay: item * 0.12,
                            repeat: Infinity,
                          }}
                          className="h-1 flex-1 rounded-full bg-[#da224b]"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {phase === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[260px] flex-col items-center justify-center text-center"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#da224b]" />

                    <h2 className="mt-7 text-xl font-semibold text-white">
                      Resume processed
                    </h2>

                    <p className="mt-2 text-sm text-white/45">
                      Preparing your technical profile
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {error && (
              <p className="mt-4 text-center text-sm text-[#ff8ca5]" role="alert">
                {error}
              </p>
            )}

            {/* Manual option */}
            {!isProcessing && (
              <>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/[0.07]" />

                  <span className="text-xs text-white/30">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleManualSkills}
                    className="group"
                  >
                    Enter skills manually

                    <ArrowRight
                      size={16}
                      className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Button>
                </div>
              </>
            )}

            <p className="mt-7 text-center text-xs text-white/35">
              Your resume is used to build your technical profile.
            </p>
          </motion.div>
        </main>

        {/* Progress */}
        <div className="flex justify-center gap-2 pb-2 pt-5">
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
          <div className="h-1 w-10 rounded-full bg-white/[0.10]" />
          <div className="h-1 w-10 rounded-full bg-white/[0.10]" />
          <div className="h-1 w-10 rounded-full bg-white/[0.10]" />
        </div>
      </div>
    </div>
  );
}
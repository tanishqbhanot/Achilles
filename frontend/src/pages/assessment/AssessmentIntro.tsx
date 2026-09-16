import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/ui/Button";

const stages = [
  {
    n: "01",
    title: "DSA / Coding",
    description: "Problem solving and algorithmic thinking",
  },
  {
    n: "02",
    title: "Technical Knowledge",
    description: "Core concepts across your technical profile",
  },
  {
    n: "03",
    title: "Project Understanding",
    description: "Questions based on the projects you submitted",
  },
  {
    n: "04",
    title: "Technical Interview",
    description: "A technical discussion based on your experience",
  },
];

export default function AssessmentIntro() {
  const navigate = useNavigate();

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
                Technical assessment
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-5 sm:flex">
            <span className="text-xs text-white/45">
              Final step
            </span>

            <div className="flex gap-1.5">
              <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
              <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
              <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
              <div className="h-1.5 w-8 rounded-full bg-[#da224b]" />
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex flex-1 flex-col justify-center py-14 md:py-20">
          {/* Heading */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#da224b]">
              Assessment
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
              Your Technical Assessment
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/55">
              Four stages will evaluate how you solve problems, understand
              technical concepts, explain your work, and communicate your
              engineering decisions.
            </p>
          </motion.section>

          {/* Assessment overview */}
          <section className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_0.5fr]">
            {/* Stages */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="overflow-hidden rounded-2xl border border-[#da224b]/20 bg-[#191114]"
            >
              <div className="border-b border-[#da224b]/10 px-5 py-5">
                <h2 className="text-base font-semibold text-white">
                  Assessment stages
                </h2>

                <p className="mt-1 text-sm text-white/42">
                  Each stage focuses on a different part of your technical
                  profile.
                </p>
              </div>

              <div>
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.n}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.15 + index * 0.07,
                    }}
                    className={`flex gap-5 px-5 py-5 ${
                      index !== stages.length - 1
                        ? "border-b border-[#da224b]/10"
                        : ""
                    }`}
                  >
                    <span className="w-8 shrink-0 pt-0.5 font-mono text-xs text-[#da224b]">
                      {stage.n}
                    </span>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {stage.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-5 text-white/45">
                        {stage.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-2xl border border-[#da224b]/20 bg-[#191114] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#da224b]/20 bg-[#201519]">
                <Clock3
                  size={18}
                  className="text-[#da224b]"
                />
              </div>

              <p className="mt-6 text-xs text-white/40">
                Estimated duration
              </p>

              <p className="mt-1 text-2xl font-semibold text-white">
                60–75
              </p>

              <p className="mt-1 text-sm text-white/42">
                minutes
              </p>
            </motion.div>
          </section>

          {/* Security notice */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="mt-5 flex gap-4 rounded-2xl border border-[#da224b]/15 bg-[#151012] px-5 py-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#da224b]/20 bg-[#201519]">
              <ShieldCheck
                size={18}
                className="text-[#da224b]"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Security checks are active
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-white/45">
                Your assessment session may be monitored to maintain a
                consistent evaluation environment.
              </p>
            </div>
          </motion.section>

          {/* Action */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10 flex flex-col items-stretch gap-4 border-t border-white/[0.07] pt-7 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-white/40">
              Make sure you are ready before starting.
            </p>

            <Button
              onClick={() => navigate("/assessment/dsa")}
              className="group shrink-0"
            >
              Begin Assessment

              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </main>

        {/* Bottom progress */}
        <div className="flex justify-center gap-2 pb-2 pt-5">
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
        </div>
      </div>
    </div>
  );
}
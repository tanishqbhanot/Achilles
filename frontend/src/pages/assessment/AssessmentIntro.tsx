import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/ui/Button";

const stages = [
  {
    stage: "Stage 1",
    title: "DSA / Coding",
    description:
      "Solve programming and algorithmic problems to demonstrate your problem-solving ability, logical thinking, and understanding of data structures and algorithms.",
  },
  {
    stage: "Stage 2",
    title: "Technical Knowledge",
    description:
      "Answer questions covering the core technical concepts relevant to the skills in your profile, with the difficulty adapting to your demonstrated knowledge.",
  },
  {
    stage: "Stage 3",
    title: "Project Understanding",
    description:
      "Discuss the projects you submitted, including the technologies you used, the decisions you made, and the parts you personally designed or implemented.",
  },
  {
    stage: "Stage 4",
    title: "Technical Interview",
    description:
      "Take part in a technical discussion focused on your experience, engineering decisions, problem-solving approach, and ability to explain technical concepts clearly.",
  },
];

export default function AssessmentIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6 md:px-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/[0.07] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#da224b]/40 bg-[#151518]">
              <img
                src="/achilles-logo.png"
                alt="Achilles"
                className="h-7 w-7 object-contain"
              />
            </div>

            <div>
              <p className="text-[12px] font-semibold tracking-[0.28em] text-[#da224b]">
                ACHILLES
              </p>

              <p className="mt-0.5 text-xs text-white/45">
                Technical assessment
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-xs text-white/45">
              Step 4 of 4
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
        <main className="flex flex-1 flex-col py-12 md:py-14">
          {/* Heading */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="text-3xl font-semibold tracking-[-0.025em] text-white md:text-4xl">
              Technical Assessment
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] leading-6 text-white/50 md:text-base">
              The assessment is divided into four stages. Each stage evaluates
              a different part of your technical ability and experience.
            </p>
          </motion.section>

          {/* Assessment stages */}
          <section className="mt-10">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-white">
                Assessment stages
              </h2>

              <p className="mt-1.5 text-sm text-white/40">
                You will complete each stage in sequence.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {stages.map((stage, index) => (
                <motion.article
                  key={stage.stage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    delay: index * 0.05,
                  }}
                  className="rounded-2xl border border-[#da224b]/20 bg-[#191114] px-5 py-5 transition-colors duration-200 hover:border-[#da224b]/30 md:px-6 md:py-6"
                >
                  <p className="text-sm font-medium text-[#da224b]">
                    {stage.stage}
                  </p>

                  <h3 className="mt-1.5 text-lg font-semibold text-white md:text-xl">
                    {stage.title}
                  </h3>

                  <p className="mt-2.5 max-w-3xl text-sm leading-6 text-white/48 md:text-[15px]">
                    {stage.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Security */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.28,
            }}
            className="mt-8"
          >
            <p className="text-sm font-semibold text-white md:text-base">
              Security checks are active
            </p>
          </motion.section>

          {/* Action */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.34,
            }}
            className="mt-8 flex justify-end border-t border-white/[0.07] pt-6"
          >
            <Button
              onClick={() => navigate("/assessment/system-check")}
              className="group"
            >
              Begin Assessment

              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </main>

        {/* Progress */}
        <div className="flex justify-center gap-2 pb-1 pt-4">
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
          <div className="h-1 w-10 rounded-full bg-[#da224b]" />
        </div>
      </div>
    </div>
  );
}
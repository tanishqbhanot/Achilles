import { useMemo } from "react";
import { motion } from "framer-motion";

import { skills } from "../../data/mockData";
import { useAppStore } from "../../store/appStore";

export default function SkillBars() {
  const skillScores = useAppStore(
    (state) => state.skillScores,
  );

  const randomScores = useMemo(() => {
    const generated: Record<string, number> = {};

    skills.forEach((skill) => {
      generated[skill.name] =
        Math.floor(Math.random() * 36) + 60;
    });

    return generated;
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {skills.map((skill) => {
        const storedScore = skillScores[skill.name];

        const score =
          typeof storedScore === "number" &&
          storedScore > 0
            ? storedScore
            : randomScores[skill.name];

        return (
          <motion.div
            key={skill.id}
            className="group rounded-xl border border-white/[0.055] bg-[#141416] p-4 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#da224b]/20 hover:bg-[#181215]"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-white/80">
                {skill.name}
              </span>

              <span className="font-mono text-xs text-white/40">
                {score}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                key={`${skill.id}-${score}`}
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: `${score}%`,
                }}
                transition={{
                  duration: 3.3,
                  ease: [0.25, 1, 0.4, 1],
                }}
                className="relative h-full rounded-full bg-[#da224b]"
              >
                {score > 0 && (
                  <motion.span
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [0, 0.75, 0],
                    }}
                    transition={{
                      duration: 0.35,
                      delay: 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#da224b] blur-[5px]"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
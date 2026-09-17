import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { skills } from "../../data/mockData";
import { useAppStore } from "../../store/appStore";

export default function SkillBars() {
  const skillScores = useAppStore((state) => state.skillScores);

  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
      {skills.map((skill) => {
        const score = skillScores[skill.name] ?? 0;

        return (
          <Link
            key={skill.id}
            to={`/skills/${skill.id}`}
            className="group block rounded-xl border border-white/[0.055] bg-[#141416] p-4 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#da224b]/20 hover:bg-[#181215] focus-visible:border-[#da224b]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/20"
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
                initial={{ width: "0%" }}
                animate={{ width: `${score}%` }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full rounded-full bg-[#da224b]"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
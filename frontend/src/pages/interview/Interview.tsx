import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  interviewFollowups,
  interviewPrompt,
} from "../../data/mockData";

type Turn = { from: "ai" | "you"; text: string };

export default function Interview() {
  const navigate = useNavigate();
  const [turns, setTurns] = useState<Turn[]>([
    { from: "ai", text: interviewPrompt },
  ]);
  const [draft, setDraft] = useState("");
  const [followup, setFollowup] = useState(0);

  function submit() {
    if (!draft.trim()) return;
    const nextTurns: Turn[] = [...turns, { from: "you", text: draft.trim() }];
    if (followup < interviewFollowups.length) {
      nextTurns.push({ from: "ai", text: interviewFollowups[followup] });
      setFollowup((n) => n + 1);
      setTurns(nextTurns);
      setDraft("");
      return;
    }
    setTurns(nextTurns);
    setDraft("");
    window.setTimeout(() => navigate("/assessment/results"), 700);
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 py-16">
      <p className="text-sm text-secondary">AI Technical Interview</p>
      <h1 className="mt-2 text-3xl font-semibold">AI Interviewer</h1>

      <div className="mt-10 flex flex-col gap-6">
        {turns.map((turn, i) => (
          <div key={`${turn.from}-${i}`}>
            <p className="text-xs uppercase tracking-wide text-secondary">
              {turn.from === "ai" ? "AI Interviewer" : "Your Response"}
            </p>
            <p
              className={`mt-2 text-lg leading-8 ${
                turn.from === "ai" ? "text-primary" : "text-secondary"
              }`}
            >
              {turn.from === "ai" ? `“${turn.text}”` : turn.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 h-px bg-white/10" />

      <p className="mt-8 text-sm text-secondary">Your Response</p>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Type your answer..."
        className="mt-3 min-h-[120px] w-full resize-none rounded-xl border border-white/10 bg-surface p-4 text-sm outline-none focus:border-accent"
      />
      <Button className="mt-4" onClick={submit}>
        Submit Answer
      </Button>
    </div>
  );
}

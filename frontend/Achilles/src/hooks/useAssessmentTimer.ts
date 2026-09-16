import { useEffect } from "react";
import { useAssessmentStore } from "../store/assessmentStore";

export function useAssessmentTimer() {
  const started = useAssessmentStore(
    (state) => state.started,
  );

  const timeRemaining = useAssessmentStore(
    (state) => state.timeRemaining,
  );

  const decrementTimer = useAssessmentStore(
    (state) => state.decrementTimer,
  );

  useEffect(() => {
    if (!started || timeRemaining <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [started, decrementTimer]);

  return timeRemaining;
}
import { useCallback, useEffect, useRef, useState } from "react";
import {
  createProctoringEvent,
  type ProctoringEvent,
  type ViolationType,
} from "../services/proctoring.service";

interface ProctoringState {
  cameraActive: boolean;
  microphoneActive: boolean;
  fullscreenActive: boolean;
  violationCount: number;
  events: ProctoringEvent[];
  active: boolean;
}

export const useProctoring = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const proctoringActiveRef = useRef(false);

  const [state, setState] = useState<ProctoringState>({
    cameraActive: false,
    microphoneActive: false,
    fullscreenActive: false,
    violationCount: 0,
    events: [],
    active: false,
  });

  const recordViolation = useCallback((type: ViolationType) => {
    if (!proctoringActiveRef.current) {
      return;
    }

    const event = createProctoringEvent(type);

    setState((prev) => ({
      ...prev,
      violationCount: prev.violationCount + 1,
      events: [...prev.events, event],
    }));

    console.warn("[Proctoring]", event);
  }, []);

  const startProctoring = useCallback(async () => {
    if (proctoringActiveRef.current) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      proctoringActiveRef.current = true;

      setState((prev) => ({
        ...prev,
        active: true,
        cameraActive:
          !!videoTrack && videoTrack.readyState === "live",
        microphoneActive:
          !!audioTrack && audioTrack.readyState === "live",
      }));

      if (videoTrack) {
        videoTrack.addEventListener("ended", () => {
          if (!proctoringActiveRef.current) return;

          setState((prev) => ({
            ...prev,
            cameraActive: false,
          }));

          recordViolation("CAMERA_OFF");
        });
      }

      if (audioTrack) {
        audioTrack.addEventListener("ended", () => {
          if (!proctoringActiveRef.current) return;

          setState((prev) => ({
            ...prev,
            microphoneActive: false,
          }));

          recordViolation("MICROPHONE_OFF");
        });
      }

      // requestFullscreen must happen as part of the user action
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error(
        "Unable to start proctoring:",
        error,
      );

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
      proctoringActiveRef.current = false;

      setState((prev) => ({
        ...prev,
        active: false,
        cameraActive: false,
        microphoneActive: false,
        fullscreenActive: false,
      }));

      throw error;
    }
  }, [recordViolation]);

  const stopProctoring = useCallback(() => {
    proctoringActiveRef.current = false;

    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setState((prev) => ({
      ...prev,
      active: false,
      cameraActive: false,
      microphoneActive: false,
      fullscreenActive: false,
    }));
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        proctoringActiveRef.current &&
        document.hidden
      ) {
        recordViolation("TAB_SWITCH");
      }
    };

    const handleBlur = () => {
      if (proctoringActiveRef.current) {
        recordViolation("WINDOW_BLUR");
      }
    };

    const handleFullscreenChange = () => {
      const fullscreen = !!document.fullscreenElement;

      setState((prev) => ({
        ...prev,
        fullscreenActive: fullscreen,
      }));

      if (
        proctoringActiveRef.current &&
        !fullscreen
      ) {
        recordViolation("FULLSCREEN_EXIT");
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    window.addEventListener("blur", handleBlur);

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener("blur", handleBlur);

      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
    };
  }, [recordViolation]);

  useEffect(() => {
    return () => {
      proctoringActiveRef.current = false;

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  return {
    ...state,
    videoRef,
    startProctoring,
    stopProctoring,
    stream: streamRef.current
  };
};
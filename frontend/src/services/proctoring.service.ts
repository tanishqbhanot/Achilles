export type ViolationType =
  | "TAB_SWITCH"
  | "WINDOW_BLUR"
  | "FULLSCREEN_EXIT"
  | "CAMERA_OFF"
  | "MICROPHONE_OFF";

export interface ProctoringEvent {
  type: ViolationType;
  timestamp: string;
}

export const createProctoringEvent = (
  type: ViolationType,
): ProctoringEvent => {
  return {
    type,
    timestamp: new Date().toISOString(),
  };
};
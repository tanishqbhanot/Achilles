import { useState } from "react";
import {
  AlertTriangle,
  Camera,
  Check,
  Maximize,
  Mic,
  Shield,
} from "lucide-react";
import { useProctoring } from "../../hooks/useProctoring";

export default function SecurityIndicator() {
  const [open, setOpen] = useState(false);

  const {
    active,
    cameraActive,
    microphoneActive,
    fullscreenActive,
    violationCount,
    startProctoring,
    videoRef,
  } = useProctoring();

  const handleStartSecurity = async () => {
    try {
      await startProctoring();
    } catch {
      // Permission denied / fullscreen failed.
      // Keep UI in inactive state.
    }
  };

  const securityActive =
    active &&
    cameraActive &&
    microphoneActive &&
    fullscreenActive;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          if (!active) {
            void handleStartSecurity();
          }

          setOpen((v) => !v);
        }}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
          securityActive
            ? "border-accent/40 bg-accent/10 text-accent"
            : "border-white/10 bg-white/5 text-secondary"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            securityActive
              ? "bg-accent"
              : "bg-white/40"
          }`}
        />

        {securityActive
          ? "Assessment Security Active"
          : "Enable Assessment Security"}
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-white/10 bg-surface p-4 shadow-xl">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
            <Shield size={16} className="text-accent" />
            Security Status
          </p>

          {active && (
            <div className="mb-4 overflow-hidden rounded-lg border border-white/10 bg-black">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-40 w-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            <StatusItem
              icon={<Camera size={14} />}
              label="Camera"
              active={cameraActive}
            />

            <StatusItem
              icon={<Mic size={14} />}
              label="Microphone"
              active={microphoneActive}
            />

            <StatusItem
              icon={<Maximize size={14} />}
              label="Fullscreen"
              active={fullscreenActive}
            />
          </div>

          <div className="mt-4 border-t border-white/5 pt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-secondary">
                Violations
              </span>

              <span
                className={
                  violationCount > 0
                    ? "text-primary"
                    : "text-accent"
                }
              >
                {violationCount}
              </span>
            </div>
          </div>

          {violationCount > 0 && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs text-secondary">
              <AlertTriangle
                size={14}
                className="mt-0.5 shrink-0"
              />

              <span>
                Browser activity outside the assessment
                environment has been recorded.
              </span>
            </div>
          )}

          {!active && (
            <button
              type="button"
              onClick={() => void handleStartSecurity()}
              className="mt-4 w-full rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-bg"
            >
              Enable Camera & Security
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function StatusItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-secondary">
        {icon}
        <span>{label}</span>
      </div>

      {active ? (
        <Check
          size={14}
          className="text-accent"
        />
      ) : (
        <span className="text-xs text-secondary">
          Inactive
        </span>
      )}
    </div>
  );
}
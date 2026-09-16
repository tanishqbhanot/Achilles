import type { ProctoringEvent } from "../../services/proctoring.service";

interface ProctoringStatusProps {
  cameraActive: boolean;
  microphoneActive: boolean;
  fullscreenActive: boolean;
  violationCount: number;
  events: ProctoringEvent[];
}

const StatusRow = ({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
      }}
    >
      <span>{label}</span>

      <span
        style={{
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {active ? "● Active" : "● Inactive"}
      </span>
    </div>
  );
};

export default function ProctoringStatus({
  cameraActive,
  microphoneActive,
  fullscreenActive,
  violationCount,
  events,
}: ProctoringStatusProps) {
  return (
    <div
      style={{
        width: "280px",
        padding: "16px",
        border: "1px solid #333",
        borderRadius: "12px",
        background: "#181818",
        color: "#fff",
      }}
    >
      <h3
        style={{
          margin: "0 0 12px",
          fontSize: "16px",
        }}
      >
        Proctoring
      </h3>

      <StatusRow
        label="Camera"
        active={cameraActive}
      />

      <StatusRow
        label="Microphone"
        active={microphoneActive}
      />

      <StatusRow
        label="Fullscreen"
        active={fullscreenActive}
      />

      <div
        style={{
          marginTop: "12px",
          paddingTop: "12px",
          borderTop: "1px solid #333",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Violations</span>
          <strong>{violationCount}</strong>
        </div>
      </div>

      {events.length > 0 && (
        <div
          style={{
            marginTop: "12px",
            maxHeight: "150px",
            overflowY: "auto",
            fontSize: "12px",
          }}
        >
          {events.map((event, index) => (
            <div
              key={`${event.timestamp}-${index}`}
              style={{
                padding: "6px 0",
                borderBottom: "1px solid #2a2a2a",
              }}
            >
              <div>{event.type}</div>

              <div style={{ opacity: 0.6 }}>
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
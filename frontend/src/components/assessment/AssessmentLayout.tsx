import { Outlet } from "react-router-dom";

export default function AssessmentLayout() {
  return (
    <div className="min-h-screen bg-[#0b0b0d]">
      <Outlet />
    </div>
  );
}
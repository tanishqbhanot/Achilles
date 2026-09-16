import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ResumeUpload from "./pages/onboarding/ResumeUpload";
import SkillReview from "./pages/onboarding/SkillReview";
import ProjectSetup from "./pages/onboarding/ProjectSetup";

import Dashboard from "./pages/dashboard/Dashboard";
import SkillsOverview from "./pages/dashboard/SkillsOverview";
import SkillDetail from "./pages/dashboard/SkillDetail";
import Profile from "./pages/profile/Profile";

import AssessmentIntro from "./pages/assessment/AssessmentIntro";
import DsaAssessment from "./pages/assessment/DsaAssessment";
import TechnicalQuiz from "./pages/assessment/TechnicalQuiz";
import ProjectAssessment from "./pages/assessment/ProjectAssessment";
import AssessmentResults from "./pages/assessment/AssessmentResults";

import Interview from "./pages/interview/Interview";
import AppShell from "./components/layout/AppShell";
import AssessmentLayout from "./components/assessment/AssessmentLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/onboarding/resume" element={<ResumeUpload />} />
        <Route path="/onboarding/skills" element={<SkillReview />} />
        <Route path="/onboarding/projects" element={<ProjectSetup />} />

        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<SkillsOverview />} />
          <Route path="/skills/:skillId" element={<SkillDetail />} />
          <Route path="/assessment/results" element={<AssessmentResults />} />
        </Route>

        <Route element={<AssessmentLayout />}>
          <Route path="/assessment" element={<AssessmentIntro />} />
          <Route path="/assessment/dsa" element={<DsaAssessment />} />
          <Route path="/assessment/quiz" element={<TechnicalQuiz />} />
          <Route path="/assessment/project" element={<ProjectAssessment />} />
          <Route path="/interview" element={<Interview />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

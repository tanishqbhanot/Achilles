import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* =====================================================
   CANDIDATE AUTH
===================================================== */

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* =====================================================
   COMPANY AUTH
===================================================== */

import CompanyLogin from "./pages/company/CompanyLogin";
import CompanyRegister from "./pages/company/CompanyRegister";
import CompanyCandidatePreferences from "./pages/company/CompanyCandidatePreferences";
import CompanySubscription from "./pages/company/CompanySubscription";
import CompanyDashboard from "./pages/company/CompanyDashboard";

/* =====================================================
   ONBOARDING
===================================================== */

import ResumeUpload from "./pages/onboarding/ResumeUpload";
import SkillReview from "./pages/onboarding/SkillReview";
import ProjectSetup from "./pages/onboarding/ProjectSetup";

/* =====================================================
   DASHBOARD
===================================================== */

import Dashboard from "./pages/dashboard/Dashboard";
import SkillsOverview from "./pages/dashboard/SkillsOverview";
import SkillDetail from "./pages/dashboard/SkillDetail";

/* =====================================================
   PROFILE
===================================================== */

import Profile from "./pages/profile/Profile";

/* =====================================================
   ASSESSMENT
===================================================== */

import AssessmentOverview from "./pages/assessment/AssessmentOverview";
import AssessmentIntro from "./pages/assessment/AssessmentIntro";
import SystemRequirements from "./pages/assessment/SystemRequirements";
import DsaAssessment from "./pages/assessment/DsaAssessment";
import TechnicalQuiz from "./pages/assessment/TechnicalQuiz";
import ProjectAssessment from "./pages/assessment/ProjectAssessment";
import AssessmentResults from "./pages/assessment/AssessmentResults";

/* =====================================================
   LAYOUTS
===================================================== */

import AppShell from "./components/layout/AppShell";
import AssessmentLayout from "./components/assessment/AssessmentLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            CANDIDATE AUTH
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =================================================
            COMPANY AUTH
        ================================================= */}

        <Route
          path="/company/login"
          element={<CompanyLogin />}
        />

        <Route
          path="/company/register"
          element={<CompanyRegister />}
        />

        <Route
          path="/company/candidate-preferences"
          element={<CompanyCandidatePreferences />}
        />

        <Route
          path="/company/subscription"
          element={<CompanySubscription />}
        />
        <Route
  path="/company/dashboard"
  element={<CompanyDashboard />}
/>
        {/* =================================================
            ONBOARDING
        ================================================= */}

        <Route
          path="/onboarding/resume"
          element={<ResumeUpload />}
        />

        <Route
          path="/onboarding/skills"
          element={<SkillReview />}
        />

        <Route
          path="/onboarding/projects"
          element={<ProjectSetup />}
        />

        {/* =================================================
            NORMAL WEBSITE
        ================================================= */}

        <Route element={<AppShell />}>

          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* SKILLS */}

          <Route
            path="/skills"
            element={<SkillsOverview />}
          />

          <Route
            path="/skills/:skillId"
            element={<SkillDetail />}
          />

          {/* PROJECTS */}

          <Route
            path="/projects"
            element={<ProjectSetup />}
          />

          {/* PROFILE */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* ASSESSMENT OVERVIEW */}

          <Route
            path="/assessment/overview"
            element={<AssessmentOverview />}
          />

          {/* ASSESSMENT RESULTS */}

          <Route
            path="/assessment/results"
            element={<AssessmentResults />}
          />

        </Route>

        {/* =================================================
            FULLSCREEN ASSESSMENT ENVIRONMENT
        ================================================= */}

        <Route element={<AssessmentLayout />}>

          <Route
            path="/assessment"
            element={<AssessmentIntro />}
          />

          <Route
            path="/assessment/system-check"
            element={<SystemRequirements />}
          />

          <Route
            path="/assessment/dsa"
            element={<DsaAssessment />}
          />

          <Route
            path="/assessment/quiz"
            element={<TechnicalQuiz />}
          />

          <Route
            path="/assessment/project"
            element={<ProjectAssessment />}
          />

        </Route>

        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
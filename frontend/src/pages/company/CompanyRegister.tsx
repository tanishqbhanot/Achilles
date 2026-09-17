import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const codeLines = [
  {
    text: "const company = createCompanyAccount({",
    color: "text-[#9E9E9E]",
    indent: "0rem",
  },
  {
    text: "name: companyName,",
    color: "text-[#A6A6A6]",
    indent: "1.5rem",
  },
  {
    text: "email: companyEmail,",
    color: "text-[#929292]",
    indent: "1.5rem",
  },
  {
    text: "role: hiringTeam,",
    color: "text-[#9E9E9E]",
    indent: "1.5rem",
  },
  {
    text: "});",
    color: "text-[#9E9E9E]",
    indent: "0rem",
  },
  {
    text: "const candidates = await discoverCandidates();",
    color: "text-[#A8A8A8]",
    indent: "0rem",
  },
  {
    text: "const assessments = await fetchAssessments();",
    color: "text-[#7F7F7F]",
    indent: "1.5rem",
  },
  {
    text: "const profiles = evaluateCandidates(assessments);",
    color: "text-[#8F8F8F]",
    indent: "1.5rem",
  },
  {
    text: "return createHiringWorkspace(company);",
    color: "text-[#B0B0B0]",
    indent: "0rem",
  },
];

const secondaryCode = [
  "function createHiringWorkspace(company) {",
  "  const candidates = discoverCandidates();",
  "  const assessments = fetchAssessments();",
  "",
  "  return {",
  "    company,",
  "    candidates,",
  "    assessments,",
  "  };",
  "}",
  "",
  "const workspace = createHiringWorkspace(company);",
];

export default function CompanyRegister() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#121212] text-primary">
      {/* =====================================================
          SOFT PAGE TRANSITION
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative min-h-screen"
      >
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-48 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[170px]"
            animate={{
              scale: [1, 1.07, 1],
              opacity: [0.5, 0.75, 0.5],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -right-48 top-[15%] h-[600px] w-[600px] rounded-full bg-accent/[0.045] blur-[170px]"
            animate={{
              x: [0, -35, 0],
              y: [0, 20, 0],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(224,224,224,0.8) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(224,224,224,0.8) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* =================================================
              PRIMARY CODE
          ================================================= */}

          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute left-[2%] top-[10%] hidden w-[720px] font-mono text-[13px] leading-8 tracking-wide blur-[0.2px] lg:block"
              animate={{
                x: [0, 15, 0],
                opacity: [0.32, 0.42, 0.32],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className={`${line.color} whitespace-nowrap`}
                  style={{
                    paddingLeft: line.indent,
                  }}
                >
                  <span className="mr-5 text-[#555]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {line.text}
                </div>
              ))}
            </motion.div>

            {/* =================================================
                SECONDARY CODE
            ================================================= */}

            <div className="absolute right-[-5%] top-[8%] hidden w-[520px] rotate-[-2deg] font-mono text-[11px] leading-7 lg:block">
              {secondaryCode.map((line, index) => (
                <div
                  key={index}
                  className={
                    index === 0 || index === 10
                      ? "text-[#DA224B]/45"
                      : "text-[#9E9E9E]/55"
                  }
                >
                  {line || "\u00A0"}
                </div>
              ))}
            </div>

            <motion.div
              animate={{
                y: [0, -25, 0],
                opacity: [0.06, 0.12, 0.06],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[18%] left-[34%] hidden font-mono text-[11px] text-[#DA224B] lg:block"
            >
              &gt; build.workspace()
            </motion.div>

            <motion.div
              animate={{
                y: [0, 18, 0],
                opacity: [0.04, 0.08, 0.04],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[12%] right-[31%] hidden font-mono text-[11px] text-[#9E9E9E] lg:block"
            >
              &gt; evaluate.profiles()
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-[#121212]/45" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(18,18,18,0.55)_100%)]" />
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <main className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
          {/* =================================================
              LEFT BRAND PANEL
          ================================================= */}

          <section className="relative flex items-center px-8 py-16 sm:px-12 lg:px-16 xl:px-20">
            <div className="w-full max-w-3xl">
              <div className="relative mb-4 w-fit">
                <div className="absolute inset-[-20%] rounded-full bg-accent/10 blur-[60px]" />

                <img
                  src="/achilles-logo.png"
                  alt="Achilles Spartan helmet"
                  className="relative h-36 w-36 object-contain drop-shadow-[0_0_40px_rgba(218,34,75,0.18)] xl:h-40 xl:w-40"
                />
              </div>

              <div>
                <h1
                  className="whitespace-nowrap text-[3.8rem] leading-[0.9] tracking-[0.035em] text-primary sm:text-[4.5rem] lg:text-[4.7rem] xl:text-[5.25rem]"
                  style={{
                    fontFamily:
                      '"Wide Latin", Georgia, serif',
                  }}
                >
                  ACHILLES
                </h1>

                <div className="mt-6 h-[3px] w-[7.5rem] bg-accent" />
              </div>

              <div className="mt-10 max-w-2xl">
                <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-primary sm:text-5xl lg:text-[3.55rem]">
                  Build your
                  <br />
                  <span className="text-accent">
                    hiring workspace.
                  </span>
                </h2>

                <p className="mt-6 max-w-[620px] text-base leading-7 text-secondary sm:text-lg">
                  Create your company workspace to discover
                  candidates, review assessment performance,
                  and evaluate technical talent through
                  demonstrated skill.
                </p>
              </div>

              <div className="mt-14">
                <span className="text-[11px] font-medium tracking-[0.24em] text-secondary/70">
                  COMPANY REGISTRATION
                </span>
              </div>
            </div>
          </section>

          {/* =================================================
              REGISTER
          ================================================= */}

          <section className="relative flex min-h-screen items-center justify-end px-6 py-10 sm:px-10 lg:pl-10 lg:pr-3 xl:pl-12 xl:pr-5 2xl:pr-8">
            <div className="w-full max-w-[610px]">
              <Card className="group relative overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#242424]/45 p-8 shadow-[0_35px_100px_rgba(0,0,0,0.50)] backdrop-blur-[26px] backdrop-saturate-[135%] sm:p-10 xl:p-12">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] via-transparent to-transparent" />

                <motion.div
                  animate={{
                    x: ["-20%", "120%"],
                    opacity: [0, 0.12, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute top-0 h-full w-[35%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-2xl"
                />

                <div className="absolute left-0 right-0 top-0 h-[3px] bg-accent" />

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="relative z-10">
                  <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">
                    COMPANY REGISTRATION
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary xl:text-[2.15rem]">
                    Create your workspace.
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-secondary">
                    Set up your company account to start
                    reviewing technical candidates.
                  </p>
                </div>

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  className="relative z-10 mt-8 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();

                    navigate(
                      "/company/candidate-preferences",
                    );
                  }}
                >
                  {/* COMPANY NAME */}

                  <label className="block text-sm">
                    <span className="mb-2 block font-medium text-secondary">
                      Company name
                    </span>

                    <input
                      type="text"
                      placeholder="Enter your company name"
                      autoComplete="organization"
                      className="w-full rounded-xl border border-white/[0.10] bg-[#121212]/55 px-4 py-3.5 text-sm text-primary outline-none backdrop-blur-md transition-all duration-200 placeholder:text-secondary/40 hover:border-white/[0.16] focus:border-accent focus:bg-[#121212]/70 focus:ring-4 focus:ring-accent/10"
                    />
                  </label>

                  {/* COMPANY EMAIL */}

                  <label className="block text-sm">
                    <span className="mb-2 block font-medium text-secondary">
                      Company email
                    </span>

                    <input
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/[0.10] bg-[#121212]/55 px-4 py-3.5 text-sm text-primary outline-none backdrop-blur-md transition-all duration-200 placeholder:text-secondary/40 hover:border-white/[0.16] focus:border-accent focus:bg-[#121212]/70 focus:ring-4 focus:ring-accent/10"
                    />
                  </label>

                  {/* PASSWORD */}

                  <label className="block text-sm">
                    <span className="mb-2 block font-medium text-secondary">
                      Password
                    </span>

                    <div className="relative">
                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Create a password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-white/[0.10] bg-[#121212]/55 px-4 py-3.5 pr-12 text-sm text-primary outline-none backdrop-blur-md transition-all duration-200 placeholder:text-secondary/40 hover:border-white/[0.16] focus:border-accent focus:bg-[#121212]/70 focus:ring-4 focus:ring-accent/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (previous) =>
                              !previous,
                          )
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-secondary transition-all duration-200 hover:bg-white/[0.04] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </label>

                  {/* CONFIRM PASSWORD */}

                  <label className="block text-sm">
                    <span className="mb-2 block font-medium text-secondary">
                      Confirm password
                    </span>

                    <div className="relative">
                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-white/[0.10] bg-[#121212]/55 px-4 py-3.5 pr-12 text-sm text-primary outline-none backdrop-blur-md transition-all duration-200 placeholder:text-secondary/40 hover:border-white/[0.16] focus:border-accent focus:bg-[#121212]/70 focus:ring-4 focus:ring-accent/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (previous) =>
                              !previous,
                          )
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-secondary transition-all duration-200 hover:bg-white/[0.04] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </label>

                  {/* CREATE ACCOUNT */}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(218,34,75,0.24)]"
                    >
                      <span>
                        Create account
                      </span>

                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>

                {/* =================================================
                    LOGIN
                ================================================= */}

                <p className="relative z-10 mt-7 text-center text-sm text-secondary">
                  Already have a company account?{" "}
                  <Link
                    to="/company/login"
                    className="font-medium text-accent transition-colors duration-200 hover:text-[#ED315C]"
                  >
                    Sign in
                  </Link>
                </p>
              </Card>
            </div>
          </section>
        </main>
      </motion.div>
    </div>
  );
}
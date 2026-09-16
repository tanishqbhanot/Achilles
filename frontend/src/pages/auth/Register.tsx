import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const codeLines = [
  "const candidate = createProfile();",
  "candidate.name = fullName;",
  "candidate.email = email;",
  "candidate.skills = [];",
  "candidate.projects = [];",
  "",
  "candidate.assessment = initialize({",
  "  difficulty: adaptive,",
  "  mode: technical,",
  "});",
  "",
  "profile.save(candidate);",
  "assessment.prepare();",
  "return candidateProfile;",
];

const secondaryCode = [
  "function createProfile() {",
  "  const profile = {",
  "    skills: [],",
  "    projects: [],",
  "  };",
  "",
  "  return profile;",
  "}",
  "",
  "profile.initialize();",
  "assessment.prepare();",
];

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        },
      );

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to create your account");
      }

      navigate("/onboarding/resume");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create your account",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#121212] text-primary">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Crimson atmosphere */}
        <motion.div
          className="absolute -left-48 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-accent/[0.075] blur-[170px]"
          animate={{
            scale: [1, 1.07, 1],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-48 top-[15%] h-[600px] w-[600px] rounded-full bg-accent/[0.035] blur-[170px]"
          animate={{
            x: [0, -35, 0],
            y: [0, 20, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
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

        {/* LEFT CODE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.22,
            x: [0, 12, 0],
          }}
          transition={{
            opacity: {
              duration: 1,
            },
            x: {
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute left-[2%] top-[10%] hidden w-[680px] font-mono text-[13px] leading-8 tracking-wide lg:block"
        >
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.15 + index * 0.04,
              }}
              className={
                index === 7 || index === 11
                  ? "whitespace-nowrap text-accent/60"
                  : "whitespace-nowrap text-[#777]"
              }
            >
              <span className="mr-5 text-[#3f3f3f]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {line}
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT CODE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
          }}
          className="absolute right-[3%] top-[9%] hidden w-[520px] rotate-[-2deg] font-mono text-[11px] leading-7 lg:block"
        >
          {secondaryCode.map((line, index) => (
            <div
              key={index}
              className={
                index === 0 || index === 9
                  ? "text-accent/60"
                  : "text-[#777]"
              }
            >
              {line || "\u00A0"}
            </div>
          ))}
        </motion.div>

        {/* FLOATING CODE */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[18%] left-[34%] hidden font-mono text-[11px] text-accent lg:block"
        >
          &gt; build.profile()
        </motion.div>

        <motion.div
          animate={{
            y: [0, 18, 0],
            opacity: [0.04, 0.1, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[12%] right-[31%] hidden font-mono text-[11px] text-[#777] lg:block"
        >
          &gt; assessment.prepare()
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#121212]/35" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(18,18,18,0.62)_100%)]" />
      </div>

      {/* MAIN */}
      <main className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
        {/* LEFT BRAND */}
        <section className="relative flex items-center px-8 py-16 sm:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-3xl"
          >
            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 16,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.08,
              }}
              className="relative mb-4 w-fit"
            >
              <div className="absolute inset-[-20%] rounded-full bg-accent/10 blur-[60px]" />

              <motion.img
                src="/achilles-logo.png"
                alt="Achilles Spartan helmet"
                className="relative h-36 w-36 object-contain drop-shadow-[0_0_40px_rgba(218,34,75,0.18)] xl:h-40 xl:w-40"
                whileHover={{
                  scale: 1.025,
                  y: -2,
                }}
              />
            </motion.div>

            {/* Wordmark */}
            <h1
              className="whitespace-nowrap text-[3.8rem] leading-[0.9] tracking-[0.035em] text-primary sm:text-[4.5rem] lg:text-[4.7rem] xl:text-[5.25rem]"
              style={{
                fontFamily: '"Wide Latin", Georgia, serif',
              }}
            >
              ACHILLES
            </h1>

            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.65,
                delay: 0.35,
              }}
              className="mt-6 h-[3px] w-[7.5rem] origin-left bg-accent"
            />

            {/* Register message */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="mt-10 max-w-2xl"
            >
              <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-primary sm:text-5xl lg:text-[3.55rem]">
                Build your
                <br />
                <span className="text-accent">
                  technical profile.
                </span>
              </h2>

              <p className="mt-6 max-w-[620px] text-base leading-7 text-secondary sm:text-lg">
                Create your Achilles profile and put your
                technical skills to the test through coding,
                technical, project, and interview-based
                assessment.
              </p>
            </motion.div>

            {/* Est */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.65,
              }}
              className="mt-14"
            >
              <span className="text-[11px] font-medium tracking-[0.24em] text-secondary/70">
                EST. 2026
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* RIGHT REGISTER */}
        <section className="relative flex min-h-screen items-center justify-end px-6 py-12 sm:px-10 lg:pl-10 lg:pr-3 xl:pl-12 xl:pr-5 2xl:pr-8">
          <motion.div
            initial={{
              opacity: 0,
              x: 45,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.75,
              delay: 0.1,
            }}
            className="w-full max-w-[610px]"
          >
            <Card
              className="
                group
                relative
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.14]
                bg-white/[0.055]
                p-8
                shadow-[0_35px_100px_rgba(0,0,0,0.50)]
                backdrop-blur-[28px]
                backdrop-saturate-[150%]
                sm:p-10
                xl:p-12
              "
            >
              {/* Glass surface */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.075] via-white/[0.018] to-transparent" />

              {/* Top reflection */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white/[0.06] to-transparent" />

              {/* Inner border */}
              <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/[0.05]" />

              {/* LIQUID REFLECTION */}
              <motion.div
                animate={{
                  x: ["-120%", "180%"],
                  opacity: [0, 0.09, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  top-[-20%]
                  h-[140%]
                  w-[30%]
                  rotate-[12deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.12]
                  to-transparent
                  blur-2xl
                "
              />

              {/* Crimson reflection */}
              <motion.div
                animate={{
                  x: ["-15%", "35%", "-15%"],
                  opacity: [0.02, 0.06, 0.02],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  pointer-events-none
                  absolute
                  bottom-[-35%]
                  left-[-10%]
                  h-[65%]
                  w-[70%]
                  rounded-full
                  bg-accent/15
                  blur-[100px]
                "
              />

              {/* Crimson top line */}
              <div className="absolute left-0 right-0 top-0 h-[3px] bg-accent" />

              {/* HEADER */}
              <div className="relative z-10">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-accent">
                  CANDIDATE REGISTRATION
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary xl:text-[2.15rem]">
                  Create your account.
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-secondary">
                  Start building your technical profile.
                </p>
              </div>

              {/* FORM */}
              <form
                className="relative z-10 mt-9 flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                {/* Full name */}
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-secondary">
                    Full name
                  </span>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/[0.10]
                      bg-[#121212]/55
                      px-4
                      py-3.5
                      text-sm
                      text-primary
                      outline-none
                      backdrop-blur-md
                      transition-all
                      duration-200
                      placeholder:text-secondary/40
                      hover:border-white/[0.16]
                      focus:border-accent
                      focus:bg-[#121212]/70
                      focus:ring-4
                      focus:ring-accent/10
                    "
                  />
                </label>

                {/* Email */}
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-secondary">
                    Email address
                  </span>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/[0.10]
                      bg-[#121212]/55
                      px-4
                      py-3.5
                      text-sm
                      text-primary
                      outline-none
                      backdrop-blur-md
                      transition-all
                      duration-200
                      placeholder:text-secondary/40
                      hover:border-white/[0.16]
                      focus:border-accent
                      focus:bg-[#121212]/70
                      focus:ring-4
                      focus:ring-accent/10
                    "
                  />
                </label>

                {/* Password */}
                <label className="block text-sm">
                  <span className="mb-2 block font-medium text-secondary">
                    Password
                  </span>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    minLength={8}
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/[0.10]
                      bg-[#121212]/55
                      px-4
                      py-3.5
                      text-sm
                      text-primary
                      outline-none
                      backdrop-blur-md
                      transition-all
                      duration-200
                      placeholder:text-secondary/40
                      hover:border-white/[0.16]
                      focus:border-accent
                      focus:bg-[#121212]/70
                      focus:ring-4
                      focus:ring-accent/10
                    "
                  />
                </label>

                {error && (
                  <p role="alert" className="text-sm text-accent">
                    {error}
                  </p>
                )}

                {/* Create account */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    group
                    mt-1
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    py-3.5
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_34px_rgba(218,34,75,0.24)]
                  "
                >
                  {isSubmitting ? "Creating account..." : "Create account"}

                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  />
                </Button>
              </form>

              {/* Divider */}
              <div className="relative z-10 my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.08]" />

                <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/50">
                  Or continue with
                </span>

                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              {/* Google only */}
              <div className="relative z-10">
                <button
                  type="button"
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/[0.09]
                    bg-[#121212]/50
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-primary
                    backdrop-blur-md
                    transition-all
                    duration-200
                    hover:border-white/[0.17]
                    hover:bg-white/[0.04]
                  "
                >
                  <span className="text-sm font-semibold">
                    G
                  </span>

                  Continue with Google
                </button>
              </div>

              {/* Login */}
              <p className="relative z-10 mt-8 text-center text-sm text-secondary">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="font-medium text-accent transition-colors hover:text-[#ED315C]"
                >
                  Sign in
                </Link>
              </p>
            </Card>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
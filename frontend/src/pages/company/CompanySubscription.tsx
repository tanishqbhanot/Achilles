import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CreditCard,
  Infinity,
  ShieldCheck,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

type PlanId = "basic" | "plus" | "pro";

type Plan = {
  id: PlanId;
  name: string;
  price: string;
  description: string;
  profileLimit: string;
  visibility: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "₹12,999",
    description:
      "For companies looking to discover capable candidates across the wider talent pool.",
    profileLimit: "150 profiles / month",
    visibility:
      "Access to the broader candidate pool, excluding the highest-performing tier.",
    features: [
      "Search by required skills",
      "Assessment-based candidate matching",
      "Access to above-average and broader candidates",
      "View candidate skill profiles",
      "View assessment performance",
      "Candidate project information",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    price: "₹14,999",
    description:
      "For companies that want access to stronger candidates and deeper technical talent.",
    profileLimit: "250 profiles / month",
    visibility:
      "Access to strong and top-performing candidates across the broader pool.",
    features: [
      "Everything in Basic",
      "Access to top-performing candidates",
      "Higher candidate visibility",
      "Deeper assessment performance",
      "Skill-specific candidate matching",
      "Expanded candidate discovery",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹29,999",
    description:
      "For companies that want unrestricted access to the complete Achilles candidate pool.",
    profileLimit: "Unlimited profiles",
    visibility:
      "Full access to every candidate, including the highest-performing candidates.",
    features: [
      "Everything in Plus",
      "Full candidate pool access",
      "Access to highest-performing candidates",
      "Complete skill performance data",
      "Maximum candidate visibility",
      "Full assessment and project evidence",
    ],
  },
];

export default function CompanySubscription() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSkills =
    (location.state as { skills?: string[] } | null)?.skills ?? [];

  const [selectedPlan, setSelectedPlan] =
    useState<PlanId>("plus");

  const currentPlan = plans.find(
    (plan) => plan.id === selectedPlan,
  );

  const handleContinue = () => {
    navigate("/company/dashboard", {
      state: {
        skills: selectedSkills,
        plan: selectedPlan,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <div className="relative min-h-screen overflow-hidden">
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-64 top-[-10%] h-[680px] w-[680px] rounded-full bg-[#da224b]/[0.06] blur-[190px]" />

          <div className="absolute -right-60 bottom-[-15%] h-[700px] w-[700px] rounded-full bg-[#da224b]/[0.045] blur-[190px]" />

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
              backgroundSize: "52px 52px",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(11,11,13,0.9)_100%)]" />
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="relative z-10 border-b border-white/[0.07]">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#da224b]/30 bg-[#171114]">
                <img
                  src="/achilles-logo.png"
                  alt="Achilles"
                  className="h-8 w-8 object-contain"
                />
              </div>

              <p className="text-[12px] font-semibold tracking-[0.28em] text-[#da224b]">
                ACHILLES
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                COMPANY SETUP
              </p>

              <p className="mt-1 text-xs text-white/45">
                Choose your plan
              </p>
            </div>
          </div>
        </header>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-12 lg:px-8 lg:py-16">
          {/* Heading */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#da224b]">
              CHOOSE YOUR ACCESS
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.7rem]">
              Choose how deeply
              <br />
              <span className="text-[#da224b]">
                you search.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/40 sm:text-lg">
              Choose the level of candidate access and profile
              visibility that fits your hiring needs.
            </p>
          </motion.div>

          {/* =================================================
              SELECTED SKILLS
          ================================================= */}

          {selectedSkills.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.08,
              }}
              className="mx-auto mt-8 max-w-[1080px]"
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="mr-1 text-xs text-white/25">
                  Searching for
                </span>

                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/[0.08] bg-[#131013] px-3 py-1.5 text-xs font-medium text-white/55"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* =================================================
              PLANS
          ================================================= */}

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const isSelected = selectedPlan === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className="block h-full w-full text-left"
                    aria-pressed={isSelected}
                  >
                    <Card
                      className={`relative flex h-full min-h-[640px] flex-col overflow-hidden p-6 transition-all duration-300 sm:p-7 ${
                        isSelected
                          ? "border-[#da224b]/50 bg-[#171114] shadow-[0_24px_70px_rgba(218,34,75,0.10)]"
                          : "border-white/[0.08] bg-[#131013] hover:border-white/[0.15] hover:bg-[#151116]"
                      }`}
                    >
                      {/* Selected indicator */}

                      {isSelected && (
                        <motion.div
                          layoutId="selected-plan-line"
                          className="absolute left-0 right-0 top-0 h-[3px] bg-[#da224b]"
                        />
                      )}

                      {/* =================================================
                          PLAN HEADER
                      ================================================= */}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p
                            className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                              isSelected
                                ? "text-[#da224b]"
                                : "text-white/25"
                            }`}
                          >
                            {plan.name}
                          </p>

                          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                            {plan.name}
                          </h2>
                        </div>

                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            isSelected
                              ? "border-[#da224b] bg-[#da224b]"
                              : "border-white/[0.13]"
                          }`}
                        >
                          {isSelected && (
                            <Check
                              size={12}
                              strokeWidth={3}
                              className="text-white"
                            />
                          )}
                        </div>
                      </div>

                      {/* =================================================
                          PRICE
                      ================================================= */}

                      <div className="mt-7">
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-semibold tracking-tight text-white">
                            {plan.price}
                          </span>

                          <span className="mb-1 text-sm text-white/30">
                            / month
                          </span>
                        </div>
                      </div>

                      {/* Description */}

                      <p className="mt-5 min-h-[66px] text-sm leading-6 text-white/40">
                        {plan.description}
                      </p>

                      {/* =================================================
                          PROFILE LIMIT
                      ================================================= */}

                      <div
                        className={`mt-6 rounded-xl border p-4 ${
                          isSelected
                            ? "border-[#da224b]/20 bg-[#241519]"
                            : "border-white/[0.07] bg-[#111113]"
                        }`}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                          Profile views
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          {plan.id === "pro" && (
                            <Infinity
                              size={21}
                              className={
                                isSelected
                                  ? "text-[#da224b]"
                                  : "text-white/45"
                              }
                            />
                          )}

                          <p className="text-lg font-semibold text-white">
                            {plan.profileLimit}
                          </p>
                        </div>
                      </div>

                      {/* =================================================
                          CANDIDATE VISIBILITY
                      ================================================= */}

                      <div
                        className={`mt-3 rounded-xl border p-4 ${
                          isSelected
                            ? "border-[#da224b]/15 bg-[#111113]"
                            : "border-white/[0.07] bg-[#111113]"
                        }`}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                          Candidate visibility
                        </p>

                        <p className="mt-2 text-sm font-medium leading-6 text-white/70">
                          {plan.visibility}
                        </p>
                      </div>

                      {/* =================================================
                          FEATURES
                      ================================================= */}

                      <div className="mt-7 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                          Included
                        </p>

                        <div className="mt-4 space-y-3.5">
                          {plan.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-3"
                            >
                              <div
                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                                  isSelected
                                    ? "bg-[#da224b]/15"
                                    : "bg-white/[0.05]"
                                }`}
                              >
                                <Check
                                  size={10}
                                  strokeWidth={2.5}
                                  className={
                                    isSelected
                                      ? "text-[#da224b]"
                                      : "text-white/35"
                                  }
                                />
                              </div>

                              <span className="text-sm leading-5 text-white/50">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* =================================================
              PAYMENT SUMMARY
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.35,
            }}
            className="mx-auto mt-8 max-w-[1080px]"
          >
            <Card className="border-white/[0.08] bg-[#131013] p-5 sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111113]">
                    <CreditCard
                      size={17}
                      className="text-white/45"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {currentPlan?.name} plan
                    </p>

                    <p className="mt-1 text-sm text-white/30">
                      {currentPlan?.price} billed monthly
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-white/30">
                  <ShieldCheck
                    size={15}
                    className="text-white/35"
                  />

                  Secure payment
                </div>
              </div>
            </Card>
          </motion.div>

          {/* =================================================
              CONTINUE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.42,
            }}
            className="mx-auto mt-7 flex max-w-[1080px] justify-end"
          >
            <Button
              type="button"
              onClick={handleContinue}
              className="group flex min-w-[240px] items-center justify-center gap-2 py-3.5"
            >
              <span>
                Continue with {currentPlan?.name}
              </span>

              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>

          <p className="mx-auto mt-4 max-w-[1080px] text-right text-xs leading-5 text-white/20">
            You will be taken to secure payment to activate your
            subscription.
          </p>
        </main>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

type PlanId = "basic" | "plus" | "pro";

const planNames: Record<PlanId, string> = {
  basic: "Basic",
  plus: "Plus",
  pro: "Pro",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN").format(
    amount,
  );
}

export default function CompanyPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    plan?: PlanId;
    monthlyPrice?: number;
    annualPrice?: number;
    skills?: string[];
  } | null;

  const plan = state?.plan ?? "plus";

  const monthlyPrice =
    state?.monthlyPrice ?? 14999;

  const annualPrice =
    state?.annualPrice ?? 179988;

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  useEffect(() => {
    if (!isProcessing) {
      return;
    }

    /*
     * Temporary prototype timing.
     *
     * The backend/payment provider will eventually
     * determine when payment has actually completed.
     */

    const transitionTimer =
      window.setTimeout(() => {
        setIsTransitioning(true);
      }, 1300);

    const navigationTimer =
      window.setTimeout(() => {
        navigate("/company/dashboard", {
          state: {
            skills: state?.skills ?? [],
            plan,
            paymentStatus: "paid",
          },
        });
      }, 1750);

    return () => {
      window.clearTimeout(
        transitionTimer,
      );

      window.clearTimeout(
        navigationTimer,
      );
    };
  }, [
    isProcessing,
    navigate,
    plan,
    state?.skills,
  ]);

  function handlePayment() {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
  }

  return (
    <motion.div
      animate={
        isTransitioning
          ? {
              opacity: 0,
              y: -10,
            }
          : {
              opacity: 1,
              y: 0,
            }
      }
      transition={{
        duration: 0.42,
        ease: "easeInOut",
      }}
      className="min-h-screen bg-[#0b0b0d] text-white"
    >
      <div className="relative min-h-screen overflow-hidden">
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-56 top-[-10%] h-[620px] w-[620px] rounded-full bg-[#da224b]/[0.055] blur-[180px]" />

          <div className="absolute -right-48 bottom-[-10%] h-[600px] w-[600px] rounded-full bg-[#da224b]/[0.04] blur-[180px]" />

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

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(11,11,13,0.9)_100%)]" />
        </div>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="relative z-10 border-b border-white/[0.07]">
          <div className="mx-auto flex max-w-[1100px] items-center px-6 py-5 lg:px-8">
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
          </div>
        </header>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <main className="relative z-10 mx-auto w-full max-w-[1100px] px-6 py-12 lg:px-8 lg:py-16">
          {/* =================================================
              TITLE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Complete your{" "}
              <span className="text-[#da224b]">
                Payment.
              </span>
            </h1>
          </motion.div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="mx-auto mt-10 grid max-w-2xl gap-5">
            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.06,
              }}
            >
              <Card className="border-white/[0.08] bg-[#131013] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                      Selected plan
                    </p>

                    <h2 className="mt-2 text-xl font-semibold text-white">
                      {planNames[plan]}
                    </h2>

                    <p className="mt-1 text-sm text-white/35">
                      ₹
                      {formatCurrency(
                        monthlyPrice,
                      )}
                      /month
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#da224b]/20 bg-[#241519]">
                    <CreditCard
                      size={17}
                      className="text-[#da224b]"
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-white/[0.07] pt-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/35">
                        Annual subscription
                      </p>

                      <p className="mt-1 text-xs text-white/20">
                        Billed once per year
                      </p>
                    </div>

                    <p className="text-2xl font-semibold text-white">
                      ₹
                      {formatCurrency(
                        annualPrice,
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.section>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.12,
              }}
            >
              <Card className="border-white/[0.08] bg-[#131013] p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111113]">
                    <LockKeyhole
                      size={17}
                      className="text-white/45"
                    />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-white">
                      Secure payment
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-white/35">
                      Continue to secure payment to activate
                      your company subscription.
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <Button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="group flex w-full items-center justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <LoaderCircle
                          size={16}
                          className="animate-spin"
                        />

                        <span>
                          Processing payment
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          Pay ₹
                          {formatCurrency(
                            annualPrice,
                          )}
                        </span>

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/25">
                  <ShieldCheck size={14} />

                  Secure payment processing
                </div>
              </Card>
            </motion.section>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
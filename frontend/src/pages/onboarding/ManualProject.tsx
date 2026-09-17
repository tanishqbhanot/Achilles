import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Topbar from "../../components/layout/Topbar";
import { useAppStore } from "../../store/appStore";

const emptyForm = {
  name: "",
  description: "",
  technologies: "",
  contribution: "",
};

export default function ManualProject() {
  const navigate = useNavigate();

  const {
    projects,
    addProject,
  } = useAppStore();

  const [form, setForm] =
    useState(emptyForm);

  const [error, setError] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  function updateField(
    field: keyof typeof emptyForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleSave() {
    if (projects.length >= 3) {
      setError(
        "You already have three projects in your profile.",
      );
      return;
    }

    const name = form.name.trim();
    const description =
      form.description.trim();

    if (!name) {
      setError("Enter a project name.");
      return;
    }

    if (!description) {
      setError(
        "Describe what the project does.",
      );
      return;
    }

    addProject({
      name,
      description,
      technologies:
        form.technologies.trim(),
      github: "",
      contribution:
        form.contribution.trim(),
    });

    setSaved(true);

    window.setTimeout(() => {
      navigate("/projects");
    }, 450);
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <Topbar
        title="Manual Project"
        subtitle=""
      />

      <main className="mx-auto w-full max-w-5xl px-5 py-7 md:px-8 md:py-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
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
          <button
            type="button"
            onClick={() =>
              navigate("/projects")
            }
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/50"
          >
            <ArrowLeft size={15} />
            Back to Projects
          </button>

          <section className="overflow-hidden rounded-2xl border border-[#da224b]/20 bg-[#191114]">
            <div className="border-b border-[#da224b]/10 px-5 py-5 md:px-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#da224b]/75">
                    Manual project
                  </p>

                  <h1 className="mt-1.5 text-lg font-semibold text-white">
                    Add project details
                  </h1>
                </div>

                <span className="h-1.5 w-1.5 rounded-full bg-[#da224b]/70" />
              </div>
            </div>

            <div className="px-5 py-5 md:px-6 md:py-6">
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/75">
                    Project name
                    <span className="ml-1 text-[#da224b]">
                      *
                    </span>
                  </span>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField(
                        "name",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Achilles"
                    className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/75">
                    Project description
                    <span className="ml-1 text-[#da224b]">
                      *
                    </span>
                  </span>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value,
                      )
                    }
                    placeholder="What does the project do?"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/[0.09] bg-[#111113] px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/75">
                    Technologies used
                  </span>

                  <input
                    type="text"
                    value={form.technologies}
                    onChange={(event) =>
                      updateField(
                        "technologies",
                        event.target.value,
                      )
                    }
                    placeholder="React, Node.js, MongoDB"
                    className="h-12 w-full rounded-xl border border-white/[0.09] bg-[#111113] px-4 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/75">
                    Your contribution
                  </span>

                  <textarea
                    value={form.contribution}
                    onChange={(event) =>
                      updateField(
                        "contribution",
                        event.target.value,
                      )
                    }
                    placeholder="What did you personally build or contribute?"
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/[0.09] bg-[#111113] px-4 py-3.5 text-sm leading-6 text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#da224b]/60 focus:ring-1 focus:ring-[#da224b]/20"
                  />
                </label>
              </div>

              {error && (
                <motion.p
                  initial={{
                    opacity: 0,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-5 text-sm text-[#da224b]"
                >
                  {error}
                </motion.p>
              )}

              <div className="mt-7 flex items-center justify-between border-t border-[#da224b]/10 pt-6">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/projects")
                  }
                  className="text-sm font-medium text-white/40 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da224b]/50"
                >
                  Cancel
                </button>

                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={saved}
                >
                  {saved
                    ? "Project saved"
                    : "Save project"}
                </Button>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
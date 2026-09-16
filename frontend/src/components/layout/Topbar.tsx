import { candidate } from "../../data/mockData";

type TopbarProps = {
  title?: string;
  subtitle?: string;
};

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-white/5 px-8 py-5">
      <div>
        {title ? (
          <h1 className="text-lg font-semibold text-primary">{title}</h1>
        ) : (
          <h1 className="text-lg font-semibold text-primary">
            {candidate.name}
          </h1>
        )}
        {subtitle ? (
          <p className="mt-0.5 text-sm text-secondary">{subtitle}</p>
        ) : null}
      </div>
      <div className="rounded-full border border-white/10 bg-surface px-3 py-1.5 text-xs text-secondary">
        Mock session
      </div>
    </header>
  );
}

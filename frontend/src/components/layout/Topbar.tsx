type TopbarProps = {
  title?: string;
  subtitle?: string;
};

export default function Topbar({
  title = "Dashboard",
  subtitle,
}: TopbarProps) {
  return (
    <header className="border-b border-white/[0.07] bg-[#0b0b0d]">
      <div className="flex min-h-[82px] items-center px-5 md:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-1.5 text-sm text-white/40">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
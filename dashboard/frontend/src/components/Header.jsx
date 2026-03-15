export default function Header({ title, subtitle }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      <div className="rounded-lg border border-slate-700 bg-obsidian-800 px-3 py-2 text-xs text-slate-300">
        Live admin mode
      </div>
    </header>
  );
}

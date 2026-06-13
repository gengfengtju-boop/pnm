export const Cite = ({ ids, refs }) => (
  <span className="inline-flex gap-0.5 ml-1">
    {ids.map(id => (
      <span key={id} className="text-[10px] font-bold text-emerald-300 bg-emerald-900/50 border border-emerald-700/50 rounded px-1 py-0.5 cursor-default"
        title={refs[id] ? `${refs[id].authors} ${refs[id].year}, ${refs[id].journal}` : id}>
        [{id}]
      </span>
    ))}
  </span>
);

export const Table = ({ headers, rows, highlight }) => (
  <div className="overflow-x-auto rounded-lg border border-slate-700/60 mt-3">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-slate-800/80">
          {headers.map((h, i) => (
            <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-slate-300 border-b border-slate-700/60 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className={`border-b border-slate-800/60 ${highlight && ri % 2 === 0 ? "bg-slate-800/20" : "bg-transparent"} hover:bg-slate-700/20 transition-colors`}>
            {row.map((cell, ci) => (
              <td key={ci} className="px-3 py-2 text-slate-300 text-xs leading-relaxed">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Badge = ({ label, color = "slate" }) => {
  const colors = {
    emerald: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
    blue:    "bg-blue-900/40 text-blue-300 border-blue-700/50",
    amber:   "bg-amber-900/40 text-amber-300 border-amber-700/50",
    rose:    "bg-rose-900/40 text-rose-300 border-rose-700/50",
    violet:  "bg-violet-900/40 text-violet-300 border-violet-700/50",
    slate:   "bg-slate-800/60 text-slate-300 border-slate-600/50",
  };
  return <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded border ${colors[color]} mr-1`}>{label}</span>;
};

export const Section = ({ id, title, children }) => (
  <div id={id} className="mb-10 scroll-mt-20">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full" />
      <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
    </div>
    {children}
  </div>
);

export const Card = ({ title, children, accent = "emerald" }) => {
  const accents = {
    emerald: "border-emerald-800/50 bg-emerald-950/20",
    blue:    "border-blue-800/50 bg-blue-950/20",
    amber:   "border-amber-800/50 bg-amber-950/20",
    violet:  "border-violet-800/50 bg-violet-950/20",
    slate:   "border-slate-700/50 bg-slate-900/30",
  };
  return (
    <div className={`rounded-xl border p-4 mb-4 ${accents[accent]}`}>
      {title && <div className="text-sm font-semibold text-slate-200 mb-3">{title}</div>}
      <div className="text-xs text-slate-300 leading-relaxed space-y-2">{children}</div>
    </div>
  );
};

export const FormulaBox = ({ children }) => (
  <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 my-3 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
    {children}
  </div>
);

export const Phase = ({ num, title, color = "emerald", last = false, children }) => {
  const colors = {
    emerald: "bg-emerald-500", blue: "bg-blue-500",
    violet: "bg-violet-500",  amber: "bg-amber-500",
    rose: "bg-rose-500",      slate: "bg-slate-600",
  };
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-7 h-7 rounded-full ${colors[color]} flex items-center justify-center text-[11px] font-black text-white shrink-0`}>{num}</div>
        {!last && <div className="w-0.5 flex-1 bg-slate-800 min-h-[20px] mt-1" />}
      </div>
      <div className="pb-5 flex-1">
        <div className="text-sm font-semibold text-white mb-1.5">{title}</div>
        <div className="text-xs text-slate-400 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import refs from './refs.js';
import { Cite as _Cite } from './components.jsx';

import Background from './sections/Background.jsx';
import DataSources from './sections/DataSources.jsx';
import Framework from './sections/Framework.jsx';
import Parameters from './sections/Parameters.jsx';
import Labels from './sections/Labels.jsx';
import Modeling from './sections/Modeling.jsx';
import QC from './sections/QC.jsx';
import Roadmap from './sections/Roadmap.jsx';
import Outputs from './sections/Outputs.jsx';

const Cite = ({ ids }) => <_Cite ids={ids} refs={refs} />;

const sections = [
  { id: 'background',  label: '背景目标' },
  { id: 'datasources', label: '数据来源' },
  { id: 'framework',   label: '三阶段框架' },
  { id: 'parameters',  label: '参数体系' },
  { id: 'labels',      label: '标签定义' },
  { id: 'modeling',    label: '建模方法' },
  { id: 'qc',          label: '质量控制' },
  { id: 'roadmap',     label: '实施路线' },
  { id: 'outputs',     label: '预期输出' },
  { id: 'references',  label: '文献依据' },
];

function References() {
  return (
    <section id="references" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-emerald-200">文献依据</h2>
      <div className="space-y-3">
        {Object.values(refs).map(r => (
          <div key={r.id} className="flex gap-3 text-sm">
            <span className="font-mono text-emerald-700 w-8 shrink-0">{r.id}</span>
            <div>
              <span className="text-slate-700">{r.authors} ({r.year}). </span>
              <span className="italic text-slate-600">{r.title}. </span>
              <span className="font-medium text-slate-800">{r.journal}</span>
              {r.doi && (
                <span className="text-slate-400"> &middot; doi:{r.doi}</span>
              )}
              <span className="ml-2 inline-flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">IF {r.if}</span>
                <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">{r.q}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-emerald-700 text-lg tracking-tight">ProbioFat-AI&nbsp;<span className="text-slate-400 font-normal text-sm">v3.0</span></span>
          {/* Desktop nav */}
          <div className="hidden md:flex gap-1 flex-wrap">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-3 py-1 text-xs font-medium rounded-full text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >{s.label}</button>
            ))}
          </div>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-slate-600 hover:text-emerald-700"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-wrap gap-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-700"
              >{s.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          三阶段 AI 框架&emsp;M1 &rarr; M2 &rarr; M3
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          ProbioFat-AI&nbsp;<span className="text-emerald-600">v3.0</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          基于公共微生物组数据库的益生菌减脊效应预测、响应分层与组合推荐系统
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'curatedMetagenomicData', color: 'emerald' },
            { label: 'GMrepo v3', color: 'blue' },
            { label: 'Qiita + redbiom', color: 'violet' },
            { label: 'NCBI SRA', color: 'amber' },
            { label: 'ENA / MGnify', color: 'rose' },
          ].map(({ label, color }) => (
            <span key={label}
              className={`px-3 py-1 rounded-full text-xs font-semibold bg-${color}-100 text-${color}-800`}
            >{label}</span>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        <Background />
        <DataSources />
        <Framework />
        <Parameters />
        <Labels />
        <Modeling />
        <QC />
        <Roadmap />
        <Outputs />
        <References />
      </main>

      <footer className="text-center text-xs text-slate-400 pb-8">
        ProbioFat-AI v3.0 &mdash; 公开微生物组数据驱动的益生菌减脊 AI 模型研究框架
      </footer>
    </div>
  );
}

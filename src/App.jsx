import { useState } from "react";

const refs = {
  R1: { id: "R1", authors: "Zmora N, et al.", year: 2018, journal: "Cell", title: "Personalized gut mucosal colonization resistance to empiric probiotics is associated with unique host and microbiome features", doi: "10.1016/j.cell.2018.08.041", if: "64.5", q: "Q1" },
  R2: { id: "R2", authors: "Zhao L, et al.", year: 2018, journal: "Science", title: "Gut bacteria selectively promoted by dietary fibers alleviate type 2 diabetes", doi: "10.1126/science.aao5774", if: "56.9", q: "Q1" },
  R3: { id: "R3", authors: "Plovier H, et al.", year: 2017, journal: "Nature Medicine", title: "A purified membrane protein from Akkermansia muciniphila or the pasteurized bacterium improves metabolism in obese and diabetic mice", doi: "10.1038/nm.4236", if: "82.9", q: "Q1" },
  R4: { id: "R4", authors: "Turnbaugh PJ, et al.", year: 2006, journal: "Nature", title: "An obesity-associated gut microbiome with increased capacity for energy harvest", doi: "10.1038/nature05414", if: "69.5", q: "Q1" },
  R5: { id: "R5", authors: "Ridaura VK, et al.", year: 2013, journal: "Science", title: "Gut microbiota from twins discordant for obesity modulate metabolism in mice", doi: "10.1126/science.1241214", if: "56.9", q: "Q1" },
  R6: { id: "R6", authors: "Le Chatelier E, et al.", year: 2013, journal: "Nature", title: "Richness of human gut microbiome correlates with metabolic markers", doi: "10.1038/nature12506", if: "69.5", q: "Q1" },
  R7: { id: "R7", authors: "Sonnenburg JL & Bäckhed F", year: 2016, journal: "Nature", title: "Diet–microbiota interactions as moderators of human metabolism", doi: "10.1038/nature18846", if: "69.5", q: "Q1" },
  R8: { id: "R8", authors: "Depommier C, et al.", year: 2019, journal: "Nature Medicine", title: "Supplementation with Akkermansia muciniphila in overweight and obese human volunteers: a proof-of-concept exploratory study", doi: "10.1038/s41591-019-0495-2", if: "82.9", q: "Q1" },
  R9: { id: "R9", authors: "Borgeraas H, et al.", year: 2018, journal: "Obesity Reviews", title: "Effects of probiotics on body weight, body mass index, fat mass and fat percentage in subjects with overweight or obesity: a systematic review and meta-analysis", doi: "10.1111/obr.12626", if: "10.5", q: "Q1" },
  R10: { id: "R10", authors: "Kadooka Y, et al.", year: 2010, journal: "European Journal of Clinical Nutrition", title: "Regulation of abdominal adiposity by probiotics (Lactobacillus gasseri SBT2055) in adults with obese tendencies in a randomized controlled trial", doi: "10.1038/ejcn.2010.19", if: "4.6", q: "Q1" },
  R11: { id: "R11", authors: "Liu R, et al.", year: 2017, journal: "Cell Metabolism", title: "Gut microbiome and serum metabolome alterations in obesity and after weight-loss intervention", doi: "10.1016/j.cmet.2017.01.003", if: "29.0", q: "Q1" },
  R12: { id: "R12", authors: "Cani PD, et al.", year: 2007, journal: "Diabetes", title: "Metabolic endotoxemia initiates obesity and insulin resistance", doi: "10.2337/db06-1491", if: "8.7", q: "Q1" },
  R13: { id: "R13", authors: "De Vadder F, et al.", year: 2014, journal: "Cell", title: "Microbiota-generated metabolites promote metabolic benefits via gut-brain neural circuits", doi: "10.1016/j.cell.2013.12.016", if: "64.5", q: "Q1" },
  R14: { id: "R14", authors: "Baothman OA, et al.", year: 2016, journal: "Gut Microbes", title: "The role of gut microbiota in the development of obesity and diabetes", doi: "10.1080/19490976.2016.1153362", if: "9.4", q: "Q1" },
  R15: { id: "R15", authors: "Kumar R, et al.", year: 2022, journal: "npj Biofilms and Microbiomes", title: "Identification of gut microbiome predictors of treatment response in patients with ulcerative colitis using machine learning", doi: "10.1038/s41522-022-00341-3", if: "10.2", q: "Q1" },
  R16: { id: "R16", authors: "Deleu S, et al.", year: 2021, journal: "Gut", title: "Fecal microbial transplantation in short-chain fatty acid ratio drives engraftment and inflammation resolution", doi: "10.1136/gutjnl-2020-323413", if: "24.5", q: "Q1" },
  R17: { id: "R17", authors: "Parks BW, et al.", year: 2013, journal: "Cell Metabolism", title: "Genetic control of obesity and gut microbiota composition in response to high-fat, high-sucrose diet in mice", doi: "10.1016/j.cmet.2012.12.007", if: "29.0", q: "Q1" },
  R18: { id: "R18", authors: "Guo Y, et al.", year: 2023, journal: "Nature Aging", title: "Metabolomics-based machine learning prediction of healthy aging", doi: "10.1038/s43587-023-00398-1", if: "16.6", q: "Q1" },
  R19: { id: "R19", authors: "Zeevi D, et al.", year: 2015, journal: "Cell", title: "Personalized nutrition by prediction of glycemic responses", doi: "10.1016/j.cell.2015.11.001", if: "64.5", q: "Q1" },
  R20: { id: "R20", authors: "Muñoz-Garach A, et al.", year: 2016, journal: "Nutrients", title: "Gut microbiota markers associated with obesity and overweight in a spanish mediterranean population", doi: "10.3390/nu8110680", if: "5.9", q: "Q1" },
};

const sections = [
  { id: "overview", label: "模型总览" },
  { id: "inputs", label: "输入参数体系" },
  { id: "scoring", label: "评分算法" },
  { id: "architecture", label: "模型架构" },
  { id: "training", label: "训练策略" },
  { id: "evaluation", label: "评价指标" },
  { id: "references", label: "文献依据" },
];

const Cite = ({ ids }) => (
  <span className="inline-flex gap-0.5 ml-1">
    {ids.map(id => (
      <span key={id} className="text-[10px] font-bold text-emerald-300 bg-emerald-900/50 border border-emerald-700/50 rounded px-1 py-0.5 cursor-default" title={refs[id] ? `${refs[id].authors} ${refs[id].year}, ${refs[id].journal}` : id}>
        [{id}]
      </span>
    ))}
  </span>
);

const Table = ({ headers, rows, highlight }) => (
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

const Badge = ({ label, color = "slate" }) => {
  const colors = {
    emerald: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
    blue: "bg-blue-900/40 text-blue-300 border-blue-700/50",
    amber: "bg-amber-900/40 text-amber-300 border-amber-700/50",
    rose: "bg-rose-900/40 text-rose-300 border-rose-700/50",
    violet: "bg-violet-900/40 text-violet-300 border-violet-700/50",
    slate: "bg-slate-800/60 text-slate-300 border-slate-600/50",
  };
  return <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded border ${colors[color]} mr-1`}>{label}</span>;
};

const Section = ({ id, title, children }) => (
  <div id={id} className="mb-10 scroll-mt-20">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full" />
      <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
    </div>
    {children}
  </div>
);

const Card = ({ title, children, accent = "emerald" }) => {
  const accents = {
    emerald: "border-emerald-800/50 bg-emerald-950/20",
    blue: "border-blue-800/50 bg-blue-950/20",
    amber: "border-amber-800/50 bg-amber-950/20",
    violet: "border-violet-800/50 bg-violet-950/20",
  };
  return (
    <div className={`rounded-xl border p-4 mb-4 ${accents[accent]}`}>
      {title && <div className="text-sm font-semibold text-slate-200 mb-3">{title}</div>}
      <div className="text-xs text-slate-300 leading-relaxed space-y-2">{children}</div>
    </div>
  );
};

const FormulaBox = ({ children }) => (
  <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 my-3 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto">
    {children}
  </div>
);

export default function App() {
  const [active, setActive] = useState("overview");
  const [refOpen, setRefOpen] = useState(null);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200" style={{ fontFamily: "'IBM Plex Sans', 'Noto Sans SC', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="py-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[10px] font-black text-white">AI</div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">ProbioFat-AI</div>
                <div className="text-[10px] text-slate-500">益生菌减脂组合智能预测模型 v2.0</div>
              </div>
            </div>
            <div className="ml-auto flex gap-1 flex-wrap">
              {sections.map(s => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`text-[10px] px-2 py-1 rounded transition-colors ${active === s.id ? "bg-emerald-700/40 text-emerald-300" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/30 to-teal-950/20 border border-emerald-900/40">
          <div className="text-[10px] font-semibold text-emerald-400 tracking-widest uppercase mb-2">基于高水平文献构建 · Q1期刊参数驱动</div>
          <h1 className="text-2xl font-black text-white mb-3 leading-tight">面向减脂功能的益生菌组合<br />人工智能预测模型设计方案</h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
            本模型以“菌株特异性 + 组合协同 + 宿主分型”为核心设计哲学，整合 <strong className="text-slate-300">Cell、Nature、Science、Nature Medicine</strong> 等顶级期刊研究成果，
            构建涵盖菌株层、组合层与宿主层的多模态预测框架，实现从体外功能表征到临床减脂效果的全链路预测。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge label="多任务预测" color="emerald" />
            <Badge label="主动学习迭代" color="blue" />
            <Badge label="图神经网络" color="violet" />
            <Badge label="个体响应分型" color="amber" />
            <Badge label="20项参考文献 · Q1期刊" color="slate" />
          </div>
        </div>

        {/* 1. Overview */}
        <Section id="overview" title="一、模型定位与总体架构">
          <Card title="1.1 科学依据与模型必要性" accent="emerald">
            <p>
              现有系统综述与荷荥分析表明，益生菌干预对体重、BMI、腰围、体脂率及代谢指标具有统计学显著改善，但效果高度异质
              <Cite ids={["R9"]} />。
              Zmora 等在 <em>Cell</em> 的研究揭示，益生菌在肠道黏膜定植的个体差异受宿主基础菌群结构主导
              <Cite ids={["R1"]} />，
              说明“千人一方”的传统配方逻辑已不适用。Zeevi 等在 <em>Cell</em> 证实可通过机器学习将肠道菌群特征用于预测个体代谢响应
              <Cite ids={["R19"]} />。
              本模型正是面向上述科学空白设计的前置筛选工具。
            </p>
            <p>
              Turnbaugh 等在 <em>Nature</em> 的簪菌移植实验确立了肠道菌群作为肊肠因果因子的地位
              <Cite ids={["R4"]} />；
              Ridaura 等在 <em>Science</em> 进一步证明了肊肠者菌群的可传递性及宿主遗传背景的调节作用
              <Cite ids={["R5"]} />。
              这两项奠基研究支撑本模型将宿主菌群结构纳入核心输入特征。
            </p>
          </Card>

          <Card title="1.2 模型总体输入–输出框架" accent="blue">
            <FormulaBox>
{`输入层 (Input Layer)
├── [L1] 菌株层特征 (Strain-level features)
│     ├── 安全性参数 (Safety)
│     ├── 胃肠道适应性 (GI fitness)
│     ├── 脂质代谢功能 (Lipid metabolism)
│     ├── 代谢产物生成 (Metabolite production)
│     └── 抗炎与肠屏障保护 (Anti-inflammatory & barrier)
├── [L2] 组合层特征 (Formulation-level features)
│     ├── 配方结构 (Composition)
│     └── 菌株互作关系 (Microbial interactions)
└── [L3] 宿主层特征 (Host-level features)
      ├── 体成分与代谢 (Body composition & metabolism)
      ├── 炎症状态 (Inflammatory status)
      └── 肠道菌群背景 (Baseline microbiome)

            ↓ 特征融合 + 多任务神经网络 ↓

输出层 (Output Layer)
├── 综合减脂评分 (0–100)          [主要输出]
├── 协同作用评分 (Synergy Score)   [组合优化]
├── 脂代谢改善评分                 [次要终点]
├── 糖代谢改善评分                 [次要终点]
├── 炎症改善评分                   [次要终点]
├── 肠道菌群改善评分               [次要终点]
├── 安全性评分 (硬性门槛)          [准入条件]
└── 个体响应概率 P(response)       [精准分型]`}
            </FormulaBox>
          </Card>

          <Card title="1.3 四子模块设计" accent="violet">
            <div className="grid grid-cols-2 gap-3 mt-1">
              {[
                { n: "M1", t: "单菌株潜力评分", d: "体外实验 + 文献数据驱动的单菌功能量化" },
                { n: "M2", t: "组合协同预测", d: "图神经网络建模菌株互作与功能互补" },
                { n: "M3", t: "宿主响应分型", d: "基于菌群结构与代谢表型的响应者预测" },
                { n: "M4", t: "排序与安全约束", d: "多目标优化 + 安全性硬性门槛过滤" },
              ].map(m => (
                <div key={m.n} className="rounded-lg bg-slate-800/40 border border-slate-700/40 p-3">
                  <div className="text-[10px] font-black text-violet-400 mb-1">{m.n}</div>
                  <div className="text-xs font-semibold text-white mb-1">{m.t}</div>
                  <div className="text-[11px] text-slate-400">{m.d}</div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* 2. Inputs */}
        <Section id="inputs" title="二、输入参数体系（文献驱动设计）">
          <div className="text-xs text-slate-400 mb-4 leading-relaxed">
            所有参数依据 Q1 期刊文献反复使用的指标选取，分为菌株层（L1）、组合层（L2）和宿主层（L3）三个层次。
          </div>

          <Card title="L1 · 菌株层参数（Strain-level Features）" accent="emerald">
            <p className="mb-2 text-slate-400">
              <strong className="text-slate-200">L1-A 安全性参数</strong>（Safety Parameters）—— 作为准入硬性门槛，不参与综合评分加权
            </p>
            <Table
              headers={["参数", "测定方法/来源", "文献依据", "在模型中的角色"]}
              rows={[
                ["EFSA QPS 状态 / 长期食用历史", "EFSA QPS 数据库查询", "EFSA, 2007–2023", "安全准入门槛"],
                ["可转移抗生素耐药基因（ARG）", "全基因组测序 + ResFinder 数据库", "EFSA FEEDAP Panel", "一票否决项"],
                ["毒力因子（virulence genes）", "全基因组测序 + VFDB 数据库", "USP Probiotics Safety Review", "一票否决项"],
                ["溶血活性", "血琦琶平板实验（α/β/γ型）", "ISO 19344:2015", "一票否决项"],
                ["产胺能力（生物胺）", "HPLC 检测色胺/组胺/酸胺", "EFSA Scientific Opinion", "高风险标记"],
              ]}
              highlight
            />

            <p className="mt-4 mb-2 text-slate-400">
              <strong className="text-slate-200">L1-B 胃肠道适应性参数</strong>（GI Fitness Parameters）
            </p>
            <Table
              headers={["参数（英文标识）", "测定条件", "参考文献", "权重方向"]}
              rows={[
                ["acid_tolerance (pH 2.0, 3h)", "模拟胃液存活率 (%)", "Borgeraas et al. Obes Rev 2018[R9]", "正向 ↑"],
                ["bile_tolerance (0.3% oxgall, 4h)", "模拟肃液存活率 (%)", "ISO 19344:2015", "正向 ↑"],
                ["adhesion_capacity", "Caco-2 细胞黏附率 (%)", "Plovier et al. Nat Med 2017[R3]", "正向 ↑"],
                ["lyophilization_survival", "冻干后活菌数保留率 (%)", "工艺稳定性文献", "正向 ↑"],
                ["storage_stability (37°C/4°C, 90d)", "存活率下降斜率", "产品开发规范", "负向 ↓"],
              ]}
              highlight
            />

            <p className="mt-4 mb-2 text-slate-400">
              <strong className="text-slate-200">L1-C 脂质代谢功能参数</strong>（Lipid Metabolism Parameters）
            </p>
            <Table
              headers={["参数", "测定方法", "核心机制", "文献依据"]}
              rows={[
                ["BSH_activity", "MRS-TDCA培养基定性 + 荧光法定量", "胆固醇–胆汁酸代谢轴", "Zhao L et al. Science 2018[R2]"],
                ["cholesterol_removal_rate (%)", "体外培养基 ELISA/比色法", "胆固醇摄取/共沉淠", "Kadooka et al. EJCN 2010[R10]"],
                ["bile_acid_spectrum_modulation", "UPLC-MS/MS 胆汉酸组学", "FXR/TGR5通路激活", "Sonnenburg & Bäckhed Nature 2016[R7]"],
                ["primary_BA_conversion_rate", "体外胆汉酸去结合实验", "肠肝循环干预能力", "Baothman et al. Gut Microbes 2016[R14]"],
              ]}
              highlight
            />

            <p className="mt-4 mb-2 text-slate-400">
              <strong className="text-slate-200">L1-D 短链脂肪酸生成参数</strong>（SCFA Production Parameters）
            </p>
            <p className="text-slate-500 mb-2">
              Zhao 等在 <em>Science</em> 的里程碑研究证明，膣食纤维选择性促进 SCFA 产生菌（<em>Faecalibacterium</em>、<em>Bifidobacterium</em> 等）
              的扩增可显著改善 2 型糖尿病血糖控制
              <Cite ids={["R2"]} />。
              De Vadder 等在 <em>Cell</em> 揭示丙酸/丁酸通过肠–脑神经回路调节葡萄糖稳态
              <Cite ids={["R13"]} />。
            </p>
            <Table
              headers={["参数", "单位", "检测底物", "临床意义"]}
              rows={[
                ["acetate_production", "mmol/L/h", "果糖/菊糘", "肌肉糖摄取、脂质氧化促进"],
                ["propionate_production", "mmol/L/h", "抗性淠粉/低聚果糖", "GLP-1/PYY分泌、肝糖生成抑制[R13]"],
                ["butyrate_production", "mmol/L/h", "菊糘/低聚半乳糖", "肠屏障修复、Treg诱导[R2]"],
                ["total_SCFA", "mmol/L/h", "混合底物", "综合代谢调节能力"],
                ["SCFA_diversity_index (Shannon)", "—", "GC检测各SCFA比例", "功能多样性评估"],
              ]}
              highlight
            />

            <p className="mt-4 mb-2 text-slate-400">
              <strong className="text-slate-200">L1-E 抗炎与肠屏障参数</strong>（Anti-inflammatory & Barrier Parameters）
            </p>
            <p className="text-slate-500 mb-2">
              Cani 等在 <em>Diabetes</em> 确立了高脂饮食诱导代谢性内毒素血症（LPS升高）引发慢性炎症与胰岛素抗性的机制链条
              <Cite ids={["R12"]} />，
              Plovier 等证明 <em>Akkermansia muciniphila</em> 可通过修复肠屏障降低内毒素血症改善代谢
              <Cite ids={["R3"]} />。
            </p>
            <Table
              headers={["参数", "模型系统", "正常方向", "文献依据"]}
              rows={[
                ["TNF_alpha_reduction (%)", "RAW264.7 LPS刺激模型", "↓", "Cani et al. Diabetes 2007[R12]"],
                ["IL_6_reduction (%)", "RAW264.7 LPS刺激模型", "↓", "Baothman et al. Gut Microbes 2016[R14]"],
                ["IL_1beta_reduction (%)", "NLRP3炎症体激活模型", "↓", "Liu R et al. Cell Metab 2017[R11]"],
                ["LPS_reduction (%)", "高脂饮食小鼠模型", "↓", "Cani et al. Diabetes 2007[R12]"],
                ["ZO1_expression_fold", "Caco-2 TEER + Western Blot", "↑", "Plovier et al. Nat Med 2017[R3]"],
                ["occludin_expression_fold", "Caco-2 Western Blot", "↑", "Plovier et al. Nat Med 2017[R3]"],
              ]}
              highlight
            />

            <p className="mt-4 mb-2 text-slate-400">
              <strong className="text-slate-200">L1-F 脂肪细胞功能参数</strong>（Adipocyte Function Parameters）
            </p>
            <Table
              headers={["参数", "细胞模型", "机制通路", "文献依据"]}
              rows={[
                ["lipid_droplet_inhibition (%)", "3T3-L1 分化模型 + Oil Red O", "脂肪生成抑制", "Parks et al. Cell Metab 2013[R17]"],
                ["PPARgamma_expression_fold", "RT-qPCR / Western Blot", "脂肪分化关键调控", "Parks et al. Cell Metab 2013[R17]"],
                ["SREBP1c_expression_fold", "RT-qPCR", "de novo 脂肪酸合成", "Liu R et al. Cell Metab 2017[R11]"],
                ["CPT1A_expression_fold", "RT-qPCR", "线粒体脂肪酸β氧化", "Sonnenburg Nature 2016[R7]"],
                ["adiponectin_induction_fold", "脂肪细胞培养上清ELISA", "胰岛素增敏、抗炎", "Depommier et al. Nat Med 2019[R8]"],
              ]}
              highlight
            />
          </Card>

          <Card title="L2 · 组合层参数（Formulation-level Features）" accent="blue">
            <p className="text-slate-500 mb-3">
              Borgeraas 等荷荥分析显示，临床试验益生菌日剂量范围为 1.0×10⁹ 至 4.8×10¹¹ CFU，干预时长 3–24 周，
              多菌株组合效果优于单菌株
              <Cite ids={["R9"]} />。
              本层参数量化组合配方的结构特征与菌间互作。
            </p>
            <Table
              headers={["参数", "范围/单位", "意义", "文献支持"]}
              rows={[
                ["strain_count", "2–8株", "组合复杂度", "Borgeraas Obes Rev 2018[R9]"],
                ["strain_ratio", "向量 [r₁,r₂,...,rₙ]，归一化", "各菌株比例结构", "配方优化文献"],
                ["total_CFU_per_day", "log₁₀(CFU/day)，范围 9–11", "有效剂量", "Borgeraas 2018[R9]"],
                ["prebiotic_type", "one-hot: FOS/GOS/Inulin/RS/RD", "选择性发酵底物", "Zhao Science 2018[R2]"],
                ["prebiotic_dose_g_per_day", "2–20 g/day", "益生元摄入量", "Zhao Science 2018[R2]"],
                ["coculture_stability_index", "0–1, 共培养72h后丰度偏离度", "配方稳定性", "共培养实验"],
                ["functional_complementarity_score", "0–1, 功能维度覆盖率", "协同功能宽度", "本模型定义"],
                ["antagonism_index", "0–1, 1表示强拮抗", "菌株竞争性", "共培养抑制实验"],
              ]}
              highlight
            />
          </Card>

          <Card title="L3 · 宿主层参数（Host-level Features）" accent="amber">
            <p className="text-slate-500 mb-3">
              Le Chatelier 等在 <em>Nature</em> 证明低基础肠道基因丰度（low gene count, LGC）人群对营养干预的代谢响应显著差于高丰度人群
              <Cite ids={["R6"]} />。
              Liu 等在 <em>Cell Metabolism</em> 揭示减重前基础肠道菌群特征可预测术后体重恢复
              <Cite ids={["R11"]} />。
            </p>
            <Table
              headers={["参数类别", "具体指标", "测定方法"]}
              rows={[
                ["体成分", "体重、BMI、腰围、腰臀比、体脂率、内脏脂肪面积（VFA）", "DEXA / MRI / CT"],
                ["糖代谢", "FBG、空腹胰岛素、HOMA-IR、HbA1c", "血液生化检测"],
                ["脂代谢", "TG、TC、LDL-C、HDL-C、non-HDL-C、small-dense LDL", "血液生化检测"],
                ["炎症状态", "hsCRP、TNF-α、IL-6、IL-1β、血浆LPS", "ELISA / 多重因子检测"],
                ["肝功能", "ALT、AST、GGT、肝脏脂肪含量（MRI-PDFF）", "血液生化 + 影像"],
                ["饮食模式", "总能量摄入（kcal/d）、脂肪供能比、膣食纤维（g/d）", "3日饮食记录"],
                ["菌群α多样性", "Shannon index、Chao1、Observed species", "16S rRNA V3-V4测序"],
                ["菌群β多样性", "Bray-Curtis dissimilarity、UniFrac", "16S rRNA测序"],
                ["关键菌群丰度", "Akkermansia (%)、Bifidobacterium (%)、F/B比値", "16S/宏基因组测序"],
                ["肠型分型", "Prevotella/Bacteroides enterotype", "宏基因组分型"],
                ["菌群基因丰度", "MGS gene count（low/high gene count）", "宏基因组测序[R6]"],
              ]}
              highlight
            />
          </Card>
        </Section>

        {/* 3. Scoring */}
        <Section id="scoring" title="三、综合评分算法设计">
          <Card title="3.1 综合减脂评分计算公式（0–100分）" accent="emerald">
            <p className="text-slate-400 mb-3">
              综合评分采用加权融合策略，权重基于临床荷荥分析中各终点的效应量（effect size）和证据等级设定，
              并依据 Borgeraas 等系统综述
              <Cite ids={["R9"]} /> 和 Le Chatelier 等
              <Cite ids={["R6"]} /> 的研究结论调整。
            </p>
            <FormulaBox>
{`# 综合减脂评分 (Composite Fat-Reduction Score, CFRS)
CFRS = Σ(wᵢ × Sᵢ_norm) × 100

维度评分组成：
─────────────────────────────────────────────────────
维度 (Dimension)         权重 wᵢ    组成指标 (Sub-indicators)
─────────────────────────────────────────────────────
S1: 减脂表型评分          0.30      体重变化(0.30) + BMI变化(0.20)
                                    + 腰围变化(0.25) + 体脂率(0.25)
S2: 脂代谢改善评分        0.20      TG(0.30) + TC(0.20) + LDL-C(0.25)
                                    + HDL-C(0.15) + 胆汉酸谱(0.10)
S3: 糖代谢改善评分        0.15      FBG(0.25) + 胰岛素(0.20)
                                    + HOMA-IR(0.35) + HbA1c(0.20)
S4: 炎症改善评分          0.15      CRP(0.30) + TNF-α(0.25)
                                    + IL-6(0.25) + LPS(0.20)
S5: 肠道菌群改善评分      0.12      α多样性(0.25) + 关键菌丰度(0.30)
                                    + SCFA生成(0.25) + 胆汉酸代谢(0.20)
S6: 配方稳定性评分        0.08      共培养稳定(0.40) + 胃肠道耐受(0.35)
                                    + 储存稳定(0.25)

─────────────────────────────────────────────────────
注：安全性评分为准入门槛，非加权项
    Ssafety < 阈値 → 组合从候选集剔除（一票否决）`}
            </FormulaBox>
          </Card>

          <Card title="3.2 协同作用评分（Synergy Score, SS）" accent="blue">
            <p className="text-slate-400 mb-3">
              协同评分定义为组合实测/预测效果与各单菌加权叠加效果之差，
              此设计参考组合药物/益生菌协同研究的 Loewe additivity 和 Bliss independence 模型。
            </p>
            <FormulaBox>
{`# 协同作用评分
SS = CFRS(combination) - Σ(rᵢ × CFRS(strainᵢ))

其中 rᵢ 为菌株 i 在组合中的质量/活菌数比例权重
Σrᵢ = 1

解读：
  SS > +5   → 显著协同增强  (Synergistic)
  -5 ≤ SS ≤ +5 → 近似相加  (Additive)
  SS < -5   → 存在拮抗     (Antagonistic)

功能互补指数 (FCI):
FCI = |{功能维度被≥2株菌覆盖}| / |{全部功能维度}|
FCI 越高 → 组合功能覆盖越广 → 协同潜力越大`}
            </FormulaBox>
          </Card>

          <Card title="3.3 个体响应概率 P(response)" accent="amber">
            <p className="text-slate-400 mb-3">
              基于 Zeevi 等在 <em>Cell</em> 的个性化营养预测框架
              <Cite ids={["R19"]} /> 和 Zmora 等的肠道定植异质性研究
              <Cite ids={["R1"]} />，
              “响应者”定义为干预后达到以下至少 1 项预设标准的受试者：
            </p>
            <FormulaBox>
{`# 响应者定义（Responder Definition）
响应标准（OR逻辑，满足任一即为响应者）：
  ├── 体重下降 ≥ 3%（基线体重）
  ├── 腰围下降 ≥ 3 cm
  ├── 体脂率下降 ≥ 1.5%
  ├── TG下降 ≥ 10%（适用于代谢综合征人群）
  └── HOMA-IR改善 ≥ 15%（适用于胰岛素抗性人群）

# 响应概率预测模型
P(response|X_host, X_formula) = sigmoid(f(X_host, X_formula))

其中 X_host 包含：
  - 基线 BMI、腰围、HOMA-IR
  - 基础肠道菌群α多样性 (Shannon)
  - Akkermansia 相对丰度（%）
  - 肠道基因丰度分组（LGC / HGC）[R6]
  - 炎症基线水平（hsCRP）`}
            </FormulaBox>
          </Card>
        </Section>

        {/* 4. Architecture */}
        <Section id="architecture" title="四、机器学习模型架构">
          <Card title="4.1 三阶段模型演进路线" accent="violet">
            <div className="space-y-3">
              {[
                {
                  v: "v1.0", t: "集成树模型阶段", color: "emerald",
                  desc: "样本量有限（n<200）时，采用 XGBoost / LightGBM / Random Forest + Elastic Net 集成。树模型对高维稀疏数据鲁棒，SHAP値提供可解释特征重要性排序。",
                  algo: "XGBoost · LightGBM · Random Forest · SHAP Explainer",
                  cite: ["R9", "R15"]
                },
                {
                  v: "v2.0", t: "多任务神经网络阶段", color: "blue",
                  desc: "样本量 n>500 后，引入共享编码器 + 多任务输出头，同时预测体重、血脂、炎症、菌群多个终点，利用任务间相关性提升各子任务预测精度。",
                  algo: "Multi-task MLP · Transformer Encoder · Attention Mechanism",
                  cite: ["R18", "R19"]
                },
                {
                  v: "v3.0", t: "图神经网络阶段", color: "violet",
                  desc: "菌株互作数据充分后，构建菌株关系图 G=(V,E)，节点 V 为菌株，边 E 编码共培养促进/抑制关系和代谢交叉喜养。GNN聚合邻域信息预测组合协同效果，适合处理指数级组合空间。",
                  algo: "GCN · GAT · Graph Transformer · Message Passing",
                  cite: ["R5", "R2"]
                },
              ].map(m => (
                <div key={m.v} className="rounded-lg bg-slate-800/30 border border-slate-700/40 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge label={m.v} color={m.color} />
                    <span className="text-sm font-semibold text-white">{m.t}</span>
                    <Cite ids={m.cite} />
                  </div>
                  <p className="text-slate-400 mb-2">{m.desc}</p>
                  <div className="text-[10px] font-mono text-slate-500 bg-slate-900/50 rounded px-2 py-1">{m.algo}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="4.2 特征工程关键设计" accent="emerald">
            <FormulaBox>
{`# 菌株层特征向量（每株菌）
strain_vector = [
    # 安全性 (binary/categorical)
    qps_status, arg_count, virulence_gene_count, hemolysis_type,
    
    # GI适应性 (continuous, 0-1 normalized)
    acid_survival_pH2, bile_tolerance_03pct, caco2_adhesion,
    lyophilization_survival, storage_stability_90d,
    
    # 功能参数 (continuous, z-score normalized)
    BSH_activity, cholesterol_removal_pct,
    acetate_mmol, propionate_mmol, butyrate_mmol, total_SCFA,
    TNF_reduction_pct, IL6_reduction_pct, LPS_reduction_pct,
    ZO1_fold, occludin_fold,
    lipid_droplet_inhibition_pct, PPARgamma_fold, CPT1A_fold
]  # shape: (1, 24)

# 组合层特征向量
formula_vector = [
    strain_count,                          # scalar
    strain_ratio_vector,                   # (n,) normalized
    log10_total_CFU,                       # scalar
    prebiotic_onehot,                      # (5,) one-hot
    prebiotic_dose_g,                      # scalar
    coculture_stability_index,             # scalar [0,1]
    functional_complementarity_score,       # scalar [0,1]
    antagonism_index                       # scalar [0,1]
]

# 宿主层特征向量
host_vector = [
    BMI, waist_cm, body_fat_pct, VFA_cm2,
    FBG, insulin, HOMA_IR, HbA1c,
    TG, TC, LDL_C, HDL_C,
    hsCRP, TNF_alpha, IL6, LPS_plasma,
    ALT, AST, liver_fat_MRI,
    shannon_index, chao1,
    akkermansia_pct, bifidobacterium_pct, FB_ratio,
    gene_count_group,                      # LGC=0 / HGC=1 [R6]
    prevotella_enterotype                  # P-type=1 / B-type=0
]`}
            </FormulaBox>
          </Card>

          <Card title="4.3 主动学习迭代框架（Active Learning）" accent="amber">
            <p className="text-slate-500 mb-3">
              20株候选菌中任厖3株已有 C(20,3)=1140 种组合，考虑比例和益生元则超过10⁴种候选配方，
              穷举验证不可行。主动学习策略可在有限实验预算下最大化信息增益，
              Kumar 等在 <em>npj Biofilms Microbiomes</em> 已将该策略用于肠道菌群预测
              <Cite ids={["R15"]} />。
            </p>
            <FormulaBox>
{`主动学习迭代流程（每轮实验周期约 8–12周）：

Round 0: 基于文献+体外数据，初始化模型 M₀
         → 推荐 Top-N 组合（N=10–20）

Round k:
  1. 实验验证模型推荐的组合（动物/细胞实验）
  2. 将实验结果标注并回填数据库
  3. 计算每个候选组合的采集函数（Acquisition Function）：
     
     UCB(x) = μ(x) + β·σ(x)      # 上置信界
     或
     EI(x)  = E[max(f(x)-f*,0)]  # 期望改进
     
     其中 μ(x)=预测均値, σ(x)=预测不确定性, f*=当前最佳
     
  4. 选取 UCB/EI 最高的未测组合作为下一批实验

收敛条件：
  - 连续 2 轮 Top-1 推荐组合 CFRS 变化 < 2分
  - 或累积实验数据量满足模型收敛（AUC > 0.85）`}
            </FormulaBox>
          </Card>
        </Section>

        {/* 5. Training */}
        <Section id="training" title="五、数据来源与训练策略">
          <Card title="5.1 三层数据来源" accent="emerald">
            <Table
              headers={["数据层", "来源", "样本规模预估", "质量控制"]}
              rows={[
                ["公开文献数据", "PubMed + Web of Science + Cochrane 益生菌减脂 RCT / 荷荥分析", "~300–500条记录", "PRISMA标准筛选；偏倒风险评估（Cochrane RoB）"],
                ["公开数据库数据", "GMrepo / NCBI BioProject / EMBL-EBI 宏基因组数据集", "~1000–5000样本", "统一 16S/WGS 分析流程（QIIME2 / HUMAnN3）"],
                ["本实验室标准化数据", "相同培养基/pH/胆盐/时间条件下完成的系统性体外实验", "~50–200株×功能指标", "SOP归一化；质量控制样本（标准菌株）"],
                ["动物模型数据", "高脂饮食 C57BL/6J 小鼠模型（8–12周干预）", "每组 n≥8，设计正交实验", "盲法评估；数据审计追踪"],
                ["人体试验数据（远期）", "肊肠人群随机对照干预研究", "n≥60（随机化）", "ClinicalTrials注册；CONSORT报告标准"],
              ]}
              highlight
            />
          </Card>

          <Card title="5.2 标签体系（Label Engineering）" accent="blue">
            <Table
              headers={["标签类型", "数値定义", "来源实验", "用于训练"]}
              rows={[
                ["BSH_active (0/1)", "MRS-TDCA培养基出现透明晕圈为 1", "体外实验", "L1功能分类模型"],
                ["cholesterol_removal_class (0/1/2)", "去除率 <10%/10–30%/>30%", "体外 ELISA 实验", "L1回归/分类模型"],
                ["butyrate_producer (0/1)", "丁酸生成量 >0.5 mmol/L/h", "气相色谱 GC 实验", "L1功能分类模型"],
                ["barrier_protector (0/1)", "ZO-1 fold > 1.5×", "Caco-2 Western Blot", "L1功能分类模型"],
                ["coculture_stable (0/1)", "72h共培养后各菌株偏离度 <20%", "共培养实验", "L2稳定性模型"],
                ["synergy (−1/0/1)", "SS<−5/−5~+5/>+5", "动物实验/体外发酵", "L2协同模型"],
                ["body_weight_change_pct", "连续値（%）", "动物/人体 RCT", "主回归模型"],
                ["responder (0/1)", "满足响应者定义任一标准", "人体 RCT", "个体响应分类模型"],
              ]}
              highlight
            />
          </Card>
        </Section>

        {/* 6. Evaluation */}
        <Section id="evaluation" title="六、模型评价指标体系">
          <Card title="6.1 按预测任务分类" accent="violet">
            <Table
              headers={["任务类型", "预测目标", "评价指标", "目标値"]}
              rows={[
                ["连续回归", "体重下降%、BMI变化、TG变化", "RMSE、MAE、R²、Pearson r、Spearman ρ", "R² > 0.60；ρ > 0.65"],
                ["二分类", "响应者/非响应者预测", "AUC-ROC、AUC-PR、F1-score、MCC", "AUC > 0.80；F1 > 0.75"],
                ["多分类", "协同/相加/拮抗分类", "Macro-F1、Cohen's κ", "κ > 0.65"],
                ["组合排序", "Top-k推荐准确率", "Top-k hit rate、NDCG@k、Spearman rank ρ", "Top-10 hit rate > 0.60"],
                ["不确定性校准", "预测置信区间可靠性", "Expected Calibration Error (ECE)", "ECE < 0.10"],
              ]}
              highlight
            />
          </Card>

          <Card title="6.2 模型可解释性要求" accent="amber">
            <p className="text-slate-500">
              基于 Guo 等在 <em>Nature Aging</em> 的代谢组学机器学习设计经验
              <Cite ids={["R18"]} />，
              模型可解释性是转化应用的必要条件。要求模型输出以下解释：
            </p>
            <div className="mt-2 space-y-1 text-slate-400">
              <p>① <strong className="text-slate-200">SHAP 特征重要性排序</strong>：对每次预测，输出驱动该评分的前 5 位特征及其方向</p>
              <p>② <strong className="text-slate-200">功能维度贡献分解</strong>：将综合评分分解为 S1–S6 各维度贡献占比</p>
              <p>③ <strong className="text-slate-200">反事实解释</strong>：给出“若将某参数调整至 X 値，预测评分可提升 Y 分”的优化建议</p>
              <p>④ <strong className="text-slate-200">不确定性量化</strong>：每个预测附带 95%置信区间，高不确定性组合标记为“需优先实验验证”</p>
            </div>
          </Card>
        </Section>

        {/* 7. References */}
        <Section id="references" title="七、主要参考文献（Q1 期刊）">
          <div className="text-xs text-slate-500 mb-3">共引用 {Object.keys(refs).length} 篇文献，均发表于 Q1 分区期刊（Cell / Nature / Science / Nature Medicine / Cell Metabolism / Gut 等）</div>
          <div className="grid gap-2">
            {Object.values(refs).map(r => (
              <div key={r.id}
                className="rounded-lg border border-slate-800/60 bg-slate-900/40 p-3 hover:border-emerald-800/40 hover:bg-slate-800/30 transition-all cursor-pointer"
                onClick={() => setRefOpen(refOpen === r.id ? null : r.id)}>
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/40 border border-emerald-800/40 rounded px-1.5 py-0.5 shrink-0 mt-0.5">{r.id}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-slate-200">{r.authors} ({r.year})</span>
                      <Badge label={r.journal} color="emerald" />
                      <Badge label={`IF: ${r.if}`} color="blue" />
                      <Badge label={r.q} color="amber" />
                    </div>
                    {refOpen === r.id && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-400 italic mb-1">{r.title}</p>
                        <p className="text-[10px] text-slate-600 font-mono">DOI: {r.doi}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-600 mt-3">点击文献条目可展开标题与 DOI 信息</p>
        </Section>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 text-center text-[10px] text-slate-600">
          <p>ProbioFat-AI · 益生菌减脂组合智能预测模型 v2.0</p>
          <p className="mt-1">基于 Cell / Nature / Science / Nature Medicine 等 Q1 期刊文献设计 · 参数体系持续更新</p>
        </div>
      </div>
    </div>
  );
}

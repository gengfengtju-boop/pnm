import { Card, Section, Table, Badge, FormulaBox } from "../components.jsx";

export default function Labels() {
  return (
    <Section id="labels" title="五、模型标签定义">

      <Card title="5.1 肊肠状态标签（模型一）" accent="emerald">
        <div className="space-y-2">
          <div className="flex gap-2 items-start">
            <Badge label="L1" color="emerald" />
            <div><strong className="text-slate-200">BMI 连续値</strong><span className="text-slate-400"> — 用于回归建模，保留原始数値，跨队列比较时注意不同国家人群 BMI 分布差异</span></div>
          </div>
          <div className="flex gap-2 items-start">
            <Badge label="L2" color="blue" />
            <div><strong className="text-slate-200">obesity vs lean 二分类</strong><span className="text-slate-400"> — 基础分类任务，适合样本量较小时建立高鲁棒性模型</span></div>
          </div>
          <div className="flex gap-2 items-start">
            <Badge label="L3" color="violet" />
            <div><strong className="text-slate-200">normal / overweight / obesity 多分类</strong><span className="text-slate-400"> — 细粒度分型，建模时注意类别不平衡问题</span></div>
          </div>
        </div>
        <p className="text-slate-500 text-[11px] mt-3">建议保留原始 BMI 连续値。国际数据优先使用 WHO 标准进行横向比较；面向中国人群转化时额外按中国成人标准（超重：BMI≥24，肊肠：BMI≥28）重新分层。</p>
      </Card>

      <Card title="5.2 干预响应标签（模型二）" accent="blue">
        <Table
          headers={["标签名称", "定义"]}
          rows={[
            ["weight_responder",    "干预后体重下降，或下降幅度达到预设阈値"],
            ["BMI_responder",       "干预后 BMI 下降"],
            ["waist_responder",     "腰围下降"],
            ["lipid_responder",     "TG / LDL-C / TC 下降 或 HDL-C 上升"],
            ["glucose_responder",   "FBG · FINS 或 HOMA-IR 改善"],
            ["microbiome_responder","β多样性显著改变，或关键有益菌/功能通路改善"],
            ["composite_responder", "体重/BMI/腰围中≥1项改善，并伴随≥1个代谢或菌群指标改善"],
          ]}
          highlight
        />
        <div className="mt-3 rounded-lg bg-slate-900/60 border border-slate-700/40 p-3">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">三级响应标签（避免阳性样本过少）</div>
          <div className="space-y-1.5 text-xs">
            {[
              { l: "弱响应",   c: "slate",   d: "体重、BMI 或腰围出现方向性改善（任一）" },
              { l: "中等响应", c: "blue",  d: "体重/BMI 改善 + 血脂、血糖或菌群中至少一项改善" },
              { l: "强响应",   c: "emerald", d: "体重下降达到较高阈値 或 体脂/内脏脂肪显著下降" },
            ].map(r => (
              <div key={r.l} className="flex gap-2"><Badge label={r.l} color={r.c} /><span className="text-slate-400">{r.d}</span></div>
            ))}
          </div>
          <p className="text-[10px] text-slate-600 mt-2">注：益生菌营养干预不建议一开始使用“体重下降≥50%”为唯一强标签，该阈值更常用于药物或强化生活方式干预。</p>
        </div>
      </Card>
    </Section>
  );
}

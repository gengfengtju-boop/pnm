import { Card, Section, Badge, FormulaBox } from "../components.jsx";

export default function Framework() {
  const models = [
    {
      id: "M1", color: "emerald",
      title: "肊肠相关菌群状态预测模型",
      input:  "age · sex · BMI · country · disease · 属水平丰度 · 物种水平丰度 · α/β多样性 · MetaCyc通路丰度",
      output: "BMI 连续値 · 肊肠/非肊肠二分类 · 正常/超重/肊肠多分类",
      data:   "curatedMetagenomicData（主） + GMrepo（验证）",
      role:   "建立“肊肠相关菌群背景图谱”，为益生菌组合纠偏设计提供靶向依据。",
    },
    {
      id: "M2", color: "blue",
      title: "益生菌干预响应人群分型模型",
      input:  "干预前菌群组成 + 干预前功能通路 + age/sex/BMI + 益生菌菌株名称/数量/剂量/周期 + 益生元类型",
      output: "体重/BMI响应 · 腰围响应 · 脂代谢响应 · 糖代谢响应 · 菌群响应 · 综合响应",
      data:   "公开益生菌 RCT + SRA/Qiita 干预纵向数据 + 文献证据库（DS7）",
      role:   "从“是否肊肠”推进到“什么样的肊肠人群更可能对某类益生菌组合产生响应”。",
    },
    {
      id: "M3", color: "violet",
      title: "益生菌组合匹配推荐模型",
      input:  "候选菌株基因组功能 + SCFA/胆汉酸/碳水化合物相关基因 + BSH功能 + 安全性注释 + 组合比例 + 益生元适配性",
      output: "单菌株适配评分 · 组合功能互补评分 · 菌群纠偏评分 · 安全性准入结果 · 优先验证等级",
      data:   "MGnify 基因组数据 + 候选菌株功能注释 + M1 菌群缺失特征 + M2 响应规律",
      role:   "最终用于“益生菌组合设计”，可靠性依赖 M1 与 M2 提供的目标人群特征和响应规律。",
    },
  ];

  const accentMap = { emerald: "border-emerald-800/50 bg-emerald-950/20", blue: "border-blue-800/50 bg-blue-950/20", violet: "border-violet-800/50 bg-violet-950/20" };

  return (
    <Section id="framework" title="三、三阶段递进模型框架">
      <div className="grid gap-4">
        {models.map(m => (
          <div key={m.id} className={`rounded-xl border p-4 ${accentMap[m.color]}`}>
            <div className="flex items-center gap-2 mb-3">
              <Badge label={m.id} color={m.color} />
              <span className="text-sm font-bold text-white">{m.title}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">输入</div><div className="text-slate-400 leading-relaxed">{m.input}</div></div>
              <div><div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">输出</div><div className="text-slate-400 leading-relaxed">{m.output}</div></div>
              <div><div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">数据来源</div><div className="text-slate-500 leading-relaxed text-[11px]">{m.data}</div></div>
              <div><div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">模型作用</div><div className="text-slate-500 leading-relaxed text-[11px]">{m.role}</div></div>
            </div>
          </div>
        ))}
      </div>

      <Card title="数据整合路线概述" accent="slate">
        <FormulaBox>{`第一步  curatedMetagenomicData 下载 BMI/年龄/性别/国家完整的簪便宏基因组样本
        提取 species/genus abundance 、MetaCyc pathway abundance

第二步  GMrepo 筛选 obesity/overweight/T2D/NAFLD 相关表型样本
        用于 M1 外部验证 和 共病人群样本扩充

第三步  Qiita/SRA/ENA 检索益生菌、合生元、益生元、减重干预纵向研究
        优先纳入具有基线和干预后样本、明确干预方案、明确 BMI 结局的纵向研究

第四步  公开微生物组—代谢组配对数据集 → 机制解释模型（M3）

第五步  手工整理已发表 RCT 干预参数和结果 → 文献证据数据库`}</FormulaBox>
      </Card>
    </Section>
  );
}

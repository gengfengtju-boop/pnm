import { Card, Section, Badge, FormulaBox } from "../components.jsx";
import refs from "../refs.js";
import { Cite as _Cite } from "../components.jsx";
const Cite = ({ ids }) => <_Cite ids={ids} refs={refs} />;

export default function Background() {
  return (
    <Section id="background" title="一、研究背景与总体目标">
      <Card title="1.1 模型设计必要性" accent="emerald">
        <p>益生菌干预对体重、BMI、腰围、脂代谢和低度炎症具有改善潜力，但不同研究间存在明显异质性<Cite ids={["R9"]} />，主要原因包括菌株特异性差异<Cite ids={["R1"]} />、剂量与周期差异、宿主基础菌群差异<Cite ids={["R6"]} />、饮食背景差异。因此本项目不应直接建立“菌株名称—减脂效果”的简单映射，而应构建以公开数据库为基础、分阶段递进的 AI 预测体系。</p>
        <p>Zeevi 等在 Cell 证实可通过机器学习将肠道菌群特征用于预测个体代谢响应<Cite ids={["R19"]} />；Le Chatelier 等揭示基础肠道基因丰度（LGC vs HGC）决定营养干预响应深度<Cite ids={["R6"]} />。这两项研究支撑本体系以宿主基础菌群分型作为推荐起点。</p>
      </Card>

      <Card title="1.2 四项基本设计原则" accent="blue">
        <div className="grid grid-cols-2 gap-3">
          {[
            { n: "P1", c: "emerald", t: "以公开数据库可获变量为核心", d: "优先使用肠道菌群组成、宏基因组功能通路、BMI、肊肠标签等公开库覆盖最广的变量。GLP-1、LPS、TEER 等机制指标留待第三版机制模型。" },
            { n: "P2", c: "blue",    t: "以跨队列可标准化为前提", d: "优先采用 curatedMetagenomicData 和 GMrepo 等已统一处理的数据库，降低不同研究间测序平台、分析流程和元数据质量的批次效应。" },
            { n: "P3", c: "violet",  t: "先建立基础菌群模型，再建立干预响应模型", d: "横断面肊肠菌群数据丰富（模型一），完整干预数据有限（模型二），基因组功能数据可补充（模型三），三阶段递进降低数据稀缺性风险。" },
            { n: "P4", c: "amber",   t: "安全性作为准入门槛而非评分项", d: "候选菌株须通过安全性硬性门槛（株水平鉴定、毒力因子、可转移耐药基因、溶血风险、QPS/GRAS 证据），不满足者直接排除。" },
          ].map(p => (
            <div key={p.n} className="rounded-lg bg-slate-800/40 border border-slate-700/40 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Badge label={p.n} color={p.c} />
                <span className="text-xs font-semibold text-white">{p.t}</span>
              </div>
              <p className="text-[11px] text-slate-400">{p.d}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="1.3 三阶段模型总体目标" accent="violet">
        <FormulaBox>{`总体目标：
  利用公开肠道微生物组、宏基因组、代谢组、临床表型和益生菌干预数据，
  建立以下三级递进预测体系：

  ┌────────────────────────────────────────┐
  │  M1 肠道菌群状态识别                       │
  │  → 明确肊肠人群菌群偏移特征，建立“靶向纠偏图谱”   │
  ├────────────────────────────────────────┤
  │  M2 益生菌干预响应人群分型                   │
  │  → 预测“哪类人群对哪类组合更可能响应”       │
  ├────────────────────────────────────────┤
  │  M3 候选益生菌组合匹配推荐                   │
  │  → 按目标人群菌群缺失特征推荐优先验证组合     │
  └────────────────────────────────────────┘

  最终输出：适合后续实验验证和产品开发的数据驱动型微生态干预平台`}</FormulaBox>
      </Card>
    </Section>
  );
}

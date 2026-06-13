import { Card, Section, Table, Badge, FormulaBox } from "../components.jsx";
import refs from "../refs.js";
import { Cite as _Cite } from "../components.jsx";
const Cite = ({ ids }) => <_Cite ids={ids} refs={refs} />;

export default function Modeling() {
  return (
    <Section id="modeling" title="六、建模方法">

      <Card title="6.1 M1 肊肠相关菌群状态模型" accent="emerald">
        <p className="text-slate-500 mb-3">树模型适合处理高维、非线性和稀疏微生物组特征，Elastic Net 可作为线性可解释模型筛选稳健菌群标志物<Cite ids={["R15", "R18"]} />。</p>
        <div className="space-y-2 text-xs mb-3">
          <div><Badge label="主模型" color="emerald" /><span className="text-slate-300">XGBoost · LightGBM · Random Forest</span><span className="text-slate-500"> — 高维稀疏特征，输出 SHAP 特征重要性</span></div>
          <div><Badge label="基线模型" color="blue" /><span className="text-slate-300">Elastic Net</span><span className="text-slate-500"> — 线性可解释，筛选跨队列稳健菌群标志物</span></div>
          <div><Badge label="验证策略" color="violet" /><span className="text-slate-300">leave-one-study-out cross-validation</span><span className="text-slate-500"> — 每次留出一个研究队列作为外部测试集</span></div>
        </div>
        <Table
          headers={["任务", "输出", "评价指标", "目标値"]}
          rows={[
            ["BMI 回归",  "BMI 连续値",         "RMSE · MAE · R² · Pearson r · Spearman ρ", "R² > 0.40；ρ > 0.50"],
            ["肊肠二分类", "obesity / lean",     "AUC-ROC · F1 · Balanced Accuracy",        "AUC > 0.80"],
            ["三分类",    "normal/overweight/obese", "Macro-F1 · Cohen's κ",                   "κ > 0.55"],
          ]}
          highlight
        />
      </Card>

      <Card title="6.2 M2 益生菌干预响应分型模型" accent="blue">
        <div className="space-y-2 text-xs mb-3">
          <div><Badge label="主模型" color="blue" /><span className="text-slate-300">XGBoost · LightGBM · 多任务学习模型</span><span className="text-slate-500"> — 同时预测多个响应维度</span></div>
          <div><Badge label="辅助分析" color="violet" /><span className="text-slate-300">因果推断（IPW · DML）</span><span className="text-slate-500"> — 控制混杆变量，估计干预效果</span></div>
          <div><Badge label="验证策略" color="amber" /><span className="text-slate-300">leave-one-study-out CV</span><span className="text-slate-500"> — 跨研究泛化能力是核心验证标准</span></div>
        </div>
        <p className="text-slate-500 text-[11px]">若模型仅在随机拆分样本中表现良好但在新研究队列中表现下降，说明学习到了研究批次效应而非真实生物学规律。</p>
      </Card>

      <Card title="6.3 M3 益生菌组合推荐模型" accent="violet">
        <p className="text-slate-500 mb-3">采用“规则模型 + 机器学习 + 主动学习”构建，因公开数据库中完整组合干预数据有限。</p>
        <FormulaBox>{`Step 1  基于 M1 输出，识别目标人群缺失/降低的功能模块
        例：丁酸生成菌减少 · Bifidobacterium 低丰度 · 胆汉酸通路异常

Step 2  基于候选菌株基因组注释和文献证据，计算每株菌功能适配评分

Step 3  按功能互补度 · 安全性 · 生态位匹配 · 益生元适配性对候选组合排序

主动学习迭代：
  Round k: 实验验证 → 结果回填 → UCB/EI 采集函数 → 下一批实验
  UCB(x) = μ(x) + β·σ(x)    EI(x) = E[max(f(x)-f*,0)]
  收敛条件：连续 2 轮 Top-1 CFRS 变化 < 2分 或 AUC > 0.85`}</FormulaBox>
      </Card>
    </Section>
  );
}

import { Section, Phase, Card, Badge } from '../components.jsx';

export default function Roadmap() {
  return (
    <Section id="roadmap" title="实施路线">
      <p className="text-slate-600 mb-6">
        整个项目分六个阶段推进，每个阶段有明确的交付物和进入下一阶段的阈值指标。
      </p>

      <div className="relative">
        <Phase num={1} title="数据汇聚与标准化" color="emerald">
          <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
            <li>从 curatedMetagenomicData、GMrepo v3、Qiita+redbiom 下载原始数据</li>
            <li>应用 MVP metadata schema 对元数据进行字段映射与清洗</li>
            <li>CLR / AST 变换，以 study_id 为建空 batch 堆叠鉴别</li>
            <li>ComBat(-seq) 批次模型训练与上线</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Badge label="交付物" color="emerald" />
            <span className="text-sm text-slate-600">标准化数据集 v1.0（肥胖概率 ≥ 30%）</span>
          </div>
        </Phase>

        <Phase num={2} title="M1 模型训练（肥胖微生物组状态预测）" color="blue">
          <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
            <li>XGBoost / LightGBM / RF 集成 + Elastic Net 内嵌特征选择</li>
            <li>LOSO-CV 跨研究验证，记录每折 AUC/F1/确证率/防止率</li>
            <li>SHAP 全局特征重要性分析，锁定 Top-30 属种特征</li>
            <li>Shapley 交互配对检验属种协同/拮抗关系</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Badge label="进入阈值" color="blue" />
            <span className="text-sm text-slate-600">LOSO AUC ≥ 0.75</span>
          </div>
        </Phase>

        <Phase num={3} title="M2 模型训练（干预响应分层）" color="violet">
          <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
            <li>干预研究微生物组纵向数据引入，计算 ΔBMI/ΔFirmicutes–Bacteroidetes 比等标签</li>
            <li>多任务学习（共享验证层）联合 ΔBMI + Δ多样性指标</li>
            <li>IPW / DML 因果推断检验干预效果可信度</li>
            <li>搜集刻划两种相反菌株组合的协同/拮抗样本</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Badge label="进入阈值" color="violet" />
            <span className="text-sm text-slate-600">响应分层 Spearman r ≥ 0.40</span>
          </div>
        </Phase>

        <Phase num={4} title="M3 模型训练（组合推荐）" color="amber">
          <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
            <li>生成初始规则库：单菌株 > 双菌层次归纳</li>
            <li>训练 GBM/NN 组合效果预测器，输入为菌株特征 × 宿主微生物组特征</li>
            <li>UCB / EI 主动学习循环，优先选取预期方差最大组合</li>
            <li>初始推荐列表生成前需 ≥ 50 条小鼠实验数据点</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Badge label="进入阈值" color="amber" />
            <span className="text-sm text-slate-600">组合实验拥有 ≥ 50 个有效数据点</span>
          </div>
        </Phase>

        <Phase num={5} title="外部验证与临床试点" color="rose">
          <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
            <li>在独立队列（木木或其他研究）验证 M1/M2 性能</li>
            <li>小型随机对照试验验证 M3 推荐组合（n = 20–40 / 组）</li>
            <li>收集 16S + WGS + 代谢组数据，点位验证机制层假设</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Badge label="进入阈值" color="rose" />
            <span className="text-sm text-slate-600">临床 CONSORT 合格 + 主要终点显著</span>
          </div>
        </Phase>

        <Phase num={6} title="报告与开放发布" color="slate" last>
          <ul className="space-y-1 text-sm text-slate-700 list-disc list-inside">
            <li>撞自然期刊全文发表，提交 microbiome data catalog 至 curatedMetagenomicData</li>
            <li>将标准化流程、模型调用接口、菌株知识库开源发布至 GitHub</li>
            <li>Web 展示层（当前页面）持续迭代更新</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Badge label="最终交付" color="slate" />
            <span className="text-sm text-slate-600">开源代码 + 数据 + 论文</span>
          </div>
        </Phase>
      </div>
    </Section>
  );
}

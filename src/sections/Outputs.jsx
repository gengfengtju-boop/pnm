import { Section, Card, Badge, Table } from '../components.jsx';
import { Cite as _Cite } from '../components.jsx';
import refs from '../refs.js';

const Cite = ({ ids }) => <_Cite ids={ids} refs={refs} />;

const combinationTypes = [
  ['Type A','单菌强势','对宿主微生物组单项指标最优的单一菌株，适合微生物组失调较少者'],
  ['Type B','双菌协同','两株具有协同作用（SHAP交互判断），联合增强 SCFA/胆汁酸转化'],
  ['Type C','双菌拮抗 (亚位)​','居1主1屋位竞争例如同一磁线上的二株 Lactobacillus，需要针对性选择'],
  ['Type D','主益+元益','益生菌+特异底物充分发挥协同效应，如 Akkermansia + inulin'],
  ['Type E','三菌复合','居高不确定性 / 长尾组合，需主动学习验证后方可推荐'],
];

export default function Outputs() {
  return (
    <Section id="outputs" title="预期输出">
      <p className="text-slate-600 mb-6">
        本框架将最终产出三类可兼容的输出物，支撑后续干预研究、临床试点设计与开放科学发布。
        <Cite ids={['R4','R16']} />
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card title="O1 肥胖微生物组特征库" accent="emerald">
          <div className="space-y-3 text-sm text-slate-700">
            <p>基于 M1 SHAP 分析锤定的多队列、跨地理区域肥胖相关微生物组标志。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Top-30 属种指标及效应量范围</li>
              <li>16S vs WGS 一致性评估</li>
              <li>地理区域分层差异表</li>
              <li>curatedMetagenomicData 兼容格式导出</li>
            </ul>
            <div className="pt-2">
              <Badge label="格式" color="emerald" />
              <span className="ml-2">CSV + RDS + HDF5</span>
            </div>
          </div>
        </Card>

        <Card title="O2 响应分层模型" accent="blue">
          <div className="space-y-3 text-sm text-slate-700">
            <p>M2 训练完成的多任务分层模型，可对新宿主进行全因素预测。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>强响应 / 中响应 / 弱响应 三级分类器</li>
              <li>LOSO-CV 内部评估报告</li>
              <li>IPW/DML 因果推断检验结果</li>
              <li>ONNX 可移植格式导出</li>
            </ul>
            <div className="pt-2">
              <Badge label="格式" color="blue" />
              <span className="ml-2">pkl + ONNX + JSON config</span>
            </div>
          </div>
        </Card>

        <Card title="O3 组合推荐列表" accent="violet">
          <div className="space-y-3 text-sm text-slate-700">
            <p>M3 主动学习生成的候选益生菌组合，分 5 类型输出。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>容量 ≥ 200 条候选组合（验证后削至 Top-50）</li>
              <li>每条附 UCB/EI 优先度分</li>
              <li>宿主微生物组亚型匹配字段</li>
              <li>小鼠/人类实验验证状态标注</li>
            </ul>
            <div className="pt-2">
              <Badge label="格式" color="violet" />
              <span className="ml-2">JSON 知识库 + CSV</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="O3 组合类型详解" accent="slate">
        <p className="text-sm text-slate-500 mb-3">候选组合按以下五种模式分类，每种模式对应不同宿主微生物组贴近类型：</p>
        <Table
          headers={['类型','命名','适用场景']}
          rows={combinationTypes}
        />
        <p className="mt-4 text-sm text-slate-600">
          <Badge label="注" color="slate" />&nbsp;
          Type E（三菌复合）需主动学习进一步实验数据点后方可解锁，
          初始推荐列表仅包含 Type A–D。<Cite ids={['R11','R20']} />
        </p>
      </Card>
    </Section>
  );
}

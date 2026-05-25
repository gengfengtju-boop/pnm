import { Section, Card, Table, Badge, FormulaBox } from '../components.jsx';
import _Cite from '../components.jsx';
import refs from '../refs.js';

const Cite = ({ ids }) => <_Cite ids={ids} refs={refs} />;

const metaFields = [
  ['subject_id','string','UUID','受试者唯一标识'],
  ['study_id','string','PMID/SRA study','文章或队列来源'],
  ['country','string','ISO 3166-1 alpha-2','采样国家'],
  ['age','float','years','年龄'],
  ['sex','string','M/F/O','性别'],
  ['bmi','float','kg/m²','体质量指数'],
  ['disease_status','string','obese/overweight/normal','肥胖状态'],
  ['platform','string','16S/WGS/MGS','测序平台'],
  ['seq_depth','int','reads','测序深度（过滤后）'],
  ['timepoint','string','baseline/wk4/wk8/…','时间节点'],
];

const interventionFields = [
  ['strain_name','string','NCBI tax ID + ATCC/DSM编号','菌株全名'],
  ['dose_log10_cfu','float','log₁₀ CFU/day','日剂量对数变换'],
  ['duration_weeks','int','weeks','干预周数'],
  ['prebiotic','string','FOS/GOS/inulin/none','益生元搭配'],
  ['delivery_form','string','capsule/powder/food','剂型'],
  ['washout_weeks','int','weeks','洗脱期'],
];

const inclusionRows = [
  ['seq_depth ≥ 10 000 reads (WGS) or ≥ 5 000 reads (16S)','✅','测序深度不足样本排除'],
  ['BMI 信息完整且 18 ≤ BMI ≤ 70','✅','极端 BMI 视为数据错误'],
  ['纵向研究至少 2 个时间点','✅','单时间点无法计算 delta'],
  ['干预研究须提供菌株 NCBI Taxonomy ID','✅','无法映射菌株知识库'],
  ['样本非克隆重复（sequence similarity < 99.9%）','✅','防止信息泄露至验证集'],
];

export default function QC() {
  return (
    <Section id="qc" title="质量控制">
      <p className="text-slate-600 mb-6">
        多来源微生物组数据在测序平台、注释流程、元数据规范上存在显著异质性。
        统一的 QC 流程是确保跨队列模型泛化能力的基础。
        <Cite ids={['R3','R7']} />
      </p>

      <Card title="元数据标准化字段" accent="emerald">
        <p className="text-sm text-slate-500 mb-3">所有纳入样本须包含以下最小字段集（MVP metadata schema）：</p>
        <Table
          headers={['字段名','类型','单位/格式','说明']}
          rows={metaFields}
        />
      </Card>

      <Card title="微生物组丰度标准化" accent="blue">
        <p className="text-sm text-slate-500 mb-3">
          原始相对丰度直接建模存在成分数据偏差。本框架采用以下双轨变换策略：
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="font-semibold text-slate-700 mb-2">WGS / MGS 样本</div>
            <FormulaBox>
{`CLR(x_i) = ln(x_i) - (1/D) Σ ln(x_j)

其中 x_i 为第 i 个物种的相对丰度，
D 为非零特征数；零值替换为
伪计数 δ = min(非零值) / 2`}
            </FormulaBox>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="font-semibold text-slate-700 mb-2">16S rRNA 扩增子样本</div>
            <FormulaBox>
{`AST(x_i) = arcsin(sqrt(x_i))

稳定方差，适用于稀疏 OTU/ASV 表；
16S 与 WGS 数据分开建立特征空间，
不直接混合输入同一模型`}
            </FormulaBox>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          <Badge label="注意" color="amber" /> 16S 扩增子与 WGS 宏基因组数据<strong>不直接混合</strong>进入同一特征矩阵；
          在元分析中通过集成学习（stacking）融合两类模型输出。
        </div>
      </Card>

      <Card title="批次效应控制" accent="violet">
        <p className="text-sm text-slate-500 mb-3">
          不同研究间的测序批次、DNA提取方案和生物信息学流程是主要混杂因素。
        </p>
        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <Badge label="协变量" color="violet" />
            <div className="text-sm text-slate-700">
              在所有回归/分类模型中强制纳入 <code className="bg-slate-100 px-1 rounded">study_id</code>、
              <code className="bg-slate-100 px-1 rounded">country</code>、
              <code className="bg-slate-100 px-1 rounded">platform</code> 作为随机效应或独热编码协变量。
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Badge label="LOSO-CV" color="emerald" />
            <div className="text-sm text-slate-700">
              Leave-One-Study-Out 交叉验证：每折完整留出一个研究队列用于测试，
              防止研究内相关性导致性能虚高。<Cite ids={['R8']} />
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Badge label="ComBat-seq" color="blue" />
            <div className="text-sm text-slate-700">
              对负二项分布计数数据应用 ComBat-seq 进行批次校正；
              CLR 变换后数据使用原始 ComBat（线性）。保留生物学变量（BMI、disease_status）不纳入批次模型。
            </div>
          </div>
        </div>
      </Card>

      <Card title="干预数据规范化" accent="amber">
        <p className="text-sm text-slate-500 mb-3">益生菌干预研究的剂量与菌株信息须统一编码后方可跨研究对比：</p>
        <Table
          headers={['字段名','类型','单位/格式','说明']}
          rows={interventionFields}
        />
        <div className="mt-3 text-sm text-slate-600">
          <Badge label="剂量变换" color="amber" /> CFU 跨度达 10⁸–10¹¹，
          统一取 log₁₀ 后与其余数值特征量纲一致，避免梯度爆炸。
        </div>
      </Card>

      <Card title="样本纳入/排除标准" accent="rose">
        <Table
          headers={['标准','执行','说明']}
          rows={inclusionRows}
          highlight={[0,1,2,3,4]}
        />
      </Card>
    </Section>
  );
}

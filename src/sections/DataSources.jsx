import { Card, Section, Table, Badge } from "../components.jsx";
import refs from "../refs.js";
import { Cite as _Cite } from "../components.jsx";
const Cite = ({ ids }) => <_Cite ids={ids} refs={refs} />;

export default function DataSources() {
  return (
    <Section id="datasources" title="二、数据来源体系">
      <div className="text-xs text-slate-400 mb-4">DS1–DS2 为核心训练数据源，DS3–DS5 为补充/验证数据源，DS6–DS7 为机制解释数据源。</div>

      <Card title="DS1 · curatedMetagenomicData（第一优先级）" accent="emerald">
        <p className="text-slate-500 mb-3">Bioconductor 标准化人体微生物组数据库，物种组成由 MetaPhlAn3 统一计算，功能潜力由 HUMAnN3 统一计算，适合跨队列机器学习建模。主要用于<strong className="text-slate-200"> M1</strong>。</p>
        <Table
          headers={["数据类型", "具体字段", "用途"]}
          rows={[
            ["宿主元数据", "age · sex · BMI · country · disease · study_name · body_site", "宿主基础特征 + 混杠校正变量"],
            ["菌群组成", "species_abundance · genus_abundance · marker_abundance", "肊肠相关菌群特征（主体建模）"],
            ["菌群功能", "gene_families · MetaCyc pathway abundance · pathway coverage", "SCFA / 胆汉酸 / 碳水化合物代谢功能特征"],
            ["标签变量", "BMI · obesity/lean · disease_status", "BMI 回归 + 肊肠分类标签"],
          ]}
          highlight
        />
        <p className="text-[11px] text-slate-500 mt-2">筛选标准：簪便来源 · shotgun metagenome 优先 · 保留具有 BMI/年龄/性别/国家信息的样本 · 按 study_id 设置批次协变量</p>
      </Card>

      <Card title="DS2 · GMrepo / GMrepo v3（第二优先级）" accent="blue">
        <p className="text-slate-500 mb-3">人工整理和一致注释的人体肠道宏基因组数据库。v3 已扩展至 890 个项目、118,965 个样本，疾病标注 302 种，适合跨代谢疾病分析<Cite ids={["R15"]} />。</p>
        <Table
          headers={["数据类型", "具体字段", "用途"]}
          rows={[
            ["宿主元数据", "年龄 · 性别 · BMI · 地域 · 健康/疾病状态", "肊肠/代谢异常分层"],
            ["菌群数据", "16S 或 metagenomic taxonomic profile", "肊肠相关菌群标志物筛选"],
            ["疾病表型", "obesity · T2D · NAFLD · metabolic syndrome 等", "肊肠及共病相关模型"],
            ["跨疾病比较", "肊肠/糖尿病/脂肪肝共同菌群特征", "代谢病共性微生态特征识别"],
          ]}
          highlight
        />
        <p className="text-[11px] text-slate-500 mt-2">16S 与 shotgun 数据分开建模。主要作为 M1 外部验证集，并扩充共病人群样本。</p>
      </Card>

      <Card title="DS3 · Qiita + redbiom（补充数据源）" accent="amber">
        <p className="text-slate-500 mb-3">开放微生物组数据管理和再分析平台，可通过 redbiom 快速检索包含 probiotic、prebiotic、obesity、BMI 等关键词的纵向研究。主要用于 <strong className="text-slate-200">M2</strong> 样本补充。</p>
        <Table
          headers={["数据类型", "具体字段", "用途"]}
          rows={[
            ["样本元数据", "study_id · host phenotype · body_site · diet · intervention metadata", "筛选益生菌/饮食干预相关队列"],
            ["菌群数据", "BIOM table · ASV/OTU abundance", "16S 菌群组成分析"],
            ["干预信息", "probiotic/prebiotic intervention metadata（若有）", "M2 纵向样本补充"],
          ]}
          highlight
        />
        <p className="text-[11px] text-slate-500 mt-2">建议仅作补充/验证数据源，若用于训练主模型需统一下载 raw data 后采用 DADA2/QIIME2 重新分析。</p>
      </Card>

      <Card title="DS4 · NCBI SRA / BioSample / BioProject（原始数据补充）" accent="violet">
        <Table
          headers={["数据类型", "具体字段", "用途"]}
          rows={[
            ["原始测序数据", "FASTQ / SRA files", "统一重分析流程"],
            ["BioProject 信息", "项目编号 · 研究标题 · 研究设计", "确定干预类型和研究背景"],
            ["BioSample 元数据", "host · body_site · disease · BMI · treatment · time_point", "构建样本级元数据"],
          ]}
          highlight
        />
        <p className="text-[11px] text-slate-500 mt-2">检索关键词：obesity · overweight · probiotic · synbiotic · prebiotic · weight loss · metabolic syndrome · gut microbiome · fecal metagenome</p>
      </Card>

      <Card title="DS5 · ENA + MGnify（欧洲数据源）" accent="emerald">
        <Table
          headers={["数据源", "可获取内容", "用途"]}
          rows={[
            ["ENA", "原始测序数据 · 项目/样本元数据", "与 SRA 互补，获取欧洲队列数据"],
            ["MGnify", "taxonomic assignments · functional annotations · KEGG modules", "快速获取已分析分类和功能注释"],
            ["MGnify Genomes", "非冗余微生物基因组目录 · 功能注释", "候选菌株功能匹配和参考基因组补充"],
          ]}
          highlight
        />
      </Card>

      <Card title="DS6 · 公开微生物组—代谢组配对数据集（机制解释）" accent="slate">
        <p className="text-slate-500 mb-2">整合多个队列中簪便微生物组与代谢组配对数据。<strong className="text-slate-300">不建议作为第一版核心训练集</strong>，主要用于第三版机制解释模型，建立菌群组成/功能通路 → SCFA/胆汉酸/氨基酸代谢物的映射关系。</p>
      </Card>

      <Card title="DS7 · 公开益生菌干预研究与临床试验文献（半结构化证据）" accent="slate">
        <p className="text-slate-500 mb-2">系统整理已发表 RCT 和高水平研究中的干预参数和结果，形成半结构化文献证据数据库<Cite ids={["R9", "R10", "R8"]} />。</p>
        <Table
          headers={["字段", "内容"]}
          rows={[
            ["研究设计", "RCT · 双盲 · 安慰剂对照 · 交叉设计 · 队列研究"],
            ["干预信息", "菌株名称 · 菌株数 · 剂量（CFU/day）· 剂型 · 益生元类型 · 干预周期"],
            ["主要终点", "体重 · BMI · 腰围 · 体脂率 · 脂肪量 · 内脏脂肪面积"],
            ["次要终点", "TG · TC · LDL-C · HDL-C · FBG · FINS · HOMA-IR · CRP · IL-6 · TNF-α"],
            ["菌群终点", "α/β 多样性 · 关键菌属/菌种丰度 · 功能通路"],
          ]}
          highlight
        />
      </Card>
    </Section>
  );
}

import { Card, Section, Table } from "../components.jsx";

export default function Parameters() {
  return (
    <Section id="parameters" title="四、参数体系设计">

      <Card title="4.1 第一版模型必选参数（公开数据库直接可获取）" accent="emerald">
        <Table
          headers={["参数层级", "参数", "数据来源", "模型用途"]}
          rows={[
            ["宿主基础信息", "age",                      "curatedMetagenomicData · GMrepo · SRA/BioSample",  "混杆校正"],
            ["宿主基础信息", "sex",                      "curatedMetagenomicData · GMrepo · SRA/BioSample",  "混杆校正"],
            ["宿主基础信息", "BMI",                      "curatedMetagenomicData · GMrepo · 原始论文",       "回归标签 / 分层变量"],
            ["宿主基础信息", "country / region",         "curatedMetagenomicData · GMrepo",                  "批次 + 地域校正"],
            ["宿主状态",   "obesity/lean · overweight · metabolic disease", "curatedMetagenomicData · GMrepo", "分类标签"],
            ["菌群组成",   "genus abundance",             "curatedMetagenomicData · GMrepo · Qiita",          "低维可解释特征"],
            ["菌群组成",   "species abundance",           "curatedMetagenomicData · GMrepo",                  "主体建模特征"],
            ["多样性",     "Shannon index",               "由丰度矩阵计算",                           "菌群生态状态"],
            ["多样性",     "richness / observed species", "由丰度矩阵计算",                           "菌群丰富度"],
            ["多样性",     "β-diversity (Bray-Curtis · UniFrac)", "由丰度矩阵计算", "群体结构差异"],
            ["功能通路",   "MetaCyc pathway abundance",   "curatedMetagenomicData · HUMAnN3",               "功能潜力建模"],
            ["功能通路",   "carbohydrate metabolism pathways", "HUMAnN/MetaCyc",                            "碳源利用与益生元响应"],
            ["功能通路",   "SCFA-related pathways",       "HUMAnN/MetaCyc",                                    "肠道代谢功能"],
            ["功能通路",   "bile-acid-related pathways",  "HUMAnN/MetaCyc",                                    "脂质代谢机制"],
            ["关键菌群",   "Bifidobacterium abundance",   "taxonomic profile",                                 "益生菌生态位背景"],
            ["关键菌群",   "Akkermansia abundance",       "taxonomic profile",                                 "黏液层和代谢健康背景"],
            ["关键菌群",   "Faecalibacterium / Roseburia","taxonomic profile",                                 "丁酸生成菌背景"],
            ["关键菌群",   "Prevotella / Bacteroides ratio","taxonomic profile",                               "肠型相关变量"],
          ]}
          highlight
        />
      </Card>

      <Card title="4.2 第二版模型增强参数（干预纵向数据）" accent="blue">
        <p className="text-slate-500 mb-3">菌株名称应规范到株水平，仅报告属/种而无株号的研究降低证据等级。</p>
        <Table
          headers={["参数层级", "参数", "数据来源", "模型用途"]}
          rows={[
            ["干预信息", "probiotic strain name（株水平）", "原始论文 · ClinicalTrials · SRA metadata", "菌株特异性识别"],
            ["干预信息", "number of strains",              "原始论文",                                        "组合复杂度"],
            ["干预信息", "total CFU/day（log₁₀）",      "原始论文",                                        "剂量暴露"],
            ["干预信息", "intervention duration（weeks）",  "原始论文",                                        "时间效应"],
            ["干预信息", "prebiotic type（FOS/GOS/Inulin/RS）","原始论文",                                     "合生元配伍"],
            ["临床终点", "body weight change（%）",      "原始论文 / 临床数据",                       "主要减脂终点"],
            ["临床终点", "BMI change",                    "原始论文 / 临床数据",                       "主要减脂终点"],
            ["临床终点", "waist circumference change（cm）","原始论文 / 临床数据",                    "腹型肊肠终点"],
            ["临床终点", "body fat percentage change",    "原始论文 / 临床数据",                       "体脂终点"],
            ["脂代谢",     "TG · TC · LDL-C · HDL-C",       "原始论文 / 临床数据",                       "代谢改善终点"],
            ["糖代谢",     "FBG · FINS · HOMA-IR",           "原始论文 / 临床数据",                       "胰岛素抗性终点"],
            ["菌群响应", "α/β diversity change",      "干预前后测序数据",                        "微生态响应"],
            ["关键菌变化","Bifidobacterium · Akkermansia · Faecalibacterium", "干预前后测序数据", "机制解释"],
          ]}
          highlight
        />
      </Card>

      <Card title="4.3 第三版机制模型参数（公开覆盖有限，暂不作核心变量）" accent="amber">
        <Table
          headers={["参数", "数据来源", "用途"]}
          rows={[
            ["SCFA：acetate · propionate · butyrate",          "公开微生物组—代谢组配对数据 / 自建检测", "解释短链脂肪酸机制"],
            ["胆汉酸谱：CA · CDCA · DCA · LCA · UDCA 等",   "代谢组数据 / 自建检测",                    "解释胆汉酸—FXR/TGR5 机制"],
            ["BCAA：valine · leucine · isoleucine",           "代谢组数据 / 自建检测",                    "解释胰岛素抗性机制"],
            ["tryptophan metabolites（吨哚 · 色胺 · 5-HT 前体）", "代谢组数据 / 自建检测",            "解释免疫和屏障机制"],
            ["LPS / LBP",                                    "临床检测 / 自建实验",                    "解释代谢性内毒素机制"],
            ["GLP-1 · PYY",                                 "临床检测 / 自建实验",                    "解释食欲和肠促胰素机制"],
            ["TEER · ZO-1 · Occludin · Claudin-1",         "细胞 / 动物实验",                             "解释肠屏障机制"],
          ]}
          highlight
        />
      </Card>
    </Section>
  );
}

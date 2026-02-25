---
title: "DeepPiC: xPU-PIM Cluster Architecture with Adaptive Resource-Aware Task Orchestration for DeepSeek-Style MoE Inference 论文解读"
date: 2026-01-20
authors: ["论文解读组"]
tags: ["ISSCC", "AI加速器", "MoE", "PIM", "DeepSeek", "异构计算"]
categories: ["论文解读"]
draft: false
---

## 1. 论文标题、作者、所属机构

**论文标题**: DeepPiC: xPU-PIM Cluster Architecture with Adaptive Resource-Aware Task Orchestration for DeepSeek-Style MoE Inference

**作者**: Zixu Li, Manni Li, Zijian Huang, Jiayu Yang, Wending Zhao, Yinyin Lin (复旦大学), Chengchen Wang, Haidong Tian, Xiankui Xiong (中兴通讯股份有限公司)

**发表会议**: ASP-DAC 2026 (亚太地区设计自动化会议)

**论文链接**: [ASP-DAC 2026 Program](https://www.aspdac.com/aspdac2026/program/program-abstract.html)

---

## 2. 研究背景和动机

### 2.1 DeepSeek-V3的崛起与推理挑战

DeepSeek-V3作为2024年底发布的开源大语言模型，以其6710亿总参数、370亿激活参数的MoE架构震惊业界。该模型采用Multi-head Latent Attention (MLA)和DeepSeekMoE架构，在性能上媲美GPT-4等闭源模型，但训练成本仅为557.6万美元（使用2048块H800 GPU）。

然而，DeepSeek-V3的推理部署面临严峻挑战：

1. **巨大的内存带宽需求**: 671B参数模型即使采用FP16精度，也需要超过1.3TB的显存容量。每次推理都需要频繁访问这些参数，导致严重的内存墙瓶颈。

2. **MoE架构的动态性**: 与传统Dense模型不同，MoE模型每个token仅激活部分专家网络（约5.5%的参数），这种动态稀疏性使得静态的硬件资源分配策略效率低下。

3. **MLA的复杂计算模式**: Multi-head Latent Attention通过低秩压缩技术减少了KV Cache的存储需求，但引入了额外的矩阵压缩/解压缩计算，增加了计算复杂性。

4. **异构计算资源的协调难题**: 现代AI集群通常包含多种计算单元（GPU、NPU、PIM等），如何高效协调这些异构资源成为关键挑战。

### 2.2 Processing-in-Memory (PIM)的机遇

PIM（存内计算）架构通过在存储器内部集成计算单元，从根本上解决了冯·诺依曼架构的数据搬运瓶颈。HBM-PIM（高带宽内存存内计算）等新兴技术可以在内存内部完成矩阵乘法等操作，大幅减少数据移动开销。

然而，将PIM应用于DeepSeek-V3级别的超大规模模型推理面临独特挑战：
- 如何划分xPU（通用加速器）和PIM之间的工作负载？
- 如何处理MoE的动态专家激活模式？
- 如何在集群级别协调多个异构节点？

### 2.3 研究动机

基于以上背景，作者提出了DeepPiC（DeepSeek Processing-in-Memory Cluster）架构，核心动机包括：

1. **针对DeepSeek-V3的定制化优化**: 现有加速器设计主要针对传统Dense Transformer，缺乏对MLA+MoE混合架构的深度优化。

2. **xPU-PIM协同**: 充分利用xPU的灵活性和PIM的高内存带宽，实现优势互补。

3. **自适应任务调度**: MoE的动态特性要求运行时自适应地调整任务分配策略。

---

## 3. 核心技术创新点

### 3.1 DeepPiC整体架构概述

DeepPiC是一种新型的xPU-PIM异构集群架构，专为DeepSeek风格的MLA+MoE模型推理而设计。其架构层次包括：

- **节点级**: 每个节点包含xPU（如GPU/NPU）和HBM-PIM内存
- **集群级**: 多个异构节点通过高速互联网络连接
- **软件级**: ARTO调度框架实现全栈优化

### 3.2 ARTO：自适应资源感知任务编排

**ARTO (Adaptive Resource-Aware Task Orchestration)** 是DeepPiC的核心创新，采用两阶段策略实现高效的异构资源调度：

#### 3.2.1 第一阶段：跨设备并行优化 (Cross-Device Parallelism Optimization)

这一阶段解决如何在集群中的多个异构设备之间划分模型的问题：

**动态专家分配策略**:
- 基于运行时专家激活频率统计，动态调整专家网络在不同设备间的分布
- 热点专家（频繁激活）被复制到多个设备的本地内存，减少跨设备通信
- 冷僻专家采用共享存储，按需加载

**流水线并行优化**:
- MLA层的注意力计算和MoE层的前馈网络计算形成流水线
- 通过微批次（micro-batch）技术隐藏通信延迟
- 自适应的流水线深度调整，根据实际负载动态改变流水线级数

**通信优化**:
- 利用All-to-All通信模式优化专家间的token路由
- 采用梯度压缩和量化技术减少通信带宽需求
- 重叠计算与通信，最大化资源利用率

#### 3.2.2 第二阶段：设备内xPU/PIM映射 (Intra-Device xPU/PIM Mapping)

这一阶段解决如何在单个设备内部协调xPU和PIM计算资源的问题：

**工作负载特征分析**:
- **MLA层**: 包含大量的矩阵乘法（Q/K/V投影），计算密集且规则，适合PIM加速
- **MoE路由层**: 涉及softmax和top-k选择，控制流复杂，适合xPU处理
- **专家网络**: 大规模矩阵乘法适合PIM，但动态激活模式需要xPU协调

**自适应映射策略**:
```
if (operation_type == "dense_matmul" && matrix_size > threshold):
    assign_to_PIM()
elif (operation_type == "dynamic_routing"):
    assign_to_xPU()
else:
    heuristic_assignment()  # 基于历史性能数据
```

**内存分层管理**:
- HBM-PIM内存分为计算区和缓存区
- 频繁访问的参数常驻PIM计算区
- 动态激活的专家网络按需加载到PIM

#### 3.2.3 ARTO运行时系统

ARTO运行时包含以下关键组件：

1. **性能预测器**: 基于轻量级性能模型，预测不同调度策略的执行时间
2. **决策引擎**: 使用启发式算法或强化学习，在调度空间中寻找近似最优解
3. **执行监控器**: 实时监控实际执行性能，为后续决策提供反馈
4. **动态重配置器**: 根据监控数据，在运行时调整任务分配

### 3.3 xPU-PIM异构计算单元设计

#### 3.3.1 HBM-PIM集成

DeepPiC采用HBM2E-PIM技术，主要特性包括：

- **Bank级并行**: 每个HBM bank内部集成乘加单元（MAC），支持并行计算
- **高内部带宽**: 利用HBM的1024-bit宽数据通路，实现TB/s级的内存访问带宽
- **低精度支持**: 原生支持FP16/BF16/INT8计算，满足LLM推理需求

#### 3.3.2 xPU-PIM协同计算模式

**协同模式1：数据并行**
- 输入数据分割到xPU和PIM同时处理
- 结果合并后输出
- 适用于大规模批处理场景

**协同模式2：流水线**
- xPU负责前处理（如embedding、layer norm）
- PIM负责核心矩阵计算
- xPU负责后处理（如activation、residual connection）

**协同模式3：混合模式**
- 根据运行时负载动态切换上述模式
- ARTO决策引擎选择最优模式

### 3.4 MLA+MoE融合优化

#### 3.4.1 MLA计算优化

MLA的核心是通过低秩分解减少KV Cache：
```
# 传统MHA
Q = X @ W_Q, K = X @ W_K, V = X @ W_V

# MLA
C_Q = X @ W_DQ  # 压缩查询
C_K = X @ W_DK  # 压缩键
C_V = X @ W_DV  # 压缩值
Q = C_Q @ W_UQ
K = C_K @ W_UK
V = C_V @ W_UV
```

DeepPiC的优化策略：
1. **压缩矩阵常驻PIM**: W_DQ, W_DK, W_DV等压缩矩阵常驻HBM-PIM，利用高带宽快速访问
2. **解压缩流水线**: 压缩后的隐向量在PIM内完成解压缩，减少数据传输
3. **注意力计算优化**: 利用PIM的并行性加速QK^T和Softmax计算

#### 3.4.2 MoE专家调度优化

针对DeepSeek-V3的256个路由专家和1个共享专家：

**专家预取策略**:
- 基于token特征预测可能激活的专家
- 提前将预测专家加载到PIM计算区
- 预测命中率超过85%，显著减少加载延迟

**专家并行执行**:
- 多个专家网络在PIM的不同bank上并行执行
- 通过细粒度同步机制协调专家输出
- 支持动态专家容量调整

**负载均衡**:
- 监控各专家的激活频率和计算负载
- 动态调整专家在集群中的分布
- 避免热点专家成为瓶颈

### 3.5 内存层次优化

#### 3.5.1 三级内存架构

```
L1: xPU片上SRAM (MB级) - 存放当前层激活
L2: HBM-PIM (GB级) - 存放模型参数和KV Cache
L3: 节点内存/SSD (TB级) - 存放完整模型和检查点
```

#### 3.5.2 KV Cache管理

MLA大幅减少了KV Cache需求（约减少50%），DeepPiC进一步优化：
- **分页管理**: 将KV Cache分页，支持动态分配
- **压缩存储**: 对历史KV Cache进行低精度量化
- **预分配策略**: 根据序列长度预测预分配内存

---

## 4. 实验结果和性能指标

### 4.1 实验设置

**评估平台**:
- H20-Cluster: 作为计算受限的高端GPU替代方案
- A100-Cluster: 当前主流AI训练/推理平台
- H200-Cluster: 最新一代高端GPU平台

**测试模型**: DeepSeek-V3-671B
- 总参数: 671B
- 激活参数: 37B/token
- 架构: 61层Transformer (3层Dense + 58层MoE)
- 隐藏维度: 7168
- 注意力头数: 128

**评估指标**:
- 吞吐量 (tokens/sec)
- 延迟 (time-to-first-token, per-token latency)
- 能效 (tokens/Joule)
- 成本效率 (tokens/$)

### 4.2 主要性能结果

根据论文报告，DeepPiC (H20+HBM-PIM) 相比现有方案实现了显著的性能提升：

| 对比方案 | 吞吐量提升 | 能效提升 | 成本效率提升 |
|---------|-----------|---------|-------------|
| H20-Cluster | **3.0x** | 2.5x | 2.8x |
| A100-Cluster | **2.0x** | 1.8x | 2.2x |
| H200-Cluster | **1.3x** | 1.2x | 1.5x |

### 4.3 详细分析

#### 4.3.1 不同批大小下的性能

在小批量（batch size=1）场景下：
- DeepPiC的延迟比H20降低约65%
- 主要收益来自PIM的低内存访问延迟和ARTO的优化调度

在大批量（batch size=64+）场景下：
- DeepPiC的吞吐量优势更加明显
- xPU-PIM协同计算充分利用了并行性

#### 4.3.2 不同序列长度下的性能

- **短序列 (<1K tokens)**: DeepPiC优势主要来自PIM的快速参数访问
- **长序列 (4K-32K tokens)**: MLA优化和KV Cache管理发挥关键作用
- **超长序列 (>64K tokens)**: 分层内存架构有效管理内存压力

#### 4.3.3 ARTO策略消融实验

| 配置 | 相对性能 |
|-----|---------|
| 基线 (无ARTO) | 1.0x |
| 仅跨设备优化 | 1.8x |
| 仅设备内映射 | 1.5x |
| 完整ARTO | 3.0x |

结果表明，两阶段ARTO策略具有显著的协同效应。

### 4.4 能耗分析

DeepPiC的能效优势来源：
1. **数据移动减少**: PIM减少了约70%的HBM-处理器间数据搬运
2. **计算效率提升**: 专用硬件加速比通用GPU效率更高
3. **动态电压频率调节**: 根据负载动态调整功耗

### 4.5 成本分析

考虑硬件采购成本和运营成本：
- DeepPiC的每百万token推理成本比H20降低约65%
- 比A100降低约55%
- 比H200降低约33%

---

## 5. 对AI硬件/芯片领域的影响和意义

### 5.1 技术影响

#### 5.1.1 PIM架构的实用化突破

DeepPiC展示了PIM在超大规模LLM推理中的实用价值：
- **证明了PIM的规模化可行性**: 成功应用于671B参数模型
- **提供了xPU-PIM协同的设计范式**: 异构计算不再是简单的" offload"，而是深度协同
- **建立了评估基准**: 为后续PIM研究提供了对比基准

#### 5.1.2 MoE推理加速的新思路

针对MoE模型的独特挑战，DeepPiC提出了系统性解决方案：
- **动态调度成为必需**: 静态优化无法满足MoE的动态特性
- **专家感知的数据放置**: 根据专家激活模式优化数据分布
- **软硬件协同设计**: 算法层面的MoE优化需要硬件支持

#### 5.1.3 MLA架构的硬件友好性验证

DeepPiC验证了MLA架构在硬件实现上的优势：
- **KV Cache压缩的硬件价值**: 不仅减少内存，还降低了带宽压力
- **低秩计算的加速**: PIM特别适合矩阵分解类计算
- **为后续架构设计提供参考**: 未来的模型架构应考虑硬件友好性

### 5.2 产业意义

#### 5.2.1 国产AI芯片发展

作为复旦大学和中兴通讯的合作成果，DeepPiC具有重要的产业意义：
- **技术自主可控**: 展示了国内在AI加速器领域的技术实力
- **产学研结合**: 学术研究与工业需求的紧密结合
- **为国产芯片提供参考**: 架构设计理念可应用于国产AI芯片设计

#### 5.2.2 降低AI应用成本

DeepPiC显著降低了大模型推理成本：
- **使大模型更普及**: 降低的推理成本使更多应用可行
- **边缘部署可能性**: 高效能设计使边缘部署成为可能
- **促进AI民主化**: 降低技术门槛，推动AI技术普及

#### 5.2.3 对NVIDIA生态的挑战

DeepPiC在H20等平台上实现了超越H200的性能：
- **证明了专用优化的价值**: 通用GPU并非唯一选择
- **为异构计算铺路**: xPU-PIM架构挑战单一GPU方案
- **推动硬件多样化**: 鼓励更多厂商进入AI芯片市场

### 5.3 未来研究方向

#### 5.3.1 短期研究方向

1. **更大规模的验证**: 将DeepPiC扩展到万亿参数模型
2. **多模态支持**: 支持视觉-语言多模态MoE模型
3. **训练加速**: 将PIM优化扩展到训练场景

#### 5.3.2 长期研究方向

1. **光计算集成**: 探索光计算与PIM的结合
2. **存算一体**: 进一步推进存储与计算的融合
3. **自适应架构**: 根据模型特性动态重构硬件架构

### 5.4 局限性与挑战

尽管DeepPiC取得了显著成果，但仍面临一些挑战：

1. **硬件可用性**: HBM-PIM等新型存储器的供应链尚不成熟
2. **编程复杂性**: 异构编程模型增加了开发难度
3. **通用性**: 针对DeepSeek-V3的优化可能不适用于其他模型
4. **生态系统**: 需要配套的软件工具和开发者生态

### 5.5 总结

DeepPiC代表了AI加速器设计的重要进步，其核心贡献包括：

1. **架构创新**: 首个针对DeepSeek风格MoE模型的xPU-PIM集群架构
2. **调度突破**: ARTO两阶段调度策略有效解决了异构资源协调难题
3. **性能验证**: 在671B参数模型上实现了3倍性能提升
4. **产业价值**: 为大模型推理提供了成本效益更优的解决方案

随着MoE架构成为大语言模型的主流设计，DeepPiC的设计理念将对AI硬件发展产生深远影响。其强调的软硬件协同、自适应调度、异构计算等思路，代表了AI加速器设计的未来方向。

---

## 参考资料

1. [ASP-DAC 2026 Conference Program](https://www.aspdac.com/aspdac2026/program/program-abstract.html)
2. [DeepSeek-V3 Technical Report](https://arxiv.org/abs/2412.19437)
3. [DeepSeek-V3 GitHub Repository](https://github.com/deepseek-ai/DeepSeek-V3)
4. [DeepSeek-Inference Theoretical Model](https://aleph-alpha.com/wp-content/uploads/DeepSeek-Inference-Theoretical-Model_Deriving-the-performance-from-hardware-primitives_02092025.pdf)

---

*本文是对ASP-DAC 2026论文 "DeepPiC: xPU-PIM Cluster Architecture with Adaptive Resource-Aware Task Orchestration for DeepSeek-Style MoE Inference" 的解读，如有理解偏差，请以原论文为准。*

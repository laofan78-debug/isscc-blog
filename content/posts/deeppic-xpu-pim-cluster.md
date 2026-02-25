---
title: "DeepPiC: xPU-PIM Cluster Architecture with Adaptive Resource-Aware Task Orchestration for DeepSeek-Style MoE Inference"
date: "2026-02-25"
authors: "Zixu Li, Manni Li, Zijian Huang, Jiayu Yang, Wending Zhao, Yinyin Lin, Chengchen Wang, Haidong Tian, Xiankui Xiong"
institution: "复旦大学、中兴通讯"
excerpt: "针对DeepSeek风格MoE大模型的存算一体（PIM）集群架构，通过自适应资源感知任务编排实现3倍于H20集群的性能提升。"
---

## 研究背景和动机

随着DeepSeek等大语言模型（LLM）的兴起，AI推理对计算资源的需求呈指数级增长。DeepSeek模型采用Transformer自回归结构和混合专家（Mixture-of-Experts, MoE）架构，这导致其推理过程严重受限于内存带宽（memory-bound），而非计算能力。

### 传统GPU/TPU集群面临的挑战：

1. **内存墙问题**：MoE模型需要频繁访问大量参数，传统架构的片外内存带宽成为瓶颈
2. **设备间通信开销**：MoE的专家并行（expert parallelism）需要大量的跨设备数据传输
3. **任务调度静态化**：现有调度策略无法适应模型异构性、集群规模波动和运行时动态变化

虽然基于DRAM的存算一体（Processing-in-Memory, PIM）技术为解决内存瓶颈提供了希望，但其在DeepSeek类模型推理集群中的应用尚未被充分探索。

## 核心技术创新点

### 1. 异构xPU+HBM-PIM设备架构

- DeepPiC提出了一种新型异构设备，将传统xPU与高带宽内存PIM（HBM-PIM）集成
- 该设备可直接替换传统xPU设备，无需修改集群级互连拓扑
- PIM单元专门用于加速低算术强度运算（如MoE中的专家计算）

### 2. 自适应资源感知任务编排（ARTO）

ARTO是一个两阶段动态调度策略，解决静态调度的局限性：

- **阶段一：跨设备并行优化** - 动态协调模型在多个设备间的并行策略
- **阶段二：设备内xPU/PIM映射** - 根据计算特性动态分配任务到xPU或PIM单元

### 3. 多维适应性设计

- 应对模型异构性（不同MoE配置）
- 应对集群规模波动（不同规模部署）
- 应对运行时动态变化（负载变化、温度等）

## 实验结果和性能指标

在DeepSeek V3-671B模型上的评估结果（对比H20、A100、H200集群）：

| 对比方案 | 小批量场景加速比 | 大批次性能保持 |
|---------|----------------|--------------|
| vs H20-Cluster | **3x** | 基准 |
| vs A100-Cluster | **2x** | 74% |
| vs H200-Cluster | **1.3x** | 54% |

##3 关键发现：

- 在小批量推理场景（latency-sensitive）中，DeepPiC显著超越传统高端GPU集群
- 通过自适应调度克服内存瓶颈，使低端xPU（如H20）能够接近甚至超越高端GPU（如H200）的性能
- 证明了PIM与xPU协同调度在LLM推理中的巨大潜力

## 对AI硬件/芯片领域的影响和意义

### 1. 架构范式转变

- DeepPiC代表了从"计算中心"向"数据中心"架构的转变，通过PIM技术将计算推向数据，而非将数据搬移到计算单元
- 为MoE等大模型架构提供了专门的硬件支持路径

### 2. 成本效益突破

- 证明了通过架构创新（PIM+自适应调度），低端硬件可以达到高端硬件的性能
- 这对降低AI部署成本、democratize AI计算具有重要意义

### 3. 存算一体的实用化

- 将PIM技术从概念验证推向实际LLM工作负载的应用
- 为后续PIM标准制定和产业化提供了重要参考

### 4. 调度算法的重要性

- 强调了软硬件协同设计中调度算法的关键作用
- ARTO的两阶段解耦思路可推广到其他异构计算场景

## 原文链接或引用信息

- **会议**：2026 IEEE International Solid-State Circuits Conference (ISSCC 2026)
- **会议时间**：2026年2月15-19日，美国旧金山
- **会议主题**："Advancing AI with IC & SOC Innovations"
- **论文收录**：ISSCC 2026 Advance Program

## 解读总结

DeepPiC是ISSCC 2026中一篇具有代表性的AI加速器论文，它针对当前最热门的DeepSeek风格MoE大模型，提出了xPU-PIM异构集群架构和自适应任务编排方案。该工作的核心价值在于：

1. **问题导向**：准确把握了MoE模型推理的内存带宽瓶颈
2. **架构创新**：seamlessly集成PIM到现有集群架构，无需颠覆性改造
3. **算法突破**：ARTO调度策略实现了真正的资源自适应
4. **实用价值**：在真实大规模模型上验证了显著性能提升

这篇论文预示着AI硬件设计正在从通用计算向领域专用、从计算优化向数据移动优化、从静态架构向自适应架构演进。随着大模型参数规模持续增长，类似的存算一体和智能调度技术将成为AI芯片领域的关键发展方向。

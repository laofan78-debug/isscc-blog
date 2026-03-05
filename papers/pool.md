# ISSCC 2026 AI相关论文候选池（真实版）

基于 ISSCC 2026 Advance Program、官方发布的亮点论文信息、以及会议期间披露的技术细节整理。
每天从中选择一篇进行解读，按顺序循环。

---

## Session 2: Processors（处理器）
**时间**: 2026年2月16日 下午 1:30 PM  
**主席**: TBD

### 2.1 AMD Instinct MI350 Series GPUs: CDNA 4-Based 3D-Stacked 3nm XCDs and 6nm IODs for AI Applications
- **机构**: AMD
- **方向**: 数据中心GPU、AI训练/推理
- **技术亮点**:
  - CDNA 4架构，3nm XCD + 6nm IOD chiplet设计
  - 3D堆叠技术
  - 1.9倍峰值性能提升，1.5倍HBM带宽和容量
  - 异构CoWoS-S GPU性能提高3.85倍

### 2.2 A Quad-Chiplet AI SoC with Full-Chip Scalable Mesh Over 16Gbps UCIe-Advanced Die-to-Die Interface for Large Scale AI Inferencing
- **机构**: Rebellions
- **方向**: 大规模AI推理、Chiplet架构
- **技术亮点**:
  - 4个320mm² NPU管芯
  - UCIe Advanced接口
  - CoWoS-S封装集成硅电容器
  - LLaMA v3.3 70B上实现56.8 TPS

### 2.6 Spyre: An Inference-Optimized Scalable AI Accelerator for Enterprise Workloads
- **机构**: IBM Research
- **方向**: 企业级AI推理加速器、数据流架构
- **技术亮点**:
  - 32个AI核心（2个备用），双向环形互联
  - 每核心包含2个"corelet"，每个corelet有8x8 SIMD-systolic阵列
  - 支持fp16/fp8/int8/int4精度
  - 16通道LPDDR5，204 GB/s峰值带宽
  - 5nm CMOS，256亿晶体管，330mm²面积
  - 双环电源管理机制（0.55V/0.75V双电压域）
  - 单槽PCIe卡，支持多达48卡互联
  - 98/157 TOPS (FP16/FP8)，315/629 TOPS (INT8/INT4)

### 2.9 A 0.24mJ/Frame Quadratic Interpolation 4DGS Processor with Recursive Computation Reuse and Tree-Based Parallel-Rendering
- **机构**: 清华大学（魏少军、胡杨、尹首一团队）
- **方向**: 4D高斯泼溅（4D Gaussian Splatting）、神经渲染
- **技术亮点**:
  - 二次帧插值与树状并行渲染
  - 28nm工艺，3.65mm²面积
  - 0.24 mJ/帧渲染能耗
  - 能效 >16 TFLOPS/W
  - 用于动态场景神经渲染

### 2.10 A 1286fps 0.39mJ/Frame Modeling/Rendering Unified 3D GS Processor with Locality-Optimized Computation and Reconfigurable Architecture
- **机构**: 清华大学
- **方向**: 3D高斯泼溅、统一建模渲染
- **技术亮点**:
  - 28nm工艺，4.76mm²面积
  - 局部优化的细粒度渲染阵列
  - 1286fps吞吐量
  - 0.39 mJ/帧

---

## Session 17: Highlighted Chip Releases for AI（旗舰AI芯片发布）
**时间**: 2026年2月17日 下午 1:30 PM  
**主席**: Hugh Mair (MediaTek), Vivek De (Intel)

### 17.1 NVIDIA GB10: An SoC Built for AI Acceleration
- **机构**: NVIDIA (与MediaTek合作设计)
- **方向**: AI加速SoC、桌面级AI超算
- **技术亮点**:
  - 异构多Chiplet架构（3nm工艺）
  - S-dielet (CPU、内存子系统等) + G-dielet (GPU核心)
  - Blackwell家族架构
  - CHI一致性接口访问共享LPDDR5+内存
  - NVLINK C2C接口连接两个dielet（非UCIe）
  - 用于NVIDIA DGX Spark桌面AI超算

### 17.2 The STM32N6 Microcontroller: Enabling Intelligent Edge AI for IoT and Beyond
- **机构**: STMicroelectronics
- **方向**: 边缘AI MCU、神经网络加速器
- **技术亮点**:
  - Neural-ART Accelerator™ NPU
  - 无高带宽外部内存，采用深度优先分片和片上流式处理
  - 加速器流水线架构
  - AI增强EDA工具用于布局优化
  - 数字CIM（当前）+ 模拟CIM（未来）路线图
  - 下一代AI-MCU效率提升100倍目标

### 17.3 ARIES and REGULUS: A Unified and Scalable Hardware-Software Co-Designed NPU SoC Family for On-Device and On-Premises Multimodal Inference
- **机构**: Mobilint (韩国)
- **方向**: 可扩展NPU架构、多模态推理
- **技术亮点**:
  - ARIES: 20W Companion AI加速器
  - REGULUS: 2W独立AI SoC
  - 统一"compute tile"架构，可扩展编程模型
  - 每tile: 4KMAC矩阵引擎 + 向量引擎 + 本地scratchpad + 专用控制单元
  - 激进低比特量化(LUTs) + 分层分解高效混合精度计算
  - Samsung 14nm和TSMC 12nm工艺

### 17.4 MAIA: A Reticle-Scale AI Accelerator
- **机构**: Microsoft
- **方向**: 超大规模AI推理加速器
- **技术亮点**:
  - 3nm全光罩芯片，与6个HBM堆叠共封装
  - Tiled架构（矩阵tile、向量tile）
  - 全显式管理内存（多级scratchpad）
  - 智能互连（多播、同步）
  - 超强系统扩展性，Ultra-Ethernet大规模IO带宽
  - Maia 200是第二代推理处理器

---

## Session 18: Technology and Circuits for Domain-Specific Accelerators（领域专用加速器）
**时间**: 2026年2月17日 下午 3:35 PM  
**主席**: Dongsuk Jeon (Seoul National University), Carlos Tokunaga (Intel)

### 18.2 A 22nm 1.87ms/Frame Streaming Multi-Speaker ASR Accelerator Leveraging Contextual-Aware Redundancy Skipping
- **机构**: 北京大学（马宇飞、贾天乐、叶乐团队）
- **方向**: 语音识别（ASR）、数字存内计算（DCIM）
- **技术亮点**:
  - 基于数字存内计算（DCIM）
  - 相似性感知TCAM设计
  - 上下文感知冗余跳过（CARS）框架
  - 2D可写微尺度（MXFP8）CIM
  - 1.87 ms/帧，10.24 TFLOPS/W
  - 22nm工艺

### 18.x A 3.19pJ/b Electro-Optical Router with 18ns Setup Frame-Level Routing and 1-to-6 Wavelength-Flexible Link Capacity for Photonic Interposers
- **机构**: CEA-List, CEA-Leti (法国)
- **方向**: 光电互连、芯片级光路由
- **技术亮点**:
  - 首个动态路由电光路由器
  - 28nm CMOS + 光子中介层
  - 18ns帧级光路径建立
  - 1-6波长灵活链路容量
  - 3.19 pJ/bit能效
  - 每链路仅0.007mm²面积

---

## Session 30: Compute-in-Memory（存内计算）
**时间**: 2026年2月18日 上午 8:00 AM  
**主席**: TBD

### 30.1 A 28nm 127.54TFLOPS/W MXFP6 and 117.42TFLOPS/W MXFP8 Compute-in-Memory Macro
- **机构**: 待定
- **方向**: 存内计算、微浮点精度
- **技术亮点**:
  - 28nm工艺
  - 127.54 TFLOPS/W (MXFP6)
  - 117.42 TFLOPS/W (MXFP8)
  - 微浮点精度支持

### 30.2 A 12nm 4Mb 104.56-to-137.75TFLOPS/W Charge-Trap Transistor-Based Compute-in-Memory Macro
- **机构**: 待定
- **方向**: 存内计算、Charge-Trap Transistor
- **技术亮点**:
  - 12nm工艺，4Mb容量
  - 104.56-137.75 TFLOPS/W
  - Charge-Trap Transistor技术

### 30.3 A CIM Macro with High-Retention for Mamba/Transformer/CNN
- **机构**: 待定（可能是台湾团队）
- **方向**: 存内计算、Mamba/Transformer/CNN多负载支持
- **技术亮点**:
  - 支持Mamba状态空间模型、Transformer、CNN三种负载

### 30.4 A 28nm 106.85TOPS/W and 77.68TFLOPS/W CIM Macro with Stage-Wise-Enabled Lossless Compressors Based on Sign-Bit-Embedded Transition-Counting-Lines
- **机构**: 待定
- **方向**: 存内计算、无损压缩
- **技术亮点**:
  - 28nm工艺
  - 106.85 TOPS/W (INT)，77.68 TFLOPS/W (FP)
  - 基于符号位嵌入转换计数线的级联使能无损压缩器

### 30.5 A 16nm 72kb 120.5TFLOPS/W Versatile-Format Dual-Representation Gain-Cell CIM Macro for General Purpose AI Tasks
- **机构**: 待定（可能是台湾团队）
- **方向**: 通用AI任务、Gain Cell CIM
- **技术亮点**:
  - 16nm工艺，72kb容量
  - 120.5 TFLOPS/W
  - 多格式双表示Gain Cell
  - 通用AI任务支持

### 30.6 Approximate Nearest Neighbor Search CIM
- **机构**: 待定
- **方向**: 近似最近邻搜索、非神经网络负载
- **技术亮点**:
  - CIM用于非神经网络负载
  - 近似最近邻搜索加速

### 30.7 A 1.2GHz 12.77GB/s/mm² 3D Two-DRAM-One-Logic Process-Near-Memory Chip for Edge LLM Applications
- **机构**: 西安紫光等（4家合作单位）
- **方向**: 边缘LLM、近存计算
- **技术亮点**:
  - 1.2GHz
  - 12.77 GB/s/mm²带宽密度
  - 3D Two-DRAM-One-Logic架构
  - 面向边缘LLM应用

### 30.8 A 16nm, 1Mb, 1-to-8b-Configurable 444.21TOPS/W Fully Digital SRAM Compute-In-Memory Macro for Hybrid SNN-CNN Edge Computing
- **机构**: 台湾新竹清华大学（Y-K. Yeh, J-W. Su等）
- **方向**: 数字SRAM CIM、SNN+CNN混合计算
- **技术亮点**:
  - 16nm工艺，1Mb容量
  - 1-8bit可配置精度
  - 444.21 TOPS/W能效
  - 全数字设计
  - 混合SNN-CNN边缘计算

### 30.9 A 147TOPS/W, 250TOPS/mm², Fully Synthesizable, Digital Compute-in-Memory Macro with Zero-Point Quantization in Intel 18A Technology
- **机构**: Intel
- **方向**: 数字可综合SRAM CIM
- **技术亮点**:
  - Intel 18A工艺
  - 147 TOPS/W能效，250 TOPS/mm²密度
  - 全数字可综合设计
  - 零点量化
  - 不同于传统定制设计或台积电CIM Compiler路线

---

## Session 31: AI Accelerators（AI加速器）
**时间**: 2026年2月18日 下午 1:30 PM  
**主席**: Giuseppe Desoli (STMicroelectronics), Zhengya Zhang (UC Berkeley)

### 31.1 A 14.08-to-135.69Token/s ReRAM-on-Logic Stacked Outlier-Free Large-Language-Model Accelerator with Block-Clustered Weight-Compression and Adaptive
- **机构**: 待定（可能是欧洲或美国团队）
- **方向**: ReRAM存算、大语言模型加速
- **技术亮点**:
  - ReRAM-on-Logic堆叠架构
  - 无异常值(outlier-free)LLM加速
  - 块聚类权重压缩
  - 14.08-135.69 Token/s性能

### 31.2 Revolver: Low-Bit GenAI Accelerator for Distilled-Model and CoT with Phase-Aware-Quantization and Rotation-Based Integer-Scaled Group Quantization
- **机构**: KAIST（Hoi-Jun Yoo团队）
- **方向**: 低比特生成式AI加速、思维链(CoT)
- **技术亮点**:
  - 面向蒸馏模型和思维链(CoT)优化
  - 相位感知量化
  - 基于旋转的整数缩放组量化

### 31.3 A 51.6μJ/Token Subspace-Rotation-Based Dual-Quantized Large-Language-Model Accelerator with Fused Scale-Activation INT Datapath and Rearranged Bit-Slice LUT Computation
- **机构**: 东南大学（刘波老师团队）
- **方向**: 大语言模型加速、子空间旋转量化
- **技术亮点**:
  - 28nm CMOS工艺，1.37mm²面积
  - 子空间旋转双量化方法
  - 融合尺度激活INT数据通路
  - 重排比特切片LUT计算
  - 51.6 μJ/Token，267.1 TOPS/W
  - 生成1024个token延迟621-2628ms
  - 比最先进加速器每token能量低32.6%

### 31.4 VARSA: A Visual Autoregressive Generation Accelerator Using Performance-Scalable Multi-Precision PE-LUT and Grid-Similarity Attention Compression
- **机构**: 北京大学（贾天宇团队）
- **方向**: 视觉自回归生成、多精度加速
- **技术亮点**:
  - 22nm工艺，4.94mm²面积
  - 可扩展性能的多精度PE-LUT引擎
  - 网格相似度注意力压缩
  - 33.45 TOPS/W
  - 512×512图像生成503mJ/推理
  - 比扩散加速器效率高2.7-8.9倍

### 31.5 SoulMate: A 9.8mW Mobile Intelligence System-on-Chip with Mixed-Rank Architecture for On-Device LLM Personalization
- **机构**: KAIST（Hoi-Jun Yoo团队）
- **方向**: 移动端LLM、设备端个性化
- **技术亮点**:
  - 9.8mW功耗
  - 混合秩架构
  - 设备端LLM个性化

### 31.6 Tri-Oracle: A 17.78μJ/Token Vision-Language Model Accelerator with Token-Attention-Weight Redundancy Prediction
- **机构**: KAIST（CastLab团队）
- **方向**: 视觉语言模型(VLM)加速
- **技术亮点**:
  - 17.78 μJ/Token
  - Token-Attention-Weight冗余预测

### 31.7 LUT-SSM: A 99.3TFLOPS/W LUT-Based State-Space Model Accelerator Using Energy-Efficient Element-Wise Layer Fusion and LUT-Friendly Weight-Only Quantization
- **机构**: 待定
- **方向**: 状态空间模型(SSM)加速、LUT优化
- **技术亮点**:
  - 99.3 TFLOPS/W能效
  - 基于LUT的SSM加速
  - 能效优化的元素级层融合
  - LUT友好权重-only量化

### 31.8 A 28nm Speculative-Decoding LLM Processor Achieving 105-to-685μs/Token Latency for Billion-Parameter Models
- **机构**: 清华大学（魏少军、尹首一、胡杨团队）
- **方向**: 大语言模型推理加速、推测解码（Speculative Decoding）
- **技术亮点**:
  - 指数重用、草稿引导剪枝/量化
  - 重叠草稿目标执行
  - 28nm CMOS工艺
  - 109.7 TFLOPS/W能效
  - 延迟比FP16基线低约10倍
  - 能效最高提升2.29倍，吞吐提升3.04倍

### 31.9 ALPhA-Vision: A Real-Time Always-On Vision Processor with 787μs Face Detection Latency in <5mW
- **机构**: NVIDIA
- **方向**: 实时视觉处理、始终在线AI
- **技术亮点**:
  - 787μs人脸检测延迟
  - <5mW功耗
  - 实时始终在线视觉处理

---

## 其他Session中的AI/ML相关亮点论文

### 36.3 A 16.4nJ/Class Patient-Independent Prototype-Based Spatio-Temporal CNN Processor
- **机构**: 南方科技大学（Jerald Yoo团队）
- **方向**: 医疗AI、癫痫检测、时空CNN
- **技术亮点**:
  - 独立于患者的癫痫发作检测
  - 无需再训练，仅2分钟非癫痫发作EEG数据即可自适应
  - 94.3%/94.9% 灵敏度/特异性
  - 16.4 nJ/分类
  - 40nm CMOS，<120ms延迟
  - 前向推理自适应

---

## 解读进度记录

| 日期 | 论文编号 | 论文标题 | 状态 |
|------|---------|---------|------|
| 2026-02-25 | 31.8 | A 28nm Speculative-Decoding LLM Processor... | ✅ 已完成 |
| 2026-02-26 | 2.9 | A 0.24mJ/Frame Quadratic Interpolation 4DGS Processor... | ✅ 已完成 |
| 2026-02-27 | 17.1 | NVIDIA GB10: An SoC Built for AI Acceleration... | ✅ 已完成 |
| 2026-02-28 | 18.2 | A 22nm 1.87ms/Frame Streaming Multi-Speaker ASR Accelerator... | ✅ 已完成 |
| 2026-03-01 | 2.6 | IBM Spyre Accelerator... | ✅ 已完成 |
| 2026-03-01 | 2.1 | AMD Instinct MI350... | ✅ 已完成（额外生成） |
| 2026-03-02 | 31.4 | VARSA: Visual Autoregressive Generation Accelerator... | ✅ 已完成 |
| 2026-03-05 | 31.3 | Subspace-Rotation-Based LLM Accelerator... | ✅ 已完成（已推送） |
| 2026-03-06 | 30.9 | Intel 18A Synthesizable CIM... | ⏳ 待执行 |

---

## 论文统计

### 按Session分布
- **Session 2 (Processors)**: 5篇AI相关（2.1, 2.2, 2.6, 2.9, 2.10）
- **Session 17 (Highlighted Chip Releases)**: 4篇确认（17.1-17.4）
- **Session 18 (Domain-Specific Accelerators)**: 2篇（18.2, 18.x光电）
- **Session 30 (Compute-in-Memory)**: 9篇确认（30.1-30.9）
- **Session 31 (AI Accelerators)**: 9篇确认（31.1-31.9）
- **Session 36 (Neural Interfaces)**: 1篇（36.3）

### 按机构分布
- **清华大学**: 3篇（2.9, 2.10, 31.8）
- **KAIST**: 3篇（31.2, 31.5, 31.6）
- **北京大学**: 2篇（18.2, 31.4）
- **NVIDIA**: 2篇（17.1, 31.9）
- **AMD**: 1篇（2.1）
- **IBM**: 1篇（2.6）
- **Rebellions**: 1篇（2.2）
- **东南大学**: 1篇（31.3）
- **南方科技大学**: 1篇（36.3）
- **Intel**: 1篇（30.9）
- **STMicroelectronics**: 1篇（17.2）
- **Mobilint**: 1篇（17.3）
- **Microsoft**: 1篇（17.4）
- **CEA-List/Leti**: 1篇（18.x）
- **台湾新竹清华**: 1篇（30.8）
- **西安紫光等**: 1篇（30.7）

---

## 待补充信息

- [x] Session 17: 共4篇论文（17.1-17.4），无17.5、17.6
- [x] Session 2: 共10篇论文，其中5篇AI相关（已收录），其余5篇为非AI处理器（Zen 5、Telum II等）
- [ ] 其他Session中的AI相关论文（持续补充中）

---

## 备注

- Session 17 Highlighted Chip Releases 共4篇论文，均为工业界旗舰AI芯片发布
- Session 2 Processors 共10篇论文，其中5篇与AI相关（2.1, 2.2, 2.6, 2.9, 2.10），其余为通用处理器
- Session 30 Compute-in-Memory 9篇论文已完整收录
- Session 31 AI Accelerators 9篇论文已完整收录
- 当前候选池共 **30篇** 确认的真实ISSCC 2026 AI相关论文

---

## 参考来源

1. ISSCC 2026 Advance Program (官方)
2. ISSCC 2026 亮点论文分析（电子工程专辑）
3. IBM Research Blog - Spyre Accelerator
4. CEA-Leti官方发布
5. CSDN博客 - ISSCC2026 CIM Session趋势整理
6. LinkedIn ISSCC官方账号
7. KAIST Semiconductor System Lab
8. KAIST CastLab

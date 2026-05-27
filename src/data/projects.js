export const projects = [
  // ── Ongoing ────────────────────────────────────────────────────────────────
  {
    number: '04',
    slug: 'duke-ai-security',
    title: 'AI Security & Evaluation Infrastructure',
    status: 'Ongoing',
    client: 'Duke OIT',
    stack: ['Python', 'Docker', 'FastAPI', 'LiteLLM', 'GitLab CI'],
    description:
      'Security scanning and model evaluation tooling for Duke\'s locally deployed AI — automated artifact inspection before infrastructure access, plus comparative benchmarking to help Duke IT make informed, defensible adoption decisions.',
    longDescription:
      'As Duke deploys more AI models locally for privacy and cost reasons, two problems emerge: ensuring those models are safe to run on Duke infrastructure, and determining which perform best for Duke\'s specific use cases.\n\nThis Code+ 2026 project with the Duke Office of Information Technology builds tooling to answer both — a security scanning framework that automatically evaluates models downloaded from public repositories before they touch Duke systems, and a model evaluation framework that benchmarks performance across Duke-relevant task categories.\n\nThe security scanner checks for malicious code in model files, compromised dependencies, supply chain risks, and exposed credentials — producing a structured risk report. The evaluator produces comparative analytics across inference configurations to guide model selection.\n\nBoth pillars feed a shared dashboard for Duke IT teams. Stack is partially confirmed pending stakeholder finalization.',
    repoUrl: 'https://github.com/raphaelkaramagi/Security-and-QA-for-AI-Models',
    images: [],
  },

  // ── Completed (most recent first) ──────────────────────────────────────────
  {
    number: '03',
    slug: 'stock-predictor',
    title: 'Stock Price & Sentiment Predictor',
    status: 'Completed',
    stack: ['Python', 'TensorFlow/Keras', 'pandas', 'SQLite', 'Finnhub API'],
    description:
      'A dual-model pipeline predicting equity movement by combining windowed price features with headline sentiment — LSTM technical stack plus NLP scoring over Finnhub-fed news.',
    longDescription:
      'News to Alpha (repository: news-to-alpha) fuses two ML tracks: an LSTM trained on multi-day technical indicators from SQLite-backed price history, and a sentiment head over financial headlines ingested via Finnhub.\n\nAn ensemble combines price and text signals for directional cues ahead of the next session. Project imagery and live references will be updated here as assets are finalized.',
    repoUrl: 'https://github.com/raphaelkaramagi/news-to-alpha',
    images: [],
  },
  {
    number: '02',
    slug: 'compost-bin-washer',
    title: 'Automated Compost Bin Washing System',
    status: 'Completed',
    client: 'Compost Now',
    stack: ['Arduino Nano', 'C/C++', 'MOSFET Switching', 'Soldering', 'SolidWorks', 'Embedded Controls'],
    description:
      'A delivered embedded control system for Compost Now — solenoid-actuated wash timing with NEMA enclosure UI, field-tested against their hydraulic wash station.',
    longDescription:
      'A completed client project for Compost Now, a Raleigh-based composting company whose workers were manually timing bin washes with a pressure washer and hydraulic lift — leading to water waste and inconsistent cleans.\n\nThe deployed unit centers on an Arduino Nano driving a 12V solenoid valve through a MOSFET switching circuit with flyback diode protection. The solenoid is plumbed in series with the existing manual ball valve for failsafe operation — operators retain full manual control if power or firmware fails. A buck regulator derives 5V logic from the shared 12V supply.\n\nThe operator interface uses a NEMA-rated enclosure with debounced buttons for timed washes (30 / 60 / 90 seconds), LED indicators, an amber beacon during active cycles, and a hardware emergency-stop that drops solenoid drive immediately. Perfboard assemblies use screw terminals for field service.\n\nWork included embedded firmware, schematic-level design, soldering and enclosure fabrication, SolidWorks modeling, on-site commissioning with existing plumbing, and outdoor validation runs.',
    repoUrl: '',
    images: [
      '/projects/compost-bin/compost-circuit-prototype.jpeg',
      '/projects/compost-bin/compost-unit-angle.jpeg',
      '/projects/compost-bin/compost-context-facility.jpeg',
      '/projects/compost-bin/compost-field-validation.jpeg',
      '/projects/compost-bin/compost-unit-overview.jpeg',
      '/projects/compost-bin/compost-enclosure-open.jpeg',
      '/projects/compost-bin/compost-enclosure-side.jpeg',
      '/projects/compost-bin/compost-prototype-bench.jpeg',
    ],
  },
  {
    number: '01',
    slug: 'asl-cv-model',
    title: 'ASL Gesture Recognition',
    status: 'Completed',
    stack: ['Python', 'TensorFlow/Keras', 'MediaPipe', 'NumPy', 'Next.js', 'TensorFlow.js'],
    description:
      'A dual-model computer vision system classifying 29 ASL alphabet gestures from 87,000+ images — with a live interactive demo featuring webcam inference, in-browser training, and model comparison.',
    longDescription:
      'A computer vision system built to classify American Sign Language alphabet gestures. The project explores two distinct architectures: a traditional CNN trained directly on 87,000+ labeled images, and a lightweight Landmark Neural Network (~10K parameters) that operates on hand-skeleton coordinates extracted via MediaPipe.\n\nThe Landmark NN achieves 100% hand-detection accuracy on valid inputs and enables real-time CPU inference — roughly 200× smaller than the CNN baseline with no accuracy loss when hands are clearly visible. Both models reach 71% test accuracy across 29 gesture classes.\n\nA full interactive demo site lets users test both models via webcam or image upload, replay the actual training process epoch-by-epoch, train a small neural network live in the browser with configurable hyperparameters, compare model architectures and metrics side-by-side, and browse the dataset gallery with per-image predictions.',
    repoUrl: 'https://github.com/raphaelkaramagi/daml-asl',
    demoUrl: 'https://asl.raphaelkaramagi.com',
    images: [
      '/projects/asl/asl-landing.png',
      '/projects/asl/asl-webcam-predict.png',
      '/projects/asl/asl-upload-predict.png',
      '/projects/asl/asl-training-replay.png',
      '/projects/asl/asl-micro-training.png',
      '/projects/asl/asl-model-comparison.png',
      '/projects/asl/asl-sample-gallery.png',
      '/projects/asl/asl1.png',
      '/projects/asl/asl2.png',
      '/projects/asl/asl3.png',
    ],
  },

  // ── Planned (chronological — order they will be built) ─────────────────────
  {
    number: '05',
    slug: 'quant-backtester',
    title: 'Quant Backtester — C++ Event-Driven Engine',
    status: 'Planned',
    stack: ['C++17', 'ONNX Runtime', 'Python', 'CMake', 'GoogleTest'],
    description:
      'An event-driven backtesting engine in C++ integrating the existing LSTM-FinBERT predictor via ONNX — order book simulation, transaction cost modeling, and walk-forward validation against buy-and-hold, momentum, and mean-reversion baselines.',
    longDescription:
      'Reframes the existing Python ML predictor as a C++ systems piece — exporting the model to ONNX, wiring it into a C++ event loop over historical bar data, and running walk-forward validation with realistic transaction costs. More detail will be added as the project gets underway.',
    repoUrl: '',
    images: [],
  },
  {
    number: '06',
    slug: 'lox-bytecode-vm',
    title: 'Lox Bytecode VM in C',
    status: 'Planned',
    stack: ['C', 'clang', 'Valgrind', 'Make'],
    description:
      'A complete bytecode virtual machine for the Lox language — scanner, single-pass compiler, stack-based VM, closures, OOP, and mark-sweep garbage collector — following Crafting Interpreters Part III.',
    longDescription:
      'Implementing the full Lox language runtime in C: scanner, single-pass compiler emitting bytecode chunks, stack-based VM with constant pool, closures via upvalues, classes with inheritance, and a mark-sweep GC. One small extension beyond the book. More detail will be added as the project gets underway.',
    repoUrl: '',
    images: [],
  },
  {
    number: '07',
    slug: 'raft-kv-store',
    title: 'Distributed K/V Store with Raft Consensus',
    status: 'Planned',
    stack: ['C++17', 'gRPC', 'GoogleTest'],
    description:
      'A 3-node distributed key-value store built on a hand-written Raft consensus implementation — leader election, log replication, and fault-tolerance testing across partition and leader-failure scenarios.',
    longDescription:
      'Phased implementation: single-node K/V over TCP, then Raft leader election across 3 nodes, then full log replication and commit-index advancement, then fault-tolerance testing with structured logging to visualize consensus state. More detail will be added as the project gets underway.',
    repoUrl: '',
    images: [],
  },
  {
    number: '08',
    slug: 'cuda-transformer-engine',
    title: 'CUDA Inference Engine for a Small Transformer',
    status: 'Planned',
    stack: ['CUDA', 'C++', 'Python', 'nvcc', 'Nsight Compute'],
    description:
      'Hand-written CUDA kernels for GPT-2 small inference — tiled matmul, multi-head attention with KV cache, softmax, and layer norm — benchmarked against PyTorch.',
    longDescription:
      'Load GPT-2 small weights, implement each core kernel in CUDA and validate against PyTorch, wire into an end-to-end forward pass with greedy decode and KV cache, then benchmark tokens/sec and per-kernel GFLOPS against theoretical GPU peak. More detail will be added as the project gets underway.',
    repoUrl: '',
    images: [],
  },
]

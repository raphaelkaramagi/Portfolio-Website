/** Gallery preview (960px) for grid; full (1600px) for lightbox and archive covers. */
function img(file, folder) {
  return {
    preview: `/projects/${folder}/previews/${file}`,
    full: `/projects/${folder}/${file}`,
  }
}

/**
 * Archive card cover on the homepage (full-resolution).
 *
 * Per project in projects.js, set `coverImage`:
 * - omit (default): first entry in `images[]`, full size
 * - img('screenshot.png', 'folder'): pick a specific gallery image
 * - false: no cover, even when `images` has entries
 */
export function resolveProjectCover(project) {
  if (project.coverImage === false) return null
  if (project.coverImage?.full) return project.coverImage.full
  if (project.images?.[0]?.full) return project.images[0].full
  return null
}

export const projects = [
  // ── Ongoing ────────────────────────────────────────────────────────────────
  {
    number: '04',
    slug: 'duke-ai-security',
    title: 'AI Security & Evaluation Infrastructure',
    status: 'Ongoing',
    client: 'Duke OIT',
    stack: ['Python', 'Docker', 'Flask', 'Celery', 'Redis', 'LiteLLM', 'GitLab CI'],
    description:
      'Security scanning and model evaluation tooling for Duke\'s locally deployed AI — automated artifact inspection before infrastructure access, plus comparative benchmarking to help Duke IT make informed, defensible adoption decisions.',
    longDescription:
      'As Duke deploys more AI models locally for privacy and cost reasons, two problems emerge: ensuring those models are safe to run on Duke infrastructure, and determining which perform best for Duke\'s specific use cases.\n\nThis Code+ 2026 project with the Duke Office of Information Technology builds tooling to answer both — a security scanning framework that automatically evaluates models downloaded from public repositories before they touch Duke systems, and a model evaluation framework that benchmarks performance across Duke-relevant task categories.\n\nThe security scanner checks for malicious code in model files, compromised dependencies, supply chain risks, and exposed credentials — producing a structured risk report. The evaluator produces comparative analytics across inference configurations to guide model selection.\n\nBoth pillars feed a shared dashboard for Duke IT teams. This project is actively in progress, with the repository kept private during development.',
  repoUrl: '',
  images: [],
  // coverImage: false,  // uncomment to hide archive card cover when images exist
},

  // ── Completed (most recent first) ──────────────────────────────────────────
  {
    number: '03',
    slug: 'stock-predictor',
    title: 'Stock Price & Sentiment Predictor',
    status: 'Completed',
    stack: ['Python', 'PyTorch', 'Next.js', 'Flask', 'scikit-learn', 'Finnhub API'],
    description:
      'Next-day up/down forecasts for 20 US tickers — LSTM on price and technicals, TF-IDF and FinBERT on headlines, fused by a learned ensemble with a live markets dashboard.',
    longDescription:
      'News to Alpha predicts whether a stock goes up or down the next trading session by combining three tracks: an LSTM on 60-day price history and technical indicators, a TF-IDF logistic baseline on cutoff-aligned Finnhub headlines, and FinBERT embeddings for financial sentiment. A HistGradientBoosting ensemble merges them on the validation split, with conditional combiners for days with vs. without headlines.\n\nTraining runs locally via CLI (SQLite-backed collectors, chronological splits, 134+ pytest tests). Browse 20 tickers, switch Ensemble / LSTM / TF-IDF / Embeddings views, read top headlines, inspect "Why this call" insights, and track session accuracy on the Markets grid.',
    repoUrl: 'https://github.com/raphaelkaramagi/news-to-alpha',
    demoUrl: 'https://stock.raphaelkaramagi.com',
    // coverImage: img('stock-markets-grid.png', 'stock'),  // optional — defaults to images[0]
    images: [
      img('stock-markets-grid.png', 'stock'),
      img('stock-markets-overview.png', 'stock'),
      img('stock-ticker-headlines.png', 'stock'),
      img('stock-ticker-price-accuracy.png', 'stock'),
      img('stock-ticker-why-this-call.png', 'stock'),
      img('stock-ticker-advanced.png', 'stock'),
      img('stock-ticker-explainability.png', 'stock'),
    ],
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
    // coverImage: img('compost-unit-overview.jpeg', 'compost-bin'),
    images: [
      img('compost-circuit-prototype.jpeg', 'compost-bin'),
      img('compost-unit-angle.jpeg', 'compost-bin'),
      img('compost-context-facility.jpeg', 'compost-bin'),
      img('compost-field-validation.jpeg', 'compost-bin'),
      img('compost-unit-overview.jpeg', 'compost-bin'),
      img('compost-enclosure-open.jpeg', 'compost-bin'),
      img('compost-enclosure-side.jpeg', 'compost-bin'),
      img('compost-prototype-bench.jpeg', 'compost-bin'),
    ],
  },
  {
    number: '01',
    slug: 'asl-cv-model',
    title: 'ASL Alphabet Recognition',
    status: 'Completed',
    stack: ['Python', 'TensorFlow/Keras', 'MediaPipe', 'NumPy', 'Next.js', 'TensorFlow.js'],
    description:
      'Classifies 29 ASL alphabet gestures from 87,000+ Kaggle images — fine-tuned ResNet50 vs. a ~18K-parameter Landmark NN on MediaPipe features, with fully client-side inference in a live demo.',
    longDescription:
      'Classifies American Sign Language alphabet gestures from the Kaggle ASL Alphabet dataset (87,000+ labeled images, 29 classes) with two architectures compared side by side. ResNet50 transfer learning on hand-cropped 96×96 RGB frames (~23.6M parameters, 3-phase fine-tuning) reaches 96.4% end-to-end accuracy on a held-out 28-photo test set. A Landmark Neural Network (~18K parameters, ~72 KB deployed) classifies 63 wrist-relative features from 21 MediaPipe landmarks — 98.97% validation accuracy and 100% when a hand is detected, but 67.9% end-to-end because MediaPipe fails on roughly a third of those photos.\n\nThe Landmark NN is ~1,300× smaller by parameter count and runs in under a millisecond; ResNet50 is the stronger live choice because it always produces a prediction and scores best end-to-end. The demo site runs all inference client-side with TensorFlow.js and MediaPipe — webcam or image upload, architecture and metrics comparison, a 29-class sample gallery with per-image predictions, and tunable detection settings.',
    repoUrl: 'https://github.com/raphaelkaramagi/daml-asl',
    demoUrl: 'https://asl.raphaelkaramagi.com',
    coverImage: img('asl-webcam-predict.png', 'asl'),
    images: [
      img('asl-landing.png', 'asl'),
      img('asl-webcam-predict.png', 'asl'),
      img('asl-upload-predict.png', 'asl'),
      img('asl-training-replay.png', 'asl'),
      img('asl-micro-training.png', 'asl'),
      img('asl-model-comparison.png', 'asl'),
      img('asl-sample-gallery.png', 'asl'),
      img('asl1.png', 'asl'),
      img('asl2.png', 'asl'),
      img('asl3.png', 'asl'),
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
    number: '07',
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

export const projects = [
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
    number: '04',
    slug: 'duke-ai-security',
    title: 'AI Model Security & Evaluation Infrastructure',
    status: 'Ongoing',
    client: 'Duke OIT',
    stack: ['Python', 'Hugging Face', 'Docker', 'LLM Evaluation', 'Security Analysis'],
    description:
      'Security scanning and evaluation tooling for Duke\'s locally deployed models — Hugging Face ingestion pipelines, artifact inspection, and benchmark suites for IT-led deployments.',
    longDescription:
      'A summer contract project with Duke\'s Office of Information Technology. Focus areas include automated scanning of downloaded model artifacts before they enter Duke infrastructure, plus evaluation harnesses that compare candidate LLMs across representative workloads.\n\nMore technical scope, dashboards, and deployment notes will be added as the internship progresses.',
    repoUrl: '',
    images: [],
  },
  {
    number: '05',
    slug: 'chess-engine',
    title: 'Chess Engine',
    status: 'Planned',
    stack: ['Python', 'NumPy'],
    description:
      'A Python chess engine built from scratch — legal move generation, alpha-beta search with pruning, piece-square evaluation, and iterative deepening toward human-competitive play.',
    longDescription:
      'An engine centered on classical AI rather than neural nets: correct rules handling (including castling, en passant, and promotion), efficient board representation, negamax search with alpha-beta and basic move ordering (captures / killer heuristic scope TBD), and a handcrafted evaluation blending material and positional terms.\n\nStretch goals include opening books and tablebase-inspired endgame logic once the core search is stable.\n\nMore details will be added as the project takes shape.',
    repoUrl: '',
    images: [],
  },
]

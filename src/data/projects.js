export const projects = [
  {
    number: '01',
    slug: 'daml-stock-predictor',
    title: 'DAML Stock Price & Sentiment Predictor',
    status: 'Ongoing',
    stack: ['Python', 'TensorFlow/Keras', 'pandas', 'SQLite', 'Finnhub API'],
    description:
      'A dual-model stock prediction system combining price-based LSTM with NLP sentiment analysis. Currently in active development — the price model and data pipeline are functional, with the sentiment ensemble layer in progress.',
    longDescription:
      'DAML is a stock movement prediction system that fuses two distinct ML approaches. The first model is a price-based LSTM trained on 60-day windowed technical indicators. The second is a FinBERT NLP model that scores financial headlines for sentiment. An ensemble layer combines both signals to predict next-day movement.\n\nThe project is roughly halfway complete — the LSTM price model and the Finnhub data ingestion pipeline are working, and the FinBERT sentiment component is currently being integrated.',
    images: [],
  },
  {
    number: '02',
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    status: 'Completed',
    stack: ['React', 'Tailwind CSS', 'GSAP', 'Vite'],
    description:
      'This website. A cinematic developer portfolio with scroll-driven animations, interactive domain cards, and sticky project stacking — built with React 19 and GSAP.',
    longDescription:
      'A single-page portfolio site designed around the "Brutalist Signal" aesthetic — clean typography, information density, and purposeful animation. Features include a morphing glass navbar, GSAP-powered scroll animations, three interactive domain cards (typewriter, shuffler, grid scheduler), and a sticky-stacking project archive.\n\nBuilt with React 19, Tailwind CSS, GSAP 3 with ScrollTrigger, and Vite.',
    images: [],
  },
  {
    number: '03',
    slug: 'langvm-interpreter',
    title: 'LangVM — Scripting Language Interpreter',
    status: 'Planned',
    stack: ['Python'],
    description:
      'A custom scripting language interpreter — lexer, parser, bytecode compiler, and virtual machine.',
    longDescription:
      'A from-scratch interpreter for a custom dynamically-typed scripting language. The project will span the full compilation pipeline: tokenization, parsing, bytecode generation, and execution on a stack-based VM.\n\nMore details will be added as the project takes shape.',
    images: [],
  },
  {
    number: '04',
    slug: 'chess-engine',
    title: 'Chess Engine',
    status: 'Planned',
    stack: ['Python', 'NumPy'],
    description:
      'A chess AI with classical game-tree search and evaluation.',
    longDescription:
      'A chess engine exploring classical AI techniques — tree search, pruning, position evaluation, and move ordering. The goal is to build a competitive engine from first principles.\n\nMore details will be added as the project takes shape.',
    images: [],
  },
  {
    number: '05',
    slug: 'threadpool-http-server',
    title: 'ThreadPool — HTTP Server',
    status: 'Planned',
    stack: ['C++17', 'CMake'],
    description:
      'A concurrent HTTP server built from scratch in C++.',
    longDescription:
      'A low-level HTTP/1.1 server handling concurrent connections through a custom thread pool. The project focuses on systems fundamentals: socket programming, concurrency primitives, and memory safety.\n\nMore details will be added as the project takes shape.',
    images: [],
  },
  {
    number: '06',
    slug: 'dev-duels',
    title: 'Dev Duels',
    status: 'Planned',
    stack: ['Node.js', 'React', 'PostgreSQL'],
    description:
      'A real-time competitive programming platform with live matchmaking.',
    longDescription:
      'A platform where developers compete head-to-head on coding challenges in real time. Features will include matchmaking, live code execution, and post-match analytics.\n\nMore details will be added as the project takes shape.',
    images: [],
  },
]

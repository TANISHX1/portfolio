export interface Project {
  name: string;
  desc: string;
  category: string;
  githubUrl?: string;
  language: string;
  isSubProject?: boolean;
  longDesc?: string;
  features?: string[];
  techHighlights?: string[];
  status?: string;
}

export const projectCategories = [
  "Core Systems & Algorithms",
  "Operating Systems",
  "Simulation",
  "C/C++ Programmes",
  "Entertainment",
  "Networking & Distributed Systems",
  "AI & Computer Vision",
  "Creative Web"
];

export const projects: Project[] = [
  // Core Systems
  { 
    name: "seat-allocation-sys", 
    desc: "Multi-constraint examination seating generator with O(1) student search.", 
    category: "Core Systems & Algorithms", 
    language: "Python/Flask",
    githubUrl: "https://github.com/TANISHX1/seat-allocation-sys",
    status: "Under Development",
    longDesc: "A production-grade seating management suite featuring a column-major allocation algorithm. It handles complex academic constraints like batch isolation, broken-seat avoidance, and A/B paper set alternation. Includes a student-facing locator with a multi-file LRU cache architecture.",
    features: [
      "Column-major multi-constraint seating algorithm",
      "Automated PDF attendance and chart generation",
      "Student seat locator with sub-10ms warm search times",
      "JWT and Google OAuth2 administrative security"
    ],
    techHighlights: [
      "Python 3.13 / Flask Backend",
      "React 18 / Vite / Tailwind Admin UI",
      "In-memory synchronized LRU cache",
      "O(1) dataset indexing for L3 cache optimization"
    ]
  },

  // Operating Systems
  { 
    name: "unix-utilities", 
    desc: "A professional suite of POSIX-compliant system utilities and administrative tools.", 
    category: "Operating Systems", 
    language: "C",
    githubUrl: "https://github.com/TANISHX1/unix-utilities",
    longDesc: "A deep-dive into UNIX systems programming, implementing core utilities in C. This project re-engineers standard tools like cat, grep, and ls from scratch, focusing on low-level file I/O, buffer management, and efficient string processing. It also includes run-length encoding (RLE) implementations for file compression (wzip/wunzip).",
    features: [
      "Custom C implementations of cat (wcat) and grep (wgrep)",
      "Directory traversal and metadata parsing for wls",
      "Run-Length Encoding (RLE) based file compression system",
      "Robust error handling with POSIX-compliant status codes"
    ],
    techHighlights: [
      "Low-level C Systems Programming",
      "POSIX File I/O (fopen, getline, buffered I/O)",
      "RLE Compression Algorithms",
      "Memory-Safe Buffer Management"
    ]
  },
  { 
    name: "Concurrency", 
    desc: "Implementation of POSIX threading, synchronization, and deadlock prevention algorithms.",
    category: "Operating Systems",
    language: "C",
    githubUrl: "https://github.com/TANISHX1/Concurrency",
    longDesc: "An educational research project focused on Unix/Linux process management and thread synchronization. It implements various solutions to classic concurrency problems including atomicity violations, order violations, and complex deadlocks.",
    features: [
      "Mutex and Semaphore based synchronization",
      "Deadlock detection and prevention via resource ordering",
      "Condition variable implementations for thread signaling",
      "Livelock avoidance using randomized backoff strategies"
    ],
    techHighlights: [
      "POSIX Threading (pthreads)",
      "Unix System Calls",
      "Memory Barrier Analysis",
      "Critical Section Optimization"
    ]
  },

  // Simulation
  { 
    name: "lottery-scheduling-simulation", 
    desc: "Probabilistic CPU scheduler using tickets to provide fair-share CPU cycle allocation.",
    category: "Simulation",
    language: "C",
    githubUrl: "https://github.com/TANISHX1/lottery-scheduling-simulation",
    longDesc: "A simulation of a proportional-share CPU scheduler. It uses a randomized 'lottery' system to allocate process time slices based on the number of tickets assigned to each process, demonstrating how fairness and priority can be managed in a stochastic system.",
    features: [
      "Stochastic process scheduling algorithm",
      "Ticket-based priority weighting system",
      "Successive context switching simulation",
      "Performance metrics tracking and visualization"
    ],
    techHighlights: [
      "Probabilistic Data Structures",
      "Kernel Scheduling Logic",
      "Random Number Integration",
      "Process Lifecycle Management"
    ]
  },
  { 
    name: "segmentation-Simulator", 
    desc: "MMU simulator mapping 16-bit virtual addresses to physical memory using segmentation.",
    category: "Simulation",
    language: "C",
    githubUrl: "https://github.com/TANISHX1/segmentation-virtual-address-Simulator",
    longDesc: "A low-level simulator that mimics the hardware Memory Management Unit (MMU) behavior. It processes 16-bit virtual addresses, splitting them into segments (Code, Heap, Stack) and applying base/bounds logic to calculate actual physical address mappings.",
    features: [
      "Virtual-to-Physical address translation",
      "Segment table implementation with base/offset pairs",
      "Protection violation detection (Bounds checking)",
      "Dynamic segment growth simulation for heap/stack"
    ],
    techHighlights: [
      "Bit-level address masking",
      "Memory Segmentation Models",
      "Exception Handling simulation",
      "MMU Architecture Fundamentals"
    ]
  },

  // C/C++ Programmes
  { 
    name: "Audio Processing", 
    desc: "Native WAV file manipulation, header parsing, and volume control at the byte level.", 
    category: "C/C++ Programmes", 
    language: "C",
    githubUrl: "https://github.com/TANISHX1/C-C_Plus_Plus-Programs/tree/main/Audio_processing",
    longDesc: "A high-performance audio utility suite for parsing and modifying RIFF/WAV files. It demonstrates how to interact with raw digital audio data, handling block alignment, sampling rates, and PCM scaling without external libraries.",
    features: [
      "PCM (wav) Header parsing and validation",
      "Linear volume scaling at the sample level",
      "Support for multi-channel audio block alignment",
      "Hex-level data analysis and stream processing"
    ],
    techHighlights: [
      "Digital Signal Processing (DSP) Basics",
      "RIFF File Format Structure",
      "Bitstream Manipulation",
      "Memory-Efficient Buffer Management"
    ]
  },
  { 
    name: "DBMS in C++", 
    desc: "Multithreaded database client integrating MySQL C API with signal handling.", 
    category: "C/C++ Programmes", 
    language: "C++",
    githubUrl: "https://github.com/TANISHX1/C-C_Plus_Plus-Programs/tree/main/dbms_in_c++",
    longDesc: "A robust database connector and management utility built upon the MySQL Client library. It features advanced multithreaded input handling and POSIX signal management for a responsive command-driven interface.",
    features: [
      "MySQL Native C Connector integration",
      "Multithreaded asynchronous query execution",
      "Custom signal handlers for graceful session interruption",
      "Full CRUD operations via optimized SQL bridges"
    ],
    techHighlights: [
      "libmysqlclient Native API",
      "Thread Synchronization",
      "Unix Signal Engineering",
      "Resource Connection Pooling"
    ]
  },
  { 
    name: "Graphics-Engine", 
    desc: "Native graphics programming using BGI and low-level pixel manipulation.", 
    category: "C/C++ Programmes", 
    language: "C++",
    githubUrl: "https://github.com/TANISHX1/C-C_Plus_Plus-Programs/tree/main/Graphics",
    longDesc: "A graphics rendering engine built using the Borland Graphics Interface (BGI). It demonstrates the fundamentals of 2D rendering, pattern generation, and visual display techniques at the pixel level.",
    features: [
      "Pattern generation (bricks, grids, stars)",
      "Coordinate systems and scaling algorithms",
      "Dynamic visual decorations and display loops",
      "Low-level pixel buffer manipulation"
    ],
    techHighlights: [
      "BGI (Borland Graphics Interface)",
      "Frame-buffer manipulation",
      "Real-time rendering loops",
      "Memory-mapped I/O concepts"
    ]
  },

  // Entertainment
  { 
    name: "Hangman", 
    desc: "A portable, standalone repository implementing the classic game of deduction.", 
    category: "Entertainment", 
    language: "C",
    githubUrl: "https://github.com/TANISHX1/hangman",
    longDesc: "The original standalone implementation of the Hangman game. It focuses on clean, modular logic for word management and user feedback systems, serving as the foundational codebase for future iterations.",
    features: [
      "Modular deduction logic",
      "Clean CLI presentation layer",
      "Word bank management system",
      "Historical game state tracking"
    ],
    techHighlights: [
      "Standard C Libraries",
      "Game Loop Architecture",
      "State Management",
      "Buffer-Safe String Handling"
    ]
  },
  { 
    name: "Hangman V2", 
    desc: "Advanced state machine implementation of Hangman with graphical-ready logic.", 
    category: "Entertainment", 
    language: "C++",
    githubUrl: "https://github.com/TANISHX1/C-C_Plus_Plus-Programs/tree/main/Hangman%20V2",
    longDesc: "An evolved version of the Hangman project, utilizing C++ and advanced state management techniques. This version decouple the game logic from the rendering layer, making it ready for graphical display integration.",
    features: [
      "Object-oriented game state machine",
      "Enhanced word list with difficulty levels",
      "Debug utilities for logic verification",
      "Refactored Rendering-Logic bridge"
    ],
    techHighlights: [
      "OOP Design Patterns",
      "Advanced CPP Concepts",
      "Logic Abstraction",
      "Error Mitigation Systems"
    ]
  },

  // Other Tech
  { 
    name: "Server", 
    desc: "TCP-based multi-client handling using select() instead of threading.", 
    category: "Networking & Distributed Systems", 
    language: "C",
    githubUrl: "https://github.com/TANISHX1/Server",
    longDesc: "A high-performance TCP server implementation that utilizes I/O multiplexing via select(). This approach allows handling multiple concurrent connections efficiently without the overhead of heavy-weight threading.",
    features: [
      "Socket I/O multiplexing (select)",
      "Multi-client concurrent handling",
      "Non-blocking communication protocol",
      "Resource allocation safety checks"
    ],
    techHighlights: [
      "Network Socket API",
      "Synchronous Multi-Client Logic",
      "C10k Problem approach",
      "Memory-Efficient Data Buffering"
    ]
  },
  { 
    name: "image_detector", 
    desc: "Neural network-based feature extraction and classification system.", 
    category: "AI & Computer Vision", 
    language: "Python",
    githubUrl: "https://github.com/TANISHX1/image_detector",
    longDesc: "A vision-focused AI tool that leverages neural networks for automated grouping and classification of image features. It simplifies model execution and inference tracking through balanced abstraction layers.",
    features: [
      "NN Feature Extraction Pipeline",
      "Automated image classification",
      "Custom model handler for rapid inference",
      "Performance evaluation utility suite"
    ],
    techHighlights: [
      "Computer Vision Fundamentals",
      "Python Neural Network API",
      "Dataset Management",
      "Linear Algebra optimizations"
    ]
  },
  { 
    name: "Bitwixt", 
    desc: "A premium, motion-driven web experience with high-end GSAP animations and fluid UI.", 
    category: "Creative Web", 
    language: "React/GSAP",
    githubUrl: "https://github.com/TANISHX1/Bitwix12.O",
    longDesc: "A state-of-the-art web application developed for Bitwixt. It pushes the boundaries of web motion using GSAP, Lenis smooth scrolling, and OGL for advanced visual effects, creating a highly immersive user journey.",
    features: [
      "Motion-driven UI with GSAP core",
      "Smooth scroll integration (Lenis)",
      "Complex OGL-based visual effects",
      "Highly responsive modern React architecture"
    ],
    techHighlights: [
      "Vite / React 19",
      "Advanced Animation Sequence Management",
      "GPU-Accelerated Rendering",
      "Aesthetic Micro-interactions"
    ]
  }
];

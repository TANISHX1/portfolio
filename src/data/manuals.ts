export interface ManualEntry {
  projectName: string;
  workings: string;
  programs?: {
    name: string;
    desc: string;
  }[];
  setup: string[];
  execution: string;
}

export const projectManuals: Record<string, ManualEntry> = {
  "seat-allocation-sys": {
    projectName: "Seat Allocation System",
    workings: "The system uses a column-major allocation strategy to distribute students across multiple exam rooms. It enforces constraints such as 'Batch Isolation' (keeping students from different batches separated by at least one empty seat or different paper set) and handles 'Broken Seats' by skipping them during the allocation loop. The output is a set of JSON plans which are then processed into PDF charts and attendance sheets.",
    setup: [
      "Install Python 3.10+",
      "Clone the repository",
      "pip install -r requirements.txt",
      "Configure room dimensions in config/rooms.yaml"
    ],
    execution: "python main.py --config config.yaml",
    programs: [
      { name: "main.py", desc: "The core generator that calculates the seating layout." },
      { name: "pdf_gen.py", desc: "Converts JSON allocation data into professional PDF charts." },
      { name: "validator.py", desc: "Checks for constraint violations in a generated plan." }
    ]
  },
  "unix-utilities": {
    projectName: "UNIX Utilities",
    workings: "This project re-implements core UNIX functionality using the C programming language. It leverages the standard I/O library and POSIX system calls to interact with the filesystem. For utilities like 'wgrep' and 'wcat', it uses efficient string searching and line-buffered reading. The compression tools ('wzip' and 'wunzip') implement a custom Run-Length Encoding (RLE) algorithm for basic data reduction and restoration.",
    setup: [
      "Ensure GCC compiler is installed",
      "Clone: git clone https://github.com/TANISHX1/unix-utilities",
      "Navigate to utility directory: cd wcat"
    ],
    execution: "gcc -Wall -Werror [prog].c -o [prog] && ./[prog] [args]",
    programs: [
      { name: "wcat.c", desc: "A robust implementation of the cat command for file reading." },
      { name: "wgrep.c", desc: "Pattern matching utility using getline and standard string search." },
      { name: "wzip.c / wunzip.c", desc: "Run-Length Encoding (RLE) for stream-based compression." },
      { name: "wls.c", desc: "Filesystem navigator that lists directory contents and metadata." }
    ]
  },
  "Concurrency": {
    projectName: "Concurrency Research",
    workings: "Implements various synchronization primitives using pthreads. It explores deadlocks by creating circular wait conditions and then solves them using resource ordering. It also demonstrates how condition variables avoid busy-waiting in producer-consumer scenarios.",
    setup: [
      "Install build-essential (gcc, make)",
      "Ensure pthread library is available (standard on Linux)"
    ],
    execution: "gcc -pthread prog.c -o prog && ./prog",
    programs: [
      { name: "deadlock.c", desc: "Demonstrates resource sharing conflicts and recovery." },
      { name: "producer_consumer.c", desc: "Classic synchronization using mutexes and semaphores." }
    ]
  },
  "Audio Processing": {
    projectName: "Audio Processing Utility",
    workings: "Processes raw RIFF/WAV files by reading their 44-byte headers to extract sampling rates, bit depth, and channel info. The 'vol_control' utility then iterates through the PCM data samples, applying a linear scale factor to the byte values (multiplication) while ensuring values clamped to avoid digital clipping.",
    setup: [
      "GCC compiler installed",
      "Raw .wav file for testing"
    ],
    execution: "./vol_control input.wav 2.0 output.wav",
    programs: [
      { name: "vol_control.c", desc: "Scales the amplitude of PCM samples in a .wav file." },
      { name: "wav_Reader.c", desc: "Parses and prints technical metadata from the WAV header." }
    ]
  },
  "Graphics-Engine": {
    projectName: "Graphics Engine & Patterns",
    workings: "Uses the Borland Graphics Interface (BGI) to manipulate the screen buffer. It implements algorithms for geometric primitive drawing (Bresenham's line, Midpoint circle) and uses nested loops to create procedural patterns. Real-time visual effects are achieved by clearing and re-drawing the buffer at high frequency.",
    setup: [
      "Turbo C++ or GCC with WinBGIm/LibGraph",
      "Graphics driver (EGAVGA.BGI) in the same directory"
    ],
    execution: "g++ main.cpp -lgraph -o engine && ./engine",
    programs: [
      { name: "brick.cpp", desc: "Procedurally generates a photorealistic brick wall pattern." },
      { name: "grid.cpp", desc: "Creates a dynamic recursive grid visualization." },
      { name: "star.cpp", desc: "Renders a complex poly-star pattern with color gradient filling." },
      { name: "decor.c", desc: "A collection of screen decoration utilities for UI framing." }
    ]
  },
  "DBMS in C++": {
    projectName: "C++ DBMS Connector",
    workings: "Connects to a MySQL server using the native C API. It handles connection pooling and provides a generic wrapper for SQL query execution. It uses multithreading to keep the UI responsive while waiting for database I/O.",
    setup: [
      "libmysqlclient-dev installed",
      "Running MySQL instance"
    ],
    execution: "g++ app.cpp -lmysqlclient -o db_app && ./db_app",
    programs: [
      { name: "user_info.cpp", desc: "Main entry for user data management and query handling." },
      { name: "connector.cpp", desc: "Abstraction layer for MySQL C API interactions." }
    ]
  },
  "lottery-scheduling-simulation": {
    projectName: "Lottery Scheduler Simulation",
    workings: "Simulates a CPU scheduler that uses probabilistic tickets to assign time slices. At each context switch, a random 'ticket' number is generated, and the process holding that ticket is picked to run next. This ensures fair proportion share without the complexity of rigid priority levels.",
    setup: [
      "Gcc installed"
    ],
    execution: "gcc lottery.c -o sim && ./sim",
    programs: [
      { name: "lottery.c", desc: "The core simulator implementing the randomized ticket logic." }
    ]
  },
  "segmentation-Simulator": {
    projectName: "Memory Segmentation Simulator",
    workings: "Simulates how an Operating System manages memory segments. It translates 16-bit virtual addresses into physical addresses using a segment table. It detects and prevents out-of-bounds access by checking the offset against the segment's limit.",
    setup: [
      "Gcc installed"
    ],
    execution: "gcc segmentation.c -o mmu && ./mmu",
    programs: [
      { name: "segmentation.c", desc: "MMU logic for address translation and protection." }
    ]
  },
  "Hangman": {
    projectName: "Hangman CLI",
    workings: "A simple word-guessing game using standard input/output. It maintains a list of words, picks one at random, and handles the game loop (wrong guesses, reveal letters, win/loss states).",
    setup: ["Gcc installed"],
    execution: "gcc hangman.c -o game && ./game",
    programs: [
      { name: "hangman.c", desc: "Standalone game logic and CLI interface." }
    ]
  },
  "Hangman V2": {
    projectName: "Hangman Advanced",
    workings: "An improved version with a modular architecture. It features difficulty levels, better word filtering, and an score tracking system stored in a local data file.",
    setup: ["G++ installed"],
    execution: "g++ main.cpp -o game_v2 && ./game_v2",
    programs: [
      { name: "main.cpp", desc: "Advanced game engine with persistence and scoring." }
    ]
  },
  "Server": {
    projectName: "TCP Multi-Client Server",
    workings: "Uses the POSIX socket API to create a TCP server. It utilizes 'select()' or 'poll()' to multiplex multiple client connections through a single process/thread, managing state for each client independently.",
    setup: ["Gcc installed"],
    execution: "gcc server.c -o server && ./server",
    programs: [
      { name: "server.c", desc: "The multiplexing server that handles multiple clients." },
      { name: "client.c", desc: "A simple testing client to send/receive messages." }
    ]
  },
  "image_detector": {
    projectName: "AI Image Detector",
    workings: "Uses a pre-trained neural network (like MobileNet or a custom CNN) to perform object detection in real-time. It uses Python's vision libraries to pre-process images into tensors, runs the inference engine, and then overlays bounding boxes on the output.",
    setup: [
      "Python 3.8+",
      "pip install -r requirements.txt (torch/tensorflow, opencv)"
    ],
    execution: "python detect.py --source 0",
    programs: [
      { name: "detect.py", desc: "The main detection loop for video/images." },
      { name: "model.py", desc: "Defines the architecture of the neural network." }
    ]
  },
  "Bitwixt": {
    projectName: "Bitwixt Motion UI",
    workings: "A highly advanced React application using GSAP (GreenSock Animation Platform) for timeline-based animations. It uses Lenis for smooth scrolling and complex CSS transforms to create a fluid, premium-feeling user interface. It focuses on micro-interactions and high-FPS visual storytelling.",
    setup: [
      "Node.js 18+",
      "npm install"
    ],
    execution: "npm run dev",
    programs: [
      { name: "Home.jsx", desc: "The landing page incorporating major GSAP timelines." },
      { name: "Transitions.js", desc: "Custom page-to-page transition logic." }
    ]
  }
};

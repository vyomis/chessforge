export const leaderboardPlayers = [
    {
      id: "gm-001",
      username: "MagnusPrime",
      title: "GM",
      rating: 2847,
      country: "NO",
      wins: 312,
      games: 428,
      avatar:
        "https://api.dicebear.com/9.x/initials/svg?seed=MagnusPrime&backgroundColor=111827",
    },
    {
      id: "gm-002",
      username: "RoyalKnight",
      title: "GM",
      rating: 2791,
      country: "IN",
      wins: 287,
      games: 390,
      avatar:
        "https://api.dicebear.com/9.x/initials/svg?seed=RoyalKnight&backgroundColor=312e81",
    },
    {
      id: "gm-003",
      username: "TacticalFox",
      title: "GM",
      rating: 2768,
      country: "US",
      wins: 264,
      games: 371,
      avatar:
        "https://api.dicebear.com/9.x/initials/svg?seed=TacticalFox&backgroundColor=0f766e",
    },
    {
      id: "gm-004",
      username: "QueenHunter",
      title: "GM",
      rating: 2729,
      country: "FR",
      wins: 239,
      games: 355,
      avatar:
        "https://api.dicebear.com/9.x/initials/svg?seed=QueenHunter&backgroundColor=7c2d12",
    },
    {
      id: "gm-005",
      username: "EndgameKing",
      title: "IM",
      rating: 2698,
      country: "GB",
      wins: 221,
      games: 342,
      avatar:
        "https://api.dicebear.com/9.x/initials/svg?seed=EndgameKing&backgroundColor=334155",
    },
    {
      id: "gm-006",
      username: "KnightStorm",
      title: "GM",
      rating: 2664,
      country: "DE",
      wins: 210,
      games: 337,
      avatar:
        "https://api.dicebear.com/9.x/initials/svg?seed=KnightStorm&backgroundColor=4c1d95",
    },
    {
      id: "gm-007",
      username: "BishopBlitz",
      title: "FM",
      rating: 2618,
      country: "CA",
      wins: 194,
      games: 319,
      avatar:
        "https://api.dicebear.com/9.x/initials/svg?seed=BishopBlitz&backgroundColor=164e63",
    },
  ];
  
  export const puzzles = [
    {
      id: "puzzle-001",
      rating: 1100,
      theme: "Fork",
      difficulty: "Easy",
      title: "Knight Fork",
      description: "Find the move that attacks both major pieces.",
      fen: "r1bqk2r/pppp1ppp/2n2n2/8/1b2P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 1",
      solution: ["Nxe5"],
    },
    {
      id: "puzzle-002",
      rating: 1350,
      theme: "Pin",
      difficulty: "Medium",
      title: "Pinned Defender",
      description: "Exploit the pinned defender and win material.",
      fen: "r3k2r/ppp2ppp/2n5/8/2B1P3/2N5/PPP2PPP/R3K2R w KQkq - 0 1",
      solution: ["Bxf7+"],
    },
    {
      id: "puzzle-003",
      rating: 1550,
      theme: "Checkmate",
      difficulty: "Medium",
      title: "Back Rank",
      description: "Find the forcing checkmate.",
      fen: "6k1/5ppp/8/8/8/8/5PPP/6KQ w - - 0 1",
      solution: ["Qh8#"],
    },
  ];
  
  export const lessons = [
    {
      id: "lesson-1",
      title: "The Fundamentals",
      description:
        "Learn piece movement, board control, development and king safety.",
      level: "Beginner",
      lessons: 8,
      progress: 0,
      icon: "♟",
    },
    {
      id: "lesson-2",
      title: "Opening Principles",
      description:
        "Build strong positions by controlling the center and developing efficiently.",
      level: "Beginner",
      lessons: 10,
      progress: 0,
      icon: "♞",
    },
    {
      id: "lesson-3",
      title: "Tactical Vision",
      description:
        "Train forks, pins, skewers, discovered attacks and combinations.",
      level: "Intermediate",
      lessons: 14,
      progress: 0,
      icon: "⚔",
    },
    {
      id: "lesson-4",
      title: "Endgame Mastery",
      description:
        "Convert advantages and understand the most important theoretical endings.",
      level: "Advanced",
      lessons: 12,
      progress: 0,
      icon: "♔",
    },
  ];
  
  export const openings = [
    {
      name: "Italian Game",
      moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4",
      style: "Aggressive",
    },
    {
      name: "Sicilian Defense",
      moves: "1. e4 c5",
      style: "Complex",
    },
    {
      name: "Queen's Gambit",
      moves: "1. d4 d5 2. c4",
      style: "Strategic",
    },
    {
      name: "French Defense",
      moves: "1. e4 e6",
      style: "Solid",
    },
    {
      name: "Caro-Kann",
      moves: "1. e4 c6",
      style: "Solid",
    },
    {
      name: "King's Indian",
      moves: "1. d4 Nf6 2. c4 g6",
      style: "Dynamic",
    },
  ];
  
  export const featuredGames = [
    {
      id: "featured-1",
      white: "MagnusPrime",
      black: "RoyalKnight",
      rating: "2847 vs 2791",
      time: "10:00",
      viewers: 12840,
    },
    {
      id: "featured-2",
      white: "TacticalFox",
      black: "QueenHunter",
      rating: "2768 vs 2729",
      time: "3:00",
      viewers: 7342,
    },
    {
      id: "featured-3",
      white: "EndgameKing",
      black: "KnightStorm",
      rating: "2698 vs 2664",
      time: "15:10",
      viewers: 4210,
    },
  ];
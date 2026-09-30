# ♟️ ChessForge

A modern, full-featured chess platform inspired by the experience of sites like Chess.com.

ChessForge is a portfolio project focused on building a polished chess experience with real chess gameplay, player profiles, statistics, ratings, puzzles, game analysis, leaderboards, game history, and eventually online multiplayer.

> 🚧 WORK IN PROGRESS
> ChessForge is currently under active development. Features, UI, architecture, and gameplay systems are still being implemented and refined.

## 🎯 Project Goal

The goal of ChessForge is to build a complete chess platform rather than a simple chessboard demo.

The application is designed around several connected systems:

* ♟️ Full chess gameplay
* 👤 Persistent player profiles
* 🔐 User registration and login
* 📊 Player statistics
* 🏆 Ratings and leaderboards
* ⏱️ Chess clocks and time controls
* 🤖 Computer opponents
* 🧩 Chess puzzles
* 🔍 Game analysis
* 📜 Game history
* 📚 Learning content
* 👀 Game watching
* ⚙️ User settings
* 🌐 Online multiplayer

The long-term goal is to have these systems work together as one cohesive chess platform.

## 🚧 Current Development Status

ChessForge is currently in the active development phase.

### Implemented / In Progress

| Feature | Status |
| --- | --- |
| React application | 🟢 Implemented |
| Vite development environment | 🟢 Implemented |
| Chess board | 🟡 In progress |
| Legal chess moves | 🟡 In progress |
| Chess game state | 🟡 In progress |
| Player profiles | 🟡 In progress |
| User registration | 🟡 In progress |
| User login | 🟡 In progress |
| Persistent local accounts | 🟡 In progress |
| Game history | 🟡 In progress |
| Player statistics | 🟡 In progress |
| Ratings | 🟡 In progress |
| Leaderboards | 🟡 In progress |
| Chess clocks | 🟡 In progress |
| Computer opponent | 🟡 In progress |
| Multiple time controls | 🟡 In progress |
| Chess puzzles | 🔴 Planned |
| Game analysis | 🔴 Planned |
| Player search | 🔴 Planned |
| Learning section | 🔴 Planned |
| Game watching | 🔴 Planned |
| Online multiplayer | 🔴 Planned |
| Backend authentication | 🔴 Planned |
| Cloud database | 🔴 Planned |

# ✨ Features

## ♟️ Chess Gameplay

ChessForge is being built around complete chess gameplay using proper chess rules.

Planned gameplay features include:

* Legal move validation
* Check
* Checkmate
* Stalemate
* Castling
* En passant
* Pawn promotion
* Resignation
* Draws
* Move history
* Captured pieces
* Last-move highlighting
* Legal-move indicators
* Board orientation
* Board coordinates

## ⏱️ Time Controls

Players will be able to choose different game formats.

Planned time controls include:

* Bullet
* Blitz
* Rapid
* Custom time controls

Examples:

* 1 + 0 — Bullet
* 3 + 2 — Blitz
* 5 + 0 — Blitz
* 10 + 0 — Rapid
* 15 + 10 — Rapid

The clock system will include increment support and game-ending timeouts.

## 🤖 Computer Opponents

ChessForge will include computer opponents with multiple difficulty levels.

Planned difficulty levels include:

* Beginner
* Easy
* Intermediate
* Advanced
* Expert

The computer opponent will make legal chess moves and evaluate positions based on factors such as:

* Material
* Captures
* Checks
* Promotions
* Center control
* Position evaluation
* Move quality

A stronger chess engine such as Stockfish is planned for a later version.

## 👤 Player Profiles

Players will be able to create persistent ChessForge profiles.

Each profile will eventually include:

* Username
* Display name
* Profile avatar
* Rating
* Games played
* Wins
* Losses
* Draws
* Win percentage
* Game history
* Member-since date
* Player bio
* Recent games

## 🔐 Accounts

The development version of ChessForge will allow users to create and persist accounts in the browser.

Users will be able to:

1. Create an account
2. Log in
3. Stay logged in after refreshing
4. Edit their profile
5. Play games
6. Save their results
7. Track their statistics
8. View their game history
9. Appear on the leaderboard

### Important

The current local authentication system is intended for development and prototyping.

It is not production-grade authentication.

A future backend version will move authentication and account data to a secure server.

## 📊 Ratings

ChessForge will track player ratings.

Different time controls may eventually have separate ratings:

* Bullet — 1200
* Blitz — 1200
* Rapid — 1200

Completed games will update the player's rating based on the game result and opponent rating.

Future versions may use a more sophisticated rating system.

## 🏆 Leaderboards

ChessForge will include player leaderboards.

Players will eventually be able to view rankings based on:

* Rating
* Bullet rating
* Blitz rating
* Rapid rating
* Games played
* Wins

The leaderboard will be connected to the same player profiles and game results used throughout the application.

## 📜 Game History

Completed games will be stored as part of the player's history.

Each game can include:

* Opponent
* Result
* Time Control
* Date
* Number of Moves
* Game Result
* Move List
* Rating Change

Players will eventually be able to select a previous game and replay or analyze it.

## 🧩 Chess Puzzles

A dedicated puzzle system is planned.

Planned functionality:

* Puzzle positions
* Tactical themes
* Difficulty levels
* Move validation
* Puzzle streaks
* Puzzle statistics
* Puzzle rating
* Daily puzzles

Potential puzzle themes include:

* Forks
* Pins
* Skewers
* Discovered attacks
* Back-rank tactics
* Checkmate patterns
* Sacrifices
* Deflections

## 🔍 Game Analysis

ChessForge will eventually provide a dedicated analysis interface.

Planned features include:

* Move-by-move replay
* Position navigation
* Move list
* Captured pieces
* Position evaluation
* Best-move suggestions
* Mistake detection
* Blunder detection
* Opening identification

A stronger chess engine will be integrated during a later development phase.

## 🌐 Online Multiplayer

Online multiplayer is planned for a future version.

The long-term multiplayer architecture will include:

Player
↓
Authentication
↓
Backend Server
↓
WebSocket Connection
↓
Game Room
↓
Opponent

Planned multiplayer features:

* Real-time games
* Matchmaking
* Private challenges
* Game rooms
* Online presence
* Rematches
* Resignation
* Draw offers
* Spectating

This requires a backend rather than relying solely on browser local storage.

# 🛠️ Technology Stack

## Frontend

* React
* JavaScript
* Vite
* CSS
* HTML

## Chess

* chess.js

## UI

* Lucide React
* Custom CSS
* Responsive layouts
* Custom chess board interface

## Current Storage

* Browser localStorage

## Planned Backend

Future versions are expected to use:

* Node.js
* Express
* PostgreSQL
* Prisma
* Authentication
* WebSockets

## Planned Chess Engine

* Stockfish

# 🚀 Getting Started

## 1. Clone the repository

git clone 
cd ChessForge

## 2. Install dependencies

npm install

## 3. Start the development server

npm run dev

Vite will provide a local development URL, typically:
http://localhost:5173

🧪 Development
ChessForge is currently being developed incrementally.
The development process focuses on building the core systems first and then connecting them together.
Current development priorities:
Chess Engine / Game State

↓

Chess Board

↓

Game Controls

↓

Accounts

↓

Profiles

↓

Game Results

↓

Statistics

↓

Ratings

↓

Leaderboards

↓

Puzzles / Analysis

↓

Backend

↓

Online Multiplayer

🔒 Security Note
The current development version uses browser storage for account persistence.
This is useful for prototyping and local development but should not be considered secure authentication.
A production deployment will require:

* Server-side authentication
* Password hashing
* Secure sessions or tokens
* Database-backed accounts
* Authorization
* Server-side game validation
* Rate limiting
* Input validation
* Secure API endpoints

🎨 Design Goals
ChessForge is being designed to feel like a modern chess platform rather than a basic school project.
Design goals include:

* Clean interface
* Dark modern aesthetic
* Responsive layout
* Smooth animations
* Clear game feedback
* Strong visual hierarchy
* Fast interactions
* Professional player profiles
* Detailed statistics
* Immersive chess gameplay

🗺️ Development Roadmap
Phase 1 — Core Chess

* React/Vite setup
* Chess board
* Legal moves
* Check/checkmate
* Special moves
* Move history
* Game completion

Phase 2 — Player System

* Registration
* Login
* Persistent profiles
* Profile editing
* Player statistics
* Game history
* Ratings

Phase 3 — Chess Platform

* Leaderboards
* Player search
* Time controls
* Computer opponents
* Resignation
* Draw system
* Rematches

Phase 4 — Advanced Features

* Chess puzzles
* Puzzle rating
* Game analysis
* Opening explorer
* Learning section
* Game replay
* Spectating

Phase 5 — Online Infrastructure

* Backend
* PostgreSQL database
* Secure authentication
* WebSockets
* Online matchmaking
* Multiplayer games
* Private game rooms
* Online player presence

📸 Screenshots
Screenshots will be added as the interface reaches stable milestones.

Home
Add screenshot here:

Chess Game
Add screenshot here:

Player Profile
Add screenshot here:

Leaderboard
Add screenshot here:

Puzzles
Add screenshot here:

📈 Future Improvements
As ChessForge develops, additional systems may include:

* Friends
* Follow system
* Notifications
* Achievements
* Daily challenges
* Player titles
* Clubs
* Tournaments
* Rating history graphs
* Opening statistics
* Performance reports
* Custom board themes
* Custom piece sets
* Sound effects
* Move animations
* Game sharing
* PGN import/export

📚 What This Project Demonstrates
ChessForge is intended to demonstrate practical software engineering skills including:

* React development
* Component architecture
* State management
* Game-state programming
* Algorithmic thinking
* Data persistence
* Authentication architecture
* UI/UX design
* Responsive web development
* Client-side storage
* API architecture
* Database design
* Real-time communication
* Chess programming
* Performance optimization

🚧 Project Status
ChessForge is actively under development.
The project is being built from the ground up, with major features being added and connected over time.
The current version is a work-in-progress development build, not a finished production chess platform.

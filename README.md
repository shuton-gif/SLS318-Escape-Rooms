# Kanyouku Escape Room (慣用句エスケープルーム)

A local co-op game for English speakers learning Japanese idioms (慣用句 / *kanyouku*).

## What is a Kanyouku?

Just like English has idioms — "kick the bucket", "break a leg", "spill the beans" — Japanese has **慣用句**: short phrases whose real meaning has drifted away from the literal words. Every word is easy on its own, but the combination means something else entirely.

For example:
- 口に戸を立てる — literally *"put a door on your mouth"* → actually means *"keep a secret"*.
- 手を引く — literally *"pull someone's hand"* → actually means *"lend assistance"* (or, in another context, *"withdraw from something"*).
- 足元を見る — literally *"look at someone's feet"* → actually means *"take advantage of their weakness"*.

Learners who only know the individual words end up completely lost. This game is about bridging that gap — in a playful, cooperative way instead of a vocabulary list.

## How the game works

Three players share one keyboard. Each player controls one role that makes up an idiom:

| Role | What it is | Color |
|------|-----------|-------|
| **S** | Subject / setup phrase | blue |
| **O** | Object | yellow |
| **V** | Verb | pink |

Every stage presents:
- A **situation** in Japanese (what's happening in the story).
- An **English translation** of the situation.
- A **hint** — the literal, word-for-word translation of the idiom that solves it.

Puzzle pieces (words) are scattered on the ground. Each player can only pick up pieces matching their own role — so you have to talk to each other, match your piece to the idiom, and throw it into the goalpost in the middle of the screen.

- Correct piece → fills your slot, the rim flashes **green**.
- Wrong piece → the rim flashes **red**, all players freeze for 3 seconds. Think before you throw.

Complete all three slots correctly to clear the stage. Clear all stages to finish — your total time is shown on the end screen.

## Controls

| Player | Role | Left | Right | Action (pick up / throw) |
|--------|------|------|-------|--------------------------|
| 1 | S | A | D | W |
| 2 | O | B | M | H |
| 3 | V | ← | → | ↑ |

Press **Space** on the start screen to begin.

## Setup

### 1. Install Node.js

Install Node.js (version 20 or newer) from the terminal. `npm` is included with Node.

**macOS** (using Homebrew):
```bash
brew install node
```

**Windows** (using winget in Command Prompt or PowerShell):
```bash
winget install OpenJS.NodeJS.LTS
```

**Linux (Ubuntu / Debian)**:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify the install:
```bash
node --version
npm --version
```

### 2. Clone the repo

```bash
git clone https://github.com/shuton-gif/SLS318-Escape-Rooms.git
cd SLS318-Escape-Rooms
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- No backend — entirely local, no database, no accounts.

## Project layout

```
app/
  Game/
    Game.tsx                  main game loop
    gameState.ts              types, constants, initial state
    PuzzlePiece.tsx           piece rendering
    ku/stage-examples.json    stage data (situations, idioms, translations)
  Player/
    player.tsx                player character rendering
utils/
  toRem.ts                    px -> rem helper
```

## Adding your own stages

Edit `app/Game/ku/stage-examples.json`. Each entry needs:
- `stageNumber`, `situation` (JP), `english` (EN situation), `hint` (literal translation of the idiom)
- `completedKanyouku`, `explanation` (JP), `englishExplanation`
- `roles.S`, `roles.O`, `roles.V` — the three pieces of the idiom

Decoy pieces are auto-generated from other stages' role words, so you don't need to list wrong answers.

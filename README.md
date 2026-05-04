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

This guide assumes you have never used a terminal before. Every step below is copy-paste.

Open your terminal first:
- **macOS**: press `Cmd + Space`, type `Terminal`, press Enter.
- **Windows**: press the Windows key, type `PowerShell`, press Enter.
- **Linux**: open your Terminal app from the applications menu.

### 1. Make a folder to hold everything

We'll put the game and all its tools in one folder called `kanyouku-game` inside your home directory. If you ever want to remove this project, you can just delete this one folder.

**macOS / Linux**:
```bash
mkdir -p ~/kanyouku-game
cd ~/kanyouku-game
```

**Windows (PowerShell)**:
```powershell
mkdir $HOME\kanyouku-game
cd $HOME\kanyouku-game
```

From here on, run every command inside this folder (your terminal prompt should show `kanyouku-game`).

### 2. Install Homebrew (macOS only)

Homebrew is the package manager we'll use on macOS to install Git and Node.js. If you already have it (check with `brew --version`), skip to step 3.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

When the install finishes, it will print two `Next steps` commands that add `brew` to your shell — run those exactly as printed (they usually start with `echo` and `eval`). Then close and reopen Terminal, and verify:
```bash
brew --version
```

Windows and Linux users can skip this step.

### 3. Install Git

Git is the tool used to download the project code.

**macOS** (using Homebrew):
```bash
brew install git
```

**Windows** (using winget in PowerShell):
```powershell
winget install --id Git.Git -e
```
After this finishes, **close and reopen PowerShell** so the `git` command becomes available.

**Linux (Ubuntu / Debian)**:
```bash
sudo apt-get update
sudo apt-get install -y git
```

Verify:
```bash
git --version
```

### 4. Install Node.js

Node.js runs the game. `npm` (used to install the project's parts) comes with it. Use version 20 or newer.

**macOS** (using Homebrew):
```bash
brew install node
```

**Windows** (using winget in PowerShell):
```powershell
winget install OpenJS.NodeJS.LTS
```
After this finishes, **close and reopen PowerShell**.

**Linux (Ubuntu / Debian)**:
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify:
```bash
node --version
npm --version
```

### 5. Download the game

Make sure you are still inside `kanyouku-game` (run `cd ~/kanyouku-game` on macOS/Linux or `cd $HOME\kanyouku-game` on Windows if not). Then:

```bash
git clone https://github.com/shuton-gif/SLS318-Escape-Rooms.git
cd SLS318-Escape-Rooms
```

### 6. Install the game's parts

```bash
npm install
```
This can take a couple of minutes. It's normal to see a lot of text scrolling.

### 7. Run the game

```bash
npm run dev
```

Once you see a message like `ready - started server on http://localhost:3000`, open [http://localhost:3000](http://localhost:3000) in your web browser.

To stop the game, go back to the terminal and press `Ctrl + C`.

### Uninstall

Close the game (`Ctrl + C` in the terminal), then delete the whole folder:

**macOS / Linux**:
```bash
rm -rf ~/kanyouku-game
```

**Windows (PowerShell)**:
```powershell
Remove-Item -Recurse -Force $HOME\kanyouku-game
```

(Node.js and Git will stay installed — you can remove them separately through your package manager if you want.)

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

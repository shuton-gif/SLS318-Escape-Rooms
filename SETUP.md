# Setup Manual

This guide walks you through running the project from a completely fresh computer. **No prior experience required.** You will install some tools, download the project, and start it. Pick the section that matches your computer.

- [Mac Setup](#mac-setup)
- [Windows Setup](#windows-setup)
- [How to Stop the App](#how-to-stop-the-app)
- [Troubleshooting](#troubleshooting)

---

## Mac Setup

### Step 1 — Open the Terminal

The **Terminal** is an app that lets you type commands to your computer. We'll be using it for almost everything.

1. Press `⌘` (Command) + `Space` at the same time. A search bar opens.
2. Type `Terminal` and press `Return` (Enter).
3. A window with a black or white background opens. You'll see a blinking cursor. **Leave this window open** — we'll come back to it.

> **Tip:** Whenever this guide says "type X and press Enter," that means: click into the Terminal window, type the text, then press the `Return` key.

### Step 2 — Install the Xcode Command Line Tools

These are basic tools Apple provides that other things (like Homebrew and Git) need to work.

In the Terminal, type this and press Enter:

```bash
xcode-select --install
```

A pop-up window appears. Click **Install** and agree to the license. This takes 5–15 minutes depending on your internet speed. **Wait until it finishes** before moving on.

If you see a message that says "command line tools are already installed," that's fine — skip to Step 3.

### Step 3 — Install Homebrew

**Homebrew** is the easiest way to install developer tools on a Mac. Think of it like the App Store, but for command-line tools.

In the Terminal, paste this entire line and press Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- It will ask for your **Mac password**. Type it (the cursor won't move while you type — that's normal) and press Enter.
- It will ask you to press `Return` to continue. Do that.
- Wait for it to finish (a few minutes).

When it finishes, it might print 2 lines that start with `echo`. Copy and paste **those exact two lines** into the Terminal and press Enter. (This adds Homebrew to your shell so it works.)

To check it worked, type:

```bash
brew --version
```

You should see something like `Homebrew 4.x.x`. If you do, Homebrew is installed.

### Step 4 — Install Git

**Git** is the tool that downloads (clones) the project's code from the internet.

```bash
brew install git
```

Wait for it to finish, then check:

```bash
git --version
```

You should see something like `git version 2.x.x`.

### Step 5 — Install Node.js

**Node.js** runs the JavaScript that powers the app. We need version 18 or newer.

```bash
brew install node
```

Wait for it to finish, then check:

```bash
node --version
npm --version
```

You should see two version numbers (e.g. `v22.x.x` and `10.x.x`). If you do, Node is installed.

### Step 6 — Download the Project

Pick a folder where you want to keep the code. The `Documents` folder is a fine place. In the Terminal:

```bash
cd ~/Documents
git clone https://github.com/shuton-gif/SLS318-final.git
cd SLS318-final
```

Explanation:
- `cd ~/Documents` moves you into your Documents folder.
- `git clone …` downloads the project.
- `cd SLS318-final` moves you into the newly downloaded folder.

### Step 7 — Install the Project's Dependencies

The project uses some libraries (Next.js, React). This command downloads them into a `node_modules` folder.

```bash
npm install
```

This takes 1–3 minutes. You can ignore any yellow `warn` messages. If you see a red `ERR!`, see [Troubleshooting](#troubleshooting).

### Step 8 — Start the App

```bash
npm run dev
```

After a few seconds you'll see something like:

```
- Local:  http://localhost:3000
✓ Ready in 1.2s
```

### Step 9 — Open the Game in Your Browser

Open Safari, Chrome, or Firefox and go to:

**http://localhost:3000**

You should see the **TOWER OF BABEL** landing page. Click **START AT FLOOR 1** to play.

---

## Windows Setup

### Step 1 — Open PowerShell as Administrator

**PowerShell** is the Windows equivalent of a terminal. We need it in **Administrator mode** so it can install things.

1. Click the **Start** button (Windows icon, bottom-left).
2. Type `PowerShell`.
3. In the search results, you'll see "Windows PowerShell." **Right-click** it.
4. Click **Run as administrator**.
5. A window pops up asking "Do you want to allow this app to make changes?" — click **Yes**.

A blue window opens. **Leave it open.**

### Step 2 — Install Git

Git is the tool that downloads the project's code. Windows has a tool called `winget` that can install software from the command line.

In PowerShell, type and press Enter:

```powershell
winget install --id Git.Git -e --source winget
```

Wait until it says "Successfully installed."

> If `winget` is not recognized: open the Microsoft Store, search for "App Installer," install or update it, then try again. Or download Git directly from <https://git-scm.com/download/win> and run the installer (accept all defaults by clicking Next repeatedly).

### Step 3 — Install Node.js

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget
```

Wait until it says "Successfully installed."

> Alternative: download the **LTS** installer from <https://nodejs.org/> and run it. Accept all defaults.

### Step 4 — Close and Reopen PowerShell

The new tools won't work in the current window. **Close PowerShell** (click the X) and **open a new PowerShell window** (this time you don't need administrator mode — just click Start, type `PowerShell`, click it).

### Step 5 — Verify the Installs

In the new PowerShell window, type each of these and press Enter:

```powershell
git --version
node --version
npm --version
```

Each should print a version number. If any of them says "not recognized," the install didn't take effect — restart your computer and try again.

### Step 6 — Download the Project

Pick a folder. The `Documents` folder is fine.

```powershell
cd $HOME\Documents
git clone https://github.com/shuton-gif/SLS318-final.git
cd SLS318-final
```

Explanation:
- `cd $HOME\Documents` moves into your Documents folder.
- `git clone …` downloads the project.
- `cd SLS318-final` enters the project folder.

### Step 7 — Install the Project's Dependencies

```powershell
npm install
```

This takes 1–3 minutes. Yellow `warn` messages are fine. Red `ERR!` messages mean something went wrong — see [Troubleshooting](#troubleshooting).

### Step 8 — Start the App

```powershell
npm run dev
```

After a few seconds you'll see:

```
- Local:  http://localhost:3000
✓ Ready in 1.2s
```

### Step 9 — Open the Game in Your Browser

Open Edge, Chrome, or Firefox and go to:

**http://localhost:3000**

You should see the **TOWER OF BABEL** landing page. Click **START AT FLOOR 1** to play.

---

## How to Stop the App

In the Terminal/PowerShell window where the app is running, press `Ctrl` + `C` (on Mac, that's the regular `Control` key, not Command). The server stops.

To start it again later:

1. Open Terminal/PowerShell.
2. `cd` into the project folder (e.g. `cd ~/Documents/SLS318-final` on Mac, or `cd $HOME\Documents\SLS318-final` on Windows).
3. Run `npm run dev`.

You don't need to re-install anything — it's already on your computer.

---

## How to Play

- **Player 1** (cyan): `A`/`D` to move, `W` to pick up & throw, `S` to drop.
- **Player 2** (pink): `←`/`→` to move, `↑` to pick up & throw, `↓` to drop.

Pick up a puzzle piece, walk to the goal in the middle, and throw it in. Get the right one and you advance to the next floor.

---

## Troubleshooting

### "command not found" or "not recognized"

Close the Terminal/PowerShell completely and reopen it. New installs sometimes don't show up until you restart the window. If that doesn't work, restart your computer.

### `npm install` fails with red errors

1. Make sure you're inside the project folder (you should see `package.json` if you run `ls` on Mac or `dir` on Windows).
2. Delete the broken install and try again:

   **Mac:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

   **Windows:**
   ```powershell
   Remove-Item -Recurse -Force node_modules, package-lock.json
   npm install
   ```

### Port 3000 is already in use

Something else is using port 3000. Either stop that other thing, or run on a different port:

```bash
npm run dev -- -p 3030
```

Then open <http://localhost:3030> instead.

### The page shows "Floor X not populated"

Only certain floors have data: **1, 2, 3, 31, 32, 33, 61, 71, 81**. Others will show this message — go back to the landing page and pick a populated floor.

### Still stuck

Take a screenshot of the error message in the Terminal/PowerShell and ask for help. The exact wording of the error is what matters.

# PanzerPat

**A tactical petting division.** Click a tank, rub its armor, hear it quack, and grow a hangar full of extremely good boys.

PanzerPat is a cozy, one-player idle clicker built with Electron, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide. Its matte-black garage is packed with telemetry, little details, and a tank that takes every pat very seriously.

## The petting bay

- **Click or rub the tank** to earn Armor Points (AP). A quick drag back and forth counts as a petting stroke, with floating AP, hearts, ducks, and sparkles.
- **Enjoy the bounce:** each pet triggers a squash, stretch, and alternating wobble, with animated tracks, suspension, turret, and a happy visor.
- **Listen in:** Web Audio synthesizes a rubber-duck quack that changes pitch with your tank. Switch between **QUACK SFX** and **ENGINE PURR**, or mute it.
- **Charge Purr / Quack Fever** to reach 2× at 45% and 3× at 90%. Fever slowly cools off, so keep the pats coming.
- **Grow your fleet:** owned tanks keep earning passive AP every second, even when another tank is active.
- **Tune the garage:** upgrade pet strength, fever, auto-petting, and critical-quack chances.
- **Keep your progress:** the game autosaves in local storage every three seconds. Export a JSON save, import it later, or reset the campaign from the Hangar or Workshop.

## The hangar roster

| # | Tank | Class |
|---:|---|---|
| 01 | FT-17 | Light |
| 02 | MS-1 (T-18) | Light |
| 03 | L3/33 CC | Light |
| 04 | BT-7 | Light |
| 05 | T-26 | Light |
| 06 | Panzer III Ausf. J | Medium |
| 07 | M4 Sherman | Medium |
| 08 | T-34-85 | Medium |
| 09 | Cromwell V | Medium |
| 10 | Panzer IV Ausf. H | Medium |
| 11 | KV-1 | Heavy |
| 12 | IS-2 | Heavy |
| 13 | Panther Ausf. G | Heavy |
| 14 | Tiger I | Heavy |
| 15 | Tiger II (King Tiger) | Heavy |
| 16 | T29 Heavy | Heavy |
| 17 | Centurion Mk. 7/1 | Heavy |
| 18 | T-54 / T-55 | Heavy |
| 19 | IS-3 | Super-heavy / MBT |
| 20 | Leopard 2A7 | Super-heavy / MBT |
| 21 | M1A2 Abrams | Super-heavy / MBT |
| 22 | T-90M | Super-heavy / MBT |
| 23 | FV4005 Stage II — “Doom Barn” | Super-heavy / MBT |
| 24 | Panzer VIII Maus — the ultimate 188-ton quacking fortress | Super-heavy / MBT |

Every tank has its own silhouette and camo palette, flavor quote, quack pitch, AP per pet, and AP per second. Later vehicles cost more and bring a bigger payoff.

## Garage upgrades

| Upgrade | Effect |
|---|---|
| Soft Microfiber Glove | Adds AP to every pet |
| Turbo Duck Caller | Keeps fever charged longer and adds a little extra kick |
| Robotic Petting Arm | Automatically pets your active tank every second |
| Reactive Armor Polish | Adds a chance for a 5× critical quack |

Upgrade prices rise with each level. The effect is fleet-wide wherever it applies.

## Play on Windows

Download **PanzerPat-Windows.exe** from the latest successful [GitHub Actions build](../../actions/workflows/build-game.yml?query=branch%3Amain). Open the completed workflow run, scroll to **Artifacts**, and download **PanzerPat-Windows**. The portable app runs directly; it does not need an installer.

## Run from source

Requires Node.js 22 and npm.

```bash
npm install --legacy-peer-deps
npm run dev
```

The Vite development server opens the game UI in your browser. To compile and create the x64 portable Windows app:

```bash
npm run typecheck
npm run build
```

The Windows executable is written to `release/PanzerPat-Windows.exe`. Packaging uses electron-builder's portable target and disables certificate auto-discovery.

## GitHub Actions

`.github/workflows/build-game.yml` builds on `windows-latest` with Node 22 for pushes to `main` / `master`, pull requests, and manual runs. The workflow installs with `npm install --legacy-peer-deps`, runs the TypeScript checks and production builds, packages the portable x64 executable, then uploads it as the **PanzerPat-Windows** artifact.

## Stack

Electron · React · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide · Web Audio API · electron-builder

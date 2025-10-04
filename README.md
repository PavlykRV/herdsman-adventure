# Pixi.js Game Prototype

A simple HTML5 game prototype built with **Pixi.js**, **TypeScript**, and **Vite**.  
This project demonstrates basic game mechanics including a controllable hero, animals that follow the hero, and a farm area.

---

## 🎮 Features

- **Hero movement** with click/tap input.
- **Animals** with patrol and follow behavior.
- **Farm area** where animals can be collected.
- **Counter UI** displaying the number of animals in the farm.
- Fully **responsive canvas** that resizes to the window.
- Built using **Pixi.js 8+** and **TypeScript**.

---

## 🛠 Tech Stack

- [Pixi.js](https://pixijs.com/) – 2D rendering engine for the web.
- [TypeScript](https://www.typescriptlang.org/) – typed JavaScript for better maintainability.
- [Vite](https://vitejs.dev/) – fast development server and bundler.
- CSS for simple UI overlay (animal counter).

---

## 📂 Project Structure

- src
  - entities
    - Player.ts        # Player class
    - Animal.ts        # Animal class with patrol/follow behavior
  - scenes
    - MainScene.ts     # Main game scene
  - ui
    - CounterUI.ts     # DOM counter overlay
  - main.ts            # Game entry point

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
This will start Vite and open your browser at http://localhost:5173.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```
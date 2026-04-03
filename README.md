# Tic Tac Toe

A responsive, two-player Tic Tac Toe game built with React and Vite. Supports an N×N board (currently 5×5) with win, draw, and restart mechanics. Deployed via GitHub Pages.

**Live:** [https://varun-kelkar.github.io/tic-tac-toe-react/](https://varun-kelkar.github.io/tic-tac-toe-react/)

## Project Overview

- **Tech Stack:** React 19, Vite 8, gh-pages
- **Board:** Dynamic N×N grid — change the board size in one place and everything adapts (grid layout, reset, win detection)
- **Win Detection:** Checks all rows, columns, and both diagonals after every move
- **Draw Detection:** Triggers when the board is full with no winner; players can also declare an early draw
- **Restart:** Play Again button appears after any game ends (win or draw)
- **Responsive:** Fluid layout using CSS `clamp()` — optimized for mobile-first play
- **Deployment:** `npm run deploy` builds and publishes to GitHub Pages via `gh-pages`

## Core Challenges

### UX Challenges

1. **Dynamic Grid Layout** — The CSS grid adapts its columns from the board state via an inline style (`gridTemplateColumns: repeat(n, 1fr)`), so changing the board dimension requires no CSS changes.
2. **Mobile Responsiveness** — Used `clamp()` for cell sizes, gaps, padding, and font sizes so the board scales smoothly from ~320px phones to desktop without breakpoints.
3. **State-Driven UX** — A single `winner` state (`null`, `"playerOne"`, `"playerTwo"`, `"draw"`) drives the turn indicator, winner banner, and button visibility — keeping the render logic simple and declarative.

### Logical Challenges

1. **N×N Win Detection** — Generalised the win-check algorithm to work for any board size, scanning rows, columns, and both diagonals dynamically instead of hardcoding winning combinations.
2. **Draw Detection** — Detects a draw when the board is full with no winner; also supports an early draw declaration by the players, both funneling through the same state transition.

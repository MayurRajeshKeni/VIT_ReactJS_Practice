# BCSE203E: Web Programming Lab — Lab Assessment 4 (LA4)

**Student:** MAYUR R KENI  
**Reg No:** 24BCE0686  
**Programme:** B.Tech | Branch: CSE  
**Slot:** L33+L34 / L59+L60  
**Venue:** PRP232

---

## Overview

This repository contains **8 React-based lab assessment problems** submitted as part of the Web Programming Lab (LA4). Each question is organized as an independent project folder within the React development environment.

**Questions 6, 7, and 8 are the flagship projects** — fully functional web applications that integrate external public APIs, multi-component architecture, utility modules, and custom CSS styling.

> **Note on `App.js`:** An additional `App.js` file exists at the root `src/` level. This file was iteratively updated throughout development to import and render each question's component on the React dev server to preview output. It acts as a switchboard — simply change the import to point to the desired question component to see it live.

---

## ⭐ Main Projects

---

### Q6 — Atmosphere: Weather Dashboard

**Folder:** `WEB_LA4_Q6/`

```
src/
├── components/
│   ├── dashboard.js
│   ├── header.js
│   └── search.js
├── styles/
│   └── main.css
└── utils/
    └── weather.js
main.js
server.js
```

**Problem Statement:** Develop a Weather Dashboard web application using ReactJS that allows users to search for any city and view current weather conditions fetched from an external weather API.

**Key Features:**
- City search bar with live geocoding (via Open-Meteo Geocoding API)
- Current conditions hero card: temperature, feels-like, weather icon
- 6-day forecast with high/low temps and rain probability
- Hourly temperature bar chart (next 24 hours)
- Atmospheric details: humidity, wind speed & direction, UV index, pressure, cloud cover, visibility
- Sunrise/sunset arc (animated SVG sun tracker)
- Live clock in the header
- °C / °F unit toggle with `localStorage` persistence
- Session restore — remembers the last searched city on reload

**Architecture:** Vanilla JS component architecture (`renderHeader`, `renderSearch`, `renderDashboard`) integrated into React via `useEffect` and a `boot()` function exported from `main.js`. `App.js` mounts the vanilla app into a `<div id="app">` after the DOM is ready.

**APIs Used:**
- Open-Meteo Forecast API (free, no key required)
- Open-Meteo Geocoding API

**Notable Concepts:** Dual-stage async geocode → weather fetch, `localStorage` persistence, SVG arc rendering, `setInterval`-based live clock, modular vanilla JS components in a React shell.

---

### Q7 — Folio: Book Explorer

**Folder:** `WEB_LA4_Q7/`

```
src/
├── components/
│   ├── dashboard.js
│   ├── header.js
│   └── modal.js
├── styles/
│   └── main.css
└── utils/
    └── openlib.js
main.js
index.html
package.json
vite.config.js
```

**Problem Statement:** Develop a Book Explorer web application using ReactJS that allows users to search for books and view their details from an external public API.

**Key Features:**
- Search bar with debounced autocomplete suggestions
- Book results displayed in a fluid Grid or List view (toggle)
- Subject-based filter pills to narrow results
- Infinite scroll "Load More" pagination
- Book detail modal with summary, publication year, page count, edition count, and rating stars
- "My Shelf" persistence panel — save favourite books to `localStorage`
- Stats row: total found, average rating, local results count
- Animated loading spinner and error states

**Architecture:** Vanilla JS component architecture (`renderHeader`, `renderDashboard`, `openBookModal`) integrated into React via `useEffect` and an exported `init()` function from `main.js`. `App.js` triggers `init()` once the DOM is ready, preventing double-initialization in React 18 Strict Mode. Built with **Vite** for the dev server.

**APIs Used:**
- Open Library Search API (`openlibrary.org/search.json`)
- Open Library Book Details API (`openlibrary.org/<key>.json`)
- Open Library Author API
- Open Library Covers API

**Notable Concepts:** Debounce pattern for autocomplete, `localStorage` favorites shelf, spread operator for immutable state updates, `filter()` / `some()` / `map()` array method chaining, CSS glassmorphism modal backdrop, editorial dark-mode design system with CSS custom properties.

---

### Q8 — Atlas: Country Explorer

**Folder:** `WEB_LA4_Q8/`

```
components/
├── CountryCard.jsx
├── CountryDetail.jsx
├── Header.jsx
└── SearchBar.jsx
utils/
└── api.js
App.jsx
index.css
main.jsx
```

**Problem Statement:** Develop a Country Explorer web application using ReactJS that allows users to explore information about countries around the world using the REST Countries public API.

**Key Features:**
- Fetches all 250+ countries on mount via `useEffect`
- Live search by country name or capital city
- Region filter dropdown (Africa, Americas, Asia, Europe, Oceania)
- Sort toggle: Alphabetical or by Population (descending)
- Fluid responsive grid of country cards showing flag, name, capital, population, and region badge
- Country detail modal (`CountryDetail.jsx`) with deeper information and "navigate to" functionality for related borders
- Performance-optimized filtering with `useMemo` to prevent re-computation on every render

**Architecture:** Fully native React component architecture using `.jsx` files. `App.jsx` is the state orchestrator, managing all control states (`searchQuery`, `region`, `sort`, `selectedCode`) and distributing them as props to child components. `api.js` handles the REST Countries API fetch and data normalization.

**APIs Used:**
- REST Countries API (`restcountries.com/v3.1/all`)

**Notable Concepts:** `useState`, `useEffect`, `useMemo` hooks, `localeCompare` for natural language sorting, `Object.values()` for flattening nested API data (currencies/languages), lazy image loading, CSS custom properties with an "Earth dark-mode" editorial theme, `@keyframes` animations for entry transitions and the loading spinner.

---

## Other Questions (Q1–Q5)

These questions are simpler single-component React exercises demonstrating core React fundamentals. Each has a corresponding `WEB_LA4_Qn.js` component file and an `App.js` that imports and renders it.

| Q# | Title | Core Concepts |
|----|-------|---------------|
| **Q1** | Personalized Welcome Message | Functional components, Props, JSX, inline styling |
| **Q2** | Basic Calculator | `useState`, controlled components, event handling (`onClick`, `onChange`), type conversion (`Number()`) |
| **Q3** | Interactive Image Gallery | `useState`, `array.map()`, `key` prop, `onClick`, CSS Flexbox, hover transitions, dynamic image sources |
| **Q4** | Grade Calculator | Multiple `useState` hooks, conditional rendering (`if-else`), arithmetic operations, comparison operators |
| **Q5** | Dynamic To-Do List | `useState` (string + array), spread operator for immutable array updates, `map()` for list rendering, state-triggered re-renders |

---

## How to Run

### Q1–Q5 (Single Components in CRA)

1. Import the desired question component in `App.js`:
   ```js
   import WEB_LA4_Q1 from './WEB_LA4_Q1';
   ```
2. Render it:
   ```jsx
   function App() {
     return <div className="App"><WEB_LA4_Q1 name="MAYUR R KENI" city="Vellore" /></div>;
   }
   ```
3. Run the dev server:
   ```bash
   npm start
   ```

### Q6 — Weather Dashboard (CRA + Vanilla JS boot)

1. In `App.js`, import the boot function:
   ```js
   import { boot } from './WEB_LA4_Q6/main.js';
   ```
2. Run the dev server:
   ```bash
   npm start
   ```

### Q7 — Book Explorer (Vite)

Navigate into the Q7 folder and run:
```bash
cd WEB_LA4_Q7
npm install
npm run dev
```
The app opens at `http://localhost:3000`.

Alternatively, via the main React `App.js`:
```js
import { init } from './WEB_LA4_Q7/src/main.js';
```

### Q8 — Country Explorer (React + JSX)

In the root `App.js`, import the Q8 App component:
```js
import Q8App from './WEB_LA4_Q8/App.jsx';
```

Or navigate into the Q8 folder if it has its own `main.jsx` entry:
```bash
npm install
npm run dev
```

---

## Tech Stack

| Technology | Usage |
|---|---|
| React 18 | Core UI framework |
| JavaScript (ES6+) | Logic, async/await, arrow functions |
| JSX | Component templating (Q8) |
| Vite | Build tool for Q7 |
| CSS3 | Custom properties, Grid, Flexbox, animations |
| Open-Meteo API | Weather data (Q6) |
| Open Library API | Book data (Q7) |
| REST Countries API | Country data (Q8) |
| `localStorage` | Session persistence (Q6, Q7) |

---

## References

- [React Documentation](https://react.dev/)
- [Open-Meteo API](https://open-meteo.com/)
- [Open Library API](https://openlibrary.org/developers/api)
- [REST Countries API](https://restcountries.com/)
- [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

*VIT Vellore | BCSE203E Web Programming Lab | © 2025 MAYUR R KENI (24BCE0686)*

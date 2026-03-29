/**
 * main.js — Application entry point (Corrected for React Integration)
 * Architecture: Vanilla JS, managed by React's Lifecycle.
 */

import { renderHeader } from './components/header.js';
import { renderSearch, showSearchError, setSearchLoading } from './components/search.js';
import { renderDashboard, renderEmptyState } from './components/dashboard.js';
import { geocodeCity, fetchWeather } from './utils/weather.js';
import './styles/main.css';

// ── Application State ──────────────────────────
const appState = {
  unit: localStorage.getItem('weather_unit') || 'celsius',
  location: null,
  weather: null,
  loading: false,
};

// ── Shared Elements (initialized inside boot) ──
let headerEl, searchEl, mainEl;
let cleanupHeader = null;

// ── Render Header ──────────────────────────────
function mountHeader() {
  if (cleanupHeader) cleanupHeader();
  cleanupHeader = renderHeader(headerEl, {
    unit: appState.unit,
    onUnitChange: async (newUnit) => {
      appState.unit = newUnit;
      localStorage.setItem('weather_unit', newUnit);
      mountHeader(); 

      if (appState.location) {
        await loadWeather(appState.location.name);
      }
    }
  });
}

// ── Render Search ──────────────────────────────
function mountSearch() {
  renderSearch(searchEl, { onSearch: loadWeather });
}

// ── Core: load weather for a city ─────────────
async function loadWeather(cityQuery) {
  appState.loading = true;
  setSearchLoading(true);

  try {
    // 1. Geocode
    const location = await geocodeCity(cityQuery);
    appState.location = location;

    // 2. Fetch weather
    const weather = await fetchWeather(
      location.lat,
      location.lon,
      location.timezone,
      appState.unit
    );
    appState.weather = weather;

    // 3. Render dashboard
    renderDashboard(mainEl, {
      location,
      weather,
      unit: appState.unit
    });

    // Save last city
    localStorage.setItem('weather_last_city', cityQuery);

  } catch (err) {
    console.error(err);
    showSearchError(err.message || 'Something went wrong. Please try again.');
    renderEmptyState(mainEl);
  } finally {
    appState.loading = false;
    setSearchLoading(false);
  }
}

// ── Boot (Exported for App.js) ─────────────────
/**
 * This function is called by React's useEffect after 
 * the 'app' div exists in the DOM.
 */
export function boot() {
  const root = document.getElementById('app');
  
  // Safety check: stop if the target div isn't ready
  if (!root) {
    console.error("Target #app container not found in DOM.");
    return;
  }

  // Clear root in case of multiple boots (Strict Mode)
  root.innerHTML = '';

  // Initialize and append DOM regions inside the boot sequence
  headerEl = document.createElement('div');
  searchEl = document.createElement('div');
  mainEl = document.createElement('div');
  mainEl.style.flex = '1';

  root.append(headerEl, searchEl, mainEl);

  // Initialize UI
  mountHeader();
  mountSearch();
  renderEmptyState(mainEl);

  // Restore session
  const lastCity = localStorage.getItem('weather_last_city');
  if (lastCity) {
    loadWeather(lastCity);
  }
}
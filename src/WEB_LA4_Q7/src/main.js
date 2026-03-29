import { renderHeader } from './components/header.js';
import { renderDashboard } from './components/dashboard.js';
import { openBookModal } from './components/modal.js';
import { searchBooks } from './utils/openlib.js';

// ── STATE ──────────────────────────────────────────────────────────────────
const state = {
  query: '',
  results: { books: [], total: 0, page: 1 },
  view: loadPref('folio-view', 'grid'),
  activeFilter: 'All',
  favorites: loadPref('folio-favs', []),
  loading: false,
};

let $header, $dashboard;

// ── INIT / BOOT ────────────────────────────────────────────────────────────
export function init() {
  const root = document.getElementById('app');
  if (!root) return;

  // Set up the high-level DOM structure
  root.innerHTML = `
    <div id="header"></div>
    
    <div id="welcome" class="welcome">
       <div class="welcome-icon">📚</div>
       <h1 class="welcome-title">Folio</h1>
       <p class="welcome-sub">Search for any book, author, or subject to begin exploring.</p>
       <div class="welcome-suggestions">
          <span class="suggestion-label">Try:</span> 
          <button class="suggestion-btn" data-query="Dune">Dune</button>
          <button class="suggestion-btn" data-query="Tolkien">Tolkien</button>
          <button class="suggestion-btn" data-query="Sci-Fi">Sci-Fi</button>
          <button class="suggestion-btn" data-query="Philosophy">Philosophy</button>
       </div>
    </div>

    <div id="loading" class="loading hidden">
      <div class="spinner"></div>
      <p>Consulting the archives...</p>
    </div>

    <div id="error-msg" class="error-msg hidden"></div>
    <div id="dashboard" class="screen hidden"></div>

    <div id="modal-backdrop" class="modal-backdrop hidden">
      <div id="modal-panel" class="modal-panel"></div>
    </div>
  `;

  $header = document.getElementById('header');
  $dashboard = document.getElementById('dashboard');

  // Initial Component Renders
  renderHeader($header, {
    onSearch: handleSearch,
    onViewChange: handleViewChange,
    currentView: state.view,
  });

  // Attach suggestion button listeners
  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => handleSearch(btn.dataset.query));
  });

  // Boot sequence: restore session or show welcome screen
  const lastQuery = loadPref('folio-last-query', null);
  if (lastQuery) {
    handleSearch(lastQuery);
  } else {
    showScreen('welcome');
  }
}

// ── HANDLERS ──────────────────────────────────────────────────────────────
async function handleSearch(query) {
  if (!query) { showScreen('welcome'); return; }

  state.query = query;
  state.activeFilter = 'All';
  state.results = { books: [], total: 0, page: 1 };

  savePref('folio-last-query', query);
  showScreen('loading');

  try {
    const data = await searchBooks(query, 1, 20);
    state.results = { books: data.books, total: data.total, page: 1 };
    showScreen('dashboard');
    paint();
  } catch (err) {
    showError('Could not reach Open Library. Check your connection.');
  }
}

async function handleLoadMore() {
  const nextPage = state.results.page + 1;
  try {
    const data = await searchBooks(state.query, nextPage, 20);
    // Append new books to existing results (State Immutability)
    state.results.books = [...state.results.books, ...data.books];
    state.results.page = nextPage;
    paint();
  } catch {
    showError('Failed to load more results.');
  }
}

function handleViewChange(view) {
  state.view = view;
  savePref('folio-view', view);
  paint();
}

function handleSubjectFilter(subject) {
  state.activeFilter = subject;
  paint();
}

function handleBookClick(book) {
  openBookModal(book, {
    isFav: state.favorites.some(f => f.key === book.key),
    onToggleFav: toggleFav,
  });
}

// ── FAVORITES (Shelf Management) ──────────────────────────────────────────
function toggleFav(book) {
  const isCurrentlyFav = state.favorites.some(f => f.key === book.key);
  
  if (isCurrentlyFav) {
    state.favorites = state.favorites.filter(f => f.key !== book.key);
  } else {
    state.favorites = [book, ...state.favorites];
  }
  
  savePref('folio-favs', state.favorites);
  paint(); // Sync the Dashboard Shelf view
  return !isCurrentlyFav;
}

// ── RENDER ENGINE ─────────────────────────────────────────────────────────
function paint() {
  const filtered = filterBooks(state.results.books, state.activeFilter);

  renderDashboard($dashboard, {
    results: { books: filtered, total: state.results.total, page: state.results.page },
    query: state.query,
    view: state.view,
    favorites: state.favorites,
    activeFilter: state.activeFilter,
    onBookClick: handleBookClick,
    onSubjectFilter: handleSubjectFilter,
    onLoadMore: handleLoadMore,
  });
}

function filterBooks(books, filter) {
  if (filter === 'All') return books;
  const f = filter.toLowerCase();
  return books.filter(b => 
    b.subjects.some(s => s.toLowerCase().includes(f))
  );
}

// ── UI HELPERS ────────────────────────────────────────────────────────────
function showScreen(screen) {
  const screens = ['welcome', 'loading', 'error-msg', 'dashboard'];
  screens.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.add('hidden');
  });

  const target = screen === 'error' ? 'error-msg' : screen;
  const targetEl = document.getElementById(target);
  if (targetEl) targetEl.classList.remove('hidden');
}

function showError(msg) {
  const $error = document.getElementById('error-msg');
  if ($error) {
    $error.textContent = `⚠️ ${msg}`;
    showScreen('error');
  }
}

// ── STORAGE PERSISTENCE ───────────────────────────────────────────────────
function loadPref(key, fallback) {
  try { 
    const v = localStorage.getItem(key); 
    return v !== null ? JSON.parse(v) : fallback; 
  } catch { 
    return fallback; 
  }
}

function savePref(key, val) {
  try { 
    localStorage.setItem(key, JSON.stringify(val)); 
  } catch {}
}
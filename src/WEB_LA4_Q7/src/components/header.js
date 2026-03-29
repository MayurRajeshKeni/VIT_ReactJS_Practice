/**
 * header.js — Handles branding, debounced search, and view toggling
 */
import { autocomplete, debounce } from '../utils/openlib.js';

export function renderHeader(container, { onSearch, onViewChange, currentView }) {
  if (!container) return;

  container.innerHTML = `
    <button class="logo" id="logo-btn" style="display: flex; align-items: center; gap: 10px;">
      <span class="logo-icon">📚</span>
      <span style="font-family: var(--font-display); font-size: 1.5rem;">Folio</span>
    </button>

    <div class="search-wrapper" style="position: relative; flex: 1; max-width: 500px;">
      <input type="text" id="search-input" placeholder="Search books, authors, subjects…" autocomplete="off"/>
      <button class="search-btn" id="search-btn" title="Search">🔍</button>
      <div id="autocomplete-list" class="autocomplete-list hidden"></div>
    </div>

    <div class="view-toggle">
      <button class="view-btn ${currentView === 'grid' ? 'active' : ''}" id="btn-grid" title="Grid view">⊞</button>
      <button class="view-btn ${currentView === 'list' ? 'active' : ''}" id="btn-list" title="List view">☰</button>
    </div>
  `;

  // --- Element Selections ---
  const input = container.querySelector('#search-input');
  const searchBtn = container.querySelector('#search-btn');
  const autoList = container.querySelector('#autocomplete-list');
  const logoBtn = container.querySelector('#logo-btn');
  const btnGrid = container.querySelector('#btn-grid');
  const btnList = container.querySelector('#btn-list');

  // --- Search Logic ---
  const doSearch = () => {
    const q = input.value.trim();
    if (!q) return;
    autoList.classList.add('hidden');
    onSearch(q);
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
    if (e.key === 'Escape') autoList.classList.add('hidden');
  });

  searchBtn.addEventListener('click', doSearch);

  logoBtn.addEventListener('click', () => {
    input.value = '';
    autoList.classList.add('hidden');
    onSearch(null); // Triggers the "Welcome" screen in main.js
  });

  // --- Autocomplete Logic (Debounced) ---
  const suggest = debounce(async (q) => {
    if (q.length < 2) {
      autoList.classList.add('hidden');
      return;
    }
    try {
      const results = await autocomplete(q);
      renderAutocompleteList(autoList, results, (book) => {
        input.value = book.title;
        autoList.classList.add('hidden');
        onSearch(book.title);
      });
    } catch (err) {
      autoList.classList.add('hidden');
    }
  }, 300);

  input.addEventListener('input', e => suggest(e.target.value.trim()));

  // Close suggestions when clicking outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrapper')) autoList.classList.add('hidden');
  });

  // --- View Toggle Logic ---
  btnGrid.onclick = () => {
    onViewChange('grid');
  };
  btnList.onclick = () => {
    onViewChange('list');
  };
}

/** Helper to render the dropdown suggestion items */
function renderAutocompleteList(container, books, onSelect) {
  container.innerHTML = '';
  if (!books || !books.length) {
    container.classList.add('hidden');
    return;
  }

  books.forEach(b => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    // Using author_name to match the normalized object from openlib.js
    const author = (b.author_name && b.author_name[0]) || 'Unknown Author';
    
    item.innerHTML = `
      <div style="display: flex; flex-direction: column;">
        <span class="autocomplete-title" style="font-weight: 500;">${b.title}</span>
        <span class="autocomplete-author" style="font-size: 0.75rem; color: var(--muted);">${author}</span>
      </div>
    `;
    
    item.addEventListener('click', () => onSelect(b));
    container.appendChild(item);
  });
  
  container.classList.remove('hidden');
}
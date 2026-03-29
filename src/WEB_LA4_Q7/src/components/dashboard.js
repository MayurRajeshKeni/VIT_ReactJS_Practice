/**
 * dashboard.js — Orchestrates the result grid, stats, and personalized shelf
 */
import { coverUrl } from '../utils/openlib.js';

const FILTER_SUBJECTS = ['All', 'Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography', 'History', 'Science', 'Philosophy', 'Romance', 'Horror', 'Poetry'];

export function renderDashboard(container, { results, query, view, favorites, onBookClick, onSubjectFilter, onLoadMore, activeFilter }) {
  if (!container) return;
  const { books, total, page } = results;

  // Logic to determine if we should show the "Load More" button
  const hasMore = books.length < total;

  container.innerHTML = `
    <div class="results-header">
      <h2 class="results-title">Results for <em>${escHtml(query)}</em></h2>
      <span class="results-count">${total.toLocaleString()} books discovered</span>
    </div>

    <div class="stats-row" id="stats-row"></div>

    <div class="filter-bar" id="filter-bar"></div>

    <div id="books-container"></div>

    <div class="load-more-wrap" id="load-more-wrap" style="display:${hasMore ? 'flex' : 'none'}">
      <button class="load-more-btn" id="load-more-btn">Explore More Results</button>
    </div>

    <div class="panel" id="subjects-panel" style="display:none; margin-top:30px;"></div>

    <div class="panel" id="shelf-panel" style="margin-top:20px;"></div>
  `;

  // --- Sub-Component Rendering ---
  renderStats(container.querySelector('#stats-row'), books, total);
  renderFilterBar(container.querySelector('#filter-bar'), activeFilter, onSubjectFilter);
  renderBooks(container.querySelector('#books-container'), books, view, onBookClick);

  // Auto-generate subjects from the results for the panel
  const bookWithSubjects = books.find(b => b.subjects && b.subjects.length > 3);
  if (bookWithSubjects) {
    renderSubjectsPanel(container.querySelector('#subjects-panel'), bookWithSubjects.subjects, onSubjectFilter);
    container.querySelector('#subjects-panel').style.display = 'block';
  }

  renderShelf(container.querySelector('#shelf-panel'), favorites, onBookClick);

  // --- Event Handling ---
  const loadBtn = container.querySelector('#load-more-btn');
  if (loadBtn) {
    loadBtn.onclick = () => {
      loadBtn.disabled = true;
      loadBtn.innerHTML = `<span class="spinner" style="width:14px; height:14px;"></span> Loading...`;
      onLoadMore();
    };
  }
}

/** Renders the Grid or List view based on user preference */
export function renderBooks(container, books, view, onBookClick) {
  if (!books.length) {
    container.innerHTML = `<div class="error-msg">No titles match your current filter.</div>`;
    return;
  }
  
  const wrapper = document.createElement('div');
  wrapper.className = view === 'list' ? 'book-list' : 'book-grid';

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = view === 'list' ? 'book-list-item' : 'book-card';
    
    // Safety check for author name (from normalizeBook in openlib.js)
    const author = (book.author_name && book.author_name[0]) || 'Unknown Author';

    if (view === 'list') {
      card.innerHTML = `
        <img class="book-list-thumb" src="${book.cover}" alt="">
        <div class="book-list-body">
          <div class="book-list-title">${escHtml(book.title)}</div>
          <div class="book-list-author">${escHtml(author)}</div>
          <div class="book-list-meta">📅 ${book.year} · ⭐ ${book.rating || '—'}</div>
        </div>
        <span class="book-list-arrow">›</span>
      `;
    } else {
      card.innerHTML = `
        <img class="book-cover" src="${book.cover}" alt="${escHtml(book.title)}" loading="lazy">
        <div class="book-info">
          <div class="book-title">${escHtml(book.title)}</div>
          <div class="book-author">${escHtml(author)}</div>
          <div class="book-year">${book.year} ${book.rating ? '· ★ ' + book.rating : ''}</div>
        </div>
      `;
    }
    
    card.onclick = () => onBookClick(book);
    wrapper.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(wrapper);
}

/** Renders the calculated analytics row */
function renderStats(container, books, total) {
  const withRating = books.filter(b => b.rating);
  const avgRating = withRating.length 
    ? (withRating.reduce((s, b) => s + b.rating, 0) / withRating.length).toFixed(1) 
    : '—';
  
  container.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Total Found</div>
      <div class="stat-value">${total.toLocaleString()}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Avg Rating</div>
      <div class="stat-value">${avgRating}</div>
      ${avgRating !== '—' ? `<div class="stat-bar"><div class="stat-bar-fill" style="width:${(avgRating/5)*100}%"></div></div>` : ''}
    </div>
    <div class="stat-card">
      <div class="stat-label">Local Results</div>
      <div class="stat-value">${books.length}</div>
    </div>
  `;
}

/** Renders the personalized 'My Shelf' persistence area */
export function renderShelf(container, favorites, onBookClick) {
  container.innerHTML = `<h3 class="panel-title">📌 Your Shelf</h3>`;
  if (!favorites.length) {
    container.innerHTML += `<p class="shelf-empty">Your shelf is empty. Save books to see them here.</p>`;
    return;
  }
  
  const scroll = document.createElement('div');
  scroll.className = 'shelf-scroll';
  
  favorites.forEach(book => {
    const item = document.createElement('div');
    item.className = 'shelf-item';
    item.innerHTML = `
      <img class="shelf-cover" src="${book.cover}" alt="">
      <div class="shelf-title">${escHtml(book.title)}</div>
    `;
    item.onclick = () => onBookClick(book);
    scroll.appendChild(item);
  });
  
  container.appendChild(scroll);
}

// Internal Helpers
function renderFilterBar(container, active, onFilter) {
  container.innerHTML = FILTER_SUBJECTS.map(s => `
    <button class="filter-pill ${active === s ? 'active' : ''}" data-subject="${s}">${s}</button>
  `).join('');
  container.querySelectorAll('.filter-pill').forEach(btn => {
    btn.onclick = () => onFilter(btn.dataset.subject);
  });
}

function renderSubjectsPanel(container, subjects, onFilter) {
  container.innerHTML = `
    <h3 class="panel-title">Explore Related</h3>
    <div class="subjects-scroll">
      ${subjects.map(s => `<button class="subject-chip">${escHtml(s)}</button>`).join('')}
    </div>
  `;
  container.querySelectorAll('.subject-chip').forEach(btn => {
    btn.onclick = () => onFilter(btn.textContent);
  });
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
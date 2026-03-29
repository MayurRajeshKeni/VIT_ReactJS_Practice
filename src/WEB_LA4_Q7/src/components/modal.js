/**
 * modal.js — Book Detail Modal
 * Includes Safety Checks for DOM Elements
 */
import { fetchBookDetails, fetchAuthor, starsHtml } from '../utils/openlib.js';

export async function openBookModal(book, { isFav, onToggleFav }) {
  const backdrop = document.getElementById('modal-backdrop');
  const panel = document.getElementById('modal-panel');

  if (!backdrop || !panel) return;

  // 1. Loading State
  panel.innerHTML = `
    <button class="modal-close" id="modal-close-loading">✕</button>
    <div style="padding:80px 0; text-align:center; color:var(--muted)">
      <div class="spinner" style="margin: 0 auto 20px;"></div>
      <p>Retrieving library records...</p>
    </div>
  `;
  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const close = () => {
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.getElementById('modal-close-loading').onclick = close;
  backdrop.onclick = (e) => { if (e.target === backdrop) close(); };

  // 2. Data Fetch
  let details = null;
  let authorName = (book.author_name && book.author_name[0]) || 'Unknown Author';
  try {
    details = await fetchBookDetails(book.key);
    if (details.authors?.length) {
      const authorData = await fetchAuthor(details.authors[0].author.key);
      if (authorData?.name) authorName = authorData.name;
    }
  } catch (err) { console.warn("Details Fetch Failed"); }

  // 3. Render Content
  panel.innerHTML = `
    <button class="modal-close" id="modal-close-final">✕</button>
    <div class="modal-hero">
      <div class="modal-cover-wrap"><img class="modal-cover" src="${book.cover}" alt=""></div>
      <div class="modal-meta">
        <h2 class="modal-title">${book.title}</h2>
        <p class="modal-author">by ${authorName}</p>
        <div class="modal-stars">${starsHtml(book.rating)} <span class="modal-rating-txt">${book.rating || ''}</span></div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-stats">
        <div class="modal-stat-box"><span class="mstat-label">Year</span><span class="mstat-value">${book.year}</span></div>
        <div class="modal-stat-box"><span class="mstat-label">Pages</span><span class="mstat-value">${book.pages || '—'}</span></div>
        <div class="modal-stat-box"><span class="mstat-label">Editions</span><span class="mstat-value">${book.editions}</span></div>
      </div>
      <div class="modal-section">
        <span class="modal-section-label">Summary</span>
        <p class="modal-description">${details?.description?.value || details?.description || 'No summary available.'}</p>
      </div>
      <button class="modal-fav-btn ${isFav ? 'active' : ''}" id="fav-toggle-btn">
        <span>${isFav ? '♥' : '♡'}</span> ${isFav ? 'Remove from Shelf' : 'Save to My Shelf'}
      </button>
    </div>
  `;

  // 4. ATTACH EVENTS (Safety Checked)
  const closeBtn = document.getElementById('modal-close-final');
  if (closeBtn) closeBtn.onclick = close;

  const favBtn = document.getElementById('fav-toggle-btn');
  if (favBtn) {
    favBtn.onclick = () => {
      const nowFav = onToggleFav(book);
      favBtn.classList.toggle('active', nowFav);
      favBtn.innerHTML = `<span>${nowFav ? '♥' : '♡'}</span> ${nowFav ? 'Remove from Shelf' : 'Save to My Shelf'}`;
    };
  }
}
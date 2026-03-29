import React, { useState, useEffect } from 'react';
import { REGIONS } from '../utils/api';

/**
 * SearchBar Component
 * Orchestrates search input, region filtering, and sorting logic.
 */
const styles = {
  wrap: {
    padding: '24px 40px',
    display: 'flex', 
    gap: '12px', 
    flexWrap: 'wrap', 
    alignItems: 'center',
    background: 'linear-gradient(to bottom, var(--surface), transparent)',
  },
  searchWrap: {
    flex: 1, 
    minWidth: '280px',
    display: 'flex', 
    alignItems: 'center',
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    padding: '0 12px',
    transition: 'border-color 0.3s ease',
  },
  icon: { color: 'var(--muted)', fontSize: '0.9rem', marginRight: '8px' },
  input: {
    flex: 1, 
    padding: '12px 0',
    background: 'transparent', 
    border: 'none', 
    outline: 'none',
    color: 'var(--text)', 
    fontFamily: 'var(--font-body)', 
    fontSize: '0.95rem',
  },
  select: {
    padding: '11px 16px',
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    cursor: 'pointer',
    outline: 'none',
  },
  sortBtn: (active) => ({
    padding: '11px 16px',
    background: active ? 'var(--accent)' : 'var(--surface2)',
    border: '1px solid ' + (active ? 'var(--accent)' : 'var(--border)'),
    borderRadius: '8px',
    color: active ? '#0e0f0c' : 'var(--muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
  })
};

export default function SearchBar({ onSearch, onRegion, onSort, region, sort }) {
  const [val, setVal] = useState('');

  // DEBOUNCE LOGIC: Prevents API spamming while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(val.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [val, onSearch]);

  return (
    <div style={styles.wrap}>
      {/* Search Input Area */}
      <div style={styles.searchWrap}>
        <span style={styles.icon}>🔍</span>
        <input
          style={styles.input}
          placeholder="Search by country name..."
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>

      {/* Region Filter Dropdown */}
      <select
        style={styles.select}
        value={region}
        onChange={e => onRegion(e.target.value)}
      >
        <option value="All">All Regions</option>
        {REGIONS && REGIONS.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      {/* Sorting Controls */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          style={styles.sortBtn(sort === 'name')} 
          onClick={() => onSort('name')}
          title="Sort Alphabetically"
        >
          A–Z
        </button>
        <button 
          style={styles.sortBtn(sort === 'population')} 
          onClick={() => onSort('population')}
          title="Sort by Population"
        >
          Pop.
        </button>
      </div>
    </div>
  );
}
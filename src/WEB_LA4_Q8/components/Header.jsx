import React from 'react';

/**
 * Header Component
 * Provides a sticky, translucent navigation bar with dynamic result count.
 * Theme: Atlas Country Explorer
 */
const styles = {
  header: {
    position: 'sticky', 
    top: 0, 
    zIndex: 100,
    background: 'rgba(14, 15, 12, 0.92)', // Dark, editorial background
    backdropFilter: 'blur(12px)', // Modern glass effect
    WebkitBackdropFilter: 'blur(12px)', // Safari support
    borderBottom: '1px solid var(--border)',
    padding: '0 40px',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    height: '72px', // Slightly taller for better spacing
    transition: 'background 0.3s ease',
  },
  logoContainer: {
    display: 'flex', 
    alignItems: 'center', 
    gap: '14px',
    cursor: 'pointer',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    color: 'var(--text)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  icon: { 
    color: 'var(--accent)', 
    fontSize: '1.8rem', 
    lineHeight: 1,
    filter: 'drop-shadow(0 0 8px rgba(200, 169, 110, 0.4))' // Subtle glow
  },
  sub: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--muted)',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginTop: '4px',
  },
  badge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--accent)',
    background: 'rgba(200, 169, 110, 0.1)', // Subtle tint
    border: '1px solid rgba(200, 169, 110, 0.3)',
    borderRadius: '6px',
    padding: '6px 14px',
    letterSpacing: '0.05em',
    fontWeight: '600',
    animation: 'fadeIn 0.5s ease',
  }
};

export default function Header({ count }) {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <span style={styles.icon}>◎</span>
        <div>
          <div style={styles.logoText}>Atlas</div>
          <div style={styles.sub}>Country Explorer</div>
        </div>
      </div>

      {count > 0 && (
        <div style={styles.badge}>
          {count.toLocaleString()} {count === 1 ? 'result' : 'results'}
        </div>
      )}
    </header>
  );
}
import React, { useState } from 'react';
import { formatPopulation } from '../utils/api';

/**
 * CountryCard Component
 * Displays individual country highlights with a hover animation.
 * Optimized for MAYUR R KENI (24BCE0686)
 */
export default function CountryCard({ country, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Data Fallbacks (Handling various API response shapes)
  const name = country.name?.common ?? country.name ?? '—';
  const flag = country.flag ?? country.flags?.svg ?? country.flags?.png ?? '';
  const capital = country.capital?.[0] ?? country.capital ?? '—';
  const population = formatPopulation ? formatPopulation(country.population) : country.population;
  const region = country.region ?? '—';
  const id = country.cca3 ?? country.id;

  // --- Dynamic Inline Styles ---
  const cardStyle = {
    background: hovered ? 'var(--surface2)' : 'var(--surface)',
    border: '1px solid ' + (hovered ? 'rgba(200,169,110,0.3)' : 'var(--border)'),
    borderRadius: '12px', // Matches your --radius-lg
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: hovered ? 'translateY(-4px)' : 'none',
    boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.5)' : 'none',
    display: 'flex',
    flexDirection: 'column'
  };

  const flagStyle = {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    display: 'block',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg)',
  };

  const bodyStyle = { padding: '18px 20px' };

  const countryNameStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    color: 'var(--text)',
    marginBottom: '12px',
    lineHeight: 1.2,
    fontWeight: '600'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '0.8rem',
  };

  const labelStyle = { 
    color: 'var(--muted)', 
    textTransform: 'uppercase', 
    letterSpacing: '0.05em',
    fontSize: '0.7rem'
  };

  const valueStyle = { 
    color: 'var(--accent)', 
    fontWeight: '700' 
  };

  return (
    <div
      style={cardStyle}
      onClick={() => onClick(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {flag && (
        <img 
          src={flag} 
          alt={`Flag of ${name}`} 
          style={flagStyle} 
          loading="lazy" 
        />
      )}
      
      <div style={bodyStyle}>
        <div style={countryNameStyle}>{name}</div>
        
        <div style={rowStyle}>
          <span style={labelStyle}>Capital</span>
          <span style={valueStyle}>{capital}</span>
        </div>
        
        <div style={rowStyle}>
          <span style={labelStyle}>Population</span>
          <span style={valueStyle}>{population}</span>
        </div>

        <div style={{
          display: 'inline-block',
          marginTop: '12px',
          padding: '4px 12px',
          background: 'rgba(126,184,154,0.1)',
          borderRadius: '20px',
          fontSize: '0.65rem',
          color: 'var(--accent2)',
          textTransform: 'uppercase',
          fontWeight: 'bold'
        }}>
          {region}
        </div>
      </div>
    </div>
  );
}
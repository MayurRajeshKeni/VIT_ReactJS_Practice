import React, { useEffect, useState } from 'react';
import { 
  fetchCountryByCode, 
  fetchCountriesByCodes, 
  formatPopulation, 
  formatArea, 
  getCurrencies, 
  getLanguages, 
  getTimezones 
} from '../utils/api';

/**
 * CountryDetail Component
 * An immersive modal displaying deep-dive statistics of a specific country.
 */
export default function CountryDetail({ code, onClose, onNavigate }) {
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevents state updates on unmounted component
    setLoading(true); 
    setError(null); 
    setCountry(null); 
    setBorders([]);

    fetchCountryByCode(code)
      .then(async (c) => {
        if (!isMounted) return;
        setCountry(c);
        
        // Fetch neighbor countries if they exist
        if (c.borders?.length) {
          try {
            const neighborData = await fetchCountriesByCodes(c.borders);
            if (isMounted) setBorders(neighborData);
          } catch (e) {
            console.warn("Neighbor fetch failed", e);
          }
        }
        setLoading(false);
      })
      .catch(e => { 
        if (isMounted) {
          setError(e.message || "Failed to load country details.");
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [code]);

  // --- Styles ---
  const overlay = {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px',
  };

  const modal = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    width: '100%', maxWidth: '800px',
    maxHeight: '85vh',
    overflowY: 'auto',
    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
    position: 'relative',
  };

  const stickyHeader = {
    position: 'sticky', top: 0,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 24px',
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    zIndex: 20,
  };

  const sectionLabel = {
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--muted)',
    marginBottom: '6px',
    fontWeight: '700'
  };

  if (loading) return (
    <div style={overlay}>
      <div className="spinner"></div>
    </div>
  );

  if (error) return (
    <div style={overlay} onClick={onClose}>
      <div style={{ color: 'var(--red)', background: 'var(--surface)', padding: '20px', borderRadius: '8px' }}>
        {error}
      </div>
    </div>
  );

  if (!country) return null;

  // Data Extraction
  const name = country.name?.common || "Unknown";
  const flag = country.flags?.svg || country.flags?.png;

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        
        <div style={stickyHeader}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text)' }}>
            {name}
          </span>
          <button 
            style={{ 
              background: 'var(--surface2)', 
              border: '1px solid var(--border)', 
              color: 'var(--text)',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer'
            }} 
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          <img 
            src={flag} 
            alt={name} 
            style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', marginBottom: '24px' }} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
            <div>
              <div style={sectionLabel}>Capital</div>
              <div>{country.capital?.join(', ') || '—'}</div>
            </div>
            <div>
              <div style={sectionLabel}>Region</div>
              <div>{country.region} ({country.subregion})</div>
            </div>
            <div>
              <div style={sectionLabel}>Population</div>
              <div>{formatPopulation(country.population)}</div>
            </div>
            <div>
              <div style={sectionLabel}>Area</div>
              <div>{formatArea(country.area)}</div>
            </div>
            <div>
              <div style={sectionLabel}>Languages</div>
              <div>{getLanguages(country)}</div>
            </div>
            <div>
              <div style={sectionLabel}>Currencies</div>
              <div>{getCurrencies(country)}</div>
            </div>
          </div>

          {/* Border Countries Logic */}
          {borders.length > 0 && (
            <div style={{ marginTop: '30px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={sectionLabel}>Bordering Nations</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {borders.map(b => (
                  <button 
                    key={b.cca3} 
                    onClick={() => onNavigate(b.cca3)}
                    style={{ 
                      padding: '8px 16px', 
                      background: 'var(--surface2)', 
                      border: '1px solid var(--border)', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: 'var(--accent)'
                    }}
                  >
                    {b.name?.common}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
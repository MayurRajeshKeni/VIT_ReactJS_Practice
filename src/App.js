import React, { useEffect, useState, useMemo } from 'react';
// CHANGE THESE:
import Header from './WEB_LA4_Q8/components/Header';
import SearchBar from './WEB_LA4_Q8/components/SearchBar';
import CountryCard from './WEB_LA4_Q8/components/CountryCard';
import CountryDetail from './WEB_LA4_Q8/components/CountryDetail';
import { fetchAllCountries } from './WEB_LA4_Q8/utils/api';
import './WEB_LA4_Q8/index.css';

/**
 * App.jsx — The State Orchestrator
 * Requirement: Interactive interface for searching and viewing country details.
 */
export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [sort, setSort] = useState('name');
  
  // State for Modal Detail View
  const [selectedCode, setSelectedCode] = useState(null);

  // 1. Initial Lifecycle: Fetch full dataset on mount
  useEffect(() => {
    fetchAllCountries()
      .then(data => { 
        setAllCountries(data); 
        setLoading(false); 
      })
      .catch(e => { 
        setError(e.message); 
        setLoading(false); 
      });
  }, []);

  // 2. Performance Logic: useMemo to handle Filter & Sort
  const displayedCountries = useMemo(() => {
    let list = [...allCountries];

    // Filter by Region dropdown
    if (region !== 'All') {
      list = list.filter(c => c.region === region);
    }

    // Filter by Search Input (matches Name or Capital)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.name?.common?.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q)
      );
    }

    // Apply Sorting (Alphabetical vs Population)
    list.sort((a, b) => {
      if (sort === 'population') {
        return (b.population ?? 0) - (a.population ?? 0);
      }
      return (a.name?.common ?? '').localeCompare(b.name?.common ?? '');
    });

    return list;
  }, [allCountries, region, searchQuery, sort]);

  return (
    <div className="atlas-container">
      {/* Requirement: Header component */}
      <Header count={displayedCountries.length} />

      {/* Requirement: Search component */}
      <SearchBar
        onSearch={setSearchQuery}
        onRegion={setRegion}
        onSort={setSort}
        region={region}
        sort={sort}
      />

      {loading && (
        <div className="loader-wrap">
          <div className="spinner"></div>
          <p>Mapping the Atlas...</p>
        </div>
      )}

      {error && <div className="error-msg">⚠ Error: {error}</div>}

      {!loading && !error && (
        <main>
          {/* Requirement: CountryList (implemented as grid) */}
          <div className="country-grid">
            {displayedCountries.length === 0 ? (
              <div className="empty-state">No matching territories found.</div>
            ) : (
              displayedCountries.map((country) => (
                <CountryCard 
                  key={country.cca3} 
                  country={country} 
                  onClick={setSelectedCode} 
                />
              ))
            )}
          </div>
        </main>
      )}

      {/* Requirement: Detail view (Modal) */}
      {selectedCode && (
        <CountryDetail
          code={selectedCode}
          onClose={() => setSelectedCode(null)}
          onNavigate={setSelectedCode}
        />
      )}

      <footer className="app-footer">
        © 2026 | BCSE203E Lab | <strong>MAYUR R KENI (24BCE0686)</strong>
      </footer>
    </div>
  );
}
import React, { useEffect, useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CountryCard from './components/CountryCard';
import CountryDetail from './components/CountryDetail';
import { fetchAllCountries } from './utils/api';
import './index.css';

// Simple Spinner Component for the loading state
const Spinner = () => (
  <div className="loader-wrap">
    <div className="spinner"></div>
    <p>Loading Atlas...</p>
  </div>
);

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Control States linked to SearchBar.jsx
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('All');
  const [sort, setSort] = useState('name'); // 'name' or 'population'
  
  // Modal State linked to CountryCard.jsx
  const [selectedCode, setSelectedCode] = useState(null);

  // Initial Data Fetch
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

  /**
   * PERFORMANCE HACK: useMemo
   * This ensures we only re-filter/sort the 250 countries when 
   * one of the control states actually changes.
   */
  const displayedCountries = useMemo(() => {
    let list = [...allCountries];

    // 1. Filter by Region
    if (region !== 'All') {
      list = list.filter(c => c.region === region);
    }

    // 2. Filter by Search Query (Name or Capital)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.name?.common?.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q)
      );
    }

    // 3. Sort Logic
    list.sort((a, b) => {
      if (sort === 'population') {
        return (b.population ?? 0) - (a.population ?? 0); // Descending
      }
      // Default: Alphabetical (Natural Language Sort)
      return (a.name?.common ?? '').localeCompare(b.name?.common ?? '');
    });

    return list;
  }, [allCountries, region, searchQuery, sort]);

  return (
    <div className="atlas-app">
      {/* Header receives the dynamic count for the badge */}
      <Header count={displayedCountries.length} />

      {/* SearchBar controls the state of the App */}
      <SearchBar
        onSearch={setSearchQuery}
        onRegion={setRegion}
        onSort={setSort}
        region={region}
        sort={sort}
      />

      {loading && <Spinner />}
      
      {error && <div className="error-msg">⚠ {error}</div>}

      {!loading && !error && (
        <div className="country-grid">
          {displayedCountries.length === 0 ? (
            <div className="empty-state">No nations found matching your criteria.</div>
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
      )}

      {/* Conditional Rendering of the Modal Detail View */}
      {selectedCode && (
        <CountryDetail
          code={selectedCode}
          onClose={() => setSelectedCode(null)}
          onNavigate={setSelectedCode}
        />
      )}
      
      <footer className="app-footer">
        VIT Web Programming Lab | <strong>MAYUR R KENI (24BCE0686)</strong>
      </footer>
    </div>
  );
}
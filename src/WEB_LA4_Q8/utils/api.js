/**
 * api.js — REST Countries API Integration
 * Managed for VIT Web Lab | 24BCE0686
 */

const BASE = 'https://restcountries.com/v3.1';

/** Fetch all countries with specific fields for the grid view */
export async function fetchAllCountries() {
  const url = `${BASE}/all?fields=name,flags,region,subregion,population,capital,cca3,cca2`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch countries');
  return res.json();
}

/** Fetch detailed data for a single country using its 3-letter code */
export async function fetchCountryByCode(code) {
  const res = await fetch(`${BASE}/alpha/${code}`);
  if (!res.ok) throw new Error('Country details not found');
  const data = await res.json();
  // API returns an array, we need the first (and only) object
  return Array.isArray(data) ? data[0] : data;
}

/** Fetch multiple neighbor countries based on an array of border codes */
export async function fetchCountriesByCodes(codes) {
  if (!codes || codes.length === 0) return [];
  const res = await fetch(`${BASE}/alpha?codes=${codes.join(',')}&fields=name,flags,cca3`);
  if (!res.ok) return [];
  return res.json();
}

/** Search countries by name string */
export async function searchCountries(query) {
  const url = `${BASE}/name/${encodeURIComponent(query)}?fields=name,flags,region,subregion,population,capital,cca3,cca2`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No results for "${query}"`);
  return res.json();
}

// ── FORMATTERS ─────────────────────────────────────────────────────────────

/** Formats large numbers into readable Billions, Millions, or Thousands */
export function formatPopulation(n) {
  if (!n) return '—';
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

/** Formats area in square kilometers */
export function formatArea(n) {
  if (!n) return '—';
  return n.toLocaleString() + ' km²';
}

/** Extract currency names and symbols from nested API object */
export function getCurrencies(country) {
  if (!country.currencies) return '—';
  return Object.values(country.currencies)
    .map(c => `${c.name} (${c.symbol ?? ''})`)
    .join(', ');
}

/** Extract language strings from nested API object */
export function getLanguages(country) {
  if (!country.languages) return '—';
  return Object.values(country.languages).join(', ');
}

/** Truncate long lists of timezones for UI clarity */
export function getTimezones(country) {
  if (!country.timezones) return '—';
  const display = country.timezones.slice(0, 3);
  return display.join(', ') + (country.timezones.length > 3 ? ' …' : '');
}

export const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
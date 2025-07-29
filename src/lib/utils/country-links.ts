/**
 * Smart link generation utilities for country external resources
 * Generates predictable URL patterns for government, tourism, and other official websites
 */

import { Country } from '@/types/country.types';

// Common government domain patterns
const GOVERNMENT_PATTERNS: Record<string, string> = {
  'US': 'https://www.usa.gov',
  'GB': 'https://www.gov.uk',
  'FR': 'https://www.gouvernement.fr',
  'DE': 'https://www.deutschland.de',
  'IT': 'https://www.governo.it',
  'ES': 'https://www.lamoncloa.gob.es',
  'NL': 'https://www.government.nl',
  'BE': 'https://www.belgium.be',
  'CH': 'https://www.admin.ch',
  'AT': 'https://www.oesterreich.gv.at',
  'SE': 'https://www.government.se',
  'NO': 'https://www.regjeringen.no',
  'DK': 'https://www.stm.dk',
  'FI': 'https://valtioneuvosto.fi',
  'IE': 'https://www.gov.ie',
  'AU': 'https://www.australia.gov.au',
  'CA': 'https://www.canada.ca',
  'NZ': 'https://www.govt.nz',
  'JP': 'https://www.japan.go.jp',
  'KR': 'https://www.korea.kr',
  'CN': 'https://www.gov.cn',
  'IN': 'https://www.india.gov.in',
  'BR': 'https://www.gov.br',
  'MX': 'https://www.gob.mx',
  'AR': 'https://www.argentina.gob.ar',
  'ZA': 'https://www.gov.za',
  'SG': 'https://www.gov.sg',
  'MY': 'https://www.malaysia.gov.my',
  'TH': 'https://www.thaigov.go.th',
  'ID': 'https://www.indonesia.go.id',
  'PH': 'https://www.gov.ph',
  'VN': 'https://www.chinhphu.vn',
  'IL': 'https://www.gov.il',
  'TR': 'https://www.turkiye.gov.tr',
  'EG': 'https://www.egypt.gov.eg',
  'SA': 'https://www.saudi.gov.sa',
  'AE': 'https://www.government.ae',
  'QA': 'https://www.gov.qa',
  'KW': 'https://www.e.gov.kw',
  'BH': 'https://www.bahrain.bh',
  'OM': 'https://www.oman.gov.om',
  'JO': 'https://www.jordan.gov.jo',
  'LB': 'https://www.lebanon.gov.lb',
  'RU': 'https://www.government.ru',
  'UA': 'https://www.kmu.gov.ua',
  'PL': 'https://www.gov.pl',
  'CZ': 'https://www.vlada.cz',
  'SK': 'https://www.vlada.gov.sk',
  'HU': 'https://www.kormany.hu',
  'RO': 'https://www.gov.ro',
  'BG': 'https://www.government.bg',
  'HR': 'https://www.vlada.hr',
  'SI': 'https://www.gov.si',
  'RS': 'https://www.srbija.gov.rs',
  'BA': 'https://www.vijeceministara.gov.ba',
  'ME': 'https://www.gov.me',
  'MK': 'https://www.vlada.mk',
  'AL': 'https://www.kryeministria.al',
  'GR': 'https://www.primeminister.gr',
  'CY': 'https://www.cyprus.gov.cy',
  'MT': 'https://www.gov.mt',
  'LU': 'https://www.gouvernement.lu',
  'LI': 'https://www.regierung.li',
  'MC': 'https://www.gouv.mc',
  'SM': 'https://www.gov.sm',
  'VA': 'https://www.vatican.va',
  'IS': 'https://www.government.is',
  'LT': 'https://www.lrv.lt',
  'LV': 'https://www.mk.gov.lv',
  'EE': 'https://www.valitsus.ee'
};

// Tourism board patterns
const TOURISM_PATTERNS: Record<string, string> = {
  'US': 'https://www.visittheusa.com',
  'GB': 'https://www.visitbritain.com',
  'FR': 'https://www.france.fr',
  'DE': 'https://www.germany.travel',
  'IT': 'https://www.italia.it',
  'ES': 'https://www.spain.info',
  'NL': 'https://www.holland.com',
  'BE': 'https://www.visitbelgium.com',
  'CH': 'https://www.myswitzerland.com',
  'AT': 'https://www.austria.info',
  'SE': 'https://www.visitsweden.com',
  'NO': 'https://www.visitnorway.com',
  'DK': 'https://www.visitdenmark.com',
  'FI': 'https://www.visitfinland.com',
  'IE': 'https://www.ireland.com',
  'AU': 'https://www.australia.com',
  'CA': 'https://www.destinationcanada.com',
  'NZ': 'https://www.newzealand.com',
  'JP': 'https://www.japan.travel',
  'KR': 'https://www.visitkorea.or.kr',
  'CN': 'https://www.travelchina.gov.cn',
  'IN': 'https://www.incredibleindia.org',
  'BR': 'https://www.visitbrasil.com',
  'MX': 'https://www.visitmexico.com',
  'AR': 'https://www.argentina.travel',
  'ZA': 'https://www.southafrica.net',
  'EG': 'https://www.experienceegypt.eg',
  'MA': 'https://www.visitmorocco.com',
  'TN': 'https://www.discovertunisia.com',
  'KE': 'https://www.magicalkenya.com',
  'TZ': 'https://www.tanzaniatourism.go.tz',
  'SG': 'https://www.visitsingapore.com',
  'MY': 'https://www.malaysia.travel',
  'TH': 'https://www.tourismthailand.org',
  'ID': 'https://www.indonesia.travel',
  'PH': 'https://www.itsmorefuninthephilippines.com',
  'VN': 'https://www.vietnam.travel',
  'TR': 'https://www.goturkey.com',
  'GR': 'https://www.visitgreece.gr',
  'PT': 'https://www.visitportugal.com',
  'IS': 'https://www.visiticeland.com',
  'RU': 'https://www.russia.travel',
  'PL': 'https://www.poland.travel',
  'CZ': 'https://www.czechtourism.com',
  'HU': 'https://www.visithungary.com',
  'HR': 'https://www.croatia.hr',
  'SI': 'https://www.slovenia.info',
  'SK': 'https://www.slovakia.travel'
};

/**
 * Generate government website URL for a country
 */
export function generateGovernmentUrl(country: Country): string {
  return GOVERNMENT_PATTERNS[country.code] || `https://www.gov.${getCountryDomain(country)}`;
}

/**
 * Generate tourism board URL for a country
 */
export function generateTourismUrl(country: Country): string {
  const knownPattern = TOURISM_PATTERNS[country.code];
  if (knownPattern) return knownPattern;
  
  const countrySlug = country.name.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  return `https://www.visit${countrySlug}.com`;
}

/**
 * Generate Wikipedia URL for a country
 */
export function generateWikipediaUrl(country: Country): string {
  const countryName = country.name.replace(/\s+/g, '_');
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(countryName)}`;
}

/**
 * Generate World Bank country page URL
 */
export function generateWorldBankUrl(country: Country): string {
  return `https://data.worldbank.org/country/${country.code.toLowerCase()}`;
}

/**
 * Generate Trading Economics country indicators page URL
 */
export function generateTradingEconomicsUrl(country: Country): string {
  const countrySlug = country.name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `https://tradingeconomics.com/${countrySlug}/indicators`;
}

/**
 * Generate UN country profile URL
 */
export function generateUNProfileUrl(country: Country): string {
  const countrySlug = country.name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  return `https://www.un.org/en/about-us/member-states/${countrySlug}`;
}

/**
 * Generate chamber of commerce URL (best effort)
 */
export function generateChamberOfCommerceUrl(country: Country): string {
  const countrySlug = country.name.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  return `https://www.${countrySlug}chamber.com`;
}

/**
 * Generate embassy URL (US embassy to country)
 */
export function generateEmbassyUrl(country: Country): string {
  const countrySlug = country.name.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  return `https://${countrySlug}.usembassy.gov`;
}

/**
 * Get country domain extension (best effort)
 */
function getCountryDomain(country: Country): string {
  const domainMap: Record<string, string> = {
    'US': 'gov',
    'GB': 'uk',
    'AU': 'gov.au',
    'CA': 'ca',
    'DE': 'de',
    'FR': 'fr',
    'IT': 'it',
    'ES': 'es',
    'NL': 'nl',
    'BE': 'be',
    'CH': 'ch',
    'AT': 'at',
    'SE': 'se',
    'NO': 'no',
    'DK': 'dk',
    'FI': 'fi',
    'IE': 'ie',
    'NZ': 'nz',
    'JP': 'jp',
    'KR': 'kr',
    'CN': 'cn',
    'IN': 'in',
    'BR': 'br',
    'MX': 'mx',
    'AR': 'ar',
    'ZA': 'za'
  };
  
  return domainMap[country.code] || country.code.toLowerCase();
}

/**
 * Generate all external links for a country
 */
export function generateExternalLinks(country: Country) {
  return {
    official: {
      government: generateGovernmentUrl(country),
      tourism: generateTourismUrl(country),
      wikipedia: generateWikipediaUrl(country)
    },
    education: {
      universities: [], // Will be populated with actual data later
      unesco: [], // Will be populated with actual data later
      museums: [] // Will be populated with actual data later
    },
    economy: {
      chamberOfCommerce: generateChamberOfCommerceUrl(country),
      worldBank: generateWorldBankUrl(country),
      tradingEconomics: generateTradingEconomicsUrl(country)
    },
    international: {
      embassy: generateEmbassyUrl(country),
      unProfile: generateUNProfileUrl(country)
    }
  };
}

/**
 * Validate if a URL is likely to be valid (basic check)
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate country slug for URLs
 */
export function generateCountrySlug(countryName: string): string {
  return countryName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

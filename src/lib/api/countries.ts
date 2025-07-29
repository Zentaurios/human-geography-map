'use server';

import { Country } from '@/types/country.types';
import { getCachedWikipediaDescription } from './wikipedia';

// Comprehensive curated data for the most commonly accessed countries
// Includes major countries from all continents plus frequently clicked nations
const CURATED_COUNTRIES: Country[] = [
  // North America
  {
    code: 'US',
    name: 'United States',
    officialName: 'United States of America',
    continent: 'North America',
    population: 331900000,
    area: 9833517,
    capital: 'Washington, D.C.',
    languages: ['English'],
    currencies: ['United States dollar'],
    flag: {
      svg: 'https://flagcdn.com/us.svg',
      png: 'https://flagcdn.com/w320/us.png',
      alt: 'Flag of United States',
    },
    geography: {
      coordinates: [37.0902, -95.7129],
      borders: ['CAN', 'MEX'],
      landlocked: false,
      region: 'Americas',
      subregion: 'Northern America',
    },
    timezones: ['UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC+10:00', 'UTC+12:00'],
    callingCodes: ['+1'],
    domains: ['.us'],
    unMember: true,
  },
  {
    code: 'CA',
    name: 'Canada',
    officialName: 'Canada',
    continent: 'North America',
    population: 38000000,
    area: 9984670,
    capital: 'Ottawa',
    languages: ['English', 'French'],
    currencies: ['Canadian dollar'],
    flag: {
      svg: 'https://flagcdn.com/ca.svg',
      png: 'https://flagcdn.com/w320/ca.png',
      alt: 'Flag of Canada',
    },
    geography: {
      coordinates: [56.1304, -106.3468],
      borders: ['USA'],
      landlocked: false,
      region: 'Americas',
      subregion: 'Northern America',
    },
    timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
    callingCodes: ['+1'],
    domains: ['.ca'],
    unMember: true,
  },
  {
    code: 'MX',
    name: 'Mexico',
    officialName: 'United Mexican States',
    continent: 'North America',
    population: 128900000,
    area: 1964375,
    capital: 'Mexico City',
    languages: ['Spanish'],
    currencies: ['Mexican peso'],
    flag: {
      svg: 'https://flagcdn.com/mx.svg',
      png: 'https://flagcdn.com/w320/mx.png',
      alt: 'Flag of Mexico',
    },
    geography: {
      coordinates: [23.6345, -102.5528],
      borders: ['BLZ', 'GTM', 'USA'],
      landlocked: false,
      region: 'Americas',
      subregion: 'North America',
    },
    timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00'],
    callingCodes: ['+52'],
    domains: ['.mx'],
    unMember: true,
  },
  // South America  
  {
    code: 'BR',
    name: 'Brazil',
    officialName: 'Federative Republic of Brazil',
    continent: 'South America',
    population: 215300000,
    area: 8515767,
    capital: 'Brasília',
    languages: ['Portuguese'],
    currencies: ['Brazilian real'],
    flag: {
      svg: 'https://flagcdn.com/br.svg',
      png: 'https://flagcdn.com/w320/br.png',
      alt: 'Flag of Brazil',
    },
    geography: {
      coordinates: [-14.2350, -51.9253],
      borders: ['ARG', 'BOL', 'COL', 'GUF', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN'],
      landlocked: false,
      region: 'Americas',
      subregion: 'South America',
    },
    timezones: ['UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00'],
    callingCodes: ['+55'],
    domains: ['.br'],
    unMember: true,
  },
  {
    code: 'AR',
    name: 'Argentina',
    officialName: 'Argentine Republic',
    continent: 'South America',
    population: 45200000,
    area: 2780400,
    capital: 'Buenos Aires',
    languages: ['Spanish'],
    currencies: ['Argentine peso'],
    flag: {
      svg: 'https://flagcdn.com/ar.svg',
      png: 'https://flagcdn.com/w320/ar.png',
      alt: 'Flag of Argentina',
    },
    geography: {
      coordinates: [-38.4161, -63.6167],
      borders: ['BOL', 'BRA', 'CHL', 'PRY', 'URY'],
      landlocked: false,
      region: 'Americas',
      subregion: 'South America',
    },
    timezones: ['UTC-03:00'],
    callingCodes: ['+54'],
    domains: ['.ar'],
    unMember: true,
  },
  {
    code: 'CL',
    name: 'Chile',
    officialName: 'Republic of Chile',
    continent: 'South America',
    population: 19100000,
    area: 756102,
    capital: 'Santiago',
    languages: ['Spanish'],
    currencies: ['Chilean peso'],
    flag: {
      svg: 'https://flagcdn.com/cl.svg',
      png: 'https://flagcdn.com/w320/cl.png',
      alt: 'Flag of Chile',
    },
    geography: {
      coordinates: [-35.6751, -71.5430],
      borders: ['ARG', 'BOL', 'PER'],
      landlocked: false,
      region: 'Americas',
      subregion: 'South America',
    },
    timezones: ['UTC-06:00', 'UTC-04:00'],
    callingCodes: ['+56'],
    domains: ['.cl'],
    unMember: true,
  },
  // Europe - Major Western European countries
  {
    code: 'FR',
    name: 'France',
    officialName: 'French Republic',
    continent: 'Europe',
    population: 67400000,
    area: 551695,
    capital: 'Paris',
    languages: ['French'],
    currencies: ['Euro'],
    flag: {
      svg: 'https://flagcdn.com/fr.svg',
      png: 'https://flagcdn.com/w320/fr.png',
      alt: 'Flag of France',
    },
    geography: {
      coordinates: [46.2276, 2.2137],
      borders: ['AND', 'BEL', 'DEU', 'ITA', 'LUX', 'MCO', 'ESP', 'CHE'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Western Europe',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+33'],
    domains: ['.fr'],
    unMember: true,
  },
  {
    code: 'DE',
    name: 'Germany',
    officialName: 'Federal Republic of Germany',
    continent: 'Europe',
    population: 83200000,
    area: 357114,
    capital: 'Berlin',
    languages: ['German'],
    currencies: ['Euro'],
    flag: {
      svg: 'https://flagcdn.com/de.svg',
      png: 'https://flagcdn.com/w320/de.png',
      alt: 'Flag of Germany',
    },
    geography: {
      coordinates: [51.1657, 10.4515],
      borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Central Europe',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+49'],
    domains: ['.de'],
    unMember: true,
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    officialName: 'United Kingdom of Great Britain and Northern Ireland',
    continent: 'Europe',
    population: 67500000,
    area: 242495,
    capital: 'London',
    languages: ['English'],
    currencies: ['Pound sterling'],
    flag: {
      svg: 'https://flagcdn.com/gb.svg',
      png: 'https://flagcdn.com/w320/gb.png',
      alt: 'Flag of United Kingdom',
    },
    geography: {
      coordinates: [55.3781, -3.4360],
      borders: ['IRL'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Northern Europe',
    },
    timezones: ['UTC'],
    callingCodes: ['+44'],
    domains: ['.uk'],
    unMember: true,
  },
  {
    code: 'IT',
    name: 'Italy',
    officialName: 'Italian Republic',
    continent: 'Europe',
    population: 60400000,
    area: 301336,
    capital: 'Rome',
    languages: ['Italian'],
    currencies: ['Euro'],
    flag: {
      svg: 'https://flagcdn.com/it.svg',
      png: 'https://flagcdn.com/w320/it.png',
      alt: 'Flag of Italy',
    },
    geography: {
      coordinates: [41.8719, 12.5674],
      borders: ['AUT', 'FRA', 'SMR', 'SVN', 'CHE', 'VAT'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Southern Europe',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+39'],
    domains: ['.it'],
    unMember: true,
  },
  {
    code: 'ES',
    name: 'Spain',
    officialName: 'Kingdom of Spain',
    continent: 'Europe',
    population: 47400000,
    area: 505992,
    capital: 'Madrid',
    languages: ['Spanish'],
    currencies: ['Euro'],
    flag: {
      svg: 'https://flagcdn.com/es.svg',
      png: 'https://flagcdn.com/w320/es.png',
      alt: 'Flag of Spain',
    },
    geography: {
      coordinates: [40.4637, -3.7492],
      borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Southern Europe',
    },
    timezones: ['UTC', 'UTC+01:00'],
    callingCodes: ['+34'],
    domains: ['.es'],
    unMember: true,
  },
  {
    code: 'RU',
    name: 'Russia',
    officialName: 'Russian Federation',
    continent: 'Europe',
    population: 146200000,
    area: 17098242,
    capital: 'Moscow',
    languages: ['Russian'],
    currencies: ['Russian ruble'],
    flag: {
      svg: 'https://flagcdn.com/ru.svg',
      png: 'https://flagcdn.com/w320/ru.png',
      alt: 'Flag of Russia',
    },
    geography: {
      coordinates: [61.5240, 105.3188],
      borders: ['AZE', 'BLR', 'CHN', 'EST', 'FIN', 'GEO', 'KAZ', 'PRK', 'LVA', 'LTU', 'MNG', 'NOR', 'POL', 'UKR'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Eastern Europe',
    },
    timezones: ['UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00', 'UTC+12:00'],
    callingCodes: ['+7'],
    domains: ['.ru'],
    unMember: true,
  },
  // Additional major European countries
  {
    code: 'PL',
    name: 'Poland',
    officialName: 'Republic of Poland',
    continent: 'Europe',
    population: 38000000,
    area: 312696,
    capital: 'Warsaw',
    languages: ['Polish'],
    currencies: ['Polish złoty'],
    flag: {
      svg: 'https://flagcdn.com/pl.svg',
      png: 'https://flagcdn.com/w320/pl.png',
      alt: 'Flag of Poland',
    },
    geography: {
      coordinates: [51.9194, 19.1451],
      borders: ['BLR', 'CZE', 'DEU', 'LTU', 'RUS', 'SVK', 'UKR'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Central Europe',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+48'],
    domains: ['.pl'],
    unMember: true,
  },
  {
    code: 'NL',
    name: 'Netherlands',
    officialName: 'Kingdom of the Netherlands',
    continent: 'Europe',
    population: 17400000,
    area: 41850,
    capital: 'Amsterdam',
    languages: ['Dutch'],
    currencies: ['Euro'],
    flag: {
      svg: 'https://flagcdn.com/nl.svg',
      png: 'https://flagcdn.com/w320/nl.png',
      alt: 'Flag of Netherlands',
    },
    geography: {
      coordinates: [52.1326, 5.2913],
      borders: ['BEL', 'DEU'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Western Europe',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+31'],
    domains: ['.nl'],
    unMember: true,
  },
  {
    code: 'BE',
    name: 'Belgium',
    officialName: 'Kingdom of Belgium',
    continent: 'Europe',
    population: 11500000,
    area: 30528,
    capital: 'Brussels',
    languages: ['Dutch', 'French', 'German'],
    currencies: ['Euro'],
    flag: {
      svg: 'https://flagcdn.com/be.svg',
      png: 'https://flagcdn.com/w320/be.png',
      alt: 'Flag of Belgium',
    },
    geography: {
      coordinates: [50.5039, 4.4699],
      borders: ['FRA', 'DEU', 'LUX', 'NLD'],
      landlocked: false,
      region: 'Europe',
      subregion: 'Western Europe',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+32'],
    domains: ['.be'],
    unMember: true,
  },
  // Asia
  {
    code: 'CN',
    name: 'China',
    officialName: 'People\'s Republic of China',
    continent: 'Asia',
    population: 1439323776,
    area: 9596961,
    capital: 'Beijing',
    languages: ['Mandarin'],
    currencies: ['Chinese yuan'],
    flag: {
      svg: 'https://flagcdn.com/cn.svg',
      png: 'https://flagcdn.com/w320/cn.png',
      alt: 'Flag of China',
    },
    geography: {
      coordinates: [35.8617, 104.1954],
      borders: ['AFG', 'BTN', 'MMR', 'HKG', 'IND', 'KAZ', 'PRK', 'KGZ', 'LAO', 'MAC', 'MNG', 'PAK', 'RUS', 'TJK', 'VNM'],
      landlocked: false,
      region: 'Asia',
      subregion: 'Eastern Asia',
    },
    timezones: ['UTC+08:00'],
    callingCodes: ['+86'],
    domains: ['.cn'],
    unMember: true,
  },
  {
    code: 'IN',
    name: 'India',
    officialName: 'Republic of India',
    continent: 'Asia',
    population: 1380004385,
    area: 3287263,
    capital: 'New Delhi',
    languages: ['Hindi', 'English'],
    currencies: ['Indian rupee'],
    flag: {
      svg: 'https://flagcdn.com/in.svg',
      png: 'https://flagcdn.com/w320/in.png',
      alt: 'Flag of India',
    },
    geography: {
      coordinates: [20.5937, 78.9629],
      borders: ['AFG', 'BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK', 'LKA'],
      landlocked: false,
      region: 'Asia',
      subregion: 'Southern Asia',
    },
    timezones: ['UTC+05:30'],
    callingCodes: ['+91'],
    domains: ['.in'],
    unMember: true,
  },
  {
    code: 'JP',
    name: 'Japan',
    officialName: 'Japan',
    continent: 'Asia',
    population: 125800000,
    area: 377930,
    capital: 'Tokyo',
    languages: ['Japanese'],
    currencies: ['Japanese yen'],
    flag: {
      svg: 'https://flagcdn.com/jp.svg',
      png: 'https://flagcdn.com/w320/jp.png',
      alt: 'Flag of Japan',
    },
    geography: {
      coordinates: [36.2048, 138.2529],
      borders: [],
      landlocked: false,
      region: 'Asia',
      subregion: 'Eastern Asia',
    },
    timezones: ['UTC+09:00'],
    callingCodes: ['+81'],
    domains: ['.jp'],
    unMember: true,
  },
  {
    code: 'KR',
    name: 'South Korea',
    officialName: 'Republic of Korea',
    continent: 'Asia',
    population: 51780579,
    area: 100210,
    capital: 'Seoul',
    languages: ['Korean'],
    currencies: ['South Korean won'],
    flag: {
      svg: 'https://flagcdn.com/kr.svg',
      png: 'https://flagcdn.com/w320/kr.png',
      alt: 'Flag of South Korea',
    },
    geography: {
      coordinates: [35.9078, 127.7669],
      borders: ['PRK'],
      landlocked: false,
      region: 'Asia',
      subregion: 'Eastern Asia',
    },
    timezones: ['UTC+09:00'],
    callingCodes: ['+82'],
    domains: ['.kr'],
    unMember: true,
  },
  {
    code: 'ID',
    name: 'Indonesia',
    officialName: 'Republic of Indonesia',
    continent: 'Asia',
    population: 273500000,
    area: 1904569,
    capital: 'Jakarta',
    languages: ['Indonesian'],
    currencies: ['Indonesian rupiah'],
    flag: {
      svg: 'https://flagcdn.com/id.svg',
      png: 'https://flagcdn.com/w320/id.png',
      alt: 'Flag of Indonesia',
    },
    geography: {
      coordinates: [-0.7893, 113.9213],
      borders: ['TLS', 'MYS', 'PNG'],
      landlocked: false,
      region: 'Asia',
      subregion: 'South-Eastern Asia',
    },
    timezones: ['UTC+07:00', 'UTC+08:00', 'UTC+09:00'],
    callingCodes: ['+62'],
    domains: ['.id'],
    unMember: true,
  },
  {
    code: 'TH',
    name: 'Thailand',
    officialName: 'Kingdom of Thailand',
    continent: 'Asia',
    population: 69800000,
    area: 513120,
    capital: 'Bangkok',
    languages: ['Thai'],
    currencies: ['Thai baht'],
    flag: {
      svg: 'https://flagcdn.com/th.svg',
      png: 'https://flagcdn.com/w320/th.png',
      alt: 'Flag of Thailand',
    },
    geography: {
      coordinates: [15.8700, 100.9925],
      borders: ['MMR', 'KHM', 'LAO', 'MYS'],
      landlocked: false,
      region: 'Asia',
      subregion: 'South-Eastern Asia',
    },
    timezones: ['UTC+07:00'],
    callingCodes: ['+66'],
    domains: ['.th'],
    unMember: true,
  },
  {
    code: 'TR',
    name: 'Turkey',
    officialName: 'Republic of Turkey',
    continent: 'Asia', // Note: Transcontinental, but majority in Asia
    population: 84300000,
    area: 783562,
    capital: 'Ankara',
    languages: ['Turkish'],
    currencies: ['Turkish lira'],
    flag: {
      svg: 'https://flagcdn.com/tr.svg',
      png: 'https://flagcdn.com/w320/tr.png',
      alt: 'Flag of Turkey',
    },
    geography: {
      coordinates: [38.9637, 35.2433],
      borders: ['ARM', 'AZE', 'BGR', 'GEO', 'GRC', 'IRN', 'IRQ', 'SYR'],
      landlocked: false,
      region: 'Asia',
      subregion: 'Western Asia',
    },
    timezones: ['UTC+03:00'],
    callingCodes: ['+90'],
    domains: ['.tr'],
    unMember: true,
  },
  // Africa
  {
    code: 'NG',
    name: 'Nigeria',
    officialName: 'Federal Republic of Nigeria',
    continent: 'Africa',
    population: 206100000,
    area: 923768,
    capital: 'Abuja',
    languages: ['English'],
    currencies: ['Nigerian naira'],
    flag: {
      svg: 'https://flagcdn.com/ng.svg',
      png: 'https://flagcdn.com/w320/ng.png',
      alt: 'Flag of Nigeria',
    },
    geography: {
      coordinates: [9.0820, 8.6753],
      borders: ['BEN', 'CMR', 'TCD', 'NER'],
      landlocked: false,
      region: 'Africa',
      subregion: 'Western Africa',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+234'],
    domains: ['.ng'],
    unMember: true,
  },
  {
    code: 'EG',
    name: 'Egypt',
    officialName: 'Arab Republic of Egypt',
    continent: 'Africa',
    population: 102300000,
    area: 1001449,
    capital: 'Cairo',
    languages: ['Arabic'],
    currencies: ['Egyptian pound'],
    flag: {
      svg: 'https://flagcdn.com/eg.svg',
      png: 'https://flagcdn.com/w320/eg.png',
      alt: 'Flag of Egypt',
    },
    geography: {
      coordinates: [26.0975, 30.0444],
      borders: ['ISR', 'LBY', 'SDN'],
      landlocked: false,
      region: 'Africa',
      subregion: 'Northern Africa',
    },
    timezones: ['UTC+02:00'],
    callingCodes: ['+20'],
    domains: ['.eg'],
    unMember: true,
  },
  {
    code: 'ZA',
    name: 'South Africa',
    officialName: 'Republic of South Africa',
    continent: 'Africa',
    population: 59300000,
    area: 1221037,
    capital: 'Cape Town',
    languages: ['Afrikaans', 'English', 'Zulu', 'Xhosa'],
    currencies: ['South African rand'],
    flag: {
      svg: 'https://flagcdn.com/za.svg',
      png: 'https://flagcdn.com/w320/za.png',
      alt: 'Flag of South Africa',
    },
    geography: {
      coordinates: [-30.5595, 22.9375],
      borders: ['BWA', 'LSO', 'MOZ', 'NAM', 'SWZ', 'ZWE'],
      landlocked: false,
      region: 'Africa',
      subregion: 'Southern Africa',
    },
    timezones: ['UTC+02:00'],
    callingCodes: ['+27'],
    domains: ['.za'],
    unMember: true,
  },
  {
    code: 'KE',
    name: 'Kenya',
    officialName: 'Republic of Kenya',
    continent: 'Africa',
    population: 53800000,
    area: 580367,
    capital: 'Nairobi',
    languages: ['English', 'Swahili'],
    currencies: ['Kenyan shilling'],
    flag: {
      svg: 'https://flagcdn.com/ke.svg',
      png: 'https://flagcdn.com/w320/ke.png',
      alt: 'Flag of Kenya',
    },
    geography: {
      coordinates: [-0.0236, 37.9062],
      borders: ['ETH', 'SOM', 'SSD', 'TZA', 'UGA'],
      landlocked: false,
      region: 'Africa',
      subregion: 'Eastern Africa',
    },
    timezones: ['UTC+03:00'],
    callingCodes: ['+254'],
    domains: ['.ke'],
    unMember: true,
  },
  {
    code: 'GH',
    name: 'Ghana',
    officialName: 'Republic of Ghana',
    continent: 'Africa',
    population: 31100000,
    area: 238533,
    capital: 'Accra',
    languages: ['English'],
    currencies: ['Ghanaian cedi'],
    flag: {
      svg: 'https://flagcdn.com/gh.svg',
      png: 'https://flagcdn.com/w320/gh.png',
      alt: 'Flag of Ghana',
    },
    geography: {
      coordinates: [7.9465, -1.0232],
      borders: ['BFA', 'CIV', 'TGO'],
      landlocked: false,
      region: 'Africa',
      subregion: 'Western Africa',
    },
    timezones: ['UTC'],
    callingCodes: ['+233'],
    domains: ['.gh'],
    unMember: true,
  },
  {
    code: 'MA',
    name: 'Morocco',
    officialName: 'Kingdom of Morocco',
    continent: 'Africa',
    population: 37500000,
    area: 446550,
    capital: 'Rabat',
    languages: ['Arabic', 'Berber'],
    currencies: ['Moroccan dirham'],
    flag: {
      svg: 'https://flagcdn.com/ma.svg',
      png: 'https://flagcdn.com/w320/ma.png',
      alt: 'Flag of Morocco',
    },
    geography: {
      coordinates: [31.7917, -7.0926],
      borders: ['DZA', 'ESH', 'ESP'],
      landlocked: false,
      region: 'Africa',
      subregion: 'Northern Africa',
    },
    timezones: ['UTC+01:00'],
    callingCodes: ['+212'],
    domains: ['.ma'],
    unMember: true,
  },
  // Oceania
  {
    code: 'AU',
    name: 'Australia',
    officialName: 'Commonwealth of Australia',
    continent: 'Oceania',
    population: 25700000,
    area: 7692024,
    capital: 'Canberra',
    languages: ['English'],
    currencies: ['Australian dollar'],
    flag: {
      svg: 'https://flagcdn.com/au.svg',
      png: 'https://flagcdn.com/w320/au.png',
      alt: 'Flag of Australia',
    },
    geography: {
      coordinates: [-25.2744, 133.7751],
      borders: [],
      landlocked: false,
      region: 'Oceania',
      subregion: 'Australia and New Zealand',
    },
    timezones: ['UTC+05:00', 'UTC+06:30', 'UTC+07:00', 'UTC+08:00', 'UTC+09:30', 'UTC+10:00', 'UTC+10:30', 'UTC+11:00'],
    callingCodes: ['+61'],
    domains: ['.au'],
    unMember: true,
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    officialName: 'New Zealand',
    continent: 'Oceania',
    population: 5100000,
    area: 268838,
    capital: 'Wellington',
    languages: ['English', 'Māori'],
    currencies: ['New Zealand dollar'],
    flag: {
      svg: 'https://flagcdn.com/nz.svg',
      png: 'https://flagcdn.com/w320/nz.png',
      alt: 'Flag of New Zealand',
    },
    geography: {
      coordinates: [-40.9006, 174.8860],
      borders: [],
      landlocked: false,
      region: 'Oceania',
      subregion: 'Australia and New Zealand',
    },
    timezones: ['UTC-11:00', 'UTC-10:00', 'UTC+12:00', 'UTC+12:45', 'UTC+13:00'],
    callingCodes: ['+64'],
    domains: ['.nz'],
    unMember: true,
  },
  {
    code: 'FJ',
    name: 'Fiji',
    officialName: 'Republic of Fiji',
    continent: 'Oceania',
    population: 896400,
    area: 18272,
    capital: 'Suva',
    languages: ['English', 'Fijian', 'Hindi'],
    currencies: ['Fijian dollar'],
    flag: {
      svg: 'https://flagcdn.com/fj.svg',
      png: 'https://flagcdn.com/w320/fj.png',
      alt: 'Flag of Fiji',
    },
    geography: {
      coordinates: [-16.7784, 179.4144],
      borders: [],
      landlocked: false,
      region: 'Oceania',
      subregion: 'Melanesia',
    },
    timezones: ['UTC+12:00'],
    callingCodes: ['+679'],
    domains: ['.fj'],
    unMember: true,
  },
  {
    code: 'PG',
    name: 'Papua New Guinea',
    officialName: 'Independent State of Papua New Guinea',
    continent: 'Oceania',
    population: 8947000,
    area: 462840,
    capital: 'Port Moresby',
    languages: ['English', 'Tok Pisin', 'Hiri Motu'],
    currencies: ['Papua New Guinean kina'],
    flag: {
      svg: 'https://flagcdn.com/pg.svg',
      png: 'https://flagcdn.com/w320/pg.png',
      alt: 'Flag of Papua New Guinea',
    },
    geography: {
      coordinates: [-6.3140, 143.9555],
      borders: ['IDN'],
      landlocked: false,
      region: 'Oceania',
      subregion: 'Melanesia',
    },
    timezones: ['UTC+10:00'],
    callingCodes: ['+675'],
    domains: ['.pg'],
    unMember: true,
  },
  // Antarctica (representing the continent)
  {
    code: 'AQ',
    name: 'Antarctica',
    officialName: 'Antarctica',
    continent: 'Antarctica',
    population: 4490,
    area: 14000000,
    capital: 'N/A',
    languages: [],
    currencies: [],
    flag: {
      svg: 'https://flagcdn.com/aq.svg',
      png: 'https://flagcdn.com/w320/aq.png',
      alt: 'Flag of Antarctica',
    },
    geography: {
      coordinates: [-75.0000, 0.0000],
      borders: [],
      landlocked: false,
      region: 'Antarctic',
      subregion: 'Antarctica',
    },
    timezones: ['UTC-03:00', 'UTC+03:00', 'UTC+05:00', 'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+10:00', 'UTC+12:00'],
    callingCodes: [],
    domains: ['.aq'],
    unMember: false,
  },
];

// Server action to fetch all countries - using expanded curated dataset
export async function fetchAllCountries(): Promise<Country[]> {
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Using expanded curated country dataset...');
    console.log('🌍 Using curated dataset with', CURATED_COUNTRIES.length, 'countries');
    
    // Log continent distribution for transparency in dev mode
    const continentCounts = CURATED_COUNTRIES.reduce((counts, country) => {
      counts[country.continent] = (counts[country.continent] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    
    console.log('🌎 Continent distribution:', continentCounts);
  }
  
  return CURATED_COUNTRIES;
}

// Server action to fetch a specific country by code
export async function fetchCountryByCode(countryCode: string): Promise<Country | null> {
  if (!countryCode) {
    if (process.env.NODE_ENV === 'development') {
      console.log('❌ No country code provided');
    }
    return null;
  }

  // Normalize country code
  const normalizedCode = countryCode.toUpperCase().trim();
  
  // First, try to find in our curated data
  const curatedCountry = CURATED_COUNTRIES.find(
    country => country.code.toUpperCase() === normalizedCode
  );
  
  if (curatedCountry) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Using curated data for country: ${normalizedCode}`);
    }
    
    // Enhance with Wikipedia description if not present
    if (!curatedCountry.wikipediaSummary) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 Fetching Wikipedia description for curated country: ${curatedCountry.name}`);
      }
      const wikipediaDescription = await getCachedWikipediaDescription(
        curatedCountry.name, 
        curatedCountry.officialName
      );
      
      if (wikipediaDescription) {
        return {
          ...curatedCountry,
          wikipediaSummary: wikipediaDescription
        };
      }
    }
    
    return curatedCountry;
  }
  
  // If not in curated data, fallback to REST Countries API
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔄 Country ${normalizedCode} not in curated dataset, fetching from REST Countries API...`);
  }
  
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${normalizedCode}`, {
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout and retry logic
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`❌ REST Countries API error: ${response.status} ${response.statusText}`);
        if (response.status === 404) {
          console.log(`❌ Country ${normalizedCode} not found in REST Countries API`);
        }
      }
      return null;
    }
    
    const data = await response.json();
    const countryData = Array.isArray(data) ? data[0] : data;
    
    if (!countryData) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`❌ No data returned for country ${normalizedCode}`);
      }
      return null;
    }
    
    // Transform REST Countries data to our Country type with better error handling
    const transformedCountry: Country = {
      code: countryData.cca2 || normalizedCode,
      name: countryData.name?.common || 'Unknown',
      officialName: countryData.name?.official || countryData.name?.common || 'Unknown',
      continent: getContinent(countryData.region, countryData.subregion),
      population: countryData.population || 0,
      area: countryData.area || 0,
      capital: Array.isArray(countryData.capital) ? countryData.capital[0] : countryData.capital || 'N/A',
      languages: countryData.languages ? Object.values(countryData.languages) : [],
      currencies: countryData.currencies ? Object.values(countryData.currencies).map((curr: any) => curr.name || curr.code) : [],
      flag: {
        svg: countryData.flags?.svg || '',
        png: countryData.flags?.png || countryData.flags?.svg || '',
        alt: countryData.flags?.alt || `Flag of ${countryData.name?.common || 'Unknown'}`,
      },
      geography: {
        coordinates: countryData.latlng || [0, 0],
        borders: countryData.borders || [],
        landlocked: countryData.landlocked || false,
        region: countryData.region || 'Unknown',
        subregion: countryData.subregion || 'Unknown',
      },
      timezones: countryData.timezones || [],
      callingCodes: countryData.idd?.root ? 
        (countryData.idd.suffixes || ['']).map((suffix: string) => `${countryData.idd.root}${suffix}`) : [],
      domains: countryData.tld || [],
      unMember: countryData.unMember || false,
    };
    
    // Fetch Wikipedia description for API-sourced countries
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Fetching Wikipedia description for API country: ${transformedCountry.name}`);
    }
    const wikipediaDescription = await getCachedWikipediaDescription(
      transformedCountry.name,
      transformedCountry.officialName
    );
    
    if (wikipediaDescription) {
      transformedCountry.wikipediaSummary = wikipediaDescription;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Successfully fetched ${transformedCountry.name} from REST Countries API with Wikipedia description`);
    }
    return transformedCountry;
    
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      if (error instanceof Error) {
        if (error.name === 'TimeoutError') {
          console.error(`⏰ Timeout fetching country ${normalizedCode} from REST Countries`);
        } else if (error.name === 'AbortError') {
          console.error(`🚫 Request aborted for country ${normalizedCode}`);
        } else {
          console.error(`❌ Error fetching country ${normalizedCode} from REST Countries:`, error.message);
        }
      } else {
        console.error(`❌ Unknown error fetching country ${normalizedCode}:`, error);
      }
    }
    return null;
  }
}

// Helper function to map REST Countries regions to our continent system
function getContinent(region: string, subregion: string): string {
  const regionMap: Record<string, string> = {
    'Africa': 'Africa',
    'Americas': subregion?.includes('North') ? 'North America' : 'South America',
    'Asia': 'Asia',
    'Europe': 'Europe',
    'Oceania': 'Oceania',
    'Antarctic': 'Antarctica'
  };
  
  return regionMap[region] || region || 'Unknown';
}

// Helper function to get countries by continent
export async function fetchCountriesByContinent(continent: string): Promise<Country[]> {
  const allCountries = await fetchAllCountries();
  return allCountries.filter(country => country.continent === continent);
}

// Helper function to search countries by name
export async function searchCountries(query: string): Promise<Country[]> {
  const allCountries = await fetchAllCountries();
  const lowerQuery = query.toLowerCase();
  
  return allCountries.filter(country => 
    country.name.toLowerCase().includes(lowerQuery) ||
    country.officialName.toLowerCase().includes(lowerQuery) ||
    country.capital.toLowerCase().includes(lowerQuery)
  );
}

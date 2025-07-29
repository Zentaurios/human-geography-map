import { MetadataRoute } from 'next';
import { fetchAllCountries } from '@/lib/api/countries';
import { generateCountrySlug } from '@/lib/utils/country-links';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://humangeographymap.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/country`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic country pages
  try {
    const countries = await fetchAllCountries();
    const countryPages: MetadataRoute.Sitemap = countries.map((country) => ({
      url: `${baseUrl}/country/${generateCountrySlug(country.name)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    
    return [...staticPages, ...countryPages];
  } catch (error) {
    console.error('Error generating sitemap for countries:', error);
    // Return static pages only if country fetch fails
    return staticPages;
  }
}

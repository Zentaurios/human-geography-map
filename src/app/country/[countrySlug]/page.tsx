import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAllCountries, fetchCountryByCode } from '@/lib/api/countries';
import { generateCountrySlug } from '@/lib/utils/country-links';
import { CountryProfile } from '@/components/countries/CountryProfile';

interface CountryPageProps {
  params: Promise<{ countrySlug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Helper function to find country by slug with API fallback
async function findCountryBySlug(slug: string) {
  // First, check in curated countries
  const curatedCountries = await fetchAllCountries();
  const curatedMatch = curatedCountries.find(country => 
    generateCountrySlug(country.name) === slug
  );
  
  if (curatedMatch) {
    console.log(`✅ Found curated country for slug: ${slug}`);
    return curatedMatch;
  }
  
  // If not found in curated data, try to reverse-engineer from REST Countries API
  console.log(`🔄 Country slug '${slug}' not in curated dataset, searching REST Countries API...`);
  
  try {
    // Fetch all countries from REST Countries API to find the match
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2', {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });
    
    if (!response.ok) {
      console.log(`❌ REST Countries API error: ${response.status}`);
      return null;
    }
    
    const allCountries = await response.json();
    
    // Find country where slug matches the generated slug from its name
    const matchingCountry = allCountries.find((country: any) => 
      generateCountrySlug(country.name?.common || '') === slug
    );
    
    if (matchingCountry) {
      console.log(`🎯 Found matching country: ${matchingCountry.name.common} (${matchingCountry.cca2})`);
      // Fetch the full country data using the country code
      return await fetchCountryByCode(matchingCountry.cca2);
    }
    
    console.log(`❌ No country found for slug: ${slug}`);
    return null;
    
  } catch (error) {
    console.error(`❌ Error searching for country slug '${slug}':`, error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const country = await findCountryBySlug(resolvedParams.countrySlug);
  
  if (!country) {
    return {
      title: 'Country Not Found | Human Geography Map',
      description: 'The requested country could not be found.'
    };
  }

  // Use basic country data for metadata since enhanced data is not available
  const enhancedCountry = await fetchCountryByCode(country.code);
  
  const title = `${country.name} - Geography, Demographics, Economy | Human Geography Map`;
  const description = enhancedCountry?.wikipediaSummary 
    ? `${enhancedCountry.wikipediaSummary.substring(0, 155)}...`
    : `Explore ${country.name}: population ${country.population.toLocaleString()}, capital ${country.capital}, located in ${country.continent}. Interactive maps and comprehensive country data.`;

  return {
    title,
    description,
    openGraph: {
      title: `${country.name} - Human Geography Map`,
      description,
      type: 'website',
      images: [
        {
          url: country.flag.png,
          width: 1200,
          height: 630,
          alt: `Flag of ${country.name}`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [country.flag.png],
    },
    keywords: [
      country.name,
      country.capital,
      country.continent,
      country.geography.region,
      country.geography.subregion,
      'country profile',
      'geography',
      'demographics',
      'statistics'
    ],
    alternates: {
      canonical: `/country/${resolvedParams.countrySlug}`
    }
  };
}

// Generate static params for popular countries (optional - for better performance)
export async function generateStaticParams() {
  const countries = await fetchAllCountries();
  
  // Generate static params for the most populous countries for better performance
  const popularCountries = countries
    .sort((a, b) => b.population - a.population)
    .slice(0, 50) // Top 50 most populous countries
    .map(country => ({
      countrySlug: generateCountrySlug(country.name)
    }));

  return popularCountries;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params;
  const country = await findCountryBySlug(resolvedParams.countrySlug);
  
  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <CountryProfile countryCode={country.code} />
    </div>
  );
}

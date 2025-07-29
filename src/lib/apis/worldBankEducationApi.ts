// World Bank Education API integration for development and education data

interface WorldBankIndicator {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

interface WorldBankEducationData {
  indicators: WorldBankIndicator[];
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

const WORLD_BANK_BASE_URL = 'https://api.worldbank.org/v2';

// Key education indicators from World Bank
const WB_EDUCATION_INDICATORS = {
  LITERACY_RATE: 'SE.ADT.LITR.ZS', // Literacy rate, adult total (% of people ages 15 and above)
  PRIMARY_COMPLETION: 'SE.PRM.CMPT.ZS', // Primary completion rate, total (% of relevant age group)
  SECONDARY_ENROLLMENT: 'SE.SEC.NENR', // School enrollment, secondary (% net)
  TERTIARY_ENROLLMENT: 'SE.TER.ENRR', // School enrollment, tertiary (% gross)
  EDUCATION_EXPENDITURE: 'SE.XPD.TOTL.GD.ZS', // Government expenditure on education, total (% of GDP)
  PUPIL_TEACHER_PRIMARY: 'SE.PRM.ENRL.TC.ZS', // Pupil-teacher ratio, primary
  FEMALE_SECONDARY: 'SE.SEC.NENR.FE', // School enrollment, secondary, female (% net)
  EDUCATION_GDP: 'SE.XPD.TOTL.GD.ZS', // Government expenditure on education (% of GDP)
  YOUTH_LITERACY: 'SE.ADT.1524.LT.ZS', // Literacy rate, youth total (% of people ages 15-24)
  GENDER_PARITY_PRIMARY: 'SE.ENR.PRIM.FM.ZS', // Gender parity index for gross enrollment ratio in primary education
};

class WorldBankEducationApi {
  private baseUrl: string;
  private format: string = 'json';
  private perPage: number = 100;

  constructor() {
    this.baseUrl = WORLD_BANK_BASE_URL;
  }

  /**
   * Fetch education indicator data for specific countries
   */
  async getEducationIndicator(
    indicator: string,
    countries: string[] = ['all'],
    startYear: number = 2015,
    endYear: number = 2023
  ): Promise<WorldBankIndicator[]> {
    try {
      const countryList = countries.join(';');
      const dateRange = `${startYear}:${endYear}`;
      
      const url = `${this.baseUrl}/country/${countryList}/indicator/${indicator}` +
                  `?date=${dateRange}&format=${this.format}&per_page=${this.perPage}`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Human Geography Learning Platform'
        }
      });

      if (!response.ok) {
        throw new Error(`World Bank API error: ${response.status}`);
      }

      const data = await response.json();
      
      // World Bank API returns [metadata, data] array
      if (Array.isArray(data) && data.length > 1) {
        return data[1].filter((item: WorldBankIndicator) => item.value !== null);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching World Bank education data:', error);
      return this.getFallbackIndicatorData(indicator, countries);
    }
  }

  /**
   * Get multiple education indicators for a country
   */
  async getCountryEducationProfile(countryCode: string): Promise<{
    country: string;
    indicators: Record<string, WorldBankIndicator[]>;
    lastUpdated: string;
  }> {
    try {
      const indicators = Object.values(WB_EDUCATION_INDICATORS);
      const educationData: Record<string, WorldBankIndicator[]> = {};

      // Fetch multiple indicators (in practice, you'd batch these requests)
      for (const indicator of indicators.slice(0, 5)) { // Limit to prevent too many requests
        const data = await this.getEducationIndicator(indicator, [countryCode]);
        educationData[indicator] = data;
        
        // Rate limiting
        await this.delay(100);
      }

      return {
        country: countryCode,
        indicators: educationData,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching country education profile:', error);
      return this.getFallbackCountryProfile(countryCode);
    }
  }

  /**
   * Get regional education comparisons
   */
  async getRegionalEducationComparison(region: string): Promise<{
    region: string;
    countries: string[];
    indicators: Record<string, any[]>;
    averages: Record<string, number>;
  }> {
    try {
      const regionCountries = this.getCountriesByRegion(region);
      const keyIndicators = [
        WB_EDUCATION_INDICATORS.LITERACY_RATE,
        WB_EDUCATION_INDICATORS.PRIMARY_COMPLETION,
        WB_EDUCATION_INDICATORS.EDUCATION_EXPENDITURE
      ];

      const indicators: Record<string, any[]> = {};
      const averages: Record<string, number> = {};

      for (const indicator of keyIndicators) {
        const data = await this.getEducationIndicator(indicator, regionCountries.slice(0, 10));
        indicators[indicator] = data;
        
        // Calculate regional average
        const validValues = data.filter(d => d.value !== null).map(d => d.value as number);
        averages[indicator] = validValues.length > 0 
          ? validValues.reduce((a, b) => a + b, 0) / validValues.length 
          : 0;
        
        await this.delay(100);
      }

      return {
        region,
        countries: regionCountries,
        indicators,
        averages
      };
    } catch (error) {
      console.error('Error fetching regional education comparison:', error);
      return this.getFallbackRegionalComparison(region);
    }
  }

  /**
   * Search for countries by education performance
   */
  async searchCountriesByEducationMetric(
    indicator: string,
    threshold: number,
    operator: 'above' | 'below' = 'above'
  ): Promise<WorldBankIndicator[]> {
    try {
      const data = await this.getEducationIndicator(indicator, ['all']);
      
      return data.filter(item => {
        if (item.value === null) return false;
        return operator === 'above' 
          ? item.value >= threshold 
          : item.value <= threshold;
      }).sort((a, b) => {
        const aVal = a.value || 0;
        const bVal = b.value || 0;
        return operator === 'above' ? bVal - aVal : aVal - bVal;
      });
    } catch (error) {
      console.error('Error searching countries by education metric:', error);
      return [];
    }
  }

  /**
   * Get education trends over time for visualization
   */
  async getEducationTrends(
    indicator: string,
    countries: string[],
    startYear: number = 2010,
    endYear: number = 2023
  ): Promise<{
    indicator: string;
    trends: Record<string, Array<{year: number, value: number}>>
  }> {
    try {
      const data = await this.getEducationIndicator(indicator, countries, startYear, endYear);
      const trends: Record<string, Array<{year: number, value: number}>> = {};

      // Group data by country
      data.forEach(item => {
        if (item.value !== null) {
          const country = item.country.value;
          if (!trends[country]) {
            trends[country] = [];
          }
          trends[country].push({
            year: parseInt(item.date),
            value: item.value
          });
        }
      });

      // Sort by year for each country
      Object.keys(trends).forEach(country => {
        trends[country].sort((a, b) => a.year - b.year);
      });

      return {
        indicator,
        trends
      };
    } catch (error) {
      console.error('Error fetching education trends:', error);
      return {
        indicator,
        trends: {}
      };
    }
  }

  /**
   * Fallback data methods
   */
  private getFallbackIndicatorData(indicator: string, countries: string[]): WorldBankIndicator[] {
    const fallbackValues: Record<string, number> = {
      [WB_EDUCATION_INDICATORS.LITERACY_RATE]: 85.3,
      [WB_EDUCATION_INDICATORS.PRIMARY_COMPLETION]: 89.7,
      [WB_EDUCATION_INDICATORS.SECONDARY_ENROLLMENT]: 67.2,
      [WB_EDUCATION_INDICATORS.EDUCATION_EXPENDITURE]: 4.8,
      [WB_EDUCATION_INDICATORS.PUPIL_TEACHER_PRIMARY]: 22.5
    };

    return countries.map(country => ({
      indicator: {
        id: indicator,
        value: this.getIndicatorName(indicator)
      },
      country: {
        id: country,
        value: this.getCountryName(country)
      },
      countryiso3code: country,
      date: '2022',
      value: fallbackValues[indicator] || 0,
      unit: this.getIndicatorUnit(indicator),
      obs_status: '',
      decimal: 1
    }));
  }

  private getFallbackCountryProfile(countryCode: string) {
    return {
      country: countryCode,
      indicators: {
        [WB_EDUCATION_INDICATORS.LITERACY_RATE]: this.getFallbackIndicatorData(
          WB_EDUCATION_INDICATORS.LITERACY_RATE, 
          [countryCode]
        )
      },
      lastUpdated: new Date().toISOString()
    };
  }

  private getFallbackRegionalComparison(region: string) {
    return {
      region,
      countries: this.getCountriesByRegion(region),
      indicators: {},
      averages: {
        [WB_EDUCATION_INDICATORS.LITERACY_RATE]: 82.4,
        [WB_EDUCATION_INDICATORS.PRIMARY_COMPLETION]: 87.1,
        [WB_EDUCATION_INDICATORS.EDUCATION_EXPENDITURE]: 4.6
      }
    };
  }

  /**
   * Helper methods
   */
  private getIndicatorName(indicator: string): string {
    const names: Record<string, string> = {
      [WB_EDUCATION_INDICATORS.LITERACY_RATE]: 'Adult Literacy Rate',
      [WB_EDUCATION_INDICATORS.PRIMARY_COMPLETION]: 'Primary Completion Rate',
      [WB_EDUCATION_INDICATORS.SECONDARY_ENROLLMENT]: 'Secondary Enrollment Rate',
      [WB_EDUCATION_INDICATORS.TERTIARY_ENROLLMENT]: 'Tertiary Enrollment Rate',
      [WB_EDUCATION_INDICATORS.EDUCATION_EXPENDITURE]: 'Education Expenditure (% of GDP)',
      [WB_EDUCATION_INDICATORS.PUPIL_TEACHER_PRIMARY]: 'Pupil-Teacher Ratio (Primary)'
    };
    return names[indicator] || indicator;
  }

  private getIndicatorUnit(indicator: string): string {
    const units: Record<string, string> = {
      [WB_EDUCATION_INDICATORS.LITERACY_RATE]: '%',
      [WB_EDUCATION_INDICATORS.PRIMARY_COMPLETION]: '%',
      [WB_EDUCATION_INDICATORS.SECONDARY_ENROLLMENT]: '%',
      [WB_EDUCATION_INDICATORS.EDUCATION_EXPENDITURE]: '% of GDP',
      [WB_EDUCATION_INDICATORS.PUPIL_TEACHER_PRIMARY]: 'ratio'
    };
    return units[indicator] || '';
  }

  private getCountryName(countryCode: string): string {
    const countryNames: Record<string, string> = {
      'US': 'United States',
      'GB': 'United Kingdom', 
      'CA': 'Canada',
      'AU': 'Australia',
      'FR': 'France',
      'DE': 'Germany',
      'JP': 'Japan',
      'CN': 'China',
      'IN': 'India',
      'BR': 'Brazil',
      'MX': 'Mexico',
      'ZA': 'South Africa',
      'NG': 'Nigeria',
      'EG': 'Egypt'
    };
    return countryNames[countryCode] || countryCode;
  }

  private getCountriesByRegion(region: string): string[] {
    const regionMap: Record<string, string[]> = {
      'africa': ['NG', 'ZA', 'EG', 'KE', 'MA', 'GH', 'TN', 'SN'],
      'asia': ['CN', 'IN', 'JP', 'KR', 'TH', 'VN', 'ID', 'MY'],
      'europe': ['DE', 'FR', 'GB', 'IT', 'ES', 'NL', 'SE', 'NO'],
      'americas': ['US', 'CA', 'BR', 'MX', 'AR', 'CO', 'CL', 'PE'],
      'middle_east': ['SA', 'AE', 'IL', 'TR', 'IR', 'IQ', 'JO'],
      'oceania': ['AU', 'NZ', 'FJ', 'PG', 'SB']
    };
    return regionMap[region.toLowerCase()] || [];
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const worldBankEducationApi = new WorldBankEducationApi();

// Export types and constants
export type { WorldBankIndicator, WorldBankEducationData };
export { WB_EDUCATION_INDICATORS };

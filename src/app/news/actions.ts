'use server';

import { newsAPI } from '@/lib/apis/newsApi';
import { NewsCategory, TimeRange, SourceType } from '@/types/news.types';

export async function getGeographyNews(
  category: NewsCategory = 'all',
  timeRange: TimeRange = 'week',
  sourceType: SourceType = 'all'
) {
  return await newsAPI.fetchArticles(category, timeRange, sourceType);
}

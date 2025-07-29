import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow major search engines and AI training bots
      {
        userAgent: [
          'Googlebot',
          'Bingbot', 
          'DuckDuckBot',
          'YandexBot',
          'Slurp', // Yahoo
          'facebookexternalhit',
          'LinkedInBot',
          'TwitterBot',
          'WhatsApp',
          'TelegramBot',
          'Applebot',
          'GPTBot', // OpenAI
          'Claude-Web', // Anthropic
          'ChatGPT-User', // OpenAI ChatGPT
          'CCBot', // Common Crawl (used by AI companies)
          'anthropic-ai', // Anthropic
          'Claude*', // Anthropic Claude variants
          'PerplexityBot', // Perplexity AI
          'YouBot', // You.com
          'Diffbot',
          'ia_archiver', // Internet Archive
        ],
        allow: '/',
        // Limit crawl rate for our API protection
        crawlDelay: 1,
      },
      // Block aggressive crawlers and scrapers that could abuse our free APIs
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot', 
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'YisouBot',
          'Sogou',
          'Baiduspider',
          'SeznamBot',
          'GrapeshotCrawler',
          'PetalBot',
          'ZoominfoBot',
          'DataForSeoBot',
          'MegaIndex',
          'SerpstatBot',
          'BingPreview',
          'CrawlerKengo',
          'SearchmetricsBot',
          'AlexaWebSearchPlatform',
          'AspiegelBot',
          'SafeDNSBot',
          'BacklinkCrawler',
          'SEOkicks',
          'spbot',
          'MojeekBot',
          'PingdomBot',
          'UptimeRobot',
          'Site24x7',
          'StatusCake',
          'Nimbostratus-Bot',
          'serpstatbot',
          'linkdexbot',
          'Moz',
          'OpenHoseBot',
          'seokicks-robot',
          'http_get',
          'PostmanRuntime',
          'curl',
          'wget',
          'python-requests',
          'Go-http-client',
          'HTTPie',
          'node-fetch',
          'axios',
          'got',
          'undici',
        ],
        disallow: '/',
      },
      // Block known content scrapers and copyright violators
      {
        userAgent: [
          'SiteSnagger',
          'WebZIP',
          'WebCopier',
          'Offline Explorer',
          'HTTrack',
          'Microsoft URL Control',
          'Xenu Link Sleuth',
          'larbin',
          'libwww',
          'lwp-trivial',
          'wget',
          'python-urllib',
          'Python-urllib',
          'libwww-perl',
          'httpunit',
          'nutch',
          'phpcrawl',
          'powermarks',
          'TwengaBot',
          'ltx71',
          'netseer',
          'URI::Fetch',
          'distill',
          'flunky',
          'proxem',
          'scan',
          'grab',
          'vat',
          'zeus',
          'bot@',
          'borg@',
          'mozilla@',
        ],
        disallow: '/',
      },
      // Special protection for API endpoints and sensitive areas
      {
        userAgent: '*',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '/*.json$',
          '/*.xml$',
          '/tmp/',
          '/cache/',
          '/logs/',
        ],
        // Add crawl delay for unknown bots to protect our APIs
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://humangeographymap.com/sitemap.xml',
    host: 'https://humangeographymap.com',
  };
}

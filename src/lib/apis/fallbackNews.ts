import { EducationalArticle, NewsCategory } from '@/types/news.types';

export const FALLBACK_ARTICLES: EducationalArticle[] = [
  {
    id: 'urban-heat-islands',
    title: "Understanding Urban Heat Islands: A Geographic Perspective",
    description: "Learn how cities create their own climate patterns and what this means for human geography studies.",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    source: {
      name: "Educational Content"
    },
    educationalValue: "high",
    geographyTopics: ["urban", "climate", "human-environment"],
    content: `Urban heat islands represent one of the most significant examples of human modification of local climate systems. This phenomenon occurs when urban areas experience significantly warmer temperatures than their surrounding rural areas.

**Key Geographic Concepts:**

**Formation Mechanisms:** Urban heat islands form through several interconnected processes. The replacement of natural land cover with concrete, asphalt, and buildings reduces evapotranspiration while increasing heat absorption. These materials have lower albedo (reflectivity) than natural surfaces, causing them to absorb more solar radiation during the day.

**Spatial Patterns:** The intensity of urban heat islands varies spatially within cities. Downtown areas with dense building coverage typically experience the strongest effects, while parks and green spaces create cooling oases. The magnitude can range from 1-5°C difference between urban and rural temperatures.

**Human Geography Implications:** Urban heat islands disproportionately affect vulnerable populations, including elderly residents, low-income communities often living in areas with less tree cover, and outdoor workers. This creates environmental justice concerns as heat-related health risks are not equally distributed across urban populations.

**Mitigation Strategies:** Geographers and urban planners have developed several approaches to reduce urban heat island effects:
- Increasing urban green space and tree canopy cover
- Implementing green roofs and walls on buildings
- Using light-colored or reflective materials for roofing and paving
- Designing urban layouts that promote air circulation

**Research Methodology:** Studying urban heat islands requires multiple geographic techniques including remote sensing to measure surface temperatures, meteorological stations for air temperature monitoring, and GIS analysis to correlate temperature patterns with land use.

This phenomenon demonstrates the fundamental geographic concept of human-environment interaction and highlights how human settlements actively modify local climate systems.`,
    estimatedReadTime: 4,
    difficulty: "student-friendly",
    relatedTopics: ["Climate Change", "Urban Planning", "Environmental Geography"],
    sources: [
      "EPA Urban Heat Island Resources",
      "American Meteorological Society",
      "Urban Climate Research"
    ]
  },
  {
    id: 'population-demographics',
    title: "Global Population Trends: Geographic Patterns and Future Implications",
    description: "Explore how population growth, aging, and migration are reshaping the world's geographic landscape.",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    source: {
      name: "Educational Content"
    },
    educationalValue: "high",
    geographyTopics: ["population", "demographics", "migration"],
    content: `Global population patterns reveal dramatic geographic shifts that will define the 21st century. Understanding these trends is essential for comprehending contemporary human geography.

**Current Global Patterns:**

**Population Growth Distribution:** While global population growth is slowing, it remains concentrated in specific regions. Sub-Saharan Africa accounts for over half of projected population growth through 2050, while Europe and East Asia face population decline.

**The Demographic Transition:** Different regions are at various stages of demographic transition. Many African countries remain in early stages with high birth and death rates, while developed nations have completed the transition with low birth and death rates.

**Geographic Implications of Aging:**

**Spatial Distribution:** Population aging is most pronounced in developed countries, with Japan, Italy, and Germany leading in median age. This creates distinct geographic patterns of dependency ratios and economic challenges.

**Urban vs. Rural Aging:** Rural areas often experience faster aging as young people migrate to cities for opportunities, leaving behind aging populations. This pattern is particularly evident in rural areas of China, Japan, and parts of the American Midwest.

**Migration as a Geographic Force:**

**Internal Migration:** Urbanization continues as the dominant migration pattern globally. By 2050, nearly 70% of the world's population will live in urban areas, with most growth occurring in Asia and Africa.

**International Migration:** Climate change, economic opportunities, and conflict drive international migration patterns. Geographic "hotspots" for out-migration include Central America, parts of Africa, and low-lying island nations facing sea-level rise.

**Future Geographic Implications:**

**Resource Distribution:** Population growth in water-stressed regions will intensify geographic conflicts over resource access. The Sahel region of Africa exemplifies this challenge.

**Economic Geography:** Labor shortages in aging societies may drive increased automation and immigration policies, while young populations in developing regions could provide demographic dividends if properly educated and employed.

**Research Methods:** Demographers and geographers use census data, satellite imagery to track urban growth, and mathematical models to project future population distributions and their geographic impacts.

These demographic patterns underscore the interconnected nature of population, resources, and geographic space in shaping human settlements and economic opportunities.`,
    estimatedReadTime: 5,
    difficulty: "general",
    relatedTopics: ["Demographics", "Migration", "Urbanization", "Economic Development"],
    sources: [
      "UN World Population Prospects",
      "World Bank Demographics Data",
      "Population Reference Bureau"
    ]
  },
  {
    id: 'climate-adaptation',
    title: "Climate Adaptation Strategies: Geographic Approaches to Environmental Change",
    description: "Examine how different regions are adapting to climate change through geographic planning and innovation.",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    source: {
      name: "Educational Content"
    },
    educationalValue: "high",
    geographyTopics: ["climate", "adaptation", "sustainability"],
    content: `Climate adaptation represents one of the most critical applications of geographic thinking in addressing environmental challenges. Different regions employ various strategies based on their unique geographic characteristics and vulnerabilities.

**Regional Adaptation Strategies:**

**Coastal Adaptations:** Low-lying coastal regions employ diverse geographic strategies. The Netherlands uses engineered solutions like sea walls and polders, while Bangladesh focuses on ecosystem-based adaptations including mangrove restoration and floating agriculture.

**Mountain Regions:** Alpine areas face glacial retreat and changing precipitation patterns. Switzerland and the Himalayas are developing early warning systems for glacial lake outburst floods and adapting water management systems to changing snowpack patterns.

**Arid and Semi-Arid Regions:** Desert regions are implementing water conservation technologies and drought-resistant agriculture. Israel's drip irrigation and Australia's water recycling demonstrate how geographic constraints can drive innovation.

**Urban Adaptation Strategies:**

**Heat Management:** Cities worldwide are implementing cooling strategies appropriate to their geographic context. Singapore uses vertical gardens, while Mediterranean cities focus on light-colored surfaces and strategic green space placement.

**Flood Management:** Coastal cities like Miami are raising roads and installing pumps, while river cities like Rotterdam are creating "room for the river" by designing floodable public spaces.

**Geographic Factors Influencing Adaptation:**

**Topography:** Mountainous regions can relocate vulnerable populations to higher elevations, while flat coastal areas must rely on engineering solutions or managed retreat.

**Economic Geography:** Wealthy regions can afford expensive technological solutions, while developing regions often rely on traditional knowledge and ecosystem-based adaptations.

**Cultural Geography:** Indigenous communities often possess traditional ecological knowledge valuable for climate adaptation, as seen in Arctic communities adapting to changing ice patterns.

**Innovation and Technology Transfer:**

**Geographic Diffusion:** Successful adaptation technologies spread geographically through knowledge networks. Dutch water management expertise is being applied in Miami, Jakarta, and Bangladesh.

**Scale Considerations:** Adaptation strategies must consider multiple geographic scales, from household-level rainwater harvesting to regional watershed management.

**Research Applications:** Geographic Information Systems (GIS) help identify vulnerable populations and optimal locations for adaptation infrastructure. Remote sensing monitors the effectiveness of ecosystem-based adaptations over time.

Understanding climate adaptation through a geographic lens reveals how location, scale, and local context shape the most effective responses to environmental change.`,
    estimatedReadTime: 6,
    difficulty: "academic",
    relatedTopics: ["Climate Change", "Sustainability", "Urban Planning", "Environmental Policy"],
    sources: [
      "IPCC Adaptation Reports",
      "UN-Habitat Urban Resilience",
      "Climate Adaptation Research"
    ]
  },
  {
    id: 'economic-globalization',
    title: "Economic Globalization and Geographic Inequality",
    description: "Analyze how global economic integration creates new patterns of geographic advantage and disadvantage.",
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    source: {
      name: "Educational Content"
    },
    educationalValue: "high",
    geographyTopics: ["economics", "globalization", "inequality"],
    content: `Economic globalization has fundamentally altered the geographic distribution of economic activities, creating new patterns of prosperity and disadvantage across different scales of analysis.

**Global Economic Geography Shifts:**

**Production Networks:** Manufacturing has shifted from developed to developing countries, creating global value chains. Electronics assembled in China may contain components from dozens of countries, illustrating the geographic fragmentation of production.

**Service Economy Geography:** High-value services remain concentrated in global cities like London, New York, and Tokyo, while routine services can be outsourced to locations with lower labor costs, such as call centers in India or the Philippines.

**Regional Impacts of Globalization:**

**Developed Country Deindustrialization:** The American Rust Belt and northern England experienced economic decline as manufacturing moved to lower-cost locations. This demonstrates how globalization can create geographic winners and losers within countries.

**Emerging Economy Development:** Countries like South Korea, Taiwan, and more recently Vietnam have used export-oriented manufacturing to achieve rapid economic development, showing how geographic positioning in global value chains affects national outcomes.

**Urban vs. Rural Divides:** Globalization often benefits urban areas more than rural regions. Global cities attract international investment and high-skilled workers, while rural areas may lose traditional industries without gaining new opportunities.

**Geographic Factors in Economic Competitiveness:**

**Location Advantages:** Access to ports, airports, and transportation networks provides geographic advantages in the global economy. Singapore's strategic location has made it a major shipping and financial hub.

**Labor Geography:** Different regions offer different combinations of labor costs, skills, and productivity. Bangladesh excels in low-cost textile production, while Germany specializes in high-precision manufacturing.

**Knowledge Clusters:** Geographic concentrations of expertise create competitive advantages. Silicon Valley for technology, Hollywood for entertainment, and the City of London for finance demonstrate how specialized economic activities cluster geographically.

**Inequality Implications:**

**Within-Country Inequality:** Globalization can increase income inequality within countries as high-skilled workers in globally connected industries see wage gains while low-skilled workers face competition from abroad.

**Between-Country Convergence:** Some developing countries have achieved rapid growth through global integration, reducing international inequality even as within-country inequality may increase.

**Geographic Mobility and Opportunity:** Economic opportunities are increasingly concentrated in specific locations, making geographic mobility crucial for economic advancement but also creating brain drain from peripheral regions.

**Policy Responses:**

**Regional Development:** Governments attempt to spread globalization's benefits through regional development policies, infrastructure investment, and education programs.

**Trade Policies:** Countries negotiate trade agreements that consider geographic factors, such as rules of origin that specify where products must be manufactured.

Understanding economic globalization through a geographic lens reveals how location, connectivity, and spatial relationships shape economic opportunities and outcomes in an interconnected world.`,
    estimatedReadTime: 7,
    difficulty: "academic",
    relatedTopics: ["Economic Geography", "Development", "Trade", "Urbanization"],
    sources: [
      "World Trade Organization",
      "World Bank Development Indicators",
      "Economic Geography Journals"
    ]
  },
  {
    id: 'sustainable-cities',
    title: "Sustainable Urban Development: Geographic Approaches to Green Cities",
    description: "Discover how cities worldwide are using geographic planning to create more sustainable urban environments.",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    source: {
      name: "Educational Content"
    },
    educationalValue: "high",
    geographyTopics: ["urban", "sustainability", "planning"],
    content: `Sustainable urban development requires understanding how geographic factors influence city design, resource flows, and environmental impacts. Cities worldwide are implementing innovative approaches that work with rather than against their geographic contexts.

**Geographic Principles of Sustainable Cities:**

**Compact Urban Form:** Cities like Copenhagen and Singapore promote high-density, mixed-use development that reduces transportation needs and preserves surrounding natural areas. This geographic concentration allows for efficient public transportation and district energy systems.

**Green Infrastructure Networks:** Cities are creating connected networks of parks, green corridors, and natural areas that provide ecosystem services while managing stormwater and urban heat. Portland's green streets and Seoul's stream restoration demonstrate different approaches to green infrastructure.

**Climate-Responsive Design:** Sustainable cities adapt their design to local climate conditions. Mediterranean cities emphasize cooling strategies and water conservation, while Nordic cities focus on energy efficiency and snow management.

**Regional Resource Management:**

**Watershed Thinking:** Sustainable cities consider their broader geographic context, particularly their water sources and waste destinations. New York City's watershed protection program preserves water quality across a large geographic area upstate.

**Food Systems Geography:** Cities are shortening food supply chains through urban agriculture, regional food networks, and farmers markets. This reduces transportation emissions while supporting regional agricultural economies.

**Circular Economy Geography:** Cities are designing industrial ecosystems where waste from one process becomes input for another. Kalundborg, Denmark, created an industrial symbiosis where companies share steam, water, and materials across a geographic cluster.

**Transportation Geography:**

**Transit-Oriented Development:** Cities like Hong Kong and Bogotá design urban development around public transportation nodes, creating dense, walkable neighborhoods with easy access to mobility networks.

**Active Transportation Networks:** Copenhagen and Amsterdam have created comprehensive bicycle networks that provide safe, efficient transportation while reducing emissions and improving public health.

**Smart Mobility Systems:** Cities are using geographic information systems to optimize transportation flows, from ride-sharing algorithms to adaptive traffic signals that respond to real-time conditions.

**Energy Geography:**

**Distributed Energy Systems:** Cities are moving from centralized power plants to distributed networks of renewable energy. Germany's Energiewende includes thousands of local solar and wind installations connected through smart grids.

**District Energy Systems:** Northern European cities use geographic clustering to share heating and cooling through district energy networks, often powered by waste heat or renewable sources.

**Innovation and Knowledge Transfer:**

**Global City Networks:** Organizations like C40 Cities and ICLEI facilitate knowledge sharing between cities facing similar geographic challenges. Solutions developed in one location can be adapted to similar geographic contexts elsewhere.

**Living Laboratories:** Cities are becoming testing grounds for sustainable technologies, with specific neighborhoods or districts serving as demonstration sites for innovations that can be scaled up geographically.

**Measuring Success:** Geographic indicators like carbon emissions per capita, green space per resident, and transit accessibility help cities track progress toward sustainability goals and compare performance with other cities in similar geographic contexts.

Sustainable urban development demonstrates how geographic thinking can guide cities toward more environmentally responsible and livable futures.`,
    estimatedReadTime: 6,
    difficulty: "general",
    relatedTopics: ["Urban Planning", "Sustainability", "Transportation", "Climate Action"],
    sources: [
      "UN-Habitat Sustainable Cities",
      "C40 Cities Climate Leadership",
      "ICLEI Local Governments"
    ]
  }
];

export const CATEGORY_MAPPING: Record<NewsCategory, string[]> = {
  'all': [],
  'climate-environment': ['climate change', 'environmental geography', 'sustainability', 'global warming'],
  'urban-development': ['urban development', 'urbanization', 'city planning', 'smart cities'],
  'population-migration': ['population growth', 'migration patterns', 'demographic trends', 'immigration'],
  'economic-geography': ['economic geography', 'globalization', 'trade patterns', 'development'],
  'cultural-geography': ['cultural geography', 'cultural diversity', 'social geography', 'human settlements'],
  'educational-resources': ['geography education', 'teaching geography', 'educational content']
};

export function getFallbackArticlesByCategory(category: NewsCategory): EducationalArticle[] {
  if (category === 'all') {
    return FALLBACK_ARTICLES;
  }
  
  const keywords = CATEGORY_MAPPING[category] || [];
  
  return FALLBACK_ARTICLES.filter(article => 
    article.geographyTopics?.some(topic => 
      keywords.some(keyword => 
        topic.toLowerCase().includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(topic.toLowerCase())
      )
    ) ||
    keywords.some(keyword =>
      article.title.toLowerCase().includes(keyword.toLowerCase()) ||
      article.description.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

export const ERROR_MESSAGES = {
  all: "Here are some educational geography articles while we load the latest news.",
  rate_limit: "We've reached our daily news limit. Showing educational articles instead.",
  api_error: "News service temporarily unavailable. Here are some educational geography articles.",
  network: "Unable to connect to news service. Here are some educational geography articles.",
  no_content: "No recent news found. Here are some educational geography articles."
};

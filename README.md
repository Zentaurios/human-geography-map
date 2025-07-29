# 🌍 Human Geography Map - Interactive World Explorer

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Educational%20Use-green)](LICENSE)

> *"The goal here isn't just to help people learn human geography—it's to teach young adults how to teach themselves."*

An interactive educational platform that teaches self-directed learning through human geography. Built as a father-son project to demonstrate how proper research methodology, combined with modern technology, can create powerful educational tools.

## 🎯 **Mission & Educational Philosophy**

### Teaching Self-Teaching
This platform embodies a **research-first educational philosophy**: we believe students must master fundamental research skills before leveraging AI and advanced technology. The goal isn't just geography knowledge—it's developing intellectual independence and lifelong learning capabilities.

### Core Principles
- **🔍 Research Methodology First**: Source evaluation, critical thinking, and information synthesis
- **🧠 Intellectual Independence**: Avoiding over-dependence on AI for basic research tasks  
- **📚 Traditional Skills Foundation**: Building strong analytical capabilities before technological enhancement
- **🚀 Technology as Amplifier**: Using AI and modern tools to enhance, not replace, human thinking

## ✨ **Features**

### 🗺️ **Interactive World Map**
- **Dynamic Country Exploration**: Click any country for detailed information
- **Continent-Based Navigation**: Organized browsing by geographic regions
- **Responsive Design**: Seamless experience on desktop and mobile devices
- **Real-time Data Integration**: Live information from multiple educational APIs

### 📊 **Comprehensive Country Data**
- **Demographics & Statistics**: Population, area, capital cities, languages
- **Economic Indicators**: World Bank development data and economic metrics
- **Geographic Information**: Coordinates, borders, timezones, regional classification
- **Cultural Context**: Wikipedia summaries and historical background

### 📰 **Educational Resources Hub**
- **Curated News**: Geography-relevant current events and developments
- **Academic Research**: Scholarly articles from educational databases
- **UNESCO Data**: Educational statistics and cultural heritage information
- **Learning Materials**: Structured resources for AP Human Geography students

### 🎓 **Educational Tools**
- **Search & Discovery**: Find countries, topics, and resources efficiently
- **Comparative Analysis**: Side-by-side country comparisons
- **Data Visualization**: Charts and graphs for statistical understanding
- **Mobile-Optimized**: Learn anywhere, anytime

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zentaurios/human-geography-map.git
   cd human-geography-map
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your API keys (see [API Configuration](#api-configuration))

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### API Configuration

Create a `.env.local` file with the following variables:

```env
# Optional: Custom base URL for metadata
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# News API (Optional - free tier available)
NEWS_API_KEY=your_news_api_key_here

# Other API keys as needed
```

## 🛠️ **Tech Stack**

### **Core Framework**
- **[Next.js 15.4.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development

### **Mapping & Visualization**
- **[React-Leaflet 5.0](https://react-leaflet.js.org/)** - Interactive mapping components
- **[Leaflet](https://leafletjs.com/)** - Mobile-friendly interactive maps
- **[Recharts](https://recharts.org/)** - Data visualization and charting

### **UI & Styling**
- **[TailwindCSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### **Data Management**
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Lodash-ES](https://lodash.com/)** - Utility library for data manipulation

## 🌐 **Data Sources & APIs**

Our platform integrates multiple free, high-quality educational APIs:

### **Geographic Data**
- **[REST Countries API](https://restcountries.com/)** - Comprehensive country information
- **[Natural Earth Data](https://www.naturalearthdata.com/)** - Free vector and raster map data

### **Educational & Research Data**
- **[World Bank Open Data](https://data.worldbank.org/)** - Global development indicators
- **[UNESCO Institute for Statistics](https://uis.unesco.org/)** - Educational and cultural data
- **[OpenAlex](https://openalex.org/)** - Open scholarly publications
- **[Wikipedia API](https://www.mediawiki.org/wiki/API)** - Encyclopedic content

### **News & Current Events**
- **[NewsAPI](https://newsapi.org/)** - Geography-relevant current events (free tier)

## 📁 **Project Structure**

```
human-geography-map/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── country/           # Country detail pages
│   │   ├── about/             # About page
│   │   ├── news/              # News hub
│   │   └── research/          # Research tools
│   ├── components/            # Reusable React components
│   │   ├── layout/           # Layout components
│   │   ├── map/              # Map-related components
│   │   └── ui/               # UI primitives
│   ├── lib/                   # Utilities and configurations
│   │   ├── api/              # API integration layers
│   │   ├── providers/        # React context providers
│   │   └── utils/            # Helper functions
│   ├── types/                 # TypeScript type definitions
│   └── data/                  # Static data and constants
├── public/                    # Static assets
├── context-repository/        # 📚 Complete documentation
│   ├── progress-tracker.md   # Development progress
│   ├── project-context.md    # Requirements & architecture
│   └── prompts/              # Development prompts
└── package.json              # Dependencies and scripts
```

## 🗺️ **Roadmap: Four Years of Educational Innovation**

This human geography platform is the first in a planned series of educational applications. Over the next four years, we plan to develop similar platforms for:

### **Year 1-2: Geography & History Foundation**
- **🌍 Enhanced Human Geography**: Advanced demographic analysis, migration patterns
- **🏛️ World History**: Interactive timelines with geographic connections
- **🗺️ Physical Geography**: Terrain, climate, and environmental patterns

### **Year 3-4: Government & Specialized Topics**
- **🏛️ US History**: Regional development and westward expansion
- **⚖️ Government & Politics**: Electoral geography and policy visualization
- **📊 Economics**: Global trade patterns and economic geography

### **Long-term Vision**
- Comprehensive assessment tools
- Multilingual support
- Offline capabilities
- Advanced data visualization

## 🎓 **Educational Use Cases**

### **For Students**
- **AP Human Geography** preparation and study aid
- **Research methodology** learning and practice
- **Current events** connection to geographic concepts
- **Self-directed learning** skill development

### **For Educators**
- **Interactive teaching tool** for geography lessons
- **Research assignment** framework and examples
- **Student engagement** through interactive exploration
- **Curriculum enhancement** with real-world data

### **For Lifelong Learners**
- **Global awareness** development
- **Cultural understanding** through geographic context
- **News comprehension** with geographic background
- **Personal enrichment** and curiosity satisfaction

## 🤝 **Contributing**

We welcome contributions that align with our educational mission! Here's how you can help:

### **Areas for Contribution**
- 📝 **Content**: Educational resources, lesson plans, study guides
- 🐛 **Bug Fixes**: Improvements to functionality and user experience
- 🆕 **Features**: New educational tools and interactive elements
- 🌐 **Translations**: Making the platform accessible to more students
- 📚 **Documentation**: Helping others understand and use the platform

### **Contribution Guidelines**
1. **Educational Focus**: All contributions should enhance learning outcomes
2. **Research Quality**: Maintain high standards for data sources and accuracy
3. **Accessibility**: Ensure features work for users with different abilities
4. **Performance**: Keep the platform fast and responsive
5. **Code Quality**: Follow TypeScript and React best practices

### **Getting Started with Contributions**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing educational feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request with detailed description

## 📜 **License & Usage**

This project is dedicated to **educational use** and non-commercial purposes. We believe in making quality educational tools accessible to students and educators worldwide.

### **Permitted Uses**
- ✅ Educational and research purposes
- ✅ Classroom instruction and learning
- ✅ Personal study and exploration
- ✅ Non-commercial educational projects

### **API Terms**
Please respect the terms of service for all integrated APIs:
- Most APIs used are free for educational purposes
- Some services have rate limits on free tiers
- Commercial use may require upgraded API plans

## 🙏 **Acknowledgments**

### **Educational Philosophy Inspiration**
- The importance of teaching students **how to learn**
- Research methodology as foundation for intellectual independence
- Technology as enhancement, not replacement, for human thinking

### **Open Source Community**
- **Next.js Team** for the incredible React framework
- **Leaflet Contributors** for open-source mapping solutions
- **API Providers** for making educational data freely accessible
- **Open Source Maintainers** for the tools that make this possible

### **Educational Data Providers**
Special thanks to organizations providing free educational APIs:
- **World Bank** for global development data
- **UNESCO** for educational and cultural statistics  
- **Natural Earth** for geographic data
- **REST Countries** for comprehensive country information

## 📞 **Contact & Support**

### **Questions or Suggestions?**
- 📧 **Project Issues**: Use GitHub Issues for bug reports and feature requests
- 💡 **Educational Ideas**: Share your teaching experiences and suggestions
- 🤝 **Collaboration**: Reach out for educational partnerships

### **Educational Mission**
*"The more we can teach people to teach themselves, the more they discover not just what they can learn, but who they can truly become."*

---

**Built with ❤️ by a father-son team committed to educational excellence and lifelong learning.**

---

*This README reflects our commitment to transparency, educational value, and the belief that the best technology serves to amplify human potential rather than replace human thinking.*

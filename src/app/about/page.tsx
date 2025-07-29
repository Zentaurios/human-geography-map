
import { Metadata } from 'next';
import { ArrowLeft, Heart, ExternalLink, BookOpen, Users, Globe, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - Human Geography Learning Platform | Educational Philosophy & Mission',
  description: 'Learn about our father-son educational journey, our mission to teach self-directed learning through human geography, and our philosophy of research-first education enhanced by technology.',
  keywords: [
    'educational philosophy',
    'self-directed learning',
    'human geography education',
    'father-son project',
    'research methodology',
    'educational technology',
    'learning independence',
    'AP human geography',
    'educational mission',
    'geography teaching'
  ],
  openGraph: {
    title: 'About Our Educational Mission - Human Geography Learning Platform',
    description: 'Discover our father-son journey creating educational tools that teach research methodology and self-directed learning through human geography.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Human Geography Learning Platform',
    description: 'Our educational philosophy: teach research methodology first, then enhance with technology for independent learning.',
  },
};

interface ServiceLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const ServiceLink = ({ href, children, external = true }: ServiceLinkProps) => (
  <Link 
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="inline-flex items-center gap-1 text-blue-600 underline transition-colors hover:text-blue-800 decoration-blue-200 hover:decoration-blue-400"
  >
    {children}
    {external && <ExternalLink className="w-3 h-3" />}
  </Link>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with Back to Map */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl px-4 py-6 mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 mb-4 transition-colors text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Interactive Map
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-slate-900">About This Project</h1>
          <p className="text-xl text-slate-600">A father-son journey in education and technology</p>
        </div>
      </header>

      <main className="max-w-4xl px-4 py-8 mx-auto space-y-12">
        
        {/* Origin Story Section */}
        <section className="p-8 bg-white border rounded-lg shadow-sm border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-semibold text-slate-900">The Origin Story: A Father-Son Learning Adventure</h2>
          </div>
          
          <div className="space-y-4 prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-slate-700">
              This platform was inspired by a summer homework assignment and evolved into something much greater. While my son was working on his first AP Human Geography assignment for his freshman year of high school, I saw an opportunity to do more than just help him complete homework—I saw a chance to teach him how to learn.
            </p>
            
            <p className="text-slate-600">
              As a self-taught full-stack developer who uses AI daily for research and development, I understand the power of technology in education. My background in history, economics, business management, and education has taught me that the most valuable skill we can give young people isn't just knowledge—it's the ability to acquire knowledge independently.
            </p>
            
            <p className="text-slate-600">
              What started as a project to help my son access better resources for human geography has become a mission to help anyone interested in the field, whether for educational requirements or personal curiosity.
            </p>
          </div>
        </section>

        {/* Educational Philosophy Section */}
        <section className="p-8 border border-blue-200 rounded-lg bg-blue-50">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-slate-900">Our Educational Philosophy: Teaching Self-Teaching</h2>
          </div>
          
          <div className="p-4 mb-6 bg-blue-100 border-l-4 border-blue-400">
            <p className="text-lg font-medium text-blue-900">
              The goal here isn't just to help people learn human geography—it's to teach young adults how to teach themselves.
            </p>
          </div>
          
          <p className="mb-6 text-slate-700">
            Learning how to conduct quality research is a fundamental skill for any educational or professional endeavor. This isn't just about succeeding in human geography; it's about learning to succeed as a human being in an increasingly complex world.
          </p>

          {/* Research Principles */}
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 bg-white border border-blue-200 rounded-lg">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Research as Practice</h3>
              <p className="mb-4 text-slate-600">
                Without learning traditional research methods first, intellectual independence can be compromised by over-reliance on enhanced technology.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Source evaluation skills</li>
                <li>• Critical thinking development</li>
                <li>• Information synthesis</li>
                <li>• Question formulation</li>
              </ul>
            </div>
            
            <div className="p-6 bg-white border border-blue-200 rounded-lg">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">The Dependency Trap</h3>
              <p className="mb-4 text-slate-600">
                Over-reliance on AI for basic research tasks can lead to:
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Intellectual atrophy</li>
                <li>• Surface-level understanding</li>
                <li>• Reduced creativity</li>
                <li>• Weakened analytical skills</li>
              </ul>
            </div>
          </div>

          {/* AI Enhancement */}
          <div className="p-6 border border-green-200 rounded-lg bg-green-50">
            <h3 className="flex items-center gap-2 mb-3 text-lg font-semibold text-slate-900">
              <Lightbulb className="w-5 h-5 text-green-600" />
              The Enhancement Phase: AI as an Educational Multiplier
            </h3>
            <p className="mb-4 text-slate-700">
              After mastering fundamental research principles, AI becomes a powerful educational amplifier for rapid hypothesis testing, complex data analysis, diverse perspective generation, and interactive learning.
            </p>
            <p className="text-sm font-medium text-green-800">
              The key is ensuring AI enhances human capability rather than replacing human thinking.
            </p>
          </div>
        </section>

        {/* Technical Journey Section */}
        <section className="p-8 bg-white border rounded-lg shadow-sm border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-slate-900">Our Technical Journey: From Research to Reality</h2>
          </div>
          
          <p className="mb-8 text-slate-700">
            Our research-first approach led us to discover the wealth of free, high-quality APIs available for educational use. This project serves as a real-world example of how proper research methodology—combined with technical skills—can create valuable educational resources.
          </p>

          {/* Services Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Data Sources</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Geographic Data:</strong>
                  <ul className="mt-1 ml-4 space-y-1">
                    <li>• <ServiceLink href="https://www.naturalearthdata.com/">Natural Earth Data</ServiceLink> - Free vector and raster map data</li>
                    <li>• <ServiceLink href="https://restcountries.com/">REST Countries API</ServiceLink> - Comprehensive country information</li>
                  </ul>
                </div>
                
                <div>
                  <strong>Educational Data:</strong>
                  <ul className="mt-1 ml-4 space-y-1">
                    <li>• <ServiceLink href="https://data.worldbank.org/">World Bank Open Data</ServiceLink> - Global development data</li>
                    <li>• <ServiceLink href="https://uis.unesco.org/">UNESCO Institute for Statistics</ServiceLink> - Educational data</li>
                    <li>• <ServiceLink href="https://openalex.org/">OpenAlex</ServiceLink> - Scholarly publications</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Technical Infrastructure</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Core Platform:</strong>
                  <ul className="mt-1 ml-4 space-y-1">
                    <li>• <ServiceLink href="https://nextjs.org/">Next.js</ServiceLink> - React framework</li>
                    <li>• <ServiceLink href="https://vercel.com/">Vercel</ServiceLink> - Deployment platform</li>
                    <li>• <ServiceLink href="https://react-leaflet.js.org/">React-Leaflet</ServiceLink> - Interactive mapping</li>
                  </ul>
                </div>
                
                <div>
                  <strong>Design & UI:</strong>
                  <ul className="mt-1 ml-4 space-y-1">
                    <li>• <ServiceLink href="https://tailwindcss.com/">TailwindCSS</ServiceLink> - Utility-first CSS</li>
                    <li>• <ServiceLink href="https://www.radix-ui.com/">Radix UI</ServiceLink> - Accessible components</li>
                    <li>• <ServiceLink href="https://lucide.dev/">Lucide React</ServiceLink> - Icon library</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sustainability Note */}
          <div className="p-6 mt-8 border rounded-lg bg-amber-50 border-amber-200">
            <h3 className="mb-4 text-lg font-semibold text-amber-900">Sustainability and Future Growth</h3>
            <p className="mb-4 text-sm text-amber-800">
              Currently, our news integration uses the free tier of NewsAPI, which provides limited daily requests. Based on user adoption and educational impact, we may seek grants and fundraising opportunities to:
            </p>
            <ul className="mb-6 ml-4 space-y-1 text-sm text-amber-800">
              <li>• Upgrade to premium API services for enhanced content</li>
              <li>• Expand geographic data coverage and real-time updates</li>
              <li>• Add more interactive learning features</li>
              <li>• Develop comprehensive assessment tools</li>
            </ul>
            
            <div className="pt-4 border-t border-amber-300">
              <h4 className="mb-3 font-semibold text-amber-900">AI Integration: Proceed with Extreme Caution</h4>
              <p className="mb-3 text-sm text-amber-800">
                While AI tutoring and personalized learning assistants could enhance this platform, the costs and potential for abuse must be heavily weighted against any benefits:
              </p>
              
              <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div className="p-3 border border-red-200 rounded bg-red-50">
                  <h5 className="mb-2 text-sm font-medium text-red-900">Significant Costs</h5>
                  <ul className="space-y-1 text-xs text-red-800">
                    <li>• Premium AI API costs ($100s-$1000s monthly)</li>
                    <li>• Content moderation and safety systems</li>
                    <li>• Legal liability and privacy compliance</li>
                    <li>• Ongoing monitoring and quality control</li>
                  </ul>
                </div>
                
                <div className="p-3 border border-red-200 rounded bg-red-50">
                  <h5 className="mb-2 text-sm font-medium text-red-900">Abuse Potential</h5>
                  <ul className="space-y-1 text-xs text-red-800">
                    <li>• Students bypassing fundamental learning</li>
                    <li>• Academic dishonesty and cheating</li>
                    <li>• Over-dependence undermining self-teaching</li>
                    <li>• Misinformation or biased AI responses</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-sm font-medium text-amber-900">
                Any AI integration would require extensive safeguards, clear educational boundaries, and substantial funding to implement responsibly—if at all.
              </p>
            </div>
          </div>
        </section>

        {/* Future Plans Section */}
        <section className="p-8 border border-purple-200 rounded-lg bg-purple-50">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-slate-900">The Roadmap: Four Years of Educational Innovation</h2>
          </div>
          
          <p className="mb-6 text-slate-700">
            This human geography platform is just the beginning. Over the next four years, as my son progresses through high school, we plan to develop similar educational applications for:
          </p>
          
          <div className="grid gap-4 mb-6 md:grid-cols-2">
            <div className="p-4 bg-white border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-slate-900">Human Geography</h4>
              <p className="text-sm text-slate-600">Enhanced interactive mapping with demographic patterns, migration flows, and cultural landscape analysis</p>
            </div>
            <div className="p-4 bg-white border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-slate-900">World History</h4>
              <p className="text-sm text-slate-600">Interactive timelines connecting geographic regions with historical events and civilizations</p>
            </div>
            <div className="p-4 bg-white border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-slate-900">US History</h4>
              <p className="text-sm text-slate-600">Regional development patterns, westward expansion, and the geographic foundations of American history</p>
            </div>
            <div className="p-4 bg-white border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-slate-900">Government and Politics</h4>
              <p className="text-sm text-slate-600">Electoral geography, policy impact visualization, and democratic participation across different regions</p>
            </div>
          </div>
          
          <p className="font-medium text-purple-800">
            Each application will maintain our core philosophy: teach the research process first, then enhance with technology.
          </p>
        </section>

        {/* Closing Quote Section */}
        <section className="p-8 text-center text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
          <blockquote className="mb-4 text-2xl italic font-light">
            "The more we can teach people to teach themselves, the more they discover not just what they can learn, but who they can truly become."
          </blockquote>
          <p className="text-blue-100">
            Because the greatest geography lesson isn't about the world around us—it's about discovering the infinite landscape of human potential within us.
          </p>
        </section>

        {/* Call to Action */}
        <section className="p-8 text-center bg-white border rounded-lg shadow-sm border-slate-200">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">Join Our Mission</h2>
          <p className="max-w-2xl mx-auto mb-6 text-slate-600">
            Whether you're a student tackling AP Human Geography, an educator seeking interactive tools, or simply someone curious about our world's human patterns, we hope this platform serves your learning journey.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Globe className="w-5 h-5" />
            Start Exploring the Interactive Map
          </Link>
        </section>
      </main>
    </div>
  );
}
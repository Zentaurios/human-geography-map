'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Country, ExternalResources } from '@/types/country.types';
import { generateExternalLinks } from '@/lib/utils/country-links';

interface ExternalResourcesSectionProps {
      country: Country;
      className?: string;
    
}

export function ExternalResourcesSection({ country, className = '' }: ExternalResourcesSectionProps) {
      const [isExpanded, setIsExpanded] = useState(false);
      const externalLinks = generateExternalLinks(country);
    
      const handleLinkClick = (url: string, category: string, type: string) => {
        // Analytics tracking could go here
     console.log(`External link clicked: ${category} - ${type} for ${country.name}`);
     window.open(url, '_blank', 'noopener,noreferrer');
   };
 
   const LinkItem = ({ href, children, category, type }: { 
     href: string; 
     children: React.ReactNode; 
     category: string;
     type: string;
   }) => (
     <button
       onClick={() => handleLinkClick(href, category, type)}
       className="flex items-center justify-between w-full p-2 text-left transition-colors rounded-lg hover:bg-slate-50 group"
     >
       <span className="text-sm text-slate-700 group-hover:text-slate-900">
         {children}
       </span>
       <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
     </button>
   );
 
   const CategorySection = ({ 
     title, 
     icon, 
     children 
   }: { 
     title: string; 
     icon: React.ReactNode; 
     children: React.ReactNode; 
   }) => (
     <div className="space-y-2">
       <div className="flex items-center gap-2 mb-2">
         {icon}
         <h4 className="text-sm font-medium text-slate-900">{title}</h4>
       </div>
       <div className="pl-6 space-y-1">
         {children}
       </div>
     </div>
   );
 
   return (
     <Card className={className}>
       <CardHeader className="pb-3">
         <CardTitle 
           className="flex items-center justify-between text-lg cursor-pointer"
           onClick={() => setIsExpanded(!isExpanded)}
         >
           <span className="flex items-center gap-2">
             <ExternalLink className="w-5 h-5" />
             External Resources
           </span>
           {isExpanded ? (
             <ChevronDown className="w-4 h-4 text-slate-500" />
           ) : (
             <ChevronRight className="w-4 h-4 text-slate-500" />
           )}
         </CardTitle>
       </CardHeader>
       
       {isExpanded && (
         <CardContent className="space-y-4">
           {/* Official Resources */}
           <CategorySection 
             title="Official Resources" 
             icon={<span className="text-lg">🏛️</span>}
           >
             <LinkItem 
               href={externalLinks.official.government} 
               category="Official" 
               type="Government"
             >
               Government Website
             </LinkItem>
             <LinkItem 
               href={externalLinks.official.tourism} 
               category="Official" 
               type="Tourism"
             >
               Tourism Board
             </LinkItem>
             <LinkItem 
               href={externalLinks.official.wikipedia} 
               category="Official" 
               type="Wikipedia"
             >
               Wikipedia
             </LinkItem>
           </CategorySection>
 
           {/* Education & Culture */}
           <CategorySection 
             title="Education & Culture" 
             icon={<span className="text-lg">📚</span>}
           >
             {externalLinks.education.universities.length > 0 ? (
               externalLinks.education.universities.map((url, index) => (
                 <LinkItem 
                   key={index} 
                   href={url} 
                   category="Education" 
                   type="University"
                 >
                   University {index + 1}
                 </LinkItem>
               ))
             ) : (
               <div className="py-2 text-xs text-slate-500">
                 University data coming soon
               </div>
             )}
             {externalLinks.education.unesco.length > 0 ? (
               externalLinks.education.unesco.map((url, index) => (
                 <LinkItem 
                   key={index} 
                   href={url} 
                   category="Education" 
                   type="UNESCO"
                 >
                   UNESCO Site {index + 1}
                 </LinkItem>
               ))
             ) : (
               <div className="py-2 text-xs text-slate-500">
                 UNESCO sites data coming soon
               </div>
             )}
             {externalLinks.education.museums.length > 0 ? (
               externalLinks.education.museums.map((url, index) => (
                 <LinkItem 
                   key={index} 
                   href={url} 
                   category="Education" 
                   type="Museum"
                 >
                   Museum {index + 1}
                 </LinkItem>
               ))
             ) : (
               <div className="py-2 text-xs text-slate-500">
                 Museums data coming soon
               </div>
             )}
           </CategorySection>
 
           {/* Economy & Trade */}
           <CategorySection 
             title="Economy & Trade" 
             icon={<span className="text-lg">💼</span>}
           >
             <LinkItem 
               href={externalLinks.economy.chamberOfCommerce} 
               category="Economy" 
               type="Chamber"
             >
               Chamber of Commerce
             </LinkItem>
             <LinkItem 
               href={externalLinks.economy.worldBank} 
               category="Economy" 
               type="WorldBank"
             >
               World Bank Profile
             </LinkItem>
             <LinkItem 
               href={externalLinks.economy.tradingEconomics} 
               category="Economy" 
               type="TradingEconomics"
             >
               Trading Economics
             </LinkItem>
           </CategorySection>
 

           <div className="pt-3 mt-4 text-xs border-t text-slate-500">
             External links are generated automatically and may not always be available.
           </div>
         </CardContent>
       )}
     </Card>
   );
 }
    
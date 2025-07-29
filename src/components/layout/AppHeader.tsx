'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe, Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { label: 'Countries', href: '/country', description: 'Search countries and see list of all countries' },
  { label: 'Research', href: '/research', description: 'Studies and data' },
  { label: 'Resources', href: '/resources', description: 'Educational materials' },
  { label: 'News', href: '/news', description: 'Latest geography news' },
  { label: 'About', href: '/about', description: 'About this project' },
];

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Mobile menu state management
  
  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuButtonMobile = document.getElementById('menu-button-mobile');
      const menuDropdownMobile = document.getElementById('menu-dropdown-mobile');
      
      // Check if click is outside mobile menu elements
      const isClickOutside = [
        menuButtonMobile,
        menuDropdownMobile
      ].filter(Boolean).every(element => !element!.contains(target));
      
      if (isClickOutside) {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-white border-b shadow-sm border-slate-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Globe className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Human Geography Map
              </h1>
              <p className="text-sm text-slate-600">
                Interactive World Explorer
              </p>
            </div>
          </Link>

          {/* Mobile menu dropdown */}
          <div className="relative flex items-center gap-4 md:hidden">
            <button
              id="menu-button-mobile"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 p-2 transition-colors rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Open navigation menu"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <Menu className="w-5 h-5 text-slate-600" />
              <ChevronDown 
                className={cn(
                  'h-4 w-4 text-slate-600 transition-transform duration-200',
                  isMenuOpen && 'rotate-180'
                )}
              />
            </button>
            
            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <nav 
                id="menu-dropdown-mobile"
                className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-[1002] py-2"
                role="navigation"
                aria-label="Mobile navigation"
              >
                <ul className="space-y-0">
                  {MENU_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 transition-colors border-b hover:bg-slate-50 border-slate-100 last:border-b-0"
                      >
                        <div className="text-sm font-medium text-slate-900">{item.label}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.description}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center space-x-1">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        isActive 
                          ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                          : 'text-slate-700 hover:text-slate-900'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { storeConfig } from '../data/store.js';

const navLinks = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/products', label: 'جميع المنتجات' },
  { to: '/categories', label: 'الأقسام' },
  { to: '/offers', label: 'عروضنا' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const { cartCount, wishlist, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="font-brand text-2xl sm:text-[26px] font-bold tracking-[0.12em] text-[#2C211B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352] rounded"
        >
          {storeConfig.brandName}
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#6E5F54]"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#2C211B] ${
                  isActive
                    ? 'text-[#2C211B] font-semibold after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#B89352]'
                    : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Actions (Wishlist + Cart Drawer Trigger + Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            to="/wishlist"
            aria-label="المفضلة"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#2C211B] hover:bg-[#F2EDE4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
          >
            <Heart className="w-5 h-5" strokeWidth={1.6} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -left-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#B89352] text-[#FAF8F5] text-[11px] font-semibold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="فتح سلة المشتريات"
            className="inline-flex items-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
          >
            <ShoppingBag className="w-4 h-4 text-[#B89352]" strokeWidth={1.8} />
            <span className="hidden sm:inline">السلة</span>
            <span className="tabular-nums font-semibold text-[#FAF8F5]">
              ({cartCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#2C211B] hover:bg-[#F2EDE4] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="قائمة الجوال"
          className="md:hidden bg-[#FAF8F5] border-t border-[#E5DDD0] px-4 py-4 space-y-1"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F2EDE4] text-[#2C211B] font-semibold'
                    : 'text-[#6E5F54] hover:bg-[#F2EDE4]/60 hover:text-[#2C211B]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#F2EDE4] text-[#2C211B] font-semibold'
                  : 'text-[#6E5F54] hover:bg-[#F2EDE4]/60 hover:text-[#2C211B]'
              }`
            }
          >
            صفحة سلة المشتريات ({cartCount})
          </NavLink>
        </nav>
      )}
    </header>
  );
}

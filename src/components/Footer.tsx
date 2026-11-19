import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { categories } from '../data/categories.js';
import { storeConfig } from '../data/store.js';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2C211B] text-[#FAF8F5] mt-20 border-t border-[#B89352]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:pt-16 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Summary */}
          <div className="space-y-4">
            <div>
              <Link
                to="/"
                className="font-brand text-2xl font-bold tracking-[0.14em] text-[#FAF8F5]"
              >
                {storeConfig.brandName}
              </Link>
              <p className="font-brand text-sm text-[#B89352] tracking-wider mt-1" dir="ltr">
                {storeConfig.slogan}
              </p>
            </div>
            <p className="text-sm text-[#FAF8F5]/75 leading-relaxed">
              {storeConfig.description}
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-[#FAF8F5]/80">
              <a
                href={storeConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B89352] transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true" className="text-[#FAF8F5]/30">·</span>
              <a
                href={storeConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B89352] transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true" className="text-[#FAF8F5]/30">·</span>
              <a
                href={storeConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B89352] transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#B89352] mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/80">
              <li>
                <Link to="/" className="hover:text-[#FAF8F5] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#FAF8F5] transition-colors">
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#FAF8F5] transition-colors">
                  أقسام المتجر
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#FAF8F5] transition-colors">
                  العروض والخصومات
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#FAF8F5] transition-colors">
                  قائمة المفضلة
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#FAF8F5] transition-colors">
                  سلة المشتريات
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-[#B89352] mb-4">
              الأقسام
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-[#FAF8F5]/80">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="hover:text-[#FAF8F5] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3.5 text-sm text-[#FAF8F5]/80">
            <h3 className="text-sm font-semibold text-[#B89352] mb-4">
              تواصل معنا
            </h3>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#B89352] shrink-0 mt-1" />
              <span>{storeConfig.pickupAddress}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#B89352] shrink-0" />
              <span dir="ltr" className="tabular-nums">
                {storeConfig.displayPhone}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#B89352] shrink-0" />
              <span dir="ltr">{storeConfig.email}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#B89352] shrink-0 mt-1" />
              <span>{storeConfig.workingHours}</span>
            </div>
            <div className="pt-2">
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#B89352]/60 hover:bg-[#B89352] hover:text-[#2C211B] text-[#FAF8F5] px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل مباشرة عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#FAF8F5]/10 flex flex-col items-center justify-center text-center gap-2.5 text-xs text-[#FAF8F5]/70">
          <p className="tabular-nums">
            © {year} {storeConfig.brandName}. جميع الحقوق محفوظة.
          </p>
          <p dir="ltr" className="text-center">
            Designed &amp; Developed by{' '}
            <a
              href={storeConfig.developerCredit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B89352] hover:underline font-semibold"
            >
              {storeConfig.developerCredit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

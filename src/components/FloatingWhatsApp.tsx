import { MessageCircle } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp.js';

export default function FloatingWhatsApp() {
  const href = getWhatsAppInquiryUrl('مرحباً، أريد الاستفسار عن أحد منتجاتكم.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-5 left-4 sm:left-6 z-40 inline-flex items-center gap-2.5 bg-[#2C211B] hover:bg-[#3E2F27] text-[#FAF8F5] border border-[#B89352]/50 px-4 py-3 rounded-full shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
    >
      <MessageCircle className="w-5 h-5 text-[#B89352]" strokeWidth={1.8} />
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
        تواصل واتساب
      </span>
    </a>
  );
}

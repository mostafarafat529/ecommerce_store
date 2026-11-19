import React, { useState } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { storeConfig } from '../data/store.js';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp.js';
import SafeImage from '../components/SafeImage';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('استفسار عن منتج');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleWhatsAppContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('يرجى كتابة الاسم ونص الاستفسار قبل المتابعة.');
      return;
    }
    setError('');
    const fullText = `مرحباً ${storeConfig.brandName}،\nالاسم: ${name.trim()}\nالموضوع: ${topic}\nالرسالة: ${message.trim()}`;
    const url = getWhatsAppInquiryUrl(fullText);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold text-[#9A783B] mb-1.5">
          نحن هنا لمساعدتك
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C211B] mb-3">
          تواصل معنا
        </h1>
        <p className="text-base text-[#6E5F54] leading-relaxed">
          يسعد فريق خدمة عملاء VÉRA STORE بالرد على استفساراتكم حول المقاسات، العطور، وحالة التوصيل في جميع المحافظات.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact Details + Atelier Photo */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-[#2C211B]">
              بيانات التواصل والمقر
            </h2>

            <div className="space-y-4 text-sm text-[#6E5F54]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#9A783B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2C211B]">مقر البراند</p>
                  <p>{storeConfig.pickupAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#9A783B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2C211B]">الهاتف والواتساب</p>
                  <p dir="ltr" className="text-right tabular-nums">
                    {storeConfig.displayPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#9A783B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2C211B]">البريد الإلكتروني</p>
                  <p dir="ltr" className="text-right">
                    {storeConfig.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#9A783B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#2C211B]">مواعيد العمل</p>
                  <p>{storeConfig.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#F2EDE4]">
            <SafeImage
              src={storeConfig.assets.aboutImage}
              alt="صالة عرض VÉRA STORE"
            />
          </div>
        </div>

        {/* Direct WhatsApp Inquiry Form */}
        <form
          onSubmit={handleWhatsAppContact}
          className="lg:col-span-7 bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-[#2C211B] mb-1">
                أرسل استفسارك مباشرة عبر واتساب
              </h2>
              <p className="text-sm text-[#6E5F54]">
                اكتب رسالتك وسيتم تحويلك مباشرة إلى محادثة واتساب مع فريقنا.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-semibold text-[#2C211B] mb-1.5"
              >
                الاسم *
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم بالكامل"
                className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-4 py-3 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-topic"
                className="block text-xs font-semibold text-[#2C211B] mb-1.5"
              >
                موضوع الاستفسار
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-4 py-3 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
              >
                <option value="استفسار عن منتج">استفسار عن منتج</option>
                <option value="مساعدة في اختيار المقاس">
                  مساعدة في اختيار المقاس
                </option>
                <option value="تفاصيل الشحن والتوصيل">
                  تفاصيل الشحن والتوصيل
                </option>
                <option value="طلبات الهدايا والشركات">
                  طلبات الهدايا والشركات
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-[#2C211B] mb-1.5"
              >
                نص الرسالة *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="كيف يمكننا مساعدتك؟"
                className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-4 py-3 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] py-3.5 px-6 rounded-lg text-sm font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#B89352]" />
            <span>إرسال عبر واتساب</span>
          </button>
        </form>
      </div>
    </div>
  );
}

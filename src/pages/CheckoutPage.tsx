import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { useStore, getShippingEstimate } from '../context/StoreContext';
import { storeConfig } from '../data/store.js';
import { formatPrice } from '../utils/formatPrice.js';
import { getWhatsAppOrderUrl } from '../utils/whatsapp.js';
import SafeImage from '../components/SafeImage';

interface FormErrors {
  fullName?: string;
  phone?: string;
  whatsapp?: string;
  governorate?: string;
  city?: string;
  address?: string;
}

export default function CheckoutPage() {
  const { cart, cartSubtotal, cartDiscount } = useStore();

  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>(
    'delivery'
  );
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [governorate, setGovernorate] = useState(
    storeConfig.governorates[0].name
  );
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const [preparedOrder, setPreparedOrder] = useState<{
    url: string;
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const shippingCost = useMemo(
    () => getShippingEstimate(cartSubtotal, governorate, deliveryMethod),
    [cartSubtotal, governorate, deliveryMethod]
  );

  const finalTotal = cartSubtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F2EDE4] border border-[#E5DDD0] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-9 h-9 text-[#B89352]" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-[#2C211B] mb-3">
          سلة المشتريات فارغة
        </h1>
        <p className="text-sm text-[#6E5F54] mb-7">
          يرجى إضافة منتج واحد على الأقل قبل إتمام الطلب عبر واتساب.
        </p>
        <Link
          to="/products"
          className="inline-block bg-[#2C211B] text-[#FAF8F5] px-7 py-3 rounded-lg text-sm font-semibold"
        >
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const phoneRegex = /^(\+?20)?0?1[0125]\d{8}$/;
    const cleanPhone = phone.replace(/\s+/g, '');
    const cleanWhatsapp = whatsapp.replace(/\s+/g, '');

    if (!fullName.trim() || fullName.trim().length < 3) {
      nextErrors.fullName = 'يرجى إدخال الاسم بالكامل بشكل صحيح.';
    }
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      nextErrors.phone = 'يرجى إدخال رقم هاتف مصري صحيح (مثال: 01012345678).';
    }
    if (!cleanWhatsapp || !phoneRegex.test(cleanWhatsapp)) {
      nextErrors.whatsapp = 'يرجى إدخال رقم واتساب صحيح للتواصل.';
    }

    if (deliveryMethod === 'delivery') {
      if (!governorate) {
        nextErrors.governorate = 'يرجى اختيار المحافظة.';
      }
      if (!city.trim()) {
        nextErrors.city = 'يرجى إدخال المدينة أو المنطقة.';
      }
      if (!address.trim() || address.trim().length < 6) {
        nextErrors.address = 'يرجى إدخال العنوان بالتفصيل (الشارع / العقار / الشقة).';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = getWhatsAppOrderUrl({
      customer: {
        fullName,
        phone,
        whatsapp,
        governorate,
        city,
        address,
        notes,
      },
      deliveryMethod,
      items: cart,
      subtotal: cartSubtotal,
      totalDiscount: cartDiscount,
      shippingCost,
      finalTotal,
    });

    setPreparedOrder(payload);

    // Trigger anchor click so browser opens WhatsApp cleanly without window.open popup block
    const anchor = document.createElement('a');
    anchor.href = payload.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopyMessage = async () => {
    if (!preparedOrder) return;
    try {
      await navigator.clipboard.writeText(preparedOrder.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard may be restricted in some environments
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-6 border-b border-[#E5DDD0] mb-8">
        <p className="text-xs font-semibold text-[#9A783B] mb-1">
          خطوة أخيرة
        </p>
        <h1 className="text-3xl font-bold text-[#2C211B]">
          إتمام الطلب عبر واتساب
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 space-y-6"
        >
          {/* Delivery Method */}
          <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-4">
            <h2 className="text-base font-bold text-[#2C211B]">
              1. طريقة الاستلام
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-4 rounded-xl border text-right flex items-start gap-3 transition-colors ${
                  deliveryMethod === 'delivery'
                    ? 'border-[#2C211B] bg-[#F2EDE4]'
                    : 'border-[#E5DDD0] bg-white hover:border-[#2C211B]/50'
                }`}
              >
                <Truck className="w-5 h-5 text-[#9A783B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[#2C211B]">
                    التوصيل للمنزل
                  </p>
                  <p className="text-xs text-[#6E5F54] mt-1">
                    شحن سريع لجميع محافظات مصر
                  </p>
                </div>
              </button>

              {storeConfig.pickupAvailable && (
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-xl border text-right flex items-start gap-3 transition-colors ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#2C211B] bg-[#F2EDE4]'
                      : 'border-[#E5DDD0] bg-white hover:border-[#2C211B]/50'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-[#9A783B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#2C211B]">
                      الاستلام من مقر البراند
                    </p>
                    <p className="text-xs text-[#6E5F54] mt-1">
                      {storeConfig.pickupAddress} (مجاناً)
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5">
            <h2 className="text-base font-bold text-[#2C211B]">
              2. بيانات العميل والعنوان
            </h2>

            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-[#2C211B] mb-1.5"
              >
                الاسم بالكامل *
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: أحمد محمد"
                className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
              />
              {errors.fullName && (
                <p className="text-xs text-red-700 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-semibold text-[#2C211B] mb-1.5"
                >
                  رقم الهاتف *
                </label>
                <input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-right text-[#2C211B] focus:outline-none focus:border-[#B89352]"
                />
                {errors.phone && (
                  <p className="text-xs text-red-700 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="whatsapp"
                    className="text-xs font-semibold text-[#2C211B]"
                  >
                    رقم واتساب *
                  </label>
                  {phone && (
                    <button
                      type="button"
                      onClick={() => setWhatsapp(phone)}
                      className="text-[11px] font-semibold text-[#9A783B] hover:underline"
                    >
                      نفس رقم الهاتف
                    </button>
                  )}
                </div>
                <input
                  id="whatsapp"
                  type="tel"
                  dir="ltr"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="01012345678"
                  className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-right text-[#2C211B] focus:outline-none focus:border-[#B89352]"
                />
                {errors.whatsapp && (
                  <p className="text-xs text-red-700 mt-1">{errors.whatsapp}</p>
                )}
              </div>
            </div>

            {deliveryMethod === 'delivery' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="governorate"
                      className="block text-xs font-semibold text-[#2C211B] mb-1.5"
                    >
                      المحافظة *
                    </label>
                    <select
                      id="governorate"
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
                    >
                      {storeConfig.governorates.map((gov) => (
                        <option key={gov.name} value={gov.name}>
                          {gov.name} ({formatPrice(gov.shipping)})
                        </option>
                      ))}
                    </select>
                    {errors.governorate && (
                      <p className="text-xs text-red-700 mt-1">
                        {errors.governorate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-semibold text-[#2C211B] mb-1.5"
                    >
                      المدينة أو المنطقة *
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="مثال: مدينة نصر / المعادي"
                      className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
                    />
                    {errors.city && (
                      <p className="text-xs text-red-700 mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-xs font-semibold text-[#2C211B] mb-1.5"
                  >
                    العنوان بالتفصيل *
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="اسم الشارع، رقم العقار، الدور والشقة أو أقرب علامة مميزة"
                    className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-700 mt-1">{errors.address}</p>
                  )}
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="notes"
                className="block text-xs font-semibold text-[#2C211B] mb-1.5"
              >
                ملاحظات إضافية (اختياري)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: التوصيل بعد الساعة ٥ مساءً أو تغليف كهدية"
                className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-2">
            <h2 className="text-base font-bold text-[#2C211B]">
              3. طريقة الدفع
            </h2>
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#F2EDE4] border border-[#E5DDD0]">
              <CheckCircle2 className="w-5 h-5 text-[#9A783B] shrink-0" />
              <div>
                <p className="text-sm font-bold text-[#2C211B]">
                  الدفع عند الاستلام (Cash on Delivery)
                </p>
                <p className="text-xs text-[#6E5F54]">
                  ادفع نقداً عند استلام طلبك وفحصه مع المندوب.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] py-4 px-6 rounded-xl text-base font-bold transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5 text-[#B89352]" />
            <span>تأكيد الطلب عبر واتساب</span>
          </button>

          {/* Prepared WhatsApp Preview & Direct Fallback */}
          {preparedOrder && (
            <div className="bg-[#F2EDE4] border border-[#B89352]/50 rounded-xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#9A783B] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#2C211B]">
                    تم تجهيز رسالة طلبك للإرسال عبر واتساب
                  </h3>
                  <p className="text-xs text-[#6E5F54] leading-relaxed">
                    اضغط على زر "إرسال" داخل محادثة واتساب لإرسال تفاصيل الطلب إلى فريق VÉRA STORE. إذا لم تُفتح النافذة تلقائياً، استخدم الرابط المباشر أدناه:
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={preparedOrder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <span>فتح محادثة واتساب الآن</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B89352]" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-2 bg-white border border-[#E5DDD0] hover:border-[#2C211B] text-[#2C211B] px-4 py-2.5 rounded-lg text-xs font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#9A783B]" />
                      <span>تم نسخ نص الطلب</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ تفاصيل الطلب</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-5 bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-[#2C211B] pb-4 border-b border-[#E5DDD0]">
            ملخص الطلب ({cart.reduce((s, i) => s + i.quantity, 0)} قطعة)
          </h2>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pl-1">
            {cart.map((item) => {
              const specs = [
                item.selectedVolume ? `الحجم: ${item.selectedVolume}` : null,
                item.selectedSize ? `المقاس: ${item.selectedSize}` : null,
                item.selectedColor ? `اللون: ${item.selectedColor}` : null,
              ].filter(Boolean);

              return (
                <div
                  key={item.variantKey}
                  className="flex items-start gap-3 pb-4 border-b border-[#E5DDD0]/70 last:border-b-0"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F2EDE4] border border-[#E5DDD0] shrink-0">
                    <SafeImage src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2C211B] line-clamp-1">
                      {item.name}
                    </p>
                    {specs.length > 0 && (
                      <p className="text-xs text-[#6E5F54] mt-0.5">
                        {specs.join(' · ')}
                      </p>
                    )}
                    <p className="text-xs text-[#6E5F54] mt-1 tabular-nums">
                      الكمية: {item.quantity} × {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#2C211B] tabular-nums shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E5DDD0] space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-[#6E5F54]">
              <span>إجمالي المنتجات</span>
              <span className="tabular-nums font-medium text-[#2C211B]">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex items-center justify-between text-[#9A783B]">
                <span>قيمة التوفير على العروض</span>
                <span className="tabular-nums font-semibold">
                  {formatPrice(cartDiscount)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-[#6E5F54]">
              <span>
                الشحن{' '}
                {deliveryMethod === 'pickup'
                  ? '(استلام من المقر)'
                  : `(${governorate})`}
              </span>
              <span className="tabular-nums font-medium text-[#2C211B]">
                {shippingCost === 0 ? 'مجاني' : formatPrice(shippingCost)}
              </span>
            </div>

            <div className="pt-3 border-t border-[#E5DDD0] flex items-center justify-between text-lg font-bold text-[#2C211B]">
              <span>الإجمالي النهائي</span>
              <span className="tabular-nums">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

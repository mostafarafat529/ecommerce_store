import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore, getShippingEstimate } from '../context/StoreContext';
import { storeConfig } from '../data/store.js';
import { formatPrice } from '../utils/formatPrice.js';
import SafeImage from '../components/SafeImage';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartOriginalTotal,
  } = useStore();

  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);

  const estimatedShipping = getShippingEstimate(cartSubtotal);
  const freeRemaining = Math.max(0, storeConfig.freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F2EDE4] border border-[#E5DDD0] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-9 h-9 text-[#B89352]" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C211B] mb-3">
          سلة المشتريات فارغة
        </h1>
        <p className="text-base text-[#6E5F54] max-w-md mx-auto mb-8">
          لم تقم بإضافة أي منتجات إلى سلتك بعد. استكشف أحدث العطور والأزياء والساعات المتوفرة الآن.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] px-7 py-3.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <span>تصفح المنتجات</span>
          <ArrowLeft className="w-4 h-4 text-[#B89352]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="pb-6 border-b border-[#E5DDD0] mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#9A783B] mb-1">
            مراجعة الطلب
          </p>
          <h1 className="text-3xl font-bold text-[#2C211B]">سلة المشتريات</h1>
        </div>
        <Link
          to="/products"
          className="text-sm font-semibold text-[#6E5F54] hover:text-[#2C211B] underline underline-offset-4"
        >
          متابعة التسوق
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items Table / Cards */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const specs = [
              item.selectedVolume ? `الحجم: ${item.selectedVolume}` : null,
              item.selectedSize ? `المقاس: ${item.selectedSize}` : null,
              item.selectedColor ? `اللون: ${item.selectedColor}` : null,
            ].filter(Boolean);

            const isConfirming = confirmDeleteKey === item.variantKey;

            return (
              <div
                key={item.variantKey}
                className="bg-white border border-[#E5DDD0] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
              >
                <Link
                  to={`/product/${item.slug}`}
                  className="w-24 h-24 sm:w-28 sm:h-24 rounded-lg overflow-hidden bg-[#F2EDE4] border border-[#E5DDD0] shrink-0"
                >
                  <SafeImage src={item.image} alt={item.name} />
                </Link>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-base font-bold text-[#2C211B] hover:text-[#9A783B]"
                      >
                        {item.name}
                      </Link>
                      {specs.length > 0 && (
                        <p className="text-xs text-[#6E5F54] mt-1">
                          {specs.join(' · ')}
                        </p>
                      )}
                    </div>
                    {!isConfirming && (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteKey(item.variantKey)}
                        aria-label={`حذف ${item.name}`}
                        className="text-[#6E5F54] hover:text-red-700 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center border border-[#E5DDD0] rounded-lg bg-[#FAF8F5]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantKey, -1)}
                        disabled={item.quantity <= 1}
                        aria-label="إنقاص الكمية"
                        className="w-9 h-9 flex items-center justify-center text-[#2C211B] disabled:opacity-35 hover:bg-[#F2EDE4] rounded-r-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.variantKey, 1)}
                        aria-label="زيادة الكمية"
                        className="w-9 h-9 flex items-center justify-center text-[#2C211B] hover:bg-[#F2EDE4] rounded-l-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-left tabular-nums">
                      <p className="text-xs text-[#6E5F54]">
                        سعر القطعة: {formatPrice(item.unitPrice)}
                      </p>
                      <p className="text-base font-bold text-[#2C211B]">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>

                  {isConfirming && (
                    <div className="mt-3 p-3 bg-[#F2EDE4] rounded-lg flex items-center justify-between gap-3 text-xs">
                      <span className="font-semibold text-[#2C211B]">
                        هل تريد حذف هذا المنتج من السلة؟
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            removeFromCart(item.variantKey);
                            setConfirmDeleteKey(null);
                          }}
                          className="bg-[#2C211B] text-[#FAF8F5] px-3 py-1.5 rounded font-semibold"
                        >
                          نعم، احذف
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteKey(null)}
                          className="bg-white border border-[#E5DDD0] text-[#2C211B] px-3 py-1.5 rounded"
                        >
                          تراجع
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <aside className="lg:col-span-4 bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-[#2C211B] pb-4 border-b border-[#E5DDD0]">
            ملخص السلة
          </h2>

          <div className="p-3.5 rounded-lg bg-[#F2EDE4] text-xs text-[#2C211B]">
            {freeRemaining === 0 ? (
              <span className="font-semibold">
                تهانينا! طلبك مؤهل للشحن المجاني.
              </span>
            ) : (
              <span>
                أضف منتجات بقيمة{' '}
                <strong className="tabular-nums">{formatPrice(freeRemaining)}</strong>{' '}
                للحصول على شحن مجاني.
              </span>
            )}
          </div>

          <div className="space-y-3 text-sm">
            {cartDiscount > 0 ? (
              <>
                <div className="flex items-center justify-between text-[#6E5F54]">
                  <span>المجموع قبل الخصم</span>
                  <span className="tabular-nums">
                    {formatPrice(cartOriginalTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#9A783B]">
                  <span>الخصم (توفير العروض)</span>
                  <span className="tabular-nums font-semibold">
                    - {formatPrice(cartDiscount)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#2C211B] font-medium">
                  <span>إجمالي المنتجات بعد الخصم</span>
                  <span className="tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between text-[#6E5F54]">
                <span>إجمالي المنتجات</span>
                <span className="tabular-nums font-medium text-[#2C211B]">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-[#6E5F54]">
              <span>الشحن المبدئي</span>
              <span className="tabular-nums font-medium text-[#2C211B]">
                {estimatedShipping === 0 ? 'مجاني' : formatPrice(estimatedShipping)}
              </span>
            </div>

            <div className="pt-3 border-t border-[#E5DDD0] flex items-center justify-between text-base font-bold text-[#2C211B]">
              <span>الإجمالي التقديري</span>
              <span className="tabular-nums">
                {formatPrice(cartSubtotal + estimatedShipping)}
              </span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] py-3.5 px-6 rounded-lg text-sm font-semibold transition-colors"
          >
            <span>المتابعة لإتمام الطلب</span>
            <ArrowLeft className="w-4 h-4 text-[#B89352]" />
          </Link>

          <p className="text-xs text-center text-[#6E5F54]">
            يتم احتساب تكلفة الشحن النهائية حسب المحافظة في صفحة إتمام الطلب.
          </p>
        </aside>
      </div>
    </div>
  );
}

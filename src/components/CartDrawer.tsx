import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore, getShippingEstimate } from '../context/StoreContext';
import { storeConfig } from '../data/store.js';
import { formatPrice } from '../utils/formatPrice.js';
import SafeImage from './SafeImage';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
  } = useStore();

  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const estimatedShipping = getShippingEstimate(cartSubtotal);
  const freeRemaining = Math.max(0, storeConfig.freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-[#2C211B]/45 backdrop-blur-[2px] transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        aria-label="سلة المشتريات"
        className="relative z-10 w-full max-w-md bg-[#FAF8F5] h-full flex flex-col shadow-2xl border-r border-[#E5DDD0]"
      >
        <div className="px-6 py-5 border-b border-[#E5DDD0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B89352]" />
            <h2 className="text-lg font-bold text-[#2C211B]">سلة المشتريات</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="إغلاق السلة"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#6E5F54] hover:text-[#2C211B] hover:bg-[#F2EDE4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Notice */}
        {cart.length > 0 && (
          <div className="px-6 py-2.5 bg-[#F2EDE4] border-b border-[#E5DDD0] text-xs text-[#2C211B]">
            {freeRemaining === 0 ? (
              <span className="font-medium">
                طلبك مؤهل للشحن المجاني داخل جميع المحافظات.
              </span>
            ) : (
              <span>
                أضف منتجات بقيمة{' '}
                <strong className="tabular-nums">{formatPrice(freeRemaining)}</strong>{' '}
                للحصول على شحن مجاني.
              </span>
            )}
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#F2EDE4] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#B89352]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-[#2C211B] mb-2">
                سلة المشتريات فارغة
              </h3>
              <p className="text-sm text-[#6E5F54] max-w-xs mb-6">
                استكشف تشكيلة VÉRA من العطور والملابس والساعات واختر ما يناسب ذوقك.
              </p>
              <Link
                to="/products"
                onClick={() => setIsCartOpen(false)}
                className="bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              const specs = [
                item.selectedVolume ? `الحجم: ${item.selectedVolume}` : null,
                item.selectedSize ? `المقاس: ${item.selectedSize}` : null,
                item.selectedColor ? `اللون: ${item.selectedColor}` : null,
              ].filter(Boolean);

              const isConfirming = confirmDeleteKey === item.variantKey;

              return (
                <div
                  key={item.variantKey}
                  className="pb-5 border-b border-[#E5DDD0] last:border-b-0 flex gap-4"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-[#F2EDE4] shrink-0 border border-[#E5DDD0]"
                  >
                    <SafeImage src={item.image} alt={item.name} />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-sm font-semibold text-[#2C211B] hover:text-[#9A783B] line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {!isConfirming && (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteKey(item.variantKey)}
                          aria-label={`حذف ${item.name}`}
                          className="text-[#6E5F54] hover:text-red-700 p-1 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {specs.length > 0 && (
                      <p className="text-xs text-[#6E5F54] mt-1">
                        {specs.join(' · ')}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center border border-[#E5DDD0] rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantKey, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="إنقاص الكمية"
                          className="w-8 h-8 flex items-center justify-center text-[#2C211B] disabled:opacity-35 hover:bg-[#F2EDE4] transition-colors rounded-r-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.variantKey, 1)}
                          aria-label="زيادة الكمية"
                          className="w-8 h-8 flex items-center justify-center text-[#2C211B] hover:bg-[#F2EDE4] transition-colors rounded-l-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-left tabular-nums">
                        <p className="text-sm font-bold text-[#2C211B]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    </div>

                    {isConfirming && (
                      <div className="mt-3 p-2.5 bg-[#F2EDE4] rounded-lg flex items-center justify-between gap-2 text-xs">
                        <span className="text-[#2C211B] font-medium">تأكيد حذف المنتج؟</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              removeFromCart(item.variantKey);
                              setConfirmDeleteKey(null);
                            }}
                            className="bg-[#2C211B] text-[#FAF8F5] px-2.5 py-1 rounded font-medium"
                          >
                            حذف
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteKey(null)}
                            className="border border-[#E5DDD0] bg-white text-[#2C211B] px-2.5 py-1 rounded"
                          >
                            إلغاء
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E5DDD0] bg-white space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#6E5F54]">
                <span>إجمالي المنتجات</span>
                <span className="tabular-nums font-medium text-[#2C211B]">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex items-center justify-between text-[#9A783B]">
                  <span>الخصم على العروض</span>
                  <span className="tabular-nums font-medium">
                    - {formatPrice(cartDiscount)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-[#6E5F54]">
                <span>الشحن المبدئي</span>
                <span className="tabular-nums font-medium text-[#2C211B]">
                  {estimatedShipping === 0 ? 'مجاني' : formatPrice(estimatedShipping)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E5DDD0] flex items-center justify-between text-base font-bold text-[#2C211B]">
                <span>الإجمالي التقديري</span>
                <span className="tabular-nums">
                  {formatPrice(cartSubtotal + estimatedShipping)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="text-center border border-[#E5DDD0] hover:border-[#2C211B] text-[#2C211B] py-3 rounded-lg text-sm font-medium transition-colors"
              >
                عرض السلة
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="text-center bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                إتمام الطلب
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

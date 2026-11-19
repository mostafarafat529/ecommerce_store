import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  X,
  ZoomIn,
} from 'lucide-react';
import { getCategoryBySlug } from '../data/categories.js';
import {
  getProductById,
  getProductBySlug,
  getRelatedProducts,
} from '../data/products.js';
import {
  calculateDiscountPercentage,
  formatPrice,
} from '../utils/formatPrice.js';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp.js';
import { useStore } from '../context/StoreContext';
import ProductCard, { ProductRecord } from '../components/ProductCard';
import SafeImage from '../components/SafeImage';

const SPEC_LABELS: Record<string, string> = {
  gender: 'النوع',
  scentType: 'نوع الرائحة',
  concentration: 'التركيز',
  notes: 'المكونات العطرية',
  material: 'الخامة',
  fit: 'القصّة',
  care: 'تعليمات العناية',
  watchType: 'نوع الحركة',
  strapType: 'نوع السوار',
  dimensions: 'الأبعاد والمقاسات',
  sizeDetails: 'تفاصيل المقاس',
  usage: 'تفاصيل الاستخدام',
  pockets: 'عدد الجيوب',
  designDetails: 'تفاصيل التصميم',
  sole: 'النعل والارتفاع',
  lenses: 'العدسات والحماية',
  ingredients: 'المكونات الأساسية',
  suitableFor: 'مناسب لـ',
};

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    recordProductView,
    recentlyViewed,
  } = useStore();

  const product = useMemo(
    () => (slug ? getProductBySlug(slug) : undefined) as ProductRecord | undefined,
    [slug]
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedVolumeLabel, setSelectedVolumeLabel] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Reset selections when switching product
  useEffect(() => {
    if (!product) return;
    setActiveImageIndex(0);
    setIsZoomed(false);
    setQuantity(1);
    setShowSizeGuide(false);
    setSelectedVolumeLabel(product.variants?.volumes?.[0]?.label);
    setSelectedSize(product.variants?.sizes?.[0]);
    setSelectedColor(product.variants?.colors?.[0]?.name);
    recordProductView(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#2C211B] mb-3">
          المنتج غير موجود
        </h1>
        <p className="text-sm text-[#6E5F54] mb-6">
          عذراً، لم نتمكن من العثور على المنتج المطلوب.
        </p>
        <Link
          to="/products"
          className="inline-block bg-[#2C211B] text-[#FAF8F5] px-6 py-3 rounded-lg text-sm font-semibold"
        >
          العودة لجميع المنتجات
        </Link>
      </div>
    );
  }

  const categoryObj = getCategoryBySlug(product.category);
  const activeVolumeObj = product.variants?.volumes?.find(
    (v) => v.label === selectedVolumeLabel
  );

  const currentPrice = activeVolumeObj ? activeVolumeObj.price : product.price;
  const currentOldPrice = activeVolumeObj
    ? activeVolumeObj.oldPrice
    : product.oldPrice;
  const discountPct = calculateDiscountPercentage(currentPrice, currentOldPrice);

  const relatedProducts = getRelatedProducts(product, 4);
  const recentProducts = recentlyViewed
    .filter((id) => id !== product.id)
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  const isClothingOrShoes =
    product.category === 'men-clothing' ||
    product.category === 'women-clothing' ||
    product.category === 'shoes';

  const wished = isInWishlist(product.id);

  const handleAdd = (redirectToCheckout = false) => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: product.images[0],
      unitPrice: currentPrice,
      unitOldPrice: currentOldPrice,
      selectedColor,
      selectedSize,
      selectedVolume: selectedVolumeLabel,
      quantity,
    });
    if (redirectToCheckout) {
      navigate('/checkout');
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const inquiryText = `مرحباً، أريد الاستفسار عن: ${product.name}${
    selectedVolumeLabel ? ` (${selectedVolumeLabel})` : ''
  }${selectedSize ? ` (مقاس ${selectedSize})` : ''}${
    selectedColor ? ` (لون ${selectedColor})` : ''
  }.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs text-[#6E5F54] mb-8 flex-wrap">
        <Link to="/" className="hover:text-[#2C211B]">
          الرئيسية
        </Link>
        <span aria-hidden="true">/</span>
        {categoryObj && (
          <>
            <Link
              to={`/products?category=${categoryObj.slug}`}
              className="hover:text-[#2C211B]"
            >
              {categoryObj.name}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span className="text-[#2C211B] font-medium">{product.name}</span>
      </nav>

      {/* Main Split: Sticky Gallery & Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Image Gallery */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
          <div className="relative aspect-[4/3] bg-[#F2EDE4] rounded-2xl overflow-hidden border border-[#E5DDD0]">
            <div
              onClick={() => setIsZoomed((z) => !z)}
              className={`w-full h-full cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100'
              }`}
            >
              <SafeImage
                src={product.images[activeImageIndex]}
                alt={`${product.name} - صورة ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsZoomed((z) => !z)}
              aria-label="تكبير الصورة"
              className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-[#FAF8F5]/90 hover:bg-white border border-[#E5DDD0] flex items-center justify-center text-[#2C211B]"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="الصورة السابقة"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FAF8F5]/90 hover:bg-white border border-[#E5DDD0] flex items-center justify-center text-[#2C211B] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="الصورة التالية"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FAF8F5]/90 hover:bg-white border border-[#E5DDD0] flex items-center justify-center text-[#2C211B] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsZoomed(false);
                  }}
                  aria-label={`عرض صورة ${idx + 1}`}
                  className={`aspect-[4/3] rounded-xl overflow-hidden bg-[#F2EDE4] border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#2C211B]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.name} مصغرة ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3 pb-6 border-b border-[#E5DDD0]">
            <div className="flex items-center gap-2 text-xs text-[#6E5F54]">
              <span className="font-semibold text-[#9A783B]">
                {categoryObj?.name}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-[#2C211B] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9A783B]" />
                {product.available ? 'متوفر للشحن الفوري' : 'غير متوفر حالياً'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#2C211B] leading-snug">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-baseline gap-3 pt-1 tabular-nums">
              <span className="text-2xl sm:text-3xl font-bold text-[#2C211B]">
                {formatPrice(currentPrice)}
              </span>
              {currentOldPrice && currentOldPrice > currentPrice && (
                <>
                  <span className="text-base text-[#6E5F54] line-through">
                    {formatPrice(currentOldPrice)}
                  </span>
                  <span className="text-xs font-bold text-[#9A783B]">
                    وفر {discountPct}%
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#6E5F54] leading-relaxed">
            {product.description}
          </p>

          {/* Dynamic Variant Selectors */}
          <div className="space-y-5 pt-2">
            {/* Volumes (Perfumes & Personal Care) */}
            {product.variants?.volumes && product.variants.volumes.length > 0 && (
              <div>
                <p className="text-xs font-bold text-[#2C211B] mb-2.5">
                  اختر الحجم المتاح:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.volumes.map((vol) => {
                    const active = selectedVolumeLabel === vol.label;
                    return (
                      <button
                        key={vol.label}
                        type="button"
                        onClick={() => setSelectedVolumeLabel(vol.label)}
                        className={`px-4 py-2.5 rounded-lg border text-sm transition-colors flex flex-col items-start min-w-[96px] ${
                          active
                            ? 'border-[#2C211B] bg-[#2C211B] text-[#FAF8F5]'
                            : 'border-[#E5DDD0] bg-white text-[#2C211B] hover:border-[#2C211B]'
                        }`}
                      >
                        <span className="font-bold" dir="ltr">
                          {vol.label}
                        </span>
                        <span
                          className={`text-xs tabular-nums ${
                            active ? 'text-[#E5DDD0]' : 'text-[#6E5F54]'
                          }`}
                        >
                          {formatPrice(vol.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.variants?.colors && product.variants.colors.length > 0 && (
              <div>
                <p className="text-xs font-bold text-[#2C211B] mb-2.5">
                  اللون المختار:{' '}
                  <span className="font-medium text-[#6E5F54]">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.colors.map((color) => {
                    const active = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs sm:text-sm transition-colors ${
                          active
                            ? 'border-[#2C211B] bg-[#F2EDE4] text-[#2C211B] font-semibold'
                            : 'border-[#E5DDD0] bg-white text-[#2C211B] hover:border-[#2C211B]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.variants?.sizes && product.variants.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-bold text-[#2C211B]">
                    المقاس:{' '}
                    <span className="font-medium text-[#6E5F54]">{selectedSize}</span>
                  </p>
                  {isClothingOrShoes && (
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A783B] hover:underline"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>دليل المقاسات</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.variants.sizes.map((size) => {
                    const active = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                          active
                            ? 'border-[#2C211B] bg-[#2C211B] text-[#FAF8F5]'
                            : 'border-[#E5DDD0] bg-white text-[#2C211B] hover:border-[#2C211B]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Action Buttons */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-[#E5DDD0] rounded-lg bg-white h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="إنقاص الكمية"
                  className="w-11 h-full flex items-center justify-center text-[#2C211B] disabled:opacity-35 hover:bg-[#F2EDE4] rounded-r-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-11 text-center text-sm font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="زيادة الكمية"
                  className="w-11 h-full flex items-center justify-center text-[#2C211B] hover:bg-[#F2EDE4] rounded-l-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={!product.available}
                onClick={() => handleAdd(false)}
                className="flex-1 h-12 inline-flex items-center justify-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] disabled:bg-[#E5DDD0] text-[#FAF8F5] text-sm font-semibold rounded-lg transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#B89352]" />
                <span>أضف إلى السلة</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id, product.name)}
                aria-label={wished ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                className="w-12 h-12 rounded-lg border border-[#E5DDD0] bg-white hover:border-[#2C211B] flex items-center justify-center transition-colors shrink-0"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wished ? 'fill-[#B89352] text-[#B89352]' : 'text-[#2C211B]'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={!product.available}
                onClick={() => handleAdd(true)}
                className="h-12 bg-[#B89352] hover:bg-[#9A783B] text-[#FAF8F5] text-sm font-bold rounded-lg transition-colors"
              >
                اشتري الآن
              </button>

              <a
                href={getWhatsAppInquiryUrl(inquiryText)}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 inline-flex items-center justify-center gap-2 border border-[#E5DDD0] bg-white hover:border-[#2C211B] text-[#2C211B] text-sm font-medium rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#9A783B]" />
                <span>استفسار سريع عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* Category-Specific Specifications */}
          <div className="pt-6 border-t border-[#E5DDD0]">
            <h2 className="text-sm font-bold text-[#2C211B] mb-4">
              المواصفات والتفاصيل
            </h2>
            <dl className="divide-y divide-[#E5DDD0] border border-[#E5DDD0] rounded-xl bg-white overflow-hidden">
              {Object.entries(product.specifications)
                .filter(([, val]) => Boolean(val))
                .map(([key, val]) => (
                  <div
                    key={key}
                    className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-sm"
                  >
                    <dt className="font-semibold text-[#6E5F54]">
                      {SPEC_LABELS[key] || key}
                    </dt>
                    <dd className="sm:col-span-2 text-[#2C211B]">{val}</dd>
                  </div>
                ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20 pt-14 border-t border-[#E5DDD0]">
        <h2 className="text-2xl font-bold text-[#2C211B] mb-8">منتجات مشابهة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

      {/* Recently Viewed Products */}
      {recentProducts.length > 0 && (
        <section className="mt-16 pt-14 border-t border-[#E5DDD0]">
          <h2 className="text-2xl font-bold text-[#2C211B] mb-8">
            منتجات شاهدتها مؤخراً
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C211B]/50 backdrop-blur-[2px]">
          <div className="bg-[#FAF8F5] border border-[#E5DDD0] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5DDD0] pb-4">
              <h3 className="text-lg font-bold text-[#2C211B]">دليل المقاسات</h3>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                aria-label="إغلاق دليل المقاسات"
                className="p-1.5 rounded-lg text-[#6E5F54] hover:bg-[#F2EDE4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {product.category === 'shoes' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right border-collapse tabular-nums">
                  <thead>
                    <tr className="border-b border-[#E5DDD0] text-[#6E5F54]">
                      <th className="py-2 px-3">المقاس الأوروبي (EU)</th>
                      <th className="py-2 px-3">طول القدم (سم)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DDD0]/60">
                    {[
                      ['37', '23.5'],
                      ['38', '24.0'],
                      ['39', '24.5'],
                      ['40', '25.5'],
                      ['41', '26.0'],
                      ['42', '27.0'],
                      ['43', '27.5'],
                      ['44', '28.5'],
                      ['45', '29.0'],
                    ].map(([eu, cm]) => (
                      <tr key={eu}>
                        <td className="py-2 px-3 font-semibold">{eu}</td>
                        <td className="py-2 px-3">{cm} سم</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right border-collapse tabular-nums">
                  <thead>
                    <tr className="border-b border-[#E5DDD0] text-[#6E5F54]">
                      <th className="py-2 px-3">المقاس</th>
                      <th className="py-2 px-3">محيط الصدر (سم)</th>
                      <th className="py-2 px-3">الوزن التقريبي (كجم)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DDD0]/60">
                    {[
                      ['S', '92 – 96', '55 – 65'],
                      ['M', '97 – 102', '66 – 75'],
                      ['L', '103 – 108', '76 – 85'],
                      ['XL', '109 – 114', '86 – 96'],
                      ['XXL', '115 – 122', '97 – 110'],
                    ].map(([sz, chest, weight]) => (
                      <tr key={sz}>
                        <td className="py-2 px-3 font-semibold">{sz}</td>
                        <td className="py-2 px-3">{chest}</td>
                        <td className="py-2 px-3">{weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <p className="text-xs text-[#6E5F54]">
              للمساعدة في اختيار المقاس الأدق، يمكنك مراسلتنا مباشرة عبر واتساب قبل تأكيد الطلب.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

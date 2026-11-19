import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, getCategoryBySlug } from '../data/categories.js';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard';

interface ProductsPageProps {
  offersOnly?: boolean;
}

const PRICE_RANGES = [
  { id: 'all', label: 'جميع الأسعار', min: 0, max: Infinity },
  { id: 'under-1000', label: 'أقل من ١,٠٠٠ ج.م', min: 0, max: 999 },
  { id: '1000-2500', label: '١,٠٠٠ – ٢,٥٠٠ ج.م', min: 1000, max: 2500 },
  { id: 'over-2500', label: 'أكثر من ٢,٥٠٠ ج.م', min: 2501, max: Infinity },
];

export default function ProductsPage({ offersOnly = false }: ProductsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'newest';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRangeId, setPriceRangeId] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState(initialSort);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Keep local state in sync when URL query changes (e.g. clicking a category link in Navbar/Footer)
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('q') || '');
    setSortBy(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Extract unique available colors and sizes dynamically based on products
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.variants?.colors?.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return;
      p.variants?.sizes?.forEach((s) => set.add(s));
      p.variants?.volumes?.forEach((v) => set.add(v.label));
    });
    return Array.from(set);
  }, [selectedCategory]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedSize('all');
    const next = new URLSearchParams(searchParams);
    if (slug === 'all') {
      next.delete('category');
    } else {
      next.set('category', slug);
    }
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRangeId('all');
    setSelectedColor('all');
    setSelectedSize('all');
    setSortBy('newest');
    setSearchParams({}, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === priceRangeId) || PRICE_RANGES[0];
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const list = products.filter((p) => {
      if (offersOnly && (!p.oldPrice || p.oldPrice <= p.price)) return false;
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (p.price < range.min || p.price > range.max) return false;

      if (normalizedQuery) {
        const haystack = `${p.name} ${p.description}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }

      if (selectedColor !== 'all') {
        const hasColor = p.variants?.colors?.some((c) => c.name === selectedColor);
        if (!hasColor) return false;
      }

      if (selectedSize !== 'all') {
        const hasSize = p.variants?.sizes?.includes(selectedSize);
        const hasVolume = p.variants?.volumes?.some((v) => v.label === selectedSize);
        if (!hasSize && !hasVolume) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'featured') {
        return Number(b.featured) - Number(a.featured);
      }
      // newest
      return Number(b.isNew) - Number(a.isNew);
    });
  }, [
    offersOnly,
    selectedCategory,
    priceRangeId,
    searchQuery,
    selectedColor,
    selectedSize,
    sortBy,
  ]);

  const activeCategoryObj =
    selectedCategory !== 'all' ? getCategoryBySlug(selectedCategory) : null;

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    priceRangeId !== 'all' ||
    selectedColor !== 'all' ||
    selectedSize !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E5DDD0]">
        <div>
          <p className="text-xs font-semibold text-[#9A783B] mb-1.5">
            {offersOnly ? 'تخفيضات حصرية' : 'كتالوج VÉRA STORE'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C211B]">
            {offersOnly
              ? 'العروض والخصومات'
              : activeCategoryObj
              ? activeCategoryObj.name
              : 'جميع المنتجات'}
          </h1>
          {activeCategoryObj && (
            <p className="text-sm text-[#6E5F54] mt-2">{activeCategoryObj.shortDesc}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowMobileFilters((v) => !v)}
            className="lg:hidden inline-flex items-center gap-2 border border-[#E5DDD0] bg-white px-4 py-2.5 rounded-lg text-sm font-medium text-[#2C211B]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#9A783B]" />
            <span>تصفية النتائج</span>
          </button>

          <select
            aria-label="ترتيب المنتجات"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#E5DDD0] rounded-lg px-3.5 py-2.5 text-sm text-[#2C211B] focus:outline-none focus:border-[#B89352]"
          >
            <option value="newest">الأحدث وصولاً</option>
            <option value="featured">الأكثر تميزاً</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
          </select>
        </div>
      </div>

      {/* Category Quick Tabs */}
      <div className="py-5 border-b border-[#E5DDD0] flex items-center gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
            selectedCategory === 'all'
              ? 'bg-[#2C211B] text-[#FAF8F5]'
              : 'bg-white border border-[#E5DDD0] text-[#6E5F54] hover:text-[#2C211B]'
          }`}
        >
          الكل
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-[#2C211B] text-[#FAF8F5]'
                : 'bg-white border border-[#E5DDD0] text-[#6E5F54] hover:text-[#2C211B]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Content Layout: Filter Sidebar + Product Grid */}
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filter Sidebar */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white border border-[#E5DDD0] rounded-xl p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#2C211B]">البحث والفلاتر</h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#9A783B] hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط</span>
                </button>
              )}
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="product-search" className="block text-xs font-semibold text-[#6E5F54] mb-2">
                بحث بالاسم
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#6E5F54] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="product-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن عطر، ساعة، حقيبة..."
                  className="w-full bg-[#FAF8F5] border border-[#E5DDD0] rounded-lg pr-9 pl-8 py-2.5 text-sm text-[#2C211B] placeholder:text-[#6E5F54]/60 focus:outline-none focus:border-[#B89352]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="مسح البحث"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6E5F54] hover:text-[#2C211B]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#E5DDD0]">
              <p className="text-xs font-semibold text-[#6E5F54] mb-3">نطاق السعر</p>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <label
                    key={range.id}
                    className="flex items-center gap-2.5 text-sm text-[#2C211B] cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRangeId === range.id}
                      onChange={() => setPriceRangeId(range.id)}
                      className="accent-[#2C211B]"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-4 border-t border-[#E5DDD0]">
              <p className="text-xs font-semibold text-[#6E5F54] mb-3">اللون</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedColor('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                    selectedColor === 'all'
                      ? 'bg-[#2C211B] text-[#FAF8F5] border-[#2C211B]'
                      : 'bg-[#FAF8F5] text-[#6E5F54] border-[#E5DDD0] hover:border-[#2C211B]'
                  }`}
                >
                  الكل
                </button>
                {allColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() =>
                      setSelectedColor((prev) => (prev === color.name ? 'all' : color.name))
                    }
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
                      selectedColor === color.name
                        ? 'bg-[#2C211B] text-[#FAF8F5] border-[#2C211B]'
                        : 'bg-[#FAF8F5] text-[#2C211B] border-[#E5DDD0] hover:border-[#2C211B]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Volume Filter */}
            {allSizes.length > 0 && (
              <div className="pt-4 border-t border-[#E5DDD0]">
                <p className="text-xs font-semibold text-[#6E5F54] mb-3">
                  المقاس / الحجم
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSize('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                      selectedSize === 'all'
                        ? 'bg-[#2C211B] text-[#FAF8F5] border-[#2C211B]'
                        : 'bg-[#FAF8F5] text-[#6E5F54] border-[#E5DDD0] hover:border-[#2C211B]'
                    }`}
                  >
                    الكل
                  </button>
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize((prev) => (prev === size ? 'all' : size))
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                        selectedSize === size
                          ? 'bg-[#2C211B] text-[#FAF8F5] border-[#2C211B]'
                          : 'bg-[#FAF8F5] text-[#2C211B] border-[#E5DDD0] hover:border-[#2C211B]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Product Results */}
        <div className="lg:col-span-9">
          <div className="mb-5 flex items-center justify-between text-xs text-[#6E5F54]">
            <span className="tabular-nums">
              عرض {filteredProducts.length} من أصل {products.length} منتج
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E5DDD0] rounded-xl p-12 text-center">
              <h3 className="text-lg font-bold text-[#2C211B] mb-2">
                لم يتم العثور على منتجات مطابقة
              </h3>
              <p className="text-sm text-[#6E5F54] mb-6">
                جرّب تغيير كلمات البحث أو إزالة بعض الفلاتر لعرض خيارات أكثر.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                عرض جميع المنتجات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

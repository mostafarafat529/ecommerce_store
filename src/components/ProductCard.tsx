import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { getCategoryBySlug } from '../data/categories.js';
import { calculateDiscountPercentage, formatPrice } from '../utils/formatPrice.js';
import { useStore } from '../context/StoreContext';
import SafeImage from './SafeImage';

export interface ProductRecord {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  oldPrice: number | null;
  available: boolean;
  featured: boolean;
  isNew: boolean;
  variants: {
    volumes?: Array<{ label: string; price: number; oldPrice: number | null }>;
    sizes?: string[];
    colors?: Array<{ name: string; hex: string }>;
  };
  specifications: Record<string, string | undefined>;
}

interface ProductCardProps {
  product: ProductRecord;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const categoryObj = getCategoryBySlug(product.category);
  const discountPct = calculateDiscountPercentage(product.price, product.oldPrice);
  const wished = isInWishlist(product.id);

  const handleQuickAdd = () => {
    const defaultVolume = product.variants?.volumes?.[0];
    const defaultSize = product.variants?.sizes?.[0];
    const defaultColor = product.variants?.colors?.[0];

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: product.images[0],
      unitPrice: defaultVolume ? defaultVolume.price : product.price,
      unitOldPrice: defaultVolume ? defaultVolume.oldPrice : product.oldPrice,
      selectedColor: defaultColor?.name,
      selectedSize: defaultSize,
      selectedVolume: defaultVolume?.label,
      quantity: 1,
    });
  };

  // Show at most 1 clean tag per card (discount takes precedence over new)
  const tagLabel =
    discountPct > 0
      ? `خصم ${discountPct}%`
      : product.isNew
      ? 'جديد'
      : null;

  return (
    <article className="group bg-white border border-[#E5DDD0] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(44,33,27,0.14)]">
      <div className="relative aspect-[4/3] bg-[#F2EDE4] overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
        >
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            fallbackLabel={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {tagLabel && (
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide ${
              discountPct > 0
                ? 'bg-[#2C211B] text-[#FAF8F5]'
                : 'bg-[#FAF8F5]/95 text-[#2C211B] border border-[#E5DDD0]'
            }`}
          >
            {tagLabel}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id, product.name)}
          aria-label={wished ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#FAF8F5]/90 hover:bg-white border border-[#E5DDD0] flex items-center justify-center text-[#2C211B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wished ? 'fill-[#B89352] text-[#B89352]' : 'text-[#2C211B]'
            }`}
            strokeWidth={1.7}
          />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#6E5F54] mb-1">
            {categoryObj?.name || 'تشكيلة فيرا'}
          </p>
          <Link
            to={`/product/${product.slug}`}
            className="block text-base font-semibold text-[#2C211B] hover:text-[#9A783B] transition-colors line-clamp-1 mb-2"
          >
            {product.name}
          </Link>

          <div className="flex items-baseline gap-2.5 tabular-nums">
            <span className="text-[15px] font-bold text-[#2C211B]">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-xs text-[#6E5F54] line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#E5DDD0]/80 flex items-center gap-2">
          <button
            type="button"
            disabled={!product.available}
            onClick={handleQuickAdd}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#2C211B] hover:bg-[#4A3930] disabled:bg-[#E5DDD0] disabled:text-[#6E5F54] text-[#FAF8F5] text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#B89352]" />
            <span>{product.available ? 'أضف للسلة' : 'غير متوفر'}</span>
          </button>

          <Link
            to={`/product/${product.slug}`}
            className="inline-flex items-center justify-center border border-[#E5DDD0] hover:border-[#2C211B] text-[#2C211B] text-xs font-medium py-2.5 px-3 rounded-lg transition-colors whitespace-nowrap"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </article>
  );
}

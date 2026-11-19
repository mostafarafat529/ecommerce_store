import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { products } from '../data/products.js';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="pb-6 border-b border-[#E5DDD0] mb-10">
        <p className="text-xs font-semibold text-[#9A783B] mb-1">
          اختياراتك المحفوظة
        </p>
        <h1 className="text-3xl font-bold text-[#2C211B]">
          قائمة المفضلة ({savedProducts.length})
        </h1>
      </div>

      {savedProducts.length === 0 ? (
        <div className="max-w-xl mx-auto py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F2EDE4] border border-[#E5DDD0] flex items-center justify-center mx-auto mb-5">
            <Heart className="w-7 h-7 text-[#B89352]" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-[#2C211B] mb-2">
            قائمة المفضلة فارغة
          </h2>
          <p className="text-sm text-[#6E5F54] mb-7">
            اضغط على أيقونة القلب على أي منتج لحفظه هنا والعودة إليه بسهولة في أي وقت.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            <span>استكشف المنتجات</span>
            <ArrowLeft className="w-4 h-4 text-[#B89352]" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import SafeImage from '../components/SafeImage';

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold text-[#9A783B] mb-2">
          تشكيلة VÉRA STORE
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C211B] mb-3">
          أقسام المتجر
        </h1>
        <p className="text-base text-[#6E5F54] leading-relaxed">
          اختر القسم الذي يناسب احتياجك لاستعراض جميع المنتجات المتوفرة بمواصفاتها الكاملة.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.slug).length;
          return (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group bg-white border border-[#E5DDD0] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-[#F2EDE4] overflow-hidden">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h2 className="text-lg font-bold text-[#2C211B] group-hover:text-[#9A783B] transition-colors">
                      {cat.name}
                    </h2>
                    <span className="text-xs text-[#6E5F54] tabular-nums">
                      {count} منتج
                    </span>
                  </div>
                  <p className="text-sm text-[#6E5F54] leading-relaxed">
                    {cat.shortDesc}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C211B]">
                  <span>تصفح القسم</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#B89352]" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

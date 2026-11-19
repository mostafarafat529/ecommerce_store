import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Layers,
  MessageCircle,
  Sparkles,
  Tag,
} from 'lucide-react';
import { categories } from '../data/categories.js';
import { products } from '../data/products.js';
import { storeConfig } from '../data/store.js';
import ProductCard from '../components/ProductCard';
import SafeImage from '../components/SafeImage';

const whyChooseUsItems = [
  {
    number: '01',
    title: 'جودة المنتجات',
    desc: 'نختار خامات طبيعية من الجلود والكتان والحرير وعطور بتركيزات عالية لضمان تجربة تدوم.',
    icon: Award,
  },
  {
    number: '02',
    title: 'تنوع الاختيارات',
    desc: 'تسعة أقسام متكاملة تجمع بين الأزياء الرجالي والحريمي، العطور، الساعات والإكسسوارات.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'أسعار مناسبة',
    desc: 'قيمة حقيقية بالجنيه المصري مع عروض موسمية وتوفير مباشر دون وسطاء.',
    icon: Tag,
  },
  {
    number: '04',
    title: 'سهولة الطلب',
    desc: 'اختر مواصفاتك وأرسل طلبك في ثوانٍ والدفع نقداً عند الاستلام دون تعقيدات.',
    icon: Sparkles,
  },
  {
    number: '05',
    title: 'التواصل المباشر',
    desc: 'خدمة عملاء سريعة ومباشرة عبر واتساب لتأكيد المقاسات وموعد التوصيل المناسب لك.',
    icon: MessageCircle,
  },
];

export default function HomePage() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 6);
  const bestSellers = products.filter((p) => p.featured).slice(0, 6);
  const specialOffers = products
    .filter((p) => p.oldPrice && p.oldPrice > p.price)
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#FAF8F5] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="space-y-3">
                <p className="font-brand text-sm tracking-[0.2em] uppercase text-[#9A783B] font-semibold" dir="ltr">
                  {storeConfig.slogan}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#2C211B] leading-[1.25]">
                  أناقتك.. هويتك
                  <span className="block text-2xl sm:text-3xl font-medium text-[#6E5F54] mt-2">
                    تشكيلة مختارة لأسلوب حياة راقٍ
                  </span>
                </h1>
              </div>

              <p className="text-base text-[#6E5F54] leading-relaxed max-w-lg">
                اكتشف في VÉRA STORE مجموعة متكاملة من العطور الفاخرة، الملابس الكلاسيكية، الساعات، الشنط الجلدية والأحذية المصممة بعناية للسوق المصري — مع تجربة طلب سلسة ومباشرة عبر واتساب.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] px-7 py-3.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <span>تسوق الآن</span>
                  <ArrowLeft className="w-4 h-4 text-[#B89352]" />
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 border border-[#2C211B]/25 hover:border-[#2C211B] text-[#2C211B] px-6 py-3.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <span>اكتشف المنتجات</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E5DDD0] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6E5F54]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9A783B]" />
                  الدفع عند الاستلام
                </span>
                <span aria-hidden="true">·</span>
                <span>توصيل لجميع محافظات مصر</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">شحن مجاني فوق ٣,٠٠٠ ج.م</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-[#F2EDE4] border border-[#E5DDD0]">
                <SafeImage
                  src={storeConfig.assets.heroImage}
                  alt="تشكيلة VÉRA STORE الفاخرة من العطور والشنط والساعات"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#2C211B]/55 via-[#2C211B]/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 right-5 left-5 flex items-center justify-between text-[#FAF8F5]">
                  <span className="text-xs sm:text-sm font-medium">
                    تشكيلة الموسم الجديد · القاهرة
                  </span>
                  <Link
                    to="/offers"
                    className="text-xs font-semibold text-[#FAF8F5] underline underline-offset-4 hover:text-[#E5DDD0]"
                  >
                    استكشف العروض
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#9A783B] mb-1.5">
              أقسام المتجر
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C211B]">
              تصفح حسب القسم
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2C211B] hover:text-[#9A783B] transition-colors"
          >
            <span>عرض جميع الأقسام</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F2EDE4] border border-[#E5DDD0] block"
              >
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C211B]/85 via-[#2C211B]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-[#FAF8F5] flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold leading-snug">{cat.name}</h3>
                    <p className="text-xs text-[#FAF8F5]/80 mt-1 line-clamp-1">
                      {cat.shortDesc}
                    </p>
                  </div>
                  <span className="text-xs text-[#E5DDD0] whitespace-nowrap shrink-0 tabular-nums">
                    {count} منتج
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[#E5DDD0]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#9A783B] mb-1.5">
              وصل حديثاً
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C211B]">
              أحدث المنتجات
            </h2>
          </div>
          <Link
            to="/products?sort=newest"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2C211B] hover:text-[#9A783B] transition-colors"
          >
            <span>مشاهدة الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Offers Banner & Grid */}
      <section className="bg-[#F2EDE4] border-y border-[#E5DDD0] py-16 sm:py-20 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#9A783B] mb-1.5">
                تخفيضات مختارة
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C211B]">
                العروض والخصومات
              </h2>
            </div>
            <Link
              to="/offers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2C211B] hover:text-[#9A783B] transition-colors"
            >
              <span>جميع العروض</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {specialOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold text-[#9A783B] mb-1.5">
              اختيارات عملائنا
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C211B]">
              الأكثر مبيعاً
            </h2>
          </div>
          <Link
            to="/products?sort=featured"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2C211B] hover:text-[#9A783B] transition-colors"
          >
            <span>تصفح المنتجات المميزة</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E5DDD0]">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold text-[#9A783B] mb-1.5">
            لماذا VÉRA STORE؟
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C211B]">
            تجربة تسوق مصممة على ذوقك
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyChooseUsItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="bg-white border border-[#E5DDD0] rounded-xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-brand text-lg font-bold text-[#B89352] tabular-nums">
                    {item.number}.
                  </span>
                  <IconComponent className="w-5 h-5 text-[#2C211B]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2C211B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6E5F54] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Brand */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto bg-[#F2EDE4]">
            <SafeImage
              src={storeConfig.assets.aboutImage}
              alt="مقر وصالة عرض VÉRA STORE في القاهرة"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-5">
            <p className="text-xs font-semibold text-[#9A783B]">عن البراند</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C211B]">
              أناقة هادئة وتفاصيل تعبّر عن شخصيتك
            </h2>
            <p className="text-sm sm:text-base text-[#6E5F54] leading-relaxed">
              انطلقت VÉRA STORE من القاهرة برؤية تجمع بين الذوق الكلاسيكي الهادئ والعملية اليومية. ننتقي كل قطعة في متجرنا — من العطور الشرقية والفرنسية إلى الأزياء والجلود الطبيعية والساعات — لنمنحك هوية متكاملة بسعر عادل وخدمة توصيل موثوقة لجميع المحافظات.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#2C211B] hover:bg-[#4A3930] text-[#FAF8F5] px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                <span>تواصل مع فريقنا</span>
              </Link>
              <Link
                to="/products"
                className="text-sm font-semibold text-[#2C211B] hover:text-[#9A783B] underline underline-offset-4"
              >
                تصفح الكتالوج الكامل
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

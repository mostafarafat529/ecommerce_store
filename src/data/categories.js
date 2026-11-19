export const categories = [
  {
    id: 'perfumes',
    slug: 'perfumes',
    name: 'البرفانات والعطور',
    shortDesc: 'نفحات شرقية وعالمية بثبات يدوم طويلاً',
    image: '/src/assets/images/prod_perfume_oud_1795094473462.jpg',
  },
  {
    id: 'men-clothing',
    slug: 'men-clothing',
    name: 'الملابس الرجالي',
    shortDesc: 'قصّات كلاسيكية وعملية بخامات طبيعية فاخرة',
    image: '/src/assets/images/prod_men_espresso_blazer_1795094473542.jpg',
  },
  {
    id: 'women-clothing',
    slug: 'women-clothing',
    name: 'الملابس الحريمي',
    shortDesc: 'تصاميم أنثوية راقية من الحرير والكشمير',
    image: '/src/assets/images/prod_women_silk_dress_1795094472669.jpg',
  },
  {
    id: 'watches',
    slug: 'watches',
    name: 'الساعات',
    shortDesc: 'ساعات كلاسيكية وأوتوماتيك بدقة وتفاصيل استثنائية',
    image: '/src/assets/images/prod_watch_gold_chrono_1795094473118.jpg',
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'الإكسسوارات',
    shortDesc: 'أساور وخواتم مطلية بالذهب تكمل إطلالتك اليومية',
    image: '/src/assets/images/prod_accessory_gold_cuff_1795094473939.jpg',
  },
  {
    id: 'bags-wallets',
    slug: 'bags-wallets',
    name: 'الشنط والمحافظ',
    shortDesc: 'جلود طبيعية مصنوعة يدوياً بتفاصيل عملية متينة',
    image: '/src/assets/images/prod_bag_leather_tote_1795094474688.jpg',
  },
  {
    id: 'shoes',
    slug: 'shoes',
    name: 'الأحذية',
    shortDesc: 'أحذية شامواه وجلد طبيعي تجمع بين الراحة والفخامة',
    image: '/src/assets/images/prod_shoes_suede_loafers_1795094474039.jpg',
  },
  {
    id: 'sunglasses',
    slug: 'sunglasses',
    name: 'النظارات الشمسية',
    shortDesc: 'إطارات أسيتات مع حماية كاملة من الأشعة فوق البنفسجية',
    image: '/src/assets/images/prod_sunglasses_tortoise_1795094473548.jpg',
  },
  {
    id: 'personal-care',
    slug: 'personal-care',
    name: 'منتجات العناية الشخصية',
    shortDesc: 'زيوت نباتية ومستحضرات عناية طبيعية يومية',
    image: '/src/assets/images/prod_care_amber_serum_1795094472603.jpg',
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((cat) => cat.slug === slug);

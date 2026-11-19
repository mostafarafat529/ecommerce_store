const PACKAGING_IMG = '/src/assets/images/vera_luxury_packaging_1795094474480.jpg';
const ATELIER_IMG = '/src/assets/images/about_vera_atelier_1795094473529.jpg';

export const products = [
  // 1. البرفانات والعطور
  {
    id: 'perf-01',
    name: 'عطر أوريليا عود أو دو بارفان',
    slug: 'aurelia-oud-eau-de-parfum',
    description:
      'تركيبة عطرية عميقة تمزج بين دهن العود الدافئ والفانيليا المدخنة مع لمسة من البرغموت والخشب المعتق. عطر مصمم للأمسيات الخاصة والإطلالات الواثقة بثبات يمتد طوال اليوم.',
    category: 'perfumes',
    images: [
      '/src/assets/images/prod_perfume_oud_1795094473462.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 1250,
    oldPrice: 1500,
    available: true,
    featured: true,
    isNew: true,
    variants: {
      volumes: [
        { label: '30ml', price: 780, oldPrice: 920 },
        { label: '50ml', price: 1250, oldPrice: 1500 },
        { label: '100ml', price: 1950, oldPrice: 2300 },
      ],
    },
    specifications: {
      gender: 'رجالي / للجنسين (Unisex)',
      scentType: 'خشبي - شرقي - عود وعنبر',
      concentration: 'Eau de Parfum (تركيز ٢٢٪)',
      notes: 'البرغموت، الزعفران، العود الكمبودي، خشب الصندل',
    },
  },
  {
    id: 'perf-02',
    name: 'عطر أورا لونا شامبين روز',
    slug: 'aura-luna-champagne-rose',
    description:
      'عبير زهري ناعم يجمع بين الورد الدمشقي والياسمين الأبيض مع قاعدة دافئة من المسك النقي والعنبر الذهبي، في زجاجة كريستال مصقولة تناسب الذوق الأنثوي الراقي.',
    category: 'perfumes',
    images: [
      '/src/assets/images/prod_perfume_rose_1795094473581.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 1180,
    oldPrice: null,
    available: true,
    featured: true,
    isNew: true,
    variants: {
      volumes: [
        { label: '30ml', price: 750, oldPrice: null },
        { label: '50ml', price: 1180, oldPrice: null },
        { label: '100ml', price: 1850, oldPrice: null },
      ],
    },
    specifications: {
      gender: 'حريمي',
      scentType: 'زهري - فاكهي ناعم - مسك',
      concentration: 'Eau de Parfum (تركيز ٢٠٪)',
      notes: 'الكمثرى، الورد الدمشقي، الفاوانيا، المسك الأبيض',
    },
  },

  // 2. الملابس الرجالي
  {
    id: 'men-01',
    name: 'قميص كتان إيطالي بيج رملي',
    slug: 'italian-linen-sand-shirt',
    description:
      'قميص رجالي بقصة عصرية مريحة من الكتان الطبيعي المسامي بنسبة ١٠٠٪، مثالي للأجواء المصرية المعتدلة والحارة مع ياقة كلاسيكية وأزرار من عرق اللؤلؤ.',
    category: 'men-clothing',
    images: [
      '/src/assets/images/prod_men_linen_shirt_1795094473467.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 1150,
    oldPrice: 1350,
    available: true,
    featured: false,
    isNew: true,
    variants: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'بيج رملي', hex: '#D8C8B4' },
        { name: 'أبيض كريمي', hex: '#F5F2EB' },
        { name: 'بني إسبريسو', hex: '#3E2B22' },
      ],
    },
    specifications: {
      material: 'كتان طبيعي ١٠٠٪ معالج ضد الانكماش',
      fit: 'قصة مريحة (Tailored Regular Fit)',
      care: 'غسيل بارد ٣٠ درجة وكي بالبخار',
    },
  },
  {
    id: 'men-02',
    name: 'بليزر صوف مفصّل بني إسبريسو',
    slug: 'espresso-wool-tailored-blazer',
    description:
      'بليزر رجالي فاخر بتفصيل دقيق وبنية كتف متوازنة تمنحك مظهراً رسمياً أنيقاً في اجتماعات العمل والمناسبات المسائية، مبطن بالكامل لراحة الحركة.',
    category: 'men-clothing',
    images: [
      '/src/assets/images/prod_men_espresso_blazer_1795094473542.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 4200,
    oldPrice: 4950,
    available: true,
    featured: true,
    isNew: false,
    variants: {
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'بني إسبريسو', hex: '#382720' },
        { name: 'بيج داكن', hex: '#8E7965' },
      ],
    },
    specifications: {
      material: '٨٠٪ صوف ناعم، ٢٠٪ فيسكوز عالي الجودة',
      fit: 'قصة محددة أنيقة (Structured Slim Fit)',
      care: 'تنظيف جاف فقط (Dry Clean)',
    },
  },

  // 3. الملابس الحريمي
  {
    id: 'women-01',
    name: 'فستان حرير ميدي بلون الشامبين',
    slug: 'champagne-silk-midi-dress',
    description:
      'فستان نسائي انسيابي بقصة ملتفة ناعمة عند الخصر وياقة واسعة أنيقة، مصنوع من الساتان الحريري الفاخر الذي ينسدل بنعومة ليمنحك إطلالة هادئة ومميزة.',
    category: 'women-clothing',
    images: [
      '/src/assets/images/prod_women_silk_dress_1795094472669.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 2850,
    oldPrice: null,
    available: true,
    featured: true,
    isNew: true,
    variants: {
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'شامبين عاجي', hex: '#ECE2D0' },
        { name: 'بني موكا', hex: '#634A3C' },
      ],
    },
    specifications: {
      material: 'حرير ساتان طبيعي بملمس ناعم غير شفاف',
      fit: 'انسيابي مع رباط جانبي لتحديد الخصر',
      care: 'غسيل يدوي لطيف أو تنظيف جاف',
    },
  },
  {
    id: 'women-02',
    name: 'معطف ترينش كشمير كلاسيك كامل',
    slug: 'camel-cashmere-trench-coat',
    description:
      'معطف ترينش بتصميم أوروبي خالد بلون الكامل الدافئ مع حزام خصر متطابق وأزرار كلاسيكية داكنة، قطعة أساسية تدوم لسنوات في خزانتك الشتوية.',
    category: 'women-clothing',
    images: [
      '/src/assets/images/prod_women_camel_trench_1795094473453.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 4650,
    oldPrice: 5400,
    available: true,
    featured: true,
    isNew: false,
    variants: {
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'كامل دافئ', hex: '#B9926A' },
        { name: 'بيج فاتح', hex: '#DFD3C3' },
      ],
    },
    specifications: {
      material: 'مزيج الصوف والكشمير الفاخر مع بطانة كاملة',
      fit: 'قصة كلاسيكية مريحة بطول متوسط',
      care: 'تنظيف جاف فقط للحفاظ على نعومة الوبر',
    },
  },

  // 4. الساعات
  {
    id: 'watch-01',
    name: 'ساعة كرونوغراف كلاسيكية جلد وذهب',
    slug: 'classic-gold-leather-chronograph',
    description:
      'ساعة رجالية فاخرة بإطار من الستينلس ستيل المطلي بالذهب المصقول، مينا كريمي بتفاصيل كرونوغراف دقيقة وسوار من الجلد الطبيعي المنقوش بلون الشوكولاتة الداكن.',
    category: 'watches',
    images: [
      '/src/assets/images/prod_watch_gold_chrono_1795094473118.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 3800,
    oldPrice: 4400,
    available: true,
    featured: true,
    isNew: true,
    variants: {
      colors: [
        { name: 'بني داكن / ذهبي', hex: '#432E24' },
        { name: 'أسود كلاسيك / ذهبي', hex: '#1E1B18' },
      ],
    },
    specifications: {
      watchType: 'كرونوغراف ياباني عالي الدقة مع نافذة تاريخ',
      strapType: 'سوار جلد طبيعي مبطن بإبزيم ذهبي',
      material: 'ستينلس ستيل 316L مطلي ذهب، زجاج ياقوتي مقاوم للخدش',
      dimensions: 'قطر الهيكل ٤١ مم · سمك ١٠.٥ مم · مقاومة ماء 5ATM',
    },
  },
  {
    id: 'watch-02',
    name: 'ساعة دريس مينيمال ستيل وشامبين',
    slug: 'minimal-steel-champagne-watch',
    description:
      'ساعة نحيفة فائقة الأناقة تناسب الرجال والنساء على حد سواء، بمينا شامبين مصقول وعقارب بلون الذهب الوردي مع سوار شبكي من الفولاذ المقاوم للصدأ.',
    category: 'watches',
    images: [
      '/src/assets/images/prod_watch_steel_dress_1795094474368.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 2950,
    oldPrice: null,
    available: true,
    featured: false,
    isNew: true,
    variants: {
      colors: [
        { name: 'فضي ستيل / شامبين', hex: '#C9C6C0' },
        { name: 'ذهبي وردي', hex: '#C79F89' },
      ],
    },
    specifications: {
      watchType: 'كوارتز سويسري فائق النحافة',
      strapType: 'سوار ميلانيز شبكي قابل للتعديل بسهولة',
      material: 'ستينلس ستيل مصقول مقاوم للصدأ',
      dimensions: 'قطر الهيكل ٣٨ مم · سمك ٧ مم · مقاومة ماء 3ATM',
    },
  },

  // 5. الإكسسوارات
  {
    id: 'acc-01',
    name: 'طقم سوار وخاتم منحوت مطلي ذهب',
    slug: 'sculpted-gold-cuff-and-ring-set',
    description:
      'طقم إكسسوار فاخر يضم سواراً مفتوحاً بتصميم منحوت غير لامع مع خاتم متناسق، مطلي بطبقة سميكة من الذهب عيار ١٨ المقاوم لتغير اللون.',
    category: 'accessories',
    images: [
      '/src/assets/images/prod_accessory_gold_cuff_1795094473939.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 950,
    oldPrice: 1150,
    available: true,
    featured: false,
    isNew: true,
    variants: {
      colors: [
        { name: 'ذهبي مطفي عيار ١٨', hex: '#C5A059' },
        { name: 'فضي مصقول', hex: '#C4C2BE' },
      ],
      sizes: ['مقاس قياسي', 'مقاس كبير'],
    },
    specifications: {
      material: 'نحاس نقي مطلي ذهب عيار ١٨ خالٍ من النيكل',
      sizeDetails: 'السوار قابل للتعديل الطفيف ليناسب أغلب المعاصم',
      usage: 'مناسب للاستخدام اليومي والمناسبات؛ يُفضل تجنب رش العطر مباشرة',
    },
  },

  // 6. الشنط والمحافظ
  {
    id: 'bag-01',
    name: 'حقيبة توت جلد طبيعي بني إسبريسو',
    slug: 'espresso-full-grain-leather-tote',
    description:
      'حقيبة يد نسائية مهيكلة مصنوعة يدوياً من الجلد البقري الطبيعي المحبب بالكامل، مزودة بقفل معدني نحاسي مصقول وحزام كتف قابل للإزالة لتناسب العمل والمشوار اليومي.',
    category: 'bags-wallets',
    images: [
      '/src/assets/images/prod_bag_leather_tote_1795094474688.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 3450,
    oldPrice: 3950,
    available: true,
    featured: true,
    isNew: false,
    variants: {
      colors: [
        { name: 'بني إسبريسو', hex: '#3B2820' },
        { name: 'كونياك دافئ', hex: '#8F5333' },
        { name: 'أسود كلاسيك', hex: '#1C1917' },
      ],
    },
    specifications: {
      dimensions: 'العرض ٣٢ سم × الارتفاع ٢٤ سم × العمق ١٣ سم',
      material: 'جلد طبيعي ١٠٠٪ (Full-Grain Calfskin) مع بطانة قطنية',
      pockets: '٣ جيوب داخلية (جيب بسحّاب + جيب للهاتف + قسم رئيسي)',
      designDetails: 'خياطة سادل مزدوجة وقواعد معدنية سفلية للحماية',
    },
  },
  {
    id: 'bag-02',
    name: 'محفظة جلد طبيعي يدوية لون كونياك',
    slug: 'cognac-handcrafted-bifold-wallet',
    description:
      'محفظة رجالية نحيفة مطوية بخياطة يدوية متقنة من الجلد الطبيعي الفاخر بلون الكونياك الذي يكتسب طابعاً أعمق مع مرور الوقت، بتصميم عملي يناسب الجيب الأمامي.',
    category: 'bags-wallets',
    images: [
      '/src/assets/images/prod_wallet_cognac_bifold_1795094473469.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 790,
    oldPrice: null,
    available: true,
    featured: false,
    isNew: true,
    variants: {
      colors: [
        { name: 'كونياك', hex: '#8E4E2D' },
        { name: 'بني داكن', hex: '#3A2820' },
      ],
    },
    specifications: {
      dimensions: '١١ سم × ٩ سم (سمك ١.٢ سم)',
      material: 'جلد بقري طبيعي مدبوغ نباتياً',
      pockets: '٦ فتحات للبطاقات + جيبان مخفيان + قسم للأوراق النقدية',
      designDetails: 'حواف مصقولة بالشمع الطبيعي وتقنية حماية RFID',
    },
  },

  // 7. الأحذية
  {
    id: 'shoe-01',
    name: 'حذاء لوفر شامواه إسبريسو رجالي',
    slug: 'espresso-suede-penny-loafers',
    description:
      'حذاء لوفر رجالي كلاسيكي مصنوع من الشامواه الإيطالي الناعم بلون الإسبريسو الغني، مع نعل جلدي مبطن يمنحك راحة فائقة طوال اليوم في العمل والمناسبات.',
    category: 'shoes',
    images: [
      '/src/assets/images/prod_shoes_suede_loafers_1795094474039.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 2450,
    oldPrice: 2850,
    available: true,
    featured: true,
    isNew: false,
    variants: {
      sizes: ['40', '41', '42', '43', '44', '45'],
      colors: [
        { name: 'بني إسبريسو', hex: '#422D23' },
        { name: 'بيج رملي', hex: '#B9A68E' },
      ],
    },
    specifications: {
      material: 'شامواه طبيعي مقاوم للبقع الخفيفة مع بطانة جلدية مسامية',
      sole: 'نعل مطاطي مدمج بالجلد لثبات ومرونة الحركة',
      care: 'تنظيف بفرشاة الشامواه الجافة فقط',
    },
  },
  {
    id: 'shoe-02',
    name: 'حذاء سلينج باك كعب مريح بيج رملي',
    slug: 'sand-beige-slingback-heels',
    description:
      'حذاء نسائي أنيق بمقدمة مدببة ناعمة وكعب عريض بارتفاع مثالي للثبات والراحة طوال اليوم، مصنوع من الجلد الطبيعي اللين بلون بيج رملي يلائم كافة الإطلالات.',
    category: 'shoes',
    images: [
      '/src/assets/images/prod_shoes_beige_heels_1795094472937.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 2150,
    oldPrice: null,
    available: true,
    featured: false,
    isNew: true,
    variants: {
      sizes: ['37', '38', '39', '40', '41'],
      colors: [
        { name: 'بيج رملي', hex: '#C9B199' },
        { name: 'بني داكن', hex: '#443129' },
      ],
    },
    specifications: {
      material: 'جلد طبيعي ناعم مع وسادة قدم مبطنة بالميموري فوم',
      sole: 'ارتفاع الكعب ٥ سم (Block Heel مريح)',
      care: 'يمسح بقطعة قماش قطنية ناعمة ويُحفظ داخل كيس القماش المرفق',
    },
  },

  // 8. النظارات الشمسية
  {
    id: 'sun-01',
    name: 'نظارة شمسية تورتويز كلاسيك بأذرع ذهبية',
    slug: 'classic-tortoise-gold-sunglasses',
    description:
      'نظارة شمسية للجنسين بإطار أسيتات يدوي الصنع بنقشة التورتويز الدافئة وأذرع معدنية رفيعة مطلية بالذهب، مع عدسات عنبرية مستقطبة لحماية متكاملة للعين.',
    category: 'sunglasses',
    images: [
      '/src/assets/images/prod_sunglasses_tortoise_1795094473548.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 1450,
    oldPrice: 1750,
    available: true,
    featured: false,
    isNew: true,
    variants: {
      colors: [
        { name: 'تورتويز عنبري / ذهبي', hex: '#7A4924' },
        { name: 'أسود مطفي / ذهبي', hex: '#23201E' },
      ],
    },
    specifications: {
      material: 'أسيتات إيطالي طبيعي + معدن تيتانيوم مطلي ذهب',
      lenses: 'حماية UV400 كاملة مع فلتر استقطاب (Polarized) ضد الوهج',
      dimensions: 'عرض العدسة ٥٠ مم · الجسر ٢١ مم · الذراع ١٤٥ مم',
    },
  },

  // 9. منتجات العناية الشخصية
  {
    id: 'care-01',
    name: 'زيت العناية النباتي بالعود وخشب الصندل',
    slug: 'botanical-sandalwood-body-oil',
    description:
      'زيت علاجي فاخر للجسم والبشرة واللحية، مستخلص من زيوت الجوجوبا واللوز الحلو والفيتامين E المعطرة بنفحات خشب الصندل والعرعر لترطيب عميق دون ملمس دهني.',
    category: 'personal-care',
    images: [
      '/src/assets/images/prod_care_amber_serum_1795094472603.jpg',
      PACKAGING_IMG,
      ATELIER_IMG,
    ],
    price: 680,
    oldPrice: 820,
    available: true,
    featured: false,
    isNew: true,
    variants: {
      volumes: [
        { label: '50ml', price: 420, oldPrice: 500 },
        { label: '100ml', price: 680, oldPrice: 820 },
      ],
    },
    specifications: {
      ingredients: 'زيت الجوجوبا العضوي، زيت اللوز الحلو، فيتامين E، خلاصة الصندل',
      suitableFor: 'مناسب لجميع أنواع البشرة ولترطيب اللحية والشعر',
      usage: 'يوضع ٣-٥ قطرات على بشرة نظيفة ورطبة مع تدليك لطيف',
    },
  },
];

export const getProductBySlug = (slug) =>
  products.find((item) => item.slug === slug);

export const getProductById = (id) =>
  products.find((item) => item.id === id);

export const getRelatedProducts = (product, limit = 4) => {
  const sameCategory = products.filter(
    (item) => item.id !== product.id && item.category === product.category
  );
  const others = products.filter(
    (item) => item.id !== product.id && item.category !== product.category
  );
  return [...sameCategory, ...others].slice(0, limit);
};

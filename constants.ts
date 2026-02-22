import { GraduationCap, Briefcase, Zap, Star, Layout, PenTool, Smartphone, Monitor, Search, Coffee, Rocket, MessageSquare } from 'lucide-react';

export const IMAGES = {
  PROFILE: "https://e.top4top.io/p_3665za6ix1.jpg",
  PLACEHOLDER: "https://picsum.photos/1200/800"
};

export const NAV_LINKS = [
  { name: "الرئيسية", href: "#hero" },
  { name: "أعمالنا", href: "#work" },
  { name: "الخطوات", href: "#workflow" },
  { name: "باقاتنا", href: "#packages" },
  { name: "تواصل معنا", href: "#contact" },
];

export const SERVICES = [
  {
    title: "هوية بصرية",
    description: "تصميم هوية كاملة تميزك في السوق وتطبع في أذهان العملاء.",
    icon: Star
  },
  {
    title: "تصميم واجهات",
    description: "تجربة مستخدم سلسة وتصاميم عصرية للمواقع والتطبيقات.",
    icon: Layout
  },
  {
    title: "موشن جرافيك",
    description: "تحريك احترافي يوصل فكرتك بشكل مبدع وسريع.",
    icon: Zap
  },
  {
    title: "إدارة محتوى",
    description: "نصنع لك محتوى يفاعل الجمهور ويزيد من ولاء العملاء.",
    icon: PenTool
  }
];

export const WORKFLOW_STEPS = [
  {
    id: "01",
    title: "التحليل والاستراتيجية",
    description: "نجلس معك، نفهم أهدافك، نحلل منافسيك، ونرسم خارطة طريق واضحة للمشروع.",
    icon: Search
  },
  {
    id: "02",
    title: "التصميم والتطوير",
    description: "مرحلة السحر. نحول الأفكار إلى تصاميم بصرية ونماذج أولية تلامس الحواس.",
    icon: PenTool
  },
  {
    id: "03",
    title: "التنفيذ والمراجعة",
    description: "نحول التصميم لمنتج نهائي، ونراجعه بدقة بكسل بكسل لضمان الجودة.",
    icon: Coffee
  },
  {
    id: "04",
    title: "الإطلاق والتحليق",
    description: "نسلمك المشروع بجودته الكاملة، ونكون معك في لحظة الانطلاق نحو النجاح.",
    icon: Rocket
  }
];

export const REVIEWS = [
  {
    name: "أحمد العلي",
    role: "مدير تنفيذي - TechCore",
    content: "تجربة استثنائية مع داغر. فهموا هويتنا من أول اجتماع وحولوها لشيء يفوق التوقعات.",
    stars: 5
  },
  {
    name: "سارة محمد",
    role: "مؤسسة براند LUNA",
    content: "الاهتمام بالتفاصيل عندهم مرعب! كل بكسل كان مدروس، والنتيجة كانت موقع عالمي.",
    stars: 5
  },
  {
    name: "خالد يوسف",
    role: "مدير تسويق",
    content: "سرعة في التنفيذ وجودة في المخرجات. نادراً ما تجد فريق يجمع بين الاثنين بهذا الاحتراف.",
    stars: 4
  },
  {
    name: "نور الهدي",
    role: "Creative Director",
    content: "لم يكن مجرد تصميم، كان شراكة حقيقية. أضافوا قيمة كبيرة لمشروعنا باقتراحاتهم.",
    stars: 5
  },
  {
    name: "فهد السالم",
    role: "رائد أعمال",
    content: "الباقات عندهم واضحة وقيمة مقابل سعر ممتازة جداً. أنصح أي شركة ناشئة بالتعامل معهم.",
    stars: 5
  }
];

export const FAQS = [
  {
    question: "كم يستغرق تنفيذ مشروع هوية بصرية كاملة؟",
    answer: "يعتمد ذلك على حجم المشروع، لكن عادة ما تتراوح المدة بين أسبوعين إلى 4 أسابيع لضمان أدق التفاصيل."
  },
  {
    question: "هل تقدمون خدمة التعديلات بعد التسليم؟",
    answer: "بالتأكيد. نؤمن بأن العمل المشترك يتطلب مرونة، لذا نقدم جولات تعديل مجانية ضمن كل باقة لضمان رضاك التام."
  },
  {
    question: "ما هي البرامج التي تستخدمونها في العمل؟",
    answer: "نستخدم أحدث أدوات الصناعة: Adobe Creative Suite (Illustrator, Photoshop, After Effects) بالإضافة إلى Blender للثري دي."
  },
  {
    question: "كيف تتم عملية الدفع؟",
    answer: "نعمل بنظام الدفعات لضمان حق الطرفين: 50% كدفعة أولى عند البدء، و50% عند التسليم النهائي للمشروع."
  }
];

export const STATS = [
  { label: "مشروع منجز", value: "216" },
  { label: "عميل سعيد", value: "98%" },
  { label: "سنة خبرة", value: "7" },
  { label: "جوائز", value: "12" },
];

export const MARQUEE_TEXT = "إبداع • قوة • تميز • داغر • تصميم • فن • رؤية • مستقبل •";
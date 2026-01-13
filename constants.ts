import { GraduationCap, Briefcase, Zap, Star, Layout, PenTool, Smartphone, Monitor } from 'lucide-react';

export const IMAGES = {
  PROFILE: "https://instagram.fosm4-3.fna.fbcdn.net/v/t51.2885-19/487910738_671943322076818_1459816507954062544_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fosm4-3.fna.fbcdn.net&_nc_cat=110&_nc_oc=Q6cZ2QHXjMsMKQ_XDhRDQw7cNYyQ8pX8qzMmk1TobV6oI1ricXpXiVkxc_b0auA608oCEFk&_nc_ohc=NCLRtfZ3MiEQ7kNvwEUmc0w&_nc_gid=uvD10qrRCqU8jwTejORTCQ&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfpApeQA_6Ihmf-3_RwGs3HeRwjGAJYPX4liTm0OUo915g&oe=696C231B&_nc_sid=7a9f4b",
  PLACEHOLDER: "https://picsum.photos/1200/800"
};

export const NAV_LINKS = [
  { name: "الرئيسية", href: "#hero" },
  { name: "أعمالنا", href: "#work" },
  { name: "خدماتنا", href: "#services" },
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

export const STATS = [
  { label: "مشروع منجز", value: "216" },
  { label: "عميل سعيد", value: "98%" },
  { label: "سنة خبرة", value: "7" },
  { label: "جوائز", value: "12" },
];

export const MARQUEE_TEXT = "إبداع • قوة • تميز • داغر • تصميم • فن • رؤية • مستقبل •";
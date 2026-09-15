# [Brand Name] — Product Landing Page

لاندنج بيج لمنتج واحد، مصممة كصفحة إعلانية (ad-page) هدفها تحول الزوار لطلبات واتساب.

## الستاك

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS — باليت خاصة بهالصفحة (أسود دافئ + ذهبي شامبين)، مش نفس ألوان بورتفوليو Trendora
- Motion (`motion/react`) للحركة
- Three.js عبر `@react-three/fiber` — خلفية ضوئية متحركة (ambient) بالهيرو وبقسم الطلب الأخير، مش مجسم منتج

## أهم تفاعل بالصفحة

قسم "الحكاية" فيه فقرة بتتعبى/تتلون تدريجيًا وانت عم تنزل بالسكرول (`components/ScrollRevealText.tsx`) — هاد هو الـ scroll trigger يلي طلبته بدل المجسم 3D.

## التشغيل محليًا

```bash
npm install
npm run dev
```

افتح http://localhost:3000

## وين تحط التفاصيل الحقيقية

1. **رقم الواتساب واسم البراند** → `lib/config.ts`
2. **كل نصوص الموقع (عربي/انجليزي)** → `lib/i18n/dictionaries.ts` — كل شي بين `[...]` استبدله بمحتوى حقيقي
3. **صورة المنتج بالهيرو** → استبدل الـ placeholder box جوا `components/HeroSection.tsx` بصورة حقيقية عبر `next/image`
4. **صور المعرض** → `components/GallerySection.tsx`
5. **الألوان والخطوط** → `tailwind.config.ts` و `app/layout.tsx`

## مكونات الصفحة

Navbar (شفاف فوق الهيرو، بيصير solid بعد ما تنزل) → Hero (خلفية داكنة + إضاءة Three.js) → شريط تيكر متحرك → الحكاية (scroll-fill text) → المزايا → المعرض → آراء الزبائن → أسئلة شائعة (accordion) → CTA أخيرة (نفس خلفية الهيرو الداكنة) → Footer

وفي كمان **شريط طلب ثابت** (`StickyOrderBar`) بيظهر بأسفل الشاشة بعد ما تعدي الهيرو، فيه اسم المنتج والسعر وزر واتساب — عشان الزبون يقدر يطلب من أي مكان بالصفحة بدون ما يرجع لفوق.

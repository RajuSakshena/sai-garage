import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  Phone,
  Bike,
  Car,
  Wrench,
  Battery,
  BatteryLow,
  ClipboardList,
  CalendarCheck,
  CalendarClock,
  Cog,
  CheckCircle2,
  Zap,
  IndianRupee,
  Volume2,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  MapPin,
  Plus,
  Minus,
  Info,
  Quote,
  Star,
  Check,
} from 'lucide-react';

/* ==================================================================
   IMAGE IMPORTS — all homepage images live here.
   To replace an image: put the new file in src/images and update the
   filename/extension on the matching line below (keep the variable name).
   The logo is handled in Navbar.tsx, not here.
================================================================== */
import heroImg from '../images/hero1.png';
import superbikesImg from '../images/superbikes.png';
import scooterImg from '../images/Scooter.png';
import carsImg from '../images/cars.png';
import generalServicesImg from '../images/general_services.png';
import engineRepairImg from '../images/engine_repair.png';
import batteryServiceImg from '../images/battery_service.png';
import quickRepairsImg from '../images/quick_repairs.png';
import serviceChecklistImg from '../images/service_checklist.png';
import whyChooseImg from '../images/whychoose.png';

/* ==================================================================
   IMAGE MAP — which image is used in which homepage section.
================================================================== */
const IMAGES = {
  hero: heroImg, // Hero section (right side)
  vehicles: {
    bike: superbikesImg, // Vehicles We Repair → Bike card
    scooter: scooterImg, // Vehicles We Repair → Scooter card
    car: carsImg, // Vehicles We Repair → Car card
  },
  services: {
    general: generalServicesImg, // What We Offer → General Service
    engine: engineRepairImg, // What We Offer → Engine Repair
    battery: batteryServiceImg, // What We Offer → Battery Service
    quick: quickRepairsImg, // What We Offer → Quick Repairs
  },
  checklist: serviceChecklistImg, // Service Checklist section
  whyChoose: whyChooseImg, // Why Choose Sai Garage section
};

const PHONE = '+91 7850986841';
const TEL = 'tel:+917850986841';
const WHATSAPP = 'https://wa.me/917850986841';
const ADDRESS_LINES = 'Krishna Park, Krishna Park Extension, Tilak Nagar, New Delhi, Delhi, 110018';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_LINES)}`;

/* WhatsApp brand glyph (inline SVG, no extra dependency). Inherits colour via currentColor. */
function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   EDITABLE CONTENT — change text / prices here, no need to touch JSX.
   Prices below are "starting at" rates carried over from the earlier
   homepage. Please confirm them before going live.
------------------------------------------------------------------- */

const trustItems = [
  { icon: Wrench, text: 'Bike, Scooter and Car Repairs' },
  { icon: CalendarCheck, text: 'Convenient Service Booking' },
  { icon: IndianRupee, text: 'Clear Pricing' },
  { icon: WhatsAppIcon, text: 'Call and WhatsApp Support' },
];

const vehicles = [
  {
    name: 'Bike',
    icon: Bike,
    image: IMAGES.vehicles.bike,
    desc: 'Servicing and repairs for commuter, classic and sports bikes.',
    points: ['Regular & periodic service', 'Engine and brake work', 'Chain, clutch and electrical checks'],
    note: 'Packages cover engine sizes from 100 CC to above 500 CC. See the price list below.',
    cta: 'Book a bike service',
  },
  {
    name: 'Scooter',
    icon: Bike,
    image: IMAGES.vehicles.scooter,
    desc: 'Everyday scooter care to keep your ride smooth and dependable.',
    points: ['General service', 'Battery and electrical check-up', 'Brake and tyre air check'],
    note: 'Popular models such as Honda Activa, TVS Jupiter, Hero Destini, Suzuki Access and Yamaha Fascino.',
    cta: 'Book a scooter service',
  },
  {
    name: 'Car',
    icon: Car,
    image: IMAGES.vehicles.car,
    desc: 'Car servicing and repairs. Pricing depends on model and work needed.',
    points: ['Oil and filter service', 'Battery service', 'Engine and general repairs'],
    note: 'Car pricing varies by model and type of service. Call or WhatsApp us for a quote.',
    cta: 'Get a car service quote',
  },
];

const services = [
  {
    name: 'General Service',
    tag: 'Routine maintenance',
    icon: ClipboardList,
    image: IMAGES.services.general,
    desc: 'Complete routine servicing with oil, filter and plug care.',
    includes: ['Engine oil change', 'Oil filter, air filter and spark plug clean', 'Brake and chain adjustment'],
    cta: 'Book a general service',
  },
  {
    name: 'Engine Repair',
    tag: 'Noise, power and mileage',
    icon: Cog,
    image: IMAGES.services.engine,
    desc: 'Inspection and repair for engine noise, power loss or poor mileage.',
    includes: ['Basic engine inspection', 'Carburettor check-up', 'Average and performance check'],
    cta: 'Ask about engine repair',
  },
  {
    name: 'Battery Service',
    tag: 'Starting and charging',
    icon: Battery,
    image: IMAGES.services.battery,
    desc: 'Battery check-up, charging and replacement when required.',
    includes: ['Battery general check-up', 'Minor electrical check-up', 'Replacement when required'],
    cta: 'Ask about battery service',
  },
  {
    name: 'Quick Repairs',
    tag: 'Minor faults',
    icon: Zap,
    image: IMAGES.services.quick,
    desc: 'Fast fixes for minor faults so you can get moving again.',
    includes: ['Puncture fix', 'Brake adjustment', 'Tightening of screws, bolts and nuts'],
    cta: 'Book a quick repair',
  },
];

const packages = [
  { title: 'Regular Service', range: '100 CC, 110 CC, 125 CC', price: 'Rs. 299', featured: true },
  { title: 'Classic Service', range: '135 CC, 160 CC, 200 CC', price: 'Rs. 399', featured: false },
  { title: 'Premium Service', range: '220 CC, 250 CC, 300 CC', price: 'Rs. 450', featured: false },
  { title: 'Royal Service', range: '350 CC, 400 CC, 450 CC', price: 'Rs. 499', featured: false },
  { title: 'Sports Service', range: 'Above 500 CC, 600 CC, 650 CC', price: 'Rs. 599', featured: false },
];

const packageIncludes = ['Engine Oil Change', 'Oil Filter Clean', 'Air Filter Clean', 'Spark Plug Clean'];

const checklist = [
  'Coolant check-up',
  'Basic hand cleaning',
  'Oiling and greasing',
  'Battery general check-up',
  'Basic engine inspection',
  'Basic fork inspection',
  'Carburettor basic check-up',
  'Minor electrical check-up',
  'Brakes – front & rear adjust',
  'Drive chain basic cleaning',
  'Tightening of screws, bolts & nuts',
  'Average and performance check-up',
  'Tyre air fill (tubeless only)',
  'Pick and drop (if needed)',
];

const reasons = [
  { icon: Volume2, title: 'Unusual engine noise', desc: 'Knocking, ticking or rattling that was not there before.' },
  { icon: BatteryLow, title: 'Battery trouble', desc: 'Slow starting, weak lights or a battery that keeps running down.' },
  { icon: ShieldAlert, title: 'Braking concerns', desc: 'Soft, noisy or uneven brakes are worth checking early.' },
  { icon: CalendarClock, title: 'Routine maintenance', desc: 'Regular servicing keeps your vehicle reliable and efficient.' },
  { icon: Wrench, title: 'Minor repairs', desc: 'Small faults are easier to fix before they grow into big ones.' },
];

const whyChoose = [
  { icon: MapPin, text: 'Hassle-free doorstep service', desc: 'We come to your home or office, so there is no trip to a workshop.' },
  { icon: UserCheck, text: 'Skilled and experienced technicians', desc: 'Servicing and repairs are handled by experienced mechanics.' },
  { icon: IndianRupee, text: 'Honest, transparent pricing', desc: 'Package prices are listed up front and we confirm the price with you.' },
  { icon: ShieldCheck, text: 'Quality parts and lubricants', desc: 'Parts and engine oil are charged separately, so you see what you pay for.' },
  { icon: Zap, text: 'Fast and professional service', desc: 'Booking by call or WhatsApp keeps the whole process quick and simple.' },
];

const steps = [
  { step: '01', title: 'Contact Sai Garage', desc: 'Call or WhatsApp us with your vehicle and the service you need.', icon: CalendarCheck },
  { step: '02', title: 'Confirm the Details', desc: 'We confirm your location, the service details and the applicable price.', icon: ClipboardList },
  { step: '03', title: 'Service at Your Doorstep', desc: "Arrange the mechanic's visit and get the agreed work completed at your doorstep.", icon: Wrench },
];

const ncrAreas = ['Delhi', 'Noida', 'Greater Noida', 'Gurugram', 'Ghaziabad', 'Faridabad'];

/* ------------------------------------------------------------------
   TESTIMONIALS — customer reviews carried over from the earlier
   homepage, with the business name updated to Sai Garage. Make sure
   you are entitled to publish them under the Sai Garage name. Set
   `status: 'pending'` on any review to show a "Pending verification"
   note on its card. `vehicle` is shown only when the review states it.
------------------------------------------------------------------- */
type Testimonial = {
  name: string;
  quote: string;
  rating: number;
  source: string;
  vehicle?: string;
  status: 'approved' | 'pending';
};

const testimonials: Testimonial[] = [
  {
    name: 'Surendra Pratap Singh',
    quote:
      'I had an excellent experience with Sai Garage. The team was knowledgeable and professional, delivering high-quality service along with valuable maintenance guidance.',
    rating: 5,
    source: 'Google review',
    status: 'approved',
  },
  {
    name: 'Dharmendra Gupta',
    quote:
      'I discovered Sai Garage through Google and was initially unsure, but they provided video evidence of the service. Their work is professional, transparent, and highly reliable.',
    rating: 5,
    source: 'Google review',
    status: 'approved',
  },
  {
    name: 'Rohit Prasad',
    quote:
      'Sai Garage provides excellent services, whether you’re stranded or prefer to stay at home. They offer a comprehensive range of reliable and convenient solutions.',
    rating: 5,
    source: 'Google review',
    status: 'approved',
  },
  {
    name: 'Prabhjeet Sharma',
    quote:
      'When my bike broke down, Sai Garage responded immediately. The mechanic arrived the next morning, providing prompt and highly professional service',
    rating: 5,
    source: 'Google review',
    vehicle: 'Bike',
    status: 'approved',
  },
];

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

const brands = [
  'Hero', 'Honda', 'TVS', 'Bajaj', 'Suzuki', 'Yamaha', 'Royal Enfield', 'KTM',
  'Kawasaki', 'Vespa', 'Aprilia', 'Jawa', 'Yezdi', 'Ather', 'Ola Electric',
];

const faqs = [
  {
    q: 'Which vehicles does Sai Garage service?',
    a: 'We service bikes, scooters and cars. Our bike packages cover engine sizes from 100 CC to above 500 CC, and we work on the brands listed on this page. If you do not see your brand, call or WhatsApp us and we will let you know.',
  },
  {
    q: 'How do I book a doorstep visit?',
    a: 'Call or WhatsApp us with your vehicle and the service you need. We confirm your location, the service details and the price, then arrange the mechanic’s visit.',
  },
  {
    q: 'How can I confirm the final service price?',
    a: 'Bike package prices are starting rates based on engine size, and car pricing depends on the model and the work needed. Share your vehicle details on call or WhatsApp and we will confirm the price for your vehicle.',
  },
  {
    q: 'Are parts and engine oil included in every package?',
    a: 'No. The package price covers the listed service work. Parts and engine oil are charged extra where applicable.',
  },
  {
    q: 'Which Delhi NCR locations are covered?',
    a: 'We offer doorstep service across Delhi, Noida, Greater Noida, Gurugram, Ghaziabad and Faridabad. Contact us to confirm availability for your specific location.',
  },
  {
    q: 'How can I contact Sai Garage?',
    a: `Call us on ${PHONE} or message us on WhatsApp using the buttons on this page.`,
  },
];

/* ------------------------------------------------------------------
   Shared style strings
------------------------------------------------------------------- */
const WRAP = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8';
const SECTION = 'py-16 sm:py-20 lg:py-28';
const BTN =
  'inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-base font-bold leading-none tracking-[-0.005em] transition duration-200 focus-visible:outline-none';
const BTN_PRIMARY = `${BTN} bg-[#E51B12] text-white shadow-lg shadow-[#E51B12]/25 hover:-translate-y-0.5 hover:bg-[#c4150d]`;
const BTN_OUTLINE = `${BTN} border-2 border-[#111111] bg-white text-[#111111] hover:-translate-y-0.5 hover:border-[#E51B12] hover:text-[#E51B12]`;

/* Fade-up on scroll. Content stays visible if JS or IntersectionObserver is
   unavailable, or if the visitor prefers reduced motion. Only opacity and
   transform animate, so there is no layout shift. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already on screen at load: leave it visible, no hide-then-show flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setState('hidden');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('shown');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const motion = state === 'idle' ? '' : state === 'hidden' ? 'sg-reveal' : 'sg-reveal sg-in';
  return (
    <div
      ref={ref}
      className={`${motion} ${className}`}
      style={state === 'idle' || delay === 0 ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  label,
  title,
  intro,
  className = '',
  center = false,
}: {
  label: string;
  title: string;
  intro?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`${className} ${center ? 'text-center' : ''}`}>
      <p className={`mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#E51B12] ${center ? 'justify-center' : ''}`}>
        <span className="h-0.5 w-8 bg-[#E51B12]" aria-hidden="true" />
        {label}
      </p>
      <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-[-0.025em] sm:text-4xl lg:text-5xl">{title}</h2>
      {intro && (
        <p className={`mt-4 max-w-xl text-base leading-[1.7] text-gray-600 sm:text-lg ${center ? 'mx-auto' : ''}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}

const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* On refresh, always start from the top (browser would otherwise restore the old scroll position). */
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === 'reload' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sg-root overflow-x-clip bg-white text-[#111111]">
      {/* ===== Hero ===== */}
      <section id="home" className="scroll-mt-16">
        <div className={`${WRAP} pt-12 pb-10 sm:pt-16 lg:pt-24`}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p style={{ animationDelay: '0ms' }} className="sg-hero-up mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[#F5F4F2] px-4 py-1.5 text-sm font-bold text-[#E51B12]">
                Bike • Scooter • Car
              </p>
              <h1 style={{ animationDelay: '70ms' }} className="sg-hero-up mb-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-6xl xl:text-[4rem]">
                Reliable Repair Service Ankit <span className="text-[#E51B12]">At Your Doorstep.</span>
              </h1>
              <p style={{ animationDelay: '140ms' }} className="sg-hero-up mb-9 max-w-lg text-base leading-[1.7] text-gray-700 sm:text-lg">
                Sai Garage offers expert bike, scooter and car repairs with honest pricing and quick
                turnaround. Book a service today and get back on the road.
              </p>
              <div style={{ animationDelay: '210ms' }} className="sg-hero-up flex flex-wrap gap-3">
                <a href={TEL} className={BTN_PRIMARY}>
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={BTN_OUTLINE}>
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="sg-hero-fade relative">
              <div
                className="absolute -bottom-3 -right-3 h-1/2 w-1/2 rounded-3xl bg-[#E51B12] sm:-bottom-4 sm:-right-4"
                aria-hidden="true"
              />
              <div className="relative mx-auto aspect-[3/2] w-full max-h-[460px] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
                <img
                  src={IMAGES.hero}
                  alt="Sai Garage bike, scooter and car repair"
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <Reveal className="mt-14 lg:mt-20">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((t) => (
              <li key={t.text} className="flex items-center gap-3 bg-[#F5F4F2] px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E51B12] text-white">
                  <t.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold leading-snug">{t.text}</span>
              </li>
            ))}
          </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== Vehicles We Repair ===== */}
      <section className={`bg-[#F5F4F2] ${SECTION}`}>
        <div className={WRAP}>
          <SectionHeading
            label="What we service"
            title="Vehicles We Repair"
            intro="Pick your vehicle and tell us what it needs. We will take it from there."
            className="mb-10 sm:mb-14"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {vehicles.map((v, i) => (
              <Reveal key={v.name} delay={i * 100} className="h-full">
              <article
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-white">
                  <img
                    src={v.image}
                    alt={`${v.name} service at Sai Garage`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center p-2 transition duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold shadow-md">
                    <v.icon className="h-4 w-4 text-[#E51B12]" />
                    {v.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-extrabold tracking-[-0.015em]">{v.name} Repair and Service</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-gray-600">{v.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {v.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm font-medium">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E51B12]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 rounded-xl bg-[#F5F4F2] px-4 py-3 text-sm leading-relaxed text-gray-600">{v.note}</p>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-sm font-bold text-white transition duration-200 hover:bg-[#E51B12] sm:mt-auto"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {v.cta}
                  </a>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Delhi NCR coverage ===== */}
      <section className={SECTION}>
        <div className={`${WRAP} grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-5">
            <SectionHeading
              label="Service areas"
              title="Doorstep Vehicle Service Across Delhi NCR"
              intro="Book bike, scooter or car servicing at your home or office. Contact Sai Garage to confirm availability for your specific location."
            />
            <Reveal className="mt-8 flex flex-wrap gap-3">
              <a href={TEL} className={BTN_PRIMARY}>
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={BTN_OUTLINE}>
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7">
            {ncrAreas.map((a, i) => (
              <Reveal key={a} delay={(i % 3) * 80} className="h-full">
                <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E51B12] hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E51B12]/10 text-[#E51B12]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="text-lg font-extrabold leading-tight tracking-[-0.01em]">{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Brands ===== */}
      <section className="bg-[#F5F4F2] py-14 sm:py-20">
        <Reveal className={`${WRAP} text-center`}>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Bike and scooter brands we service</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {brands.map((b) => (
              <span
                key={b}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Do not see your brand? Call or WhatsApp us and we will let you know.
          </p>
        </Reveal>
      </section>

      {/* ===== What We Offer ===== */}
      <section id="services" className={`scroll-mt-16 ${SECTION}`}>
        <div className={WRAP}>
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading label="Our services" title="What we offer" />
            <p className="max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
              From routine upkeep to a quick fix, choose the service that fits what your vehicle needs today.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.name} delay={(i % 2) * 100} className="h-full">
              <article
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-[#F5F4F2] transition duration-300 hover:-translate-y-1 hover:border-[#E51B12] hover:shadow-lg sm:flex-row"
              >
                <div className="relative aspect-[3/2] shrink-0 overflow-hidden bg-white sm:aspect-auto sm:min-h-[220px] sm:w-2/5">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain object-center p-2 transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#E51B12]">
                    <s.icon className="h-4 w-4" />
                    {s.tag}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold tracking-[-0.015em]">{s.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-gray-600">{s.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-medium">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E51B12]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold text-[#111111] underline decoration-[#E51B12] decoration-2 underline-offset-4 transition-colors hover:text-[#E51B12]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {s.cta}
                  </a>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Service Packages ===== */}
      <section id="pricing" className={`scroll-mt-16 bg-[#F5F4F2] ${SECTION}`}>
        <div className={WRAP}>
          <SectionHeading
            label="Bike service packages"
            title="At-Home Service Price List"
            intro="Find your bike's engine size and compare the starting price."
            className="mb-10 sm:mb-14"
          />
          <div className="flex flex-wrap justify-center gap-6">
            {packages.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 3) * 100}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div
                  className={`flex h-full flex-col rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    p.featured ? 'border-[#E51B12]' : 'border-gray-200'
                  }`}
                >
                  <div className="relative p-6">
                    {p.featured && (
                      <span className="absolute -top-3 right-5 rounded-md bg-[#111111] px-2.5 py-1 text-xs font-bold text-white">
                        Lowest starting price
                      </span>
                    )}
                    <h3 className="text-lg font-bold tracking-[-0.01em]">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{p.range}</p>
                    <p className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                      <span className="text-4xl font-extrabold leading-none tracking-[-0.02em] text-[#E51B12] [font-variant-numeric:tabular-nums] sm:text-5xl">{p.price}</span>
                      <span className="pb-1 text-xs text-gray-500">starting price</span>
                    </p>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition duration-200 ${
                        p.featured
                          ? 'bg-[#111111] text-white hover:bg-[#E51B12]'
                          : 'bg-[#F5F4F2] text-[#111111] hover:bg-[#111111] hover:text-white'
                      }`}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Book on WhatsApp
                    </a>
                  </div>
                  <div className="flex-1 border-t border-gray-200 p-6">
                    <p className="text-sm font-bold">Included services</p>
                    <p className="mt-1 text-sm text-gray-500">For the engine sizes listed above</p>
                    <ul className="mt-5 space-y-3">
                      {packageIncludes.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#checklist"
                      className="mt-5 inline-block text-sm font-semibold underline decoration-[#E51B12] decoration-2 underline-offset-4 transition-colors hover:text-[#E51B12]"
                    >
                      See full checklist
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-r-xl border-l-4 border-[#E51B12] bg-white p-4 sm:p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#E51B12]" />
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              Parts and engine oil are charged extra. Car service pricing depends on the model and the work
              needed, so call us for a quote.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Service Checklist ===== */}
      <section id="checklist" className={`scroll-mt-16 ${SECTION}`}>
        <div className={`${WRAP} grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14`}>
          <Reveal className="lg:col-span-7">
            <SectionHeading
              label="Service checklist"
              title="What gets checked in every service"
              intro="Our mechanics follow a clear checklist so nothing important is missed."
              className="mb-8"
            />
            <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-gray-200 py-3 text-base font-medium">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E51B12]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5 lg:max-w-none">
            <img
              src={IMAGES.checklist}
              alt="Sai Garage service checklist"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain object-center"
            />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Common reasons to book ===== */}
      <section className={`bg-[#F5F4F2] ${SECTION}`}>
        <div className={`${WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-4">
            <SectionHeading
              label="When to book"
              title="Common Reasons to Book a Service"
              intro="If you notice any of these, it may be time for a visit."
            />
            <p className="mt-6 text-sm leading-relaxed text-gray-500">
              This is general guidance, not a diagnosis. Tell us what you notice and we will suggest the
              right service.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 80} className="h-full">
              <div className="flex h-full gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#E51B12] hover:shadow-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E51B12]/10 text-[#E51B12]">
                  <r.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-extrabold">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{r.desc}</p>
                </div>
              </div>
              </Reveal>
            ))}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center rounded-2xl bg-[#E51B12] p-5 text-white transition duration-200 hover:bg-[#c4150d]"
            >
              <span className="flex items-center gap-2 font-extrabold">
                <WhatsAppIcon className="h-5 w-5" />
                Not sure what is wrong?
              </span>
              <span className="mt-1 text-sm text-white/90">Describe it to us on WhatsApp.</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Why Choose Sai Garage ===== */}
      <section id="about" className={`scroll-mt-16 ${SECTION}`}>
        <div className={`${WRAP} grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <Reveal className="relative order-2 lg:order-1">
            <div
              className="absolute -bottom-3 -left-3 h-full w-full rounded-3xl border-2 border-[#E51B12] sm:-bottom-4 sm:-left-4"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
              <img
                src={IMAGES.whyChoose}
                alt="Why Choose Sai Garage"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain object-center"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              label="Why Sai Garage"
              title="Why Choose Sai Garage?"
              intro="We know how much you rely on your vehicle every day. Sai Garage focuses on honest work, clear pricing and zero hassle."
              className="mb-8"
            />
            <ul className="space-y-3">
              {whyChoose.map((w, i) => (
                <li key={w.text}>
                  <Reveal delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-[#F5F4F2] px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#E51B12] hover:shadow-md">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E51B12] text-white">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold">{w.text}</p>
                    <p className="mt-0.5 text-sm text-gray-600">{w.desc}</p>
                  </div>
                  </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Testimonials (see `testimonials` data: pending verification) ===== */}
      <section className={`bg-[#F5F4F2] ${SECTION}`}>
        <div className={WRAP}>
          <SectionHeading
            center
            label="Testimonials"
            title="What Our Customers Say"
            intro="Convenient doorstep servicing, clear communication and dependable vehicle care."
            className="mb-12 sm:mb-16"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
            {testimonials.map((t, i) => {
              const wide = testimonials.length % 3 === 1 && i === testimonials.length - 1;
              return (
                <Reveal
                  key={t.name}
                  delay={(i % 3) * 120}
                  className={`h-full ${wide ? 'lg:col-span-6' : 'lg:col-span-2'}`}
                >
                  <figure className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: t.rating }).map((_, k) => (
                          <Star key={k} className="h-4 w-4 fill-[#E51B12] text-[#E51B12]" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-[#E51B12]/25" aria-hidden="true" />
                    </div>
                    <blockquote
                      className={`mt-4 flex-1 leading-relaxed text-gray-700 ${
                        wide ? 'text-lg sm:text-xl lg:max-w-3xl' : 'text-base'
                      }`}
                    >
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 border-t border-gray-200 pt-5">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111111] text-sm font-bold text-white"
                          aria-hidden="true"
                        >
                          {initials(t.name)}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold">{t.name}</span>
                          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                            <span>{t.source}</span>
                            {t.vehicle && (
                              <span className="rounded-full bg-[#F5F4F2] px-2.5 py-0.5 text-xs font-semibold text-[#111111]">
                                {t.vehicle}
                              </span>
                            )}
                          </span>
                        </span>
                      </div>
                      {t.status === 'pending' && (
                        <p className="mt-4 rounded-lg bg-[#F5F4F2] px-3 py-2 text-xs leading-relaxed text-gray-500">
                          Pending verification
                        </p>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className={SECTION}>
        <div className={WRAP}>
          <SectionHeading label="Simple process" title="How it works" className="mb-10 sm:mb-14" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <Reveal key={s.step} delay={i * 120} className="h-full">
                <div
                  className={`relative h-full overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                    last ? 'border-[#E51B12] bg-[#E51B12] text-white' : 'border-gray-200 bg-[#F5F4F2]'
                  }`}
                >
                  <span
                    className={`sg-num block text-7xl font-extrabold leading-none sm:text-8xl ${
                      last ? 'text-white/30' : 'text-[#E51B12]/20'
                    }`}
                    aria-hidden="true"
                  >
                    {s.step}
                  </span>
                  <span
                    className={`sg-icon-pop mt-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                      last ? 'bg-white text-[#E51B12]' : 'bg-[#111111] text-white'
                    }`}
                  >
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${last ? 'text-white/90' : 'text-gray-600'}`}>{s.desc}</p>
                </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className={`bg-[#F5F4F2] ${SECTION}`}>
        <div className={`${WRAP} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14`}>
          <div className="lg:col-span-4">
            <SectionHeading
              label="FAQ"
              title="Frequently asked questions"
              intro="Quick answers before you book."
            />
          </div>
          <Reveal className="space-y-3 lg:col-span-8">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold sm:px-6 sm:py-5"
                    >
                      {f.q}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                          open ? 'bg-[#E51B12] text-white' : 'bg-[#F5F4F2] text-[#111111]'
                        }`}
                      >
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    hidden={!open}
                    className="px-5 pb-5 text-sm leading-relaxed text-gray-600 sm:px-6 sm:text-base"
                  >
                    {f.a}
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ===== Final booking CTA ===== */}
      <section id="contact" className={`scroll-mt-16 ${WRAP} py-16 sm:py-20 lg:py-28`}>
        <div className="relative overflow-hidden rounded-3xl bg-[#111111] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#E51B12]/90"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-10 h-48 w-48 rounded-full border-[18px] border-[#E51B12]/30"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Book your Sai Garage Service Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-300 sm:text-lg">
              Need a repair? Call us or message on WhatsApp and we will take it from there.
            </p>
            <p className="mt-8 text-2xl font-extrabold text-white sm:text-3xl">{PHONE}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={TEL} className={BTN_PRIMARY}>
                <Phone className="h-5 w-5" />
                Call Sai Garage
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BTN} bg-white text-[#111111] hover:-translate-y-0.5 hover:bg-gray-100`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Address */}
        <address className="mt-6 flex flex-col gap-5 rounded-3xl border border-gray-200 bg-[#F5F4F2] p-6 not-italic sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E51B12] text-white">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#E51B12]">Visit us</p>
              <p className="mt-1 text-xl font-extrabold tracking-[-0.015em]">Sai Garage</p>
              <p className="mt-1 max-w-md break-words text-base leading-[1.65] text-gray-700">{ADDRESS_LINES}</p>
            </div>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-lg text-sm font-bold text-[#111111] underline decoration-[#E51B12] decoration-2 underline-offset-4 transition-colors hover:text-[#E51B12] sm:self-center"
          >
            <MapPin className="h-4 w-4 text-[#E51B12]" aria-hidden="true" />
            View on Google Maps
          </a>
        </address>
      </section>

      {/* ===== Floating Call & WhatsApp buttons ===== */}
      <style>{`
        .sg-root { font-family: Inter, Manrope, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; font-feature-settings: 'cv11', 'ss01'; }
        .sg-root a:focus-visible, .sg-root button:focus-visible { outline: 3px solid #E51B12; outline-offset: 3px; }
        @keyframes sg-fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @keyframes sg-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sg-pop { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: none; } }
        .sg-hero-up { animation: sg-fade-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) backwards; }
        .sg-hero-fade { animation: sg-fade 0.9s ease-out 0.15s backwards; }
        .sg-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1); }
        .sg-reveal.sg-in { opacity: 1; transform: none; }
        .sg-in .sg-icon-pop { animation: sg-pop 0.5s ease-out 0.25s backwards; }
        .sg-in .sg-num { animation: sg-fade 0.6s ease-out 0.1s backwards; }
        @keyframes sg-wiggle {
          0%, 60%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-12deg); }
          20% { transform: rotate(10deg); }
          30% { transform: rotate(-8deg); }
          40% { transform: rotate(6deg); }
          50% { transform: rotate(-3deg); }
        }
        .sg-float-wrap { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); z-index: 50; display: flex; flex-direction: column; gap: 12px; pointer-events: none; }
        @media (max-width: 640px) { .sg-float-wrap { right: 12px; } }
        .sg-float-btn { animation: sg-wiggle 3.5s ease-in-out infinite; transition: scale 0.2s ease, box-shadow 0.2s ease; }
        .sg-float-btn.sg-delay { animation-delay: 0.6s; }
        .sg-float-btn:hover { scale: 1.1; animation-play-state: paused; box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
        @media (prefers-reduced-motion: reduce) {
          .sg-float-btn { animation: none; transition: none; }
          .sg-float-btn:hover { scale: 1; }
          .sg-root * { transition-duration: 0.01ms !important; }
          .sg-hero-up, .sg-hero-fade, .sg-in .sg-icon-pop, .sg-in .sg-num { animation: none; }
          .sg-reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
      <div className="sg-float-wrap">
        <a
          href={TEL}
          aria-label="Call Sai Garage"
          className="sg-float-btn pointer-events-auto flex h-12 w-12 items-center sm:h-14 sm:w-14 justify-center rounded-full bg-blue-600 text-white shadow-lg focus-visible:outline-offset-2"
        >
          <Phone className="h-6 w-6" />
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Sai Garage on WhatsApp"
          className="sg-float-btn sg-delay pointer-events-auto flex h-12 w-12 items-center sm:h-14 sm:w-14 justify-center rounded-full bg-green-500 text-white shadow-lg"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>
    </div>
  );
};

export default Home;

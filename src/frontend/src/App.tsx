import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Mail, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { useActor } from "./hooks/useActor";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Product {
  id?: string;
  name: string;
  tagline: string;
  price: bigint;
  category: string;
  image: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    id: "slide-1",
    image: "/assets/generated/hero-poster-1.dim_1400x600.jpg",
    tag: "Skin Reset Bundle",
    headline: "UP TO 40% OFF",
    sub: "Shop the bestselling collection",
    cta: "Shop Now",
  },
  {
    id: "slide-2",
    image: "/assets/generated/hero-poster-2.dim_1400x600.jpg",
    tag: "The Complete Collection",
    headline: "Discover SeaRose",
    sub: "Six essential formulas for radiant skin",
    cta: "Explore All",
  },
  {
    id: "slide-3",
    image: "/assets/generated/hero-poster-3.dim_1400x600.jpg",
    tag: "Our Promise",
    headline: "Pure. Safe. Honest.",
    sub: "Botanically inspired skincare you can trust",
    cta: "Learn More",
  },
];

const INFLUENCERS = [
  {
    name: "Ayesha Malik",
    handle: "@ayeshabeauty",
    image: "/assets/generated/influencer-1.dim_400x500.jpg",
  },
  {
    name: "Zara Noor",
    handle: "@zaranoor_pk",
    image: "/assets/generated/influencer-2.dim_400x500.jpg",
  },
  {
    name: "Hania Siddiqui",
    handle: "@haniaskin",
    image: "/assets/generated/influencer-3.dim_400x500.jpg",
  },
  {
    name: "Maryam Khan",
    handle: "@maryamglows",
    image: "/assets/generated/influencer-4.dim_400x500.jpg",
  },
  {
    name: "Sara Imran",
    handle: "@saraimranpk",
    image: "/assets/generated/influencer-5.dim_400x500.jpg",
  },
  {
    name: "Noor Fatima",
    handle: "@noorfatima_beauty",
    image: "/assets/generated/influencer-6.dim_400x500.jpg",
  },
];

const FALLBACK_PRODUCTS: Product[] = [
  {
    name: "Beauty Soap",
    tagline: "Long-time protection from germs",
    price: 85000n,
    category: "Cleansing",
    image: "/assets/generated/product-soap.dim_400x400.jpg",
  },
  {
    name: "Vitamin C Serum",
    tagline: "Radiance & Glow",
    price: 280000n,
    category: "Serum",
    image: "/assets/generated/product-serum.dim_400x400.jpg",
  },
  {
    name: "Sunblock SPF 50+",
    tagline: "UVA/UVB Protection",
    price: 195000n,
    category: "Sun Care",
    image: "/assets/generated/product-sunblock.dim_400x400.jpg",
  },
  {
    name: "Rose Water",
    tagline: "Balancing & Refreshing",
    price: 120000n,
    category: "Toner",
    image: "/assets/generated/product-rosewater.dim_400x400.jpg",
  },
  {
    name: "Scrub Face Wash",
    tagline: "With Glycolic Acid",
    price: 145000n,
    category: "Cleanser",
    image: "/assets/generated/product-facewash.dim_400x400.jpg",
  },
  {
    name: "Moisturizer Lotion",
    tagline: "Hydrate & repair skin barriers, relief from dryness",
    price: 230000n,
    category: "Moisturizer",
    image: "/assets/generated/product-lotion.dim_400x400.jpg",
  },
];

const PRODUCT_IMAGES: Record<string, string> = {
  "Beauty Soap": "/assets/generated/product-soap.dim_400x400.jpg",
  "Vitamin C Serum": "/assets/generated/product-serum.dim_400x400.jpg",
  "Sunblock SPF 50+": "/assets/generated/product-sunblock.dim_400x400.jpg",
  "Rose Water": "/assets/generated/product-rosewater.dim_400x400.jpg",
  "Scrub Face Wash": "/assets/generated/product-facewash.dim_400x400.jpg",
  "Moisturizer Lotion": "/assets/generated/product-lotion.dim_400x400.jpg",
};

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

function formatPKR(price: bigint): string {
  const pkr = Number(price) / 100;
  return `PKR ${pkr.toLocaleString("en-PK", { minimumFractionDigits: 0 })}`;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home", ocid: "nav.home.link" },
    { label: "Shop", href: "#shop", ocid: "nav.shop.link" },
    { label: "About Us", href: "#story", ocid: "nav.about.link" },
    { label: "Contact", href: "#footer", ocid: "nav.contact.link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-xs"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#home"
          className="font-display text-2xl lg:text-3xl font-semibold tracking-wide"
          style={{ color: "#C9A96E" }}
        >
          SeaRose
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                data-ocid={l.ocid}
                href={l.href}
                className="font-sans text-sm font-medium tracking-widest uppercase transition-colors hover:text-gold"
                style={{
                  color: scrolled ? "#2C2C2C" : "#F7F7F7",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ backgroundColor: scrolled ? "#2C2C2C" : "#F7F7F7" }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ backgroundColor: scrolled ? "#2C2C2C" : "#F7F7F7" }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ backgroundColor: scrolled ? "#2C2C2C" : "#F7F7F7" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-sm border-t border-border"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    data-ocid={l.ocid}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-sans text-sm font-medium tracking-widest uppercase text-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Carousel ────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length),
    [],
  );

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  return (
    <section
      id="home"
      className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {HERO_SLIDES.map((slide, i) =>
          i === current ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-20">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="font-sans text-xs lg:text-sm tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#C9A96E" }}
                >
                  {slide.tag}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="font-display text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4"
                >
                  {slide.headline}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-sans text-sm lg:text-base text-white/80 mb-8 max-w-sm"
                >
                  {slide.sub}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                >
                  <Button
                    data-ocid="hero.primary_button"
                    asChild
                    className="font-sans text-xs tracking-[0.2em] uppercase px-8 py-6 transition-all duration-300"
                    style={{ backgroundColor: "#C9A96E", color: "#2C2C2C" }}
                  >
                    <a href="#shop">{slide.cta}</a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/* Arrows */}
      <button
        type="button"
        data-ocid="carousel.pagination_prev"
        onClick={() => {
          prev();
          resetTimer();
        }}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        type="button"
        data-ocid="carousel.pagination_next"
        onClick={() => {
          next();
          resetTimer();
        }}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            data-ocid={
              `carousel.toggle.${i + 1}` as `carousel.toggle.${number}`
            }
            onClick={() => {
              setCurrent(i);
              resetTimer();
            }}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Influencer Gallery ───────────────────────────────────────────────────────
function InfluencerGallery() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="font-sans text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#829E95" }}
          >
            Social Proof
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground gold-underline inline-block">
            Loved by Beauty Icons
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INFLUENCERS.map((inf, i) => (
            <motion.div
              key={inf.handle}
              data-ocid={
                `influencer.item.${i + 1}` as `influencer.item.${number}`
              }
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl shadow-luxury hover:shadow-luxury-hover transition-shadow duration-300 cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={inf.image}
                  alt={inf.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                <p className="font-display text-lg font-medium text-white">
                  {inf.name}
                </p>
                <p className="font-sans text-sm" style={{ color: "#C9A96E" }}>
                  {inf.handle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Shop ─────────────────────────────────────────────────────────────
function ProductShop() {
  const { actor, isFetching } = useActor();
  const { data: backendProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });

  const products: Product[] =
    backendProducts && backendProducts.length > 0
      ? backendProducts.map((p) => ({
          ...p,
          image:
            PRODUCT_IMAGES[p.name] ??
            "/assets/generated/product-soap.dim_400x400.jpg",
        }))
      : FALLBACK_PRODUCTS;

  return (
    <section
      id="shop"
      className="py-20 lg:py-28 px-6 lg:px-8"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="font-sans text-xs tracking-[0.35em] uppercase mb-3"
            style={{ color: "#D29492" }}
          >
            Skincare Essentials
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground gold-underline inline-block">
            Our Products
          </h2>
        </div>

        {isLoading ? (
          <div
            data-ocid="shop.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {SKELETON_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-2xl bg-muted animate-pulse h-[420px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                data-ocid={`product.item.${i + 1}` as `product.item.${number}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Card className="group overflow-hidden border-0 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 rounded-2xl bg-white">
                  <div className="relative overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className="font-sans text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(130,158,149,0.15)",
                          color: "#829E95",
                        }}
                      >
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mb-2 line-clamp-2">
                      {product.tagline}
                    </p>
                    <p
                      className="font-display text-base font-medium mb-4"
                      style={{ color: "#C9A96E" }}
                    >
                      {formatPKR(product.price)}
                    </p>
                    <Button
                      data-ocid={
                        `product.primary_button.${i + 1}` as `product.primary_button.${number}`
                      }
                      className="w-full font-sans text-xs tracking-[0.2em] uppercase py-5 rounded-xl transition-all duration-300"
                      style={{ backgroundColor: "#D29492", color: "#F7F7F7" }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#829E95";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#D29492";
                      }}
                    >
                      Buy Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Brand Story ──────────────────────────────────────────────────────────────
function BrandStory() {
  return (
    <section
      id="story"
      className="py-20 lg:py-28 px-6 lg:px-8"
      style={{ backgroundColor: "rgba(130,158,149,0.08)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1"
        >
          <p
            className="font-sans text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "#829E95" }}
          >
            Our Heritage
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
            Our Story
          </h2>
          <div
            className="w-12 h-px mb-8"
            style={{ backgroundColor: "#C9A96E" }}
          />
          <p className="font-sans text-base lg:text-lg leading-relaxed text-foreground/75 mb-6">
            SeaRose started with a simple idea — that skincare should be rooted
            in honesty, care, and purpose.
          </p>
          <p className="font-sans text-base leading-relaxed text-foreground/65 mb-8">
            Born from a passion for clean beauty and inspired by the timeless
            power of rose botanicals, we crafted every formula with intention.
            From our lab to your skin, we believe you deserve ingredients that
            are pure, safe, and honest.
          </p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p
                className="font-display text-3xl font-bold"
                style={{ color: "#C9A96E" }}
              >
                100%
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Natural
              </p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p
                className="font-display text-3xl font-bold"
                style={{ color: "#C9A96E" }}
              >
                6+
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Products
              </p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p
                className="font-display text-3xl font-bold"
                style={{ color: "#C9A96E" }}
              >
                PKR
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Affordable
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-luxury">
            <img
              src="/assets/generated/brand-story.dim_1200x600.jpg"
              alt="SeaRose Brand Story"
              className="w-full h-[360px] lg:h-[480px] object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5">
                <p
                  className="font-display text-base italic"
                  style={{ color: "#2C2C2C" }}
                >
                  "From our lab to your skin — pure, safe, honest."
                </p>
                <p
                  className="font-sans text-xs tracking-widest uppercase mt-2"
                  style={{ color: "#829E95" }}
                >
                  SeaRose Beauty
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const infoLinks = [
    { label: "Privacy Policy", ocid: "footer.privacy.link", href: "#" },
    { label: "Shipping Policy", ocid: "footer.shipping.link", href: "#" },
    { label: "Return Policy", ocid: "footer.return.link", href: "#" },
    { label: "About Us", ocid: "footer.about.link", href: "#story" },
  ];

  return (
    <footer
      id="footer"
      className="py-16 lg:py-20 px-6 lg:px-8"
      style={{ backgroundColor: "#2C2C2C", color: "#F7F7F7" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* Col 1: Brand */}
          <div>
            <p
              className="font-display text-3xl font-semibold mb-3"
              style={{ color: "#C9A96E" }}
            >
              SeaRose
            </p>
            <p
              className="font-sans text-sm tracking-widest uppercase mb-6"
              style={{ color: "#829E95" }}
            >
              Pure. Safe. Honest.
            </p>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: "rgba(247,247,247,0.6)" }}
            >
              Premium botanical skincare crafted with care for your skin.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                data-ocid="footer.instagram.link"
                href="https://instagram.com/searose_beauty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(247,247,247,0.1)" }}
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" style={{ color: "#C9A96E" }} />
              </a>
              <a
                data-ocid="footer.tiktok.link"
                href="https://tiktok.com/@searose_beauty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(247,247,247,0.1)" }}
                aria-label="TikTok"
              >
                <SiTiktok className="w-4 h-4" style={{ color: "#C9A96E" }} />
              </a>
            </div>
          </div>

          {/* Col 2: Information */}
          <div>
            <h4
              className="font-display text-base font-semibold mb-5"
              style={{ color: "#C9A96E" }}
            >
              Information
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <a
                    data-ocid={item.ocid}
                    href={item.href}
                    className="font-sans text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(247,247,247,0.6)" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4
              className="font-display text-base font-semibold mb-5"
              style={{ color: "#C9A96E" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "#829E95" }}
                />
                <span
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(247,247,247,0.7)" }}
                >
                  190c, C Block, Eden Garden, Faisalabad
                </span>
              </li>
              <li className="flex items-center gap-3">
                <SiWhatsapp
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#829E95" }}
                />
                <a
                  data-ocid="footer.whatsapp.link"
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(247,247,247,0.7)" }}
                >
                  +92 300 1234567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#829E95" }}
                />
                <a
                  data-ocid="footer.email.link"
                  href="mailto:hello@searose.pk"
                  className="font-sans text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(247,247,247,0.7)" }}
                >
                  hello@searose.pk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8"
          style={{ borderColor: "rgba(247,247,247,0.1)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p
              className="font-sans text-xs"
              style={{ color: "rgba(247,247,247,0.5)" }}
            >
              © {year} SeaRose Beauty. All rights reserved.
            </p>
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs transition-opacity hover:opacity-100"
              style={{ color: "rgba(247,247,247,0.4)" }}
            >
              Built with ❤ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────
function WhatsAppFAB() {
  return (
    <a
      data-ocid="whatsapp.button"
      href="https://wa.me/923001234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center whatsapp-pulse shadow-lg hover:scale-110 transition-transform duration-200"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <InfluencerGallery />
        <ProductShop />
        <BrandStory />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

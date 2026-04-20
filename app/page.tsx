"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Glacier Puff Jacket",
    price: 180,
    category: "Outerwear",
    description: "Heavy icy-luxury puffer built for a bold frozen statement.",
  },
  {
    id: 2,
    name: "Arctic Logo Hoodie",
    price: 95,
    category: "Hoodies",
    description: "Premium heavyweight hoodie with cold blue Top Eskimo energy.",
  },
  {
    id: 3,
    name: "Frostbite Cargo Pants",
    price: 110,
    category: "Bottoms",
    description: "Clean streetwear fit with an icy technical edge.",
  },
  {
    id: 4,
    name: "Polar Graphic Tee",
    price: 52,
    category: "Tees",
    description: "Minimal luxury tee for everyday frozen style.",
  },
  {
    id: 5,
    name: "Snowfall Beanie",
    price: 38,
    category: "Accessories",
    description: "Soft knit beanie finished with a cold-weather brand identity.",
  },
  {
    id: 6,
    name: "Ice Runner Set",
    price: 140,
    category: "Sets",
    description: "Matching streetwear set designed for a sharp icy silhouette.",
  },
];

export default function HomePage() {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  return (
    <main className="min-h-screen bg-[#eef8ff] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(180,225,255,0.58),_rgba(238,248,255,0.95)_40%,_rgba(238,248,255,1)_75%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-[url('/ice-bg.png')] bg-cover bg-center" />
      </div>

      <header className="border-b border-sky-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#home"
            className="text-3xl font-black tracking-[0.35em] text-[#1a73c9]"
          >
            TOP ESKIMO
          </a>

          <nav className="hidden gap-8 text-sm font-medium text-slate-700 md:flex">
            <a href="#home" className="transition hover:text-[#1a73c9]">
              Home
            </a>
            <a href="#shop" className="transition hover:text-[#1a73c9]">
              Shop
            </a>
            <a href="#lookbook" className="transition hover:text-[#1a73c9]">
              Lookbook
            </a>
            <a href="#logos" className="transition hover:text-[#1a73c9]">
              Logo Styles
            </a>
            <a href="#designer" className="transition hover:text-[#1a73c9]">
              Designer Profile
            </a>
            <a href="#about" className="transition hover:text-[#1a73c9]">
              About
            </a>
            <a href="#contact" className="transition hover:text-[#1a73c9]">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a73c9] shadow-sm">
              Cart ({cartCount})
            </div>
            <a
              href="#shop"
              className="rounded-full border border-sky-400 px-6 py-3 text-sm font-semibold text-[#1a73c9] transition hover:bg-sky-50"
            >
              Shop Now
            </a>
          </div>
        </div>
      </header>

      <section
        id="home"
        className="relative overflow-hidden px-6 pb-16 pt-14 md:pb-24 md:pt-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] border border-white/70 bg-white/55 px-6 py-16 shadow-[0_25px_80px_rgba(80,150,220,0.18)] backdrop-blur-sm md:px-14 md:py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,245,255,0.95),_rgba(255,255,255,0.45)_60%)]" />

            <div className="relative z-10 text-center">
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.6em] text-[#1a73c9]">
                Be Bold, Be Ice Cold
              </p>

              <div className="mx-auto max-w-5xl">
                <h1 className="logo-shimmer text-5xl font-black uppercase tracking-[0.22em] text-transparent md:text-7xl">
                  TOP ESKIMO
                </h1>
              </div>

              <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                An icy luxury streetwear brand built to stand out. Bold silhouettes,
                frozen attitude, premium style.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#shop"
                  className="rounded-full bg-[#1a73c9] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:scale-[1.02]"
                >
                  View Collection
                </a>
                <a
                  href="#designer"
                  className="rounded-full border border-sky-300 bg-white/70 px-8 py-4 text-sm font-semibold text-[#1a73c9] transition hover:bg-white"
                >
                  Meet the Designer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="logos" className="px-6 py-10 md:py-16">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-sky-100 bg-white/80 p-6 shadow-[0_18px_60px_rgba(100,170,220,0.14)] backdrop-blur-sm md:p-10">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.5em] text-[#1a73c9]">
              Logo Collection
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
              Top Eskimo logo collection
            </h2>
          </div>

          <div className="relative mx-auto flex min-h-[420px] max-w-4xl items-center justify-center overflow-hidden rounded-[2rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(238,248,255,0.95),rgba(255,255,255,0.92))] p-6 md:min-h-[560px]">
            <img
              src="/logos/Top%20Eskimo%20in%20snowy%20winterland.png"
              alt="Top Eskimo logo collection"
              className="h-auto max-h-[520px] w-full rounded-[1.5rem] object-contain"
            />
          </div>
        </div>
      </section>

      <section id="shop" className="px-6 py-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.5em] text-[#1a73c9]">
              Shop
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
              Signature cold-weather streetwear
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-600">
              Here is the clothing section back in the site layout, with example
              pieces and add-to-cart buttons so the storefront still feels like a
              real brand page.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-[2rem] border border-sky-100 bg-white/85 p-8 shadow-[0_12px_40px_rgba(110,170,220,0.12)] transition hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1a73c9]">
                  {product.category}
                </div>

                <h3 className="text-2xl font-bold text-slate-800">
                  {product.name}
                </h3>

                <p className="mt-4 min-h-[84px] leading-7 text-slate-600">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-black text-[#1a73c9]">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="rounded-full bg-[#1a73c9] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                  >
                    Add to Cart
                  </button>
                </div>

                {cart[product.id] ? (
                  <p className="mt-4 text-sm font-medium text-sky-700">
                    Added: {cart[product.id]}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lookbook" className="px-6 py-10 md:py-16">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-sky-100 bg-white/80 p-8 shadow-[0_18px_60px_rgba(100,170,220,0.14)]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.5em] text-[#1a73c9]">
              Lookbook
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
              Frozen luxury meets streetwear edge
            </h2>
            <p className="mx-auto mt-6 max-w-3xl leading-8 text-slate-600">
              Top Eskimo is built around standout visuals, premium styling, and a
              cold elevated identity. Every piece is meant to feel sharp, rare, and
              unmistakably bold.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(234,247,255,0.95),rgba(255,255,255,0.95))] p-7">
              <h3 className="text-xl font-bold text-slate-800">
                Ice Luxury
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Premium silhouettes and clean presentation built to feel elevated.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(234,247,255,0.95),rgba(255,255,255,0.95))] p-7">
              <h3 className="text-xl font-bold text-slate-800">
                Bold Identity
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Strong graphics and memorable visual branding that stand apart.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(234,247,255,0.95),rgba(255,255,255,0.95))] p-7">
              <h3 className="text-xl font-bold text-slate-800">
                Streetwear Edge
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                A cold-weather fashion concept with confidence and attitude.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="designer" className="px-6 py-10 md:py-16">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-sky-100 bg-white/85 p-8 shadow-[0_18px_60px_rgba(100,170,220,0.14)] md:p-12">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.5em] text-[#1a73c9]">
                Designer Profile
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
                Scott Schroer
              </h2>
              <p className="mt-6 leading-8 text-slate-600">
                Top Eskimo was created to bring a bold frozen identity into luxury
                streetwear. The goal is simple: build a brand that feels cold,
                premium, confident, and unforgettable.
              </p>
              <p className="mt-4 leading-8 text-slate-600">
                Every logo, every visual, and every piece is designed to carry an
                icy presence that stands apart.
              </p>
            </div>

            <div className="rounded-[2rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(227,244,255,0.9),rgba(255,255,255,0.95))] p-8 text-center shadow-inner">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-sky-200 bg-white text-3xl font-black text-[#1a73c9] shadow-md">
                TS
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-800">
                Founder / Creative Director
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Building a luxury icy streetwear identity with bold visuals and
                unforgettable branding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-10 pb-20 md:py-16 md:pb-28">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-sky-100 bg-white/85 p-8 shadow-[0_18px_60px_rgba(100,170,220,0.14)] md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.5em] text-[#1a73c9]">
            About Me
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
            The vision behind Top Eskimo
          </h2>
          <p className="mt-6 leading-8 text-slate-600">
            Top Eskimo is more than a clothing idea. It is a brand vision built
            around confidence, originality, and a cold luxury aesthetic. The goal
            is to create a fashion identity that feels premium, different, and
            instantly recognizable.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            From the logo designs to the website experience, every detail is meant
            to feel sharp, polished, and bold. The brand reflects creativity,
            ambition, and the drive to build something memorable from the ground
            up.
          </p>
        </div>
      </section>

      <section id="contact" className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-sky-100 bg-white/85 p-8 text-center shadow-[0_18px_60px_rgba(100,170,220,0.14)]">
          <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
            Ready to build the brand bigger?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
            Top Eskimo is live and ready for the next stage — products, visuals,
            campaign design, and full luxury brand presentation.
          </p>
        </div>
      </section>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .logo-shimmer {
          background-image: linear-gradient(
            90deg,
            #8dbfe6 0%,
            #dff3ff 18%,
            #b3daf7 35%,
            #f7fcff 50%,
            #b3daf7 65%,
            #dff3ff 82%,
            #8dbfe6 100%
          );
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow:
            0 0 4px rgba(170, 220, 255, 0.16),
            0 0 12px rgba(120, 195, 255, 0.1),
            0 0 20px rgba(255, 255, 255, 0.15);
          animation: shimmerFlow 6.5s linear infinite;
        }

        @keyframes shimmerFlow {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </main>
  );
}
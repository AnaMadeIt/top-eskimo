"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ParticleKind = "snow" | "diamond" | "shard" | "icicle";

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
  opacity: number;
  depth: number;
  kind: ParticleKind;
  twinkle: number;
};

const logoCollectionSrc = "/logos/Top Eskimo logo with colorful characters.png";

const categories = [
  "Men's",
  "Women's",
  "T-Shirts",
  "Sweatshirts",
  "Sweatpants",
  "Outerwear",
  "Accessories",
];

const featuredProducts = [
  {
    title: "Arctic Drift Tee",
    category: "T-Shirts",
    price: "$42",
    colors: ["Glacier Blue", "Snow White", "Midnight Navy", "Frost Grey"],
  },
  {
    title: "Ice Core Hoodie",
    category: "Sweatshirts",
    price: "$88",
    colors: ["Baby Blue", "Black Ice", "Polar Cream", "Steel Blue"],
  },
  {
    title: "Below Freezing Sweatpants",
    category: "Sweatpants",
    price: "$74",
    colors: ["Powder Blue", "Slate", "White Frost", "Arctic Navy"],
  },
  {
    title: "Summit Puffer",
    category: "Outerwear",
    price: "$124",
    colors: ["Ice Blue", "Silver Mist", "Shadow", "Frozen Teal"],
  },
  {
    title: "Cold World Set",
    category: "Men's / Women's",
    price: "$148",
    colors: ["Baby Blue", "Cloud White", "Blue Steel", "Black Ice"],
  },
  {
    title: "Frigid Logo Crewneck",
    category: "Sweatshirts",
    price: "$78",
    colors: ["Icy Pink", "Baby Blue", "Heather Ice", "Navy"],
  },
];

const lookbookShots = [
  "Model Shot 01",
  "Model Shot 02",
  "Model Shot 03",
  "Model Shot 04",
  "Model Shot 05",
  "Model Shot 06",
];

const colorClasses = [
  "bg-sky-200",
  "bg-white",
  "bg-slate-700",
  "bg-blue-900",
  "bg-cyan-300",
  "bg-slate-400",
  "bg-teal-300",
  "bg-pink-200",
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createParticle(width: number, height: number): Particle {
  const roll = Math.random();
  const kind: ParticleKind =
    roll < 0.5 ? "snow" : roll < 0.68 ? "icicle" : roll < 0.86 ? "shard" : "diamond";
  const depth = rand(0.55, 1.45);

  return {
    x: rand(-width * 0.15, width * 1.1),
    y: rand(-height * 1.1, height * 0.2),
    size:
      kind === "snow"
        ? rand(4, 16) * depth
        : kind === "diamond"
          ? rand(9, 18) * depth
          : kind === "shard"
            ? rand(8, 16) * depth
            : rand(8, 18) * depth,
    vx: rand(0.2, 1.1) * depth,
    vy: rand(0.8, 2.4) * depth,
    rotation: rand(0, 360),
    vr: rand(-2.5, 2.5),
    opacity: rand(0.25, 0.95),
    depth,
    kind,
    twinkle: rand(0, Math.PI * 2),
  };
}

function AAAStorm({ scrollY }: { scrollY: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const lastScrollRef = useRef<number>(0);
  const windRef = useRef<number>(0);
  const directionRef = useRef<1 | -1>(1);
  const gustFlashRef = useRef<number>(0);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ratio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      const particleCount = Math.min(340, Math.max(220, Math.floor(width / 4.5)));
      particlesRef.current = Array.from({ length: particleCount }, () => createParticle(width, height));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const diff = scrollY - lastScrollRef.current;
    if (Math.abs(diff) > 0.4) {
      directionRef.current = diff > 0 ? 1 : -1;
      windRef.current = Math.min(46, Math.abs(diff) * 0.75 + 10);
      gustFlashRef.current = Math.min(1, Math.abs(diff) / 120);
    }
    lastScrollRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const render = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      const delta = lastTimeRef.current ? Math.min(2.2, (time - lastTimeRef.current) / 16.6667) : 1;
      lastTimeRef.current = time;

      const intensity = Math.min(1.15, 0.25 + scrollY / 320);
      windRef.current = Math.max(8, windRef.current * 0.988);
      gustFlashRef.current *= 0.96;
      const wind = windRef.current * directionRef.current;

      ctx.clearRect(0, 0, width, height);

      const haze = ctx.createLinearGradient(0, 0, width, height);
      haze.addColorStop(0, `rgba(255,255,255,${0.05 + intensity * 0.06})`);
      haze.addColorStop(0.4, `rgba(196,234,255,${0.05 + intensity * 0.08})`);
      haze.addColorStop(1, `rgba(255,255,255,${0.02 + intensity * 0.04})`);
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        p.x += (wind * 0.18 + p.vx * (3.2 + intensity * 1.8) + Math.sin(time / 380 + p.twinkle) * 0.9 * p.depth) * delta;
        p.y += (p.vy * (2.2 + intensity * 1.5)) * delta;
        p.rotation += (p.vr + wind * 0.025) * delta;
        p.twinkle += 0.025 * delta;

        const outBottom = p.y > height + 180;
        const outRight = p.x > width + 240;
        const outLeft = p.x < -240;
        if (outBottom || outRight || outLeft) {
          const next = createParticle(width, height);
          Object.assign(p, next);
          p.y = rand(-220, -40);
          p.x = directionRef.current > 0 ? rand(-220, width * 0.35) : rand(width * 0.65, width + 220);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        const alpha = Math.min(1, p.opacity * (0.58 + intensity * 0.55));
        ctx.globalAlpha = alpha;

        if (p.kind === "snow") {
          const r = p.size * 0.52;
          const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 1.2);
          glow.addColorStop(0, "rgba(255,255,255,1)");
          glow.addColorStop(0.65, "rgba(255,255,255,0.96)");
          glow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.05, 0, Math.PI * 2);
          ctx.fill();
          if (p.size > 9) {
            ctx.strokeStyle = `rgba(255,255,255,${0.75 + Math.sin(p.twinkle) * 0.15})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(-r, 0);
            ctx.lineTo(r, 0);
            ctx.moveTo(0, -r);
            ctx.lineTo(0, r);
            ctx.moveTo(-r * 0.72, -r * 0.72);
            ctx.lineTo(r * 0.72, r * 0.72);
            ctx.moveTo(r * 0.72, -r * 0.72);
            ctx.lineTo(-r * 0.72, r * 0.72);
            ctx.stroke();
          }
        } else if (p.kind === "diamond") {
          const s = p.size * 1.1;
          const grad = ctx.createLinearGradient(-s, -s, s, s);
          grad.addColorStop(0, "rgba(255,255,255,1)");
          grad.addColorStop(0.35, "rgba(218,244,255,1)");
          grad.addColorStop(1, "rgba(109,208,255,0.88)");
          ctx.fillStyle = grad;
          ctx.shadowColor = `rgba(190,238,255,${0.8 + Math.sin(p.twinkle) * 0.15})`;
          ctx.shadowBlur = 32;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.84, 0);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.84, 0);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.8)";
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(0, s);
          ctx.moveTo(-s * 0.84, 0);
          ctx.lineTo(s * 0.84, 0);
          ctx.stroke();
          ctx.globalAlpha = 0.4 + (Math.sin(p.twinkle * 2) + 1) * 0.18;
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.fillRect(-1, -s * 0.55, 2, s * 0.45);
        } else if (p.kind === "shard") {
          const w = p.size * 0.9;
          const h = p.size * 2.5;
          const grad = ctx.createLinearGradient(0, -h, 0, h);
          grad.addColorStop(0, "rgba(255,255,255,0.98)");
          grad.addColorStop(1, "rgba(164,212,255,0.72)");
          ctx.fillStyle = grad;
          ctx.shadowColor = "rgba(196,233,255,0.9)";
          ctx.shadowBlur = 22;
          ctx.beginPath();
          ctx.moveTo(0, -h * 0.68);
          ctx.lineTo(w * 0.74, -h * 0.18);
          ctx.lineTo(w * 0.22, h * 0.82);
          ctx.lineTo(-w * 0.6, h * 0.28);
          ctx.lineTo(-w * 0.24, -h * 0.22);
          ctx.closePath();
          ctx.fill();
        } else {
          const iw = Math.max(4, p.size * 0.32);
          const ih = p.size * 4.4;
          const grad = ctx.createLinearGradient(0, -ih * 0.5, 0, ih * 0.5);
          grad.addColorStop(0, "rgba(255,255,255,1)");
          grad.addColorStop(0.52, "rgba(196,232,255,0.95)");
          grad.addColorStop(1, "rgba(196,232,255,0)");
          ctx.fillStyle = grad;
          ctx.shadowColor = "rgba(174,223,255,1)";
          ctx.shadowBlur = 24;
          ctx.beginPath();
          ctx.moveTo(-iw, -ih * 0.5);
          ctx.lineTo(iw, -ih * 0.5);
          ctx.lineTo(iw * 0.5, ih * 0.04);
          ctx.lineTo(0, ih * 0.5);
          ctx.lineTo(-iw * 0.5, ih * 0.04);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      const gust = ctx.createLinearGradient(
        directionRef.current > 0 ? -width * 0.3 : width * 1.3,
        0,
        directionRef.current > 0 ? width * 1.1 : -width * 0.1,
        height
      );
      gust.addColorStop(0, "rgba(255,255,255,0)");
      gust.addColorStop(0.25, `rgba(255,255,255,${0.04 + gustFlashRef.current * 0.12})`);
      gust.addColorStop(0.5, `rgba(210,239,255,${0.08 + intensity * 0.12 + gustFlashRef.current * 0.2})`);
      gust.addColorStop(0.75, `rgba(255,255,255,${0.04 + gustFlashRef.current * 0.12})`);
      gust.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gust;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-90">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export default function Page() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "Home", href: "#home" },
      { label: "Shop", href: "#shop" },
      { label: "Lookbook", href: "#lookbook" },
      { label: "Logo Styles", href: "#logos" },
      { label: "Designer Profile", href: "#designer-profile" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#f8fdff_0%,_#e7f8ff_22%,_#d4efff_58%,_#c0e6ff_100%)] text-slate-950 selection:bg-cyan-300 selection:text-slate-950">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_transparent_20%),linear-gradient(180deg,_#fbfeff_0%,_#e8f8ff_28%,_#d5f0ff_58%,_#c1e7ff_100%)]" />
        <div className="absolute inset-0 opacity-70 bg-[linear-gradient(120deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0.22)_60%,rgba(255,255,255,0)_100%)]" />
      </div>

      <AAAStorm scrollY={scrollY} />

      <header className="sticky top-0 z-20 border-b border-sky-100/80 bg-white/62 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative">
              <span className="block bg-[linear-gradient(180deg,#0f3f74_0%,#1f5fa8_40%,#95ddff_100%)] bg-clip-text text-lg font-black uppercase tracking-[0.28em] text-transparent drop-shadow-[0_3px_0_rgba(255,255,255,0.95)] md:text-xl">
                Top Eskimo
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:text-sky-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#shop"
            className="rounded-full border border-sky-300 bg-sky-100 px-5 py-2 text-sm font-semibold text-sky-900 transition hover:-translate-y-0.5 hover:bg-sky-200"
          >
            Shop Now
          </a>
        </div>
      </header>

      <section id="home" className="relative z-20 mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
        <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-white/18 backdrop-blur-[1px]" />
      </section>

      <section id="home-copy-fix" style={{display:'none'}}></section>

      <section id="home" className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
        <div className="rounded-[2.35rem] border border-white/80 bg-white/58 px-6 py-8 shadow-[0_24px_96px_rgba(125,211,252,0.2)] backdrop-blur-xl md:px-10 md:py-12">
          <div className="flex flex-col items-center text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.55em] text-sky-700">
              Be Bold, Be Ice Cold
            </p>

            <div className="w-full max-w-4xl overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/76 p-4 shadow-[0_22px_80px_rgba(148,163,184,0.16)] backdrop-blur-xl md:p-6">
              <div className="overflow-hidden rounded-[1.7rem] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,249,255,0.92),rgba(219,244,255,0.9))] p-3 md:p-5">
                <img
                  src={logoCollectionSrc}
                  alt="Top Eskimo logo collection"
                  className="mx-auto h-auto w-full max-w-3xl object-contain drop-shadow-[0_18px_35px_rgba(125,211,252,0.18)]"
                />
              </div>
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-black uppercase leading-[0.9] tracking-[0.12em] text-slate-950 md:text-6xl xl:text-7xl">
              Be Bold.
              <span className="mt-2 block bg-[linear-gradient(180deg,#0f3f74_0%,#1f5fa8_40%,#95ddff_100%)] bg-clip-text text-transparent">
                Be Ice Cold.
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://instagram.com/topeskimogang"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-sky-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current text-sky-700">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.15 1.65a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.1a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z" />
                </svg>
                @topeskimogang
              </a>

              <a
                href="tel:6302971679"
                className="inline-flex items-center gap-3 rounded-full border border-sky-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50"
              >
                <span className="text-lg">📞</span>
                630-297-1679
              </a>
            </div>

            <p className="mt-8 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">
              Luxury cold-weather identity, icy colorways, and statement mascots designed to feel rich, frozen, and unforgettable.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-100"
                >
                  {category}
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#lookbook"
                className="rounded-full bg-sky-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                View Lookbook
              </a>
              <a
                href="#designer-profile"
                className="rounded-full border border-sky-200 bg-white/80 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-900 transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-white"
              >
                Meet the Designer
              </a>
            </div>

            <div className="mt-12 grid w-full max-w-5xl gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.8rem] border border-white/70 bg-white/74 p-5 text-left shadow-lg shadow-sky-100/60 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-700">Frozen Identity</p>
                <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-slate-950">Mascot color lineup</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
                  Your full Top Eskimo lineup now sits front and center as one premium collection graphic. This gives the homepage a stronger luxury fashion presentation while still showing all colorways at once.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-white/70 bg-white/74 p-5 shadow-lg shadow-sky-100/60 backdrop-blur-sm">
                <div className="flex h-full items-center justify-center rounded-[1.35rem] border border-dashed border-sky-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(229,246,255,0.88))] p-4">
                  <img
                    src={logoCollectionSrc}
                    alt="Mini Top Eskimo logo collection"
                    className="h-auto w-full max-w-[11rem] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="relative z-20 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-700">Shop</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-950 md:text-5xl">
              Ice-cold essentials.
            </h2>
          </div>
          <p className="max-w-2xl text-slate-700">
            Premium cards, clean product presentation, and interactive colorways built to feel colder, sharper, and more expensive.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((item, itemIndex) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[2rem] border border-sky-200 bg-white/75 shadow-xl shadow-sky-200/60 backdrop-blur-sm transition hover:-translate-y-1 hover:border-sky-400"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[linear-gradient(180deg,rgba(240,249,255,1),rgba(186,230,253,0.75),rgba(125,211,252,0.3))] p-4">
                <div className="absolute right-3 top-3 rounded-full border border-sky-300 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-sky-800">
                  New Drop
                </div>
                <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-dashed border-sky-300/70 bg-white/45 text-center text-sm font-semibold uppercase tracking-[0.25em] text-slate-700">
                  Product Image Slot
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-700">{item.category}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">{item.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.colors.map((color, colorIndex) => (
                    <button
                      key={color}
                      className="flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50"
                    >
                      <span
                        className={`h-3.5 w-3.5 rounded-full border border-slate-300 ${colorClasses[(itemIndex * 2 + colorIndex) % colorClasses.length]}`}
                      />
                      {color}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-black text-sky-900">{item.price}</span>
                  <button className="rounded-full border border-sky-300 bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-900 transition hover:-translate-y-0.5 hover:bg-sky-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-7xl px-4 py-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => {
            const id = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <section
                id={id}
                key={category}
                className="rounded-[2rem] border border-sky-200 bg-white/70 p-5 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-700">{category}</p>
                <div className="mt-4 aspect-[4/3] rounded-[1.5rem] border border-dashed border-sky-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(186,230,253,0.6))]" />
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  Category feature area for {category.toLowerCase()} drops, highlighted products, price tags, and future collection links.
                </p>
              </section>
            );
          })}
        </div>
      </section>

      <section id="lookbook" className="relative z-20 mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-700">Lookbook</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-950 md:text-5xl">
              Flowy editorial scroll.
            </h2>
          </div>
          <p className="max-w-2xl text-slate-700">
            Large image slots for model photography so your homepage feels like an icy fashion campaign.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lookbookShots.map((shot, index) => (
            <div
              key={shot}
              className={`overflow-hidden rounded-[2rem] border border-sky-200 bg-white/75 p-4 backdrop-blur-sm ${
                index % 3 === 0 ? "xl:translate-y-6" : index % 3 === 2 ? "xl:-translate-y-6" : ""
              }`}
            >
              <div className="aspect-[4/5] rounded-[1.5rem] border border-dashed border-sky-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(224,242,254,0.95),rgba(186,230,253,0.65))]" />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-950">{shot}</h3>
                <span className="rounded-full border border-sky-300 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-800">
                  Photo Slot
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="logos" className="relative z-20 mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-700">Logo Styles</p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-950 md:text-5xl">
            Full mascot collection.
          </h2>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-sky-200 bg-white/75 p-5 shadow-xl shadow-sky-200/50 backdrop-blur-sm md:p-8">
          <div className="rounded-[1.6rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(233,248,255,0.95),rgba(220,244,255,0.9))] p-4 md:p-8">
            <img
              src={logoCollectionSrc}
              alt="Top Eskimo complete mascot collection"
              className="mx-auto h-auto w-full max-w-3xl object-contain"
            />
          </div>
        </div>
      </section>

      <section id="designer-profile" className="relative z-20 mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-sky-200 bg-white/75 p-5 backdrop-blur-sm">
            <div className="aspect-[4/5] rounded-[1.5rem] border border-dashed border-sky-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(186,230,253,0.6))]" />
            <p className="mt-4 text-center text-sm uppercase tracking-[0.25em] text-sky-800">Designer Photo Slot</p>
          </div>

          <div className="rounded-[2rem] border border-sky-200 bg-white/75 p-8 backdrop-blur-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-700">Designer Profile</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-950 md:text-5xl">
              The mind behind the cold.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-800 md:text-lg">
              <p>
                My name is Scott Schroer, and I am the founder of Top Eskimo. Have you ever felt that you were the Coldest around? Have you ever felt left out in the cold? For reasons like these, and many more, I introduce to the world, Top Eskimo.
              </p>
              <p>
                A clothing brand for those who know they are going places. For those who know what it takes to make it in this world; no matter how cold it may be out there. We will always show up, show out, and show why we are below freezing.
              </p>
              <p className="pt-2 text-sky-800">
                Swag always,
                <br />
                Scottie D
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-20 mx-auto max-w-7xl px-4 pb-20 pt-4 md:px-8 md:pb-28">
        <div className="overflow-hidden rounded-[2rem] border border-sky-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(224,242,254,0.95),rgba(186,230,253,0.75))] p-8 shadow-2xl shadow-sky-200/70 backdrop-blur-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-700">Contact</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-950 md:text-5xl">
                Ready to build the freeze.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                Connect your socials, customer outreach, and checkout path here so people can shop, follow, and contact Top Eskimo right from the homepage.
              </p>
            </div>

            <div className="relative rounded-[2rem] border border-sky-300 bg-white/70 p-6 shadow-lg shadow-sky-200/60">
              <div className="absolute left-0 top-0 flex w-full justify-between px-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-b-full bg-gradient-to-b from-white via-sky-200 to-transparent opacity-95"
                    style={{
                      width: `${8 + (i % 3) * 4}px`,
                      height: `${26 + (i % 4) * 10}px`,
                      clipPath: "polygon(0 0, 100% 0, 76% 70%, 50% 100%, 22% 70%)",
                    }}
                  />
                ))}
              </div>
              <p className="pt-8 text-xs font-semibold uppercase tracking-[0.35em] text-sky-700">
                Shopping Cart Preview
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-[1.5rem] border border-sky-200 bg-white p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                    <span>Ice Core Hoodie</span>
                    <span>$88</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">Baby Blue · Size L · Qty 1</div>
                </div>
                <div className="rounded-[1.5rem] border border-sky-200 bg-white p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                    <span>Below Freezing Sweatpants</span>
                    <span>$74</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">Powder Blue · Size M · Qty 1</div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-sky-200 pt-4 text-base font-black text-slate-950">
                <span>Subtotal</span>
                <span>$162</span>
              </div>
              <button className="mt-5 w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-sky-700">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

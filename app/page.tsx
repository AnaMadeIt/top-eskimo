"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const logoImages = [
  "/logos/top-eskimo-1.png",
  "/logos/top-eskimo-2.png",
  "/logos/top-eskimo-3.png",
  "/logos/top-eskimo-4.png",
];

export default function HomePage() {
  const [currentLogo, setCurrentLogo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logoImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#eef8ff] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(180,225,255,0.55),_rgba(238,248,255,0.95)_40%,_rgba(238,248,255,1)_75%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-50">
        <div className="absolute inset-0 bg-[url('/ice-bg.png')] bg-cover bg-center" />
      </div>

      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/85 backdrop-blur-md">
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
            <a href="#contact" className="transition hover:text-[#1a73c9]">
              Contact
            </a>
          </nav>

          <a
            href="#shop"
            className="rounded-full border border-sky-400 px-6 py-3 text-sm font-semibold text-[#1a73c9] transition hover:bg-sky-50"
          >
            Shop Now
          </a>
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
                  href="#logos"
                  className="rounded-full bg-[#1a73c9] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:scale-[1.02]"
                >
                  View Logo Collection
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

          <div className="relative mx-auto flex min-h-[420px] max-w-4xl items-center justify-center overflow-hidden rounded-[2rem] border border-sky-100 bg-[linear-gradient(180deg,rgba(238,248,255,0.95),rgba(255,255,255,0.9))] p-6 md:min-h-[560px]">
            {logoImages.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentLogo
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-[1.02]"
                }`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={src}
                    alt={`Top Eskimo logo ${index + 1}`}
                    fill
                    className="object-contain p-6"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm leading-7 text-slate-500">
            Put your logo files in{" "}
            <span className="rounded bg-sky-50 px-2 py-1 font-mono text-sky-700">
              public/logos/
            </span>{" "}
            and name them exactly:
            <br />
            <span className="rounded bg-sky-50 px-2 py-1 font-mono text-sky-700">
              top-eskimo-1.png
            </span>{" "}
            <span className="rounded bg-sky-50 px-2 py-1 font-mono text-sky-700">
              top-eskimo-2.png
            </span>{" "}
            <span className="rounded bg-sky-50 px-2 py-1 font-mono text-sky-700">
              top-eskimo-3.png
            </span>{" "}
            <span className="rounded bg-sky-50 px-2 py-1 font-mono text-sky-700">
              top-eskimo-4.png
            </span>
          </p>
        </div>
      </section>

      <section id="shop" className="px-6 py-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Luxury Outerwear",
              text: "Premium cold-weather pieces built with a bold frozen aesthetic.",
            },
            {
              title: "Signature Graphics",
              text: "Statement logo styles and eye-catching visuals that define the brand.",
            },
            {
              title: "Ice-Cold Identity",
              text: "Streetwear with attitude, confidence, and unmistakable visual energy.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-sky-100 bg-white/85 p-8 shadow-[0_12px_40px_rgba(110,170,220,0.12)] transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
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
              cold, elevated identity. Every piece is meant to feel sharp, rare,
              and unmistakably bold.
            </p>
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
                premium, confident, and unforgettable. Every logo, every visual,
                and every piece is designed to carry an icy presence that stands
                apart.
              </p>
              <p className="mt-4 leading-8 text-slate-600">
                This brand is for people who want statement fashion with a strong
                visual edge. Clean, cold, elevated, and fearless.
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
            Top Eskimo is more than a clothing idea — it is a brand vision built
            around confidence, originality, and a cold luxury aesthetic. The goal
            is to create a fashion identity that feels premium, different, and
            instantly recognizable.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            From the logo designs to the website experience, every detail is meant
            to feel sharp, polished, and bold. The brand reflects creativity,
            ambition, and the desire to build something memorable from the ground
            up.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Top Eskimo stands for making an impression — clean visuals, icy energy,
            and elevated streetwear style that people remember.
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
            #8fd3ff 0%,
            #ffffff 18%,
            #7ec8ff 36%,
            #e8f8ff 50%,
            #ffffff 62%,
            #7fcfff 78%,
            #9ddcff 100%
          );
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow:
            0 0 10px rgba(140, 215, 255, 0.35),
            0 0 22px rgba(90, 180, 255, 0.25),
            0 0 40px rgba(255, 255, 255, 0.4);
          animation: shimmerFlow 3.8s linear infinite;
        }

        @keyframes shimmerFlow {
          0% {
            background-position: 200% center;
            filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(190, 235, 255, 0.65));
          }
          100% {
            background-position: -200% center;
            filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0.2));
          }
        }
      `}</style>
    </main>
  );
}
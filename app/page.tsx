"use client";

import Image from "next/image";
import { useState } from "react";

const eskimos = [
  "top_eskimo_01_brown.png",
  "top_eskimo_02_navy.png",
  "top_eskimo_03_light_blue.png",
  "top_eskimo_04_red.png",
  "top_eskimo_05_orange.png",
  "top_eskimo_06_pink.png",
  "top_eskimo_07_yellow.png",
  "top_eskimo_08_purple.png",
  "top_eskimo_09_teal.png",
  "top_eskimo_10_blue.png",
];

const products = [
  "Ice Savant !$",
  "Frozen Signature Tee",
  "Arctic Crown Sweatshirt",
  "Subzero Sweatpants",
];

export default function Page() {
  const [cart, setCart] = useState<string[]>([]);
  const [frozen, setFrozen] = useState<number | null>(null);

  const handleFreeze = (index: number) => {
    setFrozen(index);
    setTimeout(() => setFrozen(null), 700);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-sky-100 via-blue-200 to-slate-950 text-white relative">
      {/* LIVE BLIZZARD BACKGROUND */}
      <div className="blizzard-layer" aria-hidden="true">
        {eskimos.map((img, i) => (
          <Image
            key={img}
            src={`/logos/${img}`}
            alt=""
            width={120}
            height={120}
            className={`falling-eskimo eskimo-${i + 1}`}
          />
        ))}

        {Array.from({ length: 70 }).map((_, i) => (
          <span key={`snow-${i}`} className={`snow snow-${i % 12}`} />
        ))}

        {Array.from({ length: 22 }).map((_, i) => (
          <span key={`diamond-${i}`} className={`diamond diamond-${i % 8}`}>
            ◆
          </span>
        ))}
      </div>

      {/* CONTENT */}
      <section className="relative z-10 px-6 py-10 text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight ice-text">
          Top Eskimo
        </h1>

        <p className="mt-4 text-2xl md:text-3xl font-bold text-cyan-100">
          Be Bold. Be Ice Cold.
        </p>

        <div className="mt-5 flex justify-center gap-6 text-lg">
          <a
            href="https://instagram.com/topeskimogang"
            target="_blank"
            className="hover:text-cyan-200"
          >
            Instagram: @topeskimogang
          </a>
          <a href="tel:6302971679" className="hover:text-cyan-200">
            ☎ 630-297-1679
          </a>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-4xl font-black text-center mb-10">
          Logo Styles
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {eskimos.map((img) => (
            <div
              key={img}
              className="rounded-3xl bg-white/10 backdrop-blur-md p-5 shadow-2xl hover:scale-105 hover:shadow-cyan-300/40 transition"
            >
              <Image
                src={`/logos/${img}`}
                alt="Top Eskimo logo"
                width={220}
                height={220}
                className="mx-auto drop-shadow-[0_0_18px_rgba(125,231,255,.8)]"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-4xl font-black text-center mb-10">
          Shop the Ice
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product}
              className="rounded-3xl bg-white/15 backdrop-blur-xl p-5 shadow-2xl border border-cyan-200/30"
            >
              <div
                className={`h-56 rounded-2xl bg-gradient-to-br from-white via-cyan-100 to-blue-300 flex items-center justify-center text-slate-900 font-black text-xl relative overflow-hidden ${
                  frozen === index ? "freeze-flash" : ""
                }`}
              >
                Merchandise Photo
              </div>

              <h3 className="mt-5 text-2xl font-black">{product}</h3>

              <div className="mt-4">
                <p className="font-bold mb-2">Size</p>
                <div className="flex gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFreeze(index)}
                      className="rounded-full bg-cyan-100 text-slate-900 px-4 py-2 font-bold hover:bg-white"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-bold mb-2">Color</p>
                <div className="flex gap-2">
                  {["Ice", "Black", "Blue"].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleFreeze(index)}
                      className="rounded-full bg-blue-900/80 px-4 py-2 font-bold hover:bg-blue-700"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCart([...cart, product])}
                className="mt-6 w-full rounded-2xl bg-cyan-300 text-slate-950 py-3 font-black hover:bg-white transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-4xl font-black mb-5">Designer Profile</h2>
        <p className="text-lg leading-8 text-cyan-50 bg-white/10 backdrop-blur-md rounded-3xl p-8">
          My name is Scott Schroer, and I am the founder of Top Eskimo.
          Have you ever felt that you were the Coldest around? Top Eskimo
          was created for those who move bold, think sharp, and stay ice cold
          under pressure.
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-3xl bg-white/15 backdrop-blur-xl p-8 border border-cyan-200/30">
          <h2 className="text-3xl font-black mb-4">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-cyan-100">Your cart is frozen empty.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item, i) => (
                <li key={`${item}-${i}`}>🧊 {item}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <style jsx>{`
        .ice-text {
          color: #e8fbff;
          text-shadow:
            0 0 12px rgba(125, 231, 255, 0.95),
            0 0 32px rgba(14, 165, 233, 0.85),
            0 0 60px rgba(255, 255, 255, 0.6);
          animation: shimmer 3s infinite linear;
        }

        @keyframes shimmer {
          0% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.35);
          }
          100% {
            filter: brightness(1);
          }
        }

        .blizzard-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .falling-eskimo {
          position: absolute;
          top: -180px;
          opacity: 0.22;
          filter: drop-shadow(0 0 14px rgba(160, 230, 255, 0.75));
          animation-name: eskimoFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .eskimo-1 { left: 4%; animation-duration: 24s; animation-delay: 0s; width: 82px; height: auto; }
        .eskimo-2 { left: 14%; animation-duration: 31s; animation-delay: 4s; width: 70px; height: auto; }
        .eskimo-3 { left: 25%; animation-duration: 27s; animation-delay: 7s; width: 84px; height: auto; }
        .eskimo-4 { left: 36%; animation-duration: 34s; animation-delay: 2s; width: 76px; height: auto; }
        .eskimo-5 { left: 47%; animation-duration: 29s; animation-delay: 9s; width: 86px; height: auto; }
        .eskimo-6 { left: 58%; animation-duration: 36s; animation-delay: 5s; width: 68px; height: auto; }
        .eskimo-7 { left: 69%; animation-duration: 26s; animation-delay: 11s; width: 82px; height: auto; }
        .eskimo-8 { left: 80%; animation-duration: 33s; animation-delay: 3s; width: 74px; height: auto; }
        .eskimo-9 { left: 90%; animation-duration: 28s; animation-delay: 8s; width: 82px; height: auto; }
        .eskimo-10 { left: 52%; animation-duration: 40s; animation-delay: 13s; width: 64px; height: auto; }

        @keyframes eskimoFall {
          0% {
            transform: translateY(-180px) translateX(0) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          10% {
            opacity: 0.24;
          }
          50% {
            transform: translateY(55vh) translateX(55px) rotate(9deg) scale(1);
          }
          100% {
            transform: translateY(120vh) translateX(-45px) rotate(-10deg) scale(0.9);
            opacity: 0;
          }
        }

        .snow {
          position: absolute;
          top: -20px;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: white;
          opacity: 0.8;
          animation: snowFall linear infinite;
        }

        ${Array.from({ length: 12 })
          .map(
            (_, i) => `
          .snow-${i} {
            left: ${i * 8 + 3}%;
            animation-duration: ${8 + i}s;
            animation-delay: -${i * 1.4}s;
          }
        `
          )
          .join("")}

        @keyframes snowFall {
          from {
            transform: translateY(-20px) translateX(0);
          }
          to {
            transform: translateY(110vh) translateX(80px);
          }
        }

        .diamond {
          position: absolute;
          top: -40px;
          color: rgba(220, 250, 255, 0.7);
          font-size: 18px;
          animation: diamondFall linear infinite;
          text-shadow: 0 0 14px rgba(125, 231, 255, 0.9);
        }

        ${Array.from({ length: 8 })
          .map(
            (_, i) => `
          .diamond-${i} {
            left: ${i * 12 + 5}%;
            animation-duration: ${13 + i * 2}s;
            animation-delay: -${i * 2}s;
          }
        `
          )
          .join("")}

        @keyframes diamondFall {
          from {
            transform: translateY(-40px) rotate(0deg);
          }
          to {
            transform: translateY(120vh) rotate(360deg);
          }
        }

        .freeze-flash::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9),
            rgba(125, 231, 255, 0.65),
            rgba(255, 255, 255, 0.15)
          );
          animation: freezeBlast 0.7s ease-out;
        }

        @keyframes freezeBlast {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1.15);
          }
        }
      `}</style>
    </main>
  );
}
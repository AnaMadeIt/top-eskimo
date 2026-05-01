"use client";

import { useMemo, useState } from "react";

const logoSrc = "/logos/Top Eskimo in snowy winterland.png";

const products = [
  { name: "Ice Savant !$", type: "T-Shirt", price: "$45" },
  { name: "Frozen Standard Tee", type: "T-Shirt", price: "$40" },
  { name: "Cold Front Hoodie", type: "Sweatshirt", price: "$75" },
  { name: "Below Zero Sweats", type: "Sweatpants", price: "$65" },
];

const colors = ["Ice Blue", "Black Ice", "Snow White", "Glacier Gray"];
const sizes = ["S", "M", "L", "XL", "XXL"];

function BlizzardBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 120 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 8 + Math.random() * 16,
        size: 8 + Math.random() * 24,
        type: i % 3 === 0 ? "diamond" : i % 3 === 1 ? "shard" : "snow",
      })),
    []
  );

  const eskimos = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 15 + Math.random() * 18,
        crop: `eskimo-crop-${(i % 8) + 1}`,
        size: 74 + Math.random() * 42,
      })),
    []
  );

  return (
    <div className="blizzard" aria-hidden="true">
      {eskimos.map((e) => (
        <span
          key={e.id}
          className={`falling-eskimo ${e.crop}`}
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size * 1.28}px`,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}

      {particles.map((p) => (
        <span
          key={p.id}
          className={`particle ${p.type}`}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(sizes[1]);
  const [freezing, setFreezing] = useState(false);

  const freezeChange = (callback: () => void) => {
    setFreezing(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setFreezing(false), 450);
    }, 350);
  };

  return (
    <div className="product-card">
      <div className={`product-window ${freezing ? "freeze" : ""}`}>
        <div className="shirt-shape">
          <span>{product.type}</span>
        </div>
      </div>

      <h3>{product.name}</h3>
      <p>{product.price}</p>

      <div className="option-group">
        <strong>Color</strong>
        <div className="option-row">
          {colors.map((c) => (
            <button
              key={c}
              className={color === c ? "active" : ""}
              onClick={() => freezeChange(() => setColor(c))}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="option-group">
        <strong>Size</strong>
        <div className="option-row">
          {sizes.map((s) => (
            <button
              key={s}
              className={size === s ? "active" : ""}
              onClick={() => freezeChange(() => setSize(s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="selected">
        Selected: {color} / {size}
      </div>

      <button className="cart-button">Add to Frozen Cart</button>
    </div>
  );
}

export default function Page() {
  return (
    <main>
      <BlizzardBackground />

      <header className="site-header">
        <a href="#home" className="brand">
          Top Eskimo
        </a>

        <nav className="top-tabs">
          <a href="#contact">Contact Us</a>
          <a href="#merchandise">Merchandise</a>
          <a href="#designer">Designer Profile</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <h1>Be Bold. Be Ice Cold.</h1>
        <p>
          Luxury cold-weather streetwear built for the ones who know they are
          the coldest around.
        </p>

        <div id="contact" className="contact-row">
          <a
            href="https://www.instagram.com/topeskimogang"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Top Eskimo Instagram"
            className="icon-link"
          >
            <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zm4.8-2.4a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
            </svg>
          </a>

          <a
            href="tel:6302971679"
            aria-label="Call Top Eskimo"
            className="icon-link phone"
          >
            📞
          </a>
        </div>
      </section>

      <section className="logo-showcase">
        <div className="hero-logo-frame">
          <img src={logoSrc} alt="Top Eskimo logo styles" className="hero-logo" />
        </div>
      </section>

      <section id="merchandise" className="shop-section">
        <h2>Merchandise</h2>
        <p className="section-subtitle">
          Choose your product, color, and size. Each selection freezes over
          before locking in.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section id="designer" className="designer">
        <h2>Designer Profile</h2>
        <p>
          My name is Scott Schroer, and I am the founder of Top Eskimo. Have you
          ever felt that you were the coldest around? Top Eskimo was built for
          the ones who move differently, think boldly, and bring ice-cold energy
          wherever they go.
        </p>
      </section>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
          background:
            linear-gradient(rgba(4, 20, 35, 0.74), rgba(4, 20, 35, 0.9)),
            radial-gradient(circle at top, #bff4ff 0%, #4ba3c7 35%, #081827 100%);
        }

        main {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 18px 32px;
          background: rgba(4, 20, 35, 0.72);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.25);
        }

        .brand {
          color: #eaffff;
          font-size: clamp(1.4rem, 3vw, 2.4rem);
          font-weight: 900;
          text-decoration: none;
          letter-spacing: -1px;
          text-shadow:
            0 0 12px #8defff,
            0 0 28px #49cfff;
        }

        .top-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: flex-end;
        }

        .top-tabs a {
          color: white;
          text-decoration: none;
          padding: 11px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 18px rgba(140, 230, 255, 0.2);
          transition: 0.25s ease;
        }

        .top-tabs a:hover {
          background: rgba(190, 245, 255, 0.24);
          box-shadow: 0 0 28px rgba(180, 245, 255, 0.72);
          transform: translateY(-2px);
        }

        .blizzard {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          top: -80px;
          animation-name: fallAndDrift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 0 10px rgba(190, 245, 255, 0.9));
          opacity: 0.72;
        }

        .snow {
          border-radius: 999px;
          background: radial-gradient(circle, white 0%, #c9f7ff 55%, transparent 72%);
        }

        .diamond {
          transform: rotate(45deg);
          background: linear-gradient(135deg, #ffffff, #9df4ff, #5ac8ff);
          box-shadow: 0 0 18px rgba(160, 245, 255, 0.95);
        }

        .shard {
          width: 12px !important;
          border-radius: 70% 20% 70% 20%;
          background: linear-gradient(180deg, #ffffff, #8eeeff, transparent);
          box-shadow: 0 0 16px rgba(150, 235, 255, 0.85);
        }

        .falling-eskimo {
          position: absolute;
          top: -180px;
          background-image: url("${logoSrc}");
          background-repeat: no-repeat;
          background-size: 520px 760px;
          animation-name: eskimoFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.28;
          filter:
            drop-shadow(0 0 12px rgba(180, 245, 255, 0.75))
            drop-shadow(0 0 24px rgba(80, 190, 255, 0.45));
          border-radius: 18px;
        }

        .eskimo-crop-1 {
          background-position: -100px -80px;
        }

        .eskimo-crop-2 {
          background-position: -70px -250px;
        }

        .eskimo-crop-3 {
          background-position: -220px -250px;
        }

        .eskimo-crop-4 {
          background-position: -370px -250px;
        }

        .eskimo-crop-5 {
          background-position: -70px -420px;
        }

        .eskimo-crop-6 {
          background-position: -220px -420px;
        }

        .eskimo-crop-7 {
          background-position: -370px -420px;
        }

        .eskimo-crop-8 {
          background-position: -220px -590px;
        }

        @keyframes fallAndDrift {
          0% {
            transform: translate3d(0, -120px, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(55px, 50vh, 0) rotate(180deg);
          }
          100% {
            transform: translate3d(-45px, 110vh, 0) rotate(360deg);
          }
        }

        @keyframes eskimoFall {
          0% {
            transform: translate3d(0, -220px, 0) rotate(-8deg) scale(0.9);
          }
          50% {
            transform: translate3d(70px, 50vh, 0) rotate(8deg) scale(1);
          }
          100% {
            transform: translate3d(-70px, 115vh, 0) rotate(-12deg) scale(0.92);
          }
        }

        .hero,
        .logo-showcase,
        .shop-section,
        .designer {
          position: relative;
          z-index: 2;
        }

        .hero {
          min-height: 72vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 90px 20px 40px;
        }

        h1 {
          font-size: clamp(2.8rem, 8vw, 7rem);
          margin: 0 0 18px;
          color: #eaffff;
          text-shadow:
            0 0 12px #8defff,
            0 0 32px #49cfff,
            0 0 65px #0ea5e9;
          letter-spacing: -3px;
        }

        .hero p {
          max-width: 760px;
          font-size: 1.2rem;
          line-height: 1.7;
          color: #e6fbff;
          margin: 0 auto 24px;
        }

        .contact-row {
          display: flex;
          justify-content: center;
          gap: 18px;
          margin-top: 10px;
        }

        .icon-link {
          width: 62px;
          height: 62px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: white;
          font-size: 33px;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(12px);
          box-shadow: 0 0 24px rgba(150, 235, 255, 0.4);
          transition: 0.25s ease;
        }

        .icon-link:hover {
          transform: translateY(-3px) scale(1.08);
          background: rgba(190, 245, 255, 0.24);
          box-shadow: 0 0 34px rgba(180, 245, 255, 0.85);
        }

        .phone {
          line-height: 1;
        }

        .logo-showcase {
          padding: 30px 20px 80px;
          display: flex;
          justify-content: center;
        }

        .hero-logo-frame {
          width: min(760px, 94vw);
          border-radius: 34px;
          padding: 14px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 55px rgba(130, 235, 255, 0.45);
        }

        .hero-logo {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 24px;
          filter: drop-shadow(0 0 25px rgba(160, 245, 255, 0.9));
        }

        .shop-section {
          padding: 80px 24px;
          text-align: center;
        }

        .shop-section h2,
        .designer h2 {
          font-size: clamp(2.2rem, 5vw, 4rem);
          margin-bottom: 12px;
        }

        .section-subtitle {
          max-width: 780px;
          margin: 0 auto 42px;
          color: #dffaff;
          line-height: 1.7;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
          max-width: 1250px;
          margin: 0 auto;
        }

        .product-card {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(5, 25, 42, 0.8);
          backdrop-filter: blur(16px);
          border-radius: 28px;
          padding: 22px;
          box-shadow:
            inset 0 0 24px rgba(255, 255, 255, 0.08),
            0 20px 55px rgba(0, 0, 0, 0.38);
        }

        .product-window {
          height: 260px;
          border-radius: 24px;
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.55), transparent 35%),
            linear-gradient(145deg, #dffbff, #75d9f4 45%, #10324d);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.55);
        }

        .shirt-shape {
          width: 150px;
          height: 170px;
          background: linear-gradient(180deg, #ffffff, #b8f4ff);
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 25%,
            82% 42%,
            82% 100%,
            18% 100%,
            18% 42%,
            0% 25%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          color: #12364a;
          font-weight: 900;
          box-shadow: 0 0 35px rgba(255, 255, 255, 0.85);
        }

        .freeze::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(circle, rgba(230, 255, 255, 0.95), rgba(110, 220, 255, 0.45), transparent);
          animation: iceFlash 0.8s ease forwards;
        }

        @keyframes iceFlash {
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
            transform: scale(1.25);
          }
        }

        .option-group {
          margin-top: 18px;
          text-align: left;
        }

        .option-group strong {
          display: block;
          margin-bottom: 8px;
          color: #e8fdff;
        }

        .option-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .option-row button,
        .cart-button {
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.11);
          color: white;
          padding: 9px 12px;
          border-radius: 999px;
          transition: 0.25s ease;
        }

        .option-row button:hover,
        .option-row button.active {
          background: #c7f7ff;
          color: #082436;
          box-shadow: 0 0 18px rgba(190, 250, 255, 0.85);
        }

        .selected {
          margin: 16px 0;
          color: #d9fbff;
          font-size: 0.95rem;
        }

        .cart-button {
          width: 100%;
          padding: 14px;
          font-weight: 900;
          background: linear-gradient(135deg, #dffbff, #5ed8ff);
          color: #082436;
          box-shadow: 0 0 20px rgba(130, 235, 255, 0.45);
        }

        .cart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(160, 245, 255, 0.85);
        }

        .designer {
          margin: 40px auto 100px;
          max-width: 950px;
          padding: 50px 28px;
          border-radius: 32px;
          text-align: center;
          background: rgba(5, 25, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .designer p {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #e4fbff;
        }

        @media (max-width: 760px) {
          .site-header {
            flex-direction: column;
            padding: 16px;
          }

          .top-tabs {
            justify-content: center;
          }

          .hero {
            min-height: 68vh;
            padding-top: 70px;
          }

          h1 {
            letter-spacing: -1px;
          }

          .product-window {
            height: 230px;
          }

          .falling-eskimo {
            opacity: 0.2;
            background-size: 420px 615px;
          }
        }
      `}</style>
    </main>
  );
}
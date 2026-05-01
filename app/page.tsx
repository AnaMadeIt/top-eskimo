"use client";

import { useMemo, useState } from "react";

const categories = ["Men’s", "Women’s", "T-Shirts", "Sweatshirts", "Sweatpants"];

const products = [
  { name: "Ice Savant !$", type: "T-Shirt", price: "$45" },
  { name: "Frozen Standard Tee", type: "T-Shirt", price: "$40" },
  { name: "Cold Front Hoodie", type: "Sweatshirt", price: "$75" },
  { name: "Below Zero Sweats", type: "Sweatpants", price: "$65" },
];

const colors = ["Ice Blue", "Black Ice", "Snow White", "Glacier Gray"];
const sizes = ["S", "M", "L", "XL", "XXL"];

function BlizzardBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 95 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 14,
      size: 8 + Math.random() * 24,
      type: i % 3 === 0 ? "diamond" : i % 3 === 1 ? "shard" : "snow",
      opacity: 0.35 + Math.random() * 0.45,
    }));
  }, []);

  return (
    <div className="blizzard" aria-hidden="true">
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
            opacity: p.opacity,
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

      <section className="hero">
        <div className="logo-glow">Top Eskimo</div>
        <h1>Be Bold. Be Ice Cold.</h1>
        <p>
          Luxury cold-weather streetwear designed for those who know they are
          the coldest around.
        </p>

        <div className="contact-row">
          <a href="https://www.instagram.com/topeskimogang" target="_blank">
            Instagram: @topeskimogang
          </a>
          <a href="tel:6302971679">📞 630-297-1679</a>
        </div>
      </section>

      <nav className="category-tabs">
        {categories.map((cat) => (
          <a key={cat} href="#shop">
            {cat}
          </a>
        ))}
      </nav>

      <section id="shop" className="shop-section">
        <h2>Shop the Ice Collection</h2>
        <p className="section-subtitle">
          Choose your product, color, and size. Each selection freezes over
          before locking in your custom choice.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="designer">
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
          background:
            linear-gradient(rgba(4, 20, 35, 0.72), rgba(4, 20, 35, 0.82)),
            radial-gradient(circle at top, #bff4ff 0%, #4ba3c7 35%, #081827 100%);
          color: white;
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        main {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
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

        .hero,
        .category-tabs,
        .shop-section,
        .designer {
          position: relative;
          z-index: 2;
        }

        .hero {
          min-height: 85vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 20px;
        }

        .logo-glow {
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 900;
          letter-spacing: -4px;
          color: #eaffff;
          text-shadow:
            0 0 12px #8defff,
            0 0 28px #49cfff,
            0 0 55px #0ea5e9;
          animation: shimmer 3s infinite linear;
        }

        @keyframes shimmer {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.45);
          }
        }

        h1 {
          font-size: clamp(2rem, 5vw, 4.5rem);
          margin: 16px 0 10px;
        }

        .hero p {
          max-width: 720px;
          font-size: 1.2rem;
          line-height: 1.7;
          color: #e6fbff;
        }

        .contact-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 18px;
          margin-top: 20px;
        }

        .contact-row a,
        .category-tabs a {
          color: white;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          padding: 12px 18px;
          border-radius: 999px;
          box-shadow: 0 0 20px rgba(140, 230, 255, 0.25);
        }

        .category-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          padding: 22px;
        }

        .category-tabs a:hover,
        .contact-row a:hover {
          background: rgba(170, 240, 255, 0.25);
          box-shadow: 0 0 28px rgba(170, 240, 255, 0.6);
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
          background: rgba(5, 25, 42, 0.72);
          backdrop-filter: blur(16px);
          border-radius: 28px;
          padding: 22px;
          box-shadow:
            inset 0 0 24px rgba(255, 255, 255, 0.08),
            0 20px 55px rgba(0, 0, 0, 0.38);
        }

        .product-card h3 {
          font-size: 1.45rem;
          margin: 18px 0 4px;
        }

        .product-card p {
          color: #bff6ff;
          font-weight: bold;
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
          background: rgba(5, 25, 42, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .designer p {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #e4fbff;
        }

        @media (max-width: 700px) {
          .hero {
            padding-top: 60px;
          }

          .logo-glow {
            letter-spacing: -2px;
          }

          .product-window {
            height: 230px;
          }
        }
      `}</style>
    </main>
  );
}
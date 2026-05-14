"use client";

import { useMemo, useState } from "react";

const logoSrc = "/logos/Top Eskimo in snowy winterland.png";

const eskimoLogoFiles = [
  "/logos/top_eskimo_01_brown.png",
  "/logos/top_eskimo_02_navy.png",
  "/logos/top_eskimo_03_light_blue.png",
  "/logos/top_eskimo_04_red.png",
  "/logos/top_eskimo_05_orange.png",
  "/logos/top_eskimo_06_pink.png",
  "/logos/top_eskimo_07_yellow.png",
  "/logos/top_eskimo_08_purple.png",
  "/logos/top_eskimo_09_teal.png",
  "/logos/top_eskimo_10_blue.png",
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const products = [
  {
    id: "frozen-standard",
    name: "Frozen Standard Tee",
    eyebrow: "Built for every adventure",
    type: "T-Shirt",
    price: 40,
    description: "The 1st Edition Top Eskimo OG. Limited Supply, so don't let this opportunity melt!";
    colors: [
      { name: "Light Blue", image: "/logos/frozen-standard-light-blue.jpg", swatch: "#9dd7ff" },
      { name: "White", image: "/logos/frozen-standard-white.jpg", swatch: "#ffffff" },
      { name: "Tan", image: "/logos/frozen-standard-tan.jpg", swatch: "#d8b486" },
      { name: "Mint Green", image: "/logos/frozen-standard-mint.jpg", swatch: "#b9f0dc" },
      { name: "Purple", image: "/logos/frozen-standard-purple.jpg", swatch: "#9c77d9" },
    ],
  },
  {
    id: "ice-savant",
    name: "Ice $avant ! $",
    eyebrow: "Statement tee",
    type: "T-Shirt",
    price: 45,
    description: "Made with Reversible Fleece Technology that is truly one of a kind. Icy days don't stand a chance with this impenetrable fit.";
    colors: [
      { name: "Light Blue", image: "/logos/frozen-standard-light-blue.jpg", swatch: "#9dd7ff" },
      { name: "White", image: "/logos/frozen-standard-white.jpg", swatch: "#ffffff" },
      { name: "Tan", image: "/logos/frozen-standard-tan.jpg", swatch: "#d8b486" },
      { name: "Mint Green", image: "/logos/frozen-standard-mint.jpg", swatch: "#b9f0dc" },
      { name: "Purple", image: "/logos/frozen-standard-purple.jpg", swatch: "#9c77d9" },
    ],
  },
];

type CartItem = {
  id: string;
  product: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

function InstagramLogo() {
  return (
    <span className="instagram-logo">
      <span className="instagram-lens" />
      <span className="instagram-dot" />
    </span>
  );
}

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

  const fallingEskimos = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        src: eskimoLogoFiles[i % eskimoLogoFiles.length],
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 14 + Math.random() * 22,
        size: 58 + Math.random() * 50,
      })),
    []
  );

  return (
    <div className="blizzard" aria-hidden="true">
      {fallingEskimos.map((e) => (
        <img
          key={e.id}
          src={e.src}
          alt=""
          className="falling-eskimo"
          style={{ left: `${e.left}%`, width: `${e.size}px`, animationDelay: `${e.delay}s`, animationDuration: `${e.duration}s` }}
        />
      ))}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`particle ${p.type}`}
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, width: `${p.size}px`, height: `${p.size}px` }}
        />
      ))}
    </div>
  );
}

function ProductShowcase({ product, onAddToCart }: { product: (typeof products)[0]; onAddToCart: (item: CartItem) => void }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [freezing, setFreezing] = useState(false);
  const [added, setAdded] = useState(false);

  const freezeChange = (callback: () => void) => {
    setFreezing(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setFreezing(false), 420);
    }, 220);
  };

  const addItem = () => {
    onAddToCart({ id: `${product.id}-${selectedColor.name}-${size}-${Date.now()}`, product: product.name, color: selectedColor.name, size, quantity, price: product.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section id={product.id} className="product-showcase">
      <div className="product-title-row">
        <p>{product.eyebrow}</p>
        <h2>{product.name}</h2>
        <span className="icy-description">{product.description}</span>
      </div>

      <div className="color-gallery">
        {product.colors.map((color) => {
          const active = color.name === selectedColor.name;
          return (
            <button key={color.name} className={`color-tile ${active ? "active" : ""}`} onClick={() => freezeChange(() => setSelectedColor(color))}>
              <div className="tee-frame">
                <img src={color.image} alt={`${product.name} in ${color.name}`} />
              </div>
              <strong>{color.name}</strong>
              <span style={{ background: color.swatch }} />
            </button>
          );
        })}
      </div>

      <div className="buy-panel">
        <div className={`featured-product-image ${freezing ? "freeze" : ""}`}>
          <img src={selectedColor.image} alt={`${product.name} selected in ${selectedColor.name}`} />
        </div>

        <div className="purchase-controls">
          <div>
            <small>Size</small>
            <div className="size-row">
              {sizes.map((s) => (
                <button key={s} className={size === s ? "active" : ""} onClick={() => freezeChange(() => setSize(s))}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <small>Quantity</small>
            <div className="quantity-row">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className="price-box">${product.price}.00</div>

          <button className={`cart-button ${added ? "added" : ""}`} onClick={addItem}>
            {added ? "Added ❄️" : "Add to Frozen Cart ❄️"}
          </button>
        </div>
      </div>
    </section>
  );
}

function CheckoutCart({ cart, setCart }: { cart: CartItem[]; setCart: React.Dispatch<React.SetStateAction<CartItem[]>> }) {
  const [paymentMethod, setPaymentMethod] = useState("Cash App");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentLinks: Record<string, string> = {
    "Cash App": "https://cash.app/$Dizzlemoney123",
    Venmo: "https://venmo.com/DonQDizzle",
    Zelle: "",
  };

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderPlaced(true);
    const link = paymentLinks[paymentMethod];
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="checkout" className="checkout-section">
      <div className="checkout-card">
        <div className="checkout-heading">
          <p>Frozen checkout</p>
          <h2>Cart & Payment</h2>
          <span>Submit your shipping details, then complete payment through Cash App, Venmo, or Zelle.</span>
        </div>

        <div className="cart-list">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty. Add a product above to start checkout.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-line">
                <div>
                  <strong>{item.product}</strong>
                  <span>{item.color} / {item.size} × {item.quantity}</span>
                </div>
                <button onClick={() => setCart((prev) => prev.filter((cartItem) => cartItem.id !== item.id))}>Remove</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">Total: ${total}.00</div>

        <form className="checkout-form" onSubmit={submitOrder}>
          <input required placeholder="Full Name" />
          <input required placeholder="Email or Phone" />
          <input required placeholder="Shipping Address" />
          <div className="form-grid">
            <input required placeholder="City" />
            <input required placeholder="State" />
            <input required placeholder="ZIP" />
          </div>

          <div className="payment-options">
            {["Cash App", "Venmo", "Zelle"].map((method) => (
              <button key={method} type="button" className={paymentMethod === method ? "active" : ""} onClick={() => setPaymentMethod(method)}>
                {method}
              </button>
            ))}
          </div>

          <div className="payment-note">
            {paymentMethod === "Cash App" && <span>Cash App: $Dizzlemoney123</span>}
            {paymentMethod === "Venmo" && <span>Venmo: @DonQDizzle</span>}
            {paymentMethod === "Zelle" && <span>Zelle: 630-297-1679</span>}
          </div>

          <button className="submit-order" disabled={cart.length === 0} type="submit">
            Submit Order & Open {paymentMethod}
          </button>

          {orderPlaced && (
            <p className="order-message">
              Order details captured on this page. Please complete payment for ${total}.00 through {paymentMethod}. For Zelle, send payment to 630-297-1679.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartPage, setShowCartPage] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (showCartPage) {
    return (
      <main>
        <BlizzardBackground />
        <header className="site-header">
          <div className="header-left">
            <button className="brand brand-button" onClick={() => setShowCartPage(false)}>Top Eskimo</button>
          </div>
          <nav className="top-tabs">
            <button onClick={() => setShowCartPage(false)}>← Continue Shopping</button>
          </nav>
        </header>
        <CheckoutCart cart={cart} setCart={setCart} />
        <style jsx global>{`
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { margin: 0; color: white; font-family: Arial, Helvetica, sans-serif; overflow-x: hidden; background: linear-gradient(rgba(4, 20, 35, 0.74), rgba(4, 20, 35, 0.9)), radial-gradient(circle at top, #bff4ff 0%, #4ba3c7 35%, #081827 100%); }
          main { position: relative; min-height: 100vh; overflow: hidden; }
          .site-header { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 18px 32px; background: rgba(4, 20, 35, 0.72); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,.18); box-shadow: 0 10px 35px rgba(0,0,0,.25); }
          .header-left { display: flex; align-items: center; gap: 18px; }
          .brand { color: #eaffff; font-size: clamp(1.4rem, 3vw, 2.4rem); font-weight: 900; text-decoration: none; letter-spacing: -1px; text-shadow: 0 0 12px #8defff, 0 0 28px #49cfff; }
          .brand-button { cursor: pointer; border: 0; background: transparent; }
          .top-tabs { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end; }
          .top-tabs button { cursor: pointer; color: white; text-decoration: none; padding: 11px 16px; border-radius: 999px; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.12); box-shadow: 0 0 18px rgba(140,230,255,.2); transition: .25s ease; }
          .top-tabs button:hover { background: rgba(190,245,255,.24); box-shadow: 0 0 28px rgba(180,245,255,.72); transform: translateY(-2px); }
          .blizzard { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
          .particle { position: absolute; top: -80px; animation-name: fallAndDrift; animation-timing-function: linear; animation-iteration-count: infinite; filter: drop-shadow(0 0 10px rgba(190,245,255,.9)); opacity: .72; }
          .snow { border-radius: 999px; background: radial-gradient(circle, white 0%, #c9f7ff 55%, transparent 72%); }
          .diamond { transform: rotate(45deg); background: linear-gradient(135deg, #fff, #9df4ff, #5ac8ff); box-shadow: 0 0 18px rgba(160,245,255,.95); }
          .shard { width: 12px !important; border-radius: 70% 20% 70% 20%; background: linear-gradient(180deg, #fff, #8eeeff, transparent); box-shadow: 0 0 16px rgba(150,235,255,.85); }
          .falling-eskimo { position: absolute; top: -160px; height: auto; animation-name: eskimoFall; animation-timing-function: linear; animation-iteration-count: infinite; opacity: .48; filter: drop-shadow(0 0 10px rgba(255,255,255,.95)) drop-shadow(0 0 22px rgba(80,210,255,.8)); z-index: 1; }
          @keyframes fallAndDrift { 0% { transform: translate3d(0,-120px,0) rotate(0deg); } 50% { transform: translate3d(55px,50vh,0) rotate(180deg); } 100% { transform: translate3d(-45px,110vh,0) rotate(360deg); } }
          @keyframes eskimoFall { 0% { transform: translate3d(0,-220px,0) rotate(-12deg) scale(.86); opacity: 0; } 10% { opacity: .48; } 50% { transform: translate3d(85px,50vh,0) rotate(10deg) scale(1); opacity: .54; } 100% { transform: translate3d(-85px,118vh,0) rotate(-14deg) scale(.92); opacity: 0; } }
          .checkout-section { position: relative; z-index: 2; padding: 80px 24px; text-align: center; }
          .checkout-card { max-width: 1050px; margin: 0 auto; border-radius: 34px; padding: 34px; background: rgba(5,25,42,.86); border: 1px solid rgba(255,255,255,.24); box-shadow: 0 30px 80px rgba(0,0,0,.34); backdrop-filter: blur(18px); }
          .checkout-heading h2 { font-size: clamp(2.2rem, 5vw, 4rem); margin: 0 0 12px; }
          .checkout-heading span { max-width: 780px; margin: 0 auto 42px; color: #dffaff; line-height: 1.7; display: block; }
          .cart-list { display: grid; gap: 12px; margin: 22px 0; text-align: left; }
          .empty-cart { color: #dffaff; text-align: center; }
          .cart-line { display: flex; justify-content: space-between; gap: 14px; align-items: center; border-radius: 18px; padding: 14px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.18); }
          .cart-line span { display: block; margin-top: 4px; color: #dffaff; }
          .cart-line button { cursor: pointer; border: 1px solid rgba(255,255,255,.24); background: rgba(255,255,255,.1); color: white; border-radius: 999px; padding: 8px 12px; }
          .cart-total { margin: 14px 0 22px; font-size: 1.7rem; font-family: Georgia, serif; }
          .checkout-form { display: grid; gap: 12px; }
          .checkout-form input { width: 100%; border: 1px solid rgba(255,255,255,.2); border-radius: 14px; padding: 14px 16px; background: rgba(255,255,255,.12); color: white; outline: none; }
          .checkout-form input::placeholder { color: rgba(255,255,255,.72); }
          .form-grid { display: grid; grid-template-columns: 1fr 120px 120px; gap: 12px; }
          .payment-options { justify-content: center; margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px; }
          .payment-options button { cursor: pointer; border: 1px solid rgba(255,255,255,.24); background: rgba(255,255,255,.1); color: white; border-radius: 999px; padding: 12px 16px; }
          .payment-options button.active { background: #c7f7ff; color: #082436; }
          .payment-note, .order-message { color: #dffaff; line-height: 1.6; }
          .submit-order { cursor: pointer; border: 0; border-radius: 16px; padding: 16px 20px; font-weight: 900; color: white; background: linear-gradient(135deg, #00427f, #006edb); box-shadow: 0 0 24px rgba(0,111,219,.25); transition: .25s ease; }
          .submit-order:disabled { opacity: .45; cursor: not-allowed; }
          @media (max-width: 900px) { .site-header { flex-direction: column; padding: 16px; } .form-grid { grid-template-columns: 1fr; } }
        `}</style>
      </main>
    );
  }

  return (
    <main>
      <BlizzardBackground />

      <header className="site-header">
        <div className="header-left">
          <a href="#home" className="brand">Top Eskimo</a>
          <div className="header-icons">
            <a href="https://www.instagram.com/topeskimogang" target="_blank" rel="noopener noreferrer" aria-label="Visit Top Eskimo Instagram" className="mini-icon-link"><InstagramLogo /></a>
            <a href="tel:6302971679" aria-label="Call Top Eskimo" className="mini-icon-link phone-mini">📞</a>
          </div>
        </div>
        <nav className="top-tabs">
          <a href="#merchandise">Merchandise</a>
          <button onClick={() => setShowCartPage(true)}>🛒 Cart ({cartCount})</button>
          <a href="#designer">Designer Profile</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <h1>Be Bold. Be Ice Cold.</h1>
        <p>Luxury cold-weather streetwear built for the ones who know they are the coldest around.</p>
        <div id="contact" className="contact-row">
          <a href="https://www.instagram.com/topeskimogang" target="_blank" rel="noopener noreferrer" aria-label="Visit Top Eskimo Instagram" className="instagram-logo-link"><InstagramLogo /></a>
          <a href="tel:6302971679" aria-label="Call Top Eskimo" className="icon-link phone">📞</a>
        </div>
      </section>

      <section className="logo-showcase">
        <div className="hero-logo-frame"><img src={logoSrc} alt="Top Eskimo logo styles" className="hero-logo" /></div>
      </section>

      <section id="merchandise" className="shop-section">
        <h2>Merchandise</h2>
        <p className="section-subtitle">Choose your product, color, size, and quantity. Each selection freezes over before locking in.</p>
        <div className="product-stack">
          {products.map((product) => <ProductShowcase key={product.id} product={product} onAddToCart={(item) => setCart((prev) => [...prev, item])} />)}
        </div>

        <section className="coming-soon-section">
          <div className="coming-soon-card">
            <p>Coming Soon</p>
            <h2>Cold Front Hoodie</h2>
            <span>Heavyweight comfort is in the works. Stay tuned for the next icy drop.</span>
          </div>
          <div className="coming-soon-card">
            <p>Coming Soon</p>
            <h2>Below Zero Sweats</h2>
            <span>Premium sweats are coming soon to complete the Top Eskimo fit.</span>
          </div>
        </section>
      </section>

      <section id="designer" className="designer">
        <h2>Designer Profile</h2>
        <p>
          My name is Scott Schroer, I am the founder of The Top Eskimo Brand. I created this company for those who know what it's like to have a hustle that is Ice Cold, what it's like to be left out in the cold, or somewhere in between.
        </p>
        <p>
          It is no secret that the world can be a frigid place at times, but we at Top Eskimo help stylish individuals like yourself to express this understanding with a sense of swagger, status, and durability. When the going gets tough, the tough get going.
        </p>
        <p>
          Peace, Love, and Prosperity.
        </p>
      </section>

      <style jsx global>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; color: white; font-family: Arial, Helvetica, sans-serif; overflow-x: hidden; background: linear-gradient(rgba(4, 20, 35, 0.74), rgba(4, 20, 35, 0.9)), radial-gradient(circle at top, #bff4ff 0%, #4ba3c7 35%, #081827 100%); }
        main { position: relative; min-height: 100vh; overflow: hidden; }
        .site-header { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 18px 32px; background: rgba(4, 20, 35, 0.72); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,.18); box-shadow: 0 10px 35px rgba(0,0,0,.25); }
        .header-left { display: flex; align-items: center; gap: 18px; }
        .brand { color: #eaffff; font-size: clamp(1.4rem, 3vw, 2.4rem); font-weight: 900; text-decoration: none; letter-spacing: -1px; text-shadow: 0 0 12px #8defff, 0 0 28px #49cfff; }
        .header-icons, .top-tabs, .contact-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .top-tabs { justify-content: flex-end; }
        .top-tabs a, .top-tabs button, .mini-icon-link, .icon-link, .instagram-logo-link { color: white; text-decoration: none; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.12); box-shadow: 0 0 18px rgba(140,230,255,.2); transition: .25s ease; }
        .top-tabs a, .top-tabs button { cursor: pointer; padding: 11px 16px; border-radius: 999px; font: inherit; }
        .mini-icon-link, .icon-link, .instagram-logo-link { width: 42px; height: 42px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; backdrop-filter: blur(12px); }
        .icon-link, .instagram-logo-link { width: 62px; height: 62px; font-size: 33px; }
        .top-tabs a:hover, .top-tabs button:hover, .mini-icon-link:hover, .icon-link:hover, .instagram-logo-link:hover { transform: translateY(-2px) scale(1.04); background: rgba(190,245,255,.24); box-shadow: 0 0 30px rgba(180,245,255,.8); }
        .instagram-logo { width: 36px; height: 36px; border-radius: 11px; position: relative; display: inline-block; background: radial-gradient(circle at 30% 105%, #fdf497 0%, #fdf497 14%, transparent 30%), radial-gradient(circle at 30% 105%, #fd5949 0%, #fd5949 32%, transparent 48%), radial-gradient(circle at 70% 20%, #d6249f 0%, #d6249f 32%, transparent 52%), linear-gradient(135deg, #285aeb 0%, #8134af 45%, #dd2a7b 70%, #feda75 100%); box-shadow: 0 0 18px rgba(255,255,255,.55); }
        .instagram-logo::before { content: ""; position: absolute; inset: 8px; border: 3px solid white; border-radius: 9px; }
        .instagram-lens { position: absolute; width: 10px; height: 10px; border: 3px solid white; border-radius: 999px; left: 13px; top: 13px; }
        .instagram-dot { position: absolute; width: 5px; height: 5px; border-radius: 999px; background: white; right: 9px; top: 9px; }
        .mini-icon-link .instagram-logo { width: 25px; height: 25px; border-radius: 8px; }
        .mini-icon-link .instagram-logo::before { inset: 6px; border-width: 2px; border-radius: 7px; }
        .mini-icon-link .instagram-lens { width: 7px; height: 7px; border-width: 2px; left: 9px; top: 9px; }
        .mini-icon-link .instagram-dot { width: 4px; height: 4px; right: 6px; top: 6px; }
        .blizzard { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .particle { position: absolute; top: -80px; animation-name: fallAndDrift; animation-timing-function: linear; animation-iteration-count: infinite; filter: drop-shadow(0 0 10px rgba(190,245,255,.9)); opacity: .72; }
        .snow { border-radius: 999px; background: radial-gradient(circle, white 0%, #c9f7ff 55%, transparent 72%); }
        .diamond { transform: rotate(45deg); background: linear-gradient(135deg, #fff, #9df4ff, #5ac8ff); box-shadow: 0 0 18px rgba(160,245,255,.95); }
        .shard { width: 12px !important; border-radius: 70% 20% 70% 20%; background: linear-gradient(180deg, #fff, #8eeeff, transparent); box-shadow: 0 0 16px rgba(150,235,255,.85); }
        .falling-eskimo { position: absolute; top: -160px; height: auto; animation-name: eskimoFall; animation-timing-function: linear; animation-iteration-count: infinite; opacity: .48; filter: drop-shadow(0 0 10px rgba(255,255,255,.95)) drop-shadow(0 0 22px rgba(80,210,255,.8)); z-index: 1; }
        @keyframes fallAndDrift { 0% { transform: translate3d(0,-120px,0) rotate(0deg); } 50% { transform: translate3d(55px,50vh,0) rotate(180deg); } 100% { transform: translate3d(-45px,110vh,0) rotate(360deg); } }
        @keyframes eskimoFall { 0% { transform: translate3d(0,-220px,0) rotate(-12deg) scale(.86); opacity: 0; } 10% { opacity: .48; } 50% { transform: translate3d(85px,50vh,0) rotate(10deg) scale(1); opacity: .54; } 100% { transform: translate3d(-85px,118vh,0) rotate(-14deg) scale(.92); opacity: 0; } }
        .hero, .logo-showcase, .shop-section, .checkout-section, .designer { position: relative; z-index: 2; }
        .hero { min-height: 72vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 90px 20px 40px; }
        h1 { font-size: clamp(2.8rem, 8vw, 7rem); margin: 0 0 18px; color: #eaffff; text-shadow: 0 0 12px #8defff, 0 0 32px #49cfff, 0 0 65px #0ea5e9; letter-spacing: -3px; }
        .hero p { max-width: 760px; font-size: 1.2rem; line-height: 1.7; color: #e6fbff; margin: 0 auto 24px; }
        .contact-row { justify-content: center; margin-top: 10px; }
        .logo-showcase { padding: 30px 20px 80px; display: flex; justify-content: center; }
        .hero-logo-frame { width: min(760px, 94vw); border-radius: 34px; padding: 14px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.28); backdrop-filter: blur(10px); box-shadow: 0 0 55px rgba(130,235,255,.45); }
        .hero-logo { width: 100%; height: auto; display: block; border-radius: 24px; filter: drop-shadow(0 0 25px rgba(160,245,255,.9)); }
        .shop-section, .checkout-section { padding: 80px 24px; text-align: center; }
        .shop-section h2, .checkout-heading h2, .designer h2 { font-size: clamp(2.2rem, 5vw, 4rem); margin: 0 0 12px; }
        .section-subtitle, .checkout-heading span { max-width: 780px; margin: 0 auto 42px; color: #dffaff; line-height: 1.7; display: block; }
        .product-stack { display: grid; gap: 56px; max-width: 1320px; margin: 0 auto; }
        .coming-soon-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; max-width: 1040px; margin: 54px auto 0; }
        .coming-soon-card { border-radius: 30px; padding: 42px 28px; background: rgba(236,251,255,.74); color: #081827; border: 1px solid rgba(255,255,255,.68); box-shadow: 0 24px 60px rgba(0,0,0,.2); backdrop-filter: blur(18px); }
        .coming-soon-card p { margin: 0 0 12px; text-transform: uppercase; letter-spacing: .32em; color: #0a4c88; font-size: .75rem; font-weight: 900; }
        .coming-soon-card h2 { margin: 0 0 12px; font-size: clamp(1.8rem, 4vw, 3rem); font-family: Georgia, serif; }
        .coming-soon-card span { color: #394c5d; line-height: 1.6; }
        .product-showcase { border-radius: 34px; padding: 34px; background: rgba(236,251,255,.9); color: #081827; border: 1px solid rgba(255,255,255,.7); box-shadow: 0 30px 80px rgba(0,0,0,.28); backdrop-filter: blur(18px); }
        .product-title-row { margin-bottom: 28px; }
        .product-title-row p { margin: 0 0 10px; text-transform: uppercase; letter-spacing: .32em; color: #0a4c88; font-size: .75rem; font-weight: 900; }
        .product-title-row h2 { margin: 0 0 12px; font-size: clamp(2.2rem, 5vw, 4.4rem); font-family: Georgia, serif; }
        .product-title-row span { color: #394c5d; line-height: 1.6; }
        .icy-description { display: block; max-width: 880px; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(1.15rem, 2vw, 1.55rem); font-weight: 700; letter-spacing: .035em; color: #073c70 !important; text-shadow: 0 0 10px rgba(255,255,255,.95), 0 0 22px rgba(108,216,255,.72), 0 0 34px rgba(32,154,255,.34); }
        .color-gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 18px; margin-bottom: 22px; }
        .color-tile { cursor: pointer; border: 1px solid rgba(8,36,54,.16); border-radius: 22px; padding: 18px; background: rgba(255,255,255,.72); color: #081827; transition: .25s ease; box-shadow: 0 14px 34px rgba(0,0,0,.08); }
        .color-tile.active, .color-tile:hover { border-color: #006edb; transform: translateY(-4px); box-shadow: 0 18px 44px rgba(0,111,219,.18); }
        .tee-frame { height: 230px; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 18px; background: linear-gradient(180deg, white, #eaf8ff); }
        .tee-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center; filter: saturate(1.16) contrast(1.05) brightness(1.03); }
        .color-tile strong { display: block; margin: 14px 0 10px; font-family: Georgia, serif; font-size: 1.05rem; }
        .color-tile > span { display: inline-block; width: 34px; height: 34px; border-radius: 999px; border: 3px solid white; box-shadow: 0 0 0 1px rgba(8,36,54,.25); }
        .buy-panel { display: grid; grid-template-columns: .9fr 1.1fr; gap: 22px; align-items: stretch; border-radius: 24px; padding: 22px; background: rgba(255,255,255,.72); border: 1px solid rgba(8,36,54,.12); }
        .featured-product-image { min-height: 320px; border-radius: 22px; overflow: hidden; position: relative; background: linear-gradient(180deg, #fff, #eaf8ff); }
        .featured-product-image img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; filter: saturate(1.18) contrast(1.06) brightness(1.03); }
        .purchase-controls { display: grid; gap: 18px; align-content: center; text-align: left; }
        .purchase-controls small { display: block; margin-bottom: 8px; text-transform: uppercase; letter-spacing: .24em; color: #082436; font-weight: 900; }
        .size-row, .quantity-row, .payment-options { display: flex; flex-wrap: wrap; gap: 10px; }
        .size-row button, .quantity-row button, .payment-options button { cursor: pointer; border: 1px solid rgba(8,36,54,.18); background: white; color: #082436; border-radius: 12px; padding: 13px 18px; transition: .25s ease; }
        .size-row button.active, .size-row button:hover, .payment-options button.active, .payment-options button:hover { border-color: #006edb; color: #003d77; box-shadow: 0 0 18px rgba(0,111,219,.18); }
        .quantity-row { align-items: center; }
        .quantity-row span { min-width: 36px; text-align: center; font-size: 1.15rem; }
        .price-box { font-size: 2rem; font-family: Georgia, serif; }
        .cart-button, .submit-order { cursor: pointer; border: 0; border-radius: 16px; padding: 16px 20px; font-weight: 900; color: white; background: linear-gradient(135deg, #00427f, #006edb); box-shadow: 0 0 24px rgba(0,111,219,.25); transition: .25s ease; }
        .cart-button:hover, .cart-button.added, .submit-order:hover { transform: translateY(-2px); box-shadow: 0 0 34px rgba(0,111,219,.4); }
        .freeze::after { content: ""; position: absolute; inset: 0; background: linear-gradient(135deg, transparent, rgba(255,255,255,.95), transparent), radial-gradient(circle, rgba(230,255,255,.95), rgba(110,220,255,.45), transparent); animation: iceFlash .8s ease forwards; pointer-events: none; }
        @keyframes iceFlash { 0% { opacity: 0; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.05); } 100% { opacity: 0; transform: scale(1.25); } }
        .checkout-card { max-width: 1050px; margin: 0 auto; border-radius: 34px; padding: 34px; background: rgba(5,25,42,.86); border: 1px solid rgba(255,255,255,.24); box-shadow: 0 30px 80px rgba(0,0,0,.34); backdrop-filter: blur(18px); }
        .cart-list { display: grid; gap: 12px; margin: 22px 0; text-align: left; }
        .empty-cart { color: #dffaff; text-align: center; }
        .cart-line { display: flex; justify-content: space-between; gap: 14px; align-items: center; border-radius: 18px; padding: 14px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.18); }
        .cart-line span { display: block; margin-top: 4px; color: #dffaff; }
        .cart-line button { cursor: pointer; border: 1px solid rgba(255,255,255,.24); background: rgba(255,255,255,.1); color: white; border-radius: 999px; padding: 8px 12px; }
        .cart-total { margin: 14px 0 22px; font-size: 1.7rem; font-family: Georgia, serif; }
        .checkout-form { display: grid; gap: 12px; }
        .checkout-form input { width: 100%; border: 1px solid rgba(255,255,255,.2); border-radius: 14px; padding: 14px 16px; background: rgba(255,255,255,.12); color: white; outline: none; }
        .checkout-form input::placeholder { color: rgba(255,255,255,.72); }
        .form-grid { display: grid; grid-template-columns: 1fr 120px 120px; gap: 12px; }
        .payment-options { justify-content: center; margin-top: 10px; }
        .payment-note, .order-message { color: #dffaff; line-height: 1.6; }
        .submit-order:disabled { opacity: .45; cursor: not-allowed; transform: none; }
        .designer { position: relative; z-index: 2; margin: 40px auto 100px; max-width: 950px; padding: 50px 28px; border-radius: 32px; text-align: center; background: rgba(5,25,42,.8); border: 1px solid rgba(255,255,255,.22); backdrop-filter: blur(16px); box-shadow: 0 20px 60px rgba(0,0,0,.35); }
        .designer p { font-size: 1.15rem; line-height: 1.8; color: #e4fbff; }
        @media (max-width: 900px) { .site-header { flex-direction: column; padding: 16px; } .header-left { flex-direction: column; gap: 10px; } .top-tabs { justify-content: center; } .buy-panel { grid-template-columns: 1fr; } .form-grid { grid-template-columns: 1fr; } h1 { letter-spacing: -1px; } .falling-eskimo { opacity: .4; } }
      `}</style>
    </main>
  );
}

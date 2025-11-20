"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="landing">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo" onClick={() => router.push("/")}>
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=60"
            alt="Logo"
          />
          <span>FoodRush</span>
        </div>
        <nav>
          <a onClick={() => router.push("/")}>Home</a>
          <a onClick={() => router.push("/shop")}>Shop</a>
          <a onClick={() => router.push("/login")}>Login</a>
          <a onClick={() => router.push("/register")} className="signup-btn">
            Sign Up
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Delicious Meals Delivered To Your Doorstep</h1>
          <p>
            Satisfy your cravings with hot and fresh food from top restaurants in your city — delivered within minutes!
          </p>
          <button onClick={() => router.push("/shop")}>Order Now</button>
        </div>
        <div className="hero-img">
          <img
            src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Food Delivery"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose FoodRush?</h2>
        <div className="feature-grid">
          <div className="feature">
            <img
              src="https://images.pexels.com/photos/4393666/pexels-photo-4393666.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Fast Delivery"
            />
            <h3>Fast Delivery</h3>
            <p>Fresh food delivered to you in record time, hot and delicious.</p>
          </div>
          <div className="feature">
            <img
              src="https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Quality Food"
            />
            <h3>Top Quality</h3>
            <p>Partnered with the best-rated restaurants and verified chefs.</p>
          </div>
          <div className="feature">
            <img
              src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Great Offers"
            />
            <h3>Great Offers</h3>
            <p>Exciting deals and discounts on every order you make.</p>
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="popular">
        <h2>Trending Dishes</h2>
        <div className="popular-grid">
          <div className="dish">
            <img
              src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Pizza"
            />
            <h4>Cheese Burst Pizza</h4>
            <p>₹299</p>
          </div>
          <div className="dish">
            <img
              src="https://images.pexels.com/photos/1639563/pexels-photo-1639563.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Burger"
            />
            <h4>Loaded Chicken Burger</h4>
            <p>₹199</p>
          </div>
          <div className="dish">
  <img
    src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600"
    alt="Hyderabadi Biryani"
  />
  <h4>Hyderabadi Biryani</h4>
  <p>₹249</p>
</div>
          <div className="dish">
            <img
              src="https://images.pexels.com/photos/3026809/pexels-photo-3026809.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dessert"
            />
            <h4>Chocolate Lava Cake</h4>
            <p>₹149</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Hungry? Let’s Fix That!</h2>
        <p>Order now and enjoy exclusive discounts on your first meal.</p>
        <button onClick={() => router.push("/shop")}>Start Ordering</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} FoodRush. All rights reserved.</p>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: "Poppins", sans-serif;
          color: #333;
          background-color: #fff;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 10%;
          background: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .logo img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        nav a {
          margin: 0 15px;
          cursor: pointer;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        nav a:hover {
          color: #ff6b00;
        }

        .signup-btn {
          background: #ff6b00;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
        }
          .signup-btn:hover {
          background: #ffffffff;
          color: black;
          padding: 8px 16px;
          border-radius: 6px;
          border:1px solid #ff6b00;
        }

        /* Hero */
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 10%;
          flex-wrap: wrap;
          background: linear-gradient(135deg, #fffaf0, #fff3e0);
        }

        .hero-text {
          max-width: 480px;
        }

        .hero-text h1 {
          font-size: 48px;
          line-height: 1.2;
          margin-bottom: 20px;
          color: #222;
        }

        .hero-text p {
          font-size: 18px;
          margin-bottom: 30px;
          color: #555;
        }

        .hero-text button {
          background: #ff6b00;
          color: white;
          border: none;
          padding: 14px 28px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .hero-text button:hover {
          background: #e65c00;
        }

        .hero-img img {
          width: 460px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* Features */
        .features {
          padding: 80px 10%;
          text-align: center;
        }

        .features h2 {
          font-size: 32px;
          margin-bottom: 40px;
        }

        .feature-grid {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .feature {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          padding: 20px;
          max-width: 300px;
          transition: transform 0.3s;
        }

        .feature:hover {
          transform: translateY(-10px);
        }

        .feature img {
          width: 100%;
          border-radius: 10px;
          height: 160px;
          object-fit: cover;
        }

        .feature h3 {
          margin: 15px 0 8px;
          color: #222;
        }

        /* Popular */
        .popular {
          background: #fff8ef;
          padding: 80px 10%;
          text-align: center;
        }

        .popular h2 {
          font-size: 32px;
          margin-bottom: 40px;
        }

        .popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
        }

        .dish {
          background: white;
          border-radius: 14px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.3s;
        }

        .dish:hover {
          transform: translateY(-8px);
        }

        .dish img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .dish h4 {
          margin: 12px 0 6px;
        }

        .dish p {
          margin-bottom: 12px;
          color: #ff6b00;
          font-weight: 600;
        }

        /* CTA */
        .cta {
          text-align: center;
          background: linear-gradient(135deg, #ff6b00, #ffa500);
          color: white;
          padding: 80px 20px;
          border-radius: 80px 80px 0 0;
        }

        .cta h2 {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .cta p {
          font-size: 18px;
          margin-bottom: 30px;
        }

        .cta button {
          background: white;
          color: #ff6b00;
          border: none;
          padding: 14px 28px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }

        .cta button:hover {
          background: #ffe5cc;
        }

        .footer {
          text-align: center;
          padding: 25px;
          font-size: 14px;
          background: #fff;
          color: #666;
          border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column-reverse;
            text-align: center;
          }
          .hero-img img {
            width: 90%;
            margin-bottom: 30px;
          }
          .hero-text h1 {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
}

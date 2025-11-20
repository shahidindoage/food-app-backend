"use client";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

 const handlePlaceOrder = async () => {
  if (cart.length === 0) return alert("Your cart is empty!");
  if (!address.trim()) return alert("Please enter delivery address");

  setLoading(true);
  try {
    if (!user) return alert("Please login");

    const body = {
      userId: user.id,
      cart: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || null
      })),
      address,
      paymentMethod,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      clearCart();

      // Show success alert first
      alert("Order placed successfully!");

      // Then redirect to order details page
      router.push(`/order/${data.id}`);
    } else {
      alert(data.error || "Failed to place order");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};




  if (cart.length === 0)
    return <p className="center-text">Your cart is empty</p>;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="cart-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image || "/placeholder.png"} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="total">
            <strong>Total:</strong> ₹{total}
          </div>
        </div>

        <div className="checkout-form">
          <h2>Delivery Details</h2>
          <label>
            Address:
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
          </label>

          <label>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </label>

          <button onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          max-width: 1000px;
          margin: 40px auto;
          padding: 0 20px;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
        .checkout-container {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        .cart-summary, .checkout-form {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          flex: 1 1 400px;
        }
        .cart-summary h2, .checkout-form h2 {
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .cart-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        .cart-item img {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          margin-right: 15px;
          object-fit: cover;
        }
        .item-info h3 {
          margin: 0;
          font-size: 16px;
        }
        .item-info p {
          margin: 4px 0 0;
          color: #555;
        }
        .total {
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
        }
        .checkout-form label {
          display: block;
          margin-bottom: 15px;
          font-weight: 500;
        }
        .checkout-form textarea {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          resize: none;
          min-height: 80px;
        }
        .checkout-form select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .checkout-form button {
          margin-top: 15px;
          width: 100%;
          padding: 12px;
          background-color: #0077b6;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
        .checkout-form button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .center-text {
          text-align: center;
          margin-top: 50px;
          font-size: 18px;
          color: #555;
        }

        @media(max-width: 768px) {
          .checkout-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

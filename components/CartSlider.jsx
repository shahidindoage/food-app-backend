"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";


export default function CartSlider() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleCart = () => setOpen(!open);

  const handleCheckout = () => {
    // Navigate to checkout page
    // Checkout page will fetch cart data from context
    router.push("/checkout");
    setOpen(false); // close cart slider
  };

  return (
    <>
      {/* Cart Button */}
      <button className="cart-btn" onClick={toggleCart}>
        🛒 Cart ({cart.length})
      </button>

      {/* Overlay */}
      <div
        className={`cart-overlay ${open ? "open" : ""}`}
        onClick={toggleCart}
      ></div>

      {/* Cart Drawer */}
      <div className={`cart-slider ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={toggleCart}>
            ×
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>
                  ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <p className="total">Total: ₹{total}</p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

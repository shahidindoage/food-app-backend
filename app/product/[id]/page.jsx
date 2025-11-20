"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "../../../contexts/CartContext"; // Ensure CartContext exists


export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      alert("Product added to cart!");
    }
  };

  if (loading) return <div className="loading-screen">Loading product...</div>;
  if (!product) return <div className="loading-screen">Product not found</div>;

  return (
    <div className="product-page">
      <button className="back-btn" onClick={() => router.push("/shop")}>
        ← Back to Shop
      </button>

      <div className="product-card1">
        <div className="product-image-container">
          <img src={product.image || "/placeholder.png"} alt={product.name} />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">
            {product.description ||
              "Delicious and fresh food prepared with care. Perfect for any meal."}
          </p>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

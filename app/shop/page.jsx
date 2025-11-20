"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { addToCart } = useCart();

  // Fetch all products initially
  useEffect(() => {
    async function loadProducts() {
      try {
        const url = location
          ? `/api/products/all?location=${encodeURIComponent(location)}`
          : "/api/products/all";

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [location]);

  // Fetch dynamic locations for dropdown
  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await fetch("/api/products/locations");
        const data = await res.json();
        setLocations(data.locations || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadLocations();
  }, []);

  // Filter products by current location
  const filterByCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village;

          if (city) {
            setLocation(city);
          } else {
            alert("Could not detect your city");
          }
        } catch (err) {
          console.error("Failed to detect location:", err);
          alert("Failed to detect your location");
        }
      },
      (err) => {
        console.warn("Geolocation error:", err);
        // alert("Permission denied or unable to get location");
      }
    );
  };

  if (loading) return <div className="loading-screen">Loading products...</div>;

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Explore Our Menu</h1>
        <p>Freshly prepared meals, just for you 🍴</p>

        {/* Filter by location dropdown */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded mt-4 mr-4"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Button to filter by current location */}
        <button
          onClick={filterByCurrentLocation}
          className="p-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700 transition"
        >
          Filter by My Location
        </button>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <div className="loading-screen">No products found for this location.</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <div
                className="product-image"
                onClick={() => router.push(`/product/${p.id}`)}
              >
                <img src={p.image || "/placeholder.png"} alt={p.name} />
                <span className="price-badge">₹{p.price}</span>
              </div>

              <div className="product-info">
                <h2>{p.name}</h2>
                <p>{p.description || "A delicious treat crafted with love."}</p>

                <div className="product-buttons">
                  <button
                    className="view-btn"
                    onClick={() => router.push(`/product/${p.id}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="add-btn"
                    onClick={() => addToCart({ ...p, quantity: 1 })}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

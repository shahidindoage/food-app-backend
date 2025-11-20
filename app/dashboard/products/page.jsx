"use client";

import React, { useState, useEffect } from "react";

export default function ProductsDashboard() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState(""); // NEW
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/all");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !location || !imageFile) {
      alert("Please fill all fields and select an image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("location", location);   // NEW
      formData.append("image", imageFile);

      const res = await fetch("/api/products/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setName("");
        setDescription("");
        setPrice("");
        setLocation("");
        setImageFile(null);
        fetchProducts();
        alert("Product added successfully");
      } else {
        alert(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Products Dashboard</h1>

      {/* Add Product Form */}
      <div style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />

        {/* NEW: Location Field */}
      {/* Location Field (text input) */}
<input
  type="text"
  placeholder="Enter product location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  style={styles.input}
/>


        <input type="file" onChange={handleFileChange} style={styles.input} />

        <button onClick={handleAddProduct} disabled={loading} style={styles.button}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>

      {/* Product List */}
      <h2>All Products</h2>
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {products.map((p) => (
          <li
            key={p.id}
            style={{
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              paddingBottom: 10,
            }}
          >
            <img
              src={p.image}
              width={60}
              height={60}
              alt={p.name}
              style={{ marginRight: 10, borderRadius: 6 }}
            />

            <div>
              <strong>{p.name}</strong> - ₹{p.price}
              <br />
              <small>{p.description}</small>
              <br />
              <span style={{ fontSize: 12, color: "green" }}>
                📍 {p.location || "No Location"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  input: {
    display: "block",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: 10,
    width: "100%",
    backgroundColor: "#0077b6",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

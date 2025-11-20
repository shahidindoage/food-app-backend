"use client";

import React, { useState, useEffect } from "react";

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal fields
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [adding, setAdding] = useState(false);

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

  const openModalForAdd = () => {
    setEditingProductId(null);
    setName("");
    setDescription("");
    setPrice("");
    setLocation("");
    setImageFile(null);
    setShowModal(true);
  };

  const openModalForEdit = (product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setLocation(product.location);
    setImageFile(null); // optional: keep current image unless changed
    setShowModal(true);
  };

  const handleSaveProduct = async () => {
    if (!name || !description || !price || !location || (!imageFile && !editingProductId)) {
      alert("Please fill all fields and select an image");
      return;
    }

    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("location", location);
      if (imageFile) formData.append("image", imageFile);

      let url = "/api/products/add";
      if (editingProductId) {
        url = "/api/products/edit";
        formData.append("id", editingProductId);
      }

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setShowModal(false);
        fetchProducts();
        alert(editingProductId ? "Product updated!" : "Product added!");
      } else {
        alert(data.error || "Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch("/api/products/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchProducts();
        alert("Product deleted!");
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div style={{ padding: 30, position: "relative", minHeight: "100vh", background: "#f6fbff" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Products</h1>

      {/* Products list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              padding: 15,
              borderRadius: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              position: "relative",
            }}
          >
            <img src={p.image} alt={p.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 6 }} />
            <h3 style={{ marginTop: 10 }}>{p.name}</h3>
            <p>₹{p.price}</p>
            <p style={{ fontSize: 12, color: "#555" }}>{p.description}</p>
            <p style={{ fontSize: 12, color: "green" }}>📍 {p.location || "No Location"}</p>

            {/* Edit/Delete Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <button onClick={() => openModalForEdit(p)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(p.id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Button */}
      <button onClick={openModalForAdd} style={styles.addButton}>+</button>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
              width: 400,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{editingProductId ? "Edit Product" : "Add Product"}</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={styles.input} />
            <input type="file" onChange={handleFileChange} style={styles.input} />
            <button onClick={handleSaveProduct} disabled={adding} style={styles.button}>
              {adding ? "Saving..." : editingProductId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  input: { display: "block", width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" },
  button: { padding: 10, width: "100%", backgroundColor: "#0077b6", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", marginTop: 10 },
  addButton: { position: "fixed", right: 30, bottom: 80, background: "#0077b6", color: "#fff", border: "none", borderRadius: "50%", width: 60, height: 60, fontSize: 30, cursor: "pointer" },
  editButton: { padding: 6, backgroundColor: "#ffd700", border: "none", borderRadius: 6, cursor: "pointer", flex: 1, marginRight: 5 },
  deleteButton: { padding: 6, backgroundColor: "#ff4d4d", border: "none", borderRadius: 6, cursor: "pointer", flex: 1 },
};

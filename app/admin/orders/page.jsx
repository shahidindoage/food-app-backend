"use client";

import React, { useState, useEffect } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/all");
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders)
  // Update order status
  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchOrders();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update order");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete order
  const handleDelete = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    setDeletingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/delete`, { method: "DELETE" });
      if (res.ok) {
        fetchOrders();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ padding: 30, background: "#f6fbff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0077b6", color: "#fff" }}>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ background: "#fff", borderBottom: "1px solid #ccc" }}>
                <td style={styles.td}>{order.id}</td>
                <td style={styles.td}>{order.customer?.name || "Unknown"}</td>
                <td style={styles.td}>
                  {order.items.map((item) => (
                    <div key={item.id}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td style={styles.td}>₹{order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)}</td>
                <td style={styles.td}>
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(order.id)}
                    disabled={deletingId === order.id}
                    style={styles.deleteButton}
                  >
                    {deletingId === order.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  th: {
    padding: "12px 8px",
    textAlign: "left",
  },
  td: {
    padding: "12px 8px",
    verticalAlign: "top",
  },
  deleteButton: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
};

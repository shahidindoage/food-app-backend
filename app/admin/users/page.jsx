"use client";

import React, { useState, useEffect } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/all");
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setDeletingId(userId);
    try {
      const res = await fetch(`/api/users/${userId}/delete`, { method: "DELETE" });
      if (res.ok) fetchUsers();
      else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ padding: 30, minHeight: "100vh", background: "#fff3e0", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, color: "#333" }}>Users</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
            <thead>
              <tr style={{ background: "#ff7043", color: "#fff" }}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Gender</th>
                <th style={styles.th}>DOB</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    background: "#fff",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.phone}</td>
                  <td style={styles.td}>{user.gender || "-"}</td>
                  <td style={styles.td}>{user.dob ? new Date(user.dob).toLocaleDateString() : "-"}</td>
                  <td style={styles.td}>{user.location || "-"}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingId === user.id}
                      style={styles.deleteButton}
                    >
                      {deletingId === user.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  th: {
    padding: "12px 10px",
    textAlign: "left",
    fontWeight: 600,
    fontSize: 14,
  },
  td: {
    padding: "12px 10px",
    verticalAlign: "top",
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  },
};

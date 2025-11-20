"use client";
import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          backgroundColor: "#0077b6",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: 20,
        }}
      >
        <h2 style={{ marginBottom: 30 }}>Admin</h2>
        <Link href="/admin/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link href="/admin/products" style={styles.link}>
          Products
        </Link>
        <Link href="/admin/orders" style={styles.link}>
          Orders
        </Link>
         <Link href="/admin/users" style={styles.link}>
          Users
        </Link>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 30, backgroundColor: "#f6fbff" }}>
        {children}
      </div>
    </div>
  );
}

const styles= {
  link: {
    color: "#fff",
    textDecoration: "none",
    marginBottom: 16,
    fontWeight: 600,
    fontSize: 16,
  },
};

"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <div style={{ padding: 30, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: 30, fontSize: 28, fontWeight: 700, color: "#333" }}>
        Admin Dashboard
      </h1>

      {/* Top Metrics Cards */}
      <div style={topCardsStyle}>
        <Card title="Total Users" value={analytics.totalUsers} color="#ff7043" />
        <Card title="Total Products" value={analytics.totalProducts} color="#00b894" />
        <Card title="Total Orders" value={analytics.totalOrders} color="#0984e3" />
        <Card title="Total Revenue" value={`₹${analytics.totalRevenue}`} color="#fd79a8" />
      </div>

      {/* Charts Grid */}
      <div style={chartsGridStyle}>
        <ChartCard title="Orders Last 7 Days">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.ordersPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#ff7043" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Trend (Last 30 Days)">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#00b894" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 Selling Products">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#fd79a8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// Metric Card Component
const Card = ({ title, value, color }) => (
  <div style={{ 
    background: "#fff", 
    borderRadius: 12, 
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", 
    padding: 20, 
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{
      height: 5,
      width: "100%",
      backgroundColor: color,
      position: "absolute",
      top: 0,
      left: 0,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    }} />
    <p style={{ fontWeight: 600, fontSize: 16, color: "#555", marginBottom: 10 }}>{title}</p>
    <span style={{ fontSize: 24, fontWeight: 700, color: "#333" }}>{value}</span>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children }) => (
  <div style={{
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: "#333" }}>{title}</h2>
    {children}
  </div>
);

// Styles
const topCardsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 20,
  marginBottom: 40,
};

const chartsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 30,
};

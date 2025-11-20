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
    <div style={{ padding: 30 }}>
      <h1 style={{ marginBottom: 30, fontSize: 28 }}>Admin Dashboard</h1>

      {/* Top Metrics Cards */}
      <div style={topCardsStyle}>
        <div style={cardStyle}>Total Users<br/><span style={cardValue}>{analytics.totalUsers}</span></div>
        <div style={cardStyle}>Total Products<br/><span style={cardValue}>{analytics.totalProducts}</span></div>
        <div style={cardStyle}>Total Orders<br/><span style={cardValue}>{analytics.totalOrders}</span></div>
        <div style={cardStyle}>Total Revenue<br/><span style={cardValue}>₹{analytics.totalRevenue}</span></div>
      </div>

      {/* Charts Grid */}
      <div style={chartsGridStyle}>
        {/* Orders Last 7 Days */}
        <div style={chartCardStyle}>
          <h2>Orders Last 7 Days</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.ordersPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#0077b6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend Last 30 Days */}
        <div style={chartCardStyle}>
          <h2>Revenue Trend (Last 30 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#00b894" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Selling Products */}
        <div style={chartCardStyle}>
          <h2>Top 5 Selling Products</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#fd79a8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Styles
const topCardsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 20,
  marginBottom: 40,
};

const cardStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  textAlign: "center",
  fontWeight: 600,
};

const cardValue = {
  fontSize: 24,
  fontWeight: 700,
  marginTop: 10,
  display: "block",
};

const chartsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 30,
};

const chartCardStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

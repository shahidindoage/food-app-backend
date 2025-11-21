"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        backgroundColor: "#fff3e0",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 350,
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20, color: "#ff7043" }}>
          🍽 Admin Login
        </h2>

        {error && (
          <p
            style={{
              color: "#d32f2f",
              background: "#ffe6e6",
              padding: 10,
              borderRadius: 6,
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            backgroundColor: "#ff7043",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16,
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "none",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.2s",
};

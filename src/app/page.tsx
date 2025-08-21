"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [diskSize, setDiskSize] = useState(50);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/server-request/api/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serverName: name,
          diskSize: diskSize
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log("Name:", name);
      console.log("Response:", data);
    } catch (err) {
      console.error("Error fetching /server-request/api/test:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Request a Server</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "250px",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column" }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
            style={{
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginTop: "0.5rem",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            alignSelf: "center",
            padding: "0.5rem 1.25rem",
            backgroundColor: "#222",     // dark gray button
            color: "#eee",               // light text
            border: "1px solid #444",    // subtle border
            borderRadius: "9999px",      // pill shape
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#ffffff4c")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#222")
          }
        >
          Request now
        </button>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [diskSize, setDiskSize] = useState(50);
  const [response, setResponse] = useState<string | null>(null);
  const [backendError, setbackendError] = useState<string | null>(null);
  const [backendStatus, setbackendStatus] = useState<number | null>(null);

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
          diskSize: diskSize,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.url); // store API response
      }
      else {
        setbackendError(res.statusText);
        setbackendStatus(res.status);
      }

    } catch (err) {
      console.error("Error fetching /server-request/api/trigger:", err);
      setbackendError(JSON.stringify(err));
    }
  };

  // if we already got a response, just show it
  if (response) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          padding: "1rem",
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          Approval pending in {response}
        </pre>
      </div>
    );
  }

  if (backendError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          padding: "1rem",
        }}
      >
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          Encountered error {backendStatus}: {backendError}
        </pre>
      </div>
    );
  }

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
        <label style={{ display: "flex", flexDirection: "column" }}>
          Disk Size (GB):
          <input
            type="number"
            value={diskSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDiskSize(Number(e.target.value))   // ensure it's stored as number
            }
            min={30}   // prevent negative or 0
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
            backgroundColor: "#222",
            color: "#eee",
            border: "1px solid #444",
            borderRadius: "9999px",
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

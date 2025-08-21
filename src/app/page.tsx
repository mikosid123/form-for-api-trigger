"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {

  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/server-request/api/test");
      const data = await res.json();
      console.log(name);
      console.log("Response:", data);
    } catch (err) {
      console.error("Error fetching /api/test:", err);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Request a server</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <div className={styles.ctas}>
            <button type="submit" className={styles.primary}>
              Request now
            </button>
          </div>
        </form>

        {/* <div className={styles.ctas}>
          <button
            className={styles.primary}
            onClick={handleClick}
          >
            Request now
          </button>
        </div> */}
      </main>
      <footer className={styles.footer}>
        <a
          href="mailto:someone@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/server-request/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Maintained by: Sid
        </a>
      </footer>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import "../styles/style.css";

export default function Home() {
  useEffect(() => {
    // Place your main.js logic here (adapted for React/Next.js)
  }, []);

  return (
    <>
      <header>
        <h1>Wu-Tang Name Generator</h1>
      </header>
      <main>
        <section className="generator">
          <div id="result" className="result"></div>
          <canvas
            id="wuCanvas"
            width="400"
            height="300"
            style={{ display: "none", marginTop: "1rem" }}
          ></canvas>
          <button id="mintBtn" style={{ display: "none" }}>
            Mint as NFT
          </button>
          <div id="mintStatus"></div>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
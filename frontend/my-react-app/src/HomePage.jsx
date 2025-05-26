import React, { useRef } from "react";
import './HomePage.css';
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png"; // ✅ Make sure logo is in src/assets/

function HomePage() {
  const navigate = useNavigate();
  const aboutRef = useRef(null); // 👈 Ref for the about section

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="LambdaBench Logo" style={{ width: 50, height: 50, marginRight: "1rem" }} />
          <h1 style={{ color: "#2c3e50", fontSize: "1.5rem" }}>Benchmark Your AWS Lambda Functions</h1>
        </div>
        <nav>
          <button
            style={{ ...buttonStyle, backgroundColor: "#27ae60", marginLeft: "1rem" }}
            onClick={scrollToAbout}
          >
            About
          </button>
        </nav>
      </header>

      <section style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2 style={{ fontSize: "2.5rem", color: "#34495e" }}>Welcome to LambdaBench</h2>
        <p style={{ fontSize: "1.2rem", color: "#7f8c8d", maxWidth: 600, margin: "1rem auto" }}>
          Measure cold start latency, compare runtimes & memory sizes, and optimize your serverless performance effortlessly.
        </p>
        <button
          style={{ ...buttonStyle, backgroundColor: "#2980b9", padding: "12px 30px", fontSize: "1rem" }}
          onClick={() => navigate("/get-started")}
        >
          Get Started Free
        </button>
      </section>

      <section ref={aboutRef} style={{ backgroundColor: "#ecf0f1", padding: "2rem", borderRadius: 8 }}>
        <div className="about-section">
          <div className="about-card">
            <h3>About LambdaBench</h3>
              <p>
  LambdaBench is your go-to toolkit for leveling up serverless performance. Built for developers, engineers, and tech teams who want real insights — not guesswork — LambdaBench lets you test, compare, and optimize AWS Lambda functions across runtimes and memory sizes.
  <br /><br />
  But that’s just the beginning. Our mission is to launch a fully open-source benchmarking framework that can automatically analyze and characterize workloads on AWS Lambda — so you can stop firefighting and start building smarter. Whether you're optimizing cold starts or choosing the best runtime, LambdaBench turns data into clarity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "1rem",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  backgroundColor: "#3498db",
  color: "#fff",
};

export default HomePage;

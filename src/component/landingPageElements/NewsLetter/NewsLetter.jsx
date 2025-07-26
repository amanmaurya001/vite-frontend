import axios from "axios";
import React, { useState } from "react";
import "./NewsLetter.css";
import { Link } from "react-router-dom";

const NewsLetter = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", color: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${backendUrl}/newsletter`, {
        requestedEmail: email.trim().toLowerCase(),
      })

      .then((res) => {
        setMessage({ text: res.data.message, color: "green" });
        setEmail(""); // clear input after success
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || "Something went wrong";
        setMessage({ text: errorMsg, color: "red" });
      });
  };
  return (
  <section className="subscribe-container">
        <h2>Always Be Estrella</h2>
        <p>
          Sign up for our newsletter to receive exclusive updates, new arrivals,
          and special offers straight to your inbox.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-newsletter" type="submit">Subscribe</button>
          {message.text && (
            <p style={{ color: message.color, marginTop: "10px" }}>
              {message.text}
            </p>
          )}
        </form>

        <p>Join our community and enjoy </p>
      </section>
  )
}

export default NewsLetter
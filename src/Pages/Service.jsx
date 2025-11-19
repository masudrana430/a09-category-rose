// src/Pages/Service.jsx  (or src/Components/Service.jsx)
import React, { useContext, useEffect, useState } from "react";
import Container from "../Components/Container"; // adjust path if needed
import { motion as Motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";

export default function Service() {
  const { user } = useContext(AuthContext) || {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }
  const [loading, setLoading] = useState(false);

  // Prefill from logged-in user when available
  useEffect(() => {
    if (user) {
      if (user.displayName) setName(user.displayName);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  const nameOk = name.trim().length >= 2;
  const formValid = nameOk && emailOk && !loading;

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValid) {
      setToast({ type: "error", message: "Please enter a valid name and email." });
      setTimeout(() => setToast(null), 2500);
      return;
    }

    // Prevent double submit
    setLoading(true);

    // Save a tiny record locally (no backend)
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push({
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Simulate quick processing
    setTimeout(() => {
      setToast({ type: "success", message: "Booking received! We’ll email you shortly." });
      // Clear fields unless they came from logged-in user
      setName(user?.displayName ?? "");
      setEmail(user?.email ?? "");
      setLoading(false);
      setTimeout(() => setToast(null), 2500);
    }, 600);
  }

  return (
    <Motion.section
      className="bg-slate-50 py-12 md:py-16"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Container>
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Book Service
          </h2>
          <p className="mt-2 text-slate-600">
            Fill in your details and we’ll confirm your winter care booking.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 bg-white p-6 rounded-2xl shadow border border-slate-100"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                className={`input input-bordered ${name && !nameOk ? "input-error" : ""}`}
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-invalid={name ? !nameOk : false}
              />
              {name && !nameOk && (
                <span className="mt-1 text-xs text-error">Name must be at least 2 characters.</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                className={`input input-bordered ${email && !emailOk ? "input-error" : ""}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={email ? !emailOk : false}
              />
              {email && !emailOk && (
                <span className="mt-1 text-xs text-error">Enter a valid email address.</span>
              )}
            </div>

            <Motion.button
              type="submit"
              whileHover={{ scale: formValid ? 1.03 : 1 }}
              whileTap={{ scale: formValid ? 0.98 : 1 }}
              className="btn border-0 rounded-full bg-[#FF8A3D] hover:bg-[#ff7a2e] text-white"
              disabled={!formValid}
            >
              {loading ? "Booking…" : "Book Now"}
            </Motion.button>
          </form>
        </div>
      </Container>

      {/* daisyUI toast */}
      {toast && (
        <div className="toast toast-top toast-end z-50" role="status" aria-live="polite">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </Motion.section>
  );
}

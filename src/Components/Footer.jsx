// src/components/Footer.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo3.svg fill.png";
import petImg1 from "../assets/shape1-55.png.png";
import petImg2 from "../assets/shape1-56.png.png";

import {
  MdOutlineMail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";

function GooglePlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.2 2.2c-.4.4-.6 1-.6 1.7v16.2c0 .7.2 1.3.6 1.7l9.3-9.8L3.2 2.2zM14.3 12.1l2.8-3-9.6-6 6.8 9zM14.5 12.5l-6.9 9 9.6-6-2.7-3zM20.8 10.6l-2.3-1.4-3 3.2 3 3.2 2.3-1.4c1.1-.7 1.1-2.8 0-3.6z" />
    </svg>
  );
}
function AppStoreIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.36 1.64a4.9 4.9 0 0 1-1.17 3.74A4.33 4.33 0 0 1 11.8 7a5.05 5.05 0 0 1 1.2-3.78 4.72 4.72 0 0 1 3.36-1.58zM21.6 17.38c-.6 1.38-.9 2-1.68 3.22-1.09 1.66-2.35 3.73-4.2 3.77-1.58 0-2-.98-4.18-.97-2.19 0-2.67.98-4.25.97-1.85-.04-3.27-2.26-4.36-3.92C1.2 18.2.12 15.1 1.3 12.7c.9-1.9 2.9-3.12 5-3.15 1.56-.03 3.02 1.06 3.97 1.06.95 0 2.72-1.31 4.58-1.12 0 0 2.55.22 3.76 2.2-3.29 2.01-2.77 6 1 6.69z" />
    </svg>
  );
}

export default function Footer() {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/groomers", label: "Our Groomers" },
    { to: "/book", label: "Book an Appointment" },
  ];


  const resources = [
    { to: "/articles", label: "Articles & Tips" },
    { to: "/preventative-care", label: "Preventative Care" }, 

    { to: "/blog", label: "Our Blog" },
    { to: "/investors", label: "Investors Relations" },
    { to: "/terms", label: "Term & Conditions" },
  ];

  const services = [
    
    { to: "/grooming", label: "Dog & Cat Grooming" },
    { to: "/bath", label: "Bath & Brush" },
    { to: "/haircuts", label: "Haircuts & Styling" },
    { to: "/nails", label: "Nail Trimming" },
    { to: "/ear", label: "Ear Cleaning" },
  ];

  return (
    <footer className="bg-[#FAF0DD]">
      {/* top grid */}
      <div className=" px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8">
          {/* Brand + contact */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              {/* replace with your logo */}
              <div className=" grid place-items-center text-xl">
                <Link to="/" className="pointer">
                  <img
                    className="inline-block mr-2 w-30 h-10"
                    to="/"
                    src={logo}
                    alt="Hero Logo"
                  />
                </Link>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-[#3b3b3b] max-w-md">
              Babet is a convenience services adaptability. We care about every
              pet; our clients provide all kinds of pet care.
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MdOutlineMail className="mt-0.5" />
                <a
                  href="mailto:infoemail23@domain.com"
                  className="link link-hover"
                >
                  infoemail23@domain.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlinePhone className="mt-0.5" />
                <a href="tel:+1-800-555-0100" className="link link-hover">
                  +1 (800) 555-0100
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlineLocationOn className="mt-0.5" />
                <span>789 Inner Lane, California, USA</span>
              </li>
              {/* CTAs */}
              <div className="mt-6 flex flex-wrap  gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border
                       border-slate-300/70 bg-white px-4 py-2 text-sm font-medium
                       hover:bg-slate-100 text-[#001931]"
                >
                  <GooglePlayIcon className="h-5 w-5" />
                  Google Play
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border
                       border-slate-300/70 bg-white px-4 py-2 text-sm font-medium
                       hover:bg-slate-100 text-[#001931]"
                >
                  <AppStoreIcon className="h-5 w-5" />
                  App Store
                </a>
              </div>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#2E2A1E] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="link link-hover">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-[#2E2A1E] mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              {resources.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="link link-hover">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-[#2E2A1E] mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((i) => (
                <li key={i.label}>
                  <Link to={i.to} className="link link-hover">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Shop on the Go + Newsletter */}
            
        
        </div>

        {/* Pets image strip (you add images) */}
        <div className="mt-8">
          <div className="flex items-end justify-between gap-4">
            {/* Replace the placeholders below with your pet images */}
            <div className="h-24 md:h-28">
              <img src={petImg1} alt="pet" className="h-full object-contain" />
            </div>
            {/* Newsletter */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-4 md:p-6 shadow border border-base-200">
                <div className="md:flex md:items-center md:justify-between gap-4">
                  <h5 className="font-semibold text-[#2E2A1E]">
                    Subscribe!{" "}
                    <span className="font-normal">
                      New subscribers get 20% off!
                    </span>
                  </h5>
                  <form
                    className="mt-3 md:mt-0 flex w-full md:w-auto"
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(
                        "Thanks for subscribing! (wire this to your backend)"
                      );
                    }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      className="input input-bordered rounded-r-none w-full md:w-80"
                    />
                    <button
                      type="submit"
                      className="btn rounded-l-none bg-[#F8D548] hover:bg-[#e9c635] border-0"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="h-24 md:h-28">
              <img src={petImg2} alt="pet" className="h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#3B2417] text-[#fff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © Copyright {new Date().getFullYear()}{" "}
            <span className="font-semibold">Babet</span>. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">We Are Accepting</span>
            {/* Simple payment badges; swap with real icons if you like */}
            <span className="px-2 py-1 rounded bg-white/10 text-xs">
              PayPal
            </span>
            <span className="px-2 py-1 rounded bg-white/10 text-xs">
              Mastercard
            </span>
            <span className="px-2 py-1 rounded bg-white/10 text-xs">VISA</span>
            <span className="px-2 py-1 rounded bg-white/10 text-xs">AmEx</span>
            <span className="px-2 py-1 rounded bg-white/10 text-xs">
              Maestro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

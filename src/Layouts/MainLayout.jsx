import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Container from "../Components/Container";
import useApps from "../hooks/useApps";
import LoadingSpinnerCopy from "../Components/LoadingSpinnercopy";

// AOS
import AOS from "aos";
// (keep the CSS import in src/main.jsx:  import "aos/dist/aos.css";)

const MainLayout = () => {
  const { loading } = useApps();
  const location = useLocation();

  // init once
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  // refresh on route change so new elements animate
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="sticky top-0 z-50 backdrop-blur bg-white border-b border-gray-200">
        <Container>
          <Navbar />
        </Container>
      </header>

      <main id="main" className="flex-1">
        {loading ? <LoadingSpinnerCopy /> : <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

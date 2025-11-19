import React, { useEffect, useMemo, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

import useApps from "../hooks/useApps";
import AppCard from "../Components/AppCard";
import Container from "../Components/Container";
import { FiSearch } from "react-icons/fi";

import appErrorImg from "../assets/App-Error.png";
import LoadingSpinnerCopy from "../Components/LoadingSpinnercopy";
import ErrorPage from "./ErrorPage";

// Framer Motion variants
const headingV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const listV = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemV = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const Apps = () => {
  const { apps = [], loading, error } = useApps();

  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsSearching(true);
    const id = setTimeout(() => {
      setTerm(search.trim().toLowerCase());
      setIsSearching(false);
    }, 350);
    return () => clearTimeout(id);
  }, [search]);

  const searchedApps = useMemo(() => {
    if (!term) return apps;
    return apps.filter((app) => {
      const title = (app.title ?? "").toLowerCase();
      const company = (app.companyName ?? "").toLowerCase();
      return title.includes(term) || company.includes(term);
    });
  }, [apps, term]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <LoadingSpinnerCopy />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-dvh">
        <ErrorPage />
      </div>
    );
  }

  return (
    <Container>
      <div>
        {/* Heading */}
        <Motion.div
          className="text-center pt-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingV}
        >
          <h2 className="text-[48px] font-bold text-[#001931]">Our All Services</h2>
          <p className="text-[#627382] font-normal text-[20px] mt-2">
            Explore All Services on the Market developed by us. We code for Millions
          </p>
        </Motion.div>

        {/* Filter and Search */}
        <div className="flex justify-between py-5 items-center">
          <span className="text-[#001931] font-semibold text-[24px]">
            ({searchedApps.length}) Services Found.
          </span>

          <label className="input input-bordered flex items-center gap-2 pr-10 relative">
            <FiSearch className="h-5 w-5 opacity-70" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="grow"
              placeholder="Search Services..."
            />
            {isSearching && (
              <span className="absolute right-3">
                <span className="loading loading-spinner loading-sm text-primary" />
              </span>
            )}
          </label>
        </div>

        {/* Results area with animated switching */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <Motion.div
              key="searching"
              className="flex justify-center py-16 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinnerCopy />
            </Motion.div>
          ) : searchedApps.length === 0 ? (
            <Motion.div
              key="empty"
              className="py-16 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-3 text-slate-600">
                <div className="flex flex-col items-center gap-3">
                  <img src={appErrorImg} alt="Service Not Found" className="mx-auto" />
                  <h2 className="text-[#001931] font-semibold text-[32px] md:text-[48px]">
                    Oops!! Service Not Found
                  </h2>
                  <p className="text-[#627382] font-normal text-[16px] md:text-[20px] max-w-2xl">
                    The service you are requesting is not found in our system. Please try another service.
                  </p>
                  {term && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="btn btn-xl text-white !bg-gradient-to-r !from-[#632EE3] !to-[#9F62F2] gap-2 hover:!bg-gradient-to-l"
                    >
                      Go Back!
                    </button>
                  )}
                </div>
              </div>
            </Motion.div>
          ) : (
            <Motion.div
              key="grid"
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={listV}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              {searchedApps.map((app) => (
                <Motion.div
                  key={app.id}
                  variants={itemV}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                >
                  <AppCard
                    app={app}
                    downloadIcon="assets/icon-downloads.png"
                    starIcon="assets/icon-ratings.png"
                  />
                </Motion.div>
              ))}
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default Apps;

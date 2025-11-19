import React, { useEffect, useState } from "react";
import Container from "../Components/Container";
import { FiChevronDown, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LoadingSpinner from "../Components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import useApps from "../hooks/useApps";

const MySwal = withReactContent(Swal);

const Installation = () => {
  const [installationList, setInstallationList] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("installation"));
    if (savedList) setInstallationList(savedList);
  }, []);

  const sortItems = () => {
    if (sortOrder === "downloads-asc") {
      return [...installationList].sort((a, b) => (a.downloads ?? 0) - (b.downloads ?? 0));
    } else if (sortOrder === "downloads-desc") {
      return [...installationList].sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));
    }
    return installationList;
  };

  const shortNum = (n) => {
    if (!n && n !== 0) return "0";
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
    return `${n}`;
  };

  // ---- NEW: helpers for price & total
  const getPrice = (item) => Number(item?.price ?? item?.size ?? 0);
  const totalPrice = sortItems().reduce((sum, item) => sum + getPrice(item), 0);
  // -----------------------------------

  const handleUninstall = (id) => {
    const existingList = JSON.parse(localStorage.getItem("installation")) || [];
    const updateList = existingList.filter((a) => a.id !== id);
    setInstallationList(updateList); // UI update
    localStorage.setItem("installation", JSON.stringify(updateList));
  };

  const handleUninstallAlert = () => {
    MySwal.fire({
      title: "App Uninstalled",
      icon: "success",
      draggable: true,
    });
  };

  const { loading, error } = useApps();
  if (loading)
    return (
      <Container>
        <div className="py-16 text-center">
          <LoadingSpinner />
        </div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div className="py-16 text-center text-error">
          <ErrorPage message={error.message} />
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="py-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#001931]">
            Your Purchased Services
          </h1>
          <p className="mt-2 text-sm md:text-base text-[#627382]">
            Explore All Trending Services on the Market developed by us
          </p>
        </div>

        {/* Count + Sort + Total */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm md:text-base font-semibold text-[#001931]">
            {installationList.length} Services Found
          </span>

          <div className="flex items-center gap-4">
            {/* ---- NEW: Total Price pill ---- */}
            <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-sm font-semibold text-[#001931]">
                Total:&nbsp;
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </span>
            </div>
            {/* -------------------------------- */}

            <div className="relative">
              <select
                className="select select-sm pr-8 select-bordered"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="none">Sort By perceived Value</option>
                <option value="downloads-desc">(High→Low)</option>
                <option value="downloads-asc">(Low→High)</option>
              </select>
              <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="mt-4 space-y-3">
          {sortItems().map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
            >
              {/* Left: thumbnail + title + meta */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-12 w-12 rounded-md bg-slate-100 overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900">
                    {app.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-4 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <FiShoppingCart className="h-4 w-4" />
                      {shortNum(app.downloads ?? 0)}.
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-600">
                      <FaStar className="h-3.5 w-3.5" />
                      {Number(app.ratingAvg ?? 0).toFixed(1)}
                    </span>
                    <span className="text-slate-500">${getPrice(app).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Right: uninstall */}
              <button
                onClick={() => {
                  handleUninstall(app.id);
                  handleUninstallAlert();
                }}
                className="btn btn-success btn-sm text-white"
              >
                Cut Off
              </button>
            </div>
          ))}

          {/* Empty state */}
          {installationList.length === 0 && (
            <div className="py-16 text-center text-slate-500">
              You haven’t purchased any services yet.
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Installation;

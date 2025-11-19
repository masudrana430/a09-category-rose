import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import useApps from "../hooks/useApps";
import Container from "../Components/Container";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


import { FiDownload, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import LoadingSpinner from "../Components/LoadingSpinner";

import ErrorPage from "./ErrorPage";
import Service from "./Service";


const shortNum = (n) => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return `${n ?? 0}`;
};

// pretty toast body
const InstallToast = ({ title, type }) => (
  <div className="flex items-start gap-2">
    <span
      className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${
        type === "success" ? "bg-emerald-500" : "bg-amber-500"
      } text-white text-xs`}
    >
      ✓
    </span>
    <div className="text-sm leading-5">
      {type === "success" ? (
        <>
          <span className="font-semibold">Yahoo ⚡!! </span>
          <span className="font-medium">{title}</span> perceived Successfully
        </>
      ) : (
        <>
          <span className="font-semibold">Already perceived: </span>
          <span className="font-medium">{title}</span>
        </>
      )}
    </div>
  </div>
);

const AppDetails = () => {
  const { id } = useParams();

  const { apps = [], loading, error } = useApps();

  const app = apps.find((a) => String(a.id) === id);

  const [installed, setInstalled] = useState(false);

  
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("installation")) || [];
      const exists = saved.some((a) => String(a.id) === String(id));
      setInstalled(exists);
    } catch {
      setInstalled(false);
    }
  }, [id]);

  const safeRatings = app?.ratings ?? [];
  const chartData = useMemo(() => {
    const byName = Object.fromEntries(safeRatings.map((r) => [r.name, r.count]));

    const order = ["5 star", "4 star", "3 star", "2 star", "1 star"];
    return order.map((name) => ({ name, count: byName[name] ?? 0 }));
  }, [safeRatings]);

  if (loading) {
    return (
      <Container>
        <div className="py-16 text-center">
          <LoadingSpinner />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="py-16 text-center text-error">
          <ErrorPage message={error.message} />
        </div>
      </Container>
    );
  }

  if (!app) {
    return (
      <Container>
        <div className="py-16 text-center">No service found with ID: {id}</div>
      </Container>
    );
  }

  const {
    companyName,
    ratingAvg,
    image,
    title,
    description,

    downloads = 0,
    reviews = 0,
    size = 0,
  } = app;

  const handleInstallClick = () => {



    if (installed) {
      toast.info(<InstallToast title={title} type="info" />, {
        icon:  false ,
        autoClose:  2500 ,
      });
      return;
    }


    let list = [];
    try {
      list = JSON.parse(localStorage.getItem("installation")) || [];
    } catch {
      list = [];
    }

    // avoid duplicates (race safety)
    if (!list.some((a) => String(a.id) === String(app.id))) {
      localStorage.setItem("installation", JSON.stringify([...list, app]));
    }
    setInstalled(true);

    // success toast
    toast.success(<InstallToast title={title} type="success" />, {
      icon: false,
      autoClose: 2500,
      progressStyle: { background: "#22c55e" }, // emerald-500
      className: "rounded-md shadow border border-emerald-100",
    });
  };

  return (
    <Container>
      <section className="py-8">
        {/* Top: image + app info */}
        <div className="flex items-center gap-6 md:gap-10 lg:gap-16 flex-col md:flex-row">
          {/* Left image tile */}
          <div className="flex items-center justify-center rounded-lg bg-base-200/60 p-6">
            <img src={image} alt={title} className="h-100 w-100  object-contain" />
          </div>

          {/* Right content */}
          <div>
            <div className="pb-3 border-b border-base-200">
              <h1 className="text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[#001931]">
                {title}
              </h1>
              <p className="mt-1 text-sm text-base-content/60">
                Developed by{" "}
                <span className="font-medium text-primary hover:underline">
                  {companyName}
                </span>
              </p>
            </div>

            {/* Metrics + Install */}
            <div className="pt-4 flex flex-wrap items-end gap-8">
              <div className="flex flex-col items-start">
                <FiShoppingCart className="h-5 w-5 text-success mb-1" />
                <span className="text-[11px] uppercase tracking-wide text-slate-500">
                  Purchases
                </span>
                <span className="mt-1 text-2xl font-bold text-slate-900">
                  {shortNum(downloads)}
                </span>
              </div>

              <div className="flex flex-col items-start">
                <FaStar className="h-5 w-5 text-warning mb-1" />
                <span className="text-[11px] uppercase tracking-wide text-slate-500">
                  Average Ratings
                </span>
                <span className="mt-1 text-2xl font-bold text-slate-900">
                  {Number(ratingAvg ?? 0).toFixed(1)}
                </span>
              </div>

              <div className="flex flex-col items-start">
                <MdRateReview className="h-5 w-5 text-info mb-1" />
                <span className="text-[11px] uppercase tracking-wide text-slate-500">
                  Total Reviews
                </span>
                <span className="mt-1 text-2xl font-bold text-slate-900">
                  {shortNum(reviews)}
                </span>
              </div>

              {/* Install button */}
              <button
                onClick={handleInstallClick}
                disabled={installed}
                className={`btn btn-success btn-sm md:btn-md mt-2 ${
                  installed ? "btn-disabled" : ""
                }`}
              >
                {installed ? "Already Bought" : `Buy Now (${size} $)`}
              </button>
            </div>
          </div>
        </div>

        <div className="divider my-8" />

        {/* Ratings chart */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Ratings</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis type="number" tickFormatter={(v) => shortNum(v)} />
                <YAxis type="category" dataKey="name" width={40} />
                <Tooltip formatter={(val) => [val.toLocaleString(), "Reviews"]} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} fill="#FF8A00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="divider my-8" />



        {/* Description */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Description</h3>
          <div className="prose max-w-none prose-slate">
            <p className="text-sm leading-7 text-slate-600">
              {description ||
                "No description available for this app."}
            </p>
          </div>
        </div>

        <Service  />
      </section>





      <ToastContainer position="top-right" newestOnTop theme="light" />
    </Container>
  );
};

export default AppDetails;

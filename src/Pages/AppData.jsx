import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

import AppCard from "../Components/AppCard";
import useApps from "../hooks/useApps";
import LoadingSpinnerHome from "../Components/LoadingSpinnerHome";
import ErrorPage from "./ErrorPage";




// Framer Motion variants
const container = {
  hidden: { opacity: 0 },

  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {

    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};



const AppData = () => {
  const { apps, loading, error } = useApps();
  if (loading) return <LoadingSpinnerHome />;
  if (error)   return <ErrorPage />;

  const featureApps = apps.slice(0, 8);



  return (
    <div>


      {/* Heading (scroll reveal) */}
      <Motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >


        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700">
          ❄️ Popular Winter Care Services
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-slate-900">
          Keep Them Warm, Safe & Happy
        </h2>

        <p className="mt-3 text-slate-600">

          Book trusted winter services: grooming, coat fittings, safe walks, and more.
        </p>
      </Motion.div>



      {/* Grid (staggered reveal on scroll) */}
      <Motion.div
        className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {featureApps.map((app) => (
          <Motion.div key={app.id} variants={item}>
            <AppCard
              app={app}
              downloadIcon="assets/icon-downloads.png"
              starIcon="assets/icon-ratings.png"
            />
          </Motion.div>

        ))}

      </Motion.div>


      {/* Show All (hover/tap animation) */}
      <div className="mt-8 text-center mb-10">
        <Motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/apps"
            className="btn btn-primary ml-2 text-black !bg-[#E6D445] gap-2 hover:!bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-white/focus:ring-offset-2 focus:ring-offset-yellow-400"
          >
            Show All
          </Link>
        </Motion.div>


      </div>
    </div>
  );
};

export default AppData;

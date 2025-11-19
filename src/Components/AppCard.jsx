import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

// average rating from either item.ratingAvg or item.ratings[]
function getRatingAvg(item) {
  if (typeof item?.ratingAvg === "number") return item.ratingAvg;
  if (Array.isArray(item?.ratings)) {
    let total = 0;
    let sum = 0;
    for (const r of item.ratings) {
      const stars = parseInt(String(r.name), 10); // "1 star" -> 1
      if (!isNaN(stars)) {
        total += r.count || 0;
        sum += stars * (r.count || 0);
      }
    }
    return total ? +(sum / total).toFixed(2) : 0;
  }
  return 0;
}

// show price (fallbacks if not provided)
function getPriceLabel(item) {
  if (typeof item?.price === "number") return `$${item.price.toFixed(2)}`;
  if (typeof item?.size === "number") return `$${item.size.toFixed(2)}`; // optional fallback
  return "Price varies";
}

const AppCard = ({ app = {}, onView }) => {
  if (!app) return null;

  const { id, image, title } = app;
  const rating = getRatingAvg(app);
  const priceLabel = getPriceLabel(app);

  return (
    <article className="relative rounded-[28px] overflow-hidden shadow-sm border border-slate-100 bg-white group">
      {/* Image */}
      <div className="relative h-64">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400">
            (image)
          </div>
        )}
        {/* Dark gradient for text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content overlay (bottom-left) */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-lg font-extrabold drop-shadow-sm">{title}</h3>

        {/* Meta row: rating + price */}
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-amber-300">
            <FaStar className="h-4 w-4" />
            <span className="font-semibold">{rating.toFixed(2)}</span>
          </div>
          <div className="text-sm font-medium bg-white/15 backdrop-blur px-2 py-1 rounded-full">
            {priceLabel}
          </div>
        </div>

        {/* CTA */}
        {onView ? (
          <button
            onClick={() => onView(id)}
            className="mt-3 btn btn-sm border-0 rounded-full bg-[#FF8A3D] hover:bg-[#ff7a2e] text-white"
          >
            View Details
          </button>
        ) : (
          <Link
            to={`/app/${id}`}
            className="mt-3 inline-flex btn btn-sm border-0 rounded-full bg-[#FF8A3D] hover:bg-[#ff7a2e] text-white"
            aria-label={`View details for ${title}`}
          >
            View Details
          </Link>
        )}
      </div>

      {/* Decorative “notches” (optional) */}
      <span className="pointer-events-none absolute -right-3 top-6 w-7 h-7 bg-white rounded-full" />
      <span className="pointer-events-none absolute -right-3 bottom-6 w-7 h-7 bg-white rounded-full" />

      {/* <Link
          to={`/app/${id}`}
          className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer btn"
          aria-label={`View details for ${title}`}
        >
          <span className=" sr-only">View Details</span>
        </Link> */}
    </article>
  );
};

export default AppCard;

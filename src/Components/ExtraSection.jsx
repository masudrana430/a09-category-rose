import React from "react";
import Container from "./Container";



import iconPops from "../assets/shape1-30.png.png";// <- rename file to .png if needed
import iconPops2 from "../assets/Background.png";
import iconPops3 from "../assets/Background (1).png";
import iconPops4 from "../assets/Background (2).png";
import iconPops5 from "../assets/feature icon1 4.png";




const defaultItems = [
  {
    icon: iconPops2,
    title: "Play & Socialization",
    desc: "Nurture playful time with vetted, safe social circles.",
    bullets: [
      "Strategy, development & growth",
      "Market research & competitors",
      "Risk management",
    ],
  },
  {
    title: "Feeding & Special Care",
    desc: "Tailored nutrition plans for every age and breed.",
    bullets: [
      "Strategy, development & growth",
      "Market research & competitors",
      "Risk management",
    ],
    icon: iconPops3,
  },
  {
    title: "Behavior Support",
    desc: "Build confidence with gentle, science-based training.",
    bullets: [
      "Strategy, development & growth",
      "Market research & competitors",
      "Risk management",
    ],
    icon: iconPops4,
  },
  {
    title: "Pet Communication",
    desc: "Daily updates and notes so you’re always in the loop.",
    bullets: [
      "Strategy, development & growth",
      "Market research & competitors",
      "Risk management",
    ],
    icon: iconPops5,
  },
];


export default function ExtraSection({ items = defaultItems, onBook }) {
  return (
    <section
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-delay="200"
      className="relative bg-[#FFF8F3] py-12 md:py-16"
    >
      {/* subtle paw doodles */}
      <div className="pointer-events-none absolute right-6 top-6 select-none">
        <img src={iconPops} alt="" className="w-12 h-12 opacity-60" />
      </div>
      <div className="pointer-events-none absolute left-10 top-16 select-none">
        <img src={iconPops} alt="" className="w-10 h-10 opacity-60" />
      </div>

      <Container>
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-xs font-semibold text-orange-500">
            Our Features
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-slate-900">
            Get The Massive Facilities
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* top area with icon */}
              <div className="px-5 pt-5">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 grid place-items-center">
                  {typeof item.icon === "string" ? (
                    <img
                      src={item.icon}
                      alt=""
                      className="w-7 h-7 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    item.icon || (
                      <span className="text-orange-400 text-lg">★</span>
                    )
                  )}
                </div>

                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </div>

              {/* checklist */}
              <div className="mt-4 px-5 pb-5">
                <ul className="space-y-2 text-sm text-slate-700">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block w-4 h-4 rounded-full bg-orange-100 border border-orange-200" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onBook?.(item.title)}
                  className="mt-4 w-full btn border-0 rounded-xl bg-[#FF8A3D] hover:bg-[#ff7a2e] text-white"
                >
                  Book Now
                </button>
              </div>


              {/* soft bottom curve like your reference */}
              <div className="h-6 w-full bg-orange-50" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

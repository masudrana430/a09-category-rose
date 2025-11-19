import React from "react";
import Container from "./Container";
import { motion as Motion } from "framer-motion"; 



// Variants
const headingV = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};



const gridV = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};



const cardV = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};






const LoyalHearts = ({
  items = [

    {
      id: 1,
      title: "Relax Bath & Full Grooming",
      price: 35.0,
      description:
        "Grooming service for a small dog include bathing, ear cleaning and grooming",
      img: "",
    },
    {
      id: 2,
      title: "Body Massage & Hair Style",
      price: 55.0,
      description:
        "Grooming service for a small dog include bathing, ear cleaning and grooming",
      img: "",
    },
    {
      id: 3,
      title: "Spa & Nail Cutting",
      price: 65.99,
      description:
        "Spa & Nail Cutting service for a small pet include bathing, ear cleaning and grooming.",
      img: "",
    },
  ],
  onEnquire = (id) => alert(`Enquire service #${id}`),

}) => {
  const [hero, card2, card3] = items;

  return (
    <Motion.section
      className="relative bg-[#F7F2EC] py-12 md:py-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >


      <Container>
        {/* Heading */}


        <Motion.div
          className="text-center max-w-2xl mx-auto"
          variants={headingV}
        >


          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-orange-100 text-sm font-semibold text-orange-500">
            <span>🐾</span> Testimonials
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-slate-900">
            Loyal Hearts, Forever Homes.
          </h2>
          <p className="mt-3 text-slate-600">
            Read the heartwarming stories of those who gave a second chance to
            animals in need.
          </p>
        </Motion.div>



        {/* Grid */}
        <Motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={gridV}
        >



          {/* Left: big card */}
          <Motion.article
            variants={cardV}
            whileHover={{ y: -4, scale: 1.02, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
          >
            {hero?.img ? (
              <img src={hero.img} alt="" className="w-full h-56 md:h-64 object-cover" />
            ) : (
              <div className="w-full h-56 md:h-64 grid place-items-center text-slate-400">
                (add image)
              </div>
            )}
            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-extrabold text-slate-900">
                {hero?.title}
              </h3>
              <p className="mt-1 font-semibold text-slate-800">From ${hero?.price}</p>
              <p className="mt-1 text-sm text-slate-600">{hero?.description}</p>






              <Motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEnquire(hero?.id)}
                className="mt-4 btn rounded-full px-6 bg-[#FF8A3D] hover:bg-[#ff7a2e] border-0 text-white"
              >
                Enquire Now
              </Motion.button>
            </div>
          </Motion.article>

          {/* Right: two small horizontal cards */}
          <div className="grid grid-rows-2 gap-6">
            {[card2, card3].map(
              (s) =>
                s && (
                  <Motion.article
                    key={s.id}
                    variants={cardV}
                    whileHover={{ y: -3, scale: 1.01, boxShadow: "0 10px 24px rgba(0,0,0,0.06)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-5 flex items-center gap-4"
                  >
                    <div className="shrink-0">
                      {s.img ? (
                        <img src={s.img} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-slate-100 grid place-items-center text-xs text-slate-400">
                          {/* ( image) */}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-slate-900 truncate">{s.title}</h4>
                      <p className="text-sm font-medium text-slate-800">From ${s.price}</p>
                      <p className="text-xs text-slate-600">{s.description}</p>
                    </div>



                    <Motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onEnquire(s.id)}
                      className="btn rounded-full bg-[#FF8A3D] hover:bg-[#ff7a2e] border-0 text-white whitespace-nowrap"
                    >
                      Enquire Now
                    </Motion.button>
                  </Motion.article>
                )

            )}
          </div>
        </Motion.div>
      </Container>




      {/* Floating doodles */}
      <Motion.div
        className="pointer-events-none absolute left-4 top-8 text-slate-300/40 text-5xl select-none"
        animate={{ y: [0, -6, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        🍲
      </Motion.div>

      
      <Motion.div
        className="pointer-events-none absolute right-6 top-14 text-slate-300/40 text-5xl select-none"
        animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      >
        🦴
      </Motion.div>
    </Motion.section>
  );
};

export default LoyalHearts;

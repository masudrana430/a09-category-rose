import React from "react";
import { FaStar, FaMapMarkerAlt, FaStethoscope, FaAward } from "react-icons/fa";
import Container from "./Container";
import { motion as Motion } from "framer-motion";

// Framer variants
const headingV = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const photoV = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const chipV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// Default experts data

const defaultExperts = [
  {
    id: 1,
    name: "Dr. Aisha Rahman",
    degree: "DVM, MVSc (Dermatology)",
    experienceYears: 9,
    location: "Dhaka",
    rating: 4.9,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIpwQdJhjACCCVR8zyt6Q0Y4pIYFtIIuBLA&s",
    specialties: ["Canine Dermatology", "Allergy Care", "Winter Skin"],
  },

  {
    id: 2,
    name: "Dr. Neil Carter",
    degree: "DVM (Emergency & Critical Care)",
    experienceYears: 7,
    location: "Chittagong",
    rating: 4.8,
    photo:
      "https://vetic-img.s3.ap-south-1.amazonaws.com/website/Website-Astro/consultation_page/Hero+image+mobile+consultation.webp",
    specialties: ["Emergency Care", "Hypothermia", "First Aid"],
  },
  {
    id: 3,
    name: "Dr. Maya Sultana",
    degree: "DVM, MS (Internal Medicine)",
    experienceYears: 11,
    location: "Sylhet",
    rating: 4.9,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBdTnPbnpzLSSZ36bJasplj43qWVl3GdlnOwIvPpxmq6I9i9_0mqs5ouC7wqeyatKrDLA&usqp=CAU",
    specialties: ["Respiratory", "Senior Pets", "Nutrition"],
  },
  {
    id: 4,
    name: "Dr. Tanvir Ahmed",
    degree: "DVM (Exotics)",
    experienceYears: 6,
    location: "Rajshahi",
    rating: 4.7,
    photo:
      "https://media.licdn.com/dms/image/v2/D4D03AQHQIDJXquzvgg/profile-displayphoto-shrink_200_200/B4DZQshHZlGkAY-/0/1735913667265?e=2147483647&v=beta&t=RaMY30yIOpfKJaD9oX2K-yJTrg_gR3HoU43wxpJlmks",
    specialties: ["Cats & Exotics", "Paw Care", "Cold Safety"],
  },
];

export default function ExpertVets({
  experts = defaultExperts,
  onBook = (id) => alert(`Book appointment with vet #${id}`),
  onView = (id) => alert(`View profile of vet #${id}`),
}) {
  return (
    <Motion.section
      className="bg-slate-50 py-12 md:py-16"
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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-semibold text-slate-700">
            <FaStethoscope /> Meet Our Expert Vets
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-slate-900">
            Compassionate Care, Winter-Ready.
          </h2>
          <p className="mt-3 text-slate-600">
            Trusted veterinarians specializing in cold-weather health, paw
            protection, and seasonal wellness for your pets.
          </p>
        </Motion.div>

        {/* Cards */}
        <Motion.div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={gridV}
        >
          {experts.slice(0, 4).map((v) => (
            <Motion.article
              key={v.id}
              variants={cardV}
              whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="card bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden"
            >
              {/* Photo (pops in) */}
              <div className="relative h-40 bg-gradient-to-br from-[#E5F3FA] to-[#FFF1D9]">
                {v.photo ? (
                  <Motion.img
                    variants={photoV}
                    src={v.photo}
                    alt={`${v.name} — ${v.degree}`}
                    className="absolute inset-x-0 bottom-0 mx-auto h-40 w-40 object-cover rounded-full translate-y-1/3 border-4 border-white shadow"
                  />
                ) : (
                  <Motion.div
                    variants={photoV}
                    className="absolute inset-x-0 bottom-0 mx-auto h-40 w-40 rounded-full translate-y-1/3 border-4 border-white shadow grid place-items-center bg-slate-100 text-slate-400"
                  >
                    (add photo)
                  </Motion.div>
                )}
              </div>

              {/* Body */}
              <div className="card-body pt-16">
                <h3 className="card-title text-lg font-extrabold text-slate-900">
                  {v.name}
                </h3>
                <p className="text-sm text-slate-700">{v.degree}</p>

                {/* Meta */}
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
                    <FaStar className="h-4 w-4" />
                    {v.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <FaAward className="h-4 w-4" /> {v.experienceYears} yrs
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <FaMapMarkerAlt className="h-4 w-4" /> {v.location}
                  </span>
                </div>

                {/* Specialties (mini stagger) */}
                <Motion.div
                  className="mt-3 flex flex-wrap gap-2"
                  variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {v.specialties.map((t) => (
                    <Motion.span
                      key={t}
                      variants={chipV}
                      className="badge badge-ghost border-slate-200 text-slate-700"
                    >
                      {t}
                    </Motion.span>
                  ))}
                </Motion.div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onView(v.id)}
                    className="btn btn-ghost border-slate-200"
                  >
                    View Profile
                  </Motion.button>
                  <Motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onBook(v.id)}
                    className="btn border-0 rounded-full bg-[#FF8A3D] hover:bg-[#ff7a2e] text-white"
                  >
                    Book Now
                  </Motion.button>
                </div>
              </div>
            </Motion.article>
          ))}
        </Motion.div>
      </Container>
    </Motion.section>
  );
}

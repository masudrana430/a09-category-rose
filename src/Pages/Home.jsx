import React from 'react';
import Banner from '../Components/Banner/Banner';
import AppData from './AppData';
import Container from '../Components/Container';
import WinterHeroSwiper from '../Components/WinterHeroSwiper';




// If your images are in src/assets, import them like this:
import hero1 from "../assets/Screenshot 2025-10-22 140335-Photoroom.png";     // replace with your own images
import hero2 from "../assets/Image-Photoroom.png";
import hero3 from "../assets/shape1-58.png.png";


// import your images (or use public/ paths)
import big from "../assets/Relaxe Bath & Full Grooming.png";
import small1 from "../assets/Body Massage & Hair Style.png";
import small2 from "../assets/Spa & Nail Cutting.png";

import LoyalHearts from '../Components/LoyalHearts';
import ExpertVets from '../Components/ExpertVets';
import ExtraSection from '../Components/ExtraSection';

const Home = () => {
    const slides = [
    {
      title: "Cozy Coats for Cold Days",
      subtitle: "Fleece-lined jackets and booties to keep tails wagging.",
      img: hero1,              
      cta: "Shop Now",
      to: "/apps",
      badge: "Winter Care",
    },
    {
      title: "Hydrating Winter Grooming",
      subtitle: "Moisturizing baths & paw balm for dry winter air.",
      img: hero2,              
      cta: "Book Grooming",
      to: "/apps",
      badge: "Grooming",
    },
    {
      title: "Warm Walks, Safe Paws",
      subtitle: "Insulated jackets, booties & ice-safe routes.",
      img: hero3,              
      cta: "Find Services",
      to: "/apps",
      badge: "Outdoor",
    },
  ];



  const items = [
    { id: 1, title: "Relax Bath & Full Grooming", price: 35.0, description: "Grooming service for a small dog include bathing, ear cleaning and grooming", img: big },
    { id: 2, title: "Body Massage & Hair Style", price: 55.0, description: "Grooming service for a small dog include bathing, ear cleaning and grooming", img: small1 },
    { id: 3, title: "Spa & Nail Cutting", price: 65.99, description: "Spa & Menicure service for a small pet include bathing, ear cleaning and grooming.", img: small2 },
  ];


    return (
        <div>
            {/* <Banner /> */}
            
            <Container>
              <WinterHeroSwiper slides={slides} />
                <AppData />
                <LoyalHearts items={items} onEnquire={(id) => console.log("enquire:", id)} />
                  <ExpertVets />
                  <ExtraSection />
            </Container>
        </div>
    );
};

export default Home;


"use client";
import { SectionProps } from '@/types/SectionProps'
import React, { useEffect } from 'react'
import "aos/dist/aos.css";
import Image from 'next/image';
import aboutimage from "../../assets/restaurtant.jpg";


const AboutSection = ({ className }: SectionProps) => {

  useEffect(() => {
    const AOS = require("aos"); // Dynamically require AOS
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <section id="about" className={`${className} overflow-hidden`}>
      <div className='flex flex-col lg:flex-row'>
        <div className="w-full lg:w-1/2 h-64 lg:h-auto" data-aos="fade-up">
             <Image
             src={aboutimage}
             alt="Restaurant"
             layout="fill"
             objectFit="cover" 
             priority 
           />
        </div>
        <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-24">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 " data-aos="fade-down">Welcome to <span className="text-primary">Moga Meat Bar & Grill</span></h1>
          <div className='text-gray-300 space-y-4' data-aos="fade-down">
            <p>
             Looking for the best Indian food in London, Ontario? Moga Meat
             Bar and Grill offers authentic Indian BBQ, juicy grilled meats, 
             and flavorful curries. Try our butter chicken, chicken tikka, biryani, 
             and tandoori specialties—freshly prepared with bold Indian spices. 
             Whether you prefer dine-in, takeout, or delivery, we bring the taste 
             of India straight to your table. Enjoy mouthwatering kebabs,
              rich vegetarian dishes, and classic Indian
             appetizers. Visit us today or order online for the best Indian cuisine near you!
           
            </p>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection


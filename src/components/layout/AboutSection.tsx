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
              Welcome to Moga Meat Bar and Grill, your go-to spot 
              for authentic and healthy Indian cuisine in London, Ontario.
              Since opening in September 2022, we've been passionate about
              delivering bold flavors and unforgettable dining experiences.
            </p>
            <p>
              Specializing in perfectly spiced meats and classic Indian dishes, 
              we take pride in using the freshest ingredients and traditional 
              cooking techniques. Whether you're dining in or taking out, our 
              menu offers something for everyone.
            </p>
            <p>
              At Moga Meat Bar and Grill, we don't just serve 
              food—we share a piece of India's rich culinary heritage.
              Come and experience the difference today!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection


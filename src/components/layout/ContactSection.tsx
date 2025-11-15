'use client'
import { SectionProps } from "@/types/SectionProps";
import Map from "../common/Map";
import ContactUsForm from "../common/form/ContactUsForm";
import { useEffect } from "react";

const ContactSection = ({ className }: SectionProps) => {
  useEffect(() => {
    const AOS = require("aos"); 
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out", 
    });
  }, []);
  return (
    <section id="contact" className={`${className} overflow-hidden`}>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-6 ">
        {/* Map Section */}
        <div className="flex flex-col justify-center items-center gap-5 p-4 sm:p-6 lg:p-8">
          <div className="w-full h-[300px] sm:h-[400px] lg:h-full" data-aos="fade-right">
            <Map />
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div className="container pb-10 sm:pb-12 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4" data-aos="fade-up">Contact Us</h1>
            <p className="text-gray-400 text-sm sm:text-base" data-aos="fade-right">We&apos;d love to talk about how we can help you.</p>
          </div>
          <ContactUsForm />
        </div>
      </div>
    </section>
  )
}

export default ContactSection;

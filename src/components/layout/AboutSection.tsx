import { SectionProps } from '@/types/SectionProps'
import React from 'react'

const AboutSection = ({className}:SectionProps) => {
  return (
    <section id="about" className={className}>
      <div className='grid grid-cols-2'>
        <div className="bg-[url('/assets/about.jpg')] bg-center bg-no-repeat bg-cover"></div>
        <div className="p-24">
          <h1 className="mb-4">Welcome to <span className=" text-primary">Moga Meat Bar & Grill</span></h1>
          <div className='text-gray-300'>
            <p className='mb-4'>
            Welcome to Moga Meat Bar and Grill, your go-to spot 
            for authentic and healthy Indian cuisine in London, Ontario.
             Since opening in September 2022, we’ve been passionate about
              delivering bold flavors and unforgettable dining experiences.
            </p>
            <p>
            Specializing in perfectly spiced meats and classic Indian dishes, 
            we take pride in using the freshest ingredients and traditional 
            cooking techniques. Whether you're dining in or taking out, our 
            menu offers something for everyone.
            </p>
            <p>
             At Moga Meat Bar and Grill, we don’t just serve 
              food—we share a piece of India’s rich culinary heritage.
             Come and experience the difference today!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
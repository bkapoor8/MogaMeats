'use client'
import { DietFoodIcon } from '@/icons/DietFoodIcon'
import { PizzaIcon } from '@/icons/PizzaIcon'
import { ScooterIcon } from '@/icons/ScooterIcon'
import { SectionProps } from '@/types/SectionProps'
import { motion } from "framer-motion"

const ServicesSection = ({className}:SectionProps) => {
  const services = [
    {
      icon: <DietFoodIcon className={'w-12 sm:w-16'} />,
      title: 'Dine in',
      description: 'Fresh, flavorful, and crafted with your health in mind.'
    },
    {
      icon: <ScooterIcon className={'w-12 sm:w-16'} />,
      title: 'Take Out',
      description: 'Take home the goodness of indian flavours'
    },
    {
      icon: <DietFoodIcon className={'w-12 sm:w-16'} />,
      title: 'Catering Services',
      description: 'Bring the taste of India to your events with customized catering.'
    },
  ]

  return (
    <section className={`bg-[url('/assets/bg_wallpaper.png')] bg-repeat text-dark ${className}`}>
      <div className='container py-8 sm:py-12'>
        <div className="container max-w-4xl text-center mb-6 sm:mb-10">
          <h1 className="font-semibold mb-4 text-2xl sm:text-3xl lg:text-4xl">Our Services</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {services.map((service, index) => (
            <div key={index} className='flex flex-col gap-3 text-center p-4 sm:p-6'>
              <div className="flex items-center text-center justify-center mb-3 sm:mb-5">
                <motion.span
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 225, transition: { duration: 1, ease: 'easeInOut' } }}
                  className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] border border-dark/20 flex justify-center items-center hover:bg-light relative'
                >
                </motion.span>
                <span className='absolute'>{service.icon}</span>
              </div>
              <h3 className='uppercase text-lg sm:text-xl font-semibold'>{service.title}</h3>
              <div className='text-sm sm:text-base'>
                {service.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection


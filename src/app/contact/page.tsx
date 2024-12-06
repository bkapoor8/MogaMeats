import ContactUsForm from '@/components/common/form/ContactUsForm'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='py-10 sm:py-20 container px-4 sm:px-6 lg:px-8'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h1 className='text-2xl sm:text-3xl font-bold mb-4'>Contact Information</h1>
          <p className='flex flex-col sm:flex-row sm:items-center gap-2'>
            <span className='font-semibold'>Address:</span>
            <span className='text-primary'>1560 Dundas St. London Ontario</span>
          </p>
          <p className='flex flex-col sm:flex-row sm:items-center gap-2'>
            <span className='font-semibold'>Phone:</span>
            <span className='text-primary'>+1 (519) 453-8888</span>
          </p>
          <p className='flex flex-col sm:flex-row sm:items-center gap-2'>
            <span className='font-semibold'>Email:</span>
            <span className='text-primary'>londonmogameat@gmail.com</span>
          </p>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>Business Hours:</p>
            <p className='text-primary'>Sunday - Thursday: 11am - 12am</p>
            <p className='text-primary'>Friday - Saturday: 11am - 2am</p>
          </div>
        </div>
        <div className='mt-8 md:mt-0'>
          <ContactUsForm />
        </div>
      </div>
    </div>
  )
}

export default ContactPage


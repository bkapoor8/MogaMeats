import ContactUsForm from '@/components/common/form/ContactUsForm'
import React from 'react'

const ContactPage = () => {
  return (
    <div className='py-20 container'>
      <div className="grid grid-cols-2">
        <div className="container flex flex-col gap-8">
          <h1 className='mb-4'>Contact Information</h1>
          <p >Address: <span className='text-primary'> 1560 Dundas St. London Ontario</span></p>
          <p>Phone: <span className='text-primary'>+1 (519) 453-8888</span></p>
          <p>Email: <span className='text-primary'>londonmogameat@gmail.com</span></p>
          <p>Business Hours: <span className='text-primary'> Sunday- Thursday 11am-12am</span><br></br>
            <span className='text-primary'>Friday- Saturday: 11am- 2am</span>
          </p>
        </div>
        <div className='container'>
          <ContactUsForm />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
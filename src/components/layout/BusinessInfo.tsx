import { ClockIcon } from '@/icons/ClockIcon'
import { LocationIcon } from '@/icons/LocationIcon'
import { PhoneIcon } from '@/icons/PhoneIcon'
import { SectionProps } from '@/types/SectionProps'

const BusinessInfo = ({className}:SectionProps) => {
  const infoItems = [
    {
      icon: <PhoneIcon className={'w-8 sm:w-10 fill-primary'}/>,
      title: '+1 (519) 453-8888',
      subtitle: 'Call us now!'
    },
    {
      icon: <LocationIcon className={'w-8 sm:w-10 stroke-primary'}/>,
      title: '1560 Dundas St.',
      subtitle: 'London Ontario'
    },
    {
      icon: <ClockIcon className={'w-8 sm:w-10 stroke-primary'}/>,
      title: ['Open Sunday- Thursday', 'Open Friday- Saturday'],
      subtitle: ['11am-12am', '11am-2am']
    }
  ]

  return (
    <section className={`${className} bg-dark`}>
      <div className='container mx-auto px-4 py-6 sm:py-8'>
        <div className='flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 md:gap-8 lg:gap-16'>
          {infoItems.map((item, index) => (
            <div key={index} className='flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left'>
              {item.icon}
              <div>
                {Array.isArray(item.title) ? (
                  item.title.map((title, i) => (
                    <div key={i}>
                      <p className='text-base sm:text-lg font-semibold'>{title}</p>
                      <p className='text-sm sm:text-base text-gray-400'>{item.subtitle[i]}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <p className='text-base sm:text-lg font-semibold'>{item.title}</p>
                    <p className='text-sm sm:text-base text-gray-400'>{item.subtitle}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BusinessInfo


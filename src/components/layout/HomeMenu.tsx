'use client'
import React, { useEffect, useState } from 'react'
import MenuItem from '@/types/MenuItem'
import HomeMenuItemCard from './HomeMenuItemCard'
import SectionHeader from './SectionHeader'
import { SectionProps } from '@/types/SectionProps'

const HomeMenu = ({ className }: SectionProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    fetch("/api/menu-items")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(menuItems => setMenuItems(menuItems.slice(0, 6)))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  return (
    <section className={className}>
      <SectionHeader
        header={'Hot Meals'}
        description={'From classic favorites to innovative creations, our hot meals promise a delightful symphony of flavors that will leave you craving for more.'}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {menuItems && menuItems.map((menuItem, index) => (
          <HomeMenuItemCard key={menuItem._id} menuItem={menuItem} index={index} />
        ))}
      </div>
    </section>
  )
}

export default HomeMenu

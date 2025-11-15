'use client';
import Loader from '@/components/common/Loader';
import CategoryTag from '@/components/features/categories/CategoryTag';
import MenuItemCard from '@/components/features/menuItems/MenuItemCard';
import SectionHeader from '@/components/layout/SectionHeader';
import MenuItem from '@/types/MenuItem';
import RawMeatCategory from '@/types/RawMeatCategory';
import { useEffect, useState } from 'react';

const MenuPage = () => {
  const [categories, setCategories] = useState<RawMeatCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);

  const filteredCategories = categories.filter(category => category.name.includes(tag));

  useEffect(() => {
    fetch('/api/rawmeatcategories')
      .then(res => res.json())
      .then((data: RawMeatCategory[]) => {
        setCategories(data);
        setTag(data[0].name);
      });
    fetch('/api/menu-raw-items')
      .then(res => res.json())
      .then(data => setMenuItems(data));
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader className={''} />;
  }

  return (
    <section className="py-12">
      {categories && menuItems && (
        <>
          <SectionHeader
            header={'Our Raw Meat Menu'}
            description={
              'From classic favorites to innovative creations, our hot meals promise a delightful symphony of flavors that will leave you craving for more.'
            }
          />
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(category => (
              <CategoryTag
                key={category._id}
                name={category.name}
                onClick={(name: string) => setTag(name)}
                isSelected={tag === category.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map(category => (
              menuItems
                .filter(item => item.rawmeatcategory === category._id)
                .map((item, index) => (
                  <div className="p-4" key={item._id}>
                    <MenuItemCard menuItem={item} />
                  </div>
                ))
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MenuPage;

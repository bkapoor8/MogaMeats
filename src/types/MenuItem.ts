import MenuItemAddOn from "./MenuItemAddOn";

type MenuItem = {
  _id?: string;
  name: string;
  image: string;
  description: string;
  category: string | null;
  rawmeatcategory: string | null;
  basePrice: string | number;
  sizes: MenuItemAddOn[];
  extraIngredientsPrices: MenuItemAddOn[];
}

export default MenuItem;

// type MenuItemAddOn = {
//   _id?: string;
//   name: string;
//   price: string | number;
// }
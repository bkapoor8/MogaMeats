import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { MenuItem } from "@/app/models/MenuItem";
import MenuItemAddOn from "@/types/MenuItemAddOn";

const stripe = require('stripe')("sk_test_51R6PlkKi2RijjSjAximDaz2E5IN3lHaL3NHHpgd1G1mMS4Ded97vdlQV9tc7KIIPyffbY51mkV0Re417aKSM0fQ600cFALK8VV");

export async function POST(req: NextRequest) {
  mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin")
  const authSession = await getServerSession(authOptions);
  const userEmail = authSession?.user?.email;
  const { cartProducts, address } = await req.json();
  const order = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false
  })

  const stripeLineItems: any = [];

  for (const cartProduct of cartProducts) {
    const menuItem = await MenuItem.findById(cartProduct.menuItem._id);
    let productPrice = menuItem.basePrice;
    if (cartProduct.selectedSize) {
      const size = menuItem.sizes.find((size: MenuItemAddOn) => size._id!.toString() === cartProduct.selectedSize._id.toString());
      productPrice += size.price;
    }
    if (cartProduct.selectedExtras?.length > 0) {
      for (const selectedExtra of cartProduct.selectedExtras) {
        const extraIngredientInfo = menuItem.extraIngredientsPrices.find((extra: MenuItemAddOn) => extra._id!.toString() === selectedExtra._id.toString());
        productPrice += extraIngredientInfo.price;
      }
    }

    const productName = menuItem.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'AUD',
        product_data: {
          name: productName
        },
        unit_amount: productPrice * 100
      }
    })
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    success_url: `https://mogameatbarandgrill.com/orders/${order._id.toString()}?clear-cart=1`,
    cancel_url: `https://mogameatbarandgrill.com/cart?canceled=1`,
    customer_email: userEmail,
    payment_method_types: ['card'],
    metadata: { orderId: order._id.toString() },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {
            amount: 500,
            currency: 'AUD'
          }
        }
      }
    ]
  });

  return NextResponse.json(stripeSession.url);
}
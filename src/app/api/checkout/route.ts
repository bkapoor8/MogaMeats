import { MenuItem } from "@/app/models/MenuItem";
import { Notification } from "@/app/models/Notification";
import { Order } from "@/app/models/Order";
import MenuItemAddOn from "@/types/MenuItemAddOn";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../../../util/constant";
import { authOptions } from "../auth/[...nextauth]/route";

require("dotenv").config();

const stripe = require('stripe')(STRIPE_SECRET_KEY);
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  await mongoose.connect(
    "mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin"
  );

  const authSession = await getServerSession(authOptions);
  const userEmail = authSession?.user?.email;
  const { cartProducts, address ,deliveryFee} = await req.json();
  console.log(deliveryFee)
  const order = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  if (userEmail) {
    await Notification.create({
      userEmail,
      title: "Order Created!",
      body: `Your order #${order._id.toString()} has been successfully created.`,
      icon: "/images/mogameat-logo.png",
      createdAt: new Date(),
      read: false,
    });
  }

  // ✅ Type-safe line items
  const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let totalAmount = 0;

  var deliveryfee = deliveryFee; 
  for (const cartProduct of cartProducts) {
    const menuItem = await MenuItem.findById(cartProduct.menuItem._id);
    let productPrice = menuItem.basePrice;

    if (cartProduct.selectedSize) {
      const size = menuItem.sizes.find(
        (size: MenuItemAddOn) =>
          size._id!.toString() === cartProduct.selectedSize._id.toString()
      );
      if (size) productPrice += size.price;
    }

    if (cartProduct.selectedExtras?.length > 0) {
      for (const selectedExtra of cartProduct.selectedExtras) {
        const extraIngredientInfo = menuItem.extraIngredientsPrices.find(
          (extra: MenuItemAddOn) =>
            extra._id!.toString() === selectedExtra._id.toString()
        );
        if (extraIngredientInfo) productPrice += extraIngredientInfo.price;
      }
    }

    totalAmount += productPrice;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "AUD",
        product_data: {
          name: menuItem.name,
        },
        unit_amount: Math.round(productPrice * 100), // cents
      },
    });
  }

  // ✅ Add 13% tax
  const taxAmount = totalAmount * 0.13;
  stripeLineItems.push({
    quantity: 1,
    price_data: {
      currency: "AUD",
      product_data: {
        name: "Tax (13%)",
      },
      unit_amount: Math.round(taxAmount * 100),
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    success_url: `https://mogameatbarandgrill.com/orders/${order._id.toString()}?clear-cart=1`,
    cancel_url: `https://mogameatbarandgrill.com/cart?canceled=1`,
    customer_email: userEmail || undefined,
    payment_method_types: ["card"],
    metadata: { orderId: order._id.toString() },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryfee*100, // cents
            currency: "AUD",
          },
        },
      },
    ],
  });

  return NextResponse.json(stripeSession.url);
}

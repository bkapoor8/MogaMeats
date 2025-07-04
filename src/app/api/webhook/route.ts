import { Order } from "@/app/models/Order";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = require('stripe')("sk_test_51R6PlkKi2RijjSjAximDaz2E5IN3lHaL3NHHpgd1G1mMS4Ded97vdlQV9tc7KIIPyffbY51mkV0Re417aKSM0fQ600cFALK8VV");
  const endpointSecret = 'whsec_G7dhKGbzOaYtkAnXLT0yJUkopwZO7A1l';
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    if (event.type === "checkout.session.completed") { 
      const orderId = event?.data?.object?.metadata?.orderId;
      const isPaid = event?.data?.object?.payment_status === "paid";
      if (isPaid) {
        await Order.updateOne({ _id: orderId }, { paid: true });
      }
    }
  } catch (err:any) {
    console.log(err)
    return NextResponse.json(`Stripe Webhook Error: ${err.message}`, { status: 400 });
  }

  return NextResponse.json('ok', { status: 200 });

}
import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin");

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const admin = await isAdmin();

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  const clearCartParam = url.searchParams.get("clear-cart");

  if (_id) {
    // Handle order status update based on clear-cart parameter
    if (clearCartParam) {
      const order = await Order.findById(_id);
      if (order) {
        if (clearCartParam === "1") {
          // Success case - mark as paid
          order.paid = true;
          order.status = "paid"; // or whatever status field you use
        } else {
          // Failed/cancel case
          order.status = "cancelled"; // or "failed"
        }
        await order.save();
      }
    }
    
    return NextResponse.json(await Order.findById(_id));
  }
  
  if (admin) {
    return NextResponse.json(await Order.find());
  } else {
    return NextResponse.json(await Order.find({ userEmail: userEmail }));
  }
}
import { Notification } from "@/app/models/Notification";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  await mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin");
  const authSession = await getServerSession(authOptions);
  const userEmail = authSession?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let notifications;
       notifications = await Notification.find();
  

  return NextResponse.json(notifications);
}
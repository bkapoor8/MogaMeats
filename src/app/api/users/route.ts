import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/utils";

export async function GET() {
  mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin");
  if (await isAdmin()) {
    const users = await User.find();
    return NextResponse.json(users);
  }
  return NextResponse.json([]);
}

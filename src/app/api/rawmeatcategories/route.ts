import { RawMeatCategory } from "@/app/models/RawMeatCategory";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "../auth/utils";

export async function POST(req: NextRequest) {
  try {
    mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin");
    if (await isAdmin()) {
      const body = await req.json();
      const createdRawMeatCategory = await RawMeatCategory.create(body);
      return NextResponse.json(createdRawMeatCategory);
    }
    return NextResponse.json({});
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({
        error: err.name,
        message: "Error: RawMeatCategory name is required.",
      })
    }
    else if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json({
        error: err.name,
        message: "Error: RawMeatCategory name already exists.",
      })
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin");
    if (await isAdmin()) {
      const { _id, name, image } = await req.json();
      const updatedRawMeatCategory = await RawMeatCategory.findByIdAndUpdate({ _id }, { name, image }, { new: true });
      return NextResponse.json(updatedRawMeatCategory);
    }
    return NextResponse.json({});
  } catch (err: any) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      return NextResponse.json({
        error: err.name,
        message: "Error: RawMeatCategory name already exists.",
      })
    }
    return NextResponse.json({
      error: err.name,
      message: err.message
    })
  }
}

export async function GET() {
  try {
    mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin");
    const categories = await RawMeatCategory.find();
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    mongoose.connect("mongodb://siteAdmin:admin123Db@52.200.4.201:27017/mogameat?authSource=admin");
    if (await isAdmin()) {
      const url = new URL(req.url);
      const _id = url.searchParams.get('_id');
      const deleteResult = await RawMeatCategory.deleteOne({ _id });
      return NextResponse.json(deleteResult);
    }
    return NextResponse.json(true);
  } catch (err) {
    return NextResponse.json(err);
  }
}
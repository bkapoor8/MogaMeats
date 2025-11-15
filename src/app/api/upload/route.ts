import cloudinary from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.v2.config({
  cloud_name: "dmjpvvp2a",
  api_key: "845956639925688",
  api_secret: "sPNVnkV-2IjBzfnRFP-2WQjLL-g",
  secure: true
});


export async function POST(req: NextRequest) {

  const data = await req.formData();

  if (data.get('file')) {
    const file = data.get('file') as File;
    const fileBuffer = await file.arrayBuffer();

    var mime = file.type;
    var encoding = 'base64';
    var base64Data = Buffer.from(fileBuffer).toString('base64');
    var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

    try {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload(fileUri, {
            invalidate: true
          })
            .then((result) => {
              console.log(result);
              resolve(result);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        });
      };
      const uploadResult: any = await uploadToCloudinary();
      return NextResponse.json(uploadResult.secure_url)
    } catch (error) {
      console.log("server err", error);
      return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
    }
  }
}
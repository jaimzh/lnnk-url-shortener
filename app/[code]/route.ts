import dbConnect from "@/lib/db";
import { Url } from "@/models/UrlSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  await dbConnect();

  const { code } = await params;    
  

  const urlEntry = await Url.findOneAndUpdate(
    { shortCode: code },
    { $inc: { clicks: 1 } },
    { new: true },
  );


  if (!urlEntry) {
     
      return NextResponse.redirect(new URL("/", request.url));//i'll make a custom 404 page later
    }


    return NextResponse.redirect(urlEntry.originalUrl);
}

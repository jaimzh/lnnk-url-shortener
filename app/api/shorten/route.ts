import dbConnect from "@/lib/db";
import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { Url } from "@/models/UrlSchema";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {


const headerList = await headers();
const host = headerList.get('host');
const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
 const baseUrl = `${protocol}://${host}`;
  
  try {
    await dbConnect();
    const data = await request.json();
    const originalUrl = data.url;
    if (!originalUrl) {
      return new Response("URL is required", { status: 400 });
    }
    const shortCode = nanoid(6);

    await Url.create({
      originalUrl,
      shortCode,
    });

    return new Response(
      JSON.stringify({
        originalUrl, 
        shortUrl: `${baseUrl}/${shortCode}`,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error shortening URL:", error);
    return new Response("Failed to shorten URL", { status: 500 });
  }
}

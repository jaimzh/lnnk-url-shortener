import dbConnect from "@/lib/db";
import { NextRequest } from "next/server";
import { nanoid } from "nanoid";
import { Url } from "@/models/UrlSchema";

export async function POST(request: NextRequest) {
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
        shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error shortening URL:", error);
    return new Response("Failed to shorten URL", { status: 500 });
  }
}

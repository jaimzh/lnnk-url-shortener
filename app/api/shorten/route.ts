import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Url } from "@/models/UrlSchema";
import { urlSchema } from "@/schemas/url";
import { shortenRateLimit } from "@/lib/ratelimit";

import { getBaseUrl } from "@/lib/server-utils";




export const runtime = "nodejs";

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  const ip = forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || "anonymous";
  
  console.log("Client IP:", ip); 

  return ip;
}



export async function POST(request: NextRequest) {
  const baseUrl = await getBaseUrl();


  const ip = getClientIp(request);
  const identifier = `ip:${ip}`;

  const { success, limit, remaining, reset } = await shortenRateLimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 , 
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      },
      
    );
  }

  try {
    await dbConnect();
    const body = await request.json();

    const validation = urlSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: validation.error.issues[0].message }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const {
      url: originalUrl,
      alias,
      visibility,
      brandingTitle,
      brandingDescription,
      brandingImage,
    } = validation.data;

    let shortCode = alias || nanoid(6);

    if (alias) {
      const existing = await Url.findOne({ shortCode: alias });
      if (existing) {
        return new Response(
          JSON.stringify({ error: "Alias is already taken" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    } else {
      let exists = true;
      while (exists) {
        const checkExisting = await Url.findOne({ shortCode });
        if (!checkExisting) {
          exists = false;
        } else {
          shortCode = nanoid(6);
        }
      }
    }

    await Url.create({
      originalUrl,
      shortCode,
      visibility,
      brandingTitle,
      brandingDescription,
      brandingImage,
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

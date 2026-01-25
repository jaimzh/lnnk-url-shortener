// import { NextRequest, NextResponse } from "next/server";
// import { nanoid } from "nanoid";
// import prisma from "@/lib/prisma";

// export async function POST(request: NextRequest) {
//   try {
//     const { url } = await request.json();
//     const trimmed = typeof url === "string" ? url.trim() : "";

//     if (!trimmed) {
//       return NextResponse.json({ error: "URL is required" }, { status: 400 });
//     }

//     const shortCode = nanoid(8);

//     const shortenedUrl = await prisma.url.create({
//       data: { originalUrl: trimmed, shortCode },
//     });

//     return NextResponse.json({
//       message: "URL shortened successfully",
//       shortCode: shortenedUrl.shortCode,
//       originalUrl: shortenedUrl.originalUrl,
//     });
//   } catch (error) {
//     console.error("Error shortening URL:", error);
//     return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
//   }
// }












// // export async function POST(request: NextRequest) {
// //   try {
// //     const { trimmed } = await request.json();

// //     if (!trimmed) {
// //       return NextResponse.json({ error: "URL is required" }, { status: 400 });
// //     }

// //     const shortCode = nanoid(8);
// //     const shortenedUrl = await prisma.url.create({
// //       data: {
// //         originalUrl: trimmed,
// //         shortCode,
// //       },
// //     });

// //     return NextResponse.json({
// //       message: "URL shortened successfully",
// //       shortCode: shortenedUrl.shortCode,
// //       originalUrl: trimmed,
// //     });
// //   } catch (error) {
// //     console.error("Error shortening URL:", error);
// //     return NextResponse.json(
// //       { error: "Failed to shorten URL" },
// //       { status: 500 },
// //     );
// //   }
// // }





import { headers } from "next/headers";

export async function getBaseUrl() {
  let baseUrl = "";
  if (process.env.BASE_URL && process.env.NODE_ENV === "production") {
    baseUrl = process.env.BASE_URL.replace(/\/$/, "");
  } else {
    const headerList = await headers();
    const host = headerList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    baseUrl = `${protocol}://${host}`;
  }

  if (baseUrl.includes("pxxl.click") || baseUrl.includes("vercel.app")) {
    return "https://lnnk.click";
  }

  return baseUrl;
}

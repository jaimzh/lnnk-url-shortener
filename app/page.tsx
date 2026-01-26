import { DashboardTable } from "@/components/dashboard-table";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

import { UrlList } from "@/components/url-list";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6">
        <Hero />

        <DashboardTable searchParams={searchParams} />
      </div>
    </main>
  );
}


import Hero from "@/components/hero";
import Navbar from "@/components/navbar";


import { UrlList } from "@/components/url-list";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6">
        <Hero />
        <UrlList />
      </div>
    </main>
  );
}

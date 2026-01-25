import HeroAnimation from "./HeroAnimation";
import UrlInput from "./UrlInput";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-28 w-full max-w-6xl mx-auto">
      <HeroAnimation />

     

      <UrlInput />
    </section>
  );
}

import HeroCanvasAnimation from "@/components/HeroCanvasAnimation";
import HomeNavbar from "@/components/HomeNavbar";
import HomeFooter from "@/components/HomeFooter";

export default function Home() {
  return (
    <main className="w-full relative m-0 p-0 bg-[#1a1410]">
      <HomeNavbar />
      <HeroCanvasAnimation />
      <HomeFooter />
    </main>
  );
}

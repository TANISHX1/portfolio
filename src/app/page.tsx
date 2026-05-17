import { Desktop } from "@/components/Desktop";
import { MobileOS } from "@/components/mobile/MobileOS";

export default function Home() {
  return (
    <>
      <div className="hidden md:block h-screen w-full">
        <Desktop username="TANISHX1" />
      </div>
      <div className="block md:hidden h-[100dvh] w-full relative">
        <MobileOS username="TANISHX1" />
      </div>
    </>
  );
}

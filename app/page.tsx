import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { SHOW_LOGOS, SHOW_TESTIMONIALS } from "@/lib/data";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {SHOW_LOGOS && <Logos />}
        <Features />
        <HowItWorks />
        <Pricing />
        {SHOW_TESTIMONIALS && <Testimonials />}
        <Faq />
      </main>
      <Footer />
    </>
  );
}

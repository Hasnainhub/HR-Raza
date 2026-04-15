import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import Background3D from "@/components/Background3D";

export default function Home() {
  return (
    <main>
      <Background3D />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}

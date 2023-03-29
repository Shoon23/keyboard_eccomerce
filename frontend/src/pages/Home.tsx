import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Reviews from "../components/Home/Reviews";
import CTA from "../components/Home/CTA";
import FAQ from "../components/Home/FAQ";
import { usePageRef } from "../hooks/usePageRef";

function Home() {
  const { pageRef } = usePageRef();
  return (
    <>
      <main>
        <Hero heroRef={pageRef} />
        <Features />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}

export default Home;

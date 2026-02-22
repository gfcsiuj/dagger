import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import BentoGrid from './components/BentoGrid';
import Workflow from './components/Workflow';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import MercurySection from './components/MercurySection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import GlassEdges from './components/GlassEdges';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

const NoiseOverlay = () => {
  return (
    <div className="noise-bg noise-animation"></div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-dagger-black min-h-screen text-white selection:bg-dagger-yellow selection:text-dagger-black font-readex cursor-none pb-24 md:pb-0">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
            <NoiseOverlay />
            <GlassEdges />
            <Navbar />
            <main>
                <Hero />
                <Marquee />
                <BentoGrid />
                <Workflow />
                <Gallery />
                <Testimonials />
                <Pricing />
                <FAQ />
                <MercurySection />
            </main>
            <Footer />
        </>
      )}
    </div>
  );
};

export default App;
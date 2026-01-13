import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import BentoGrid from './components/BentoGrid';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import GlassEdges from './components/GlassEdges';

const App: React.FC = () => {
  return (
    <div className="bg-dagger-black min-h-screen text-white selection:bg-dagger-yellow selection:text-dagger-black font-readex cursor-none pb-24 md:pb-0">
      <CustomCursor />
      <GlassEdges />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <BentoGrid />
        <Pricing />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default App;
'use client';

import {
  Navigation,
  Hero,
  Stats,
  Programs,
  Features,
  Testimonials,
  CallToAction,
  Footer,
} from '@/components/landing';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="pt-16 md:pt-20">
        <Hero />
        <Stats />
        <Programs />
        <Features />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}

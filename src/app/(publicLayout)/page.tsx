'use client';

import {
  Hero,
  Stats,
  Programs,
  Features,
  Testimonials,
  CallToAction,
} from '@/components/landing';

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Programs />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

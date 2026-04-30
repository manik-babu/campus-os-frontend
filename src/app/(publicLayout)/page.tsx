'use client';

import {
  Hero,
  Stats,
  Programs,
  Features,
  Testimonials,
  CallToAction,
} from '@/components/landing';
import CallToActionSimple from '@/components/landing/CallToActionSimple';

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Programs />
      <Features />
      <Testimonials />
      <CallToActionSimple />
      {/* <CallToAction /> */}
    </div>
  );
}

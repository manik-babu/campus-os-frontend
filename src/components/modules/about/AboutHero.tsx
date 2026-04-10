'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function AboutHero() {
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.about-hero-text', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            delay: 0.5,
            ease: 'power2.out',
        });
        tl.from('.about-state', {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            ease: 'power2.out',
        }, '-=1');
        tl.from('.about-hero-buttons', {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            ease: 'power2.out',
        }, '-=1');


    });
    return (
        <section className="relative min-h-screen w-full overflow-hidden pt-32 pb-20 md:pb-32">
            {/* Background Decorative Elements */}
            <div className="overlay" />
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-linear-to-br from-[#0052FF]/12 to-transparent blur-3xl" />
                <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-linear-to-tr from-[#4D7CFF]/8 to-transparent blur-3xl" />
            </div>

            <div className="container-landing relative z-10">
                <div className="max-w-4xl">
                    {/* Section Label */}
                    <div className="section-label w-fit mb-8 about-hero-text">
                        <div className="section-label-dot" />
                        <span className="section-label-text">About Us</span>
                    </div>

                    {/* Headline */}
                    <h1 className="mb-6 about-hero-text">
                        <span className="block text-foreground">Shaping Leaders</span>
                        <span className="gradient-text block">Since 2003</span>
                    </h1>

                    {/* Subheading */}
                    <p className="mb-8 max-w-3xl text-xl text-muted-foreground leading-relaxed about-hero-text">
                        Uttara University stands as a beacon of academic excellence in Bangladesh, dedicated to fostering innovation,
                        critical thinking, and holistic development of our students. Located in the heart of Dhaka, we serve over 32,000
                        alumni who have become leaders in their respective fields globally.
                    </p>

                    {/* Key Stats */}
                    <div className="grid gap-6 sm:grid-cols-3 mb-12">
                        <div className='about-state'>
                            <div className="text-4xl font-bold gradient-text mb-2">2003</div>
                            <p className="text-sm text-muted-foreground">Year Established</p>
                        </div>
                        <div className='about-state'>
                            <div className="text-4xl font-bold gradient-text mb-2">38</div>
                            <p className="text-sm text-muted-foreground">Academic Programs</p>
                        </div>
                        <div className='about-state'>
                            <div className="text-4xl font-bold gradient-text mb-2">32K+</div>
                            <p className="text-sm text-muted-foreground">Alumni Network</p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 about-hero-buttons">
                        <button className="btn-primary">Explore Programs</button>
                        <button className="btn-secondary">Our Campus Tour</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

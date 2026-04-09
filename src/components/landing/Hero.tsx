'use client';

import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
interface HeroProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaSecondaryText?: string;
}

export function Hero({
    title = 'Welcome to Uttara University',
    subtitle = 'Empowering minds. Shaping futures. Building excellence through innovative education and global perspectives.',
    ctaText = 'Explore Programs',
    ctaSecondaryText = 'Learn More',
}: HeroProps) {

    useGSAP(() => {
        gsap.from(".hero-text", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.5,
        });
    });

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background pt-32 pb-20 md:pb-32">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Radial glow - top right */}
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-[#0052FF]/8 to-transparent blur-3xl" />
                {/* Radial glow - bottom left */}
                <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-[#4D7CFF]/5 to-transparent blur-3xl" />
            </div>

            <div className="container-landing relative z-10">
                <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-8 lg:col-span-3">
                        {/* Section Label */}
                        <div className="section-label w-fit hero-text" >
                            <div className="section-label-dot" />
                            <span className="section-label-text">Welcome</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="leading-tight hero-text text-6xl!">
                                <span className="block text-foreground">{title.split(' ').slice(0, -1).join(' ')}</span>
                                <span className="gradient-text block">{title.split(' ').slice(-1)[0]}</span>
                            </h1>
                            <div className="relative hero-text">
                                <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#0052FF]/20 to-[#4D7CFF]/10" />
                            </div>
                        </div>

                        {/* Subtitle */}
                        <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed hero-text">
                            {subtitle}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-4 hero-text">
                            <button className="btn-primary group">
                                {ctaText}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                            <button className="btn-secondary">
                                {ctaSecondaryText}
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-col gap-2 pt-8 border-t border-border hero-text">
                            <p className="text-sm text-muted-foreground">Trusted by thousands of students worldwide</p>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="h-4 w-4 fill-[#0052FF]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-foreground">4.9/5 Average Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Animated Graphic */}
                    <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                        <AnimatedHeroGraphic />
                    </div>
                </div>
            </div>
        </section>
    );
}

function AnimatedHeroGraphic() {
    return (
        <div className="relative h-[400px] w-full max-w-xs">
            {/* Outer rotating ring */}
            <svg
                className="absolute inset-0 h-full w-full animate-spin"
                style={{ animationDuration: '60s' }}
                viewBox="0 0 200 200"
                fill="none"
            >
                <circle
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="url(#grad)"
                    strokeWidth="1"
                    strokeDasharray="10 5"
                    opacity="0.3"
                />
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0052FF" />
                        <stop offset="100%" stopColor="#4D7CFF" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Central gradient circle */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-48 w-48">
                    {/* Main gradient circle */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] opacity-10 blur-3xl" />

                    {/* Core accent block */}
                    <div className="absolute right-0 top-8 h-24 w-24 rounded-2xl bg-[#0052FF] shadow-accent-lg" />

                    {/* Floating decorative circles */}
                    <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-2 border-[#0052FF]/30" />
                    <div className="absolute bottom-8 right-8 h-12 w-12 rounded-full bg-[#4D7CFF]/20" />

                    {/* Dot grid pattern */}
                    <div className="absolute inset-0 opacity-5">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute h-1 w-1 rounded-full bg-[#0052FF]"
                                style={{
                                    left: `${(i % 3) * 50}%`,
                                    top: `${Math.floor(i / 3) * 50}%`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating accent label */}
            <div className="absolute bottom-12 right-0 gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-md flex items-center">
                <div className="h-2 w-2 rounded-full bg-[#0052FF] animate-pulse" />
                <span className="text-xs font-medium text-foreground">Innovating Education</span>
            </div>
        </div>
    );
}

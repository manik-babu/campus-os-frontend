'use client';

import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
interface HeroProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaSecondaryText?: string;
}

export function Hero({
    title = "Welcome to Uttara University",
    subtitle = 'Empowering minds. Shaping futures. Building excellence through innovative education and global perspectives.',
    ctaText = 'Apply Now',
    ctaSecondaryText = 'Learn More',
}: HeroProps) {
    const router = useRouter();

    useGSAP(() => {
        gsap.from(".hero-text", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.5,
        });
        gsap.from("#hero-graphic", {
            opacity: 0,
            scale: 0.95,
            duration: 1.5,
            delay: 1.5,
            ease: "power3.out",
        });
    });

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background pt-32 pb-20 md:pb-32">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Radial glow - top right */}
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-linear-to-br from-[#0052FF]/12 to-transparent blur-3xl" />
                {/* Radial glow - bottom left */}
                <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-liner-to-tr from-[#4D7CFF]/8 to-transparent blur-3xl" />
            </div>

            <div className="container-landing relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 grid-cols-1 lg:gap-8">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-8">
                        {/* Section Label */}
                        <div className="section-label w-fit hero-text" >
                            <div className="section-label-dot" />
                            <span className="section-label-text">Welcome</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="font-fancy leading-tight hero-text text-6xl!">
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
                            <button onClick={() => router.push("/admission")} className="btn-primary group">
                                {ctaText}
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                            {/* <Link href={"/about"}>
                                <Button variant={"outline"} className='h-12 px-8'>
                                    {ctaSecondaryText}
                                </Button>
                            </Link> */}
                            <button onClick={() => router.push("/about")} className="btn-secondary border-[#0052FF]/30 bg-[#F1F5F9]">
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
                    <div id="hero-graphic" className="hidden lg:flex items-center justify-center">
                        <AnimatedHeroGraphic />
                    </div>
                </div>
            </div>
        </section>
    );
}

function AnimatedHeroGraphic() {
    return (
        <div className="relative h-[500px] w-full max-w-md">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0052FF]/15 to-[#4D7CFF]/10 blur-3xl" />
            </div>

            {/* Outer rotating ring */}
            <svg
                className="absolute inset-0 h-full w-full animate-spin"
                style={{ animationDuration: '120s' }}
                viewBox="0 0 200 200"
                fill="none"
            >
                <circle
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="url(#grad1)"
                    strokeWidth="1"
                    strokeDasharray="15 5"
                    opacity="0.2"
                />
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0052FF" />
                        <stop offset="100%" stopColor="#4D7CFF" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Main SVG Illustration */}
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 400"
                fill="none"
            >
                <defs>
                    <linearGradient id="bluGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0052FF" />
                        <stop offset="100%" stopColor="#4D7CFF" />
                    </linearGradient>
                </defs>

                {/* Lightbulb - Center */}
                <g className="animate-pulse">
                    {/* Bulb glow */}
                    <circle cx="200" cy="150" r="65" fill="url(#bluGrad)" opacity="0.1" />

                    {/* Bulb */}
                    <path
                        d="M 200 70 C 220 70 235 85 235 105 C 235 120 228 128 220 135 C 212 142 205 150 205 160 L 195 160 C 195 150 188 142 180 135 C 172 128 165 120 165 105 C 165 85 180 70 200 70 Z"
                        fill="url(#bluGrad)"
                        stroke="#0052FF"
                        strokeWidth="2.5"
                    />

                    {/* Socket */}
                    <rect x="187" y="160" width="26" height="12" rx="2" fill="url(#bluGrad)" stroke="#0052FF" strokeWidth="2" />

                    {/* Base */}
                    <rect x="189" y="172" width="22" height="6" rx="1" fill="url(#bluGrad)" stroke="#0052FF" strokeWidth="1.5" />
                    <rect x="187" y="178" width="26" height="4" rx="1" fill="#4D7CFF" opacity="0.6" />

                    {/* Light rays */}
                    <line x1="200" y1="40" x2="200" y2="15" stroke="url(#bluGrad)" strokeWidth="3" strokeLinecap="round" />
                    <line x1="245" y1="95" x2="265" y2="75" stroke="url(#bluGrad)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="155" y1="95" x2="135" y2="75" stroke="url(#bluGrad)" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* Books Stack - Bottom Right */}
                <g style={{ animation: 'bounce 2s ease-in-out infinite' }} opacity="0.9">
                    {/* Book 1 - Bottom */}
                    <rect x="240" y="260" width="70" height="18" rx="1" fill="url(#bluGrad)" stroke="#0052FF" strokeWidth="2" />
                    <line x1="240" y1="263" x2="310" y2="263" stroke="#fff" strokeWidth="1" opacity="0.5" />

                    {/* Book 2 - Middle */}
                    <rect x="255" y="238" width="65" height="18" rx="1" fill="#4D7CFF" stroke="#0052FF" strokeWidth="2" />
                    <line x1="255" y1="241" x2="320" y2="241" stroke="#fff" strokeWidth="1" opacity="0.5" />

                    {/* Book 3 - Top */}
                    <rect x="270" y="216" width="60" height="18" rx="1" fill="#0052FF" stroke="#4D7CFF" strokeWidth="2" />
                    <line x1="270" y1="219" x2="330" y2="219" stroke="#fff" strokeWidth="1" opacity="0.5" />
                </g>

                {/* Bottom Book - Left side */}
                <g style={{ animation: 'float 4s ease-in-out infinite 0.5s' }} opacity="0.85">
                    {/* Book 1 */}
                    <rect x="50" y="280" width="70" height="14" rx="1" fill="#0052FF" stroke="#4D7CFF" strokeWidth="1.5" opacity="0.7" />
                    <line x1="50" y1="283" x2="120" y2="283" stroke="#fff" strokeWidth="0.7" opacity="0.4" />

                    {/* Book 2 */}
                    <rect x="65" y="298" width="70" height="14" rx="1" fill="#4D7CFF" stroke="#0052FF" strokeWidth="1.5" opacity="0.6" />
                    <line x1="65" y1="301" x2="135" y2="301" stroke="#fff" strokeWidth="0.7" opacity="0.4" />
                </g>

                {/* Floating circles decoration */}
                <circle cx="130" cy="110" r="6" fill="#0052FF" opacity="0.3" />
                <circle cx="270" cy="170" r="5" fill="#4D7CFF" opacity="0.3" />
                <circle cx="80" cy="280" r="8" fill="#0052FF" opacity="0.2" />
            </svg>

            {/* CSS Animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>

            {/* Lucide Icons - Top Corners */}
            <div className="absolute top-8 left-8 animate-bounce" style={{ animationDuration: '2.5s' }}>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0052FF]/20 to-[#4D7CFF]/10 backdrop-blur-sm border border-[#0052FF]/30">
                    <BookOpen className="h-8 w-8 text-[#0052FF]" />
                </div>
            </div>

            <div className="absolute top-12 right-8 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#4D7CFF]/20 to-[#0052FF]/10 backdrop-blur-sm border border-[#4D7CFF]/30">
                    <GraduationCap className="h-8 w-8 text-[#4D7CFF]" />
                </div>
            </div>

            {/* Floating accent label */}
            <div className="absolute bottom-16 right-4 gap-2 px-4 py-2 rounded-lg bg-card border border-border shadow-md flex items-center">
                <div className="h-2 w-2 rounded-full bg-[#0052FF] animate-pulse" />
                <span className="text-xs font-medium text-foreground">Knowledge & Innovation</span>
            </div>
        </div>
    );
}

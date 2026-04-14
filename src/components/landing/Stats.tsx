'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StatCardProps {
    number: string;
    label: string;
    description?: string;
}

function StatCard({ number, label, description }: StatCardProps) {
    return (
        <div className="flex flex-col items-center gap-3 py-6 md:py-8 relative">
            <div className="text-4xl md:text-5xl font-bold gradient-text">{number}</div>
            <div className="text-center">
                <p className="font-semibold text-foreground text-sm md:text-base">{label}</p>
                {description && (
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{description}</p>
                )}
            </div>
        </div>
    );
}
const stats: StatCardProps[] = [
    {
        number: '25+',
        label: 'Years of Excellence',
        description: 'Educating leaders since 1999',
    },
    {
        number: '15,000+',
        label: 'Students',
        description: 'Across all programs',
    },
    {
        number: '98%',
        label: 'Placement Rate',
        description: 'Within 6 months of graduation',
    },
    {
        number: '50+',
        label: 'Global Partners',
        description: 'Exchange programs worldwide',
    },
];
export function Stats() {
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(".stats-text", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".stats-section",
                start: "top 80%",
                scroller: "body",
            }
        });
        gsap.from(".stat-card", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".stats-section",
                start: "top 70%",
                scroller: "body",
            }
        });

    });

    return (
        <section className="section-py bg-foreground text-background relative overflow-hidden">
            {/* Dot pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Subtle glow accents */}
            <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#4D7CFF]/10 blur-3xl" />
            <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#0052FF]/10 blur-3xl" />

            <div className="container-landing relative z-10 stats-section">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <div className="stats-text section-label w-fit mx-auto mb-6 border-background/20 bg-background/10">
                        <div className="section-label-dot bg-background" />
                        <span className="text-xs uppercase tracking-[0.15em] text-background/80">By The Numbers</span>
                    </div>
                    <h2 className="font-fancy stats-text text-background/95">
                        Trusted by thousands of students
                    </h2>
                    <p className="stats-text mt-4 text-base text-background/70 max-w-2xl mx-auto">
                        Uttara University has established itself as a leading institution through decades of
                        academic excellence and student success.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="relative stat-card">
                            {/* Vertical dividers on desktop */}
                            {index > 0 && (
                                <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 h-20 w-px bg-gradient-to-b from-transparent via-background/20 to-transparent" />
                            )}
                            <StatCard {...stat} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Zap, Globe, BookOpen, Briefcase } from 'lucide-react';
import { useRef, useState } from 'react';

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white">
                    {icon}
                </div>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-fancy font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}

export function Features() {
    const features: FeatureProps[] = [
        {
            icon: <Award className="h-6 w-6" />,
            title: 'World-Class Faculty',
            description:
                'Learn from experienced professors and industry experts with international recognition and publications.',
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Small Class Sizes',
            description:
                'Personalized attention and meaningful interactions between students and faculty in intimate learning environments.',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Cutting-Edge Facilities',
            description:
                'State-of-the-art laboratories, libraries, and research centers equipped with the latest technology.',
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: 'Global Partnerships',
            description:
                'Study abroad opportunities, exchange programs, and collaborations with universities worldwide.',
        },
        {
            icon: <BookOpen className="h-6 w-6" />,
            title: 'Holistic Development',
            description:
                'Comprehensive curriculum combining academics with sports, arts, and community engagement.',
        },
        {
            icon: <Briefcase className="h-6 w-6" />,
            title: 'Career Services',
            description:
                'Dedicated placement support, internship programs, and industry networking events year-round.',
        },
    ];

    // Refs for metric values
    const facultyRef = useRef<HTMLDivElement>(null);
    const infrastructureRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(".feature-text", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".feature-text",
                start: "top 80%",
                scroller: "body",
            }
        });
        gsap.from(".feature-card-left", {
            opacity: 0,
            x: -20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: "#features-grid",
                start: "top 70%",
                scroller: "body",
            }
        });
        gsap.from(".feature-card-right", {
            opacity: 0,
            x: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: "#features-grid",
                start: "top 70%",
                scroller: "body",
            }
        });
        gsap.from(".left-border", {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "top",
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#features-grid",
                start: "top 70%",
                scroller: "body",
            }
        });

        // Counter animation for metrics
        const counterAnimation = {
            faculty: { value: 0 },
            infrastructure: { value: 0 },
            year: { value: 2003 },
        };

        gsap.to(counterAnimation.faculty, {
            value: 150,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#metric",
                start: "top 80%",
                scroller: "body",
                onEnter: () => {
                    // Update faculty count
                    if (facultyRef.current) {
                        facultyRef.current.textContent = Math.round(counterAnimation.faculty.value) + '+';
                    }
                }
            },
            onUpdate: () => {
                if (facultyRef.current) {
                    facultyRef.current.textContent = Math.round(counterAnimation.faculty.value) + '+';
                }
            }
        });

        gsap.to(counterAnimation.infrastructure, {
            value: 100,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#metric",
                start: "top 80%",
                scroller: "body",
            },
            onUpdate: () => {
                if (infrastructureRef.current) {
                    infrastructureRef.current.textContent = Math.round(counterAnimation.infrastructure.value) + '%';
                }
            }
        });

        gsap.to(counterAnimation.year, {
            value: 2026,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#metric",
                start: "top 80%",
                scroller: "body",
            },
            onUpdate: () => {
                if (yearRef.current) {
                    yearRef.current.textContent = Math.round(counterAnimation.year.value).toString();
                }
            }
        });
    });

    return (
        <section className="bg-background">
            <div className="container-landing">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="section-label mb-6 feature-text">
                        <div className="section-label-dot" />
                        <span className="section-label-text">Why Choose Us</span>
                    </div>
                    <h2 className="text-foreground font-fancy mb-4 feature-text">World-Class Education</h2>
                    <p className="text-lg text-muted-foreground feature-text">
                        We provide more than just education. We create an environment where students thrive, innovate, and
                        prepare for meaningful careers.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-12 lg:grid-cols-2" id="features-grid">
                    {/* Left column features */}
                    <div className="space-y-8">
                        {features.slice(0, 3).map((feature, index) => (
                            <div key={index} className="feature-card-left">
                                <Feature key={index} {...feature} />
                            </div>
                        ))}
                    </div>

                    {/* Right column with accent */}
                    <div className="relative space-y-8 lg:pl-8">
                        {/* Accent bar */}
                        <div className="left-border lg:visible invisible absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0052FF] to-[#4D7CFF]" />

                        {features.slice(3).map((feature, index) => (
                            <div key={index} className="feature-card-right">
                                <Feature key={index} {...feature} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom section with metric */}
                <div id='metric' className="mt-20 rounded-2xl border-2 border-[#0052FF] bg-gradient-to-br from-[#0052FF]/5 to-[#4D7CFF]/5 p-8 lg:p-12">
                    <div className="grid gap-8 lg:grid-cols-3 text-center">
                        <div>
                            <div ref={facultyRef} className="text-4xl font-bold gradient-text mb-2">0+</div>
                            <p className="text-muted-foreground">Expert Faculty Members</p>
                        </div>
                        <div>
                            <div ref={infrastructureRef} className="text-4xl font-bold gradient-text mb-2">0%</div>
                            <p className="text-muted-foreground">Digital Campus Infrastructure</p>
                        </div>
                        <div>
                            <div ref={yearRef} className="text-4xl font-bold gradient-text mb-2">2003</div>
                            <p className="text-muted-foreground">Ranked Top 10 University</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

function TimelineItem({ year, title, description }: TimelineItem) {
    return (
        <div className="relative flex gap-6 pb-12 last:pb-0">
            {/* Timeline line (vertical) */}
            <div className="absolute timeline left-6 top-12 bottom-0 w-px bg-linear-to-b from-[#0052FF] to-[#4D7CFF]/30" />

            {/* Timeline dot */}
            <div className="relative timeline flex shrink-0 items-center">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-linear-to-br from-[#0052FF] to-[#4D7CFF] text-white shadow-lg">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-2 con-box">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all">
                    <p className="text-sm font-mono font-semibold text-[#0052FF] tracking-wide uppercase mb-2">
                        {year}
                    </p>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    );
}

export function History() {
    const milestones: TimelineItem[] = [
        {
            year: '2003',
            title: 'Foundation Year',
            description: 'Uttara University was established with a vision to provide world-class higher education in Bangladesh. Started with a select number of programs and dedicated faculty.',
        },
        {
            year: '2008',
            title: 'International Recognition',
            description: 'Received accreditation from international bodies and established exchange programs with universities across Asia, Europe, and North America.',
        },
        {
            year: '2012',
            title: 'Campus Expansion',
            description: 'Major expansion of infrastructure including new academic buildings, modern laboratories, and upgraded library facilities. Welcomed 10,000+ students.',
        },
        {
            year: '2016',
            title: 'Research & Innovation Hub',
            description: 'Established the Research and Innovation Center, promoting groundbreaking research and entrepreneurship among students and faculty.',
        },
        {
            year: '2019',
            title: 'Digital Transformation',
            description: 'Launched MYUU ERP system and implemented blended learning to enhance student experience. First among universities in Bangladesh to adopt such systems.',
        },
        {
            year: '2024',
            title: 'Global Leadership',
            description: '32,000+ alumni worldwide, 38 academic programs, 200+ faculty members, and recognized as one of Bangladeshs leading private universities.',
        },
    ];
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(`.history-label`, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: `.history-label`,
                start: "top 80%",
                markers: false,
            }
        });

        gsap.from(`.tes-card`, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: `.tes-card`,
                start: "top 70%",
                markers: false,

            }
        });
        gsap.from(".timeline", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 80%",
                markers: false,
            }
        })
        gsap.from(".con-box", {
            opacity: 0,
            x: 200,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".con-box",
                start: "top 80%",
                markers: false,
            }
        })
    })

    return (
        <section className="section-py bg-background">
            <div className="container-landing">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="section-label mb-6 history-label">
                        <div className="section-label-dot" />
                        <span className="section-label-text">Our Journey</span>
                    </div>
                    <h2 className="text-foreground font-fancy mb-4 history-label">Two Decades of Excellence</h2>
                    <p className="text-lg text-muted-foreground history-label">
                        From our founding in 2003 to becoming one of {`Bangladesh's`} premier institutions, Uttara University has continuously
                        evolved to meet the changing needs of higher education and society.
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-3xl">
                    {milestones.map((milestone, index) => (
                        <TimelineItem key={index} {...milestone} />
                        // <div key={index} className="relative timeline-item">
                        // </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

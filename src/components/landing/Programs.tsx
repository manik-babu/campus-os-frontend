'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Code, Stethoscope, TrendingUp, Lightbulb } from 'lucide-react';

interface ProgramCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    degree: string;
    duration: string;
    className?: string;
}

function ProgramCard({ icon, title, description, degree, duration, className }: ProgramCardProps) {
    return (
        <div className={`group/card flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#0052FF]/10 hover:-translate-y-1 ${className}`}>
            {/* Icon Background */}
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white shadow-accent">
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#0052FF]/10 text-[#0052FF]">
                        {degree}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {duration}
                    </span>
                </div>
            </div>

            {/* CTA */}
            <button className="mt-2 inline-flex cursor-pointer hover:underline items-center gap-2 text-[#0052FF] text-sm font-medium transition-transform group-hover/card:translate-x-1">
                Apply now →
            </button>
        </div>
    );
}

export function Programs() {
    const programs: ProgramCardProps[] = [
        {
            icon: <GraduationCap className="h-8 w-8" />,
            title: 'Bachelor of Science',
            description: 'Comprehensive undergraduate programs across science, technology, and engineering disciplines.',
            degree: 'B.Sc.',
            duration: '4 Years',
        },
        {
            icon: <Code className="h-8 w-8" />,
            title: 'Computer Science & IT',
            description: 'Industry-aligned curriculum with hands-on experience in software development and emerging technologies.',
            degree: 'B.Tech',
            duration: '4 Years',
        },
        {
            icon: <Stethoscope className="h-8 w-8" />,
            title: 'Health Sciences',
            description: 'Medical and allied health programs with modern laboratory facilities and clinical training.',
            degree: 'B.Sc/M.Sc',
            duration: '2-4 Years',
        },
        {
            icon: <Law className="h-8 w-8" />,
            title: 'Law & Business',
            description: 'Professional programs preparing graduates for leadership roles in corporate and legal sectors.',
            degree: 'LL.B/B.B.A',
            duration: '3 Years',
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: 'Master\'s Programs',
            description: 'Advanced research and coursework for specialization in your field of interest.',
            degree: 'M.Sc/M.Tech',
            duration: '2 Years',
        },
        {
            icon: <Lightbulb className="h-8 w-8" />,
            title: 'Research & Innovation',
            description: 'Cutting-edge research opportunities and innovation labs for aspiring scholars.',
            degree: 'Ph.D/Research',
            duration: 'Flexible',
        },
    ];
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(".program-text", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".program-text",
                start: "top 80%",
                markers: false,
            }
        });

        gsap.from(".program-card", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".program-card",
                start: "top 70%",
                markers: false,

            }
        });
        gsap.from("#consultation", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: "#consultation",
                start: "top 80%",
                markers: false,
            }
        });

    });

    return (
        <section className="section-py bg-background">
            <div className="container-landing">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="section-label mb-6 program-text">
                        <div className="section-label-dot" />
                        <span className="section-label-text">Our Programs</span>
                    </div>
                    <h2 className="font-fancy text-foreground mb-4 program-text">Academic Excellence</h2>
                    <p className="text-lg text-muted-foreground program-text">
                        Choose from our diverse range of undergraduate, postgraduate, and research programs designed to
                        prepare you for success in a rapidly evolving world.
                    </p>
                </div>
                {/* Programs Grid */}
                <div id="program-card-container" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                    {programs.map((program, index) => (
                        <div key={index} className="program-card">
                            <ProgramCard key={index} {...program} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Icon component for Law
function Law(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 2v20M2 8h20M2 16h20M8 2v20M16 2v20" />
        </svg>
    );
}

'use client';

import { BookOpen, Users, Globe, Award, Building2, Zap } from 'lucide-react';

interface AchievementProps {
    icon: React.ReactNode;
    number: string;
    label: string;
    description: string;
}

function AchievementCard({ icon, number, label, description }: AchievementProps) {
    return (
        <div className="group rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#0052FF]/10 hover:-translate-y-1">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-linear-to-br from-[#0052FF] to-[#4D7CFF] text-white group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="mb-4">
                <div className="text-4xl font-bold gradient-text mb-2">{number}</div>
                <h3 className="text-lg font-semibold text-foreground">{label}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    );
}

export function Achievements() {
    const achievements: AchievementProps[] = [
        {
            icon: <BookOpen className="h-7 w-7" />,
            number: '38',
            label: 'Academic Programs',
            description: 'Diverse programs spanning engineering, business, medicine, law, and humanities disciplines.',
        },
        {
            icon: <Users className="h-7 w-7" />,
            number: '32K+',
            label: 'Alumni Network',
            description: 'Successful graduates making impact in corporations, government, and entrepreneurship globally.',
        },
        {
            icon: <Building2 className="h-7 w-7" />,
            number: '14',
            label: 'Departments',
            description: 'Specialized departments with expert faculty and modern research facilities.',
        },
        {
            icon: <Globe className="h-7 w-7" />,
            number: '50+',
            label: 'International Partners',
            description: 'Partnerships with universities worldwide for student exchange and research collaboration.',
        },
        {
            icon: <Award className="h-7 w-7" />,
            number: '100%',
            label: 'Accredited',
            description: 'Full accreditation from Bangladesh University Grants Commission and international bodies.',
        },
        {
            icon: <Zap className="h-7 w-7" />,
            number: '200+',
            label: 'Faculty Members',
            description: 'Highly qualified educators with advanced degrees from renowned international institutions.',
        },
    ];

    return (
        <section className="section-py bg-foreground text-background relative overflow-hidden">
            {/* Dot pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Subtle glows */}
            <div className="absolute -right-32 top-0 h-64 w-64 rounded-full bg-[#4D7CFF]/10 blur-3xl" />
            <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#0052FF]/10 blur-3xl" />

            <div className="container-landing relative z-10">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="section-label mb-6 border-background/20 bg-background/10 w-fit">
                        <div className="section-label-dot bg-background" />
                        <span className="text-xs uppercase tracking-[0.15em] text-background/80">Achievements</span>
                    </div>
                    <h2 className="text-background/95 mb-4">By The Numbers</h2>
                    <p className="text-lg text-background/70">
                        Uttara University has consistently demonstrated excellence through measurable achievements
                        and recognition in higher education.
                    </p>
                </div>

                {/* Achievements Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement, index) => (
                        <AchievementCard key={index} {...achievement} />
                    ))}
                </div>
            </div>
        </section>
    );
}

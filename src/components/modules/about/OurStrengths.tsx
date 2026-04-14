'use client';

interface StrengthProps {
    title: string;
    items: string[];
}

function StrengthColumn({ title, items }: StrengthProps) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-[#0052FF] to-[#4D7CFF]" />
                {title}
            </h3>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-[#0052FF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-muted-foreground">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function OurStrengths() {
    const academicStrengths = [
        'Rigorous curriculum aligned with international standards',
        'Industry-relevant practical training and internships',
        'Research opportunities for undergraduate and graduate students',
        'Interdisciplinary learning approaches',
        'Continuous curriculum updates based on job market demands',
    ];

    const campusStrengths = [
        'State-of-the-art laboratories and research facilities',
        'Modern library with digital and physical resources',
        'High-speed internet and advanced technology infrastructure',
        'Recreational and sports facilities',
        'Green campus with sustainable practices',
    ];

    const studentLife = [
        'Vibrant student organizations and clubs',
        'Regular seminars, workshops, and guest lectures',
        'Sports and cultural events throughout the year',
        'Mentorship and career guidance programs',
        'Inclusive environment welcoming all backgrounds',
    ];

    return (
        <section className="section-py bg-background">
            <div className="container-landing">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="section-label mb-6">
                        <div className="section-label-dot" />
                        <span className="section-label-text">Competitive Edge</span>
                    </div>
                    <h2 className="text-foreground font-fancy mb-4">Why Uttara University Stands Out</h2>
                    <p className="text-lg text-muted-foreground">
                        We differentiate ourselves through our commitment to academic excellence, student success,
                        and contribution to society.
                    </p>
                </div>

                {/* Strengths Grid */}
                <div className="grid gap-12 md:grid-cols-3">
                    <StrengthColumn title="Academic Excellence" items={academicStrengths} />
                    <StrengthColumn title="Modern Campus" items={campusStrengths} />
                    <StrengthColumn title="Student Life" items={studentLife} />
                </div>

                {/* Bottom Highlight */}
                <div className="mt-16 rounded-2xl border-2 border-[#0052FF]/20 bg-linear-to-r from-[#0052FF]/5 to-[#4D7CFF]/5 p-8 md:p-12">
                    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-4">Career Success</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                Our graduates secure positions at leading national and international organizations.
                                Our dedicated career services office provides continuous support for professional development.
                            </p>
                            <div className="flex items-center gap-2 text-[#0052FF] font-semibold">
                                <span>98% placement rate within 6 months</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-4">Social Responsibility</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                                We believe in education that creates positive social impact. Our community engagement
                                programs and research initiatives address real-world challenges in Bangladesh and beyond.
                            </p>
                            <div className="flex items-center gap-2 text-[#0052FF] font-semibold">
                                <span>Active in 15+ social impact initiatives</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

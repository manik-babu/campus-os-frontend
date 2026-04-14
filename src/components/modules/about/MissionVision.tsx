'use client';
import { coreValues } from '@/data/about/mission';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function MissionVision() {
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        gsap.from(".mission-text", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".mission-text",
                start: "top 70%",
            },
        });
        gsap.from(".mission-line", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".mission-line",
                start: "top 70%",
            },
        })
        gsap.from(".mission-card", {
            opacity: 0,
            x: -200,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".mission-card",
                start: "top 70%",
            },
        });
        gsap.from(".vision-card", {
            opacity: 0,
            x: 200,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".vision-card",
                start: "top 80%",
            },
        });



    });

    return (
        <section className="section-py bg-background relative overflow-hidden">
            {/* Background Elements for Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated gradient blob 1 */}
                <div className="absolute -right-96 -top-96 h-96 w-96 rounded-full bg-gradient-to-br from-[#0052FF]/10 to-transparent blur-3xl opacity-60"
                    data-animatable="blob-1" />

                {/* Animated gradient blob 2 */}
                <div className="absolute -left-96 -bottom-96 h-96 w-96 rounded-full bg-gradient-to-tr from-[#4D7CFF]/10 to-transparent blur-3xl opacity-60"
                    data-animatable="blob-2" />

                {/* Decorative grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container-landing relative z-10">
                {/* Section Header */}
                <div className="mb-20 w-fit">
                    <div className="section-label mb-4 w-fit mission-text" data-animatable="label" >
                        <div className="section-label-dot" />
                        <span className="section-label-text">Our Foundation</span>
                    </div>
                    <h2 className="text-foreground font-fancy mb-2 mission-text" data-animatable="heading">
                        Mission &amp; Vision
                    </h2>
                    <div className="h-1 w-full mission-line bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] rounded-full"
                        data-animatable="line" />
                </div>

                {/* Mission & Vision Grid */}
                <div className="grid gap-8 lg:grid-cols-2 mb-16">
                    {/* Mission Card */}
                    <div
                        className="group relative opacity-100 rounded-3xl p-8 md:p-10 overflow-hidden mission-card"
                        data-animatable="mission-card"
                    >
                        {/* Background layers */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-[#F1F5F9] z-0" />
                        <div className="absolute inset-0 border-2 border-[#0052FF]/20 rounded-3xl z-0" />

                        {/* Animated accent bar */}
                        <div className="absolute top-0 left-0 h-1.5 w-0 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF]"
                            data-animatable="accent-bar-m" />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Icon Container */}
                            <div
                                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white mb-6 shadow-lg shadow-[#0052FF]/20 group-hover:scale-110 transition-transform duration-300"
                                data-animatable="mission-icon"
                            >
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>

                            {/* Heading */}
                            <h3 className="text-3xl font-bold text-foreground mb-4 leading-tight" data-animatable="mission-title">
                                Our Mission
                            </h3>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-animatable="mission-text">
                                To empower students with world-class education fostering innovation, critical thinking, and
                                ethical excellence. We create an environment where knowledge transforms into meaningful impact
                                on society.
                            </p>

                            {/* Key Points */}
                            <div className="space-y-3" data-animatable="mission-points">
                                {['Academic Excellence', 'Practical Experience', 'Global Perspective'].map((point, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#0052FF]" style={{ animationDelay: `${i * 0.1}s` }} />
                                        <span className="text-sm font-medium text-foreground">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div
                        className="group relative rounded-3xl p-8 md:p-10 overflow-hidden vision-card"
                        data-animatable="vision-card"
                    >
                        {/* Background layers */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/5 to-[#4D7CFF]/5 z-0" />
                        <div className="absolute inset-0 border-2 border-[#0052FF]/30 rounded-3xl z-0" />

                        {/* Animated accent bar */}
                        <div className="absolute top-0 right-0 h-1.5 w-0 bg-gradient-to-l from-[#0052FF] to-[#4D7CFF]"
                            data-animatable="accent-bar-v" />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Icon Container */}
                            <div
                                className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4D7CFF] to-[#0052FF] text-white mb-6 shadow-lg shadow-[#4D7CFF]/20 group-hover:scale-110 transition-transform duration-300"
                                data-animatable="vision-icon"
                            >
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>

                            {/* Heading */}
                            <h3 className="text-3xl font-bold text-foreground mb-4 leading-tight" data-animatable="vision-title">
                                Our Vision
                            </h3>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-animatable="vision-text">
                                To be recognized globally as a leading institution championing academic excellence, pioneering
                                research, and social responsibility. Shaping compassionate leaders who drive positive change.
                            </p>

                            {/* Key Points */}
                            <div className="space-y-3" data-animatable="vision-points">
                                {['Global Recognition', 'Research Leadership', 'Social Impact'].map((point, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-[#4D7CFF]" style={{ animationDelay: `${i * 0.1}s` }} />
                                        <span className="text-sm font-medium text-foreground">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className="mt-24 relative">
                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-16">
                        <div className="flex-1 h-px bg-gradient-to-r from-[#0052FF]/50 to-transparent" />
                        <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Core Values</p>
                        <div className="flex-1 h-px bg-gradient-to-l from-[#0052FF]/50 to-transparent" />
                    </div>

                    {/* Values Grid */}
                    <div id='value-container' className="grid relative gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="baal group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:shadow-[#0052FF]/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Hover background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/0 to-[#4D7CFF]/0 group-hover:from-[#0052FF]/5 group-hover:to-[#4D7CFF]/5 transition-all duration-300 z-0" />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div
                                        className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300"
                                        data-animatable={`value-icon-${index}`}
                                    >
                                        {value.icon}
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-lg font-bold text-foreground mb-3">{value.title}</h4>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>

                                    {/* Animated dot indicator */}
                                    <div className="mt-4 flex gap-1">
                                        {[0, 1, 2].map((dot) => (
                                            <div
                                                key={dot}
                                                className="h-1 w-1 rounded-full bg-[#0052FF]"
                                                style={{
                                                    opacity: 0.3 + (dot * 0.25),
                                                }}
                                                data-animatable={`dot-${index}-${dot}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Callout */}
                <div className="mt-20 rounded-3xl border-2 border-[#0052FF]/20 bg-gradient-to-br from-[#0052FF]/5 via-background to-[#4D7CFF]/5 p-8 md:p-12 text-center overflow-hidden relative"
                    data-animatable="callout"
                >
                    {/* Decorative background elements */}
                    <div className="absolute -right-20 -top-20 h-40 w-40 bg-[#0052FF]/10 rounded-full blur-3xl" />
                    <div className="absolute -left-20 -bottom-20 h-40 w-40 bg-[#4D7CFF]/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <p className="text-xl md:text-2xl text-foreground font-semibold mb-2 leading-tight" data-animatable="callout-text">
                            Our values guide every decision and action, ensuring we remain true to our commitment to
                            students and society.
                        </p>
                        <p className="text-muted-foreground" data-animatable="callout-author">
                            — Uttara University Leadership
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

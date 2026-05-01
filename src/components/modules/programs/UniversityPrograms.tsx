"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, BookOpen, Zap, Code2, Cpu, Wrench, Building2, Heart, Microscope, Database, BarChart3, TrendingUp, Sparkles, FlaskConical } from "lucide-react";
import { DepartmentCard } from "@/components/ui/DepartmentCard";
import CallToActionSimple from "@/components/landing/CallToActionSimple";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Department {
    name: string;
    code: string;
    description: string;
    icon: React.ReactNode;
}

interface Program {
    id: string;
    name: string;
    duration: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    departments: Department[];
}

const programs: Program[] = [
    {
        id: "bachelor",
        name: "Bachelor's Programs",
        duration: "4 Years",
        description: "Comprehensive undergraduate education in science and engineering disciplines",
        icon: <GraduationCap className="h-8 w-8" />,
        color: "bg-blue-500/10 text-blue-600",
        departments: [
            {
                name: "Computer Science & Engineering",
                code: "CSE",
                description: "Software development, AI, and computer systems",
                icon: <Code2 className="h-6 w-6" />
            },
            {
                name: "Electrical & Electronic Engineering",
                code: "EEE",
                description: "Power systems, electronics, and telecommunications",
                icon: <Zap className="h-6 w-6" />
            },
            {
                name: "Mechanical Engineering",
                code: "ME",
                description: "Thermal systems, design, and manufacturing",
                icon: <Wrench className="h-6 w-6" />
            },
            {
                name: "Civil Engineering",
                code: "CE",
                description: "Infrastructure, structures, and construction",
                icon: <Building2 className="h-6 w-6" />
            },
            {
                name: "Biomedical Engineering",
                code: "BME",
                description: "Medical devices and healthcare technology",
                icon: <Heart className="h-6 w-6" />
            },
            {
                name: "Chemistry",
                code: "CHEM",
                description: "Chemical processes and material science",
                icon: <FlaskConical className="h-6 w-6" />
            },
        ]
    },
    {
        id: "masters",
        name: "Master's Programs",
        duration: "2 Years",
        description: "Advanced education for specialized technical expertise and research",
        icon: <BookOpen className="h-8 w-8" />,
        color: "bg-purple-500/10 text-purple-600",
        departments: [
            {
                name: "Computer Science & Engineering",
                code: "MSC-CSE",
                description: "Advanced computing, machine learning, and systems",
                icon: <Cpu className="h-6 w-6" />
            },
            {
                name: "Electrical Engineering",
                code: "MSC-EEE",
                description: "Advanced power systems and control systems",
                icon: <Zap className="h-6 w-6" />
            },
            {
                name: "Engineering Management",
                code: "MSC-EM",
                description: "Project management and organizational leadership",
                icon: <BarChart3 className="h-6 w-6" />
            },
            {
                name: "Data Science",
                code: "MSC-DS",
                description: "Big data analytics and statistical modeling",
                icon: <TrendingUp className="h-6 w-6" />
            },
        ]
    },
    {
        id: "phd",
        name: "PhD Programs",
        duration: "3-5 Years",
        description: "Doctoral research programs advancing scientific knowledge and innovation",
        icon: <Zap className="h-8 w-8" />,
        color: "bg-amber-500/10 text-amber-600",
        departments: [
            {
                name: "Computer Science & Engineering",
                code: "PhD-CSE",
                description: "Research in AI, systems, and software engineering",
                icon: <Sparkles className="h-6 w-6" />
            },
            {
                name: "Electrical Engineering",
                code: "PhD-EEE",
                description: "Research in power systems and renewable energy",
                icon: <Zap className="h-6 w-6" />
            },
            {
                name: "Materials Science & Engineering",
                code: "PhD-MSE",
                description: "Advanced materials research and development",
                icon: <Microscope className="h-6 w-6" />
            },
        ]
    }
];

export default function UniversityPrograms() {
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(".program-hero", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.2,
        });
        [0, 1, 2].forEach((index) => {
            gsap.from(`.program-text-${index}`, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: `.program-text-${index}`,
                    start: "top 80%",
                    markers: false,
                }
            });

            gsap.from(`.program-card-${index}`, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: `.program-card-${index}`,
                    start: "top 70%",
                    markers: false,

                }
            });
        });
        gsap.from(".statistics>div", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".statistics",
                start: "top 80%",
                markers: false,
            }
        });
    });
    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background ">
            {/* Header Section */}
            <div className="py-16">
                <div className="container-landing space-y-4 text-center">
                    <div className="inline-block program-hero">
                        <div className="section-label mb-4 w-fit mission-text" data-animatable="label" >
                            <div className="section-label-dot" />
                            <span className="section-label-text">Academic Excellence</span>
                        </div>

                    </div>
                    <h1 className="program-hero text-4xl sm:text-5xl font-bold text-foreground font-fancy">
                        Our Academic Programs
                    </h1>
                    <p className="program-hero text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our comprehensive range of undergraduate, graduate, and doctoral programs
                        designed to shape {`tomorrow's`} innovators and leaders.
                    </p>
                </div>
            </div>

            {/* Programs Section */}
            <div className="section-py">
                <div className="container-landing space-y-16">
                    {programs.map((program, index) => (
                        <div key={program.id} className="space-y-8">
                            {/* Program Header */}
                            <div className="space-y-4">
                                <div className={`program-text-${index.toString()} inline-flex items-center gap-3 p-3 rounded-lg ${program.color}`}>
                                    {program.icon}
                                    <span className="font-semibold text-sm">{program.name}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className={`program-text-${index.toString()} flex items-center gap-3`}>
                                        <h2 className="text-3xl font-bold text-foreground font-fancy">
                                            {program.name}
                                        </h2>
                                        <Badge variant="outline" className="text-xs">
                                            {program.duration}
                                        </Badge>
                                    </div>
                                    <p className={`program-text-${index.toString()} text-muted-foreground text-lg`}>
                                        {program.description}
                                    </p>
                                </div>
                            </div>

                            {/* Departments Grid */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {program.departments.map((dept) => (
                                    <div
                                        key={dept.code}
                                        className={`program-card-${index.toString()}`}
                                    >
                                        <DepartmentCard
                                            icon={dept.icon}
                                            name={dept.name}
                                            description={dept.description}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            {index < programs.length - 1 && (
                                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Statistics Section */}
            <div className="section-py bg-white mb-20">
                <div className="container-landing">
                    <div className="statistics grid gap-8 md:grid-cols-4 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-blue-600 font-fancy">3</div>
                            <p className="text-muted-foreground">Program Types</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-purple-600 font-fancy">13</div>
                            <p className="text-muted-foreground">Departments</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-amber-600 font-fancy">500+</div>
                            <p className="text-muted-foreground">Annual Intake</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-green-600 font-fancy">95%</div>
                            <p className="text-muted-foreground">Placement Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <CallToActionSimple />
        </div >
    );
}
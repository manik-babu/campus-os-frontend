"use client";

import { useRouter } from "next/navigation";

interface ProgramCardProps {
    icon: React.ReactNode;
    name: string;
    description: string;
    className?: string;
}

export function DepartmentCard({ icon, name, description, className }: ProgramCardProps) {
    const router = useRouter();
    return (
        <div className={`group/card flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#0052FF]/10 hover:-translate-y-1 ${className}`}>
            {/* Icon Background */}
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white shadow-accent">
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
            </div>

            {/* CTA */}
            <button onClick={() => router.push("/admission")} className="mt-2 inline-flex cursor-pointer items-center gap-2 text-[#0052FF] text-sm font-medium transition-transform group-hover/card:translate-x-1">
                Apply now →
            </button>
        </div>
    );
}
'use client';

interface TestimonialProps {
    quote: string;
    author: string;
    role: string;
    program: string;
}

function TestimonialCard({ quote, author, role, program }: TestimonialProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#0052FF]/10">
            {/* Quote Mark */}
            <div className="text-5xl font-bold text-[#0052FF]/20 mb-4">&quot;</div>

            {/* Quote */}
            <p className="text-foreground mb-6 italic">{quote}</p>

            {/* Author Info */}
            <div className="border-t border-border pt-6 flex items-center gap-4">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] text-white flex items-center justify-center font-semibold">
                    {author.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-foreground">{author}</p>
                    <p className="text-sm text-muted-foreground">{role} • {program}</p>
                </div>
            </div>
        </div>
    );
}

export function Testimonials() {
    const testimonials: TestimonialProps[] = [
        {
            quote:
                'Uttara University transformed my academic journey. The faculty guidance and world-class facilities helped me secure a job at top tech company before graduation.',
            author: 'Arjun Singh',
            role: 'Software Engineer',
            program: 'B.Tech CSE',
        },
        {
            quote:
                'The placement support and internship opportunities were exceptional. I gained real-world experience that made me job-ready.',
            author: 'Priya Sharma',
            role: 'Data Scientist',
            program: 'M.Sc Data Science',
        },
        {
            quote:
                'What impressed me most was the holistic approach to education. Beyond academics, I developed leadership skills and lifelong friendships.',
            author: 'Marcus Johnson',
            role: 'MBA Student',
            program: 'Business Administration',
        },
        {
            quote:
                'The global exchange program opened doors I never imagined. I studied in three countries during my undergraduate years.',
            author: 'Lisa Chen',
            role: 'International Student',
            program: 'B.Sc Medical Sciences',
        },
        {
            quote:
                'Uttara University invested in my research journey. My thesis work led to publications in international journals.',
            author: 'Dr. Ahmed Hassan',
            role: 'Research Scholar',
            program: 'Ph.D Physics',
        },
        {
            quote:
                'The entrepreneurship support and mentoring from faculty helped me launch my startup. Best decision I made during my time here.',
            author: 'Sneha Patel',
            role: 'Founder & CEO',
            program: 'B.B.A Entrepreneurship',
        },
    ];

    return (
        <section className="section-py bg-background">
            <div className="container-landing">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="section-label mb-6">
                        <div className="section-label-dot" />
                        <span className="section-label-text">Student Stories</span>
                    </div>
                    <h2 className="font-fancy text-foreground mb-4">Hear from Our Alumni</h2>
                    <p className="text-lg text-muted-foreground">
                        Real stories from students who transformed their futures at Uttara University. Their success is our
                        pride.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}

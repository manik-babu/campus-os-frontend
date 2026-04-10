'use client';

export function GlobalReach() {
    const regions = [
        { region: 'North America', universities: '15+', description: 'Partnerships with leading US & Canadian institutions' },
        { region: 'Europe', universities: '12+', description: 'Collaborations with UK, Germany, France, and more' },
        { region: 'Asia', universities: '18+', description: 'Strong network across South and Southeast Asia' },
        { region: 'Middle East', universities: '8+', description: 'Growing presence in Gulf Cooperation Council states' },
    ];

    return (
        <section className="section-py bg-background">
            <div className="container-landing">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <div className="section-label mb-6">
                        <div className="section-label-dot" />
                        <span className="section-label-text">Global Presence</span>
                    </div>
                    <h2 className="text-foreground mb-4">International Recognition &amp; Partnerships</h2>
                    <p className="text-lg text-muted-foreground">
                        Uttara University maintains strong partnerships and collaborations with institutions worldwide,
                        facilitating student exchange, joint research, and academic excellence.
                    </p>
                </div>

                {/* Partnerships Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    {regions.map((item, index) => (
                        <div key={index} className="rounded-2xl border border-border bg-card p-6 shadow-md transition-all hover:shadow-lg hover:shadow-[#0052FF]/10">
                            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-[#0052FF] to-[#4D7CFF] text-white mb-4">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">{item.region}</h3>
                            <p className="text-3xl font-bold gradient-text mb-2">{item.universities}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Recognitions */}
                <div className="mt-16 rounded-2xl border-2 border-[#0052FF]/20 bg-[#0052FF]/5 p-8 md:p-12">
                    <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">Recognitions & Accreditations</h3>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-white border-2 border-[#0052FF]/20 mb-4">
                                <svg className="h-8 w-8 text-[#0052FF]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-foreground mb-2">UGC Accredited</h4>
                            <p className="text-sm text-muted-foreground">Fully accredited by Bangladesh University Grants Commission</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-white border-2 border-[#0052FF]/20 mb-4">
                                <svg className="h-8 w-8 text-[#0052FF]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.757a1 1 0 01-.940 1.017A17.961 17.961 0 0112 19c-4.4 0-8.373-.936-11.809-2.606A1 1 0 011 16.69v-6.644c0-1.592.694-3.102 1.898-4.084a3.066 3.066 0 002.368.806c1.323 0 2.53-1.057 2.997-2.906a3.066 3.066 0 003.596-3.066V3.455z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-foreground mb-2">ISO Certified</h4>
                            <p className="text-sm text-muted-foreground">ISO 9001:2015 certified quality management system</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-white border-2 border-[#0052FF]/20 mb-4">
                                <svg className="h-8 w-8 text-[#0052FF]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h.01a1 1 0 110 2H12zm-2 2a1 1 0 100-2 1 1 0 000 2zm0 2a1 1 0 11-2 0 1 1 0 012 0zm4 2a1 1 0 100-2 1 1 0 000 2zm0-2a1 1 0 11-2 0 1 1 0 012 0zm-4 2a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-foreground mb-2">HEQEP Member</h4>
                            <p className="text-sm text-muted-foreground">Open member of Higher Education Quality Enhancement Project</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

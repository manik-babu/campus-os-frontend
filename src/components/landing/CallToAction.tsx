'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export function CallToAction() {
    return (
        <section className="section-py bg-foreground dark:bg-background text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Radial glows */}
            <div className="absolute -right-48 -top-48 h-96 w-96 rounded-full bg-[#4D7CFF]/15 blur-3xl" />
            <div className="absolute -left-48 bottom-0 h-96 w-96 rounded-full bg-[#0052FF]/10 blur-3xl" />

            <div className="container-landing relative z-10">
                <div className="grid gap-12 md:gap-8 lg:grid-cols-2 items-center">
                    {/* Left side - Content */}
                    <div>
                        <div className="section-label mb-6 border-background/20 bg-background/10 w-fit">
                            <div className="section-label-dot bg-background" />
                            <span className="text-xs uppercase tracking-[0.15em] text-white/80">Ready?</span>
                        </div>
                        <h2 className="font-fancy text-white/95 mb-4">Start Your University Journey Today</h2>
                        <p className="text-lg text-white/70 mb-8">
                            Whether youre interested in our programs, want to schedule a campus visit, or have questions about
                            admissions, our team is ready to help you take the next step.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-background/10">
                                    <Phone className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/60">Call us</p>
                                    <p className="font-semibold text-white">+880 XX XXXX XXXX</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-background/10">
                                    <Mail className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/60">Email us</p>
                                    <p className="font-semibold text-white">admissions@uttarauniversity.edu</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-background/10">
                                    <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/60">Visit us</p>
                                    <p className="font-semibold text-white">Uttara, Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-wrap gap-3">
                            <button className="px-6 py-2 rounded-xl border border-background/30 text-white hover:border-background hover:bg-background/10 transition-all font-medium text-sm">
                                View Brochure
                            </button>
                            <button className="px-6 py-2 rounded-xl border border-background/30 text-white hover:border-background hover:bg-background/10 transition-all font-medium text-sm">
                                Virtual Tour
                            </button>
                        </div>
                    </div>

                    {/* Right side - Application form */}
                    <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-background/20">
                        <h3 className="text-2xl font-fancy font-semibold text-white mb-6">Apply Now</h3>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 rounded-lg bg-background/20 border border-background/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-background/50 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-background/20 border border-background/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-background/50 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Program of Interest
                                </label>
                                <select className="w-full px-4 py-3 rounded-lg bg-background/20 border border-background/30 text-foreground focus:outline-none focus:ring-2 focus:ring-background/50 focus:border-transparent">
                                    <option value="" className="text-foreground">Select a program</option>
                                    <option value="btech" className="text-foreground">B.Tech Computer Science</option>
                                    <option value="bsc" className="text-foreground">B.Sc Science</option>
                                    <option value="bba" className="text-foreground">B.B.A Business</option>
                                    <option value="msc" className="text-foreground">M.Sc Advanced Studies</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    Message
                                </label>
                                <textarea
                                    placeholder="Tell us about yourself"
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg bg-background/20 border border-background/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-background/50 focus:border-transparent resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Submit Application
                            </button>

                            <p className="text-xs text-white/60 text-center">
                                Well get back to you within 24 hours
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

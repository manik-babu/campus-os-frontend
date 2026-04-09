'use client';
// Facebook, Twitter, Linkedin, Instagram,
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-background/80">
            {/* Main Footer Content */}
            <div className="container-landing py-16 md:py-20">
                <div className="grid gap-12 md:grid-cols-5">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Uttara</h3>
                            <p className="text-base font-semibold text-white/90">University</p>
                        </div>
                        <p className="text-sm text-white/70 mb-6 leading-relaxed">
                            Empowering minds and shaping futures through innovative education and excellence since 1999.
                        </p>
                        {/* Social Links */}
                        {/* <div className="flex gap-4">
                            {[
                                { icon: Facebook, label: 'Facebook' },
                                { icon: Twitter, label: 'Twitter' },
                                { icon: Linkedin, label: 'LinkedIn' },
                                { icon: Instagram, label: 'Instagram' },
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-background/10 text-background hover:bg-background/20 transition-colors"
                                    aria-label={label}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div> */}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Programs', 'Admissions', 'Faculty', 'Alumni'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {['News & Events', 'Library', 'Student Portal', 'Careers', 'Support'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Contact</h4>
                        <div className="space-y-3">
                            <a href="tel:+880" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                                <Phone className="h-4 w-4" />
                                <span>+880 XX XXXX XXXX</span>
                            </a>
                            <a href="mailto:info@uttarauniversity.edu" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                                <Mail className="h-4 w-4" />
                                <span>info@uttarauniversity.edu</span>
                            </a>
                            <div className="flex items-start gap-2 text-sm text-white/70">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>Uttara, Dhaka<br />Bangladesh</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-white/10" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
                    <p>© {currentYear} Uttara University. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Cookie Settings
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

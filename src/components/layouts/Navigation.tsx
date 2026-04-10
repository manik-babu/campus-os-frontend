'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '../ui/mode-toggle';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Programs', href: '/programs' },
        { label: 'About', href: '/about' },
        { label: 'Admissions', href: '/admission' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="container-landing px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">U</span>
                        </div>
                        <span className="font-bold text-foreground group-hover:text-[#0052FF] transition-colors">Uttara</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <ModeToggle />
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button className="btn-primary text-sm h-10 gap-1.5 px-4">
                            Apply Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="h-5 w-5 text-foreground" />
                        ) : (
                            <Menu className="h-5 w-5 text-foreground" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden border-t border-border py-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button className="w-full mt-4 btn-primary text-sm">
                            Apply Now
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

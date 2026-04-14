'use client';

import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '../ui/mode-toggle';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';

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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
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
                        <Link href="/erp-login" className="btn-primary text-sm h-10 gap-1.5 px-4">
                            <LogIn className='w-4 h-4' /> MY ERP
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger className="md:hidden flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
                            Menu
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.633h16.5M3.75 12h16.5m-16.5 5.367h16.5" />
                            </svg>
                        </SheetTrigger>
                        <SheetContent className='bg-background/95 backdrop-blur-sm'>
                            <SheetTitle className='hidden'></SheetTitle>
                            <div className="md:hidden border-t border-border py-4 space-y-2 w-full px-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsOpen(v => !v)}
                                        className="block w-full px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Link href="/erp-login" className="btn-primary text-sm h-10 gap-1.5 px-4 w-full">
                                    <LogIn className='w-4 h-4' /> MY ERP
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}

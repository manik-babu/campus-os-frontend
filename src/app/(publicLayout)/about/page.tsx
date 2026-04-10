import { Metadata } from 'next';
import { GlobalReach } from '@/components/modules/about/GlobalReach';
import { OurStrengths } from '@/components/modules/about/OurStrengths';
import { Achievements } from '@/components/modules/about/Achievements';
import { MissionVision } from '@/components/modules/about/MissionVision';
import { AboutHero } from '@/components/modules/about/AboutHero';
import { History } from '@/components/modules/about';

export const metadata: Metadata = {
    title: 'About Uttara University | Excellence in Higher Education Since 2003',
    description:
        'Discover Uttara University\'s journey of excellence, mission, vision, and commitment to world-class education. Learn about our history, achievements, and why students choose UU.',
    keywords: [
        'Uttara University About',
        'University History',
        'Mission and Vision',
        'Academic Excellence',
        'Campus Facilities',
        'International Partnerships',
        'Alumni Network',
        'Faculty',
        'Educational Programs',
        'Why Choose UU',
        'University Rankings',
        'Uttara University Bangladesh',
    ],
};

export default function About() {
    return (
        <div>
            <AboutHero />
            <MissionVision />
            <History />
            <Achievements />
            <OurStrengths />
            <GlobalReach />
        </div>
    );
}
import { Footer } from "@/components/layouts/Footer";
import { Navigation } from "@/components/layouts/Navigation";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Uttara University",
    description: "Uttara University is a leading institution of higher education in Bangladesh, offering a wide range of undergraduate and postgraduate programs across various disciplines. With a commitment to academic excellence, research, and community engagement, Uttara University provides students with a dynamic learning environment that fosters intellectual growth and prepares them for successful careers in their chosen fields.",
    keywords: [
        "Uttara University",
        "Higher Education in Bangladesh",
        "Undergraduate Programs",
        "Postgraduate Programs",
        "Academic Excellence",
        "Research Opportunities",
        "Community Engagement",
        "Dynamic Learning Environment",
        "Career Preparation",
        "UU Bangladesh",
        "Uttara University Programs",
        "Uttara University Research",
        "Uttara University Community",
        "Uttara University Careers",
        "UU Education",
        "Uttara University Campus",
        "Uttara University Faculty",
        "Uttara University Students",
        "Uttara University Alumni",
        "Uttara University Admissions",
        "Uttara University Scholarships",
        "Uttara University Events",
        "Uttara University News",
        "Uttara University Rankings",
        "Uttara University Facilities",
        "Uttara University International Partnerships",
        "Uttara University Made by Manik",
        "UU Bangladesh Made by Manik",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen w-full bg-background">
            {/* Fixed Navigation */}
            <Navigation />

            {/* Main Content */}
            <div className="pt-16">
                {children}
            </div>
            <Footer />
        </main>
    );
}
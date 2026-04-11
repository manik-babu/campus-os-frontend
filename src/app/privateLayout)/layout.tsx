import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Uttara University",
    description: "Welcome to Uttara University!",
}

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>Private Layout</h1>
            {children}
        </div>
    );
}
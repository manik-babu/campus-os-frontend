"use client";

import { useRouter } from "next/navigation";

export default function CallToActionSimple() {
    const router = useRouter();
    return (
        < div className="text-center mb-44" >
            <h2 className="font-fancy text-white/95 mb-4">Start Your University Journey Today</h2>

            <p className="text-muted-foreground mb-6">
                Ready to write your success story? Join thousands of Uttara University graduates thriving worldwide.
            </p>
            <button onClick={() => router.push('/admission')} className="btn-primary cursor-pointer">
                Start Your Journey
            </button>
        </div >
    );
}
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

export default function CallToActionSimple() {
    const router = useRouter();
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(`.txt`, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: `.txt`,
                start: "top 80%",
                markers: false,
            }
        });

        gsap.from(`.action-btn`, {
            opacity: 0,
            duration: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: `.action-btn`,
                start: "top 80%",
                markers: false,

            }
        });
    })
    return (
        < div className="text-center mb-44" >
            <h2 className="font-fancy text-white/95 mb-4 txt">Start Your University Journey Today</h2>

            <p className="text-muted-foreground mb-6 txt">
                Ready to write your success story? Join thousands of Uttara University graduates thriving worldwide.
            </p>
            <button onClick={() => router.push('/admission')} className="btn-primary cursor-pointer action-btn">
                Start Your Journey
            </button>
        </div >
    );
}
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

interface ContactInfo {
    icon: React.ReactNode;
    label: string;
    value: string;
    subtext?: string;
}

const contactInfo: ContactInfo[] = [
    {
        icon: <MapPin className="h-6 w-6" />,
        label: "Main Campus",
        value: "123 University Avenue",
        subtext: "City, State 12345"
    },
    {
        icon: <Phone className="h-6 w-6" />,
        label: "Phone",
        value: "+880 1234 567 890",
        subtext: "Available 9 AM - 5 PM"
    },
    {
        icon: <Mail className="h-6 w-6" />,
        label: "Email",
        value: "info@university.edu",
        subtext: "Response within 24 hours"
    },
    {
        icon: <Clock className="h-6 w-6" />,
        label: "Office Hours",
        value: "Monday - Friday",
        subtext: "9:00 AM - 5:00 PM"
    }
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-background to-blue-50/30">
            {/* Header Section */}
            <div className="py-16">
                <div className="container-landing space-y-4 text-center">
                    <div className="inline-block">
                        <div className="section-label mb-4 w-fit mission-text" data-animatable="label" >
                            <div className="section-label-dot" />
                            <span className="section-label-text">Get In Touch</span>
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-fancy">
                        Contact Us
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions? {`We'd`} love to hear from you. Send us a message and {`we'll`}
                        respond as soon as possible.
                    </p>
                </div>
            </div>

            {/* Main Contact Section */}
            <div className="py-16">
                <div className="container-landing grid gap-12 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div >

                        <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-background/20">
                            <h3 className="text-2xl font-fancy font-semibold text-white mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Field>
                                    <FieldLabel htmlFor={"contact-name"}>Full Name</FieldLabel>
                                    <Input
                                        id={"contact-name"}
                                        placeholder={"Enter your full name"}
                                        type={"text"}
                                        className="outline-none border-none"
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor={"contact-email"}>Email</FieldLabel>
                                    <Input
                                        id={"contact-email"}
                                        placeholder={"Enter your email address"}
                                        type={"text"}
                                        className="outline-none border-none"
                                        required
                                    />
                                </Field>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        Message
                                    </label>
                                    <Textarea
                                        required
                                        placeholder="Tell us more about your inquiry..."
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg bg-background/20 border border-background/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-background/50 focus:border-transparent resize-none"
                                    />
                                </div>

                                <p className="text-xs text-white/60">
                                    {`We'll`} get back to you within 24 hours
                                </p>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    {
                                        isSubmitting ? <><Spinner /> Sending...</> : "Send Message"
                                    }
                                </button>

                            </form>
                        </div>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="space-y-4">
                        {contactInfo.map((info, idx) => (
                            <div key={idx} className="border-border/50 hover:shadow-lg transition-all duration-300">
                                <CardContent className="pt-6">
                                    <div className="space-y-3 flex items-start gap-4">
                                        <div className="inline-flex p-3 rounded-lg bg-blue-500/10 text-blue-600">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{info.label}</p>
                                            <p className="font-semibold text-foreground">{info.value}</p>
                                            {info.subtext && (
                                                <p className="text-xs text-muted-foreground mt-1">{info.subtext}</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Map Section Placeholder */}
            <div className="py-20">
                <div className="container-landing">
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-foreground font-fancy">
                                Visit Us
                            </h2>
                        </div>
                        <Card className="h-[80dvh] p-0 overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4068.2475150796035!2d90.36020462119326!3d23.883434023831814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c43aad03699f%3A0xd7744072ad2d345e!2sUttara%20University!5e0!3m2!1sen!2sbd!4v1777664594129!5m2!1sen!2sbd" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
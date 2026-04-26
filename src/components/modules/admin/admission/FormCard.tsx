"use client";

import { IAdmissionForm } from "@/@types/admission";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formattedDate, formattedTime } from "@/utils/FormattedTime";
import { useRouter } from "next/navigation";

export default function FormCard({ form }: { form: IAdmissionForm }) {
    const router = useRouter();
    return (
        <Card onClick={() => router.push(`/admin/admission-forms/${form.id}`)} className="flex flex-row items-center gap-4 p-4 hover:bg-accent cursor-pointer">
            <Avatar className="h-20 w-20 border-2 border-background shadow-lg rounded-md">
                <AvatarImage className="rounded-md" src={form.image ? form.image : `https://api.dicebear.com/7.x/initials/svg?seed=${form.name}`} />
                <AvatarFallback className="text-xl font-bold rounded-md">
                    {form.name[0]}
                </AvatarFallback>
            </Avatar>
            <section>
                <h3>{form.name}</h3>
                <p className="text-muted-foreground text-sm font-medium">{formattedDate(form.createdAt)} at {formattedTime(form.createdAt)}</p>
            </section>
        </Card>
    );
}
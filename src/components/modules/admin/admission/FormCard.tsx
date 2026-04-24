"use client";

import { IAdmissionForm } from "@/@types/admission";
import { Card } from "@/components/ui/card";
import { formattedDate, formattedTime } from "@/utils/FormattedTime";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FormCard({ form }: { form: IAdmissionForm }) {
    const router = useRouter();
    return (
        <Card onClick={() => router.push(`/admin/admission-forms/${form.id}`)} className="flex flex-row items-center gap-4 p-4 hover:bg-accent cursor-pointer">
            <section>
                <Image src={form.image} alt={form.name} width={100} height={100} className="rounded-md" />
            </section>
            <section>
                <h3>{form.name}</h3>
                <p className="text-muted-foreground text-sm font-medium">{formattedDate(form.createdAt)} at {formattedTime(form.createdAt)}</p>
            </section>
        </Card>
    );
}
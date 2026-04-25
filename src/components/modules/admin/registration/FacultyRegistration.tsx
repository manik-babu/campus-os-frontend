"use client"

import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export default function FacultyRegistration() {
    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "FACULTY",
            gender: "",
            departmentId: "",
            designation: "",
            phoneNumber: "",
            salary: 0,
            bloodGroup: "",
            presentAddress: "",
            permanentAddress: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    })
    return (
        <div>
            <h1>This is faculty registration page</h1>
        </div>
    );
}
"use client";

import { ClassPostType } from "@/@types/classes";
import { IPostInput } from "@/@types/facultyClass";
import { DatePickerSimple } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
const types = [
    { label: "Announcement", value: "ANNOUNCEMENT" },
    { label: "Assignment", value: "ASSIGNMENT" },
    { label: "Material", value: "MATERIAL" },
];

interface IAddPostProps {
    classId: string;
    parentId?: string;
    onPost: (data: IPostInput) => Promise<void>;
}
export default function AddPost({ classId, parentId, onPost }: IAddPostProps) {
    const [message, setMessage] = useState<string>("");
    const [type, setType] = useState<null | ClassPostType>(null);
    const [assignmentDeadLine, setAssignmentDeadLine] = useState<Date | undefined>(undefined);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        if (!type && !parentId) {
            setFormError("Please select a post type");
            setLoading(false);
            return;
        }
        else if (type === ClassPostType.ASSIGNMENT && !assignmentDeadLine) {
            setFormError("Please select assignment deadline");
            setLoading(false);
            return;
        }
        else if (!message && !attachment) {
            setFormError("Please enter a message or attach a file");
            setLoading(false);
            return;
        }
        const deadlineString = assignmentDeadLine ? assignmentDeadLine.toISOString() : null;
        try {
            await onPost({
                courseOfferingId: classId,
                message: message === "" ? null : message,
                type: !type && parentId ? ClassPostType.COMMENT : type!,
                parentId: parentId || null,
                assignmentDeadLine: deadlineString,
                attachment: attachment || null,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while adding the post");
        }
        setLoading(false);
        setMessage("");
        setType(null);
        setAssignmentDeadLine(undefined);
        setAttachment(null);
        setFormError(null);
    };
    return (
        <div className="my-6 border border-border rounded-xl relative bg-accent">
            <div className="w-full h-fit text-sm text-muted-foreground px-4 py-2">
                {
                    attachment && <div className="flex items-center gap-2 border border-border rounded-full w-fit px-2">
                        <p>{attachment.name}</p>
                        <span className="text-red-500">
                            <Plus className="h-4 w-4 cursor-pointer rotate-45" onClick={() => setAttachment(null)} />
                        </span>
                    </div>
                }
            </div>
            <Textarea
                placeholder="What's on your mind?"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    setFormError(null);
                }}
                className={cn("resize-none p-4 bg-transparent! rounded-xl shadow-none border-none focus-visible:border-none focus-visible:ring-0")}
            />
            {
                formError && <p className="text-red-500 text-sm px-4">{formError}</p>
            }
            <div className="flex items-center justify-between px-4 py-2 w-full">
                <section className="flex items-center gap-2">
                    <div>
                        <label htmlFor="attachment" className="cursor-pointer">
                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </label>
                        <Input
                            id="attachment"
                            type="file"
                            className="hidden"
                            accept=".jpg,.jpeg,.pdf,image/jpeg,application/pdf"
                            onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                    {
                        !Boolean(parentId) && <Select
                            onValueChange={(value) => {
                                setType(value as ClassPostType);
                                setFormError(null);
                            }}
                        >
                            <SelectTrigger className="w-fit rounded-full">
                                <SelectValue placeholder="Post type" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((t) => (
                                    <SelectItem key={t.value} value={t.value}>
                                        {t.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    }
                    {
                        type === ClassPostType.ASSIGNMENT && <DatePickerSimple
                            label="Deadline"
                            date={assignmentDeadLine}
                            setDate={setAssignmentDeadLine}
                            className="rounded-full!"
                            setTimeToEndOfDay={true}
                        />
                    }
                </section>
                <Button
                    className="rounded-full! px-4"
                    onClick={handleSubmit}
                    disabled={loading || Boolean(formError)}
                >
                    {loading ? <><Spinner /> Posting</> : "Post"}
                </Button>
            </div>
        </div>
    );
}
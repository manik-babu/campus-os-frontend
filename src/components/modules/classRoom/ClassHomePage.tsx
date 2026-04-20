"use client";

import { IClassPost, IClassPostData } from "@/@types/classes";
import { ICourseOfferingInfo } from "@/@types/offeringInfo";
import { ISessionUser, UserRole } from "@/@types/session";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addCoursePost, getClassPosts } from "@/services/classes.service";
import { Search, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Field,
    FieldContent,
    FieldLabel,
    FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddPost from "../facultyClass/AddPosts";
import { IPostInput } from "@/@types/facultyClass";
import PostCard from "./PostCard";
import PostCardSkeleton from "@/components/skeletons/class/PostCardSkeleton";
interface ClassRoomHomePageProps {
    posts: IClassPostData;
    user: ISessionUser;
    classDetails: ICourseOfferingInfo;
}
const types = [
    { label: "All", value: "ALL" },
    { label: "Announcement", value: "ANNOUNCEMENT" },
    { label: "Assignment", value: "ASSIGNMENT" },
    { label: "Material", value: "MATERIAL" },
];

export default function ClassRoomHomePage({ posts: initialPosts, user, classDetails }: ClassRoomHomePageProps) {
    const [data, setData] = useState<IClassPostData>(initialPosts);

    const [search, setSearch] = useState<string>("");
    const [type, setType] = useState<string>("ALL");
    const [orderBy, setOrderBy] = useState<string>("desc");
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPosts = async (page?: number) => {
        setLoading(true);
        try {
            const filter = { search, type, orderBy, page: page || 1 };
            console.log({
                filter
            })
            const res = await getClassPosts(classDetails.offeringId, filter);
            if (res.ok && res.data) {
                setData(res.data);
            } else {
                toast.error(res.message || "Failed to fetch posts");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while fetching posts");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [type, orderBy]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            fetchPosts();
        }
    };

    const handlePost = async (d: IPostInput): Promise<void> => {
        try {
            const res = await addCoursePost(d);
            if (res.ok) {
                toast.success("Post added successfully");
                fetchPosts();
            } else {
                toast.error(res.message || "Failed to add post");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while adding the post");
        }
    };
    return (
        <div >
            <div className="border border-border rounded-lg bg-card p-6">
                <h3 className=" font-bold mb-2">{classDetails.courseCode} - {classDetails.courseName}</h3>
                {
                    user.role === UserRole.FACULTY ?
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">{classDetails.department} - {classDetails.batch}</span>
                            </span>
                        </div>
                        :
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">{classDetails.facultyName}</span>
                            </span>
                        </div>
                }
                <div className="mt-8">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by code, title..."
                                className="pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeydown}
                            />
                        </div>
                        <Select
                            value={type}
                            onValueChange={setType}
                        >
                            <SelectTrigger className="ml-2">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((t) => (
                                    <SelectItem key={t.value} value={t.value}>
                                        {t.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-4">
                        <RadioGroup onValueChange={setOrderBy} defaultValue="desc" className="max-w-sm flex justify-center items-center">
                            <FieldLabel htmlFor="newest" className="cursor-pointer">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Newest</FieldTitle>
                                    </FieldContent>
                                    <RadioGroupItem value="desc" id="newest" className="hidden" />
                                </Field>
                            </FieldLabel>
                            <FieldLabel htmlFor="oldest" className="cursor-pointer">
                                <Field orientation="horizontal">
                                    <FieldContent>
                                        <FieldTitle>Oldest</FieldTitle>
                                    </FieldContent>
                                    <RadioGroupItem value="asc" id="oldest" className="hidden" />
                                </Field>
                            </FieldLabel>
                        </RadioGroup>
                    </div>
                </div>
            </div>
            {
                user.role === UserRole.FACULTY && <AddPost classId={classDetails.offeringId} onPost={handlePost} />
            }
            <div className="mt-6 space-y-4">

                {
                    loading ?
                        <PostCardSkeleton />
                        :
                        data.posts.length === 0 ? (
                            <Card className="flex items-center justify-center border-dashed border-2 border-border h-32 text-muted-foreground">
                                No posts found.
                            </Card>
                        ) : (
                            data.posts.map((post: IClassPost) => (
                                <PostCard key={post.id} post={post} user={user} />
                            ))
                        )
                }
            </div>
        </div>
    );
}
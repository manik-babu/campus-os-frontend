"use client";

import { ClassPostType, IClassPost, IPostCommentData } from "@/@types/classes";
import { ISessionUser, UserRole } from "@/@types/session";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addCoursePost, getComments } from "@/services/classes.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PostCard from "./PostCard";
import AddPost from "../facultyClass/AddPosts";
import { IPostInput } from "@/@types/facultyClass";
import PostCardSkeleton from "@/components/skeletons/class/PostCardSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { isTimePassed } from "@/utils/isTimePassed";

export default function CommentSection({ post, user }: { post: IClassPost; user: ISessionUser }) {

    const [data, setData] = useState<IPostCommentData | null>(null);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState<"asc" | "desc">("asc");


    const fetchComments = async (page?: number) => {
        setLoading(true);
        try {
            const res = await getComments(post.id, { orderBy: sort, page: page || 1 });
            if (res.ok && res.data) {
                setData(res.data);
            } else {
                toast.error(res.message || "Failed to fetch comments");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while fetching comments");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (post.type !== ClassPostType.ASSIGNMENT || user.role === UserRole.FACULTY)
            fetchComments();
    }, []);
    const handleComment = async (d: IPostInput): Promise<void> => {
        if (post.type === ClassPostType.ASSIGNMENT) {
            const isTime = isTimePassed(post.assignmentDeadLine!);
            if (isTime) {
                toast.error("Submission Closed", {
                    description: "You cannot submit your assignment after the deadline has passed"
                });
                return;
            }
        }
        try {
            const res = await addCoursePost(d);
            if (res.ok) {
                toast.success("Post added successfully");
            } else {
                toast.error(res.message || "Failed to add post");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while adding the post");
        }
    };

    return (
        <ScrollArea className="mt-4 h-dvh overflow-y-auto">
            <AddPost classId={post.courseOfferingId} parentId={post.id} onPost={handleComment} />
            <RadioGroup onValueChange={(value) => {
                setSort(value as "asc" | "desc");
                fetchComments();
            }}
                defaultValue="asc"
                className="max-w-sm flex items-center"
            >
                <FieldLabel htmlFor="newest-comments" className="cursor-pointer w-fit!">
                    <Field orientation="horizontal">
                        <FieldContent >
                            <FieldTitle>Newest</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="desc" id="newest-comments" className="hidden" />
                    </Field>
                </FieldLabel>
                <FieldLabel htmlFor="oldest-comments" className="cursor-pointer w-fit!">
                    <Field orientation="horizontal">
                        <FieldContent>
                            <FieldTitle>Oldest</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="asc" id="oldest-comments" className="hidden" />
                    </Field>
                </FieldLabel>
            </RadioGroup>
            <div className="mt-4 space-y-4">
                {
                    loading ? (
                        <PostCardSkeleton />
                    ) : (
                        data ?
                            (data.comments.length <= 0 ?
                                <div className="w-full h-32 flex justify-center items-center text-muted-foreground">
                                    <p>{post.type === ClassPostType.ASSIGNMENT ? "No submissions yet" : "No comments yet"}</p>
                                </div>
                                :
                                data?.comments.map((comment) => (
                                    <PostCard key={comment.id} post={comment} user={user} comments="hidden" />
                                )))
                            :
                            <div className="w-full h-32 flex justify-center items-center text-muted-foreground">
                                <p>Assignments are hidden</p>
                            </div>
                    )
                }
            </div>
        </ScrollArea>
    );
}
"use client";

import { IClassPost, ClassPostType } from "@/@types/classes";
import { ISessionUser } from "@/@types/session";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, BookOpen, FileText, Megaphone, MessageCircle } from "lucide-react";
import { useState } from "react";
import CommentSection from "./CommentSection";
import { cn } from "@/lib/utils";
import { isTimePassed } from "@/utils/isTimePassed";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostCard({ post, user, comments = "visible" }: { post: IClassPost, user: ISessionUser, comments?: "visible" | "hidden" }) {
    const [commentOpen, setCommentOpen] = useState<boolean>(false);
    const getPostTypeIcon = (type: ClassPostType) => {
        switch (type) {
            case ClassPostType.ANNOUNCEMENT:
                return <Megaphone className="h-4 w-4" />;
            case ClassPostType.ASSIGNMENT:
                return <FileText className="h-4 w-4" />;
            case ClassPostType.MATERIAL:
                return <BookOpen className="h-4 w-4" />;
            case ClassPostType.COMMENT:
                return <MessageCircle className="h-4 w-4" />;
            default:
                return <MessageSquare className="h-4 w-4" />;
        }
    };

    const getPostTypeColor = (type: ClassPostType) => {
        switch (type) {
            case ClassPostType.ANNOUNCEMENT:
                return "bg-blue-100 text-blue-800";
            case ClassPostType.ASSIGNMENT:
                return "bg-purple-100 text-purple-800";
            case ClassPostType.MATERIAL:
                return "bg-green-100 text-green-800";
            case ClassPostType.COMMENT:
                return "bg-orange-100 text-orange-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const isAuthorCurrentUser = post.author.id === user.id;
    const formattedDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    const formattedTime = (date: string) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="rounded-lg border border-border bg-card hover:border-[#0052FF]/30 hover:shadow-md transition-all p-6">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-12 w-12 rounded-full border-4 border-background shadow-lg">
                        <AvatarImage src={post.author.image ? post.author.image : `https://api.dicebear.com/7.x/initials/svg?seed=${post.author.name}`} />
                        <AvatarFallback className="text-2xl font-bold">
                            {post.author.name[0]}
                        </AvatarFallback>
                    </Avatar>

                    {/* Author Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-foreground text-sm sm:text-base">
                                {post.author.name}
                            </h3>
                            {isAuthorCurrentUser && (
                                <Badge variant="secondary" className="text-xs">
                                    You
                                </Badge>
                            )}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {post.author.role} • {formattedDate(post.createdAt)} at {formattedTime(post.createdAt)}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {
                        post.type === ClassPostType.ASSIGNMENT && post.assignmentDeadLine && (
                            <Badge className={cn(`lg:flex items-center gap-1 shrink-0 hidden mb-2`, isTimePassed(post.assignmentDeadLine) ? "bg-[#8A0000]" : "bg-[#0A4D22]")}>
                                <span>Due {formattedDate(post.assignmentDeadLine)} at {formattedTime(post.assignmentDeadLine)}</span>
                            </Badge>
                        )
                    }
                    <Badge className={`${getPostTypeColor(post.type)} flex items-center gap-1 shrink-0 ml-2`}>
                        {getPostTypeIcon(post.type)}
                        <span className="hidden sm:inline">{post.type}</span>
                    </Badge>
                </div>
            </div>

            {/* Message Content */}
            <div className="mb-4">
                {
                    post.type === ClassPostType.ASSIGNMENT && post.assignmentDeadLine && (
                        <Badge className={cn(`flex items-center gap-1 shrink-0 lg:hidden mb-2`, isTimePassed(post.assignmentDeadLine) ? "bg-[#8A0000]" : "bg-[#0A4D22]")}>
                            <span>Due {formattedDate(post.assignmentDeadLine)} at {formattedTime(post.assignmentDeadLine)}</span>
                        </Badge>
                    )
                }
                <p className="text-foreground text-sm sm:text-base leading-relaxed line-clamp-4 break-words">
                    {post.message || ""}
                </p>
            </div>
            <div>
                {post.attachment && (
                    <a
                        target="_blank"
                        href={post.attachment.endsWith(".jpg") || post.attachment.endsWith(".png") || post.attachment.endsWith(".jpeg") ? post.attachment : `https://docs.google.com/viewerng/viewer?url=${post.attachment}`}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#0052FF] hover:underline text-sm"
                    >
                        <FileText className="h-4 w-4" />
                        View Attachment
                    </a>
                )}
            </div>

            {/* Footer Section - Engagement Metrics */}
            <div className={cn("flex items-center gap-4 pt-4 border-t border-border/50", comments)}>
                <button
                    className="flex cursor-pointer items-center gap-2 text-muted-foreground hover:text-[#0052FF] transition-colors text-sm"
                    onClick={() => setCommentOpen(!commentOpen)}
                >
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">{post._count.comments}</span>
                    <span className="hidden sm:inline">
                        {
                            post.type !== ClassPostType.ASSIGNMENT ? (post._count.comments === 1 ? "Comment" : "Comments") : (post._count.comments === 1 ? "Submission" : "Submissions")
                        }
                    </span>
                </button>
            </div>
            <div>
                {commentOpen && (
                    <CommentSection post={post} user={user} />
                )}
            </div>
        </div>
    );
}
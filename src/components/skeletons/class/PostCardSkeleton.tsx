"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
    return (
        <div>
            {
                [1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="rounded-lg mt-4 border border-border bg-card p-6 animate-pulse">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4 flex-1">
                                {/* Author Avatar */}
                                <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />

                                {/* Author Info */}
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-5 w-10 rounded-full" />
                                    </div>
                                    <Skeleton className="h-3 w-48" />
                                </div>
                            </div>

                            {/* Post Type Badge */}
                            <Skeleton className="h-6 w-24 rounded-full flex-shrink-0 ml-2" />
                        </div>

                        {/* Message Content */}
                        <div className="mb-4 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        {/* Attachment Section */}
                        <div className="mb-4">
                            <Skeleton className="h-4 w-32" />
                        </div>

                        {/* Footer Section */}
                        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                ))
            }

        </div>
    );
}

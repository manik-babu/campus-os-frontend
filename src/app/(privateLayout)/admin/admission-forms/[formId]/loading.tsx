import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormDetailsLoadingSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="max-w-6xl mx-auto space-y-4">
                {/* Header Section */}
                <Card className="p-4">
                    <Skeleton className="h-5 w-40 mb-4" />
                    <div className="px-8 pb-8">
                        <div className="flex gap-8 -mt-16 mb-8">
                            {/* Student Image */}
                            <Skeleton className="w-32 h-40 rounded-lg flex-shrink-0" />

                            {/* Basic Info */}
                            <div className="flex-1 pt-4 w-full">
                                <Skeleton className="h-8 w-48 mb-4" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <Skeleton className="h-3 w-16 mb-2" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                    <div>
                                        <Skeleton className="h-3 w-20 mb-2" />
                                        <Skeleton className="h-4 w-28" />
                                    </div>
                                    <div>
                                        <Skeleton className="h-3 w-24 mb-2" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Academic Information Section */}
                <Card className="p-4">
                    <Skeleton className="h-5 w-48 mb-4" />
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* SSC Details */}
                        <div>
                            <Skeleton className="h-3 w-24 mb-4" />
                            <div className="space-y-3">
                                <InfoRowSkeleton />
                                <InfoRowSkeleton />
                                <InfoRowSkeleton />
                            </div>
                        </div>
                        {/* HSC Details */}
                        <div>
                            <Skeleton className="h-3 w-24 mb-4" />
                            <div className="space-y-3">
                                <InfoRowSkeleton />
                                <InfoRowSkeleton />
                                <InfoRowSkeleton />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Personal Information Section */}
                <Card className="p-4">
                    <Skeleton className="h-5 w-48 mb-4" />
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-3">
                            <InfoRowSkeleton />
                            <InfoRowSkeleton />
                            <InfoRowSkeleton />
                            <InfoRowSkeleton />
                        </div>
                        {/* Right Column */}
                        <div className="space-y-3">
                            <InfoRowSkeleton />
                            <InfoRowSkeleton />
                            <InfoRowSkeleton />
                            <InfoRowSkeleton />
                        </div>
                    </div>
                </Card>

                {/* Documents Section */}
                <Card className="p-4">
                    <Skeleton className="h-5 w-56 mb-8" />
                    <div className="px-8 py-8">
                        <div className="flex flex-wrap gap-12 justify-start">
                            {/* SSC Document Thumbnail */}
                            <div className="flex flex-col items-center gap-2">
                                <Skeleton className="w-32 h-40 rounded-lg" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                            {/* HSC Document Thumbnail */}
                            <div className="flex flex-col items-center gap-2">
                                <Skeleton className="w-32 h-40 rounded-lg" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                        <Skeleton className="h-3 w-96 mt-6" />
                    </div>
                </Card>

                {/* Action Buttons Section */}
                <div className="w-full flex justify-start items-center gap-4 my-8">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
        </div>
    );
}

const InfoRowSkeleton = () => (
    <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100 last:border-b-0">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
    </div>
);

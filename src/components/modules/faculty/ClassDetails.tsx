import { IClassDetails } from "@/@types/attendance";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function ClassDetails({ classDetails }: { classDetails: IClassDetails }) {
    return (
        <div>
            <Badge variant="default" className="text-xs font-medium bg-blue-100 text-blue-800">{classDetails.courseCode}</Badge>
            <h2 className="text-lg font-semibold mt-2">{classDetails.courseName}</h2>
            <div className="flex items-center gap-2 mt-2">
                <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{classDetails.department} • {classDetails.batch}</span>
                </span>
            </div>
        </div>
    );
}
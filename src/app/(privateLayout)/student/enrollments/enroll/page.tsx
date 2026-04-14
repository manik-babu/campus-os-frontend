import { ICourseOfferingsData } from "@/@types/enrollment";
import { IBatch } from "@/@types/shared";
import EnrollCourse from "@/components/modules/enrollments/EnrollCourse";
import { getCourseOfferings } from "@/services/enrollment.service";
import { getBatches } from "@/services/shared.service";

export default async function AddEnrollmentPage() {
    const courseOfferings = await getCourseOfferings({});
    const batches = await getBatches();
    return (
        <EnrollCourse courseOfferings={courseOfferings.data as ICourseOfferingsData} batches={batches.data as IBatch[]} />
    );
}

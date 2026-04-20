import ClassRoomHomePage from "@/components/modules/classRoom/ClassHomePage";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getSession } from "@/services/auth.service";
import { courseOfferingInfo, getClassPosts } from "@/services/classes.service";

export default async function Page({ params }: { params: Promise<{ classId: string }> }) {
    const { classId } = await params;
    const [courseRes, postsRes, session] = await Promise.all([courseOfferingInfo(classId), getClassPosts(classId, {}), getSession()]);
    if (!courseRes.ok || !postsRes.ok || !session || !courseRes.data || !postsRes.data) {
        return <ErrorPage message="Failed to load class data" />
    }

    return (
        <ClassRoomHomePage
            posts={postsRes.data}
            user={session}
            classDetails={courseRes.data}

        />
    );
}
import { IAdmissionFormDetails } from "@/@types/admission";
import FormDetails from "@/components/modules/admin/admission/FormDetails";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getAdmissionFormDetails } from "@/services/admin.service";

export default async function Page({ params }: { params: Promise<{ formId: string }> }) {
    const { formId } = await params;
    const res = await getAdmissionFormDetails(formId);
    if (!res.ok && !res.data) {
        return <ErrorPage message={res.message} statusCode={res.status} />;
    }
    return (
        <FormDetails form={res.data as IAdmissionFormDetails} />
    );
}
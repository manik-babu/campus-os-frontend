import Image from "next/image";

export default function DisplayAttachment({ file }: { file: File }) {

    if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        return <Image src={url} alt={file.name} width={300} height={300} />
    } else if (file.type === "application/pdf") {
        return <div className="w-full py-14 flex justify-center items-center">
            <p>{file.name}</p>
        </div>
    } else {
        return <a href={URL.createObjectURL(file)} download={file.name} className="text-blue-500 underline">{file.name}</a>
    }
}
// const url = URL.createObjectURL(file);
//<iframe src={url} title={file.name} className="w-full h-96 rounded" />
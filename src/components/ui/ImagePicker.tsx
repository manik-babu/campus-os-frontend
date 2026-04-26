import { Dispatch, SetStateAction } from "react";
import { Input } from "./input";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";

export default function ImagePicker({ image, setImage, error }: { error: string | null; image: File | null, setImage: Dispatch<SetStateAction<File | null>> }) {
    return (
        <div className="space-y-2">
            <div>
                {image ? (
                    <div className="relative flex justify-center items-center w-fit">
                        <Button variant="destructive" className="absolute" onClick={(e) => {
                            e.stopPropagation();
                            setImage(null);
                        }}>
                            Remove
                        </Button>
                        <Image src={URL.createObjectURL(image)} alt="Selected Image" width={128} height={128} className="w-32 h-32 rounded-md object-cover" />
                    </div>
                ) : (
                    <label htmlFor="image-picker">
                        <div className="w-32 cursor-pointer h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-md text-muted-foreground">
                            <CloudUploadIcon className="h-8 w-8" />
                            Upload Image
                        </div>
                    </label>
                )}
            </div>
            <Input
                id="image-picker"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            {
                error && <p className="text-red-500 text-sm">{error}</p>
            }
        </div>
    );
}
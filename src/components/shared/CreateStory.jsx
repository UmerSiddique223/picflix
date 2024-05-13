"use client";
import { Button } from "@/components/UI/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/UI/dialog";
import Image from "next/image";
import { useState } from "react";
import MediaUploader from "./MediaUploader";
import { getUser } from "@/lib/userInfo";
import { useRouter } from "next/navigation";

function CreateStory() {
    const [media, setMedia] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    const uploadMedia = async (file) => {
        const formData = new FormData();

        file.forEach((f) => {
            formData.append("file", f);
        });

        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/upload`, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP Error: " + response.status);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("File upload failed. Error: " + error.message);
            });
    };
    const handleSubmit = async () => {
        if(!media){
            setError({message:"Please upload media.", status:"error"});;
            return;
        }
        await uploadMedia(media);
        const body=media.map((file) => ({
            type: file.type,
            path: file.name,
        }));
        const user = getUser();
        fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/stories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ media:body, user_id: user.user_id }),
        }).then((response) => {
            return response.json();
        })
        .then((res) => {
            if(res.success){
                setError({message:"Story created successfully.", status:"success"});
                router.refresh();
            }
            else if (res.duplicate){
                setError({message:"Cannot create duplicate story.", status:"error"});
            }
            else{
                setError({message:"Failed to create story.", status:"error"});
            }
        })
            .catch(() => {
                setError({message:"Failed to create story.", status:"error"});
            });
    };

    return (
        <Dialog>
            <DialogTrigger className="fixed bottom-4 right-4 bg-primary hover:brightness-90 p-3 rounded-lg">
                <Image src={"/icons/camera.svg"} width={50} height={50} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Story</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <MediaUploader fieldChange={setMedia} />
                    {error && <p className={`font-bold ${error.status==="error"?"text-destructive":"text-green-400"}`}>{error.message}</p>}
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                        <Button variant="secondary" type="button">
                            Cancel
                        </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Create</Button>
                    </DialogFooter>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

export default CreateStory;

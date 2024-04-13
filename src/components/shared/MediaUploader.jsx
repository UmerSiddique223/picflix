import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/UI/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/UI/carousel";

import Image from "next/image";
const MediaUploader = ({ fieldChange }) => {
    const [file, setFile] = useState([]);
    const [fileUrl, setFileUrl] = useState("");

    const onDrop = useCallback(
        (acceptedFiles) => {
            if(file.length===0){
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            }
            else{
                setFile([...file,...acceptedFiles]);
                fieldChange([...file,...acceptedFiles]);
            }
        },
        [file]
    );

    const { getRootProps, getInputProps, open } = useDropzone({
        multiple: true,
        noClick: true,
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
            "video/*": [".mp4", ".mov"],
        },
    });
    const deleteFile = (target) => () => {
        setFile(file.filter((f) => f !== target));
    };
    useEffect(() => {
        if (file.length === 0) {
            setFileUrl("");
        } else {
            setFileUrl(file.map((file) => URL.createObjectURL(file)));
        }
    }, [file]);
    return (
        <div
            {...getRootProps()}
            className="flex justify-center items-center flex-col bg-input border border-border rounded-xl"
        >
            <input {...getInputProps()} className="cursor-pointer" />

            {fileUrl ? (
                <>
                    <div className="flex justify-center items-center flex-1 w-full p-5 lg:p-10">
                        <Carousel>
                            <CarouselContent>
                                {file.map((file, index) => (
                                    <CarouselItem
                                        onClick={deleteFile(file)}
                                        className="flex items-center justify-center"
                                        key={index}
                                    >
                                        <Image
                                            width={300}
                                            height={100}
                                            src={URL.createObjectURL(file)}
                                            alt="image"
                                            className="w-auto max-h-72"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-8" />
                            <CarouselNext className="-right-8" />
                        </Carousel>
                    </div>
                    <p className="mb-4">Click a photo to remove it</p>
                    <Button
                        type="button"
                        onClick={open}
                        className="bg-primary hover:bg-secondary text-primary-foreground mb-4"
                    >
                        Add another photo
                    </Button>
                </>
            ) : (
                <div className="flex flex-col items-center w-full p-5 lg:p-10">
                    <Image
                        src="/icons/file-upload.svg"
                        width={96}
                        height={77}
                        alt="file upload"
                    />

                    <h3 className="text-muted-foreground mb-2 mt-6">
                        Drag photo / video here
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        PNG, JPG, MP4, MOV
                    </p>

                    <Button
                        type="button"
                        onClick={open}
                        className="bg-primary hover:bg-secondary text-primary-foreground"
                    >
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MediaUploader;

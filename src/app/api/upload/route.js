import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.formData();
    const files = data.getAll("file");
    if (!files || files.length === 0) {
        return NextResponse.json({ message: "no media found", success: false });
    }
    const responses = [];
    for (const file of files) {
        let fileFolder;
        if (file.type.startsWith("image/")) {
            fileFolder = "images";
        } else if (file.type.startsWith("video/")) {
            fileFolder = "videos";
        } else {
            responses.push(NextResponse.json({ success: false }));
            continue;
        }
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const path = `./public/${fileFolder}/${file.name}`;
        await writeFile(path, buffer);

        responses.push(
            NextResponse.json({
                success: true,
            })
        );
    }
    if (responses.every((response) => response.success === true)) {
        return NextResponse.json({ message: "files uploaded", success: true });
    } else {
        return NextResponse.json({
            message: "failed to upload files",
            success: false,
        });
    }
}
